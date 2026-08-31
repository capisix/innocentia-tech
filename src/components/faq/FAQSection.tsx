"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Terminal, HelpCircle } from "../../lib/icons";

export default function FAQSection() {
  return (
    <section id="preguntas" className="py-24 px-6 sm:px-8 max-w-5xl mx-auto text-center relative z-10">
      {/* High-Converting Subpage Gateway Card */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-b from-white/[0.06] via-black/80 to-black/95 border border-white/20 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00D1FF]/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF3858]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-300 uppercase">
            ANTES DE COMENZAR • CENTRO DE RESPUESTAS OFICIAL
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
          PREGUNTAS <br />
          <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent">
            FRECUENTES
          </span>
        </h2>

        {/* Avatars */}
        <div className="flex items-center -space-x-3 pt-1">
          <div className="w-14 h-14 rounded-full bg-[#FF3858]/20 border-2 border-[#FF3858]/50 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(255,56,88,0.4)]">
            <Image src="/images/sofia_pink_beanbag.png" alt="Sofía" width={42} height={42} className="object-contain" />
          </div>
          <div className="w-14 h-14 rounded-full bg-[#00D1FF]/20 border-2 border-[#00D1FF]/50 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]">
            <Image src="/images/ivan_standing_stylus.png" alt="Iván" width={42} height={42} className="object-contain" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light leading-relaxed">
          Sabemos que transformar una idea en tecnología puede generar muchas dudas. Reunimos las <strong>22 preguntas oficiales</strong> sobre viabilidad, tiempos, costos, diseño e IA, y creamos una <strong>Terminal Interactiva</strong> para responderte en vivo.
        </p>

        {/* CTA Link to Subpage */}
        <div className="pt-2">
          <Link
            href="/faq"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#00D1FF] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,209,255,0.45)] hover:scale-105 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#00D1FF]" />
            <span>Ver Preguntas &amp; Terminal Interactiva</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
