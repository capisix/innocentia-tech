"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import ProjectCreationForm from "../../components/portal/ProjectCreationForm";
import { Sparkles } from "../../lib/icons";

export default function CrearProyectoPage() {
  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Ambient Canvas */}
      <AmbientLivingCanvas />

      {/* Top Header */}
      <header className="relative z-40 border-b border-white/10 bg-[#040407]/90 backdrop-blur-2xl py-3.5 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA"
              className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
            />
            <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#00D1FF] border border-[#00D1FF]/30 font-bold uppercase">
              COTIZADOR &amp; CREACIÓN DE PROYECTOS
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Acceso al Portal Privado ↗</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 relative z-10 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF3858]/20 via-purple-500/20 to-[#00D1FF]/20 border border-[#00D1FF]/40 text-xs font-mono text-[#00D1FF] font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>ARQUITECTURA DE SOFTWARE &amp; DISEÑO TÁCTIL 60FPS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
            CREACIÓN &amp; COTIZACIÓN DE PROYECTO
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto font-mono">
            Define los requerimientos técnicos y visuales de tu aplicación. Tu proyecto quedará formalmente registrado y asignado a nuestro equipo de ingeniería y diseño.
          </p>
        </div>

        {/* The Project Creation Form Component wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-xs font-mono text-gray-400">
              Cargando formulario de creación de proyecto...
            </div>
          }
        >
          <ProjectCreationForm />
        </Suspense>
      </div>

      {/* Footer minimal */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs font-mono text-gray-500">
        <p>© 2026 Innocentia Tech. Todos los derechos reservados. Mérida, Yucatán, México.</p>
      </footer>
    </main>
  );
}
