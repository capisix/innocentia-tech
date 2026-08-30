"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#020204] py-12 border-t border-white/10 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo & Slogan */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo_full.png"
            alt="INNOCENTIA"
            width={160}
            height={40}
            className="object-contain filter drop-shadow-[0_0_10px_rgba(255,69,0,0.3)]"
          />
          <span className="hidden sm:inline text-gray-500 font-light border-l border-white/10 pl-4">
            Donde la imaginación se convierte en tecnología.
          </span>
        </div>

        {/* Center: Copyright & Legal */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500 font-mono text-[11px]">
          <span>© 2024 Innocentia. Todos los derechos reservados.</span>
          <a href="#privacy" className="hover:text-gray-300 transition-colors">
            Política de privacidad
          </a>
          <span>|</span>
          <a href="#terms" className="hover:text-gray-300 transition-colors">
            Términos de servicio
          </a>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all"
          >
            in
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FF3B5C] hover:text-[#FF3B5C] transition-all"
          >
            ig
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-all"
          >
            yt
          </a>
        </div>
      </div>
    </footer>
  );
}
