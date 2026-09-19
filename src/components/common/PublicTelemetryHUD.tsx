"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Globe, X } from "../../lib/icons";
import LiveTelemetryMap from "./LiveTelemetryMap";

export default function PublicTelemetryHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(7);

  useEffect(() => {
    let isSubscribed = true;
    const fetchActive = async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (!res.ok) return;
        const data = await res.json();
        if (isSubscribed && data?.telemetry?.activeUsers) {
          setActiveCount(data.telemetry.activeUsers);
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
                Mapa de Nodos Activos
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

          <div className="pt-2 text-center text-[9px] font-mono text-gray-400">
            Conexiones seguras y cifradas • Red Edge Innocentia
          </div>
        </div>
      )}
    </aside>
  );
}
