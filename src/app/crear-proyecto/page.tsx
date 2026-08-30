"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Globe,
  BrainCircuit,
  Building2,
  Palette,
  Code2,
  ShieldCheck,
  Zap,
  MessageSquare,
} from "../../lib/icons";

export default function CrearProyectoPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [projectType, setProjectType] = useState("");
  const [designNeed, setDesignNeed] = useState<string[]>([]);
  const [techFeatures, setTechFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const projectTypes = [
    {
      id: "mobile_app",
      title: "App Móvil (iOS & Android)",
      desc: "Desarrollo nativo en Flutter/React Native con diseño táctil intuitivo.",
      icon: Smartphone,
      color: "#FF3B5C",
    },
    {
      id: "web_platform",
      title: "Plataforma Web / SaaS",
      desc: "Sistemas web de alta velocidad en Next.js, panel de usuarios y e-commerce.",
      icon: Globe,
      color: "#00E5FF",
    },
    {
      id: "ai_system",
      title: "Inteligencia Artificial & Agentes",
      desc: "Modelos LLMs, chatbots autónomos y automatización inteligente.",
      icon: BrainCircuit,
      color: "#8A2BE2",
    },
    {
      id: "enterprise_erp",
      title: "CRM, ERP & Gestión Empresarial",
      desc: "Control de ventas, inventarios, cotizaciones y distribuidores a medida.",
      icon: Building2,
      color: "#FF8800",
    },
  ];

  const designOptions = [
    { id: "branding", label: "🎨 Creación de marca, logotipo y colorimetría" },
    { id: "ux_ui", label: "✨ Diseño de experiencia UI/UX interactiva de alta fidelidad" },
    { id: "animations", label: "🎬 Microanimaciones e interfaz fluida a 60fps" },
    { id: "ready_design", label: "📐 Ya cuento con diseño visual (solo requiero ingeniería de software)" },
  ];

  const techOptions = [
    { id: "auth_db", label: "🔐 Autenticación segura y base de datos PostgreSQL cifrada" },
    { id: "payments", label: "💳 Pasarela de pagos en línea (Stripe / MercadoPago / PayPal)" },
    { id: "ai_chat", label: "🤖 Integración de IA conversacional (OpenAI / Claude)" },
    { id: "realtime_gps", label: "📍 Rastreo GPS en vivo y WebSockets en tiempo real" },
    { id: "whatsapp_api", label: "📲 Notificaciones automatizadas por WhatsApp Business API" },
    { id: "admin_dashboard", label: "📊 Panel administrativo con métricas y telemetría" },
  ];

  const timelineOptions = [
    { id: "mvp", title: "⚡ MVP Rápido (2 a 4 semanas)", desc: "Lanzamiento ágil de la primera versión para validar tu idea en el mercado." },
    { id: "standard", title: "🚀 Proyecto Completo (1 a 3 meses)", desc: "Arquitectura robusta por etapas con diseño avanzado y pruebas QA." },
    { id: "enterprise", title: "🏢 Infraestructura Dedicada", desc: "Solución de gran escala con escalamiento global y soporte prioritario." },
  ];

  const toggleDesignNeed = (id: string) => {
    setDesignNeed((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleTechFeature = (id: string) => {
    setTechFeatures((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSendToWhatsApp = () => {
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
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white py-12 px-6">
      <AmbientLivingCanvas />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo_full.png"
              alt="INNOCENTIA"
              width={200}
              height={50}
              className="object-contain filter drop-shadow-[0_0_15px_rgba(255,69,0,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <Link
            href="/"
            className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 transition-all"
          >
            <span>← Volver a la página principal</span>
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#00E5FF] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTUDIO DE CREACIÓN DE PROYECTO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ESTRUCTURA TU PROYECTO DIGITAL
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light">
            Sofía e Iván te guían para definir los requerimientos de diseño, experiencia y arquitectura técnica.
          </p>

          {/* Stepper Dots */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  step === s
                    ? "bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    : step > s
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-white/5 text-gray-500 border border-white/10"
                }`}
              >
                <span>0{s}</span>
                {step === s && (
                  <span className="hidden sm:inline">
                    {s === 1 ? "Tipo" : s === 2 ? "Diseño" : s === 3 ? "Ingeniería" : s === 4 ? "Tiempos" : "Resumen"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8">
          {/* STEP 1: Tipo de Proyecto */}
          {step === 1 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-8 h-8 rounded-full bg-[#FF3B5C]/20 border border-[#FF3B5C] flex items-center justify-center text-xs text-[#FF3B5C] font-bold font-mono">
                  01
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    ¿Qué tipo de solución digital deseas construir?
                  </h3>
                  <p className="text-xs text-gray-400">Selecciona el formato principal de tu plataforma.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((pt) => {
                  const Icon = pt.icon;
                  const isSelected = projectType === pt.title;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setProjectType(pt.title)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "bg-white/[0.08] border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-[1.02]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/25 text-gray-300"
                      }`}
                      style={{ borderColor: isSelected ? pt.color : undefined }}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: `${pt.color}25`, color: pt.color, border: `1px solid ${pt.color}45` }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{pt.title}</h4>
                        <p className="text-xs text-gray-400 font-light pt-1 leading-relaxed">{pt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#FF3B5C] cursor-pointer hover:scale-105 transition-all"
                >
                  <span>Siguiente: Diseño & UX</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Diseño & UX (Sofía) */}
          {step === 2 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FF3B5C]/20 border border-[#FF3B5C] flex items-center justify-center text-xs text-[#FF3B5C] font-bold font-mono">
                    02
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      Requerimientos de Diseño & Experiencia Visual
                    </h3>
                    <p className="text-xs text-gray-400">Supervisado por Sofía (UX & Emoción).</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#FF3B5C]/20 border border-[#FF3B5C] flex items-center justify-center text-sm">
                  🔴
                </div>
              </div>

              <div className="space-y-3">
                {designOptions.map((opt) => {
                  const isChecked = designNeed.includes(opt.label);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleDesignNeed(opt.label)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#FF3B5C]/15 border-[#FF3B5C] text-white shadow-[0_0_15px_rgba(255,59,92,0.2)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold">{opt.label}</span>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                          isChecked ? "bg-[#FF3B5C] border-[#FF3B5C] text-white" : "border-white/30"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#00E5FF] cursor-pointer hover:scale-105 transition-all"
                >
                  <span>Siguiente: Ingeniería & Stack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Módulos de Software (Iván) */}
          {step === 3 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-xs text-[#00E5FF] font-bold font-mono">
                    03
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      Módulos Técnicos & Arquitectura de Software
                    </h3>
                    <p className="text-xs text-gray-400">Supervisado por Iván (Ingeniería & Backend).</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-sm">
                  🔵
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {techOptions.map((opt) => {
                  const isChecked = techFeatures.includes(opt.label);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleTechFeature(opt.label)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#00E5FF]/15 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                          isChecked ? "bg-[#00E5FF] border-[#00E5FF] text-black" : "border-white/30"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-black" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#8A2BE2] cursor-pointer hover:scale-105 transition-all"
                >
                  <span>Siguiente: Tiempos & Alcance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Tiempos y Detalle de la Idea */}
          {step === 4 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-8 h-8 rounded-full bg-[#8A2BE2]/20 border border-[#8A2BE2] flex items-center justify-center text-xs text-[#8A2BE2] font-bold font-mono">
                  04
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Tiempo de Ejecución y Detalles de tu Idea
                  </h3>
                  <p className="text-xs text-gray-400">Cuéntanos un poco más sobre el objetivo del producto.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timelineOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.title)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        timeline === t.title
                          ? "bg-purple-900/30 border-purple-400 text-white shadow-[0_0_15px_#8A2BE2]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white">{t.title}</h4>
                      <p className="text-[11px] text-gray-400 pt-1 leading-relaxed">{t.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-mono text-gray-300 font-bold uppercase">
                    Describe tu idea o problema a resolver:
                  </label>
                  <textarea
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Ejemplo: Queremos crear una app para nuestra clínica donde los pacientes puedan agendar citas, ver estudios clínicos y recibir recordatorios por WhatsApp..."
                    className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#00E5FF] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_#00E5FF] cursor-pointer hover:scale-105 transition-all"
                >
                  <span>Generar Blueprint & Resumen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Resumen & Conexión Directa */}
          {step === 5 && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs text-emerald-400 font-bold font-mono">
                    05
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      Blueprint de Proyecto Generado
                    </h3>
                    <p className="text-xs text-gray-400">Especificación lista para revisión por Sofía e Iván.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔴</span>
                  <span className="text-sm">🔵</span>
                </div>
              </div>

              {/* Blueprint Summary Box */}
              <div className="p-6 rounded-2xl bg-black/90 border border-white/20 font-mono text-xs space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-2 text-gray-400">
                  <span>BLUEPRINT SPECIFICATION:</span>
                  <span className="text-emerald-400 font-bold">LISTO PARA LANZAMIENTO</span>
                </div>

                <div className="space-y-2 text-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tipo de Producto:</span>
                    <span className="text-white font-bold">{projectType || "Desarrollo a Medida"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tiempos / Alcance:</span>
                    <span className="text-[#00E5FF]">{timeline || "MVP Rápido (2 a 4 semanas)"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-1">Diseño (Sofía UX):</span>
                    <span className="text-[#FF3B5C] block">
                      {designNeed.length > 0 ? designNeed.join(", ") : "Diseño y Branding Integral"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-1">Módulos de Software (Iván Code):</span>
                    <span className="text-[#00E5FF] block">
                      {techFeatures.length > 0 ? techFeatures.join(", ") : "Arquitectura Serverless & Base de Datos"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-300 font-bold uppercase">Tu Nombre / Empresa:</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ej: Carlos Méndez"
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-300 font-bold uppercase">Teléfono / WhatsApp:</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Ej: +52 999 123 4567"
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                >
                  ← Modificar Requerimientos
                </button>

                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] hover:from-[#2BF576] hover:to-[#128C7E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.4)] cursor-pointer hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Enviar Blueprint a WhatsApp de Innocentia</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
