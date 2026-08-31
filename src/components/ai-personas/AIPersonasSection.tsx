"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "../../lib/icons";

export default function AIPersonasSection() {
  const characterLaws = [
    { icon: "😊", label: "Dan la bienvenida" },
    { icon: "🧭", label: "Guían al usuario" },
    { icon: "💬", label: "Responden preguntas" },
    { icon: "💡", label: "Visualizan ideas" },
    { icon: "🏗️", label: "Construyen soluciones" },
  ];

  return (
    <section id="ai-personas" className="relative py-24 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#FF3858] uppercase shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>IDENTIDAD & DUAL CORE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            LAS DOS INTELIGENCIAS DE INNOCENTIA
          </h2>
          <p className="text-gray-300 text-base font-light">
            Donde la imaginación se convierte en tecnología. Creatividad + Ingeniería trabajando en perfecta armonía.
          </p>
        </div>

        {/* 2 Big Master Cards: Sofía 🔴 (Left) vs Iván ⚡ (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ========================================================== */}
          {/* CARD 1: SOFÍA (100% PURE TRANSPARENT - ZERO BOXES) */}
          {/* ========================================================== */}
          <div className="group relative rounded-[36px] bg-gradient-to-b from-[#FF3858]/10 via-[#07070D]/90 to-[#040407] border border-[#FF3858]/40 hover:border-[#FF3858]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(255,56,88,0.18)] hover:shadow-[0_25px_80px_rgba(255,56,88,0.35)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF3858]/15 rounded-full blur-[110px] pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column: Pure Transparent Figure on Holographic Neon Ring Pedestal */}
              <div className="sm:col-span-5 flex items-center justify-center relative py-4">
                <div className="relative w-52 h-72 sm:w-56 sm:h-84 flex items-center justify-center">
                  {/* Glowing Neon Ring Pedestal */}
                  <div className="absolute bottom-1 w-44 h-12 rounded-[100%] bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166] opacity-75 blur-md -z-10 animate-pulse" />
                  <div className="absolute bottom-2.5 w-40 h-8 rounded-[100%] border-2 border-[#FF3858] shadow-[0_0_20px_#FF3858] -z-10" />
                  <div className="absolute -bottom-1 w-48 h-16 bg-[#FF3858]/30 rounded-[100%] blur-xl -z-10" />

                  {/* 100% Pure Transparent Sofía (No box background) */}
                  <Image
                    src="/images/sofia_standing_brush.png"
                    alt="Sofía - Diseño y UX"
                    fill
                    className="object-contain filter drop-shadow-[0_0_25px_rgba(255,56,88,0.7)] group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Native HTML/CSS Specifications */}
              <div className="sm:col-span-7 space-y-4 text-left">
                {/* Header & Badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl sm:text-4xl font-black text-[#FF3858] uppercase tracking-tight flex items-center gap-2">
                      <span>SOFÍA</span>
                      <span className="text-2xl">🖌️</span>
                    </h3>
                  </div>

                  <span className="text-xs font-mono text-[#FF7A00] font-bold uppercase tracking-wider block">
                    DISEÑO • UX • CREATIVIDAD
                  </span>

                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-[10px] font-mono font-bold text-[#FF3858] uppercase shadow-sm">
                    HEMISFERIO CREATIVO
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Representa la imaginación, la creatividad y la sensibilidad del diseño. Convierte ideas en experiencias visuales memorables, intuitivas y emocionales.
                </p>

                {/* Personality */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#FF7A00] font-bold uppercase block tracking-wider">
                    PERSONALIDAD
                  </span>
                  <div className="space-y-1.5 text-xs text-gray-200">
                    <p className="flex items-center gap-2">
                      <span className="text-sm">❤️</span> <span>Curiosa y entusiasta</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-sm">⭐</span> <span>Empática y cercana</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-sm">✨</span> <span>Imaginativa y detallista</span>
                    </p>
                  </div>
                </div>

                {/* Key Elements (3 Micro Glass Cards) */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-[#FF3858] font-bold uppercase block tracking-wider">
                    ELEMENTOS CLAVE
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF3858]/40 transition-colors">
                      <span className="text-base block mb-0.5">🖌️</span>
                      <span className="text-gray-200 font-bold block">Pincel</span>
                      <span className="text-gray-400 text-[8px]">Mágico</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF3858]/40 transition-colors">
                      <span className="text-base block mb-0.5">🎨</span>
                      <span className="text-gray-200 font-bold block">Creatividad</span>
                      <span className="text-gray-400 text-[8px]">& Inspiración</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF3858]/40 transition-colors">
                      <span className="text-base block mb-0.5">❤️</span>
                      <span className="text-gray-200 font-bold block">Empatía</span>
                      <span className="text-gray-400 text-[8px]">& Pasión</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 2: IVÁN (100% PURE TRANSPARENT - ZERO BOXES) */}
          {/* ========================================================== */}
          <div className="group relative rounded-[36px] bg-gradient-to-b from-[#00D1FF]/10 via-[#07070D]/90 to-[#040407] border border-[#00D1FF]/40 hover:border-[#00D1FF]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,209,255,0.18)] hover:shadow-[0_25px_80px_rgba(0,209,255,0.35)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D1FF]/15 rounded-full blur-[110px] pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column: Pure Transparent Figure on Cyber Neon Ring Pedestal */}
              <div className="sm:col-span-5 flex items-center justify-center relative py-4">
                <div className="relative w-52 h-72 sm:w-56 sm:h-84 flex items-center justify-center">
                  {/* Glowing Cyber Ring Pedestal */}
                  <div className="absolute bottom-1 w-44 h-12 rounded-[100%] bg-gradient-to-r from-[#00D1FF] via-[#3A86FF] to-[#8A2BE2] opacity-75 blur-md -z-10 animate-pulse" />
                  <div className="absolute bottom-2.5 w-40 h-8 rounded-[100%] border-2 border-[#00D1FF] shadow-[0_0_20px_#00D1FF] -z-10" />
                  <div className="absolute -bottom-1 w-48 h-16 bg-[#00D1FF]/30 rounded-[100%] blur-xl -z-10" />

                  {/* 100% Pure Transparent Iván (No box background) */}
                  <Image
                    src="/images/ivan_standing_stylus.png"
                    alt="Iván - Software y Arquitectura"
                    fill
                    className="object-contain filter drop-shadow-[0_0_25px_rgba(0,209,255,0.7)] group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Native HTML/CSS Specifications */}
              <div className="sm:col-span-7 space-y-4 text-left">
                {/* Header & Badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl sm:text-4xl font-black text-[#00D1FF] uppercase tracking-tight flex items-center gap-2">
                      <span>IVÁN</span>
                      <span className="text-2xl">⚡</span>
                    </h3>
                  </div>

                  <span className="text-xs font-mono text-[#3A86FF] font-bold uppercase tracking-wider block">
                    SOFTWARE • ARQUITECTURA • CÓDIGO
                  </span>

                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[10px] font-mono font-bold text-[#00D1FF] uppercase shadow-sm">
                    HEMISFERIO LÓGICO
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Representa la lógica, la estructura y la tecnología. Transforma ideas en soluciones sólidas, escalables, eficientes y seguras.
                </p>

                {/* Personality */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#3A86FF] font-bold uppercase block tracking-wider">
                    PERSONALIDAD
                  </span>
                  <div className="space-y-1.5 text-xs text-gray-200">
                    <p className="flex items-center gap-2">
                      <span className="text-sm">⚙️</span> <span>Lógico y analítico</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-sm">🛡️</span> <span>Responsable y confiable</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-sm">⚡</span> <span>Innovador y enfocado</span>
                    </p>
                  </div>
                </div>

                {/* Key Elements (3 Micro Glass Cards) */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-[#00D1FF] font-bold uppercase block tracking-wider">
                    ELEMENTOS CLAVE
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00D1FF]/40 transition-colors">
                      <span className="text-base block mb-0.5">&lt;/&gt;</span>
                      <span className="text-gray-200 font-bold block">Código</span>
                      <span className="text-gray-400 text-[8px]">& Estructura</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00D1FF]/40 transition-colors">
                      <span className="text-base block mb-0.5">🧊</span>
                      <span className="text-gray-200 font-bold block">Arquitectura</span>
                      <span className="text-gray-400 text-[8px]">& Solidez</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00D1FF]/40 transition-colors">
                      <span className="text-base block mb-0.5">⚡</span>
                      <span className="text-gray-200 font-bold block">Ingeniería</span>
                      <span className="text-gray-400 text-[8px]">& Eficiencia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* BANNER MASTER: SIEMPRE PRESENTES, SIEMPRE LISTOS PARA CREAR */}
        {/* ========================================================== */}
        <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#07070D] border border-white/20 p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden text-left group">
          {/* Ambient Lighting Behind Border */}
          <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-[#FF3858]/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-[#00D1FF]/10 blur-[100px] pointer-events-none" />

          {/* Background Clean Art (Borderless, fills seamlessly) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dual_floor_banner_cropped.jpg"
              alt="Sofía e Iván listos para crear"
              fill
              className="object-cover object-right opacity-90 sm:opacity-95 transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
            {/* Vignette Gradients for 100% Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070D] via-[#07070D]/90 sm:via-[#07070D]/75 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent z-10 sm:hidden" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
            {/* Left Side: Typography & Chips */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-gray-200 uppercase backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>LEYES DE USO DE LOS PERSONAJES</span>
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
                SIEMPRE PRESENTES, <br />
                SIEMPRE LISTOS <br />
                <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent">
                  PARA CREAR. ✦
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-lg">
                Sofía e Iván no son decoraciones estáticas. Son los guías vivos que te acompañan desde la primera idea hasta la entrega del código en producción.
              </p>

              {/* 5 Chips with dark backdrop */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[11px] sm:text-xs font-medium text-gray-200 flex items-center gap-1.5 backdrop-blur-md hover:border-[#FF3858]/60 transition-colors shadow-lg">
                  <span>😃</span>
                  <span>Dan la bienvenida</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[11px] sm:text-xs font-medium text-gray-200 flex items-center gap-1.5 backdrop-blur-md hover:border-purple-500/60 transition-colors shadow-lg">
                  <span>🚀</span>
                  <span>Guían al usuario</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[11px] sm:text-xs font-medium text-gray-200 flex items-center gap-1.5 backdrop-blur-md hover:border-[#00D1FF]/60 transition-colors shadow-lg">
                  <span>💬</span>
                  <span>Responden preguntas</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[11px] sm:text-xs font-medium text-gray-200 flex items-center gap-1.5 backdrop-blur-md hover:border-[#FFD166]/60 transition-colors shadow-lg">
                  <span>💡</span>
                  <span>Visualizan ideas</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[11px] sm:text-xs font-medium text-gray-200 flex items-center gap-1.5 backdrop-blur-md hover:border-emerald-400/60 transition-colors shadow-lg">
                  <span className="font-mono text-[10px] text-[#00D1FF] font-bold">&lt; &gt;</span>
                  <span>Construyen soluciones</span>
                </div>
              </div>
            </div>

            {/* Right Side: Spacer so characters on right background are displayed unobstructed */}
            <div className="hidden lg:block lg:col-span-5 h-48 pointer-events-none" />
          </div>

          {/* Bottom Triple Pillars Bar (Cleanly separated) */}
          <div className="mt-8 sm:mt-12 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-xs font-medium relative z-20">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-gray-300">
              <span className="w-6 h-6 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 flex items-center justify-center text-xs flex-shrink-0">
                💖
              </span>
              <span>
                Creatividad que <strong className="text-[#FF3858]">imagina.</strong>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 text-gray-300 sm:border-l sm:border-white/15 sm:pl-4">
              <span className="w-6 h-6 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center text-xs flex-shrink-0">
                ⚡
              </span>
              <span>
                Tecnología que <strong className="text-[#00D1FF]">construye.</strong>
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2.5 text-gray-300 sm:border-l sm:border-white/15 sm:pl-4">
              <span className="w-6 h-6 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/40 flex items-center justify-center text-xs flex-shrink-0">
                ✨
              </span>
              <span>
                Juntos lo hacemos <strong className="text-[#FFD166]">real.</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
