"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ChevronDown } from "../../lib/icons";

interface HeroSectionProps {
  onOpenProjectModal?: () => void;
  onOpenChatModal?: () => void;
}

export default function HeroSection({
  onOpenProjectModal,
  onOpenChatModal,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: High-Impact Typography & Dual CTA */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left z-10">
          {/* Subtle Cyber Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-300 uppercase">
              LABORATORIO DE IMAGINACIÓN E INGENIERÍA
            </span>
          </motion.div>

          {/* Main Kinetic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] uppercase"
          >
            DONDE LA <br />
            <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(255,56,88,0.45)]">
              IMAGINACIÓN
            </span>{" "}
            <br />
            SE CONVIERTE EN <br />
            <span className="bg-gradient-to-r from-[#00D1FF] via-[#7000FF] to-[#FF3858] bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(0,209,255,0.45)]">
              TECNOLOGÍA
            </span>
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl"
          >
            No desarrollamos aplicaciones por desarrollar software. Transformamos la
            curiosidad en soluciones útiles, elegantes y significativas.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary Action: Crear Proyecto */}
            <button
              onClick={onOpenProjectModal}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-sm tracking-wide uppercase flex items-center gap-2.5 transition-all shadow-[0_0_30px_rgba(255,56,88,0.5)] hover:scale-105 cursor-pointer"
            >
              <span>Comenzar Proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action: Abrir Chatbot Maximizado */}
            <button
              onClick={onOpenChatModal}
              className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-[#00D1FF]/60 text-white font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all backdrop-blur-xl cursor-pointer hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-[#00D1FF]" />
              <span>Preguntar al Chatbot</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm text-gray-400 font-mono tracking-wide pt-2"
          >
            Toda gran innovación comenzó siendo una idea imposible de explicar.
          </motion.p>
        </div>

        {/* Right Column: 4K Cinematic Looping Video Stage (Flawless Contain - 100% Inside Frame) */}
        <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[380px] sm:max-w-md lg:max-w-xl aspect-square flex items-center justify-center"
          >
            {/* Stage Container */}
            <div className="relative z-10 w-full h-full rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/[0.08] via-black/80 to-black/95 border border-white/20 backdrop-blur-2xl p-3 sm:p-4 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden group">
              
              {/* 4K Looping Video Container with Complete Sphere Visibility */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#030306] shadow-2xl flex flex-col justify-between p-2 sm:p-3">
                {/* Scaled Video inside the Safe Zone */}
                <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                  <video
                    src="/videos/hero_floating_astronaut.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain filter brightness-100 contrast-105 scale-[0.88] sm:scale-[0.85] transition-transform duration-700"
                  />
                </div>

                {/* Subtle Ambient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none rounded-2xl" />

                {/* Top Status Pill */}
                <div className="relative z-10 p-1.5 sm:p-2 flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                    EXPERIENCIA CINEMÁTICA 4K
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 sm:py-1 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-[#FF3858] backdrop-blur-md">
                    DUAL CORE
                  </span>
                </div>

                {/* Bottom HUD Banner */}
                <div className="relative z-10 p-1.5 sm:p-2">
                  <div className="w-full bg-black/90 border border-white/20 rounded-xl p-2.5 sm:p-3 flex items-center justify-between backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF3858] animate-ping flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white block leading-tight">
                          SOFÍA IMAGINA • IVÁN CONSTRUYE
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-gray-400 font-mono">
                          INNOCENTIA TRANSFORMA
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 flex-shrink-0">
                      CORE v3.6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Ambient Aura around the stage */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3858]/20 via-purple-600/20 to-[#00D1FF]/20 rounded-[48px] blur-3xl -z-10 pointer-events-none animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center text-center mt-6 sm:mt-8 cursor-pointer"
        onClick={() => {
          document.getElementById("filosofia")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-1">
          DESLIZA PARA DESCUBRIR
        </span>
        <ChevronDown className="w-4 h-4 text-[#FF3858] animate-bounce" />
      </motion.div>
    </section>
  );
}
