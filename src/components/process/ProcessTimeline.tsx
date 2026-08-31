"use client";

import React, { useState } from "react";
import { Lightbulb, Paintbrush, Cpu, Code, ShieldCheck, Rocket, TrendingUp, CheckCircle2, Sparkles, ArrowRight } from "../../lib/icons";

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "01. DESCUBRIMIENTO",
      subtitle: "Comprensión & Visión Estratégica",
      desc: "Analizamos tus objetivos comerciales y necesidades para definir el alcance exacto del producto. Escuchamos, comprendemos y descubrimos aquello que realmente se quiere construir antes de escribir la primera línea de código.",
      deliverables: ["Definición de requerimientos", "Análisis de viabilidad técnica", "Alcance y roadmap del proyecto", "Estrategia de arquitectura inicial"],
      icon: Lightbulb,
      color: "#F59E0B",
      assigned: "Sofía & Iván (Sesión de Análisis)",
      badge: "FASE DE ENTENDIMIENTO",
    },
    {
      title: "02. DISEÑO & UX",
      subtitle: "Sofía UX & Design System",
      desc: "Sofía transforma las ideas en prototipos interactivos de alta fidelidad, paletas de colores, arquitectura de información y experiencias naturales que priorizan a las personas antes que a la tecnología.",
      deliverables: ["Prototipo interactivo 60fps", "Design System & Branding", "Pruebas de navegabilidad UX", "Microanimaciones vectoriales"],
      icon: Paintbrush,
      color: "#FF3B5C",
      assigned: "Sofía (Diseño & Experiencia)",
      badge: "DISEÑO DE IMPACTO",
    },
    {
      title: "03. ARQUITECTURA CLOUD",
      subtitle: "Iván Logic & Cloud Spec",
      desc: "Iván estructura el esquema de base de datos relacional, la seguridad cifrada, los endpoints de API y la infraestructura serverless para garantizar que el sistema escale sin límites.",
      deliverables: ["Esquema PostgreSQL / Supabase", "Especificación de API endpoints", "Infraestructura Serverless AWS", "Protocolos de seguridad & Cifrado"],
      icon: Cpu,
      color: "#8A2BE2",
      assigned: "Iván (Arquitectura de Datos)",
      badge: "INGENIERÍA ROBUSTA",
    },
    {
      title: "04. DESARROLLO NATIVO",
      subtitle: "Código Limpio & Modular",
      desc: "Construimos la solución utilizando las tecnologías más potentes del mercado (Next.js 16, React 19, Node.js, Python, Flutter) siguiendo estándares internacionales de desarrollo software.",
      deliverables: ["Código fuente 100% a medida", "Integración de Inteligencia Artificial", "Módulos de backend asíncronos", "APIs & Webhooks conectados"],
      icon: Code,
      color: "#00E5FF",
      assigned: "Iván & Equipo Dev",
      badge: "DESARROLLO A MEDIDA",
    },
    {
      title: "05. COMPROBACIÓN & QA",
      subtitle: "Pruebas de Carga & Seguridad",
      desc: "Probamos rigurosamente funcionalidades, rendimiento, estabilidad, seguridad antibot y experiencia de usuario en diferentes dispositivos y escenarios extremos de uso.",
      deliverables: ["Auditoría de seguridad y cifrado", "Pruebas de carga masiva de usuarios", "Verificación de estabilidad 99.9%", "Optimización de velocidad < 100ms"],
      icon: ShieldCheck,
      color: "#10B981",
      assigned: "Iván & QA Engineers",
      badge: "CONTROL DE CALIDAD",
    },
    {
      title: "06. ENTREGA & DESPLIEGUE",
      subtitle: "Lanzamiento en Edge Global",
      desc: "Implementamos la solución en producción con Cloudflare Edge Workers / AWS S3, entregamos documentación completa y transferimos la propiedad intelectual al cliente.",
      deliverables: ["Despliegue oficial en producción", "Documentación técnica completa", "Transferencia de código y licencias", "Capacitación de uso al equipo"],
      icon: Rocket,
      color: "#EC4899",
      assigned: "Sofía & Iván (Lanzamiento)",
      badge: "DESPLIEGUE OFICIAL",
    },
    {
      title: "07. EVOLUCIÓN CONTINUA",
      subtitle: "Soporte, IA & Escalamiento",
      desc: "Acompañamos el crecimiento de la plataforma con mantenimiento evolutivo, nuevas funcionalidades, integración de agentes de IA y expansión internacional.",
      deliverables: ["Soporte y mantenimiento activo", "Telemetría de uso en vivo", "Nuevos módulos & Integraciones", "Optimización continua de IA"],
      icon: TrendingUp,
      color: "#3B82F6",
      assigned: "Innocentia Support Core",
      badge: "CRECIMIENTO FUTURO",
    },
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="proceso" className="relative py-20 bg-[#040407] overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#00E5FF] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>METODOLOGÍA & PIPELINE DE INGENIERÍA</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            NUESTRO PROCESO DE DESARROLLO
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light">
            Trabajamos mediante cinco etapas principales que garantizan precisión, diseño superior y escalabilidad.
          </p>
        </div>

        {/* Horizontal Pipeline Stepper Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] border-white/40 shadow-2xl scale-105"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-400"
                }`}
                style={{
                  boxShadow: isActive ? `0 0 30px ${step.color}55` : "none",
                  borderColor: isActive ? step.color : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-gray-400">FASE 0{idx + 1}</span>
                  <Icon className="w-4 h-4" style={{ color: step.color }} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? "text-white" : "text-gray-300"}`}>
                  {step.title.split(". ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Graphic Dashboard Stage */}
        <div className="bg-white/[0.02] border border-white/15 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch shadow-2xl">
          {/* Left Column: Stage Text & Deliverables Checklist */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: `${current.color}25`, color: current.color, border: `1px solid ${current.color}45` }}
                >
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span
                    className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase"
                    style={{ backgroundColor: `${current.color}22`, color: current.color }}
                  >
                    {current.badge}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase pt-1">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Deliverables Grid */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                ENTREGABLES CERTIFICADOS DE LA FASE 0{activeStep + 1}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-gray-200 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Graphic Telemetry Dashboard Card */}
          <div className="lg:col-span-5 bg-black/80 border border-white/15 rounded-[28px] p-6 space-y-5 text-left font-mono text-xs flex flex-col justify-between shadow-2xl">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                ESTADO DE FASE 0{activeStep + 1}
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 text-[10px] sm:text-xs whitespace-nowrap">
                100% COMPLETADO
              </span>
            </div>

            {/* Telemetry Stats */}
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-gray-300">
                <span className="text-gray-400 text-[11px] sm:text-xs">Supervisión Asignada:</span>
                <span className="text-white font-bold text-xs sm:text-right">{current.assigned}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-gray-300">
                <span className="text-gray-400 text-[11px] sm:text-xs">Tiempo de Ejecución:</span>
                <span className="text-white text-xs sm:text-right">Optimizado en Sprint</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-gray-300">
                <span className="text-gray-400 text-[11px] sm:text-xs">Revisiones de Calidad:</span>
                <span className="text-[#00E5FF] font-bold text-xs sm:text-right">Aprobado 100%</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-gray-300">
                <span className="text-gray-400 text-[11px] sm:text-xs">Motor Tecnológico:</span>
                <span className="text-[#FF3B5C] font-bold text-xs sm:text-right">Innocentia Engine v3.6</span>
              </div>
            </div>

            {/* Graphic Progress Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-300">Progreso del Pipeline</span>
                <span className="text-[#00E5FF] font-bold">Fase {activeStep + 1} de 7</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((activeStep + 1) / 7) * 100}%`,
                    backgroundColor: current.color,
                    boxShadow: `0 0 15px ${current.color}`,
                  }}
                />
              </div>
            </div>

            <div className="text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest pt-1">
              INNOCENTIA PIPELINE SPECIFICATION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
