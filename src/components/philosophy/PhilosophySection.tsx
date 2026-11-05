"use client";

import React from "react";
import { ArrowRight } from "../../lib/icons";

export default function PhilosophySection() {
  const steps = [
    {
      num: "01",
      title: "IDEA",
      desc: "Todo inicia con\nuna idea.",
      image: "/images/filosofia/card_01_idea.png",
      borderGlow:
        "border-orange-400/50 hover:border-orange-400/90 shadow-[0_10px_35px_rgba(255,120,0,0.25)] hover:shadow-[0_12px_45px_rgba(255,140,0,0.45)]",
      ringColor: "rgba(255, 138, 0, 0.85)",
      reflectionColor: "rgba(255, 115, 0, 0.38)",
    },
    {
      num: "02",
      title: "DISEÑO",
      desc: "La imaginación\nle da forma.",
      image: "/images/filosofia/card_02_diseno.png",
      borderGlow:
        "border-pink-500/50 hover:border-pink-400/90 shadow-[0_10px_35px_rgba(255,0,122,0.25)] hover:shadow-[0_12px_45px_rgba(255,0,122,0.45)]",
      ringColor: "rgba(255, 0, 140, 0.85)",
      reflectionColor: "rgba(255, 0, 128, 0.38)",
    },
    {
      num: "03",
      title: "INGENIERÍA",
      desc: "La ingeniería\nla hace posible.",
      image: "/images/filosofia/card_03_ingenieria.png",
      borderGlow:
        "border-cyan-400/50 hover:border-cyan-300/90 shadow-[0_10px_35px_rgba(0,229,255,0.25)] hover:shadow-[0_12px_45px_rgba(0,229,255,0.45)]",
      ringColor: "rgba(0, 229, 255, 0.85)",
      reflectionColor: "rgba(0, 210, 255, 0.35)",
    },
    {
      num: "04",
      title: "ESCALA",
      desc: "La tecnología\nla comparte.",
      image: "/images/filosofia/card_04_escala.png",
      borderGlow:
        "border-sky-400/50 hover:border-sky-300/90 shadow-[0_10px_35px_rgba(56,189,248,0.25)] hover:shadow-[0_12px_45px_rgba(56,189,248,0.45)]",
      ringColor: "rgba(56, 189, 248, 0.85)",
      reflectionColor: "rgba(30, 160, 255, 0.38)",
    },
  ];

  return (
    <section
      id="filosofia"
      className="relative py-16 lg:py-24 bg-transparent overflow-hidden border-t border-b border-white/5"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left Column: Title & Text */}
        <div className="lg:col-span-4 space-y-5 text-left relative z-20">
          {/* Overline with Neon Pink Line */}
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-[13px] font-sans text-gray-200 uppercase tracking-[0.28em] font-medium whitespace-nowrap">
              FILOSOFÍA INNOCENTIA
            </span>
            <span className="w-14 sm:w-20 h-[2px] bg-[#FF007A] shadow-[0_0_12px_#FF007A,0_0_24px_#FF007A] rounded-full" />
          </div>

          {/* Main Heading: ¿QUÉ ES / INNOCENTIA? */}
          <h2 className="uppercase leading-none select-none">
            <span className="block text-4xl sm:text-5xl xl:text-[56px] font-black text-white tracking-tight">
              ¿QUÉ ES
            </span>
            <span className="block mt-1.5 text-3xl sm:text-4xl xl:text-[44px] font-light text-white tracking-[0.14em]">
              INNOCENTIA?
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-md">
            Unimos imaginación y tecnología para crear soluciones digitales que cambian realidades.
          </p>

          {/* CTA Pill Button */}
          <div className="pt-2">
            <a
              href="#servicios"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#110617]/80 border border-[#FF007A]/80 hover:border-[#FF007A] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_0_22px_rgba(255,0,122,0.4),inset_0_0_12px_rgba(255,0,122,0.2)] hover:shadow-[0_0_32px_rgba(255,0,122,0.75),inset_0_0_18px_rgba(255,0,122,0.35)] hover:scale-105 group"
            >
              <span>CONOCE MÁS</span>
              <ArrowRight className="w-4 h-4 text-[#FF007A] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: 4 Cards + Reflective Floor & Tagline */}
        <div className="lg:col-span-8 relative flex flex-col items-center">
          {/* Main Stage Container */}
          <div className="relative w-full pt-2 sm:pt-4 px-2 sm:px-6 lg:px-10">
            {/* 4 Step Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="group relative flex flex-col items-center"
                >
                  {/* Card Frame */}
                  <div
                    className={`relative w-full aspect-[740/960] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#06050c] border ${step.borderGlow} transition-all duration-500 group-hover:-translate-y-2`}
                  >
                    {/* Card 3D Pedestal & Icon Artwork */}
                    <img
                      src={step.image}
                      alt={`${step.num} - ${step.title}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 select-none pointer-events-none"
                    />

                    {/* Bottom gradient legibility overlay for text */}
                    <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#05040a]/95 via-[#05040a]/65 to-transparent pointer-events-none" />

                    {/* Step Number (Top Left) */}
                    <span className="absolute top-3 left-3.5 sm:top-4 sm:left-5 z-20 text-base sm:text-xl lg:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {step.num}
                    </span>

                    {/* Card Text (Bottom Inside Pedestal Floor) */}
                    <div className="absolute inset-x-2 bottom-3 sm:bottom-5 z-20 flex flex-col items-center text-center px-1">
                      <h3 className="text-xs sm:text-base lg:text-[17px] font-black text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-200 font-light leading-tight whitespace-pre-line drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reflective Floor Stage Beneath the 4 Cards */}
            <div className="relative z-20 w-full pt-2 sm:pt-3 pb-2">
              {/* 4 Perspective Elliptical Neon Rings & Vertical Wet-Floor Glows */}
              <div className="pointer-events-none select-none absolute inset-x-0 top-0 h-24 sm:h-28 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {steps.map((step) => (
                  <div
                    key={`floor-${step.num}`}
                    className="relative flex flex-col items-center"
                  >
                    {/* Elliptical perspective ring on floor */}
                    <div
                      className="w-[108%] h-3.5 sm:h-4 rounded-[100%] border opacity-85"
                      style={{
                        borderColor: step.ringColor,
                        boxShadow: `0 0 14px ${step.ringColor}, inset 0 0 8px ${step.ringColor}`,
                      }}
                    />
                    {/* Vertical wet floor reflection pillar */}
                    <div
                      className="w-4/5 h-16 sm:h-20 -mt-2 rounded-full blur-xl opacity-80"
                      style={{
                        background: `radial-gradient(ellipse at top, ${step.reflectionColor} 0%, transparent 75%)`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Center Neon Infinity Emblem + IDEA • DISEÑO • DESARROLLO • EVOLUCIÓN */}
              <div className="relative z-30 flex flex-col items-center justify-center pt-1 sm:pt-1.5">
                {/* Glowing Neon Pink/Violet Infinity Symbol */}
                <div className="relative flex items-center justify-center mb-2 sm:mb-2.5">
                  <div className="absolute w-16 h-8 bg-[#FF007A]/35 blur-xl rounded-full pointer-events-none" />
                  <svg
                    viewBox="0 0 80 38"
                    className="w-14 sm:w-16 lg:w-[68px] h-7 sm:h-8 overflow-visible"
                    fill="none"
                  >
                    <defs>
                      <linearGradient
                        id="philoFloorInfinityOuter"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FF2E93" />
                        <stop offset="50%" stopColor="#FF66C4" />
                        <stop offset="100%" stopColor="#E855F7" />
                      </linearGradient>
                      <linearGradient
                        id="philoFloorInfinityCore"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFB3D9" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#F5B8FF" />
                      </linearGradient>
                    </defs>
                    {/* Outer neon glow stroke */}
                    <path
                      d="M22,7 C11,7 5,12.5 5,19 C5,25.5 11,31 22,31 C31.5,31 37.5,23 40,19 C42.5,23 48.5,31 58,31 C69,31 75,25.5 75,19 C75,12.5 69,7 58,7 C48.5,7 42.5,15 40,19 C37.5,15 31.5,7 22,7 Z"
                      stroke="url(#philoFloorInfinityOuter)"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        filter:
                          "drop-shadow(0 0 8px rgba(255,46,147,0.95)) drop-shadow(0 0 18px rgba(232,85,247,0.75))",
                      }}
                    />
                    {/* Inner bright core stroke */}
                    <path
                      d="M22,7 C11,7 5,12.5 5,19 C5,25.5 11,31 22,31 C31.5,31 37.5,23 40,19 C42.5,23 48.5,31 58,31 C69,31 75,25.5 75,19 C75,12.5 69,7 58,7 C48.5,7 42.5,15 40,19 C37.5,15 31.5,7 22,7 Z"
                      stroke="url(#philoFloorInfinityCore)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Tagline Row: [Pink Laser Line] IDEA • DISEÑO • DESARROLLO • EVOLUCIÓN [Pink Laser Line] */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 w-full max-w-3xl px-2">
                  {/* Left tapering neon pink laser line */}
                  <div className="relative h-[2px] flex-1 max-w-[65px] sm:max-w-[120px] flex items-center">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF007A] to-[#FF66C4] rounded-full shadow-[0_0_12px_#FF007A,0_0_20px_#FF007A]" />
                  </div>

                  {/* Spaced uppercase words with crisp white dots */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-[10px] sm:text-xs lg:text-[13px] font-normal text-white/95 uppercase tracking-[0.22em] sm:tracking-[0.28em] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <span>IDEA</span>
                    <span className="text-white/80 text-[9px] sm:text-[10px]">•</span>
                    <span>DISEÑO</span>
                    <span className="text-white/80 text-[9px] sm:text-[10px]">•</span>
                    <span>DESARROLLO</span>
                    <span className="text-white/80 text-[9px] sm:text-[10px]">•</span>
                    <span>EVOLUCIÓN</span>
                  </div>

                  {/* Right tapering neon pink laser line */}
                  <div className="relative h-[2px] flex-1 max-w-[65px] sm:max-w-[120px] flex items-center">
                    <div className="w-full h-[2px] bg-gradient-to-l from-transparent via-[#FF007A] to-[#FF66C4] rounded-full shadow-[0_0_12px_#FF007A,0_0_20px_#FF007A]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
