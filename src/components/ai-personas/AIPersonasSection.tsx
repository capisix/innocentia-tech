"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Play, X, ArrowRight } from "../../lib/icons";

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

  return (
    <section id="ai-personas" className="relative py-24 bg-transparent overflow-hidden border-t border-white/10">
      {/* Background Ambience & Cyber Glow */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#FF3858]/25 via-[#FF3858]/8 to-transparent pointer-events-none blur-[140px]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#00D1FF]/25 via-[#00D1FF]/8 to-transparent pointer-events-none blur-[140px]" />

      <div className="max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-[11px] sm:text-xs font-mono tracking-wider text-[#FF3858] uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>IDENTIDAD & DUAL CORE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            LAS DOS INTELIGENCIAS DE INNOCENTIA
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto">
            Donde la imaginación se convierte en tecnología. Creatividad + Ingeniería trabajando en perfecta armonía.
          </p>
        </div>

        {/* 2 Big Master Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* ========================================================== */}
            {/* CARD 1: SOFÍA (ARTE TRANSPARENTE + DIÁLOGOS DE CRISTAL INTERACTIVOS) */}
            {/* ========================================================== */}
            <div 
              className="group relative rounded-[28px] sm:rounded-[36px] bg-transparent border-0 transition-all duration-500 select-none drop-shadow-[0_15px_35px_rgba(255,56,88,0.25)] hover:drop-shadow-[0_25px_60px_rgba(255,56,88,0.45)]"
              style={{ containerType: "inline-size" }}
            >
              {/* High-Resolution 3D Master Artwork Container - Totalmente Transparente */}
              <div className="relative w-full aspect-[1394/1128] overflow-hidden rounded-[26px] sm:rounded-[34px] bg-transparent">
                {/* Ambient Soft Glow Behind Character */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF3858]/20 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-60 h-60 bg-[#FF7A00]/15 rounded-full blur-[80px] pointer-events-none" />

                <Image
                  src="/images/sofia_card_art_clean.png"
                  alt="Sofía - Diseño, UX y Creatividad • Hemisferio Creativo Innocentia Tech"
                  fill
                  className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-[1.01]"
                  priority
                />

                {/* Left Area Click Trigger (Avatar) - Símbolo de video elegante en hover */}
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
                  className="absolute top-0 left-0 bottom-0 w-[52%] z-20 cursor-pointer group/avatar"
                  title="Haz clic para ver el video de presentación de Sofía"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 transform scale-90 group-hover/avatar:scale-100">
                    <div className="px-4 py-2.5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/30 text-white font-mono text-xs font-bold flex items-center gap-3 shadow-[0_0_35px_rgba(255,56,88,0.7)] group-hover/avatar:border-[#FF3858] transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF3858] to-[#FF7A00] flex items-center justify-center shadow-[0_0_15px_#FF3858] flex-shrink-0">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-[11px] font-black uppercase text-white tracking-wider">VER PRESENTACIÓN</div>
                        <div className="text-[9px] text-[#FF5470] font-medium font-mono">VIDEO HD • 60FPS</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* RIGHT SIDE: ANIMATED & INTERACTIVE GLASS DIALOGUE SYSTEM */}
                {/* ========================================================== */}
                <div 
                  className="absolute top-[23.5%] left-[54.5%] right-[3.2%] bottom-[2.2%] z-20 flex flex-col justify-between"
                  style={{ gap: "clamp(4px, 1.2cqi, 8px)" }}
                >
                  {/* Row 1: Subtitle Pill & Hemisferio Badge */}
                  <div className="flex flex-col items-center" style={{ gap: "clamp(2px, 0.7cqi, 5px)" }}>
                    <div 
                      className="w-full py-0.5 px-2 rounded-full bg-black/50 border border-[#FFD166]/40 backdrop-blur-md text-[#FFD166] font-mono font-black uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(255,209,102,0.6)] flex items-center justify-center leading-none"
                      style={{ fontSize: "clamp(6.5px, 2.1cqi, 11px)" }}
                    >
                      DISEÑO • UX • CREATIVIDAD
                    </div>
                    <div 
                      className="w-full py-0.5 px-2 rounded-full bg-[#FF3858]/15 border border-[#FF3858]/50 backdrop-blur-md text-[#FF5470] font-mono font-black uppercase tracking-widest text-center animate-pulse flex items-center justify-center leading-none"
                      style={{ fontSize: "clamp(6px, 1.8cqi, 9.5px)" }}
                    >
                      HEMISFERIO CREATIVO
                    </div>
                  </div>

                  {/* Row 2: Misión / Descripción Card */}
                  <div 
                    className="w-full rounded-[14px] sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF3858]/35 hover:border-[#FF3858]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(255,56,88,0.15)] flex items-center"
                    style={{ padding: "clamp(5px, 1.8cqi, 12px)" }}
                  >
                    <p 
                      className="text-gray-200 font-light leading-snug"
                      style={{ fontSize: "clamp(6px, 1.75cqi, 10px)" }}
                    >
                      Representa la <strong className="text-[#FF5470] font-semibold">imaginación</strong>, la creatividad y la sensibilidad del diseño. Convierte ideas en <strong className="text-[#FFD166] font-semibold">experiencias visuales memorables</strong>, intuitivas y emocionales.
                    </p>
                  </div>

                  {/* Row 3: Personalidad Card */}
                  <div 
                    className="w-full rounded-[14px] sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-[#FF3858]/35 hover:border-[#FF3858]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(255,56,88,0.15)] flex flex-col justify-center"
                    style={{ padding: "clamp(5px, 1.8cqi, 12px)", gap: "clamp(2px, 0.8cqi, 6px)" }}
                  >
                    <div 
                      className="inline-flex items-center font-mono font-bold text-[#FF5470] uppercase tracking-wider leading-none"
                      style={{ fontSize: "clamp(6px, 1.7cqi, 9px)" }}
                    >
                      PERSONALIDAD
                    </div>
                    <div className="flex flex-col" style={{ gap: "clamp(1px, 0.6cqi, 4px)" }}>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#FF3858]">💖</span>
                        <span>Curiosa y entusiasta</span>
                      </div>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#FFD166]">⭐</span>
                        <span>Empática y cercana</span>
                      </div>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#FF5470]">✨</span>
                        <span>Imaginativa y detallista</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Elementos Clave (3 Micro Cards) */}
                  <div className="w-full flex flex-col" style={{ gap: "clamp(2px, 0.8cqi, 5px)" }}>
                    <div 
                      className="font-mono font-bold text-[#FF5470] uppercase tracking-wider leading-none"
                      style={{ fontSize: "clamp(6px, 1.7cqi, 9px)" }}
                    >
                      ELEMENTOS CLAVE
                    </div>
                    <div className="grid grid-cols-3" style={{ gap: "clamp(3px, 1cqi, 8px)" }}>
                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#FF3858] hover:bg-[#FF3858]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span style={{ fontSize: "clamp(8px, 2.5cqi, 15px)" }}>🪄</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Pincel
                        </div>
                        <div className="text-[gray-400] text-[#FF5470] font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          Mágico
                        </div>
                      </div>

                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#FF3858] hover:bg-[#FF3858]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span style={{ fontSize: "clamp(8px, 2.5cqi, 15px)" }}>🎨</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Creatividad
                        </div>
                        <div className="text-gray-400 font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          & Inspiración
                        </div>
                      </div>

                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#FF3858] hover:bg-[#FF3858]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span style={{ fontSize: "clamp(8px, 2.5cqi, 15px)" }}>💖</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Empatía
                        </div>
                        <div className="text-gray-400 font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          & Pasión
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Botón Ver Presentación 60FPS */}
                  <div className="w-full">
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
                      className="w-full px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF3858] via-[#FF5470] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] border border-white/40 text-white font-mono font-black tracking-wide flex items-center justify-between shadow-[0_0_25px_rgba(255,56,88,0.65)] hover:shadow-[0_0_45px_rgba(255,56,88,0.95)] transition-all cursor-pointer hover:scale-[1.01] active:scale-98 group/btn"
                    >
                      <div 
                        className="rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover/btn:scale-110 transition-transform"
                        style={{ width: "clamp(14px, 3.2cqi, 20px)", height: "clamp(14px, 3.2cqi, 20px)" }}
                      >
                        <Play className="w-1/2 h-1/2 fill-white text-white ml-0.5" />
                      </div>
                      <span 
                        className="uppercase font-black text-white whitespace-nowrap drop-shadow-md leading-none"
                        style={{ fontSize: "clamp(6.5px, 2.0cqi, 10.5px)" }}
                      >
                        VER PRESENTACIÓN (60FPS)
                      </span>
                      <div 
                        className="rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover/btn:translate-x-0.5 transition-transform"
                        style={{ width: "clamp(14px, 3.2cqi, 20px)", height: "clamp(14px, 3.2cqi, 20px)" }}
                      >
                        <ArrowRight className="w-1/2 h-1/2 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hidden Semantic Metadata for Google SEO & Screen Readers */}
              <div className="sr-only">
                <h3>SOFÍA • DISEÑO, UX Y CREATIVIDAD</h3>
                <p>Hemisferio Creativo de Innocentia Tech. Representa la imaginación, la creatividad y la sensibilidad del diseño. Convierte ideas en experiencias visuales memorables, intuitivas y emocionales.</p>
                <p>Personalidad: Curiosa y entusiasta, Empática y cercana, Imaginativa y detallista.</p>
                <p>Elementos clave: Pincel Mágico, Creatividad & Inspiración, Empatía & Pasión.</p>
              </div>
            </div>

            {/* ========================================================== */}
            {/* CARD 2: IVÁN (ARTE TRANSPARENTE + DIÁLOGOS DE CRISTAL INTERACTIVOS) */}
            {/* ========================================================== */}
            <div 
              className="group relative rounded-[28px] sm:rounded-[36px] bg-transparent border-0 transition-all duration-500 select-none drop-shadow-[0_15px_35px_rgba(0,209,255,0.25)] hover:drop-shadow-[0_25px_60px_rgba(0,209,255,0.45)]"
              style={{ containerType: "inline-size" }}
            >
              {/* High-Resolution 3D Master Artwork Container - Totalmente Transparente */}
              <div className="relative w-full aspect-[1420/1108] overflow-hidden rounded-[26px] sm:rounded-[34px] bg-transparent">
                {/* Ambient Soft Glow Behind Character */}
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#00D1FF]/20 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-60 h-60 bg-[#3A86FF]/15 rounded-full blur-[80px] pointer-events-none" />

                <Image
                  src="/images/ivan_card_art_clean.png"
                  alt="Iván - Software, Arquitectura y Código • Hemisferio Lógico Innocentia Tech"
                  fill
                  className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-[1.01]"
                  priority
                />

                {/* Left Area Click Trigger (Avatar) - Símbolo de video elegante en hover */}
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
                  className="absolute top-0 left-0 bottom-0 w-[52%] z-20 cursor-pointer group/avatar"
                  title="Haz clic para ver el video de presentación de Iván"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 transform scale-90 group-hover/avatar:scale-100">
                    <div className="px-4 py-2.5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/30 text-white font-mono text-xs font-bold flex items-center gap-3 shadow-[0_0_35px_rgba(0,209,255,0.7)] group-hover/avatar:border-[#00D1FF] transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center shadow-[0_0_15px_#00D1FF] flex-shrink-0">
                        <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-[11px] font-black uppercase text-white tracking-wider">VER PRESENTACIÓN</div>
                        <div className="text-[9px] text-[#00D1FF] font-medium font-mono">VIDEO HD • 60FPS</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* RIGHT SIDE: ANIMATED & INTERACTIVE GLASS DIALOGUE SYSTEM */}
                {/* ========================================================== */}
                <div 
                  className="absolute top-[23.5%] left-[54.5%] right-[3.2%] bottom-[2.2%] z-20 flex flex-col justify-between"
                  style={{ gap: "clamp(4px, 1.2cqi, 8px)" }}
                >
                  {/* Row 1: Subtitle Pill & Hemisferio Badge */}
                  <div className="flex flex-col items-center" style={{ gap: "clamp(2px, 0.7cqi, 5px)" }}>
                    <div 
                      className="w-full py-0.5 px-2 rounded-full bg-black/50 border border-[#70D6FF]/40 backdrop-blur-md text-[#70D6FF] font-mono font-black uppercase tracking-normal text-center drop-shadow-[0_0_8px_rgba(112,214,255,0.6)] flex items-center justify-center leading-none"
                      style={{ fontSize: "clamp(6.5px, 2.1cqi, 11px)" }}
                    >
                      SOFTWARE • ARQUITECTURA • CÓDIGO
                    </div>
                    <div 
                      className="w-full py-0.5 px-2 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/50 backdrop-blur-md text-[#00D1FF] font-mono font-black uppercase tracking-widest text-center animate-pulse flex items-center justify-center leading-none"
                      style={{ fontSize: "clamp(6px, 1.8cqi, 9.5px)" }}
                    >
                      HEMISFERIO LÓGICO
                    </div>
                  </div>

                  {/* Row 2: Misión / Descripción Card */}
                  <div 
                    className="w-full rounded-[14px] sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-[#00D1FF]/35 hover:border-[#00D1FF]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(0,209,255,0.15)] flex items-center"
                    style={{ padding: "clamp(5px, 1.8cqi, 12px)" }}
                  >
                    <p 
                      className="text-gray-200 font-light leading-snug"
                      style={{ fontSize: "clamp(6px, 1.75cqi, 10px)" }}
                    >
                      Representa la <strong className="text-[#00D1FF] font-semibold">lógica</strong>, la estructura y la tecnología. Transforma ideas en <strong className="text-[#70D6FF] font-semibold">soluciones sólidas, escalables</strong>, eficientes y seguras.
                    </p>
                  </div>

                  {/* Row 3: Personalidad Card */}
                  <div 
                    className="w-full rounded-[14px] sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-[#00D1FF]/35 hover:border-[#00D1FF]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(0,209,255,0.15)] flex flex-col justify-center"
                    style={{ padding: "clamp(5px, 1.8cqi, 12px)", gap: "clamp(2px, 0.8cqi, 6px)" }}
                  >
                    <div 
                      className="inline-flex items-center font-mono font-bold text-[#00D1FF] uppercase tracking-wider leading-none"
                      style={{ fontSize: "clamp(6px, 1.7cqi, 9px)" }}
                    >
                      PERSONALIDAD
                    </div>
                    <div className="flex flex-col" style={{ gap: "clamp(1px, 0.6cqi, 4px)" }}>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#00D1FF]">⚙️</span>
                        <span>Lógico y analítico</span>
                      </div>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#70D6FF]">🛡️</span>
                        <span>Responsable y confiable</span>
                      </div>
                      <div 
                        className="flex items-center text-gray-200 font-medium leading-none"
                        style={{ fontSize: "clamp(5.5px, 1.6cqi, 9.5px)", gap: "clamp(3px, 1cqi, 6px)" }}
                      >
                        <span className="text-[#FFD166]">⚡</span>
                        <span>Innovador y enfocado</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Elementos Clave (3 Micro Cards) */}
                  <div className="w-full flex flex-col" style={{ gap: "clamp(2px, 0.8cqi, 5px)" }}>
                    <div 
                      className="font-mono font-bold text-[#00D1FF] uppercase tracking-wider leading-none"
                      style={{ fontSize: "clamp(6px, 1.7cqi, 9px)" }}
                    >
                      ELEMENTOS CLAVE
                    </div>
                    <div className="grid grid-cols-3" style={{ gap: "clamp(3px, 1cqi, 8px)" }}>
                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span className="font-mono text-[#00D1FF] font-black" style={{ fontSize: "clamp(7px, 2.2cqi, 13px)" }}>&lt;/&gt;</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Código
                        </div>
                        <div className="text-gray-400 font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          & Estructura
                        </div>
                      </div>

                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span style={{ fontSize: "clamp(8px, 2.5cqi, 15px)" }}>🧊</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Arquitectura
                        </div>
                        <div className="text-gray-400 font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          & Solidez
                        </div>
                      </div>

                      <div 
                        className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-default group/elem"
                        style={{ padding: "clamp(3px, 1.2cqi, 8px)", gap: "clamp(1px, 0.4cqi, 3px)" }}
                      >
                        <span style={{ fontSize: "clamp(8px, 2.5cqi, 15px)" }}>⚡</span>
                        <div className="font-bold text-white leading-tight" style={{ fontSize: "clamp(5.5px, 1.6cqi, 9px)" }}>
                          Ingeniería
                        </div>
                        <div className="text-gray-400 font-mono leading-none" style={{ fontSize: "clamp(4.5px, 1.3cqi, 7.5px)" }}>
                          & Eficiencia
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Botón Ver Presentación 60FPS */}
                  <div className="w-full">
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
                      className="w-full px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#00D1FF] via-[#00B4D8] to-[#3A86FF] hover:from-[#00E5FF] hover:to-[#4D94FF] border border-white/40 text-black font-mono font-black tracking-wide flex items-center justify-between shadow-[0_0_25px_rgba(0,209,255,0.65)] hover:shadow-[0_0_45px_rgba(0,209,255,0.95)] transition-all cursor-pointer hover:scale-[1.01] active:scale-98 group/btn"
                    >
                      <div 
                        className="rounded-full bg-black/25 flex items-center justify-center flex-shrink-0 group-hover/btn:scale-110 transition-transform"
                        style={{ width: "clamp(14px, 3.2cqi, 20px)", height: "clamp(14px, 3.2cqi, 20px)" }}
                      >
                        <Play className="w-1/2 h-1/2 fill-black text-black ml-0.5" />
                      </div>
                      <span 
                        className="uppercase font-black text-black whitespace-nowrap drop-shadow-sm leading-none"
                        style={{ fontSize: "clamp(6.5px, 2.0cqi, 10.5px)" }}
                      >
                        VER PRESENTACIÓN (60FPS)
                      </span>
                      <div 
                        className="rounded-full bg-black/25 flex items-center justify-center flex-shrink-0 group-hover/btn:translate-x-0.5 transition-transform"
                        style={{ width: "clamp(14px, 3.2cqi, 20px)", height: "clamp(14px, 3.2cqi, 20px)" }}
                      >
                        <ArrowRight className="w-1/2 h-1/2 text-black" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hidden Semantic Metadata for Google SEO & Screen Readers */}
              <div className="sr-only">
                <h3>IVÁN • SOFTWARE, ARQUITECTURA Y CÓDIGO</h3>
                <p>Hemisferio Lógico de Innocentia Tech. Representa la lógica, la estructura y la tecnología. Transforma ideas en soluciones sólidas, escalables, eficientes y seguras.</p>
                <p>Personalidad: Lógico y analítico, Responsable y confiable, Innovador y enfocado.</p>
                <p>Elementos clave: Código & Estructura, Arquitectura & Solidez, Ingeniería & Eficiencia.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* FOOTER TAGLINE BANNER */}
        {/* ========================================================== */}
        <div className="text-center pt-2 pb-4">
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-gray-400 uppercase">
            IMAGINACIÓN <span className="text-[#FF3858]">✦</span> TECNOLOGÍA <span className="text-[#00D1FF]">=</span> UN MUNDO MEJOR
          </span>
        </div>

        {/* ========================================================== */}
        {/* BANNER MASTER: IDEAS SIN LÍMITES, SOLUCIONES REALES */}
        {/* ========================================================== */}
        <div 
          className="p-[1.5px] rounded-[30px] sm:rounded-[38px] md:rounded-[44px] bg-gradient-to-r from-[#FF3858]/90 via-purple-600/70 to-[#00D1FF]/90 shadow-[0_0_60px_rgba(255,56,88,0.3),0_0_60px_rgba(0,209,255,0.3)] select-none"
          style={{ containerType: "inline-size" }}
        >
          <div className="relative w-full aspect-[1024/532] rounded-[28px] sm:rounded-[36px] md:rounded-[42px] overflow-hidden bg-[#07070E] group">
            {/* Master Cinematic Artwork */}
            <Image
              src="/images/dual_synergy_master_banner.jpg"
              alt="Ideas sin límites, Soluciones reales • Sofía & Iván • Innocentia Tech"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              priority
            />

            {/* Ambient Lighting FX */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

            {/* Clickable Interactive Hotspot: "DESCUBRE CÓMO CREAN JUNTOS" Button */}
            <button
              type="button"
              onClick={() =>
                setActiveVideo({
                  title: "Sofía & Iván",
                  role: "Dual Core Architecture",
                  subtitle: "Creatividad + Tecnología • Prototipos a Producción a 60FPS",
                  videoSrc: "/videos/sofia_presentacion.mp4",
                  themeColor: "#FF3858",
                  secondaryColor: "#00D1FF",
                  avatarImg: "/images/sofia_seated_art.jpg",
                  icon: "✨",
                })
              }
              className="absolute bottom-[20.8%] left-[4.2%] w-[26.2%] h-[6.8%] rounded-full z-20 cursor-pointer group/btn transition-transform active:scale-95 flex items-center justify-between px-2 text-transparent"
              title="Haz clic para ver cómo crean juntos en Innocentia Tech"
            >
              <div className="absolute inset-0 rounded-full border border-white/0 group-hover/btn:border-[#00D1FF]/80 group-hover/btn:bg-[#00D1FF]/10 group-hover/btn:shadow-[0_0_25px_rgba(0,209,255,0.6)] transition-all" />
            </button>

            {/* Clickable Interactive Hotspot: Sofía Area */}
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
              className="absolute top-[18%] left-[44%] w-[25%] h-[60%] z-20 cursor-pointer group/sofia"
              title="Haz clic para ver la presentación de Sofía"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/sofia:opacity-100 group-hover/sofia:bg-[#FF3858]/5 group-hover/sofia:shadow-[inset_0_0_40px_rgba(255,56,88,0.3)] transition-all flex items-center justify-center">
                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#FF3858]/60 text-white font-mono text-[10px] font-bold shadow-lg transform scale-90 group-hover/sofia:scale-100 transition-transform">
                  ▶ Ver Sofía
                </div>
              </div>
            </div>

            {/* Clickable Interactive Hotspot: Iván Area */}
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
              className="absolute top-[18%] left-[70%] w-[26%] h-[60%] z-20 cursor-pointer group/ivan"
              title="Haz clic para ver la presentación de Iván"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/ivan:opacity-100 group-hover/ivan:bg-[#00D1FF]/5 group-hover/ivan:shadow-[inset_0_0_40px_rgba(0,209,255,0.3)] transition-all flex items-center justify-center">
                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#00D1FF]/60 text-white font-mono text-[10px] font-bold shadow-lg transform scale-90 group-hover/ivan:scale-100 transition-transform">
                  ▶ Ver Iván
                </div>
              </div>
            </div>

            {/* Semantic SEO & Accessibility Info */}
            <div className="sr-only">
              <h3>IDEAS SIN LÍMITES, SOLUCIONES REALES</h3>
              <p>Creatividad y tecnología trabajando juntas para un mundo más extraordinario.</p>
              <p>Sofía: Imagina, Diseña, Conecta • Iván: Analiza, Construye, Optimiza</p>
              <p>Juntos: Crean, Resuelven, Hacen posible.</p>
              <p>Sofía imagina lo imposible (Arte, Emoción, Experiencias). Iván encuentra cómo hacerlo posible (Tecnología, Estructura, Resultados). Innocentia lo convierte en realidad.</p>
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
