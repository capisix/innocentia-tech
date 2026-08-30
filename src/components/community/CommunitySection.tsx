"use client";

import React from "react";
import { Users, BookOpen, MessageSquare, Compass, Sparkles } from "../../lib/icons";

export default function CommunitySection() {
  const perks = [
    {
      title: "Playground Ilimitado",
      desc: "Prueba constructores de IA en tiempo real sin restricciones de simulación.",
      icon: Users,
    },
    {
      title: "Roadmap Transparente",
      desc: "Accede y vota las nuevas capacidades de Sofía e Iván antes de su lanzamiento.",
      icon: Compass,
    },
    {
      title: "Documentación & Cursos",
      desc: "Guías de arquitectura moderna, prompts avanzados e integración de APIs.",
      icon: BookOpen,
    },
    {
      title: "Discord Exclusivo (Próximamente)",
      desc: "Canal directo con el equipo de ingenieros y diseñadores de Innocentia.TECH.",
      icon: MessageSquare,
    },
  ];

  return (
    <section id="comunidad" className="relative py-14 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#FF8800] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>ECOSISTEMA INNOCENTIA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            COMUNIDAD Y FUTURO
          </h2>

          <p className="text-gray-300 font-light text-base sm:text-lg">
            Forma parte de la nueva era de creadores de tecnología impulsada por inteligencia artificial.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/15 hover:border-white/30 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{p.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
