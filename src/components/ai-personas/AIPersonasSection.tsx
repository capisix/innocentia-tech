"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Play, X, ArrowRight, Paintbrush } from "../../lib/icons";

interface PersonaVideoData {
  title: string;
  role: string;
  subtitle: string;
  videoSrcDesktop: string;
  videoSrcMobile: string;
  themeColor: string;
  secondaryColor: string;
  avatarImg: string;
  icon: string;
}

const SOFIA_VIDEO: PersonaVideoData = {
  title: "Sofía",
  role: "Dirección UI/UX & Creatividad",
  subtitle: "Hemisferio Creativo • Prototipos Interactivos a 60FPS",
  videoSrcDesktop: "/videos/sofia_presentacion.mp4",
  videoSrcMobile: "/videos/sofia_presentacion_celular.mp4",
  themeColor: "#FF3858",
  secondaryColor: "#FF7A00",
  avatarImg: "/images/sofia_seated_art.jpg",
  icon: "🖌️",
};

const IVAN_VIDEO: PersonaVideoData = {
  title: "Iván",
  role: "CEO & Arquitectura Tech",
  subtitle: "Hemisferio Lógico • Ingeniería de Software & Cloud",
  videoSrcDesktop: "/videos/ivan_presentacion.mp4",
  videoSrcMobile: "/videos/ivan_presentacion_celular.mp4",
  themeColor: "#00D1FF",
  secondaryColor: "#3A86FF",
  avatarImg: "/images/ivan_seated_tech.jpg",
  icon: "⚡",
};

const DUAL_VIDEO: PersonaVideoData = {
  title: "Sofía & Iván",
  role: "Dual Core Architecture",
  subtitle: "Creatividad + Tecnología • Prototipos a Producción a 60FPS",
  videoSrcDesktop: "/videos/sofia_ivan_dual.mp4",
  videoSrcMobile: "/videos/sofia_ivan_dual_celular.mp4",
  themeColor: "#00D1FF",
  secondaryColor: "#FF3858",
  avatarImg: "/images/dual_adults_master_transparent.png",
  icon: "✨",
};

const HASHTAG_SETS = [
  {
    category: "DISEÑO & EXPERIENCIA",
    color: "#FF3858",
    badge: "🎨 SOFÍA",
    tags: ["#DiseñoUXUI", "#DesignSystems", "#MicroInteracciones", "#FigmaToCode", "#Prototipos60FPS"],
  },
  {
    category: "INGENIERÍA & IA",
    color: "#00D1FF",
    badge: "⚡ IVÁN",
    tags: ["#InteligenciaArtificial", "#NextJS15", "#CloudArchitecture", "#APIsEscalables", "#FullStack"],
  },
  {
    category: "PRODUCTO & ESCALABILIDAD",
    color: "#FFD166",
    badge: "🚀 DUAL CORE",
    tags: ["#SaaSEnterprise", "#AppsMóviles", "#CotizadoresOnline", "#Automatización", "#AltaVelocidad"],
  },
  {
    category: "TRANSFORMACIÓN DIGITAL",
    color: "#A855F7",
    badge: "♾️ INNOCENTIA",
    tags: ["#TransformaciónDigital", "#CleanArchitecture", "#BasesDeDatos", "#Seguridad", "#WebApps"],
  },
];

