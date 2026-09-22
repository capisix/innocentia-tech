"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TelemetryBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    try {
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

      const sendHeartbeat = () => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const payload = {
          sessionId,
          visitorId,
          path: pathname || "/",
          device: isMobile ? "mobile" : "desktop",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1920x1080",
        };

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
      };

      sendHeartbeat();
      const interval = setInterval(sendHeartbeat, 20000); // 20s heartbeat

      return () => clearInterval(interval);
    } catch (e) {
      console.error("TelemetryBeacon error:", e);
    }
  }, [pathname]);

  return null;
}
