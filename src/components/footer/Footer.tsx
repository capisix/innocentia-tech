"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#020204] py-14 border-t border-white/10 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Top Row: Logo & Core Contact Channels */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_official_header.png?v=2"
                alt="INNOCENTIA TECH"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)]"
              />
            </div>
            <p className="text-xs text-gray-400 max-w-md font-light">
              Ingeniería de software de alto impacto, arquitectura en la nube y diseño sensorial táctil 60FPS.
            </p>
          </div>

          {/* Official Email & WhatsApp Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px] w-full lg:w-auto">
            <a
              href="mailto:contacto@innocentia.tech"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D1FF] group-hover:scale-125 transition-transform" />
              <span>contacto@innocentia.tech</span>
            </a>

            <a
              href="mailto:ventas@innocentia.tech"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-[#FF3858] transition-all flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3858] group-hover:scale-125 transition-transform" />
              <span>ventas@innocentia.tech</span>
            </a>

            <a
              href="mailto:soporte@innocentia.tech"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-emerald-400 transition-all flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
              <span>soporte@innocentia.tech</span>
            </a>

            <a
              href="https://wa.me/529601771556"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform" />
              <span>WhatsApp: +52 960 177 1556</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Legal & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 font-mono text-[11px]">
          <div>
            <span>© {new Date().getFullYear()} Innocentia Tech Core. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:ceo.ivan@innocentia.tech"
              className="hover:text-amber-300 text-gray-400 transition-colors"
            >
              Dirección General: ceo.ivan@innocentia.tech
            </a>
            <span>•</span>
            <a href="#privacy" className="hover:text-gray-300 transition-colors">
              Privacidad
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-gray-300 transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
