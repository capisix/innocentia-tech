"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Extend Window interface for custom global tracking helper
declare global {
  interface Window {
    innocentiaTrack?: (eventType: TelemetryEventType, meta?: Record<string, any>) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type TelemetryEventType =
  | "visit"
  | "engaged_10s"
  | "scroll_50"
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "whatsapp_click";

export default function TelemetryBeacon() {
  const pathname = usePathname();
  const time10FiredRef = useRef<boolean>(false);
  const scroll50FiredRef = useRef<boolean>(false);
  const formStartFiredRef = useRef<boolean>(false);

  useEffect(() => {
    try {
      // 1. Manage persistent Session & Visitor IDs
      let sessionId = sessionStorage.getItem("innocentia_session_id");
      if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem("innocentia_session_id", sessionId);
      }

      let visitorId = localStorage.getItem("innocentia_visitor_id");
      if (!visitorId) {
        visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem("innocentia_visitor_id", visitorId);
      }

      // Reset per-route flags on route transition
      time10FiredRef.current = false;
      scroll50FiredRef.current = false;

      // Core Dispatcher
      const dispatchTelemetryEvent = (
        eventType: TelemetryEventType,
        meta: Record<string, any> = {}
      ) => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const payload = {
          sessionId,
          visitorId,
          eventType,
          path: pathname || "/",
          device: isMobile ? "mobile" : "desktop",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1920x1080",
          timestamp: Date.now(),
          ...meta,
        };

        // Forward to Google Analytics 4 if available
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          try {
            window.gtag("event", eventType, {
              event_category: "Engagement Funnel",
              event_label: meta?.label || pathname || "/",
              page_location: window.location.href,
              page_path: pathname || "/",
              ...meta,
            });
          } catch {
            // Safe fallback
          }
        }

        // Send to Internal Next.js Edge Telemetry Engine
        try {
          if (typeof navigator !== "undefined" && navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            navigator.sendBeacon("/api/telemetry", blob);
          } else {
            fetch("/api/telemetry", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              keepalive: true,
            }).catch(() => {});
          }
        } catch {
          // Fail silently without interrupting UI
        }
      };

      // Expose globally for manual triggers if needed
      window.innocentiaTrack = dispatchTelemetryEvent;

      // -------------------------------------------------------------
      // EVENT 1: VISITANTE (Page Visit)
      // -------------------------------------------------------------
      dispatchTelemetryEvent("visit", { label: "Pageview" });

      // -------------------------------------------------------------
      // EVENT 2: >10 SEGUNDOS (Engaged Reading Time)
      // -------------------------------------------------------------
      const time10Timer = setTimeout(() => {
        if (!time10FiredRef.current) {
          time10FiredRef.current = true;
          dispatchTelemetryEvent("engaged_10s", {
            dwellSeconds: 10,
            label: "Permanencia >10 Segundos",
          });
        }
      }, 10000);

      // -------------------------------------------------------------
      // EVENT 3: 50% SCROLL (Scroll Depth)
      // -------------------------------------------------------------
      const handleScroll = () => {
        if (scroll50FiredRef.current) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;

        const currentScroll = window.scrollY;
        const scrollPct = currentScroll / totalHeight;

        if (scrollPct >= 0.5) {
          scroll50FiredRef.current = true;
          dispatchTelemetryEvent("scroll_50", {
            scrollPercentage: Math.round(scrollPct * 100),
            label: "50% Profundidad de Scroll",
          });
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      // -------------------------------------------------------------
      // GLOBAL CLICK DELEGATION:
      // CTA CLICK & WHATSAPP CLICK
      // -------------------------------------------------------------
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Check for WhatsApp click
        const waAnchor = target.closest(
          'a[href*="wa.me"], a[href*="whatsapp.com"], [data-whatsapp="true"]'
        ) as HTMLAnchorElement | null;

        if (waAnchor) {
          dispatchTelemetryEvent("whatsapp_click", {
            href: waAnchor.href || "whatsapp_action",
            label: waAnchor.innerText?.trim().slice(0, 50) || "WhatsApp Clic",
          });
          return;
        }

        // Check for Primary CTA clicks
        const ctaElement = target.closest(
          'a[href*="/crear-proyecto"], a[href*="/cotizar"], a[href*="/portal"], a[href*="/seguimiento"], a[href*="/revision"], button[data-cta="true"], .cta-button, [role="button"][data-cta]'
        ) as HTMLElement | null;

        if (ctaElement) {
          const text = ctaElement.innerText?.trim().slice(0, 60) || "Botón CTA";
          const href = (ctaElement as HTMLAnchorElement).href || "";
          dispatchTelemetryEvent("cta_click", {
            label: text,
            targetUrl: href,
          });
          return;
        }

        // Check buttons with text indicating high-intent action
        const genericButton = target.closest("button, a") as HTMLElement | null;
        if (genericButton) {
          const text = genericButton.innerText?.toLowerCase() || "";
          const isHighIntent =
            text.includes("cotizar") ||
            text.includes("crear proyecto") ||
            text.includes("comenzar") ||
            text.includes("iniciar") ||
            text.includes("solicitar") ||
            text.includes("contactar") ||
            text.includes("agenda");

          if (isHighIntent) {
            dispatchTelemetryEvent("cta_click", {
              label: genericButton.innerText?.trim().slice(0, 60),
            });
          }
        }
      };

      document.addEventListener("click", handleClick, { capture: true });

      // -------------------------------------------------------------
      // EVENT 4: FORM START (Focus or Typing in any form input)
      // -------------------------------------------------------------
      const handleFormInteraction = (e: Event) => {
        if (formStartFiredRef.current) return;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isInput =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT";

        if (isInput) {
          const form = target.closest("form");
          const formId = form?.id || form?.name || "form_general";
          formStartFiredRef.current = true;
          dispatchTelemetryEvent("form_start", {
            formId,
            inputType: target.tagName.toLowerCase(),
            label: `Inicio de Formulario (${formId})`,
          });
        }
      };

      document.addEventListener("focusin", handleFormInteraction, { capture: true });

      // -------------------------------------------------------------
      // EVENT 5: FORM SUBMIT (Submission of any form)
      // -------------------------------------------------------------
      const handleFormSubmit = (e: SubmitEvent) => {
        const form = e.target as HTMLFormElement | null;
        const formId = form?.id || form?.name || "form_general";
        dispatchTelemetryEvent("form_submit", {
          formId,
          label: `Envío Exitoso de Formulario (${formId})`,
        });
      };

      document.addEventListener("submit", handleFormSubmit, { capture: true });

      // Clean up event listeners on unmount or route change
      return () => {
        clearTimeout(time10Timer);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("click", handleClick, { capture: true });
        document.removeEventListener("focusin", handleFormInteraction, { capture: true });
        document.removeEventListener("submit", handleFormSubmit, { capture: true });
      };
    } catch (e) {
      console.error("TelemetryBeacon error:", e);
    }
  }, [pathname]);

  return null;
}
