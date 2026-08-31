"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Palette,
  Server,
  Zap,
  BrainCircuit,
  Globe,
  Smartphone,
  Cloud,
  Network,
  BarChart3,
  Users,
} from "../../lib/icons";

export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: any;
  color: string;
  badge: string;
  sofiaInsight: string;
  ivanInsight: string;
  keyDeliverables: string[];
  recommendedStack: string[];
}

interface CapabilityDetailModalProps {
  capability: CapabilityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal?: () => void;
}

export default function CapabilityDetailModal({
  capability,
  isOpen,
  onClose,
  onOpenProjectModal,
}: CapabilityDetailModalProps) {
  if (!isOpen || !capability) return null;

  const Icon = capability.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#08090E] border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-9 text-left space-y-6 my-auto overflow-hidden">
        {/* Glow Aura */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-25"
          style={{ backgroundColor: capability.color }}
        />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA TECH"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <span
              className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase border backdrop-blur-md"
              style={{
                backgroundColor: `${capability.color}20`,
                borderColor: `${capability.color}40`,
                color: capability.color,
              }}
            >
              {capability.badge}
            </span>
            <span className="text-[11px] sm:text-xs text-gray-400 font-mono hidden md:inline">
              ESPECIFICACIÓN DE CAPACIDAD
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capability Hero */}
        <div className="flex items-start gap-4 sm:gap-5 relative z-10">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${capability.color}20`,
              color: capability.color,
              border: `1px solid ${capability.color}50`,
              boxShadow: `0 0 25px ${capability.color}35`,
            }}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {capability.title}
            </h3>
            <span className="text-xs sm:text-sm font-mono text-gray-400 block font-medium">
              {capability.subtitle}
            </span>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed pt-1">
              {capability.desc}
            </p>
          </div>
        </div>

        {/* Dual Core Insights: Sofía & Iván */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Sofía (UX & Visual) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FF3858]/10 border border-[#FF3858]/30 space-y-2 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-[#FF3858]/20 border border-[#FF3858]/50">
                <Image
                  src="/images/sofia_pink_beanbag.png"
                  alt="Sofía"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#FF3858] uppercase">
                ENFOQUE DE DISEÑO (SOFÍA)
              </span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-light">
              {capability.sofiaInsight}
            </p>
          </div>

          {/* Iván (Code & Architecture) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 space-y-2 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-[#00D1FF]/20 border border-[#00D1FF]/50">
                <Image
                  src="/images/ivan_standing_stylus.png"
                  alt="Iván"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#00D1FF] uppercase">
                ENFOQUE DE INGENIERÍA (IVÁN)
              </span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-light">
              {capability.ivanInsight}
            </p>
          </div>
        </div>

        {/* Deliverables & Stack */}
        <div className="space-y-4 pt-2 border-t border-white/10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capability.keyDeliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Recommended Stack Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Tecnologías recomendadas:</span>
            {capability.recommendedStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/10 relative z-10">
          <span className="text-[11px] text-gray-400 font-mono text-center sm:text-left">
            Diseño e Ingeniería 100% a la medida sin plantillas genéricas.
          </span>

          <button
            onClick={() => {
              onClose();
              onOpenProjectModal?.();
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#00E5FF] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Crear Proyecto con esta Capacidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
