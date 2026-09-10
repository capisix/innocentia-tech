"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Send,
  Users,
  Briefcase,
  Layers,
  Share2,
  Check,
  Building2,
} from "../../lib/icons";
import { generateProjectPdf } from "../../lib/generateProjectPdf";

export interface IncomingLead {
  id: string;
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientEmail: string;
  vendorCode: string;
  vendorName: string;
  projectName: string;
  projectType: string;
  budgetRange: string;
  timeline?: string;
  description: string;
  date: string;
  status: "Nueva Solicitud" | "En Revisión" | "Propuesta Enviada" | "Cerrado";
  assignedVendor?: string;
}

interface ProjectItem {
  id: string;
  name: string;
  client: string;
  status: string;
  leadDesigner: string;
  leadDev: string;
  leadSales: string;
  partnerLead: string;
  progress: number;
}

interface BlogPost {
  id: string;
  projectId: string;
  authorRole: "designer" | "sales" | "partner" | "dev";
  authorName: string;
  authorTitle: string;
  date: string;
  title: string;
  content: string;
  category: "UI / UX" | "Ventas & Alcance" | "Arquitectura & Dev" | "Finanzas & Auditoría";
  attachment?: {
    label: string;
    type: "figma" | "github" | "contract" | "metrics";
  };
  commentsCount: number;
}

interface ChatMessage {
  id: string;
  projectId: string;
  authorRole: "designer" | "sales" | "partner" | "dev" | "client";
  authorName: string;
  authorTitle: string;
  text: string;
  time: string;
}

interface ProjectTeamFeedAndChatProps {
  userRole?: string;
  userName?: string;
}

export const MULTIPLATFORM_DEMOS = [
  {
    id: "demo_esencial",
    badge: "Opción 1",
    title: "Plataforma Esencial (Catálogo, Citas & Panel Base)",
    category: "Pymes & Servicios",
    desc: "Diseño UX/UI personalizado, catálogo o menú dinámico, sistema de agenda de citas y panel administrativo.",
    url: "https://innocentia.tech/#servicios",
    idealFor: "Consultorios, clínicas, despachos legales, marcas de autor y servicios profesionales.",
    defaultPricing: "Implementación: $12,000 MXN + Renta: $2,200 MXN/mes",
  },
  {
    id: "demo_conectada",
    badge: "Opción 2",
    title: "Plataforma Conectada (App Móvil, Reservas & WhatsApp)",
    category: "Delivery, Logística & Retail",
    desc: "App nativa iOS & Android / PWA, ruteo en vivo, notificaciones automáticas por WhatsApp API y pasarela de pagos.",
    url: "https://innocentia.tech/#playground",
    idealFor: "Restaurantes, dark kitchens, mensajería, e-commerce interactivo y control de sucursales.",
    defaultPricing: "Implementación: $28,000 MXN + Renta: $4,500 MXN/mes",
  },
  {
    id: "demo_avanzada",
    badge: "Opción 3",
    title: "Plataforma Avanzada (SaaS a Medida, Agentes IA & ERP)",
    category: "High-Tech & Inteligencia Artificial",
    desc: "Agentes de Inteligencia Artificial (LLM/RAG), automatización con WebSockets, facturación y reportes analíticos.",
    url: "https://innocentia.tech/#proyectos",
    idealFor: "Startups, empresas con procesos operativos propios, fintech y plataformas de alto volumen.",
    defaultPricing: "Implementación: $65,000 MXN + Renta: $9,500 MXN/mes",
  },
];

