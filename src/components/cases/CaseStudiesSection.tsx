"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Plus, Sparkles, CheckCircle2 } from "../../lib/icons";

interface CaseStudiesSectionProps {
  onOpenProjectModal?: () => void;
}

export default function CaseStudiesSection({ onOpenProjectModal }: CaseStudiesSectionProps) {
  const projects = [
    {
      id: "multisistema",
      title: "MULTISISTEMA / MULTIAPP",
      subtitle: "Plataforma multinegocio y multiambiente. Selecciona y gestiona múltiples giros comerciales desde un único core empresarial.",
      image: "/images/apps/app_multisistema.png",
      tag: "ECOSISTEMA MULTIAPP",
      stats: "V2.0 PRO • Cloud",
      cardBg: "from-[#00D1FF]/15 via-[#00D1FF]/5 to-black/90",
      borderColor: "border-[#00D1FF]/35 hover:border-[#00D1FF]",
      glowColor: "shadow-[0_20px_50px_rgba(0,209,255,0.18)] hover:shadow-[0_25px_70px_rgba(0,209,255,0.38)]",
      auraColor: "bg-[#00D1FF]/20",
      tagBadge: "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40",
      accentBtn: "text-[#00D1FF] hover:text-white",
    },
    {
      id: "ikal",
      title: "IKAL CHUKUM",
      subtitle: "Panel de operaciones integral con cotizador en tiempo real, inventarios por bodega, alertas críticas de stock y bitácora de pedidos.",
      image: "/images/apps/app_ikalchukum.png",
      tag: "OPERACIONES & CRM",
      stats: "Cotizador en Vivo",
      cardBg: "from-[#F59E0B]/15 via-[#F59E0B]/5 to-black/90",
      borderColor: "border-[#F59E0B]/35 hover:border-[#F59E0B]",
      glowColor: "shadow-[0_20px_50px_rgba(245,158,11,0.18)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.38)]",
      auraColor: "bg-[#F59E0B]/20",
      tagBadge: "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40",
      accentBtn: "text-[#F59E0B] hover:text-white",
    },
    {
      id: "safely",
      title: "EXPERIENCE SAFELY",
      subtitle: "Plataforma turística oficial en Yucatán y Riviera Maya con motor de reservas de cenotes, catamaranes y eventos VIP exclusivos.",
      image: "/images/apps/app_experiencesafely.png",
      tag: "TURISMO & EXPERIENCIAS",
      stats: "Concierge VIP 24/7",
      cardBg: "from-[#10B981]/15 via-[#10B981]/5 to-black/90",
      borderColor: "border-[#10B981]/35 hover:border-[#10B981]",
      glowColor: "shadow-[0_20px_50px_rgba(16,185,129,0.18)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.38)]",
      auraColor: "bg-[#10B981]/20",
      tagBadge: "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40",
      accentBtn: "text-[#10B981] hover:text-white",
    },
    {
      id: "help2win",
      title: "HELP 2 WIN",
      subtitle: "App móvil con autenticación segura, salas interactivas de aprendizaje, documentales en streaming y gestión comunitaria.",
      image: "/images/apps/app_help2win.png",
      tag: "APP MÓVIL & STREAMING",
      stats: "v2.2 Mobile Native",
      cardBg: "from-[#8A2BE2]/15 via-[#8A2BE2]/5 to-black/90",
      borderColor: "border-[#8A2BE2]/35 hover:border-[#8A2BE2]",
      glowColor: "shadow-[0_20px_50px_rgba(138,43,226,0.18)] hover:shadow-[0_25px_70px_rgba(138,43,226,0.38)]",
      auraColor: "bg-[#8A2BE2]/20",
      tagBadge: "bg-[#8A2BE2]/20 text-[#C084FC] border-[#8A2BE2]/40",
      accentBtn: "text-[#C084FC] hover:text-white",
    },
  ];

  return (
    <section id="proyectos" className="relative py-24 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#FF8800] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CASOS DE ÉXITO & SOFTWARE EN PRODUCCIÓN</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              PROYECTOS QUE GENERAN IMPACTO
            </h2>
            <p className="text-gray-300 text-base font-light">
              Aplicaciones reales, dashboards operativos y plataformas creadas y desplegadas por Innocentia.
            </p>
          </div>

          <button
            onClick={onOpenProjectModal}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider group cursor-pointer"
          >
            <span>Crear un nuevo proyecto</span>
            <ArrowRight className="w-4 h-4 text-[#FF3858] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid with Rich Color Aura & Improved Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-[32px] bg-gradient-to-b ${project.cardBg} border ${project.borderColor} p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl ${project.glowColor} space-y-5`}
            >
              {/* Colored Volumetric Glow Aura in the background */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 ${project.auraColor} rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-500`}
              />

              {/* Real App Screenshot Container */}
              <div className="w-full h-48 rounded-2xl bg-black/90 border border-white/15 relative overflow-hidden group-hover:border-white/30 transition-all shadow-2xl z-10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badges on top of screenshot */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${project.tagBadge}`}
                  >
                    {project.tag}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-3 z-10">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-gray-200 font-bold backdrop-blur-md">
                    {project.stats}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 text-left flex-1 relative z-10">
                <h3 className="text-xl font-extrabold text-white tracking-wide uppercase">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <button
                  onClick={onOpenProjectModal}
                  className={`inline-flex items-center gap-2 text-xs font-bold ${project.accentBtn} transition-colors uppercase tracking-wider cursor-pointer`}
                >
                  <span>Ver caso de estudio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
