"use client";

import React, { useState } from "react";
import Link from "next/link";
import AmbientLivingCanvas from "../../../components/common/AmbientLivingCanvas";
import OpenHouseMobileAppDemo from "../../../components/portal/OpenHouseMobileAppDemo";
import OpenHousePropTechDemo from "../../../components/portal/OpenHousePropTechDemo";
import {
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  ExternalLink,
  Smartphone,
  LayoutGrid,
  Phone,
} from "../../../lib/icons";

export default function OpenHouseClientDemoPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeView, setActiveView] = useState<"dashboard" | "app">("dashboard");

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E87512] selection:text-black relative overflow-hidden flex flex-col justify-between">
      {/* Background Interactive Ambient Canvas */}
      <AmbientLivingCanvas />

      {/* Floating Warm Terracotta & Cream Gradient Glows (#E87512, #FAE3D1) */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#E87512]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FAE3D1]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Client Demo Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090D]/85 border-b border-[#E87512]/30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="https://static.tokkobroker.com/tfw_images/1631_Open%20House%20Yucat%C3%A1n/SIN%20FONDO%20OPEN%20HOUSE%20YUCATAN.png"
                alt="Open House Yucatán"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="hidden md:block border-l border-white/15 pl-3">
              <span className="text-[10px] font-mono text-[#E87512] font-black uppercase tracking-wider block">
                3RA APP MULTIPLATAFORMA • PROPTECH CITAS & TERRENOS
              </span>
              <span className="text-xs font-mono text-gray-300">
                Demo Dedicado para Eduardo Cáceres
              </span>
            </div>
          </div>

          {/* Center: Switcher between Mobile App Experience & Web Dashboard */}
          <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/15 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveView("app")}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === "app"
                  ? "bg-[#E87512] text-black shadow-[0_0_15px_rgba(232,117,18,0.5)] font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Móvil (Orelax Style)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView("dashboard")}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === "dashboard"
                  ? "bg-[#E87512] text-black shadow-[0_0_15px_rgba(232,117,18,0.5)] font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Portal Dashboard</span>
            </button>
          </div>

          {/* Quick Actions for Client & Team */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareLink}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copiar enlace directo para abrir desde cualquier celular"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#E87512]" />
                  <span className="hidden sm:inline text-[11px]">Compartir Link</span>
                </>
              )}
            </button>

            <Link
              href="/portal?tab=demo"
              className="px-3.5 py-2 rounded-xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[0_0_20px_rgba(232,117,18,0.4)] transition-all cursor-pointer"
            >
              <span>Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Interactive Demo Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        {activeView === "app" ? (
          <OpenHouseMobileAppDemo />
        ) : (
          <OpenHousePropTechDemo isStandalone={true} />
        )}
      </main>

      {/* Bottom Sticky Helper for Mobile Testing */}
      <footer className="w-full bg-[#08080C]/90 border-t border-white/10 py-3 px-4 text-center text-xs font-mono text-gray-400 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>✨ <strong>Open House Yucatán PropTech Demo</strong> • Compatible con iOS y Android</span>
          <span className="text-[#E87512]">Asesora vinculada: Jessica Torre (VEN-JESS-101)</span>
        </div>
      </footer>
    </div>
  );
}
