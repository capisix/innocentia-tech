"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Globe, X } from "../../lib/icons";
import LiveTelemetryMap from "./LiveTelemetryMap";

export default function PublicTelemetryHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(7);
  const [funnelSummary, setFunnelSummary] = useState<any>(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchActive = async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (!res.ok) return;
        const data = await res.json();
        if (isSubscribed) {
          if (data?.telemetry?.activeUsers) {
            setActiveCount(data.telemetry.activeUsers);
          }
          if (data?.telemetry?.funnel?.summary) {
            setFunnelSummary(data.telemetry.funnel.summary);
          }
        }
      } catch {}
    };

    fetchActive();
    const interval = setInterval(fetchActive, 12000);
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <aside aria-label="Telemetría en tiempo real" className="fixed bottom-6 left-6 z-40">
      {/* Floating Public HUD Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/85 border border-white/20 hover:border-[#00E5FF]/60 text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer font-mono text-xs"
          title="Ver mapa de nodos y telemetría en tiempo real"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
          </span>
          <span className="text-gray-300 font-semibold group-hover:text-white transition-colors">
            Nodos en Vivo:
          </span>
          <span className="text-[#00E5FF] font-bold">
            {activeCount}
          </span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">
            • Monterrey & Mérida
          </span>
        </button>
      )}

      {/* Expanded Modal HUD */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] bg-black/95 border border-white/20 rounded-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Telemetría &amp; Nodos Activos
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <LiveTelemetryMap variant="public_hud" showStats={true} className="bg-transparent border-0 p-0" />

          {/* Mini Conversion Funnel Indicators */}
          <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="text-cyan-400 font-bold uppercase">Embudo en Vivo (CRO):</span>
              <span>{activeCount} en línea</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px]">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-gray-400 block">&gt;10s</span>
                <strong className="text-emerald-400 font-bold">{funnelSummary?.engaged10s ?? Math.round(activeCount * 0.7)}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-gray-400 block">50% Scroll</span>
                <strong className="text-purple-400 font-bold">{funnelSummary?.scroll50 ?? Math.round(activeCount * 0.5)}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-gray-400 block">CTA Click</span>
                <strong className="text-amber-400 font-bold">{funnelSummary?.ctaClicks ?? Math.max(1, Math.round(activeCount * 0.3))}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-gray-400 block">WhatsApp</span>
                <strong className="text-[#25D366] font-bold">{funnelSummary?.whatsappClicks ?? Math.max(1, Math.round(activeCount * 0.1))}</strong>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center text-[9px] font-mono text-gray-400">
            Conexiones seguras y cifradas • Red Edge Innocentia
          </div>
        </div>
      )}
    </aside>
  );
}
