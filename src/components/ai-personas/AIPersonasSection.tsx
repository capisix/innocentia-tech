"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Play, X } from "../../lib/icons";

interface PersonaVideoData {
  title: string;
  role: string;
  subtitle: string;
  videoSrc: string;
  themeColor: string;
  secondaryColor: string;
  avatarImg: string;
  icon: string;
}

export default function AIPersonasSection() {
  const [activeVideo, setActiveVideo] = useState<PersonaVideoData | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              <div
                onClick={() =>
                  setActiveVideo({
                    title: "Sofía",
                    role: "Dirección UI/UX & Creatividad",
                    subtitle: "Hemisferio Creativo • Prototipos Interactivos a 60FPS",
                    videoSrc: "/videos/sofia_presentacion.mp4",
                    themeColor: "#FF3858",
                    secondaryColor: "#FF7A00",
                    avatarImg: "/images/sofia_seated_art.jpg",
                    icon: "🖌️",
                  })
                }
                className="sm:col-span-5 flex items-center justify-center relative py-2 cursor-pointer group/avatar"
                title="Haz clic para ver el video de presentación de Sofía"
              >
                <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex items-center justify-center">
                  {/* Glowing Neon Ring Pedestal */}
                  <div className="absolute bottom-1 w-48 h-12 rounded-[100%] bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166] opacity-80 blur-md -z-10 animate-pulse" />
                  <div className="absolute bottom-2.5 w-44 h-8 rounded-[100%] border-2 border-[#FF3858] shadow-[0_0_25px_#FF3858] -z-10" />
                  <div className="absolute -bottom-1 w-52 h-16 bg-[#FF3858]/35 rounded-[100%] blur-xl -z-10" />

                  {/* High Resolution Seated Sofía Art */}
                  <Image
                    src="/images/sofia_seated_art.jpg"
                    alt="Sofía - Diseño y UX"
                    fill
                    className="object-contain filter drop-shadow-[0_0_25px_rgba(255,56,88,0.7)] group-hover/avatar:scale-105 transition-transform duration-500 rounded-3xl mix-blend-lighten"
                    priority
                  />

                  {/* Play badge overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#FF3858] text-white flex items-center justify-center shadow-[0_0_30px_#FF3858] transform scale-90 group-hover/avatar:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
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

            {/* PRESENTATION VIDEO BUTTON (SOFÍA) */}
            <div className="pt-4 border-t border-white/10 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setActiveVideo({
                    title: "Sofía",
                    role: "Dirección UI/UX & Creatividad",
                    subtitle: "Hemisferio Creativo • Prototipos Interactivos a 60FPS",
                    videoSrc: "/videos/sofia_presentacion.mp4",
                    themeColor: "#FF3858",
                    secondaryColor: "#FF7A00",
                    avatarImg: "/images/sofia_seated_art.jpg",
                    icon: "🖌️",
                  })
                }
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-[#FF5470] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,56,88,0.4)] hover:shadow-[0_0_40px_rgba(255,56,88,0.65)] transition-all cursor-pointer hover:scale-[1.01] active:scale-98"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </div>
                <span>🎬 Ver Video de Presentación • Sofía (60FPS)</span>
              </button>
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
              <div
                onClick={() =>
                  setActiveVideo({
                    title: "Iván",
                    role: "CEO & Arquitectura Tech",
                    subtitle: "Hemisferio Lógico • Ingeniería de Software & Cloud",
                    videoSrc: "/videos/ivan_presentacion.mp4",
                    themeColor: "#00D1FF",
                    secondaryColor: "#3A86FF",
                    avatarImg: "/images/ivan_seated_tech.jpg",
                    icon: "⚡",
                  })
                }
                className="sm:col-span-5 flex items-center justify-center relative py-2 cursor-pointer group/avatar"
                title="Haz clic para ver el video de presentación de Iván"
              >
                <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex items-center justify-center">
                  {/* Glowing Cyber Ring Pedestal */}
                  <div className="absolute bottom-1 w-48 h-12 rounded-[100%] bg-gradient-to-r from-[#00D1FF] via-[#3A86FF] to-[#8A2BE2] opacity-80 blur-md -z-10 animate-pulse" />
                  <div className="absolute bottom-2.5 w-44 h-8 rounded-[100%] border-2 border-[#00D1FF] shadow-[0_0_25px_#00D1FF] -z-10" />
                  <div className="absolute -bottom-1 w-52 h-16 bg-[#00D1FF]/35 rounded-[100%] blur-xl -z-10" />

                  {/* High Resolution Seated Iván Tech */}
                  <Image
                    src="/images/ivan_seated_tech.jpg"
                    alt="Iván - Software y Arquitectura"
                    fill
                    className="object-contain filter drop-shadow-[0_0_25px_rgba(0,209,255,0.7)] group-hover/avatar:scale-105 transition-transform duration-500 rounded-3xl mix-blend-lighten"
                    priority
                  />

                  {/* Play badge overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#00D1FF] text-black flex items-center justify-center shadow-[0_0_30px_#00D1FF] transform scale-90 group-hover/avatar:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>
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

            {/* PRESENTATION VIDEO BUTTON (IVÁN) */}
            <div className="pt-4 border-t border-white/10 relative z-10">
              <button
                type="button"
                onClick={() =>
                  setActiveVideo({
                    title: "Iván",
                    role: "CEO & Arquitectura Tech",
                    subtitle: "Hemisferio Lógico • Ingeniería de Software & Cloud",
                    videoSrc: "/videos/ivan_presentacion.mp4",
                    themeColor: "#00D1FF",
                    secondaryColor: "#3A86FF",
                    avatarImg: "/images/ivan_seated_tech.jpg",
                    icon: "⚡",
                  })
                }
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] via-[#00B4D8] to-[#3A86FF] hover:from-[#00E5FF] hover:to-[#4D94FF] text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:shadow-[0_0_40px_rgba(0,209,255,0.65)] transition-all cursor-pointer hover:scale-[1.01] active:scale-98"
              >
                <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-black text-black ml-0.5" />
                </div>
                <span>⚡ Ver Video de Presentación • Iván (60FPS)</span>
              </button>
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

      {/* ========================================================== */}
      {/* CINEMATIC DARK LUXURY VIDEO MODAL */}
      {/* ========================================================== */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 z-0"
            onClick={() => setActiveVideo(null)}
          />

          <div
            className="relative z-10 w-full max-w-4xl rounded-[32px] sm:rounded-[36px] bg-[#07070D] border p-4 sm:p-6 shadow-[0_0_100px_rgba(0,0,0,0.95)] space-y-4 my-auto overflow-hidden animate-in zoom-in-95 duration-300"
            style={{
              borderColor: `${activeVideo.themeColor}60`,
              boxShadow: `0 0 80px ${activeVideo.themeColor}30`,
            }}
          >
            {/* Modal Ambient Glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
              style={{ backgroundColor: activeVideo.themeColor }}
            />

            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center border text-xl flex-shrink-0 overflow-hidden relative"
                  style={{
                    borderColor: `${activeVideo.themeColor}60`,
                    backgroundColor: `${activeVideo.themeColor}20`,
                  }}
                >
                  <Image
                    src={activeVideo.avatarImg}
                    alt={activeVideo.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase font-mono tracking-tight">
                      PRESENTACIÓN OFICIAL • {activeVideo.title}
                    </h3>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase hidden sm:inline-block"
                      style={{
                        color: activeVideo.themeColor,
                        borderColor: `${activeVideo.themeColor}50`,
                        backgroundColor: `${activeVideo.themeColor}15`,
                      }}
                    >
                      60FPS HD
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400">
                    {activeVideo.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Cerrar video"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-black border shadow-2xl aspect-video"
              style={{ borderColor: `${activeVideo.themeColor}40` }}
            >
              <video
                key={activeVideo.videoSrc}
                src={activeVideo.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>

            {/* Video Footer Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-gray-400 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" style={{ color: activeVideo.themeColor }} />
                <span>Innocentia Tech • Dual Core Architecture</span>
              </span>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[11px] font-mono transition-all cursor-pointer"
              >
                Cerrar Video (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