export default function ProjectTeamFeedAndChat({
  userRole = "socio",
  userName = "Daniel Torre",
}: ProjectTeamFeedAndChatProps) {
  // Available Projects
  const projects: ProjectItem[] = [
    {
      id: "proj-1",
      name: "App Móvil Delivery & Reservas en Tiempo Real",
      client: "Gourmet Express S.A. (Lic. Roberto Garza)",
      status: "En Desarrollo (Sprint 4)",
      leadDesigner: "Sofía (UX/UI & Colorimetría)",
      leadDev: "Ing. Rodrigo Pacheco & Iván Castillo (CEO)",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Daniel Torre & Jorge Pérez",
      progress: 75,
    },
    {
      id: "proj-2",
      name: "Plataforma Clínica Médica con Diagnóstico AI",
      client: "Clínica Médica AI (Dra. Mariana Valdés)",
      status: "Sprint 4 Activo",
      leadDesigner: "Sofía (UX/UI Lead)",
      leadDev: "Ing. Rodrigo Pacheco (Tech Lead)",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Dirección General",
      progress: 68,
    },
    {
      id: "proj-3",
      name: "Fintech Seguros MX - Portal B2B",
      client: "Fintech Seguros MX (Lic. Andrea Morales)",
      status: "Por Iniciar (Fase 0)",
      leadDesigner: "Sofía (UX/UI Lead)",
      leadDev: "Por Asignar (CEO)",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Dirección General",
      progress: 10,
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj-1");
  const [activeTab, setActiveTab] = useState<"leads" | "chat" | "blog">("leads");

  // Incoming Leads State (populated from localStorage or default mocks)
  const [incomingLeads, setIncomingLeads] = useState<IncomingLead[]>([
    {
      id: "PROJ-592160",
      clientName: "Daniel Torre de Haro",
      clientCompany: "Pro Acabados",
      clientPhone: "9902302124",
      clientEmail: "pro.acabados.mx@gmail.com",
      vendorCode: "VEN-CARLOS-202",
      vendorName: "Carlos Mendoza",
      projectName: "App de Pedidos y entregas de producto",
      projectType: "web_platform",
      budgetRange: "50k_150k",
      timeline: "standard",
      description: "Atención al cliente, manejo de cotizaciones y formulario de pedidos, cobro de pedidos, reparto de comisiones.",
      date: "Hoy, Reciente (9 Sep 2026)",
      status: "Nueva Solicitud",
      assignedVendor: "Carlos Mendoza",
    },
    {
      id: "PROJ-894120",
      clientName: "Lic. Andrea Morales",
      clientCompany: "Fintech Seguros MX",
      clientPhone: "+52 55 4123 9876",
      clientEmail: "andrea@fintechseguros.mx",
      vendorCode: "SIN-ASESOR",
      vendorName: "Sin Asesor (Por Canalizar por Dirección General)",
      projectName: "Portal de Cotizaciones y Emisión de Pólizas B2B",
      projectType: "web_platform",
      budgetRange: "150k_350k",
      timeline: "express",
      description: "Requerimos una plataforma web rápida donde brokers puedan cotizar seguros y emitir carátulas en PDF con firma digital.",
      date: "Hoy, 10:15 AM",
      status: "Nueva Solicitud",
      assignedVendor: "Sin Asignar",
    },
    {
      id: "PROJ-719302",
      clientName: "Arq. Valentina Suárez",
      clientCompany: "Ikal Chukum Acabados",
      clientPhone: "+52 999 123 4567",
      clientEmail: "valentina@ikalchukum.com",
      vendorCode: "VEN-CARLOS-202",
      vendorName: "Carlos Mendoza",
      projectName: "E-Commerce Exclusivo y Calculadora de Metros Cuadrados",
      projectType: "mobile_app",
      budgetRange: "80k_150k",
      timeline: "standard",
      description: "Catálogo de lujo para distribución nacional con cotizador en tiempo real según el metraje de obra.",
      date: "Ayer, 04:20 PM",
      status: "En Revisión",
      assignedVendor: "Carlos Mendoza",
    },
  ]);

  // Load leads from localStorage on mount & listen for new events
  useEffect(() => {
    const loadLeads = () => {
      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("innocentia_incoming_leads");
          if (stored) {
            const parsed: IncomingLead[] = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setIncomingLeads((prev) => {
                const map = new Map<string, IncomingLead>();
                [...parsed, ...prev].forEach((item) => map.set(item.id, item));
                return Array.from(map.values());
              });
            }
          }
        }
      } catch (err) {
        console.error("Error loading leads:", err);
      }
    };

    loadLeads();
    if (typeof window !== "undefined") {
      window.addEventListener("innocentia_lead_created", loadLeads);
      return () => window.removeEventListener("innocentia_lead_created", loadLeads);
    }
  }, []);

  // Unread messages state & notification counter
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(3);
  const [selectedLeadForAnswers, setSelectedLeadForAnswers] = useState<IncomingLead | null>(null);
  const [copiedAnswers, setCopiedAnswers] = useState(false);
  const [calculatorBridgeNotice, setCalculatorBridgeNotice] = useState<string | null>(null);

  // Proposal Builder State
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<IncomingLead | null>(null);
  const [selectedDemoId, setSelectedDemoId] = useState<string>("demo_conectada");
  const [proposalPricingModel, setProposalPricingModel] = useState<"renta" | "desarrollo">("renta");
  const [customImplementationCost, setCustomImplementationCost] = useState<string>("$24,000 MXN");
  const [customMonthlyCost, setCustomMonthlyCost] = useState<string>("$3,800 MXN / mes");
  const [customDevCost, setCustomDevCost] = useState<string>("$120,000 MXN");
  const [copiedProposal, setCopiedProposal] = useState(false);

  const selectedDemo = MULTIPLATFORM_DEMOS.find((d) => d.id === selectedDemoId) || MULTIPLATFORM_DEMOS[0];

  // Helper to load lead into quotation calculator
  const handleLoadInCalculator = (lead: IncomingLead) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("innocentia_calculator_lead", JSON.stringify(lead));
        setCalculatorBridgeNotice(`✓ Datos de "${lead.clientName}" listos para cotizar.`);
        setTimeout(() => setCalculatorBridgeNotice(null), 4000);
      }
    } catch (err) {
      console.error("Error setting calculator lead:", err);
    }
  };

  // Blog Posts State
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "p-1",
      projectId: "proj-1",
      authorRole: "designer",
      authorName: "Sofía",
      authorTitle: "Lead UX/UI & Colorimetría",
      date: "Hoy, 10:15 AM",
      title: "🎨 Entregable de Figma: Flujo de Carrito y Checkout a 60fps",
      content:
        "Subimos la versión definitiva de las 18 pantallas de pedidos. Optimizamos la paleta de colores para modo nocturno con contrastes accesibles y micro-interacciones táctiles listas para maquetación.",
      category: "UI / UX",
      attachment: {
        label: "figma.com/file/gourmet-express-v4",
        type: "figma",
      },
      commentsCount: 3,
    },
    {
      id: "p-2",
      projectId: "proj-1",
      authorRole: "dev",
      authorName: "Ing. Rodrigo Pacheco & Iván Castillo",
      authorTitle: "Dev Lead & Software Architect",
      date: "Hoy, 11:30 AM",
      title: "⚡ Staging Desplegado: WebSockets GPS & PostgreSQL Conectados",
      content:
        "El cluster de geolocalización en tiempo real ya emite coordenadas cada 1.5s sin sobrecargar el servidor. El webhook de Stripe para retenciones de anticipo está probado en staging con latencia de 18ms.",
      category: "Arquitectura & Dev",
      attachment: {
        label: "staging.gourmetexpress.mx/build-402",
        type: "github",
      },
      commentsCount: 2,
    },
  ]);

  // Chat Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      projectId: "proj-1",
      authorRole: "sales",
      authorName: "Carlos Mendoza",
      authorTitle: "Asesor Comercial",
      text: "Equipo, el cliente acaba de enviar su requerimiento. Ya revisé la cotización base y les compartí el demo de la plataforma conectada.",
      time: "10:00 AM",
    },
    {
      id: "m-2",
      projectId: "proj-1",
      authorRole: "dev",
      authorName: "Ing. Rodrigo Pacheco",
      authorTitle: "Tech Lead",
      text: "Excelente. La arquitectura está modularizada en Next.js y WebSockets, listos para arrancar Sprint 1 en cuanto validen el anticipo.",
      time: "10:18 AM",
    },
    {
      id: "m-3",
      projectId: "proj-1",
      authorRole: "partner",
      authorName: "Daniel Torre",
      authorTitle: "Socio Operaciones",
      text: "Recibido. Movimiento conciliado en bitácora de finanzas y cuenta de origen validada.",
      time: "10:30 AM",
    },
  ]);

  const [chatText, setChatText] = useState("");

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      projectId: selectedProjectId,
      authorRole: userRole === "ceo" || userRole === "socio" ? "partner" : userRole === "dev" ? "dev" : "sales",
      authorName: userName,
      authorTitle: userRole === "ceo" ? "Director General" : userRole === "socio" ? "Socio Co-Fundador" : userRole === "dev" ? "Ingeniero Dev" : "Asesor Comercial",
      text: chatText.trim(),
      time: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatText("");
  };

  const handleAssignVendor = (leadId: string, vendorName: string) => {
    setIncomingLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, vendorName, vendorCode: vendorName.includes("Carlos") ? "VEN-CARLOS-202" : "INN-DIRECT-01", status: "En Revisión" } : l))
    );
  };

  // Generate Formal Proposal Message
  const getProposalFormattedMessage = (lead: IncomingLead) => {
    const isRenta = proposalPricingModel === "renta";
    const pricingText = isRenta
      ? `• *Modalidad:* Renta Mensual SaaS (Incluye Infraestructura & Mantenimiento Continuo)\n• *Implementación Inicial:* ${customImplementationCost}\n• *Mensualidad Operativa:* ${customMonthlyCost} (Hosting, actualizaciones y soporte)`
      : `• *Modalidad:* Desarrollo a Medida (Propiedad Total de Código)\n• *Inversión Total de Desarrollo:* ${customDevCost} (Pagos por Sprints contra entregables)`;

    return `
🚀 *PROPUESTA DE COTIZACIÓN FORMAL • INNOCENTIA TECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Estimado/a *${lead.clientName}* (${lead.clientCompany}),

Es un gusto saludarte. En *Innocentia Tech* revisamos tu solicitud para el proyecto *"${lead.projectName}"* y hemos preparado la siguiente propuesta técnica y comercial:

📌 *SOLUCIÓN PROPUESTA:*
• *Modelo:* ${selectedDemo.title} (${selectedDemo.category})
• *Alcance:* ${selectedDemo.desc}

💎 *DEMO EN VIVO MULTIPLATAFORMA:*
Puedes probar la experiencia interactiva, navegación fluida a 60 FPS y arquitectura táctil directamente en este enlace:
👉 ${selectedDemo.url}

📊 *ESQUEMA DE INVERSIÓN SUGERIDO:*
${pricingText}

👤 *TU ASESOR ASIGNADO:*
• *Nombre:* ${lead.vendorName}
• *Canal Oficial:* +52 960 177 1556 • contacto@innocentia.tech

¿Cuándo te vendría bien agendar una videollamada breve de 15 minutos para mostrarte el prototipo en vivo y afinar detalles?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Innocentia Tech Core* • Mérida, Yucatán, México.
    `.trim();
  };

  const handleCopyProposal = (lead: IncomingLead) => {
    const text = getProposalFormattedMessage(lead);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedProposal(true);
      setTimeout(() => setCopiedProposal(false), 3000);
    }
  };

  const handleSendWhatsAppProposal = (lead: IncomingLead) => {
    const text = getProposalFormattedMessage(lead);
    const cleanPhone = lead.clientPhone.replace(/[^0-9]/g, "");
    const url = cleanPhone ? ("https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(text)) : ("https://wa.me/529601771556?text=" + encodeURIComponent(text));
    window.open(url, "_blank");
  };

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectMessages = messages.filter((m) => m.projectId === selectedProjectId);

  return (
    <div className="w-full space-y-6 text-left animate-in fade-in duration-300">
      {/* Top Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[28px] bg-[#07070E] border border-white/15 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[10px] font-mono text-[#00D1FF] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SISTEMA DE MENSAJES, LEADS &amp; DEMOS MULTIPLATAFORMA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Mesa de Trabajo &amp; Cotizaciones de Clientes
          </h2>
          <p className="text-xs text-gray-400 font-mono">
            Canaliza solicitudes entrantes, arma propuestas comerciales y envía demos interactivos a clientes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "leads"
                ? "bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Leads &amp; Cotizaciones ({incomingLeads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("chat");
              setUnreadMessagesCount(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "chat"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat del Equipo</span>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-black animate-pulse flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                {unreadMessagesCount} nuevos
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "blog"
                ? "bg-white/20 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Entregables &amp; Figma</span>
          </button>
        </div>
      </div>

      {/* Bridge Notification Toast */}
      {calculatorBridgeNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{calculatorBridgeNotice} Abre la pestaña <strong>"Tabulador y Cotizador Base"</strong> para armar la cotización con precios y extras.</span>
          </div>
          <button
            type="button"
            onClick={() => setCalculatorBridgeNotice(null)}
            className="text-xs text-gray-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: BANDEJA DE LEADS ENTRANTES & GENERADOR DE PROPUESTAS */}
      {/* ======================================================== */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          {/* FEATURED: ÚLTIMA SOLICITUD DE USUARIO RECIBIDA */}
          {incomingLeads.length > 0 && (
            <div className="p-6 sm:p-7 rounded-[32px] bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-black/80 border-2 border-[#00D1FF] space-y-4 shadow-[0_0_30px_rgba(0,209,255,0.2)] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-l from-[#FF3858] to-[#00D1FF] text-white text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Última Solicitud Entrante • {incomingLeads[0].date}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  {incomingLeads[0].id}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 text-[10px] font-mono font-bold uppercase">
                  {incomingLeads[0].status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">{incomingLeads[0].clientName}</h3>
                <p className="text-sm font-mono text-[#00D1FF] font-bold">{incomingLeads[0].clientCompany}</p>
              </div>

              {/* Specs & Full Answers Preview */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-2 text-xs font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-400 text-[10px] uppercase font-bold border-b border-white/10 pb-2 gap-1">
                  <span>Proyecto: <strong className="text-white text-xs">{incomingLeads[0].projectName}</strong></span>
                  <span>Presupuesto Estimado: <strong className="text-emerald-400">{incomingLeads[0].budgetRange || "$150k - $350k MXN"}</strong></span>
                </div>
                <p className="text-gray-300 leading-relaxed italic text-sm">
                  "{incomingLeads[0].description}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-gray-400">📱 WhatsApp:</span>{" "}
                    <a
                      href={"https://wa.me/" + incomingLeads[0].clientPhone.replace(/[^0-9]/g, "")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {incomingLeads[0].clientPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400">✉️ Correo:</span>{" "}
                    <span className="text-gray-200">{incomingLeads[0].clientEmail}</span>
                  </div>
                </div>
              </div>

              {/* 3 Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForAnswers(incomingLeads[0])}
                  className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 text-[#00D1FF]" />
                  <span>📄 Ver Respuestas & PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadInCalculator(incomingLeads[0])}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md hover:scale-[1.02]"
                >
                  <TrendingUp className="w-4 h-4 text-purple-200" />
                  <span>⚡ Cargar en Cotizador</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLeadForProposal(incomingLeads[0]);
                    setCopiedProposal(false);
                  }}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white font-mono font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(255,56,88,0.3)] hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Armar Propuesta →</span>
                </button>
              </div>
            </div>
          )}

          {/* ALL LEADS LIST */}
          <div className="pt-2">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                Historial de Todas las Solicitudes Entrantes ({incomingLeads.length}):
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {incomingLeads.map((lead) => {
                const isUnassigned = lead.vendorCode === "SIN-ASESOR" || lead.vendorName.includes("Sin Asesor");
                return (
                  <div
                    key={lead.id}
                    className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4 hover:border-[#00D1FF]/40 transition-all shadow-xl text-left"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-bold">
                            {lead.id}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${
                              isUnassigned
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            }`}
                          >
                            {isUnassigned ? "⚠️ Por Canalizar (CEO)" : "✓ Asesor Asignado"}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-white">{lead.clientName}</h3>
                        <p className="text-xs font-mono text-[#00D1FF]">{lead.clientCompany}</p>
                      </div>

                      <div className="text-right text-[10px] font-mono text-gray-400">
                        <span>{lead.date}</span>
                      </div>
                    </div>

                    {/* Project Specs */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Proyecto Solicitado:</span>
                        <strong className="text-white text-sm block">{lead.projectName}</strong>
                        <p className="text-gray-300 font-light leading-relaxed mt-1">"{lead.description}"</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
                          <span className="text-gray-400 block text-[9px] uppercase">WhatsApp:</span>
                          <a
                            href={"https://wa.me/" + lead.clientPhone.replace(/[^0-9]/g, "")}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 font-bold hover:underline"
                          >
                            {lead.clientPhone}
                          </a>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
                          <span className="text-gray-400 block text-[9px] uppercase">Correo:</span>
                          <span className="text-gray-200 truncate block">{lead.clientEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vendor Routing Dropdown for CEO / Socios */}
                    <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between gap-3 text-xs font-mono">
                      <div>
                        <span className="text-purple-300 text-[10px] uppercase block font-bold">Asesor a Cargo:</span>
                        <span className="text-white font-bold">{lead.vendorName}</span>
                      </div>

                      {(userRole === "ceo" || userRole === "socio") && (
                        <select
                          value={lead.vendorName}
                          onChange={(e) => handleAssignVendor(lead.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl bg-black border border-purple-400 text-xs font-mono text-purple-200 focus:outline-none cursor-pointer"
                        >
                          <option value="Sin Asesor (Por Canalizar por Dirección)">Por Canalizar (Sin Asesor)</option>
                          <option value="Carlos Mendoza">Asignar a Carlos Mendoza</option>
                          <option value="Iván Castillo (CEO)">Atender por Iván Castillo (CEO)</option>
                          <option value="Daniel Torre (Socio)">Atender por Daniel Torre</option>
                          <option value="Jorge Pérez (Socio)">Atender por Jorge Pérez</option>
                        </select>
                      )}
                    </div>

                    {/* Action Buttons: View Answers/PDF & Proposal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedLeadForAnswers(lead)}
                        className="py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00D1FF] text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        title="Ver respuestas del formulario y descargar PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#00D1FF]" />
                        <span>📄 Respuestas &amp; PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLeadForProposal(lead);
                          setCopiedProposal(false);
                        }}
                        className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Armar Propuesta →</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL / PANEL DE PROPUESTA CON 3 OPCIONES DE DEMO */}
      {/* ======================================================== */}
      {selectedLeadForProposal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#07070E] border border-white/20 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl my-auto text-left max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 font-bold uppercase">
                  Generador de Cotización Oficial
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
                  Propuesta para {selectedLeadForProposal.clientName}
                </h3>
                <p className="text-xs font-mono text-gray-400">{selectedLeadForProposal.clientCompany} • {selectedLeadForProposal.projectName}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLeadForProposal(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer text-sm font-mono"
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Step 1: Select Multiplatform Demo (3 Options) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-white uppercase font-mono block">
                1. Selecciona el Demo Multiplataforma a Enviar al Cliente:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MULTIPLATFORM_DEMOS.map((demo) => {
                  const isSelected = selectedDemoId === demo.id;
                  return (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => setSelectedDemoId(demo.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? "bg-gradient-to-b from-[#00D1FF]/20 to-black border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)] scale-[1.02]"
                          : "bg-black/60 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/10 text-[#00D1FF]">
                          {demo.badge}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#00D1FF]" />}
                      </div>

                      <h4 className="text-xs font-black text-white leading-tight">{demo.title}</h4>
                      <p className="text-[10px] text-gray-300 font-light leading-relaxed">{demo.desc}</p>

                      <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-[#00D1FF]">
                        <strong>Demo Link:</strong> {demo.url.replace("https://", "")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Commercial Pricing Model */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-white uppercase font-mono block">
                2. Esquema de Inversión y Precios:
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProposalPricingModel("renta")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    proposalPricingModel === "renta"
                      ? "bg-purple-600/30 border-purple-400 text-white shadow-lg font-bold"
                      : "bg-black/50 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Renta Mensual SaaS</span>
                  <span className="text-[10px] font-mono text-purple-300 block">Implementación + Mensualidad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProposalPricingModel("desarrollo")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    proposalPricingModel === "desarrollo"
                      ? "bg-[#00D1FF]/20 border-[#00D1FF] text-white shadow-lg font-bold"
                      : "bg-black/50 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Desarrollo a Medida</span>
                  <span className="text-[10px] font-mono text-[#00D1FF] block">Pago por Proyecto / Código Completo</span>
                </button>
              </div>

              {/* Price Inputs */}
              {proposalPricingModel === "renta" ? (
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                  <div>
                    <label className="text-gray-400 block text-[10px] uppercase">Implementación Inicial:</label>
                    <input
                      type="text"
                      value={customImplementationCost}
                      onChange={(e) => setCustomImplementationCost(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/20 text-white font-bold mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block text-[10px] uppercase">Mensualidad Operativa:</label>
                    <input
                      type="text"
                      value={customMonthlyCost}
                      onChange={(e) => setCustomMonthlyCost(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/20 text-emerald-400 font-bold mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                  <label className="text-gray-400 block text-[10px] uppercase">Presupuesto Total de Desarrollo:</label>
                  <input
                    type="text"
                    value={customDevCost}
                    onChange={(e) => setCustomDevCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/20 text-[#00D1FF] font-bold mt-1"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Message Preview */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-300 uppercase font-mono block">
                3. Vista Previa del Mensaje Oficial para el Cliente:
              </label>
              <pre className="p-4 rounded-2xl bg-black/80 border border-white/15 text-[11px] font-mono text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {getProposalFormattedMessage(selectedLeadForProposal)}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleCopyProposal(selectedLeadForProposal)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedProposal ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedProposal ? "¡Propuesta Copiada!" : "Copiar para Correo"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendWhatsAppProposal(selectedLeadForProposal)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-[#00D1FF] to-[#3A86FF] hover:from-emerald-300 hover:to-[#00D1FF] text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Enviar Propuesta por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: VER RESPUESTAS COMPLETAS DEL FORMULARIO Y PDF */}
      {/* ======================================================== */}
      {selectedLeadForAnswers && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#07070E] border-2 border-[#00D1FF]/50 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,209,255,0.2)] my-auto text-left max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 font-bold uppercase">
                    Solicitud Registrada • {selectedLeadForAnswers.id}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    ✓ Formulario Completo
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
                  Respuestas de {selectedLeadForAnswers.clientName}
                </h3>
                <p className="text-xs font-mono text-[#00D1FF]">
                  {selectedLeadForAnswers.clientCompany} • Registrado el {selectedLeadForAnswers.date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLeadForAnswers(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer text-xs font-mono"
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Content: Form Answers Breakdown */}
            <div className="space-y-4 text-xs font-mono">
              {/* 1. Contact & Company Details */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-white/5 pb-1.5">
                  1. Datos del Solicitante &amp; Empresa:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Nombre Completo:</span>
                    <strong className="text-white text-sm">{selectedLeadForAnswers.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Empresa / Negocio:</span>
                    <strong className="text-[#00D1FF] text-sm">{selectedLeadForAnswers.clientCompany}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Teléfono WhatsApp:</span>
                    <a
                      href={"https://wa.me/" + selectedLeadForAnswers.clientPhone.replace(/[^0-9]/g, "")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {selectedLeadForAnswers.clientPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Correo Electrónico:</span>
                    <span className="text-gray-200">{selectedLeadForAnswers.clientEmail}</span>
                  </div>
                </div>
              </div>

              {/* 2. Project Scope & Architecture */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-white/5 pb-1.5">
                  2. Alcance Técnico &amp; Requerimientos:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Nombre del Proyecto:</span>
                    <strong className="text-white">{selectedLeadForAnswers.projectName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Tipo de Plataforma:</span>
                    <span className="text-purple-300 font-bold">
                      {selectedLeadForAnswers.projectType === "web_platform"
                        ? "Plataforma Web B2B / SaaS"
                        : selectedLeadForAnswers.projectType === "mobile_app"
                        ? "App Móvil iOS & Android / PWA"
                        : "Desarrollo Integral a Medida"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Presupuesto Estimado:</span>
                    <strong className="text-emerald-400 font-bold">
                      {selectedLeadForAnswers.budgetRange || "$150k - $350k MXN"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Tiempo Deseado de Entrega:</span>
                    <span className="text-amber-300 font-bold">
                      {selectedLeadForAnswers.timeline === "express"
                        ? "⚡ Express (3 a 6 semanas)"
                        : "Estándar (1 a 3 meses)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Textual Requirements / Detailed Description */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#00D1FF]/30 space-y-1.5">
                <span className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-wider block">
                  3. Requerimientos Explicados por el Cliente:
                </span>
                <p className="text-gray-200 leading-relaxed text-sm italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  "{selectedLeadForAnswers.description}"
                </p>
              </div>

              {/* 4. Advisor Assignment */}
              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-purple-300 text-[10px] uppercase font-bold block">Asesor Asignado:</span>
                  <span className="text-white font-bold">{selectedLeadForAnswers.vendorName}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-[10px] font-bold border border-purple-500/40">
                  {selectedLeadForAnswers.vendorCode}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  generateProjectPdf({
                    folio: selectedLeadForAnswers.id,
                    projectName: selectedLeadForAnswers.projectName,
                    clientName: selectedLeadForAnswers.clientName,
                    clientCompany: selectedLeadForAnswers.clientCompany,
                    clientPhone: selectedLeadForAnswers.clientPhone,
                    clientEmail: selectedLeadForAnswers.clientEmail,
                    vendorName: selectedLeadForAnswers.vendorName,
                    vendorCode: selectedLeadForAnswers.vendorCode,
                    budgetRange: selectedLeadForAnswers.budgetRange,
                    timeline: selectedLeadForAnswers.timeline,
                    description: selectedLeadForAnswers.description,
                    date: selectedLeadForAnswers.date,
                  })
                }
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-[#00D1FF]" />
                <span>📥 Descargar PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleLoadInCalculator(selectedLeadForAnswers);
                  setSelectedLeadForAnswers(null);
                }}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <TrendingUp className="w-4 h-4 text-purple-200" />
                <span>⚡ Cargar en Cotizador</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const leadToQuote = selectedLeadForAnswers;
                  setSelectedLeadForAnswers(null);
                  setSelectedLeadForProposal(leadToQuote);
                  setCopiedProposal(false);
                }}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white font-mono font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(255,56,88,0.3)] hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Armar Propuesta →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: CHAT DE EQUIPO MULTI-ROL EN TIEMPO REAL */}
      {/* ======================================================== */}
      {activeTab === "chat" && (
        <div className="p-6 rounded-[28px] bg-black/80 border border-white/20 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">
                Mesa de Discusión en Vivo • {activeProject.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Coordinación en tiempo real entre Iván (CEO), Daniel/Jorge (Socios), Rodrigo (Dev) y Carlos (Ventas).
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                Equipo Sincronizado
              </span>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 max-h-[460px] overflow-y-auto">
            {projectMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                  <span className="font-bold text-[#00D1FF]">{msg.authorName}</span>
                  <span className="text-gray-500">({msg.authorTitle})</span>
                  <span>• {msg.time}</span>
                </div>

                <div className="p-3.5 rounded-2xl text-xs sm:text-sm font-mono max-w-2xl leading-relaxed border bg-white/[0.03] border-white/15 text-gray-200">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChatMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder={"Escribe un mensaje para el equipo..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs sm:text-sm font-mono placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-[#00D1FF] hover:from-purple-600 hover:to-[#00E5FF] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Enviar</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: ENTREGABLES, COMMITS & FIGMA */}
      {/* ======================================================== */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-[28px] bg-black/80 border border-white/15 space-y-4 hover:border-white/30 transition-all text-left"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-bold text-white block">{post.authorName}</span>
                    <span className="text-[10px] font-mono text-gray-400">{post.authorTitle}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{post.title}</h3>
                  <p className="text-xs text-gray-300 font-mono leading-relaxed">{post.content}</p>
                </div>

                {post.attachment && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-400">
                    📎 Recurso: <strong className="text-[#00D1FF]">{post.attachment.label}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
