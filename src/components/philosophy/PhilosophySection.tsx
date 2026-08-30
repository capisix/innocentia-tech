"use client";

import React from "react";
import { Lightbulb, Palette, Code2, Rocket, ArrowRight } from "../../lib/icons";

export default function PhilosophySection() {
  const steps = [
    {
      num: "01",
      title: "Todo inicia con una idea",
      desc: "El punto de partida de toda gran innovación.",
      icon: Lightbulb,
      glow: "border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_20px_rgba(255,100,0,0.15)]",
      iconColor: "text-orange-400",
    },
    {
      num: "02",
      title: "La imaginación le da forma",
      desc: "Sofía diseña la experiencia y el concepto.",
      icon: Palette,
      glow: "border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_0_20px_rgba(255,200,0,0.15)]",
      iconColor: "text-yellow-400",
    },
    {
      num: "03",
      title: "La ingeniería la hace posible",
      desc: "Iván construye la arquitectura y código.",
      icon: Code2,
      glow: "border-cyan-500/30 hover:border-cyan-500/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]",
      iconColor: "text-cyan-400",
    },
    {
      num: "04",
      title: "La tecnología la comparte",
      desc: "Lanzamiento y escala global.",
      icon: Rocket,
      glow: "border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      iconColor: "text-blue-400",
    },
  ];

  return (
    <section id="filosofia" className="relative py-16 bg-[#040407] overflow-hidden border-t border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Title & Text */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <span className="text-xs font-mono text-[#FF3B5C] uppercase tracking-widest block font-bold">
            FILOSOFÍA INNOCENTIA
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            ¿QUÉ ES INNOCENTIA?
          </h2>
          <p className="text-gray-300 text-base font-light leading-relaxed">
            Unimos imaginación y tecnología para crear soluciones digitales que cambian realidades.
          </p>
          <div className="pt-2">
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-[#FF3B5C]/40 hover:border-[#FF3B5C] text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/[0.08]"
            >
              <span>Conoce más</span>
              <ArrowRight className="w-4 h-4 text-[#FF3B5C]" />
            </a>
          </div>
        </div>

        {/* Right Column: 4 Clean Spaced Cards without Overlapping Arrows */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`p-6 rounded-3xl bg-white/[0.02] border ${step.glow} backdrop-blur-2xl flex flex-col justify-between items-center text-center group hover:-translate-y-1.5 transition-all shadow-xl`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-gray-400 block font-bold">PASO {step.num}</span>
                  <h3 className="text-sm font-bold text-white tracking-wide leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-light pt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
