"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  Zap,
  Layers,
  Palette,
  MessageSquare,
  Globe,
  Smartphone,
  Building2,
  Server,
  DollarSign,
  Clock,
} from "../../lib/icons";

export interface ProjectDetail {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  image: string;
  badgeColor: string;
  primaryColor: string;
  clientProblem: string;
  solutionOverview: string;
  keyFeatures: string[];
  costSavings: {
    stat: string;
    label: string;
    description: string;
  }[];
  processAutomation: string[];
  designAdvantages: string[];
  techStack: string[];
}

interface ProjectCaseStudyModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal?: () => void;
  onAskSofia?: (projectName: string) => void;
  onAskIvan?: (projectName: string) => void;
}

export default function ProjectCaseStudyModal({
  project,
  isOpen,
  onClose,
  onOpenProjectModal,
  onAskSofia,
  onAskIvan,
}: ProjectCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "ahorro" | "diseno" | "tech">("general");

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#08090E] border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-9 text-left space-y-6 my-auto overflow-hidden">
        {/* Glow Auras */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: project.primaryColor }}
        />

        {/* Modal Top Header with Official Logo */}
        <div className="flex items-start sm:items-center justify-between border-b border-white/10 pb-4 relative z-10 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA TECH"
              className="h-5 sm:h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase border backdrop-blur-md"
                style={{
                  backgroundColor: `${project.primaryColor}20`,
                  borderColor: `${project.primaryColor}40`,
                  color: project.primaryColor,
                }}
              >
                {project.tag}
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-mono hidden md:inline">CASO DE ESTUDIO OFICIAL</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Hero Banner: Screenshot + Title */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="w-full h-48 sm:h-56 rounded-2xl bg-black/90 border border-white/20 relative overflow-hidden shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 relative z-10">
          {[
            { id: "general", label: "📋 Visión & Solución", icon: Layers },
            { id: "ahorro", label: "💰 Reducción de Costos & Automatización", icon: TrendingDown },
            { id: "diseno", label: "🎨 Ventajas del Diseño (Sofía)", icon: Palette },
            { id: "tech", label: "⚡ Arquitectura & Backend (Iván)", icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Visión General */}
        {activeTab === "general" && (
          <div className="space-y-4 relative z-10 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#FF3858] font-bold uppercase block">
                  ⚠️ El Reto del Negocio:
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {project.clientProblem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#00D1FF] font-bold uppercase block">
                  💡 La Solución Diseñada por Innocentia:
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {project.solutionOverview}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-gray-400 uppercase font-bold block">
                Características Principales del Sistema:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs text-gray-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reducción de Costos & Automatización */}
        {activeTab === "ahorro" && (
          <div className="space-y-4 relative z-10 animate-in fade-in duration-200">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.costSavings.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1"
                >
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
                    {stat.stat}
                  </span>
                  <h4 className="text-xs font-bold text-white uppercase">{stat.label}</h4>
                  <p className="text-[11px] text-gray-300 font-light leading-snug">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Automation list */}
            <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2">
              <span className="text-xs font-mono text-[#00D1FF] uppercase font-bold block">
                ⚙️ Procesos Automatizados que Eliminaron Tareas Manuales:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.processAutomation.map((auto, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs text-gray-300"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#00D1FF] flex-shrink-0" />
                    <span>{auto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ventajas de Diseño (Sofía) */}
        {activeTab === "diseno" && (
          <div className="space-y-4 relative z-10 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-[#FF3858]/10 border border-[#FF3858]/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#FF3858]/20 border border-[#FF3858]/50 p-1 flex items-center justify-center">
                <Image src="/images/sofia_standing_brush.png" alt="Sofía" width={36} height={36} className="object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase font-mono">
                  Enfoque de Experiencia de Usuario &amp; Emoción por Sofía
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  "El diseño no es solo cómo se ve, sino cómo hace sentir al usuario y la rapidez con la que puede completar una tarea sin frustraciones."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.designAdvantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-[#FF3858]/20 flex items-start gap-2.5 text-xs text-gray-200"
                >
                  <Palette className="w-4 h-4 text-[#FF3858] flex-shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Arquitectura & Tech (Iván) */}
        {activeTab === "tech" && (
          <div className="space-y-4 relative z-10 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#00D1FF]/20 border border-[#00D1FF]/50 p-1 flex items-center justify-center">
                <Image src="/images/ivan_idea_laptop.png" alt="Iván" width={36} height={36} className="object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase font-mono">
                  Arquitectura Resiliente &amp; Escalabilidad por Iván
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  "Estructurado con Next.js 15, bases de datos PostgreSQL cifradas, microservicios Edge y caching inteligente para soportar miles de transacciones concurrentes con cero caídas."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center space-y-1"
                >
                  <Server className="w-4 h-4 text-[#00D1FF] mx-auto" />
                  <span className="text-xs font-mono font-bold text-white block">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Interactive Actions: Ask Sofia, Ask Ivan, Request Similar System */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Ask Sofia */}
            <button
              onClick={() => {
                onClose();
                onAskSofia?.(project.title);
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-full bg-[#FF3858]/15 hover:bg-[#FF3858]/25 border border-[#FF3858]/40 text-[#FF3858] hover:text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/images/sofia_pink_beanbag.png" alt="S" width={16} height={16} className="object-contain" />
              </div>
              <span>Duda de Diseño (Sofía)</span>
            </button>

            {/* Ask Ivan */}
            <button
              onClick={() => {
                onClose();
                onAskIvan?.(project.title);
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-full bg-[#00D1FF]/15 hover:bg-[#00D1FF]/25 border border-[#00D1FF]/40 text-[#00D1FF] hover:text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/images/ivan_standing_stylus.png" alt="I" width={16} height={16} className="object-contain" />
              </div>
              <span>Duda Técnica (Iván)</span>
            </button>
          </div>

          {/* Create Project Button */}
          <button
            onClick={() => {
              onClose();
              onOpenProjectModal?.();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] hover:scale-105 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,56,88,0.4)] transition-all cursor-pointer"
          >
            <span>Cotizar un Sistema Similar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
