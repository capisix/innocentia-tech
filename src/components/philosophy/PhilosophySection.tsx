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
      floorGlow: "from-orange-500/40 via-orange-500/10 to-transparent",
    },
    {
      num: "02",
      title: "DISEÑO",
      desc: "La imaginación\nle da forma.",
      image: "/images/filosofia/card_02_diseno.png",
      borderGlow:
        "border-pink-500/50 hover:border-pink-400/90 shadow-[0_10px_35px_rgba(255,0,122,0.25)] hover:shadow-[0_12px_45px_rgba(255,0,122,0.45)]",
      floorGlow: "from-pink-500/40 via-pink-500/10 to-transparent",
    },
    {
      num: "03",
      title: "INGENIERÍA",
      desc: "La ingeniería\nla hace posible.",
      image: "/images/filosofia/card_03_ingenieria.png",
      borderGlow:
        "border-cyan-400/50 hover:border-cyan-300/90 shadow-[0_10px_35px_rgba(0,229,255,0.25)] hover:shadow-[0_12px_45px_rgba(0,229,255,0.45)]",
      floorGlow: "from-cyan-400/40 via-cyan-400/10 to-transparent",
    },
    {
      num: "04",
      title: "ESCALA",
      desc: "La tecnología\nla comparte.",
      image: "/images/filosofia/card_04_escala.png",
      borderGlow:
        "border-sky-400/50 hover:border-sky-300/90 shadow-[0_10px_35px_rgba(56,189,248,0.25)] hover:shadow-[0_12px_45px_rgba(56,189,248,0.45)]",
      floorGlow: "from-sky-400/40 via-sky-400/10 to-transparent",
    },
  ];

  return (
    <section
      id="filosofia"
      className="relative py-16 lg:py-24 bg-transparent overflow-hidden border-t border-b border-white/5"
    >
      {/* Ambient background radial glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] bg-[#FF007A]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[350px] bg-[#00E5FF]/10 blur-[140px] pointer-events-none rounded-full" />

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

          {/* Main Heading: ¿QUÉ ES / INNOCENTIA? with stylized O */}
          <h2 className="uppercase leading-none select-none">
            <span className="block text-4xl sm:text-5xl xl:text-[56px] font-black text-white tracking-tight">
              ¿QUÉ ES
            </span>
            <span className="mt-1.5 inline-flex items-center text-3xl sm:text-4xl xl:text-[44px] font-light text-white tracking-[0.14em]">
              <span>INN</span>
              {/* Stylized O with glowing pink horizontal crossbar */}
              <span
                className="relative inline-flex items-center justify-center mx-[0.02em] mr-[0.14em]"
                aria-label="O"
              >
                <svg
                  viewBox="0 0 40 44"
                  className="w-[0.78em] h-[0.86em] overflow-visible"
                  fill="none"
                >
                  {/* Top arc of O */}
                  <path
                    d="M 6 16 C 6 7, 34 7, 34 16"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Bottom arc of O */}
                  <path
                    d="M 6 28 C 6 37, 34 37, 34 28"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Glowing pink horizontal bar */}
                  <line
                    x1="2"
                    y1="22"
                    x2="38"
                    y2="22"
                    stroke="#FF007A"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 8px #FF007A) drop-shadow(0 0 14px #FF007A)",
                    }}
                  />
                </svg>
              </span>
              <span>CENTIA?</span>
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

        {/* Right Column: Infinity Background + 4 Cards + Bottom Tagline */}
        <div className="lg:col-span-8 relative flex flex-col items-center">
          {/* Glowing Infinity Background Behind Cards */}
          <div className="relative w-full pt-8 sm:pt-12 lg:pt-14 pb-4 px-2 sm:px-6 lg:px-10">
            {/* Infinity Symbol Backdrop */}
            <div className="pointer-events-none select-none absolute inset-x-[-4%] sm:inset-x-[-6%] lg:inset-x-[-7%] -top-2 sm:-top-6 lg:-top-10 -bottom-6 flex items-center justify-center z-0">
              <img
                src="/images/filosofia/infinity_symbol.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain scale-105 sm:scale-110 lg:scale-[1.16] opacity-95 filter drop-shadow-[0_0_35px_rgba(255,0,122,0.25)]"
              />
            </div>

            {/* 4 Step Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="group relative flex flex-col items-center"
                >
                  {/* Card Frame */}
                  <div
                    className={`relative w-full aspect-[740/960] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#06050c]/60 backdrop-blur-[2px] border ${step.borderGlow} transition-all duration-500 group-hover:-translate-y-2`}
                  >
                    {/* Card 3D Pedestal & Icon Artwork */}
                    <img
                      src={step.image}
                      alt={`${step.num} - ${step.title}`}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-95 group-hover:scale-[1.03] transition-transform duration-500 select-none pointer-events-none"
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

                  {/* Subtle floor reflection line under each card */}
                  <div
                    className={`w-4/5 h-[2px] mt-2 rounded-full bg-gradient-to-r ${step.floorGlow} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Infinity Emblem & Tagline: IDEA • DISEÑO • DESARROLLO • EVOLUCIÓN */}
          <div className="relative z-20 mt-2 sm:mt-3 flex flex-col items-center w-full space-y-2">
            {/* Neon Pink Infinity Symbol */}
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 64 32"
                className="w-12 sm:w-14 h-6 sm:h-7 overflow-visible"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="philoBottomInfinityGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FF007A" />
                    <stop offset="50%" stopColor="#FF4DA6" />
                    <stop offset="100%" stopColor="#E879F9" />
                  </linearGradient>
                </defs>
                <path
                  d="M18,6 C10,6 4,11 4,16 C4,21 10,26 18,26 C26,26 31,19 32,16 C33,19 38,26 46,26 C54,26 60,21 60,16 C60,11 54,6 46,6 C38,6 33,13 32,16 C31,13 26,6 18,6 Z"
                  stroke="url(#philoBottomInfinityGrad)"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter:
                      "drop-shadow(0 0 10px rgba(255,0,122,0.9)) drop-shadow(0 0 20px rgba(255,0,122,0.5))",
                  }}
                />
              </svg>
            </div>

            {/* Tagline with glowing side lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 w-full max-w-2xl px-2">
              <div className="h-[2px] flex-1 max-w-[70px] sm:max-w-[110px] bg-gradient-to-r from-transparent via-[#FF007A]/80 to-[#FF007A] shadow-[0_0_10px_#FF007A] rounded-full" />

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs lg:text-[13px] font-medium text-gray-200 uppercase tracking-[0.22em] sm:tracking-[0.28em] text-center">
                <span>IDEA</span>
                <span className="text-[#FF007A] font-black">•</span>
                <span>DISEÑO</span>
                <span className="text-[#FF007A] font-black">•</span>
                <span>DESARROLLO</span>
                <span className="text-[#00E5FF] font-black">•</span>
                <span>EVOLUCIÓN</span>
              </div>

              <div className="h-[2px] flex-1 max-w-[70px] sm:max-w-[110px] bg-gradient-to-l from-transparent via-[#FF007A]/80 to-[#FF007A] shadow-[0_0_10px_#FF007A] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
