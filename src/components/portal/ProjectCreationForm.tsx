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
  FileText,
} from "../../lib/icons";
import { generateProjectPdf } from "../../lib/generateProjectPdf";

interface ProjectCreationFormProps {
  initialVendorCode?: string;
  initialVendorName?: string;
  isEmbeddedInPortal?: boolean;
  onProjectCreated?: (projectData: any) => void;
}

export type StepKey = "contact" | "solution_type" | "services" | "branding" | "tech" | "scope_budget";

export default function ProjectCreationForm({
  initialVendorCode = "",
  initialVendorName = "",
  isEmbeddedInPortal = false,
  onProjectCreated,
}: ProjectCreationFormProps) {
  // Navigation & Completion State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [registeredClientId, setRegisteredClientId] = useState("");
  const [createdProjectFolio, setCreatedProjectFolio] = useState("");

  // Step 1: Datos de Empresa y Contacto
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientWebsite, setClientWebsite] = useState("");
  const [clientIndustry, setClientIndustry] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCity, setClientCity] = useState("");

  // Step 1 State - Vendor Attribution (Silent in background)
  const [vendorCode, setVendorCode] = useState(initialVendorCode || "SIN-ASESOR");
  const [vendorName, setVendorName] = useState(initialVendorName || "Sin Asesor Asignado");
  const [isLockedByReferral, setIsLockedByReferral] = useState(false);
  const [isClientRegistered, setIsClientRegistered] = useState(false);

  // Step 2: Tipo de Solución Tecnológica (Multi-selección)
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(["web_platform"]);

  // Step 3: Pilares / Servicios Requeridos (Condicionan los siguientes pasos)
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "brand_marketing",
    "software_dev",
  ]);

  // Step 4 (Condicional): Marca & Marketing
  const [brandNeeds, setBrandNeeds] = useState<string[]>([
    "🎨 Diseño de Logotipo Profesional",
    "✨ Diseño de Identidad Visual Completa",
  ]);

  // Step 5 (Condicional): Funcionalidades Técnicas & App
  const [techFeatures, setTechFeatures] = useState<string[]>([
    "🔐 Cuentas de Usuario y Base de Datos Segura",
    "💳 Cobros y Pagos con Tarjeta en Línea",
    "📲 Notificaciones y Mensajes Automáticos por WhatsApp",
  ]);

  // Step Final: Alcance, Presupuesto & Tiempos
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [budgetRange, setBudgetRange] = useState("150k_350k");

  // Read URL query params if client arrives via referral link
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.location && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref") || urlParams.get("vendedor_id");
        const vend = urlParams.get("vendedor") || urlParams.get("asesor");
        if (ref || vend) {
          setIsLockedByReferral(true);
          if (ref) setVendorCode(ref);
          if (vend) setVendorName(decodeURIComponent(vend));
        }
      }
    } catch (err) {
      // Safe SSR fallback
    }
  }, []);

  // Catálogo: Tipo de Solución Digital
  const projectTypes = [
    {
      id: "mobile_app",
      title: "App Móvil (iPhone & Android)",
      desc: "Aplicación instalable para celulares y tabletas, lista para publicarse en la App Store (Apple) y Google Play Store.",
      icon: Smartphone,
      color: "#FF3858",
    },
    {
      id: "web_platform",
      title: "Plataforma Web / Sistema en la Nube",
      desc: "Sistema accesible desde cualquier navegador: portal para tus clientes, panel de administración interno, ventas en línea y automatización.",
      icon: Globe,
      color: "#00D1FF",
    },
    {
      id: "ai_system",
      title: "Inteligencia Artificial & Automatización",
      desc: "Asistentes inteligentes tipo ChatGPT personalizados para tu empresa, atención automática de clientes 24/7 y análisis inteligente de datos.",
      icon: BrainCircuit,
      color: "#8A2BE2",
    },
    {
      id: "enterprise_erp",
      title: "Sistema de Gestión Empresarial (CRM / ERP)",
      desc: "Control total de tu negocio: administración de clientes y prospectos, control de ventas e inventarios, logística y facturación electrónica.",
      icon: Building2,
      color: "#FF8800",
    },
    {
      id: "full_ecosystem",
      title: "Ecosistema Digital Integral (Web + App + Panel)",
      desc: "Solución completa todo-en-uno conectada en computadoras y dispositivos móviles para una experiencia unificada de tu marca.",
      icon: Sparkles,
      color: "#10B981",
    },
  ];

  // Catálogo: Servicios / Pilares
  const serviceOptions = [
    {
      id: "brand_marketing",
      title: "🎨 Diseño de Marca, Identidad & Campaña de Marketing",
      desc: "Diseño o rediseño de logotipo, manual de identidad visual corporativa, estudio de mercado y campañas de posicionamiento.",
      badge: "Branding & Estrategia",
      color: "#FF3858",
    },
    {
      id: "software_dev",
      title: "⚡ Desarrollo de Software, App o Plataforma Digital",
      desc: "Programación y arquitectura de la aplicación, módulos para usuarios, base de datos en la nube y panel administrativo.",
      badge: "Ingeniería & Tecnología",
      color: "#00D1FF",
    },
  ];

  // Catálogo: Marca & Marketing
  const brandingOptions = [
    {
      id: "logo_design",
      label: "🎨 Diseño de Logotipo Profesional",
      hint: "Creación de logotipo vectorial de alta calidad, versiones en positivo/negativo y archivos listos para web e impresos.",
    },
    {
      id: "identity_design",
      label: "✨ Diseño de Identidad Visual Completa",
      hint: "Manual de marca con paleta de colores corporativos, tipografías oficiales, iconografía y guía de uso visual.",
    },
    {
      id: "brand_projection",
      label: "🚀 Proyección y Posicionamiento de Marca",
      hint: "Estrategia de propuesta de valor, tono de comunicación y definición de identidad para destacar frente a la competencia.",
    },
    {
      id: "market_research",
      label: "📊 Estudio de Mercado y Análisis de Competencia",
      hint: "Investigación del sector, análisis de competidores clave y detección de oportunidades estratégicas de mercado.",
    },
    {
      id: "audience_segmentation",
      label: "🎯 Segmentación Especializada & Campaña de Marketing Digital",
      hint: "Definición del cliente ideal (Buyer Persona), diseño de embudos de conversión y estrategia de pauta publicitaria.",
    },
  ];

  // Catálogo: Funcionalidades Técnicas & App
  const techOptions = [
    {
      id: "auth_db",
      label: "🔐 Cuentas de Usuario y Base de Datos Segura",
      hint: "Registro e inicio de sesión seguro (con Google, Apple o correo) y almacenamiento protegido de la información de tu empresa y clientes.",
    },
    {
      id: "payments",
      label: "💳 Cobros y Pagos con Tarjeta en Línea",
      hint: "Recepción de pagos con tarjeta de débito/crédito, transferencias bancarias, suscripciones mensuales o cobros automáticos.",
    },
    {
      id: "realtime_gps",
      label: "📍 Ubicación y Rastreo en Tiempo Real (GPS / Mapas)",
      hint: "Mapas interactivos en vivo para seguimiento de entregas a domicilio, ubicación de vehículos, pedidos o choferes al instante.",
    },
    {
      id: "whatsapp_api",
      label: "📲 Notificaciones y Mensajes Automáticos por WhatsApp",
      hint: "Envío automático de confirmaciones de compra, recordatorios de citas, avisos y cotizaciones directo al WhatsApp de tus clientes.",
    },
    {
      id: "admin_dashboard",
      label: "📊 Panel de Control y Reportes para el Administrador",
      hint: "Panel privado para dueños y gerentes con estadísticas de ventas en tiempo real, control de usuarios y descarga de reportes en Excel o PDF.",
    },
    {
      id: "custom_ai_bot",
      label: "🤖 Bot Personalizado / Asistente de IA para Clientes",
      hint: "Chatbot inteligente entrenado con la información de tu negocio para responder dudas frecuentes y dar atención 24/7.",
    },
    {
      id: "multichannel_social",
      label: "🌐 Conexión a Múltiples Redes Sociales y Canales",
      hint: "Integración multicanal con Instagram, Facebook, TikTok, WhatsApp y correo para centralizar mensajes y prospectos.",
    },
    {
      id: "calendar_sync",
      label: "📅 Calendarios y Agendamiento con Sincronización de APIs",
      hint: "Sistema de citas, reservaciones y agendas con sincronización en tiempo real a Google Calendar, Outlook y APIs externas.",
    },
  ];

  // Catálogo: Rango de Presupuesto
  const budgetOptions = [
    {
      id: "50k_150k",
      title: "$50,000 - $150,000 MXN",
      usd: "~$2,800 - $8,500 USD",
      desc: "Ideal para una primera versión funcional (MVP), prototipo comercial o proyecto inicial.",
    },
    {
      id: "150k_350k",
      title: "$150,000 - $350,000 MXN",
      usd: "~$8,500 - $19,500 USD",
      desc: "Solución completa con diseño profesional a la medida, conexiones de sistemas y base de datos robusta.",
    },
    {
      id: "350k_plus",
      title: "$350,000+ MXN",
      usd: "~$19,500+ USD",
      desc: "Proyecto corporativo de gran escala para alto volumen de usuarios, múltiples módulos o IA avanzada.",
    },
  ];

  // Cálculo de Tiempo de Entrega Estimado según tipos de proyecto y servicios seleccionados
  const getEstimatedTimelineText = () => {
    if (selectedProjectTypes.includes("full_ecosystem") || selectedProjectTypes.length >= 3) {
      return "6 a 12 semanas (Desarrollo Multi-Plataforma con entregas por sprint)";
    }
    if (selectedProjectTypes.includes("mobile_app")) {
      return "4 a 8 semanas (App Móvil iOS/Android + Backend Cloud)";
    }
    if (selectedProjectTypes.includes("enterprise_erp") || selectedProjectTypes.includes("ai_system")) {
      return "4 a 8 semanas (Plataforma con Automatización / ERP)";
    }
    return "3 a 6 semanas (MVP & Plataforma Web Ágil)";
  };

  const estimatedTimeline = getEstimatedTimelineText();

  // Sugerencias de Giro
  const industrySuggestions = [
    "Comercio / E-commerce",
    "Restaurantes & Alimentos",
    "Inmobiliaria & Bienes Raíces",
    "Salud, Clínicas & Belleza",
    "Servicios Profesionales",
    "Logística & Transporte",
    "Educación & Cursos",
    "Tecnología & Startups",
  ];

  // Flujo de Pasos Dinámico
  const getActiveSteps = (): { key: StepKey; title: string; subtitle: string }[] => {
    const steps: { key: StepKey; title: string; subtitle: string }[] = [
      {
        key: "contact",
        title: "1. Datos de la Empresa y Contacto",
        subtitle: "Información de tu negocio para preparar la propuesta",
      },
      {
        key: "solution_type",
        title: "2. Tipo de Solución Digital",
        subtitle: "Selecciona una o más categorías de producto",
      },
      {
        key: "services",
        title: "3. Servicios & Pilares Requeridos",
        subtitle: "Elige si deseas diseño de marca, app o marketing",
      },
    ];

    let stepNumber = 4;

    if (selectedServices.includes("brand_marketing")) {
      steps.push({
        key: "branding",
        title: `${stepNumber}. Diseño de Marca & Estrategia de Marketing`,
        subtitle: "Selecciona los entregables de identidad y posicionamiento",
      });
      stepNumber++;
    }

    if (selectedServices.includes("software_dev")) {
      steps.push({
        key: "tech",
        title: `${stepNumber}. Funcionalidades y Módulos Técnicos`,
        subtitle: "Selecciona las funciones y conexiones para tu aplicación",
      });
      stepNumber++;
    }

    steps.push({
      key: "scope_budget",
      title: `${stepNumber}. Alcance, Presupuesto y Tiempos`,
      subtitle: "Detalles del proyecto y rango de inversión estimado",
    });

    return steps;
  };

  const activeSteps = getActiveSteps();
  const safeStepIndex = Math.min(currentStepIndex, activeSteps.length - 1);
  const currentStep = activeSteps[safeStepIndex] || activeSteps[0];

  // Toggle Handlers
  const toggleProjectType = (val: string) => {
    setSelectedProjectTypes((prev) => {
      if (prev.includes(val)) {
        if (prev.length === 1) return prev; // Mantener al menos una opción seleccionada
        return prev.filter((item) => item !== val);
      }
      return [...prev, val];
    });
  };

  const toggleService = (val: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(val)) {
        if (prev.length === 1) return prev; // Mantener al menos uno
        return prev.filter((item) => item !== val);
      }
      return [...prev, val];
    });
  };

  const toggleBrandNeed = (val: string) => {
    setBrandNeeds((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleTechFeature = (val: string) => {
    setTechFeatures((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  // Validaciones
  const isStepContactValid =
    clientName.trim().length >= 3 &&
    clientCompany.trim().length >= 2 &&
    clientPhone.trim().length >= 8 &&
    clientEmail.trim().length >= 5 &&
    clientIndustry.trim().length >= 2;

  const isStepSolutionValid = selectedProjectTypes.length > 0;
  const isStepServicesValid = selectedServices.length > 0;
  const isStepBrandingValid = !selectedServices.includes("brand_marketing") || brandNeeds.length > 0;
  const isStepTechValid = !selectedServices.includes("software_dev") || techFeatures.length > 0;
  const isStepFinalValid = projectName.trim().length >= 3 && projectDescription.trim().length >= 10;

  const isCurrentStepValid = () => {
    if (currentStep.key === "contact") return isStepContactValid;
    if (currentStep.key === "solution_type") return isStepSolutionValid;
    if (currentStep.key === "services") return isStepServicesValid;
    if (currentStep.key === "branding") return isStepBrandingValid;
    if (currentStep.key === "tech") return isStepTechValid;
    if (currentStep.key === "scope_budget") return isStepFinalValid;
    return true;
  };

  const handleNextStep = () => {
    if (!isCurrentStepValid()) return;

    if (currentStep.key === "contact" && !isClientRegistered) {
      const cliId = "CLI-" + Math.floor(10000 + Math.random() * 90000);
      setRegisteredClientId(cliId);
      setIsClientRegistered(true);
    }

    if (safeStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex(safeStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (safeStepIndex > 0) {
      setCurrentStepIndex(safeStepIndex - 1);
    }
  };

  const selectedProjectTitles = selectedProjectTypes
    .map((id) => projectTypes.find((p) => p.id === id)?.title)
    .filter(Boolean)
    .join(" + ");

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepFinalValid) return;

    const folio = "PROJ-" + Math.floor(100000 + Math.random() * 900000);
    setCreatedProjectFolio(folio);
    setIsCompleted(true);

    const brandSection =
      selectedServices.includes("brand_marketing") && brandNeeds.length > 0
        ? `\n🎨 *REQUERIMIENTOS DE MARCA & MARKETING:*\n${brandNeeds.map((b) => `  ✓ ${b}`).join("\n")}`
        : "";

    const techSection =
      selectedServices.includes("software_dev") && techFeatures.length > 0
        ? `\n⚡ *FUNCIONALIDADES Y MÓDULOS TÉCNICOS:*\n${techFeatures.map((t) => `  ✓ ${t}`).join("\n")}`
        : "";

    const projectSummary = `
🚀 *FICHA DE PROYECTO & COTIZACIÓN • INNOCENTIA TECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 *Folio de Proyecto:* ${folio}
🆔 *ID de Registro:* ${registeredClientId || "CLI-2026-8941"}
📅 *Fecha:* ${new Date().toLocaleDateString("es-MX", { dateStyle: "long" })}

👤 *DATOS DE LA EMPRESA & CONTACTO:*
• *Contacto:* ${clientName}
• *Empresa:* ${clientCompany}
• *Giro / Industria:* ${clientIndustry}
• *Página Web / Redes:* ${clientWebsite || "No especificada"}
• *WhatsApp / Tel:* ${clientPhone}
• *Correo:* ${clientEmail}
• *Ciudad:* ${clientCity || "No especificada"}

📌 *DETALLES DEL PROYECTO:*
• *Nombre del Proyecto:* ${projectName}
• *Tipo de Solución:* ${selectedProjectTitles || "Solución Digital Innocentia"}
• *Pilares Solicitados:* ${selectedServices.map((s) => (s === "brand_marketing" ? "Diseño de Marca & Marketing" : "Desarrollo de Software / App")).join(" + ")}
• *Rango de Inversión:* ${budgetOptions.find((b) => b.id === budgetRange)?.title} (${budgetOptions.find((b) => b.id === budgetRange)?.usd})
• *Tiempo Estimado de Entrega:* ${estimatedTimeline}
${brandSection}
${techSection}

📝 *DESCRIPCIÓN DE LA IDEA O NECESIDAD:*
"${projectDescription}"
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 *Solicitud registrada exitosamente en Innocentia Tech.*
    `.trim();

    // Store lead for internal portal
    try {
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("innocentia_incoming_leads") || "[]");
        const newLeadItem = {
          id: folio,
          clientName,
          clientCompany,
          clientWebsite,
          clientIndustry,
          clientPhone,
          clientEmail,
          vendorCode: vendorCode || "SIN-ASESOR",
          vendorName: vendorName || "Sin Asesor",
          projectName,
          projectType: selectedProjectTypes.join(", "),
          selectedServices,
          brandNeeds,
          techFeatures,
          budgetRange,
          timeline: estimatedTimeline,
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

    // Backend API Sync
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          company: clientCompany,
          website: clientWebsite,
          industry: clientIndustry,
          phone: clientPhone,
          email: clientEmail,
          city: clientCity,
          projectType: selectedProjectTypes,
          selectedServices,
          designNeeds: brandNeeds,
          techFeatures,
          estimatedBudget: budgetOptions.find((b) => b.id === budgetRange)?.title,
          totalQuote: 172500,
          vendorCode: vendorCode || "SIN-ASESOR",
          vendorName: vendorName || "Sin Asesor",
          quoteDetails: {
            projectName,
            description: projectDescription,
            timeline: estimatedTimeline,
          },
        }),
      }).catch((err) => console.log("Leads API sync:", err));
    } catch (err) {
      console.log("Async dispatch:", err);
    }

    if (onProjectCreated) {
      onProjectCreated({
        folio,
        clientId: registeredClientId,
        projectName,
        clientName,
        clientCompany,
        clientWebsite,
        clientIndustry,
        clientPhone,
        clientEmail,
        vendorCode,
        vendorName,
        projectType: selectedProjectTypes,
        selectedServices,
        budgetRange,
        timeline: estimatedTimeline,
        date: new Date().toLocaleDateString("es-MX"),
      });
    }

    // Open WhatsApp pre-filled message
    const encoded = encodeURIComponent(projectSummary);
    window.open(`https://wa.me/529601771556?text=${encoded}`, "_blank");
  };

  return (
    <div className="w-full space-y-6 text-left animate-in fade-in duration-300">
      {/* CLIENT ALREADY REGISTERED SUMMARY (Visible desde el Paso 2 en adelante) */}
      {isClientRegistered && safeStepIndex > 0 && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Empresa Registrada:</span>
              <strong className="text-white text-sm">
                {clientCompany} — {clientName}
              </strong>
              {clientIndustry && <span className="text-gray-400 ml-2">({clientIndustry})</span>}
              <span className="text-emerald-400 ml-2 font-bold">[{registeredClientId}]</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStepIndex(0)}
            className="text-[11px] text-[#00D1FF] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Editar datos de empresa ✎
          </button>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL / SCREEN */}
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
              Hola <strong>{clientName}</strong>, hemos recibido con éxito las especificaciones para{" "}
              <strong>"{projectName || "Tu Proyecto"}"</strong> de <strong>{clientCompany}</strong> ({clientIndustry}).
            </p>
          </div>

          {/* Ficha Resumen */}
          <div className="p-5 rounded-2xl bg-black/80 border border-white/15 max-w-lg mx-auto text-left text-xs font-mono space-y-2.5 shadow-xl">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Empresa / Negocio:</span>
              <strong className="text-white">{clientCompany} ({clientIndustry})</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Contacto Directo:</span>
              <strong className="text-white">{clientName} • {clientPhone}</strong>
            </div>
            {clientWebsite && (
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Página Web / Redes:</span>
                <strong className="text-[#00D1FF]">{clientWebsite}</strong>
              </div>
            )}
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Solución Digital:</span>
              <strong className="text-[#00D1FF]">{selectedProjectTitles}</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Servicios Elegidos:</span>
              <strong className="text-emerald-400">
                {selectedServices.map((s) => (s === "brand_marketing" ? "Marca & Marketing" : "Software / App")).join(" + ")}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estado de la Solicitud:</span>
              <strong className="text-amber-400 font-bold">⏳ Análisis de Requerimientos en Curso</strong>
            </div>
          </div>

          {/* Próximos Pasos */}
          <div className="max-w-2xl mx-auto space-y-3 text-left">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider text-center">
              ¿Qué ocurre a continuación?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                  1
                </div>
                <h5 className="text-xs font-bold text-white font-mono">Evaluación Técnica</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Revisamos a detalle las funciones, pantallas y alcance solicitados para tu proyecto.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/30 space-y-1.5 shadow-[0_0_15px_rgba(0,209,255,0.1)]">
                <div className="w-6 h-6 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] font-bold text-xs flex items-center justify-center font-mono">
                  2
                </div>
                <h5 className="text-xs font-bold text-[#00D1FF] font-mono">Propuesta & Demo</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Preparamos la cotización formal con el plan de trabajo y una demo interactiva.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center font-mono">
                  3
                </div>
                <h5 className="text-xs font-bold text-white font-mono">Contacto Directo</h5>
                <p className="text-[11px] text-gray-400 font-mono leading-tight">
                  Te contactamos por WhatsApp o llamada para resolver dudas y coordinar los primeros pasos.
                </p>
              </div>
            </div>
          </div>

          {/* Contacto Directo */}
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

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() =>
                generateProjectPdf({
                  folio: createdProjectFolio,
                  projectName: projectName || "Proyecto Digital & Estrategia",
                  clientName,
                  clientCompany: `${clientCompany} (${clientIndustry})`,
                  clientPhone,
                  clientEmail,
                  vendorName: vendorName || "Dirección General Innocentia",
                  vendorCode: vendorCode || "INN-DIRECT-01",
                  projectType: selectedProjectTypes,
                  designNeeds: brandNeeds,
                  techFeatures: techFeatures,
                  budgetRange: budgetOptions.find((b) => b.id === budgetRange)?.title,
                  timeline: estimatedTimeline,
                  description: projectDescription,
                })
              }
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00D1FF] to-purple-600 hover:from-[#00E5FF] hover:to-purple-500 text-white text-xs font-mono font-bold uppercase transition-all shadow-[0_0_25px_rgba(0,209,255,0.35)] flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>📄 Descargar Ficha Oficial en PDF</span>
            </button>

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
                setCurrentStepIndex(0);
                setProjectName("");
                setClientName("");
                setClientCompany("");
                setClientWebsite("");
                setClientIndustry("");
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
        /* WIZARD FORM DINÁMICO */
        <div className="rounded-[32px] bg-black/80 border border-white/20 p-6 sm:p-9 backdrop-blur-2xl space-y-6 shadow-2xl">
          {/* Step Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">
                Paso <strong className="text-[#00D1FF]">{safeStepIndex + 1}</strong> de {activeSteps.length}
              </span>
              <span className="text-gray-300 font-bold uppercase">
                {currentStep.title}
              </span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF3858] via-purple-500 to-[#00D1FF] transition-all duration-300 rounded-full"
                style={{ width: `${((safeStepIndex + 1) / activeSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* ======================================================== */}
            {/* PASO 1: DATOS DE LA EMPRESA & CONTACTO */}
            {/* ======================================================== */}
            {currentStep.key === "contact" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PASO 1: DATOS DE LA EMPRESA Y CONTACTO</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                    Información de tu Empresa y Contacto
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Ingresa los datos principales de tu negocio para preparar tu cotización formal y canalizarte con los especialistas adecuados.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                  {/* Nombre de la Empresa */}
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Nombre de la Empresa o Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Gourmet Express, Axana Shoes, etc."
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* Nombre del Contacto */}
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Nombre Completo del Contacto / Titular *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Alejandro Morales"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* Giro / Industria */}
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Giro o Industria del Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Restaurantes, E-commerce, Inmobiliaria..."
                      value={clientIndustry}
                      onChange={(e) => setClientIndustry(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                    {/* Chips de giros rápidos */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {industrySuggestions.slice(0, 4).map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setClientIndustry(ind)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] border transition-all cursor-pointer ${
                            clientIndustry === ind
                              ? "bg-[#00D1FF]/20 border-[#00D1FF] text-[#00D1FF]"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Página Web o Red Social */}
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">
                      Página Web o Red Social (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. www.miempresa.com o @miempresa"
                      value={clientWebsite}
                      onChange={(e) => setClientWebsite(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-1">
                    <label className="text-gray-300 block font-bold">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ej. contacto@miempresa.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* WhatsApp / Teléfono */}
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

                  {/* Ciudad */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-gray-300 block font-bold">Ciudad / Estado / País (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Mérida, Yucatán, México"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO 2: TIPO DE SOLUCIÓN DIGITAL (MULTI-SELECCIÓN) */}
            {/* ======================================================== */}
            {currentStep.key === "solution_type" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                      ¿Qué tipo de producto digital vamos a construir para {clientCompany || clientName || "tu negocio"}?
                    </h3>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/40 text-[#00D1FF] font-bold">
                      ✓ Puedes elegir más de 1 opción
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Selecciona una o varias categorías tecnológicas que integrará tu proyecto (puedes combinar Web, App Móvil, IA y CRM/ERP).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projectTypes.map((t) => {
                    const Icon = t.icon;
                    const isSelected = selectedProjectTypes.includes(t.id);
                    return (
                      <div
                        key={t.id}
                        onClick={() => toggleProjectType(t.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-2 select-none ${
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
                          <div className="flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleProjectType(t.id)}
                              className="w-4 h-4 accent-[#00D1FF] cursor-pointer pointer-events-none"
                            />
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />}
                          </div>
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
            {/* PASO 3: SERVICIOS & PILARES REQUERIDOS */}
            {/* ======================================================== */}
            {currentStep.key === "services" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-mono">
                    ¿Qué servicios o pilares necesita tu proyecto?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Puedes elegir diseño de marca + desarrollo de app + marketing. Los siguientes pasos se adaptarán automáticamente a lo que selecciones.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceOptions.map((srv) => {
                    const isChecked = selectedServices.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 select-none ${
                          isChecked
                            ? "bg-white/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.25)] scale-[1.01]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border"
                            style={{
                              color: srv.color,
                              borderColor: `${srv.color}40`,
                              backgroundColor: `${srv.color}15`,
                            }}
                          >
                            {srv.badge}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-5 h-5 accent-[#00D1FF] cursor-pointer pointer-events-none"
                          />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white font-mono leading-snug">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">
                          {srv.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PASO CONDICIONAL: MARCA & ESTRATEGIA DE MARKETING */}
            {/* ======================================================== */}
            {currentStep.key === "branding" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF3858]/20 border border-[#FF3858] flex items-center justify-center text-sm">
                    🎨
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                      Diseño de Marca &amp; Estrategia de Marketing
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Selecciona los entregables de identidad, posicionamiento y marketing que deseas para {clientCompany}.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {brandingOptions.map((opt) => {
                    const isChecked = brandNeeds.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleBrandNeed(opt.label)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 select-none ${
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
                            className="w-4 h-4 accent-[#FF3858] cursor-pointer pointer-events-none"
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
            {/* PASO CONDICIONAL: FUNCIONALIDADES & MÓDULOS TÉCNICOS */}
            {/* ======================================================== */}
            {currentStep.key === "tech" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-9 h-9 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF] flex items-center justify-center text-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                      Funcionalidades y Módulos de la Aplicación
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Selecciona las capacidades, conexiones y herramientas que integrará tu plataforma.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techOptions.map((opt) => {
                    const isChecked = techFeatures.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleTechFeature(opt.label)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 select-none ${
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
                            className="w-4 h-4 accent-[#00D1FF] cursor-pointer pointer-events-none"
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
            {/* PASO FINAL: ALCANCE, PRESUPUESTO & TIEMPOS INFORMATIVOS */}
            {/* ======================================================== */}
            {currentStep.key === "scope_budget" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-mono">
                    Alcance, Descripción &amp; Tiempos Estimados
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Cuéntanos la idea de tu proyecto para {clientCompany} y selecciona el rango de inversión estimado.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Nombre del Proyecto */}
                  <div className="space-y-1 text-xs font-mono">
                    <label className="text-gray-300 block font-bold">
                      Nombre o Idea de tu Proyecto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. App de Entregas a Domicilio, Plataforma de Citas Médicas, Portal Inmobiliario, etc."
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  {/* Pregunta Directa & Amigable */}
                  <div className="space-y-1 text-xs font-mono">
                    <label className="text-gray-300 block font-bold">
                      ¿De qué trata tu proyecto o qué necesidad buscas resolver? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Cuéntanos brevemente qué deseas construir, quiénes serán los usuarios y qué funciones principales te gustaría que tenga..."
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
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs font-mono space-y-1 select-none ${
                            budgetRange === b.id
                              ? "bg-purple-950/40 border-purple-400 text-white shadow-md ring-1 ring-purple-400/50"
                              : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/25"
                          }`}
                        >
                          <strong className="text-white block">{b.title}</strong>
                          <span className="text-[#00D1FF] text-[10px] block">{b.usd}</span>
                          <p className="text-[10px] text-gray-400">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tiempos de Entrega e Hitos Informativos (Cuadros Informativos según el proyecto) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#00D1FF]" />
                      <label className="text-xs font-mono text-gray-200 block font-bold uppercase tracking-wider">
                        Tiempos Estimados de Entrega por Fases:
                      </label>
                    </div>
                    <p className="text-[11px] font-mono text-gray-400">
                      Tiempos de ingeniería y desarrollo calculados según los requerimientos y arquitectura técnica:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Fase 1 */}
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#FF3858]/30 space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#FF3858] uppercase px-2 py-0.5 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30">
                            Fase 1 • UI/UX
                          </span>
                          <span className="text-xs font-mono font-bold text-white">1 a 2 semanas</span>
                        </div>
                        <h5 className="text-xs font-bold text-white font-mono pt-1">
                          🎨 Prototipo Figma Navegable
                        </h5>
                        <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                          Arquitectura de información, wireframes y validación visual navegable a 60fps de todas las pantallas antes de programar.
                        </p>
                      </div>

                      {/* Fase 2 */}
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/30 space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#00D1FF] uppercase px-2 py-0.5 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30">
                            Fase 2 • MVP
                          </span>
                          <span className="text-xs font-mono font-bold text-white">2 a 6 semanas</span>
                        </div>
                        <h5 className="text-xs font-bold text-white font-mono pt-1">
                          ⚡ Desarrollo &amp; Versión Funcional
                        </h5>
                        <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                          Base de datos cifrada, backend escalable, módulos operativos base y acceso a entorno privado de pruebas para tu equipo.
                        </p>
                      </div>

                      {/* Fase 3 */}
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/30 space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            Fase 3 • Lanzamiento
                          </span>
                          <span className="text-xs font-mono font-bold text-white">4 a 10 semanas</span>
                        </div>
                        <h5 className="text-xs font-bold text-white font-mono pt-1">
                          🚀 Integración &amp; Despliegue Final
                        </h5>
                        <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                          Pasarelas de pago, WebSockets, WhatsApp API, pruebas de estrés y publicación en tiendas (App Store/Play Store) y servidores cloud.
                        </p>
                      </div>
                    </div>

                    {/* Resumen dinámico según los tipos de solución seleccionados */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/20 via-black to-[#00D1FF]/10 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-300">
                          Estimación global para tu proyecto: <strong className="text-white">{estimatedTimeline}</strong>
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase self-start sm:self-auto">
                        ✓ Entregas con Demos Quincenales
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {safeStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-all cursor-pointer"
                >
                  ← Anterior
                </button>
              ) : (
                <div />
              )}

              {safeStepIndex < activeSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isCurrentStepValid()}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-purple-600 hover:from-[#00E5FF] hover:to-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105"
                >
                  <span>Siguiente Paso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitProject}
                  disabled={!isStepFinalValid}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 via-[#00D1FF] to-[#FF3858] hover:from-emerald-300 hover:to-[#FF4D6D] disabled:opacity-40 disabled:pointer-events-none text-black font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.4)] cursor-pointer transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Crear Proyecto &amp; Enviar Ficha por WhatsApp</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
