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
  HelpCircle,
  Mail,
  Phone,
  User,
  ExternalLink,
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

  // Contact State
  const [contactName, setContactName] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");

  // Active Explainer Card (Sofia / Ivan Advice)
  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  if (!isOpen) return null;

  const projectTypes = [
    {
      id: "mobile_app",
      title: "App Móvil (iOS & Android)",
      desc: "Desarrollo nativo en Flutter/React Native con diseño táctil.",
      icon: Smartphone,
      color: "#FF3858",
    },
    {
      id: "web_platform",
      title: "Plataforma Web / SaaS",
      desc: "Sistemas web en Next.js, panel de usuarios y e-commerce.",
      icon: Globe,
      color: "#00D1FF",
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
    {
      id: "branding",
      label: "🎨 Creación de marca, logotipo y colorimetría",
      hint: "Sofía: Crearemos la identidad completa, manual de marca, paleta de colores y logotipo vectorial.",
    },
    {
      id: "ux_ui",
      label: "✨ Diseño de experiencia UI/UX interactiva de alta fidelidad",
      hint: "Sofía: Diseñaremos cada pantalla en Figma con flujos de usuario claros, prototipos interactivos y pruebas de usabilidad.",
    },
    {
      id: "animations",
      label: "🎬 Microanimaciones e interfaz fluida a 60fps",
      hint: "Sofía: Implementaremos transiciones suaves, micro-interacciones y efectos visuales modernos que cautiven a tus usuarios.",
    },
    {
      id: "ready_design",
      label: "📐 Ya cuento con diseño visual (solo requiero código)",
      hint: "Sofía: Revisaremos tu diseño en Figma para validar la arquitectura y pasarlo directo al equipo de desarrollo.",
    },
  ];

  const techOptions = [
    {
      id: "auth_db",
      label: "🔐 Autenticación y base de datos PostgreSQL cifrada",
      hint: "Iván: Configuraré inicio de sesión seguro (OAuth/Google/Apple), sesiones JWT y base de datos relacional con respaldos automáticos.",
    },
    {
      id: "payments",
      label: "💳 Pasarela de pagos en línea (Stripe / MercadoPago)",
      hint: "Iván: Integración de cobros recurrentes, suscripciones mensuales, checkout seguro y facturación automática.",
    },
    {
      id: "ai_chat",
      label: "🤖 Integración de IA conversacional (OpenAI / Claude)",
      hint: "Iván: Conexión de modelos LLMs entrenados con tus datos de negocio para responder preguntas o automatizar tareas 24/7.",
    },
    {
      id: "realtime_gps",
      label: "📍 Rastreo GPS en vivo y WebSockets en tiempo real",
      hint: "Iván: Conexión bidireccional instantánea para mapas interactivos, entregas, geolocalización o chats multiusuario.",
    },
    {
      id: "whatsapp_api",
      label: "📲 Notificaciones automáticas por WhatsApp API",
      hint: "Iván: Envío de alertas de pedidos, recordatorios y confirmaciones automáticas directo al WhatsApp de tus clientes.",
    },
    {
      id: "admin_dashboard",
      label: "📊 Panel administrativo con métricas en vivo",
      hint: "Iván: Dashboard para controlar usuarios, ingresos, reportes en tiempo real y descarga de datos en Excel/PDF.",
    },
  ];

  const timelineOptions = [
    {
      id: "mvp",
      title: "⚡ MVP Rápido (2 a 4 semanas)",
      desc: "Lanzamiento ágil para validar tu idea en el mercado.",
    },
    {
      id: "standard",
      title: "🚀 Proyecto Completo (1 a 3 meses)",
      desc: "Arquitectura robusta por etapas con diseño y QA.",
    },
    {
      id: "enterprise",
      title: "🏢 Infraestructura Dedicada",
      desc: "Gran escala con escalamiento global y soporte continuo.",
    },
  ];

  const toggleDesignNeed = (label: string) => {
    setDesignNeed((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const toggleTechFeature = (label: string) => {
    setTechFeatures((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  // Validations
  const isStep1Valid = projectType.length > 0;
  const isStep2Valid = designNeed.length > 0;
  const isStep3Valid = techFeatures.length > 0;
  const isStep4Valid = timeline.length > 0 && projectDescription.trim().length >= 10;
  const isStep5Valid =
    contactName.trim().length > 0 &&
    contactCompany.trim().length > 0 &&
    contactPhone.trim().length > 0 &&
    contactEmail.trim().length > 0;

  const handleFinishAndClose = () => {
    if (!isStep5Valid) return;

    const summary = `
🚀 *NUEVO PROYECTO INNOCENTIA*
━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${contactName}
🏢 *Empresa:* ${contactCompany}
📞 *Teléfono:* ${contactPhone}
📧 *Correo:* ${contactEmail}
🌐 *Sitio Web:* ${contactWebsite || "No especificado"}

📌 *Tipo de Producto:* ${projectType}
🎨 *Diseño (Sofía):*
${designNeed.map((d) => `  • ${d}`).join("\n")}

⚡ *Tecnología (Iván):*
${techFeatures.map((t) => `  • ${t}`).join("\n")}

⏱️ *Tiempo Estimado:* ${timeline}
📝 *Descripción del Proyecto:*
"${projectDescription}"
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const encoded = encodeURIComponent(summary);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");

    setIsCompleted(true);

    setTimeout(() => {
      setIsCompleted(false);
      setStep(1);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#08090E] border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-9 text-left space-y-5 my-auto overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF3858]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-8">
              <Image
                src="/images/sofia_ivan_chars.png"
                alt="Sofía & Iván"
                width={44}
                height={34}
                className="object-contain filter drop-shadow-[0_0_10px_rgba(255,56,88,0.5)]"
              />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block uppercase tracking-wider">
                Creador de Proyecto • Innocentia Studio
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                🔴 Sofía (Diseño) • 🔵 Iván (Código)
              </span>
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
              Sofía e Iván recibieron tu propuesta en WhatsApp con todos los datos. Nos pondremos en contacto de inmediato.
            </p>
          </div>
        ) : (
          <div className="space-y-5 relative z-10">
            {/* Step Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all whitespace-nowrap ${
                    step === s
                      ? "bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white shadow-[0_0_12px_#00D1FF]"
                      : step > s
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/5 text-gray-500 border border-white/10"
                  }`}
                >
                  0{s}{" "}
                  {s === 1
                    ? "Tipo"
                    : s === 2
                    ? "Diseño"
                    : s === 3
                    ? "Stack"
                    : s === 4
                    ? "Tiempos"
                    : "Contacto"}
                </div>
              ))}
            </div>

            {/* ======================================================== */}
            {/* STEP 1: Tipo de Producto */}
            {/* ======================================================== */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-left space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    ¿Qué tipo de producto digital deseas construir?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Selecciona al menos 1 opción para continuar (obligatorio).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((pt) => {
                    const Icon = pt.icon;
                    const isSelected = projectType === pt.title;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setProjectType(pt.title)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? "bg-white/[0.08] border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.02]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                        style={{ borderColor: isSelected ? pt.color : undefined }}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                            style={{
                              backgroundColor: `${pt.color}25`,
                              color: pt.color,
                              border: `1px solid ${pt.color}45`,
                            }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{pt.title}</h5>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                            {pt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {projectType ? `✓ Seleccionado: ${projectType}` : "⚠️ Elige al menos 1 opción"}
                  </span>

                  <button
                    disabled={!isStep1Valid}
                    onClick={() => setStep(2)}
                    className={`px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                      isStep1Valid
                        ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white shadow-[0_0_20px_#FF3858] cursor-pointer hover:scale-105"
                        : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    <span>Siguiente: Diseño & UX</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 2: Requerimientos de Diseño (Sofía) */}
            {/* ======================================================== */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-0.5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Requerimientos de Diseño & UX
                    </h4>
                    <p className="text-xs text-gray-400">
                      Supervisado por Sofía (Emoción & Colorimetría). Selecciona mínimo 1.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3858]/15 border border-[#FF3858]/40">
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/images/sofia_pink_beanbag.png" alt="S" width={20} height={20} className="object-contain" />
                    </div>
                    <span className="text-[11px] text-[#FF3858] font-mono font-bold">Sofía</span>
                  </div>
                </div>

                {/* Sofía Explainer Tooltip Banner */}
                {activeHelp && (
                  <div className="p-3 rounded-2xl bg-[#FF3858]/10 border border-[#FF3858]/40 flex items-start gap-3 animate-in fade-in duration-200">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                      <Image src="/images/sofia_standing_brush.png" alt="Sofía" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="flex-1 text-xs text-gray-200">
                      <strong className="text-[#FF3858] block mb-0.5">Explicación de Sofía:</strong>
                      <p>{activeHelp}</p>
                    </div>
                    <button onClick={() => setActiveHelp(null)} className="text-gray-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="space-y-2.5">
                  {designOptions.map((opt) => {
                    const isChecked = designNeed.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all text-xs font-semibold ${
                          isChecked
                            ? "bg-[#FF3858]/15 border-[#FF3858] text-white shadow-[0_0_12px_rgba(255,56,88,0.25)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <div
                          onClick={() => toggleDesignNeed(opt.label)}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isChecked ? "bg-[#FF3858] border-[#FF3858] text-white" : "border-white/30"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>

                        {/* Doubt / Question Button with Sofía */}
                        <button
                          onClick={() => setActiveHelp(opt.hint)}
                          title="¿Tienes dudas? Pregúntale a Sofía"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF3858]/20 text-gray-400 hover:text-[#FF3858] transition-colors ml-2 cursor-pointer flex items-center gap-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline font-mono">Dudas</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                  >
                    ← Atrás
                  </button>

                  <button
                    disabled={!isStep2Valid}
                    onClick={() => {
                      setActiveHelp(null);
                      setStep(3);
                    }}
                    className={`px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                      isStep2Valid
                        ? "bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white shadow-[0_0_20px_#00D1FF] cursor-pointer hover:scale-105"
                        : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    <span>Siguiente: Módulos Técnicos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 3: Módulos Técnicos (Iván) */}
            {/* ======================================================== */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-0.5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Módulos Técnicos & Arquitectura
                    </h4>
                    <p className="text-xs text-gray-400">
                      Supervisado por Iván (Backend & Cloud). Selecciona mínimo 1.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/40">
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/images/ivan_standing_stylus.png" alt="I" width={20} height={20} className="object-contain" />
                    </div>
                    <span className="text-[11px] text-[#00D1FF] font-mono font-bold">Iván</span>
                  </div>
                </div>

                {/* Iván Explainer Tooltip Banner */}
                {activeHelp && (
                  <div className="p-3 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/40 flex items-start gap-3 animate-in fade-in duration-200">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                      <Image src="/images/ivan_idea_laptop.png" alt="Iván" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="flex-1 text-xs text-gray-200">
                      <strong className="text-[#00D1FF] block mb-0.5">Explicación Técnica de Iván:</strong>
                      <p>{activeHelp}</p>
                    </div>
                    <button onClick={() => setActiveHelp(null)} className="text-gray-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {techOptions.map((opt) => {
                    const isChecked = techFeatures.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all text-xs font-semibold ${
                          isChecked
                            ? "bg-[#00D1FF]/15 border-[#00D1FF] text-white shadow-[0_0_12px_rgba(0,209,255,0.25)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <div
                          onClick={() => toggleTechFeature(opt.label)}
                          className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 pr-1"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isChecked ? "bg-[#00D1FF] border-[#00D1FF] text-black" : "border-white/30"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <span className="truncate">{opt.label}</span>
                        </div>

                        {/* Doubt / Question Button with Iván */}
                        <button
                          onClick={() => setActiveHelp(opt.hint)}
                          title="¿Tienes dudas técnicas? Pregúntale a Iván"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00D1FF]/20 text-gray-400 hover:text-[#00D1FF] transition-colors flex-shrink-0 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                  >
                    ← Atrás
                  </button>

                  <button
                    disabled={!isStep3Valid}
                    onClick={() => {
                      setActiveHelp(null);
                      setStep(4);
                    }}
                    className={`px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                      isStep3Valid
                        ? "bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] text-white shadow-[0_0_20px_#8A2BE2] cursor-pointer hover:scale-105"
                        : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    <span>Siguiente: Tiempos & Alcance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 4: Tiempos & Descripción Obligatoria */}
            {/* ======================================================== */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-left space-y-0.5">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Tiempos y Descripción de tu Proyecto
                  </h4>
                  <p className="text-xs text-gray-400">
                    Elige el plazo deseado y describe detalladamente tu idea (obligatorio).
                  </p>
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

                {/* Mandatory Project Description Textarea */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono text-gray-300 font-bold uppercase flex items-center gap-1.5">
                      <span>Descripción de tu Proyecto / Idea:</span>
                      <span className="text-[#FF3858] font-black">* (Obligatorio)</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {projectDescription.trim().length}/10 caracteres mín.
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Cuéntanos con tus palabras: ¿Qué hace tu app o sistema? ¿Qué funciones clave imaginas? ¿A qué público va dirigido?..."
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF] leading-relaxed"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                  >
                    ← Atrás
                  </button>

                  <button
                    disabled={!isStep4Valid}
                    onClick={() => setStep(5)}
                    className={`px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                      isStep4Valid
                        ? "bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white shadow-[0_0_20px_#00D1FF] cursor-pointer hover:scale-105"
                        : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    <span>Siguiente: Datos de Contacto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 5: Datos de Contacto & Blueprint */}
            {/* ======================================================== */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left space-y-0.5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Datos de Contacto del Proyecto
                    </h4>
                    <p className="text-xs text-gray-400">
                      Ingresa tus datos completos para enviarte la propuesta formal.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                    PASO FINAL
                  </span>
                </div>

                {/* Summary Pill */}
                <div className="p-3 rounded-xl bg-black/90 border border-white/20 font-mono text-[11px] space-y-1.5 text-left">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Producto:</span>
                    <span className="text-white font-bold">{projectType}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Diseño (Sofía):</span>
                    <span className="text-[#FF3858]">{designNeed.length} requerimientos</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Tecnología (Iván):</span>
                    <span className="text-[#00D1FF]">{techFeatures.length} módulos</span>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Nombre */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-300 uppercase font-bold">
                      Nombre Completo *
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-3.5 h-3.5 absolute left-3.5 text-gray-500" />
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ej: Alejandro Morales"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF]"
                      />
                    </div>
                  </div>

                  {/* Empresa */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-300 uppercase font-bold">
                      Empresa / Negocio *
                    </label>
                    <div className="relative flex items-center">
                      <Building2 className="w-3.5 h-3.5 absolute left-3.5 text-gray-500" />
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Ej: InnovaCorp SA"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF]"
                      />
                    </div>
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-300 uppercase font-bold">
                      Teléfono / WhatsApp *
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-3.5 h-3.5 absolute left-3.5 text-gray-500" />
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF]"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-300 uppercase font-bold">
                      Correo Electrónico *
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="w-3.5 h-3.5 absolute left-3.5 text-gray-500" />
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contacto@empresa.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Dirección Web (Opcional) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-300 uppercase font-bold">
                    Dirección Web / Sitio Actual (Opcional)
                  </label>
                  <div className="relative flex items-center">
                    <ExternalLink className="w-3.5 h-3.5 absolute left-3.5 text-gray-500" />
                    <input
                      type="url"
                      value={contactWebsite}
                      onChange={(e) => setContactWebsite(e.target.value)}
                      placeholder="https://www.tuempresa.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-gray-300 text-xs font-bold uppercase hover:text-white cursor-pointer"
                  >
                    ← Modificar
                  </button>

                  <button
                    disabled={!isStep5Valid}
                    onClick={handleFinishAndClose}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all ${
                      isStep5Valid
                        ? "bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] hover:from-[#2BF576] hover:to-[#128C7E] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] cursor-pointer hover:scale-105"
                        : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                    }`}
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
