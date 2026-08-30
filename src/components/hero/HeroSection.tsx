"use client";

import React from "react";
import { motion } from "../../lib/motion";
import { ArrowRight, Sparkles, ChevronDown } from "../../lib/icons";

interface HeroSectionProps {
  onOpenProjectModal?: () => void;
  onOpenChatModal?: () => void;
}

export default function HeroSection({ onOpenProjectModal, onOpenChatModal }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-36 pb-16 bg-transparent overflow-hidden flex flex-col justify-between">
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center my-auto">
        {/* Left Column Content */}
        <div className="lg:col-span-6 space-y-7 text-left">
          {/* Top Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-widest text-gray-200 uppercase backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#00D1FF]" />
            <span>LABORATORIO DE IMAGINACIÓN E INGENIERÍA</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase"
          >
            DONDE LA <br />
            <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,56,88,0.5)]">
              IMAGINACIÓN
            </span>{" "}
            <br />
            SE CONVIERTE EN <br />
            <span className="bg-gradient-to-r from-[#00D1FF] via-[#3A86FF] to-[#8A2BE2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,209,255,0.5)]">
              TECNOLOGÍA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed"
          >
            No desarrollamos aplicaciones por desarrollar software. Transformamos la curiosidad en soluciones útiles, elegantes y significativas.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5 pt-3"
          >
            <button
              onClick={onOpenProjectModal}
              className="group px-9 py-4 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-base tracking-wide flex items-center gap-3 transition-all shadow-[0_0_35px_rgba(255,56,88,0.45)] hover:shadow-[0_0_45px_rgba(255,56,88,0.65)] hover:scale-105 cursor-pointer"
            >
              <span>Comenzar Proyecto</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onOpenChatModal}
              className="group px-9 py-4 rounded-full bg-white/[0.04] border border-white/20 hover:border-[#00D1FF]/60 text-white font-bold text-base tracking-wide flex items-center gap-3 transition-all backdrop-blur-xl hover:bg-white/[0.08] shadow-lg cursor-pointer"
            >
              <span>Preguntar al Chatbot</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#00D1FF]" />
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

        {/* Right Column: 4K Cinematic Looping Video Stage */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-xl h-[480px] sm:h-[540px] flex items-center justify-center"
          >
            {/* Stage Container */}
            <div className="relative z-10 w-full h-full rounded-[36px] bg-gradient-to-b from-white/[0.06] via-black/80 to-black/95 border border-white/20 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden group">
              
              {/* 4K Looping Video Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/90 shadow-2xl flex flex-col justify-between">
                <video
                  src="/videos/hero_floating_astronaut.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Ambient Vignette & Top Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none rounded-2xl" />

                {/* Top Status Pill */}
                <div className="relative z-10 p-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
                    EXPERIENCIA CINEMÁTICA 4K
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-[#FF3858] backdrop-blur-md">
                    DUAL CORE
                  </span>
                </div>

                {/* Bottom HUD Banner */}
                <div className="relative z-10 p-3">
                  <div className="w-full bg-black/80 border border-white/20 rounded-xl p-3.5 flex items-center justify-between backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#FF3858] animate-ping" />
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-bold text-white block">SOFÍA IMAGINA • IVÁN CONSTRUYE</span>
                        <span className="text-[10px] sm:text-xs text-gray-400 font-mono">INNOCENTIA TRANSFORMA</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40">
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
        className="relative z-10 flex flex-col items-center justify-center text-center mt-8 cursor-pointer"
        onClick={() => {
          document.getElementById("filosofia")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">
          DESLIZA PARA DESCUBRIR
        </span>
        <ChevronDown className="w-5 h-5 text-[#FF3858] animate-bounce" />
      </motion.div>
    </section>
  );
}
