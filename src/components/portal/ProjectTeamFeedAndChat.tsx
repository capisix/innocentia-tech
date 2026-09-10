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

  // Proposal Builder State
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<IncomingLead | null>(null);
  const [selectedDemoId, setSelectedDemoId] = useState<string>("demo_conectada");
  const [proposalPricingModel, setProposalPricingModel] = useState<"renta" | "desarrollo">("renta");
  const [customImplementationCost, setCustomImplementationCost] = useState<string>("$24,000 MXN");
  const [customMonthlyCost, setCustomMonthlyCost] = useState<string>("$3,800 MXN / mes");
  const [customDevCost, setCustomDevCost] = useState<string>("$120,000 MXN");
  const [copiedProposal, setCopiedProposal] = useState(false);

  const selectedDemo = MULTIPLATFORM_DEMOS.find((d) => d.id === selectedDemoId) || MULTIPLATFORM_DEMOS[0];

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
    return [
      "🚀 *PROPUESTA DE COTIZACIÓN FORMAL • INNOCENTIA TECH*",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Estimado/a *" + lead.clientName + "* (" + lead.clientCompany + "),",
      "Es un gusto saludarte. En *Innocentia Tech* revisamos tu solicitud para el proyecto *\"" + lead.projectName + "\"* y hemos preparado la siguiente propuesta técnica y comercial:",
      "📌 *SOLUCIÓN PROPUESTA:*",
      "• *Modelo:* " + selectedDemo.title + " (" + selectedDemo.category + ")",
      "• *Alcance:* " + selectedDemo.desc,
      "",
      "💎 *DEMO EN VIVO MULTIPLATAFORMA:*",
      "Puedes probar la experiencia interactiva, navegación fluida a 60 FPS y arquitectura táctil directamente en este enlace:",
      "👉 " + selectedDemo.url,
      "",
      "📊 *ESQUEMA DE INVERSIÓN SUGERIDO:*",
      isRenta
        ? "• *Modalidad:* Renta Mensual SaaS (Incluye Infraestructura & Mantenimiento Continuo)\n• *Implementación & Personalización Inicial:* " + customImplementationCost + "\n• *Mensualidad Operativa:* " + customMonthlyCost + " (Hosting, actualizaciones, seguridad y soporte)"
        : "• *Modalidad:* Desarrollo a Medida (Propiedad Total de Código)\n• *Inversión Total de Desarrollo:* " + customDevCost + " (Pagos por Sprints contra entregables validados)",
      "",
      "👤 *TU ASESOR ASIGNADO:*",
      "• *Nombre:* " + lead.vendorName,
      "• *Canal Oficial:* +52 960 177 1556 • contacto@innocentia.tech",
      "",
      "¿Cuándo te vendría bien agendar una videollamada breve de 15 minutos para mostrarte el prototipo en vivo y afinar detalles?",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "*Innocentia Tech Core* • Mérida, Yucatán, México."
    ].join("\n");
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
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "chat"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat del Equipo</span>
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

      {/* ======================================================== */}
      {/* TAB 1: BANDEJA DE LEADS ENTRANTES & GENERADOR DE PROPUESTAS */}
      {/* ======================================================== */}
      {activeTab === "leads" && (
        <div className="space-y-6">
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

                  {/* Action Button: Open Proposal Builder */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLeadForProposal(lead);
                      setCopiedProposal(false);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Armar Propuesta &amp; Enviar Demo Multiplataforma →</span>
                  </button>
                </div>
              );
            })}
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
