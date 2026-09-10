"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Globe,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Check,
  Share2,
  Send,
  MessageSquare,
  Clock,
  Sparkles,
  Phone,
} from "../../lib/icons";

interface ProjectCreationFormProps {
  initialVendorCode?: string;
  initialVendorName?: string;
  isEmbeddedInPortal?: boolean;
  onProjectCreated?: (projectData: any) => void;
}

export default function ProjectCreationForm({
  initialVendorCode = "",
  initialVendorName = "",
  isEmbeddedInPortal = false,
  onProjectCreated,
}: ProjectCreationFormProps) {
  // Step 1: Client & Vendor Registration
  // Step 2: Project Type
  // Step 3: Design (Sofia)
  // Step 4: Tech & Backend (Ivan)
  // Step 5: Scope, Budget & Generation
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [registeredClientId, setRegisteredClientId] = useState("");
  const [createdProjectFolio, setCreatedProjectFolio] = useState("");

  // Step 1 State - Client Registration
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCity, setClientCity] = useState("");

  // Step 1 State - Vendor Attribution (Defaults to Unassigned / Blank so CEO can route manually)
  const [vendorCode, setVendorCode] = useState(initialVendorCode || "SIN-ASESOR");
  const [vendorName, setVendorName] = useState(initialVendorName || "Sin Asesor Asignado (Por Canalizar por Dirección General)");
  const [isLockedByReferral, setIsLockedByReferral] = useState(false);
  const [vendorSelectMode, setVendorSelectMode] = useState<"unassigned" | "carlos" | "direct" | "custom">("unassigned");
  const [isClientRegistered, setIsClientRegistered] = useState(false);

  // Form State - Project Specifications
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("mobile_app");
  const [designNeeds, setDesignNeeds] = useState<string[]>([
    "🎨 Diseño UI/UX interactivo de alta fidelidad en Figma",
    "🎬 Microanimaciones e interfaz fluida a 60fps",
  ]);
  const [techFeatures, setTechFeatures] = useState<string[]>([
    "🔐 Autenticación y base de datos PostgreSQL cifrada",
    "💳 Pasarela de pagos en línea (Stripe / MercadoPago)",
  ]);
  const [timeline, setTimeline] = useState("standard");
  const [budgetRange, setBudgetRange] = useState("150k_350k");
  const [projectDescription, setProjectDescription] = useState("");

  // Read URL query params if client arrives via referral link (e.g. ?ref=VEN-CARLOS-202&vendedor=Carlos+Mendoza)
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.location && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref") || urlParams.get("vendedor_id");
        const vend = urlParams.get("vendedor") || urlParams.get("asesor");
        if (ref || vend) {
          setIsLockedByReferral(true);
          setVendorSelectMode("custom");
          if (ref) setVendorCode(ref);
          if (vend) setVendorName(decodeURIComponent(vend));
        }
      }
    } catch (err) {
      // Safe SSR fallback
    }
  }, []);

  const projectTypes = [
    {
      id: "mobile_app",
      title: "App Móvil (iOS & Android)",
      desc: "Desarrollo nativo en Flutter/React Native con diseño táctil y soporte para App Store & Play Store.",
      icon: Smartphone,
      color: "#FF3858",
    },
    {
      id: "web_platform",
      title: "Plataforma Web / SaaS",
      desc: "Sistemas web en Next.js, panel de usuarios, automatización en la nube y e-commerce.",
      icon: Globe,
      color: "#00D1FF",
    },
    {
      id: "ai_system",
      title: "Inteligencia Artificial & Agentes",
      desc: "Modelos LLMs, chatbots autónomos, visión por computadora y análisis predictivo.",
      icon: BrainCircuit,
      color: "#8A2BE2",
    },
    {
      id: "enterprise_erp",
      title: "CRM, ERP & Gestión Empresarial",
      desc: "Control de ventas, inventarios, logística, facturación CFDI y WebSockets en tiempo real.",
      icon: Building2,
      color: "#FF8800",
    },
  ];

  const designOptions = [
    {
      id: "branding",
      label: "🎨 Creación de marca, logotipo vectorial y manual de identidad",
      hint: "Sofía (UX/UI): Creación completa de colorimetría, tipografía corporativa y assets gráficos.",
    },
    {
      id: "ux_ui",
      label: "✨ Diseño UI/UX interactivo de alta fidelidad en Figma",
      hint: "Sofía (UX/UI): Wireframes, flujos de navegación optimizados para conversión y prototipo clickeable.",
    },
    {
      id: "animations",
      label: "🎬 Microanimaciones e interfaz fluida a 60fps",
      hint: "Sofía (UX/UI): Transiciones visuales con Framer Motion, feedback háptico y efectos neón/vidrio.",
    },
    {
      id: "design_system",
      label: "📐 Sistema de diseño modular y componentes reutilizables",
      hint: "Sofía (UX/UI): Tokens de diseño en Tailwind CSS listos para escalabilidad del equipo de ingeniería.",
    },
  ];

  const techOptions = [
    {
      id: "auth_db",
      label: "🔐 Autenticación y base de datos PostgreSQL cifrada",
      hint: "Iván (Tech): OAuth (Google/Apple), sesiones seguras JWT y base de datos relacional con respaldos automáticos.",
    },
    {
      id: "payments",
      label: "💳 Pasarela de pagos en línea (Stripe / MercadoPago)",
      hint: "Iván (Tech): Cobros únicos, suscripciones recurrentes, split de comisiones y facturación electrónica.",
    },
    {
      id: "realtime_gps",
      label: "📍 Rastreo GPS en vivo y WebSockets en tiempo real",
      hint: "Iván (Tech): Transmisión bidireccional instantánea para mapas de entrega, vehículos y chats multiusuario.",
    },
    {
      id: "ai_agents",
      label: "🤖 Integración de IA conversacional (OpenAI / Claude)",
      hint: "Iván (Tech): Agentes inteligentes entrenados con tus políticas de negocio para atención 24/7.",
    },
    {
      id: "whatsapp_api",
      label: "📲 Notificaciones automáticas por WhatsApp API",
      hint: "Iván (Tech): Confirmaciones de pedidos, recordatorios y cotizaciones enviadas al WhatsApp del cliente.",
    },
    {
      id: "admin_dashboard",
      label: "📊 Panel administrativo con métricas y exportación de datos",
      hint: "Iván (Tech): Dashboard con KPIs en tiempo real, control de roles de usuario y reportes en Excel/PDF.",
    },
  ];

  const budgetOptions = [
    {
      id: "50k_150k",
      title: "$50,000 - $150,000 MXN",
      usd: "~$2,800 - $8,500 USD",
      desc: "Ideal para MVPs ágiles, sitios interactivos y aplicaciones fase 1.",
    },
    {
      id: "150k_350k",
      title: "$150,000 - $350,000 MXN",
      usd: "~$8,500 - $19,500 USD",
      desc: "Solución completa con diseño premium, backend escalable e integraciones.",
    },
    {
      id: "350k_plus",
      title: "$350,000+ MXN",
      usd: "~$19,500+ USD",
      desc: "Ecosistema corporativo de alta concurrencia, IA personalizada y cloud dedicada.",
    },
  ];

  const timelineOptions = [
    {
      id: "fast_mvp",
      title: "⚡ MVP Rápido (2 a 4 semanas)",
      desc: "Lanzamiento ágil para validar en mercado con sprint intensivo.",
    },
    {
      id: "standard",
      title: "🚀 Proyecto Completo (1 a 3 meses)",
      desc: "Arquitectura integral por sprints, diseño en Figma y pruebas QA.",
    },
    {
      id: "enterprise",
      title: "🏢 Infraestructura Continua",
      desc: "Desarrollo a gran escala con soporte técnico y evolución continua.",
    },
  ];

  const toggleDesign = (val: string) => {
    setDesignNeeds((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleTech = (val: string) => {
    setTechFeatures((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  // Generate Referral Share Link
  const [vendorReferralLink, setVendorReferralLink] = useState(`https://innocentia.tech/crear-proyecto?ref=${vendorCode}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVendorReferralLink(
        `${window.location.origin}/crear-proyecto?ref=${encodeURIComponent(vendorCode)}&vendedor=${encodeURIComponent(vendorName)}`
      );
    }
  }, [vendorCode, vendorName]);

  const copyReferralLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(vendorReferralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Validations (Vendor is optional so client can leave it blank for CEO routing)
  const isStep1Valid =
    clientName.trim().length >= 3 &&
    clientCompany.trim().length >= 2 &&
    clientPhone.trim().length >= 8 &&
    clientEmail.trim().length >= 5;

  const isStep2Valid = projectType.length > 0;
  const isStep3Valid = designNeeds.length > 0;
  const isStep4Valid = techFeatures.length > 0;
  const isStep5Valid = projectName.trim().length >= 3 && projectDescription.trim().length >= 10;

  const handleRegisterClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid) return;

    const cliId = "CLI-" + Math.floor(10000 + Math.random() * 90000);
    setRegisteredClientId(cliId);
    setIsClientRegistered(true);
    setStep(2);
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep5Valid) return;

    const folio = "PROJ-" + Math.floor(100000 + Math.random() * 900000);
    setCreatedProjectFolio(folio);
    setIsCompleted(true);

    const projectSummary = `
🚀 *FICHA OFICIAL DE PROYECTO & COTIZACIÓN • INNOCENTIA TECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 *Folio de Proyecto:* ${folio}
🆔 *ID de Cliente Registrado:* ${registeredClientId || "CLI-2026-8941"}
📅 *Fecha de Emisión:* ${new Date().toLocaleDateString("es-MX", { dateStyle: "long" })}

👤 *CLIENTE REGISTRADO:*
• *Nombre:* ${clientName}
• *Empresa:* ${clientCompany}
• *WhatsApp / Tel:* ${clientPhone}
• *Correo:* ${clientEmail}
• *Ciudad:* ${clientCity || "No especificada"}

💼 *ASESOR COMERCIAL VINCULADO:*
• *Código Vendedor:* ${vendorCode}
• *Nombre Asesor:* ${vendorName}
• *Atribución Comercial:* Bolsa 20% Máx (Principio 1er Registro - 24 Meses)

📌 *DETALLES DEL PROYECTO:*
• *Nombre del Proyecto:* ${projectName}
• *Tipo de Solución:* ${projectTypes.find((p) => p.id === projectType)?.title}
• *Rango de Inversión:* ${budgetOptions.find((b) => b.id === budgetRange)?.title} (${budgetOptions.find((b) => b.id === budgetRange)?.usd})
• *Plazo de Entrega:* ${timelineOptions.find((t) => t.id === timeline)?.title}

🎨 *REQUERIMIENTOS DE DISEÑO (SOFÍA):*
${designNeeds.map((d) => `  ✓ ${d}`).join("\n")}

⚡ *ARQUITECTURA & DESARROLLO (IVÁN):*
${techFeatures.map((t) => `  ✓ ${t}`).join("\n")}

📝 *DESCRIPCIÓN DEL REQUERIMIENTO:*
"${projectDescription}"
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 *Proyecto y cliente formalmente vinculados en Innocentia Tech.*
    `.trim();

    // Store lead for team chat & proposal system
    try {
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("innocentia_incoming_leads") || "[]");
        const newLeadItem = {
          id: folio,
          clientName,
          clientCompany,
          clientPhone,
          clientEmail,
          vendorCode: vendorCode || "SIN-ASESOR",
          vendorName: vendorName || "Sin Asesor (Por Canalizar por Dirección)",
          projectName,
          projectType,
          budgetRange,
          timeline,
          description: projectDescription,
          date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
          status: "Nueva Solicitud",
        };
        localStorage.setItem("innocentia_incoming_leads", JSON.stringify([newLeadItem, ...stored]));
        window.dispatchEvent(new Event("innocentia_lead_created"));
      }
    } catch (e) {
      console.error(e);
    }

    if (onProjectCreated) {
      onProjectCreated({
        folio,
        clientId: registeredClientId,
        projectName,
        clientName,
        clientCompany,
        clientPhone,
        clientEmail,
        vendorCode,
        vendorName,
        projectType,
        budgetRange,
        date: new Date().toLocaleDateString("es-MX"),
      });
    }

    // Open WhatsApp pre-filled message
    const encoded = encodeURIComponent(projectSummary);
    window.open(`https://wa.me/529601771556?text=${encoded}`, "_blank");
  };

  return (
    <div className="w-full space-y-6 text-left animate-in fade-in duration-300">
      {/* VENDOR REFERRAL / ATRIBUCIÓN COMERCIAL BANNER */}
      <div className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-r from-[#00D1FF]/15 via-[#0c0d18]/90 to-purple-950/20 border border-[#00D1FF]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center text-lg flex-shrink-0">
            💼
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                {isEmbeddedInPortal ? "Asesor Comercial Asignado:" : "Atención & Asignación:"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] font-mono font-bold border border-[#00D1FF]/30">
                {vendorCode || "INNOCENTIA DIRECTO"}
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono">
              <strong>{vendorName || "Dirección General & Equipo de Arquitectura"}</strong>
              {isEmbeddedInPortal
                ? " • Atribución comercial y comisiones vinculadas conforme a contrato."
                : " • Tu proyecto será atendido directamente por nuestro equipo directivo y técnico."}
            </p>
          </div>
        </div>

        {/* Shareable Link Generator (Only for internal vendor portal view) */}
        {isEmbeddedInPortal && (
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={copyReferralLink}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00D1FF] text-xs font-mono text-gray-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">¡Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Copiar Link para Cliente</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* CLIENT ALREADY REGISTERED SUMMARY (Visible from Step 2 onwards) */}
      {isClientRegistered && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Cliente Registrado:</span>
              <strong className="text-white text-sm">
                {clientName} ({clientCompany})
              </strong>
              <span className="text-emerald-400 ml-2 font-bold">[{registeredClientId}]</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-[11px] text-[#00D1FF] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Editar datos del cliente ✎
          </button>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL / SCREEN (DIDÁCTICA & ORIENTADA AL CLIENTE) */}
      {isCompleted ? (
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#00D1FF]/10 via-[#07070E] to-[#FF3858]/10 border-2 border-[#00D1FF]/40 space-y-8 text-center shadow-[0_0_80px_rgba(0,209,255,0.15)] animate-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#00D1FF]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Badge Icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-[#00D1FF]/30 to-[#FF3858]/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.4)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase border border-emerald-500/40">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Solicitud Recibida • En Evaluación Técnica</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
              ¡Tu Proyecto Está en Marcha!
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-xl bg-white/10 border border-white/20 text-[#00D1FF] font-mono font-bold text-sm sm:text-base">
              Folio Oficial: {createdProjectFolio}
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
              Hola <strong>{clientName}</strong>, hemos recibido con éxito las especificaciones técnicas para{" "}
              <strong>"{projectName || "Tu Aplicación"}"</strong> de <strong>{clientCompany}</strong>.
            </p>
          </div>

          {/* Ficha Resumen */}
          <div className="p-5 rounded-2xl bg-black/80 border border-white/15 max-w-lg mx-auto text-left text-xs font-mono space-y-2.5 shadow-xl">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Cliente & Empresa:</span>
              <strong className="text-white">{clientName} ({clientCompany})</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Teléfono Registrado:</span>
              <strong className="text-white">{clientPhone}</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Canal de Asignación:</span>
              <strong className="text-[#00D1FF]">{vendorName || "Dirección General Innocentia"}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estado de la Solicitud:</span>
              <strong className="text-amber-400 font-bold">⏳ Análisis de Arquitectura en Curso</strong>
            </div>
          </div>

          {/* Proceso Didáctico de Próximos Pasos */}
          <div className="max-w-2xl mx-auto space-y-3 text-left">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider text-center">
              ¿Qué ocurre a continuación?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                  1
                </div>
                <h5 className="text-xs font-bold text-white font-mono">Triaje Técnico</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Iván y el equipo de ingeniería evalúan la arquitectura y módulos óptimos para tu app.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/30 space-y-1.5 shadow-[0_0_15px_rgba(0,209,255,0.1)]">
                <div className="w-6 h-6 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] font-bold text-xs flex items-center justify-center font-mono">
                  2
                </div>
                <h5 className="text-xs font-bold text-[#00D1FF] font-mono">Propuesta & Demo</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Preparamos la propuesta formal y seleccionamos la demo interactiva multiplataforma.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center font-mono">
                  3
                </div>
                <h5 className="text-xs font-bold text-white font-mono">Contacto Directo</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Te contactaremos por WhatsApp o llamada para afinar dudas y mostrarte la demo en vivo.
                </p>
              </div>
            </div>
          </div>

          {/* Módulo de Chat Directo y Contacto Inmediato */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-black to-[#00D1FF]/10 border border-emerald-500/40 max-w-xl mx-auto space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono font-bold text-xs">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>¿Tienes alguna duda urgente o requerimiento especial?</span>
            </div>
            <p className="text-[11px] text-gray-300 font-mono">
              Puedes hablar directamente con un especialista de Innocentia Tech vía WhatsApp indicando tu Folio <strong>{createdProjectFolio}</strong>.
            </p>
            <a
              href={`https://wa.me/529601771556?text=${encodeURIComponent(`Hola Innocentia Tech, acabo de enviar mi cotización con Folio ${createdProjectFolio} para mi empresa ${clientCompany}. Me gustaría consultar una duda sobre mi proyecto.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer hover:scale-105"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>Consultar Dudas por WhatsApp (+52 960 177 1556)</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-all shadow-md"
            >
              ← Volver al Sitio Principal (innocentia.tech)
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsCompleted(false);
                setIsClientRegistered(false);
                setStep(1);
                setProjectName("");
                setClientName("");
                setClientCompany("");
                setClientPhone("");
                setClientEmail("");
                setProjectDescription("");
              }}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              ＋ Cotizar Otro Proyecto
            </button>
          </div>
        </div>
      ) : (
        /* WIZARD FORM */
        <div className="rounded-[32px] bg-black/80 border border-white/20 p-6 sm:p-9 backdrop-blur-2xl space-y-6 shadow-2xl">
          {/* Step Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">
                Paso <strong className="text-[#00D1FF]">{step}</strong> de 5
              </span>
              <span className="text-gray-300 font-bold uppercase">
                {step === 1 && "1. REGISTRO DEL CLIENTE & VINCULACIÓN AL ASESOR (OBLIGATORIO)"}
                {step === 2 && "2. Tipo de Solución Tecnológica"}
                {step === 3 && "3. Experiencia & Diseño UI/UX (Sofía)"}
                {step === 4 && "4. Arquitectura & Capacidades (Iván)"}
                {step === 5 && "5. Alcance, Presupuesto & Generación de Ficha"}
              </span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF3858] via-purple-500 to-[#00D1FF] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* ======================================================== */}
            {/* PASO 1: REGISTRO DEL CLIENTE & VINCULACIÓN COMERCIAL (OBLIGATORIO PRIMERO) */}
            {/* ======================================================== */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FASE INICIAL: REGISTRO OBLIGATORIO DE CLIENTE &amp; ATRIBUCIÓN</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                    Registrar Cliente &amp; Asignar Asesor Comercial
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Conforme a las Cláusulas 4 y 5 del Contrato Comercial, el registro previo en CRM protege la titularidad del <strong>4% por 24 meses continuos</strong> antes de configurar el proyecto.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Nombre Completo del Cliente / Contacto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Alejandro Morales"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Empresa / Razón Social o Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Gourmet Express S.A. de C.V."
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">WhatsApp / Teléfono Móvil *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +52 999 555 1234"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ej. alejandro@gourmetexpress.mx"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-gray-300 block font-bold">Ciudad / Estado / País</label>
                    <input
                      type="text"
                      placeholder="Ej. Mérida, Yucatán, México"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>
                </div>

                {/* VINCULACIÓN OFICIAL DEL VENDEDOR */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-black to-[#00D1FF]/15 border border-[#00D1FF]/40 space-y-3.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#00D1FF]" />
                      Atribución Comercial &amp; Vendedor Vinculado
                    </span>
                    {isLockedByReferral ? (
                      <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-bold flex items-center gap-1 self-start sm:self-auto">
                        <span>🔒 Vinculado por Enlace de Asesor (Bloqueado)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 self-start sm:self-auto">
                        Principio de 1er Registro (24 Meses)
                      </span>
                    )}
                  </div>

                  {/* If not locked by referral link, allow choosing from registered advisors, direct, or leaving in blank */}
                  {!isLockedByReferral && (
                    <div className="space-y-1.5">
                      <label className="text-gray-300 block text-[11px] font-bold">
                        ¿Cómo te contactaste con Innocentia Tech? (Seleccionar Asesor o Dejar en Blanco)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setVendorSelectMode("unassigned");
                            setVendorCode("SIN-ASESOR");
                            setVendorName("Sin Asesor (Por Canalizar por Dirección General)");
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            vendorSelectMode === "unassigned"
                              ? "bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                              : "bg-black/60 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold block text-white">Dejar en Blanco</span>
                          <span className="text-[9px] font-mono text-amber-300 block">Canalizar por Dirección</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setVendorSelectMode("carlos");
                            setVendorCode("VEN-CARLOS-202");
                            setVendorName("Carlos Mendoza");
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            vendorSelectMode === "carlos"
                              ? "bg-[#00D1FF]/20 border-[#00D1FF] text-white shadow-[0_0_15px_rgba(0,209,255,0.2)]"
                              : "bg-black/60 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold block text-white">Carlos Mendoza</span>
                          <span className="text-[9px] font-mono text-[#00D1FF] block">Asesor Comercial Senior</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setVendorSelectMode("direct");
                            setVendorCode("INN-DIRECT-01");
                            setVendorName("Innocentia Tech Core (Dirección General)");
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            vendorSelectMode === "direct"
                              ? "bg-purple-600/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                              : "bg-black/60 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold block text-white">Directo Innocentia</span>
                          <span className="text-[9px] font-mono text-purple-300 block">Dirección General</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setVendorSelectMode("custom");
                            setVendorCode("");
                            setVendorName("");
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            vendorSelectMode === "custom"
                              ? "bg-white/10 border-white/40 text-white"
                              : "bg-black/60 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold block text-white">Otro Asesor / Código</span>
                          <span className="text-[9px] font-mono text-gray-400 block">Ingresar manualmente</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Attribution Inputs (Read-only if locked by referral link or in preset mode) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-gray-400 block text-[10px] uppercase flex items-center justify-between">
                        <span>Código de Vendedor / Asesor</span>
                        {isLockedByReferral && <span className="text-amber-400">🔒 Fijo</span>}
                      </label>
                      <input
                        type="text"
                        readOnly={isLockedByReferral || vendorSelectMode !== "custom"}
                        value={vendorCode}
                        onChange={(e) => setVendorCode(e.target.value)}
                        placeholder="Sin Asesor (Opcional)"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black border font-bold focus:outline-none transition-all ${
                          isLockedByReferral || vendorSelectMode !== "custom"
                            ? "border-[#00D1FF]/40 text-[#00D1FF] opacity-90 cursor-not-allowed bg-black/80"
                            : "border-white/20 text-[#00D1FF] focus:border-[#00D1FF]"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block text-[10px] uppercase flex items-center justify-between">
                        <span>Nombre del Asesor Comercial</span>
                        {isLockedByReferral && <span className="text-amber-400">🔒 Fijo</span>}
                      </label>
                      <input
                        type="text"
                        readOnly={isLockedByReferral || vendorSelectMode !== "custom"}
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="Sin Asesor (Opcional)"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black border font-bold focus:outline-none transition-all ${
                          isLockedByReferral || vendorSelectMode !== "custom"
                            ? "border-white/20 text-white opacity-90 cursor-not-allowed bg-black/80"
                            : "border-white/20 text-white focus:border-purple-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleRegisterClient}
                    disabled={!isStep1Valid}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 via-[#00D1FF] to-[#3A86FF] hover:from-emerald-300 hover:to-[#00D1FF] disabled:opacity-40 disabled:pointer-events-none text-black font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] cursor-pointer transition-all hover:scale-105"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Registrar Cliente &amp; Continuar al Creador de Proyecto →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO 2: TIPO DE SOLUCIÓN */}
            {/* ======================================================== */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                    ¿Qué tipo de producto digital vamos a construir para {clientCompany || clientName}?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Selecciona la categoría principal para configurar el stack y el equipo de desarrollo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projectTypes.map((t) => {
                    const Icon = t.icon;
                    const isSelected = projectType === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setProjectType(t.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? "bg-white/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.25)] scale-[1.01]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: `${t.color}25`, border: `1px solid ${t.color}` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: t.color }} />
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-[#00D1FF]" />}
                        </div>
                        <h4 className="text-sm font-bold text-white font-mono">{t.title}</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO 3: DISEÑO UI/UX (SOFÍA) */}
            {/* ======================================================== */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF3858]/20 border border-[#FF3858] flex items-center justify-center text-xs">
                    🔴
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                      Requerimientos de Diseño &amp; Experiencia (Sofía)
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Selecciona los entregables visuales y de interacción que requiere este proyecto.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {designOptions.map((opt) => {
                    const isChecked = designNeeds.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleDesign(opt.label)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                          isChecked
                            ? "bg-[#FF3858]/10 border-[#FF3858]/60 shadow-[0_0_15px_rgba(255,56,88,0.2)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-white font-mono">
                            {opt.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 accent-[#FF3858] cursor-pointer"
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono">{opt.hint}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO 4: ARQUITECTURA & TECNOLOGÍA (IVÁN) */}
            {/* ======================================================== */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-9 h-9 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF] flex items-center justify-center text-xs">
                    🔵
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                      Capacidades Técnicas &amp; Backend (Iván)
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Define los módulos, bases de datos y APIs requeridas para la cotización.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techOptions.map((opt) => {
                    const isChecked = techFeatures.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleTech(opt.label)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                          isChecked
                            ? "bg-[#00D1FF]/10 border-[#00D1FF]/60 shadow-[0_0_15px_rgba(0,209,255,0.2)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-white font-mono">
                            {opt.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 accent-[#00D1FF] cursor-pointer"
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono">{opt.hint}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO 5: ALCANCE, PRESUPUESTO & GENERACIÓN */}
            {/* ======================================================== */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                    Alcance, Descripción &amp; Tiempos de Entrega
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Describe la idea del proyecto para {clientCompany} y selecciona el rango de inversión estimado.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1 text-xs font-mono">
                    <label className="text-gray-300 block font-bold">
                      Nombre del Proyecto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. App de Delivery & Reservas para Restaurantes"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <label className="text-gray-300 block font-bold">
                      Descripción del Problema o Funcionalidad Deseada *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explica qué problema resuelve la aplicación, quiénes son los usuarios y qué flujo principal debe tener..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* Rango Presupuestal */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 block font-bold">
                      Rango de Inversión Estimado:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {budgetOptions.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => setBudgetRange(b.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs font-mono space-y-1 ${
                            budgetRange === b.id
                              ? "bg-purple-950/40 border-purple-400 text-white shadow-md"
                              : "bg-white/[0.02] border-white/10 text-gray-400"
                          }`}
                        >
                          <strong className="text-white block">{b.title}</strong>
                          <span className="text-[#00D1FF] text-[10px] block">{b.usd}</span>
                          <p className="text-[10px] text-gray-400">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 block font-bold">
                      Plazo Deseado de Entrega:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {timelineOptions.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setTimeline(t.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs font-mono space-y-1 ${
                            timeline === t.id
                              ? "bg-emerald-950/40 border-emerald-400 text-white shadow-md"
                              : "bg-white/[0.02] border-white/10 text-gray-400"
                          }`}
                        >
                          <strong className="text-white block">{t.title}</strong>
                          <p className="text-[10px] text-gray-400">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons (Steps 2 to 5) */}
            {step > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-all cursor-pointer"
                >
                  ← Anterior
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 2 && !isStep2Valid) ||
                      (step === 3 && !isStep3Valid) ||
                      (step === 4 && !isStep4Valid)
                    }
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-purple-600 hover:from-[#00E5FF] hover:to-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105"
                  >
                    <span>Siguiente Paso</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitProject}
                    disabled={!isStep5Valid}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 via-[#00D1FF] to-[#FF3858] hover:from-emerald-300 hover:to-[#FF4D6D] disabled:opacity-40 disabled:pointer-events-none text-black font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.4)] cursor-pointer transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Crear Proyecto &amp; Enviar Ficha por WhatsApp</span>
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