export default function AIPersonasSection() {
  const [activeVideo, setActiveVideo] = useState<PersonaVideoData | null>(null);
  const [videoFormat, setVideoFormat] = useState<"mobile" | "desktop">("mobile");
  const [activeTagSet, setActiveTagSet] = useState(0);

  const openVideo = (data: PersonaVideoData, forceFormat?: "mobile" | "desktop") => {
    if (forceFormat) {
      setVideoFormat(forceFormat);
    } else {
      const isMobileDevice =
        typeof window !== "undefined" &&
        (window.innerWidth < 1024 || window.innerHeight > window.innerWidth);
      setVideoFormat(isMobileDevice ? "mobile" : "desktop");
    }
    setActiveVideo(data);
  };

  // Rotate hashtag sets every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTagSet((prev) => (prev + 1) % HASHTAG_SETS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

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
            {/* CARD 1: SOFÍA (DESKTOP & MOBILE RESPONSIVE) */}
            {/* ========================================================== */}
            <div className="space-y-4 sm:space-y-5 flex flex-col justify-between">
              {/* DESKTOP & TABLET VIEW: CLEAN HIGH-DEF ARTWORK (Click-to-Play Video) */}
              <div 
                onClick={() => openVideo(SOFIA_VIDEO, "desktop")}
                className="hidden md:block relative w-full aspect-[1024/825] overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#07070E] border border-[#FF3858]/35 shadow-[0_15px_45px_rgba(255,56,88,0.2)] hover:shadow-[0_20px_60px_rgba(255,56,88,0.35)] transition-all duration-500 cursor-pointer group/art select-none"
                title="Haz clic para ver el video de presentación de Sofía"
              >
                {/* Ambient Soft Glow */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF3858]/20 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-60 h-60 bg-[#FF7A00]/15 rounded-full blur-[80px] pointer-events-none" />

                <Image
                  src="/images/sofia_desktop.png"
                  alt="Sofía - Diseño, UX y Creatividad • Hemisferio Creativo Innocentia Tech"
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain relative z-10 transition-transform duration-700 group-hover/art:scale-[1.02]"
                  priority
                />

                {/* Center Hover Presentation Trigger Badge */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover/art:opacity-100 transition-all duration-300 transform scale-90 group-hover/art:scale-100">
                  <div className="px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-2xl border border-[#FF3858]/80 text-white font-mono text-xs font-bold flex items-center gap-3.5 shadow-[0_0_35px_rgba(255,56,88,0.7)]">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF3858] to-[#FF7A00] flex items-center justify-center shadow-[0_0_15px_#FF3858] flex-shrink-0">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-[12px] font-black uppercase text-white tracking-wider">VER PRESENTACIÓN</div>
                      <div className="text-[9.5px] text-[#FF5470] font-medium font-mono">VIDEO HD • 60FPS</div>
                    </div>
                  </div>
                </div>

                {/* Sleek Floating Bottom-Right Pill Button - Properly Aligned Inside Frame */}
                <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-auto">
                  <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1A0812]/90 via-black/85 to-[#1A0812]/90 hover:from-[#2E0B1F] hover:to-[#2E0B1F] backdrop-blur-xl border border-[#FF3858]/70 hover:border-[#FF3858] text-white font-mono font-bold tracking-wide flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(255,56,88,0.35)] transition-all cursor-pointer group-hover/art:border-[#FF3858]">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FF3858] to-[#FF7A00] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_#FF3858]">
                      <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap drop-shadow-md leading-none">
                      Sofía presentación
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </div>
              </div>

              {/* MOBILE VIEW (Dedicated Portrait Artwork) */}
              <div 
                onClick={() => openVideo(SOFIA_VIDEO, "mobile")}
                className="block md:hidden relative w-full aspect-[576/1024] rounded-[24px] overflow-hidden bg-[#07070E] border border-[#FF3858]/40 shadow-[0_15px_45px_rgba(255,56,88,0.25)] cursor-pointer group/mobart active:scale-[0.99] transition-transform select-none"
                title="Toca para ver el video de presentación de Sofía"
              >
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#FF3858]/20 rounded-full blur-[60px] pointer-events-none" />
                <Image
                  src="/images/sofia_mobile.jpg"
                  alt="Sofía - Hemisferio Creativo • Innocentia Tech"
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain relative z-10"
                  priority
                />
              </div>

              {/* RECTÁNGULO DE CARACTERÍSTICAS & PRESENTACIÓN: SOFÍA */}
              <div className="rounded-[24px] sm:rounded-[30px] bg-[#0A0710]/95 backdrop-blur-2xl border border-[#FF3858]/40 p-4 sm:p-5 space-y-4 shadow-[0_15px_35px_rgba(255,56,88,0.15)] transition-all">
                {/* Header Identidad */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF3858]/15 border border-[#FF3858]/40 flex items-center justify-center text-[#FF3858] shadow-[0_0_12px_rgba(255,56,88,0.3)]">
                      <Paintbrush className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-white font-mono tracking-wide">SOFÍA</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-[#FF5470] font-mono text-[10px] font-bold uppercase">
                          UI / UX & Creatividad
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[#FF5470] font-medium">
                        ✦ HEMISFERIO CREATIVO
                      </div>
                    </div>
                  </div>
                  <span className="text-xl">🎨</span>
                </div>

                {/* Misión / Descripción */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                    Representa la <strong className="text-[#FF5470] font-semibold">imaginación</strong>, la creatividad y la sensibilidad del diseño. Convierte ideas en <strong className="text-[#FFD166] font-semibold">experiencias visuales memorables</strong>, intuitivas y emocionales.
                  </p>
                </div>

                {/* Personalidad & Enfoque */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-[#FF3858]">✦</span> PERSONALIDAD & ENFOQUE
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">💖</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Curiosa y entusiasta</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">⭐</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Empática y cercana</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">✨</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Imaginativa y detallista</span>
                    </div>
                  </div>
                </div>

                {/* Elementos Clave (3 Micro Cards) */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-[#FF3858]">✦</span> ELEMENTOS CLAVE
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#FF3858]/10 border border-[#FF3858]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-base mb-0.5">🪄</span>
                      <div className="text-xs font-bold text-white leading-tight">Pincel Mágico</div>
                      <div className="text-[10px] text-[#FF5470] font-mono">Diseño & Arte</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#FF3858]/10 border border-[#FF3858]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-base mb-0.5">🎨</span>
                      <div className="text-xs font-bold text-white leading-tight">Creatividad</div>
                      <div className="text-[10px] text-gray-400 font-mono">& Inspiración</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#FF3858]/10 border border-[#FF3858]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-base mb-0.5">💖</span>
                      <div className="text-xs font-bold text-white leading-tight">Empatía</div>
                      <div className="text-[10px] text-gray-400 font-mono">& Pasión</div>
                    </div>
                  </div>
                </div>

                {/* Botón de Presentación */}
                <button
                  type="button"
                  onClick={() => openVideo(SOFIA_VIDEO, "desktop")}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1A0812] via-black to-[#1A0812] hover:from-[#2E0B1F] hover:to-[#2E0B1F] backdrop-blur-xl border border-[#FF3858]/70 hover:border-[#FF3858] text-white font-mono font-bold tracking-wide flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(255,56,88,0.25)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.9),0_0_30px_rgba(255,56,88,0.5)] transition-all cursor-pointer group/btn"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF3858] to-[#FF7A00] flex items-center justify-center flex-shrink-0 group-hover/btn:scale-110 shadow-[0_0_10px_#FF3858] transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Ver presentación de Sofía (Video HD • 60 FPS)
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/70 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                </button>
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
            {/* CARD 2: IVÁN (DESKTOP & MOBILE RESPONSIVE) */}
            {/* ========================================================== */}
            <div className="space-y-4 sm:space-y-5 flex flex-col justify-between">
              {/* DESKTOP & TABLET VIEW: CLEAN HIGH-DEF ARTWORK (Click-to-Play Video) */}
              <div 
                onClick={() => openVideo(IVAN_VIDEO, "desktop")}
                className="hidden md:block relative w-full aspect-[1024/825] overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#040810] border border-[#00D1FF]/35 shadow-[0_15px_45px_rgba(0,209,255,0.2)] hover:shadow-[0_20px_60px_rgba(0,209,255,0.35)] transition-all duration-500 cursor-pointer group/art select-none"
                title="Haz clic para ver el video de presentación de Iván"
              >
                {/* Ambient Soft Glow */}
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#00D1FF]/20 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-60 h-60 bg-[#3A86FF]/15 rounded-full blur-[80px] pointer-events-none" />

                <Image
                  src="/images/ivan_desktop.png"
                  alt="Iván - Software, Arquitectura y Código • Hemisferio Lógico Innocentia Tech"
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain relative z-10 transition-transform duration-700 group-hover/art:scale-[1.02]"
                  priority
                />

                {/* Center Hover Presentation Trigger Badge */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover/art:opacity-100 transition-all duration-300 transform scale-90 group-hover/art:scale-100">
                  <div className="px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-2xl border border-[#00D1FF]/80 text-white font-mono text-xs font-bold flex items-center gap-3.5 shadow-[0_0_35px_rgba(0,209,255,0.7)]">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center shadow-[0_0_15px_#00D1FF] flex-shrink-0">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-[12px] font-black uppercase text-white tracking-wider">VER PRESENTACIÓN</div>
                      <div className="text-[9.5px] text-[#00D1FF] font-medium font-mono">VIDEO HD • 60FPS</div>
                    </div>
                  </div>
                </div>

                {/* Sleek Floating Bottom-Right Pill Button - Properly Aligned Inside Frame */}
                <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-auto">
                  <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#06101E]/90 via-black/85 to-[#06101E]/90 hover:from-[#0B1E38] hover:to-[#0B1E38] backdrop-blur-xl border border-[#00D1FF]/70 hover:border-[#00D1FF] text-white font-mono font-bold tracking-wide flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(0,209,255,0.35)] transition-all cursor-pointer group-hover/art:border-[#00D1FF]">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_#00D1FF]">
                      <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap drop-shadow-md leading-none">
                      Iván presentación
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </div>
              </div>

              {/* MOBILE VIEW (Dedicated Portrait Artwork) */}
              <div 
                onClick={() => openVideo(IVAN_VIDEO, "mobile")}
                className="block md:hidden relative w-full aspect-[576/1024] rounded-[24px] overflow-hidden bg-[#040810] border border-[#00D1FF]/40 shadow-[0_15px_45px_rgba(0,209,255,0.25)] cursor-pointer group/mobart active:scale-[0.99] transition-transform select-none"
                title="Toca para ver el video de presentación de Iván"
              >
                <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[#00D1FF]/20 rounded-full blur-[60px] pointer-events-none" />
                <Image
                  src="/images/ivan_mobile.jpg"
                  alt="Iván - Hemisferio Lógico • Innocentia Tech"
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain relative z-10"
                  priority
                />
              </div>

              {/* RECTÁNGULO DE CARACTERÍSTICAS & PRESENTACIÓN: IVÁN */}
              <div className="rounded-[24px] sm:rounded-[30px] bg-[#050A14]/95 backdrop-blur-2xl border border-[#00D1FF]/40 p-4 sm:p-5 space-y-4 shadow-[0_15px_35px_rgba(0,209,255,0.15)] transition-all">
                {/* Header Identidad */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#00D1FF]/15 border border-[#00D1FF]/40 flex items-center justify-center text-[#00D1FF] font-mono font-bold text-xs shadow-[0_0_12px_rgba(0,209,255,0.3)]">
                      &lt;/&gt;
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-white font-mono tracking-wide">IVÁN</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[#00D1FF] font-mono text-[10px] font-bold uppercase">
                          Arquitectura & Software
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[#00D1FF] font-medium">
                        ✦ HEMISFERIO LÓGICO
                      </div>
                    </div>
                  </div>
                  <span className="text-xl">⚙️</span>
                </div>

                {/* Misión / Descripción */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                    Representa la <strong className="text-[#00D1FF] font-semibold">lógica</strong>, la estructura y la tecnología. Transforma ideas en <strong className="text-[#70D6FF] font-semibold">soluciones sólidas, escalables</strong>, eficientes y seguras.
                  </p>
                </div>

                {/* Personalidad & Enfoque */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-[#00D1FF]">✦</span> PERSONALIDAD & ENFOQUE
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">⚙️</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Lógico y analítico</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">🛡️</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Responsable y confiable</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2 text-left">
                      <span className="text-sm flex-shrink-0">⚡</span>
                      <span className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight">Innovador y enfocado</span>
                    </div>
                  </div>
                </div>

                {/* Elementos Clave (3 Micro Cards) */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-[#00D1FF]">✦</span> ELEMENTOS CLAVE
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#00D1FF]/10 border border-[#00D1FF]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-xs font-mono font-black text-[#00D1FF] mb-0.5">&lt;/&gt;</span>
                      <div className="text-xs font-bold text-white leading-tight">Código</div>
                      <div className="text-[10px] text-[#00D1FF] font-mono">& Estructura</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#00D1FF]/10 border border-[#00D1FF]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-base mb-0.5">🧊</span>
                      <div className="text-xs font-bold text-white leading-tight">Arquitectura</div>
                      <div className="text-[10px] text-gray-400 font-mono">& Solidez</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#00D1FF]/10 border border-[#00D1FF]/30 transition-all flex flex-col items-center text-center">
                      <span className="text-base mb-0.5">⚡</span>
                      <div className="text-xs font-bold text-white leading-tight">Ingeniería</div>
                      <div className="text-[10px] text-gray-400 font-mono">& Eficiencia</div>
                    </div>
                  </div>
                </div>

                {/* Botón de Presentación */}
                <button
                  type="button"
                  onClick={() => openVideo(IVAN_VIDEO, "desktop")}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#06101E] via-black to-[#06101E] hover:from-[#0B1E38] hover:to-[#0B1E38] backdrop-blur-xl border border-[#00D1FF]/70 hover:border-[#00D1FF] text-white font-mono font-bold tracking-wide flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(0,209,255,0.25)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.9),0_0_30px_rgba(0,209,255,0.5)] transition-all cursor-pointer group/btn"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center flex-shrink-0 group-hover/btn:scale-110 shadow-[0_0_10px_#00D1FF] transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Ver presentación de Iván (Video HD • 60 FPS)
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/70 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                </button>
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
        {/* BANNER MASTER: IDEAS SIN LÍMITES, SOLUCIONES REALES (CINEMATIC INTERACTIVE UI) */}
        {/* ========================================================== */}
        <div className="p-[1.5px] rounded-[32px] sm:rounded-[44px] bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] shadow-[0_0_60px_rgba(255,56,88,0.3),0_0_60px_rgba(0,209,255,0.3)]">
          <div className="relative rounded-[30px] sm:rounded-[42px] bg-[#07070E] p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden text-left group">
            {/* Ambient Halos Behind Content */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF3858]/15 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00D1FF]/15 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* ========================================================== */}
            {/* MOBILE DUAL CORE MASTER CARD (Dedicated Vertical Studio Artwork + Video Trigger) */}
            {/* ========================================================== */}
            <div className="block lg:hidden space-y-6">
              {/* Header Info */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-gray-200 uppercase backdrop-blur-xl shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>CUANDO DOS FORMAS DE PENSAR SE ENCUENTRAN</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  IDEAS SIN LÍMITES, <br />
                  <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,56,88,0.4)]">
                    SOLUCIONES REALES.
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Creatividad y tecnología trabajando juntas para transformar visiones complejas en productos de clase mundial.
                </p>
              </div>

              {/* Master Full-Bleed Vertical Studio Artwork for Dual (576x1024 Native 9:16 Aspect Ratio) */}
              <div className="rounded-[28px] sm:rounded-[32px] bg-[#07070E]/90 backdrop-blur-2xl border border-cyan-400/30 p-3 sm:p-4 space-y-3.5 shadow-[0_15px_45px_rgba(0,209,255,0.2),0_15px_45px_rgba(255,56,88,0.2)]">
                <div 
                  onClick={() => openVideo(DUAL_VIDEO, "mobile")}
                  className="relative w-full aspect-[576/1024] rounded-[22px] overflow-hidden cursor-pointer group/mobdual shadow-2xl border border-white/15 active:scale-[0.99] transition-transform"
                  title="Toca para ver el video de presentación Dual Core"
                >
                  {/* Halos */}
                  <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#FF3858]/25 rounded-full blur-[60px] pointer-events-none" />
                  <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[#00D1FF]/25 rounded-full blur-[60px] pointer-events-none" />

                  <Image
                    src="/images/dual_mobile.jpg"
                    alt="Sofía & Iván Dual Core • Innocentia Tech"
                    fill
                    quality={100}
                    unoptimized
                    className="object-contain relative z-10"
                    priority
                  />
                </div>

                {/* Mobile Action Presentation Button */}
                <button
                  type="button"
                  onClick={() => openVideo(DUAL_VIDEO, "mobile")}
                  className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#00D1FF]/25 via-black to-[#FF3858]/25 hover:from-[#00D1FF]/40 hover:to-[#FF3858]/40 backdrop-blur-2xl border border-cyan-400/80 text-white font-mono text-xs font-bold tracking-wide flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.9),0_0_30px_rgba(0,209,255,0.35)] cursor-pointer active:scale-98 transition-all group/btn"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#FF3858] flex items-center justify-center shadow-[0_0_12px_#00D1FF] flex-shrink-0 group-hover/btn:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider text-white">Sofía & Iván Dual Core (60 FPS)</span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4 text-cyan-300" />
                  </div>
                </button>
              </div>

              {/* Twin Synergy Cards: Sofía + Iván */}
              <div className="flex items-stretch gap-2.5 pt-1">
                {/* Sofía Card */}
                <div className="flex-1 rounded-2xl bg-black/80 backdrop-blur-2xl border border-[#FF3858]/40 p-3 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#FF3858] uppercase">
                      <Paintbrush className="w-3.5 h-3.5" />
                      <span>SOFÍA</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF3858]/20 text-[#FF5470] border border-[#FF3858]/30">UI / UX</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-gray-200 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF3858]">💖</span>
                      <span>Imagina</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFD166]">🎨</span>
                      <span>Diseña</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF5470]">✨</span>
                      <span>Conecta</span>
                    </div>
                  </div>
                </div>

                {/* Connecting Plus Sign */}
                <div className="flex items-center justify-center text-lg font-mono text-white/50 px-0.5 font-bold select-none">
                  +
                </div>

                {/* Iván Card */}
                <div className="flex-1 rounded-2xl bg-black/80 backdrop-blur-2xl border border-[#00D1FF]/40 p-3 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#00D1FF] uppercase">
                      <span className="font-mono font-black text-[#00D1FF]">&lt;/&gt;</span>
                      <span>IVÁN</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30">DEV / IA</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-gray-200 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00D1FF]">🧊</span>
                      <span>Analiza</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#70D6FF]">⚙️</span>
                      <span>Construye</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFD166]">⚡</span>
                      <span>Optimiza</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* JUNTOS Synergy Card */}
              <div className="w-full rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 p-3 space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-[#00D1FF]">♾️</span>
                    <span className="bg-gradient-to-r from-[#FF3858] via-purple-400 to-[#00D1FF] bg-clip-text text-transparent font-black">
                      SINERGIA DUAL CORE
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-normal">DE CONCEPTO A PRODUCCIÓN</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-200">
                  <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-1.5 text-center">
                    <span>👥</span>
                    <span className="text-[11px]">Crean</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-1.5 text-center">
                    <span>💡</span>
                    <span className="text-[11px]">Resuelven</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-1.5 text-center">
                    <span>🚀</span>
                    <span className="text-[11px]">Evolucionan</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Rotating Hashtags Rectangle Console (Mobile) */}
              <div className="w-full p-[1px] rounded-2xl bg-gradient-to-r from-[#FF3858]/35 via-purple-500/25 to-[#00D1FF]/35 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
                <div className="rounded-[15px] bg-[#0A0A16]/90 backdrop-blur-2xl p-3 space-y-2 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500" 
                        style={{ backgroundColor: HASHTAG_SETS[activeTagSet].color }} 
                      />
                      <span className="font-bold uppercase tracking-wider text-white">CAPACIDADES</span>
                      <span className="text-gray-500">•</span>
                      <span 
                        className="font-bold tracking-wide transition-colors duration-500"
                        style={{ color: HASHTAG_SETS[activeTagSet].color }}
                      >
                        {HASHTAG_SETS[activeTagSet].badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {HASHTAG_SETS.map((set, idx) => (
                        <button
                          key={set.category}
                          type="button"
                          onClick={() => setActiveTagSet(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            activeTagSet === idx
                              ? "w-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                              : "w-1.5 bg-white/25 hover:bg-white/50"
                          }`}
                          aria-label={`Ver conjunto ${set.category}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                    {HASHTAG_SETS[activeTagSet].tags.map((tag, tagIdx) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] font-mono font-medium text-gray-200"
                        style={{
                          borderColor: tagIdx === 0 ? `${HASHTAG_SETS[activeTagSet].color}60` : undefined,
                          color: tagIdx === 0 ? HASHTAG_SETS[activeTagSet].color : undefined,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* DESKTOP DUAL CORE MASTER VIEW (12-Column Wide Grid) */}
            {/* ========================================================== */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch relative z-20">
              {/* Left Column: Typography, Synergy Glass Cards & Interactive Button */}
              <div className="col-span-5 flex flex-col justify-between h-full space-y-4">
                {/* Top Badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 text-xs font-mono font-bold text-gray-200 uppercase backdrop-blur-xl shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>CUANDO DOS FORMAS DE PENSAR SE ENCUENTRAN</span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-[1.15]">
                  IDEAS SIN LÍMITES, <br />
                  <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,56,88,0.4)]">
                    SOLUCIONES REALES.
                  </span>
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Creatividad y tecnología trabajando juntas para transformar visiones complejas en productos de clase mundial.
                </p>

                {/* Twin Synergy Cards: Sofía + Iván */}
                <div className="flex items-stretch gap-2.5 pt-0.5">
                  {/* Sofía Card */}
                  <div className="flex-1 rounded-2xl bg-black/80 backdrop-blur-2xl border border-[#FF3858]/40 hover:border-[#FF3858] transition-all p-3 shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_20px_rgba(255,56,88,0.15)] group/sofia flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#FF3858] uppercase">
                        <Paintbrush className="w-3.5 h-3.5" />
                        <span>SOFÍA</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF3858]/20 text-[#FF5470] border border-[#FF3858]/30">UI / UX</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-gray-200 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF3858]">💖</span>
                        <span>Imagina</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFD166]">🎨</span>
                        <span>Diseña</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF5470]">✨</span>
                        <span>Conecta</span>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Plus Sign */}
                  <div className="flex items-center justify-center text-lg font-mono text-white/50 px-0.5 font-bold select-none">
                    +
                  </div>

                  {/* Iván Card */}
                  <div className="flex-1 rounded-2xl bg-black/80 backdrop-blur-2xl border border-[#00D1FF]/40 hover:border-[#00D1FF] transition-all p-3 shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_20px_rgba(0,209,255,0.15)] group/ivan flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#00D1FF] uppercase">
                        <span className="font-mono font-black text-[#00D1FF]">&lt;/&gt;</span>
                        <span>IVÁN</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30">DEV / IA</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-gray-200 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00D1FF]">🧊</span>
                        <span>Analiza</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#70D6FF]">⚙️</span>
                        <span>Construye</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFD166]">⚡</span>
                        <span>Optimiza</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JUNTOS Synergy Card */}
                <div className="w-full rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 p-3 space-y-2 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-[#00D1FF]">♾️</span>
                      <span className="bg-gradient-to-r from-[#FF3858] via-purple-400 to-[#00D1FF] bg-clip-text text-transparent font-black">
                        SINERGIA DUAL CORE
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-normal">DE CONCEPTO A PRODUCCIÓN</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-200">
                    <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF3858]/60 flex items-center justify-center gap-1.5 text-center transition-colors">
                      <span>👥</span>
                      <span className="text-[11px]">Crean</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FFD166]/60 flex items-center justify-center gap-1.5 text-center transition-colors">
                      <span>💡</span>
                      <span className="text-[11px]">Resuelven</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00D1FF]/60 flex items-center justify-center gap-1.5 text-center transition-colors">
                      <span>🚀</span>
                      <span className="text-[11px]">Evolucionan</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Button (Pinned to Bottom) */}
                <button
                  type="button"
                  onClick={() => openVideo(DUAL_VIDEO, "desktop")}
                  className="w-full mt-auto px-4 py-3 rounded-full bg-gradient-to-r from-[#00D1FF]/25 via-black/90 to-[#FF3858]/25 hover:from-[#00D1FF]/40 hover:to-[#FF3858]/40 border border-[#00D1FF]/60 hover:border-white text-white font-mono text-xs font-black tracking-wider flex items-center justify-between shadow-[0_0_30px_rgba(0,209,255,0.25)] hover:shadow-[0_0_45px_rgba(0,209,255,0.5)] transition-all cursor-pointer hover:scale-[1.01] active:scale-98 group/btn"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center shadow-[0_0_12px_#00D1FF] flex-shrink-0 group-hover/btn:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  </div>
                  <span className="uppercase text-white tracking-widest text-xs">
                    DESCUBRE CÓMO CREAN JUNTOS
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#00D1FF] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Column: Hero Artwork with Glowing Badges & Dynamic Console (Pinned to Bottom) */}
              <div className="col-span-7 relative w-full flex flex-col justify-between h-full">
                {/* Floating Holographic Labels */}
                <div className="w-full flex items-center justify-between px-4 mb-2 z-30">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-xl border border-[#FF3858]/50 text-xs font-mono font-bold text-[#FF5470] shadow-[0_0_18px_rgba(255,56,88,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3858] animate-ping" />
                    <span>DIRECCIÓN UI/UX</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-xl border border-[#00D1FF]/50 text-xs font-mono font-bold text-[#00D1FF] shadow-[0_0_18px_rgba(0,209,255,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-ping" />
                    <span>ARQUITECTURA & IA</span>
                  </div>
                </div>

                {/* Main Illustration Container - Expanded & Prominent */}
                <div 
                  onClick={() => openVideo(DUAL_VIDEO, "desktop")}
                  className="relative w-full flex-1 min-h-[350px] lg:min-h-[390px] cursor-pointer group/art transition-transform duration-500 hover:scale-[1.015] flex items-center justify-center my-1"
                  title="Haz clic para ver cómo trabajan juntos Sofía e Iván"
                >
                  {/* Subtle Character Halo Glows */}
                  <div className="absolute top-1/4 left-1/10 w-64 h-64 bg-[#FF3858]/30 rounded-full blur-[90px] pointer-events-none" />
                  <div className="absolute top-1/4 right-1/10 w-64 h-64 bg-[#00D1FF]/30 rounded-full blur-[90px] pointer-events-none" />
                  <div className="absolute inset-x-1/4 top-1/3 w-56 h-56 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

                  <Image
                    src="/images/dual_adults_master_transparent.png"
                    alt="Sofía e Iván • Dual Core Innocentia Tech"
                    fill
                    className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover/art:scale-[1.02]"
                    priority
                  />

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/art:opacity-100 transition-all duration-300">
                    <div className="px-5 py-2.5 rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/30 text-white font-mono text-xs font-bold flex items-center gap-2.5 shadow-[0_0_40px_rgba(0,209,255,0.7)]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#FF3858] flex items-center justify-center shadow-[0_0_10px_#00D1FF]">
                        <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                      </div>
                      <span>VER PRESENTACIÓN DUAL CORE</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Rotating Hashtags Rectangle Console (Desktop) - Bottom-Aligned with Left Button */}
                <div className="w-full mt-auto p-[1px] rounded-2xl bg-gradient-to-r from-[#FF3858]/35 via-purple-500/25 to-[#00D1FF]/35 shadow-[0_4px_25px_rgba(0,0,0,0.8)] z-30">
                  <div className="rounded-[15px] bg-[#0A0A16]/90 backdrop-blur-2xl p-3.5 space-y-2 border border-white/10">
                    {/* Header Row: Live indicator & Category Title */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500" 
                          style={{ backgroundColor: HASHTAG_SETS[activeTagSet].color }} 
                        />
                        <span className="font-bold uppercase tracking-wider text-white">CAPACIDADES EN TIEMPO REAL</span>
                        <span className="text-gray-500">•</span>
                        <span 
                          className="font-bold tracking-wide transition-colors duration-500"
                          style={{ color: HASHTAG_SETS[activeTagSet].color }}
                        >
                          {HASHTAG_SETS[activeTagSet].badge}
                        </span>
                      </div>
                      
                      {/* Pagination Dots */}
                      <div className="flex items-center gap-1.5">
                        {HASHTAG_SETS.map((set, idx) => (
                          <button
                            key={set.category}
                            type="button"
                            onClick={() => setActiveTagSet(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              activeTagSet === idx
                                ? "w-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                                : "w-1.5 bg-white/25 hover:bg-white/50"
                            }`}
                            aria-label={`Ver conjunto ${set.category}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Hashtag Chips */}
                    <div className="flex flex-wrap items-center justify-start gap-2 pt-0.5 min-h-[30px] transition-all duration-500">
                      {HASHTAG_SETS[activeTagSet].tags.map((tag, tagIdx) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-xs font-mono font-medium text-gray-200 transition-all duration-300 transform hover:scale-105 cursor-default shadow-sm"
                          style={{
                            borderColor: tagIdx === 0 ? `${HASHTAG_SETS[activeTagSet].color}60` : undefined,
                            color: tagIdx === 0 ? HASHTAG_SETS[activeTagSet].color : undefined,
                            boxShadow: tagIdx === 0 ? `0 0 12px ${HASHTAG_SETS[activeTagSet].color}30` : undefined,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: The 3 Core Pillars + Official Innocentia Brand Logo */}
            <div className="mt-8 sm:mt-12 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium relative z-20 items-center">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="w-8 h-8 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/50 flex items-center justify-center text-sm flex-shrink-0 shadow-[0_0_12px_rgba(255,56,88,0.4)]">
                  💖
                </span>
                <div>
                  <div className="text-white font-bold">Sofía imagina lo imposible.</div>
                  <div className="text-[10px] font-mono text-gray-400">ARTE • EMOCIÓN • EXPERIENCIAS</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300 md:border-l md:border-white/20 md:pl-4">
                <span className="w-8 h-8 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/50 flex items-center justify-center text-sm flex-shrink-0 shadow-[0_0_12px_rgba(0,209,255,0.4)] text-[#00D1FF]">
                  ⚡
                </span>
                <div>
                  <div className="text-white font-bold">Iván encuentra cómo hacerlo posible.</div>
                  <div className="text-[10px] font-mono text-gray-400">TECNOLOGÍA • ESTRUCTURA • RESULTADOS</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300 md:border-l md:border-white/20 md:pl-4">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-sm flex-shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)] text-purple-300">
                  ♾️
                </span>
                <div>
                  <div className="text-white font-bold">Innocentia lo convierte en realidad.</div>
                  <div className="text-[10px] font-mono text-gray-400">UN FUTURO MÁS HUMANO • HOY</div>
                </div>
              </div>

              {/* Official Innocentia Brand Logo Column */}
              <div className="flex flex-col items-start md:items-end justify-center md:border-l md:border-white/20 md:pl-4 text-left md:text-right gap-1">
                <div className="relative h-8 w-40">
                  <Image
                    src="/images/logo_official_header.png?v=2"
                    alt="Innocentia Tech Official Logo"
                    fill
                    className="object-contain object-left md:object-right filter brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                  />
                </div>
                <div className="text-[9px] font-mono text-gray-400">
                  Where Imagination Becomes Technology.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* CINEMATIC DARK LUXURY VIDEO MODAL */}
      {/* ========================================================== */}
      {activeVideo && (() => {
        const isPortrait = videoFormat === "mobile";
        const currentSrc = isPortrait ? activeVideo.videoSrcMobile : activeVideo.videoSrcDesktop;

        return (
          <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 z-0"
              onClick={() => setActiveVideo(null)}
            />

            <div
              className={`relative z-10 w-full ${
                isPortrait
                  ? "max-w-[360px] sm:max-w-[420px]"
                  : "max-w-4xl"
              } rounded-[32px] sm:rounded-[36px] bg-[#07070D] border p-4 sm:p-5 shadow-[0_0_100px_rgba(0,0,0,0.95)] space-y-3.5 my-auto overflow-hidden animate-in zoom-in-95 duration-300 transition-all`}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 relative z-10">
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
                      <h3 className="text-sm sm:text-base font-black text-white uppercase font-mono tracking-tight">
                        PRESENTACIÓN • {activeVideo.title}
                      </h3>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-mono text-gray-400 line-clamp-1">
                      {activeVideo.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right controls: Format Switcher + Close Button */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  {/* Format Selector Tabs */}
                  <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/15">
                    <button
                      type="button"
                      onClick={() => setVideoFormat("mobile")}
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isPortrait
                          ? "bg-[#FF3858] text-white shadow-[0_0_12px_rgba(255,56,88,0.6)]"
                          : "text-gray-400 hover:text-white"
                      }`}
                      title="Ver video en formato vertical para celular"
                    >
                      <span>📱</span>
                      <span>Celular</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoFormat("desktop")}
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        !isPortrait
                          ? "bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.6)]"
                          : "text-gray-400 hover:text-white"
                      }`}
                      title="Ver video en formato horizontal para PC"
                    >
                      <span>🖥️</span>
                      <span>PC / Cine</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    aria-label="Cerrar video"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Player Container */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden bg-black border shadow-2xl transition-all ${
                  isPortrait
                    ? "aspect-[9/16] max-h-[68vh] mx-auto"
                    : "aspect-video"
                }`}
                style={{ borderColor: `${activeVideo.themeColor}40` }}
              >
                <video
                  key={`${activeVideo.title}-${videoFormat}`}
                  src={currentSrc}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={activeVideo.avatarImg}
                  disablePictureInPicture
                  className={`w-full h-full ${
                    isPortrait ? "object-cover" : "object-contain"
                  } bg-black`}
                >
                  Tu navegador no soporta reproducción de video HTML5.
                </video>
              </div>

              {/* Video Footer Info */}
              <div className="flex items-center justify-between gap-3 pt-2 text-xs font-mono text-gray-400 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: activeVideo.themeColor }} />
                  <span>
                    Formato: <strong className="text-white">{isPortrait ? "Vertical Móvil 9:16" : "Widescreen PC 16:9"}</strong>
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="px-3.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer"
                >
                  Cerrar (Esc)
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
