"use client";

import React, { useState } from "react";

export default function AboutUsSection() {
  const [activeTab, setActiveTab] = useState<"manifiesto" | "principios">("manifiesto");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (tab: "manifiesto" | "principios") => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 200);
  };

  const principios = [
    {
      num: "1",
      title: "La tecnología al servicio de las personas",
      desc: "Una herramienta tiene valor cuando simplifica una tarea o amplia una capacidad. Si obliga a adaptarse a ella, pierde su propósito.",
      color: "#FF007A",
    },
    {
      num: "2",
      title: "La imaginación precede a la innovación",
      desc: "Ningún algoritmo o lenguaje de programación reemplaza el momento en que una persona observa un problema e imagina una solución diferente.",
      color: "#F59E0B",
    },
    {
      num: "3",
      title: "La ingeniería la hace posible",
      desc: "La imaginación encuentra el rumbo, la ingeniería construye el camino. Transformamos ideas en soluciones funcionales, escalables y con impacto real.",
      color: "#00F0FF",
    },
    {
      num: "4",
      title: "Escuchar es el primer acto de diseño",
      desc: "Antes de proponer una solución necesitamos comprender el problema. La mejor tecnología no nace de asumir respuestas, sino de hacer las preguntas correctas.",
      color: "#A855F7",
    },
    {
      num: "5",
      title: "La simplicidad demuestra comprensión",
      desc: "Hacer algo complejo es sencillo. Hacerlo simple requiere entender profundamente su funcionamiento. Eliminamos lo innecesario para que la tecnología se sienta natural.",
      color: "#10B981",
    },
    {
      num: "6",
      title: "Evolución continua",
      desc: "La tecnología siempre avanza y nosotros también. Aprendemos, iteramos y mejoramos constantemente para crear soluciones que perduren.",
      color: "#3B82F6",
    },
  ];

  return (
    <section id="nosotros" className="relative py-20 bg-transparent overflow-hidden border-t border-white/5">
      {/* Background ambient radial glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF007A]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-950/10 blur-[160px] pointer-events-none" />

      {/* SVG Definitions for Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <linearGradient id="infinityNeonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF007A" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Navigation Tabs Header */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <button
              onClick={() => handleTabChange("manifiesto")}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "manifiesto"
                  ? "border border-[#FF007A] bg-[#FF007A]/20 text-white shadow-[0_0_25px_rgba(255,0,122,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EL MANIFIESTO
            </button>
            <button
              onClick={() => handleTabChange("principios")}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "principios"
                  ? "border border-[#00F0FF] bg-[#00F0FF]/20 text-white shadow-[0_0_25px_rgba(0,240,255,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              NUESTROS PRINCIPIOS
            </button>
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="min-h-[500px] transition-all duration-500 ease-in-out">
          <div
            className={`w-full transition-all duration-300 transform ${
              isAnimating ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
            }`}
          >
            {activeTab === "manifiesto" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Card: El Manifiesto (Exact design from Foto 3) */}
                <div className="lg:col-span-5 xl:col-span-5 bg-gradient-to-b from-[#15081e]/85 via-[#0c0816]/90 to-[#070b16]/90 border border-pink-500/30 rounded-[32px] p-7 sm:p-9 lg:p-10 shadow-[0_0_60px_rgba(255,0,122,0.18)] flex flex-col justify-between space-y-6 text-left relative overflow-hidden backdrop-blur-2xl">
                  {/* Ambient corner light */}
                  <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#FF007A]/15 blur-[90px] pointer-events-none rounded-full" />

                  <div className="space-y-4 relative z-10">
                    {/* Header Overline */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#FF007A] uppercase">
                        NUESTRO MANIFIESTO
                      </span>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#FF007A]/60 via-[#FF007A]/20 to-transparent" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.12]">
                      El origen de toda{" "}
                      <span className="block">innovación es la</span>
                      <span className="block mt-1 bg-gradient-to-r from-[#FF007A] via-[#E879F9] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,0,122,0.65)]">
                        imaginación.
                      </span>
                    </h3>

                    {/* Paragraphs */}
                    <div className="space-y-3.5 text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
                      <p>
                        Antes de existir una aplicación, alguien imaginó una mejor forma de conectar a las personas. Antes de existir una inteligencia artificial, alguien se preguntó si era posible construir una herramienta capaz de aprender.
                      </p>
                      <p>
                        Elegimos <strong className="text-white font-bold">Innocentia</strong> porque la inocencia representa descubrimiento, no por falta de conocimiento, sino porque simboliza la capacidad de regresar al estado más puro de la creatividad: ese momento donde todavía no existen prejuicios suficientes para limitar una idea.
                      </p>
                      <p>
                        Para nosotros, la tecnología nunca ha sido el punto de partida; es la consecuencia. El software, las aplicaciones y la inteligencia artificial son únicamente herramientas capaces de materializar aquello que primero nació en la imaginación.
                      </p>
                    </div>
                  </div>

                  {/* Dual Founder Footer Bar: Sofía + Infinity + Iván (100% Pure Vector HD) */}
                  <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between gap-2 sm:gap-3 select-none">
                    {/* Sofía */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full border-2 border-[#FF007A] bg-[#FF007A]/10 flex items-center justify-center text-[#FF007A] shadow-[0_0_20px_rgba(255,0,122,0.8),inset_0_0_10px_rgba(255,0,122,0.3)] flex-shrink-0">
                        {/* Calligraphy Brush & Droplet Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,0,122,0.9)]">
                          <path d="M18.37 2.63 14 7l-9.14 9.14a2 2 0 0 0-.51.86L3 21l3.96-1.32c.32-.11.62-.29.86-.51L17 10l4.37-4.37a1 1 0 0 0 0-1.41l-1.59-1.59a1 1 0 0 0-1.41 0z" fill="currentColor" fillOpacity="0.3" />
                          <circle cx="16" cy="18" r="1.6" fill="currentColor" stroke="none" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-black text-[#FF007A] tracking-wider uppercase block font-sans leading-tight drop-shadow-[0_0_10px_rgba(255,0,122,0.6)]">
                          SOFÍA
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.2em] uppercase block font-sans leading-tight">
                          IMAGINA
                        </span>
                      </div>
                    </div>

                    {/* Connecting line + Infinity + Connecting line */}
                    <div className="flex-1 flex items-center gap-2 max-w-[110px] sm:max-w-[140px]">
                      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#FF007A] to-[#A855F7]" />
                      
                      <div className="relative flex-shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 64 32" className="w-10 sm:w-11 h-5 sm:h-5.5 drop-shadow-[0_0_18px_rgba(168,85,247,1)]">
                          <path
                            d="M18,6 C10,6 4,11 4,16 C4,21 10,26 18,26 C26,26 31,19 32,16 C33,19 38,26 46,26 C54,26 60,21 60,16 C60,11 54,6 46,6 C38,6 33,13 32,16 C31,13 26,6 18,6 Z"
                            fill="none"
                            stroke="url(#infinityNeonGrad)"
                            strokeWidth="3.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#A855F7] to-[#00F0FF]" />
                    </div>

                    {/* Iván */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full border-2 border-[#00F0FF] bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.8),inset_0_0_10px_rgba(0,240,255,0.3)] flex-shrink-0">
                        {/* Code </> icon with slash */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]">
                          <polyline points="7 8 3 12 7 16" />
                          <line x1="14" y1="4" x2="10" y2="20" />
                          <polyline points="17 8 21 12 17 16" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-black text-[#00F0FF] tracking-wider uppercase block font-sans leading-tight drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                          IVÁN
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.2em] uppercase block font-sans leading-tight">
                          CONSTRUYE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Card: Full 16:9 Looping Video - 100% Complete & Uncropped */}
                <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center">
                  <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border border-cyan-500/30 bg-black/40 backdrop-blur-xl shadow-[0_0_60px_rgba(0,240,255,0.2)]">
                    {/* Looping Infinity Founders Video */}
                    <video
                      src="/videos/Energy_flowing_in_infinity_symbol_20261008100316.mp4"
                      poster="/videos/energy_infinity_poster.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain bg-transparent select-none pointer-events-none"
                    />

                    {/* Subtle ambient neon glow behind corners */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 blur-[60px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-500/10 blur-[60px] pointer-events-none" />
                  </div>
                </div>
              </div>
            ) : (
              /* Tab 2: Nuestros Principios (Exact design from Foto 2) */
              <div className="space-y-8">
                {/* Header for Nuestros Principios */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#FF007A] uppercase">
                        NUESTROS PRINCIPIOS
                      </span>
                      <div className="h-[1px] w-24 bg-gradient-to-r from-[#FF007A]/60 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      Ideas que se convierten en realidades con{" "}
                      <span className="bg-gradient-to-r from-[#FF007A] via-[#D946EF] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,122,0.4)]">
                        propósito.
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
                    <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md leading-relaxed">
                      Estos principios guían cada proyecto, cada decisión y cada línea de código. Son la base de cómo trabajamos, cómo innovamos y por qué existimos.
                    </p>
                    <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex-shrink-0">
                      <svg viewBox="0 0 64 32" className="w-6 h-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]">
                        <path
                          d="M18,6 C10,6 4,11 4,16 C4,21 10,26 18,26 C26,26 31,19 32,16 C33,19 38,26 46,26 C54,26 60,21 60,16 C60,11 54,6 46,6 C38,6 33,13 32,16 C31,13 26,6 18,6 Z"
                          fill="none"
                          stroke="url(#infinityNeonGrad)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[11px] font-mono text-gray-300">
                        Dos hemisferios, <strong className="text-white">una intención.</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6 Visual Principles Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {principios.map((p) => (
                    <div
                      key={p.num}
                      className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 hover:border-white/40 transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 shadow-2xl group cursor-pointer"
                      style={{
                        boxShadow: `0 0 30px ${p.color}22`,
                      }}
                    >
                      <img
                        src={`/images/principios/card_0${p.num}_hd.png`}
                        alt={`${p.title} - ${p.desc}`}
                        className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="sr-only">
                        {p.num} - {p.title}: {p.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
