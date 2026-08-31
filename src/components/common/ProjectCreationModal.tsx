"use client";

import React from "react";
import ProjectCreationForm from "../portal/ProjectCreationForm";
import { X } from "../../lib/icons";

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectCreationModal({ isOpen, onClose }: ProjectCreationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#08090E] border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-8 text-left space-y-5 my-auto overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF3858]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start sm:items-center justify-between border-b border-white/10 pb-3.5 relative z-10 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA TECH"
              className="h-6 sm:h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)]"
            />
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block uppercase tracking-wider leading-tight font-mono">
                CREADOR DE PROYECTO &amp; COTIZADOR
              </span>
              <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-gray-400 mt-0.5">
                <span className="text-[#FF3858] font-semibold">● Sofía (Diseño UI/UX)</span>
                <span className="text-[#00D1FF] font-semibold">● Iván (Arquitectura Tech)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="relative z-10 max-h-[80vh] overflow-y-auto pr-1">
          <ProjectCreationForm onProjectCreated={() => {}} />
        </div>
      </div>
    </div>
  );
}
