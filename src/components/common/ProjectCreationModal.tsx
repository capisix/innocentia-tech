"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Globe,
  BrainCircuit,
  Building2,
  MessageSquare,
} from "../../lib/icons";

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectCreationModal({ isOpen, onClose }: ProjectCreationModalProps) {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [projectType, setProjectType] = useState("");
  const [designNeed, setDesignNeed] = useState<string[]>([]);
  const [techFeatures, setTechFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  if (!isOpen) return null;

  const projectTypes = [
    {
      id: "mobile_app",
      title: "App Móvil (iOS & Android)",
      desc: "Desarrollo nativo en Flutter/React Native con diseño táctil.",
      icon: Smartphone,
      color: "#FF3B5C",
    },
    {
      id: "web_platform",
      title: "Plataforma Web / SaaS",
      desc: "Sistemas web en Next.js, panel de usuarios y e-commerce.",
      icon: Globe,
      color: "#00E5FF",
    },
    {
      id: "ai_system",
      title: "Inteligencia Artificial & Agentes",
      desc: "Modelos LLMs, chatbots autónomos y automatización.",
      icon: BrainCircuit,
      color: "#8A2BE2",
    },
    {
      id: "enterprise_erp",
      title: "CRM, ERP & Gestión Empresarial",
      desc: "Control de ventas, inventarios y cotizaciones a medida.",
      icon: Building2,
      color: "#FF8800",
    },
  ];

  const designOptions = [
    { id: "branding", label: "🎨 Creación de marca, logotipo y colorimetría" },
    { id: "ux_ui", label: "✨ Diseño de experiencia UI/UX interactiva de alta fidelidad" },
    { id: "animations", label: "🎬 Microanimaciones e interfaz fluida a 60fps" },
    { id: "ready_design", label: "📐 Ya cuento con diseño visual (solo requiero código)" },
  ];

  const techOptions = [
    { id: "auth_db", label: "🔐 Autenticación y base de datos PostgreSQL cifrada" },
    { id: "payments", label: "💳 Pasarela de pagos en línea (Stripe / MercadoPago)" },
    { id: "ai_chat", label: "🤖 Integración de IA conversacional (OpenAI / Claude)" },
    { id: "realtime_gps", label: "📍 Rastreo GPS en vivo y WebSockets en tiempo real" },
    { id: "whatsapp_api", label: "📲 Notificaciones automáticas por WhatsApp API" },
    { id: "admin_dashboard", label: "📊 Panel administrativo con métricas en vivo" },
  ];

  const timelineOptions = [
    { id: "mvp", title: "⚡ MVP Rápido (2 a 4 semanas)", desc: "Lanzamiento ágil para validar tu idea en el mercado." },
    { id: "standard", title: "🚀 Proyecto Completo (1 a 3 meses)", desc: "Arquitectura robusta por etapas con diseño y QA." },
    { id: "enterprise", title: "🏢 Infraestructura Dedicada", desc: "Gran escala con escalamiento global y soporte." },
  ];

  const toggleDesignNeed = (label: string) => {
    setDesignNeed((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));
  };

  const toggleTechFeature = (label: string) => {
    setTechFeatures((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));
  };

  const handleFinishAndClose = () => {
    const summary = `
🚀 *NUEVO PROYECTO INNOCENTIA*
👤 *Nombre:* ${contactName || "No especificado"}
📞 *Contacto:* ${contactPhone || "WhatsApp"}

📌 *Tipo de Proyecto:* ${projectType || "A medida"}
🎨 *Requerimientos de Diseño (Sofía):*
${designNeed.length > 0 ? designNeed.map((d) => `  • ${d}`).join("\n") : "  • A definir"}

⚡ *Módulos Tecnológicos (Iván):*
${techFeatures.length > 0 ? techFeatures.map((t) => `  • ${t}`).join("\n") : "  • A definir"}

⏱️ *Tiempo estimado:* ${timeline || "A convenir"}
📝 *Descripción de la Idea:* ${projectDescription || "Quiero iniciar un proyecto digital."}
    `.trim();

    const encoded = encodeURIComponent(summary);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");

    setIsCompleted(true);

    // Automatically close the floating modal after 2.2 seconds
    setTimeout(() => {
      setIsCompleted(false);
      setStep(1);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#08090E] border border-white/20 rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-10 text-left space-y-6 my-auto overflow-hidden">
        {/* Top Floating Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF3B5C]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-7">
              <Image
                src="/images/sofia_ivan_chars.png"
                alt="Sofía & Iván"
                width={40}
                height={30}
                className="object-contain filter drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">
                Creador de Proyecto • Innocentia Studio
              </span>
              <span className="text-[10px] text-gray-400 font-mono">🔴 Sofía (Diseño) • 🔵 Iván (Código)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Completion State */}
        {isCompleted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 relative z-10 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-wide">
              ¡Blueprint Enviado con Éxito!
            </h3>
            <p className="text-sm text-gray-300 max-w-md font-light">
              Sofía e Iván recibieron tu propuesta en WhatsApp. La ventana se cerrará automáticamente en un momento...
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              Cerrar ahora
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            {/* Step Pills */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                    step === s
                      ? "bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white shadow-[0_0_12px_#00E5FF]"
                      : step > s
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/5 text-gray-500 border border-white/10"
                  }`}
                >
                  0{s} {s === 1 ? "Tipo" : s === 2 ? "Diseño" : s === 3 ? "Stack" : s === 4 ? "Tiempos" : "Blueprint"}
                </div>
              ))}
            </div>

            {/* STEP 1: Tipo */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-left space-y-1">
                  <h4 className="text-lg font-bold text-white">¿Qué tipo de producto digital deseas construir?</h4>
                  <p className="text-xs text-gray-400">Selecciona el formato principal de tu plataforma.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((pt) => {
                    const Icon = pt.icon;
                    const isSelected = projectType === pt.title;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setProjectType(pt.title)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? "bg-white/[0.08] border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.02]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                        style={{ borderColor: isSelected ? pt.color : undefined }}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: `${pt.color}25`, color: pt.color, border: `1px solid ${pt.color}45` }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{pt.title}</h5>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">{pt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#FF3B5C] cursor-pointer hover:scale-105 transition-all"
                  >
                    <span>Siguiente: Diseño & UX</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Diseño (Sofía) */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white">Requerimientos de Diseño & UX</h4>
                    <p className="text-xs text-gray-400">Supervisado por Sofía (Emoción & Colorimetría).</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF3B5C]/20 border border-[#FF3B5C] text-[#FF3B5C] font-mono font-bold">
                    🔴 Sofía
                  </span>
                </div>
                <div className="space-y-2.5">
                  {designOptions.map((opt) => {
                    const isChecked = designNeed.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleDesignNeed(opt.label)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-semibold ${
                          isChecked
                            ? "bg-[#FF3B5C]/15 border-[#FF3B5C] text-white shadow-[0_0_12px_rgba(255,59,92,0.2)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? "bg-[#FF3B5C] border-[#FF3B5C] text-white" : "border-white/30"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                  >
                    ← Atrás
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#00E5FF] cursor-pointer hover:scale-105 transition-all"
                  >
                    <span>Siguiente: Módulos Técnicos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Módulos Técnicos (Iván) */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white">Módulos Técnicos & Arquitectura</h4>
                    <p className="text-xs text-gray-400">Supervisado por Iván (Backend & Cloud).</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] font-mono font-bold">
                    🔵 Iván
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {techOptions.map((opt) => {
                    const isChecked = techFeatures.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleTechFeature(opt.label)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-semibold ${
                          isChecked
                            ? "bg-[#00E5FF]/15 border-[#00E5FF] text-white shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <span className="pr-2">{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isChecked ? "bg-[#00E5FF] border-[#00E5FF] text-black" : "border-white/30"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                  >
                    ← Atrás
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#8A2BE2] cursor-pointer hover:scale-105 transition-all"
                  >
                    <span>Siguiente: Tiempos & Alcance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Tiempos & Descripción */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-left space-y-1">
                  <h4 className="text-lg font-bold text-white">Tiempos y Detalles de tu Idea</h4>
                  <p className="text-xs text-gray-400">Cuéntanos un poco sobre el objetivo del producto.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {timelineOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.title)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        timeline === t.title
                          ? "bg-purple-900/30 border-purple-400 text-white shadow-[0_0_12px_#8A2BE2]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                      }`}
                    >
                      <h5 className="text-xs font-bold text-white">{t.title}</h5>
                      <p className="text-[10px] text-gray-400 pt-0.5 leading-tight">{t.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-mono text-gray-300 font-bold uppercase">
                    Describe tu idea o problema:
                  </label>
                  <textarea
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Ej: Quiero una app donde los usuarios puedan reservar restaurantes y pagar con tarjeta..."
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                  >
                    ← Atrás
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#00E5FF] cursor-pointer hover:scale-105 transition-all"
                  >
                    <span>Generar Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Resumen & WhatsApp */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-bold text-white">Blueprint de Proyecto Listo</h4>
                    <p className="text-xs text-gray-400">Al enviar, la ventana flotante se cerrará automáticamente.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                    ✓ VALIDADO
                  </span>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-xl bg-black/90 border border-white/20 font-mono text-xs space-y-2 text-left">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Producto:</span>
                    <span className="text-white font-bold">{projectType || "Desarrollo a Medida"}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Diseño (Sofía):</span>
                    <span className="text-[#FF3B5C]">{designNeed.length > 0 ? designNeed.join(", ") : "A Definir"}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Ingeniería (Iván):</span>
                    <span className="text-[#00E5FF]">{techFeatures.length > 0 ? techFeatures.join(", ") : "A Definir"}</span>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tu Nombre / Empresa"
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Teléfono / WhatsApp"
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                  >
                    ← Modificar
                  </button>

                  <button
                    onClick={handleFinishAndClose}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] hover:from-[#2BF576] hover:to-[#128C7E] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(37,211,102,0.5)] cursor-pointer hover:scale-105 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar a WhatsApp & Cerrar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
