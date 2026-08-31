"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import VendorContractModal from "../../components/portal/VendorContractModal";
import ProjectTeamFeedAndChat from "../../components/portal/ProjectTeamFeedAndChat";
import ProjectCreationForm from "../../components/portal/ProjectCreationForm";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  FileText,
  Clock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Building2,
  PieChart,
  ArrowUpRight,
  Layers,
  ChevronRight,
  Lock,
  LogOut,
  Terminal,
} from "../../lib/icons";

type RoleType = "usuario" | "dev" | "asesor" | "socio";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  roleTitle: string;
  company?: string;
  contractSignedDate?: string;
}

function PortalContent() {
  // Default to Vendedor / Asesor Comercial para ver inmediatamente la tabla de comisiones
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: "usr_202",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@innocentia.tech",
    role: "asesor",
    roleTitle: "Colaborador Comercial Certificado",
    contractSignedDate: "15 de Agosto de 2026",
  });

  const [clientTab, setClientTab] = useState<"proyectos" | "crear_proyecto" | "cotizaciones" | "pagos" | "chat" | "bitacora">("proyectos");
  const [devTab, setDevTab] = useState<"tickets" | "tokens" | "cicd" | "chat" | "bitacora">("tickets");
  const [advisorTab, setAdvisorTab] = useState<"tabulador" | "crear_proyecto" | "pipeline" | "contrato" | "clientes" | "chat" | "bitacora">("tabulador");
  const [partnerTab, setPartnerTab] = useState<"finanzas" | "gastos" | "comisiones" | "auditoria" | "bitacora">("finanzas");

  // Vendor Registration & Contract Modal
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorContractData, setVendorContractData] = useState<{
    name: string;
    rfc: string;
    address: string;
    email: string;
    phone: string;
    acceptedDate: string;
  } | null>({
    name: "Carlos Mendoza",
    rfc: "MENC850412XYZ",
    address: "Mérida, Yucatán, México",
    email: "carlos.mendoza@innocentia.tech",
    phone: "+52 999 123 4567",
    acceptedDate: "15 de Agosto de 2026",
  });

  // Commission Calculator State (Anexo C)
  const [simProjectAmount, setSimProjectAmount] = useState<number>(200000);
  const [simExternalCosts, setSimExternalCosts] = useState<number>(40000);

  // Real-time Interactive Chat with Sofía & Iván
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "sofia" | "ivan" | "user";
    senderName: string;
    text: string;
    time: string;
    tag?: string;
  }>>([
    {
      id: "m-1",
      sender: "sofia",
      senderName: "Sofía (Lead UX/UI & Color)",
      text: "¡Hola! Estoy supervisando el diseño de Gourmet Express. Las 18 pantallas de checkout y pedidos en Figma están listas al 100%. ¿Quieres revisar algún flujo o animación?",
      time: "10:30 AM",
      tag: "🎨 Diseño & UI",
    },
    {
      id: "m-2",
      sender: "ivan",
      senderName: "Iván (Software Architect)",
      text: "Cluster WebSockets y PostgreSQL activo. El Sprint 4 (Stripe & GPS en tiempo real) avanza al 75% con latencia óptima de 18ms. Despliegue estimado el 05 de Septiembre.",
      time: "10:32 AM",
      tag: "⚡ Arquitectura & Tech",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState<string | null>(null);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = {
      id: "usr-" + Date.now(),
      sender: "user" as const,
      senderName: currentUser?.name || "Tú",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");

    const lower = text.toLowerCase();
    setIsTyping("Sofía e Iván están analizando el status...");

    setTimeout(() => {
      if (lower.includes("status") || lower.includes("avance") || lower.includes("cómo va") || lower.includes("estado") || lower.includes("proyecto")) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "ans-ivan-" + Date.now(),
            sender: "ivan",
            senderName: "Iván (Software Architect)",
            text: `El avance global del proyecto está al 75%. Actualmente estamos en el 'Sprint 4: Pasarela de Pagos Stripe & GPS'. Los WebSockets están transmitiendo coordenadas en vivo y la base de datos PostgreSQL está sincronizada con Redis.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "⚡ Status Técnico",
          },
          {
            id: "ans-sofia-" + Date.now(),
            sender: "sofia",
            senderName: "Sofía (Lead UX/UI)",
            text: "Por la parte de diseño, todos los micro-componentes táctiles tienen feedback háptico y animaciones fluidas a 60fps. La siguiente fase de QA inicia el 05 de Septiembre.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "🎨 Status Diseño",
          },
        ]);
      } else if (lower.includes("diseño") || lower.includes("pantalla") || lower.includes("figma") || lower.includes("ui") || lower.includes("color")) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "ans-sofia-" + Date.now(),
            sender: "sofia",
            senderName: "Sofía (Lead UX/UI)",
            text: "¡Con gusto! Tenemos 18 pantallas diseñadas con modo oscuro/neón y colorimetría optimizada para retención. Cualquier ajuste de tipografía o botón lo integramos de inmediato.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "🎨 Diseño",
          },
        ]);
      } else if (lower.includes("pago") || lower.includes("precio") || lower.includes("factura") || lower.includes("costo") || lower.includes("saldo") || lower.includes("comision")) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "ans-ivan-" + Date.now(),
            sender: "ivan",
            senderName: "Iván (Control Administrativo)",
            text: "El anticipo del 50% ($3,800 USD) fue liquidado y conciliado en Stripe. El saldo restante ($1,900 USD) se liquidará tras la entrega final en App Store / Play Store.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "💳 Finanzas & Pagos",
          },
        ]);
      } else if (lower.includes("despliegue") || lower.includes("fecha") || lower.includes("cuándo") || lower.includes("entrega")) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "ans-ivan-" + Date.now(),
            sender: "ivan",
            senderName: "Iván (Software Architect)",
            text: "La fecha programada de entrega y publicación en producción es el 05 de Septiembre. Estamos en tiempo y forma sin retrasos de infraestructura.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "🚀 Roadmap",
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            id: "ans-sofia-" + Date.now(),
            sender: "sofia",
            senderName: "Sofía",
            text: `He recibido tu mensaje: "${text}". Ya lo agregué a las notas del sprint para revisión del equipo.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "✨ Atención",
          },
          {
            id: "ans-ivan-" + Date.now(),
            sender: "ivan",
            senderName: "Iván",
            text: "Si necesitas verificar métricas en tiempo real o ajustar especificaciones técnicas, aquí estamos 24/7.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            tag: "⚡ Tech Support",
          },
        ]);
      }
      setIsTyping(null);
    }, 700);
  };

  // Sample Demo Data for Usuario (Cliente)
  const clientData = {
    name: "Alejandro Morales",
    company: "Gourmet Express S.A.",
    project: "App Móvil de Delivery & Reservas en Tiempo Real",
    progress: 75,
    currentSprint: "Sprint 4: Pasarela de Pagos Stripe & GPS",
    timeline: [
      { step: "Fase 01: Identidad & Colorimetría (Sofía)", status: "done", date: "12 Ago" },
      { step: "Fase 02: Arquitectura & Base de Datos PostgreSQL (Iván)", status: "done", date: "19 Ago" },
      { step: "Fase 03: Interfaces UI/UX 60fps (Sofía)", status: "done", date: "24 Ago" },
      { step: "Fase 04: Pasarela de Pagos & WebSockets GPS (Iván)", status: "in_progress", date: "En curso" },
      { step: "Fase 05: Pruebas QA & Despliegue en App Store / Play Store", status: "pending", date: "05 Sep" },
    ],
    invoices: [
      { id: "COT-104", desc: "Desarrollo Integral App Móvil", amount: "$3,800 USD", status: "Pagado (Anticipo 50%)" },
      { id: "COT-105", desc: "Entrega Final y Despliegue Cloud", amount: "$1,900 USD", status: "Pendiente a Entrega" },
    ],
  };

  // Sample Demo Data for Dev / UX (Programador & Diseñador)
  const devData = {
    name: "Rodrigo Silva",
    roleTitle: "Dev & UX Engineer",
    activeSprint: "Sprint 4 / Release v2.2",
    assignedProject: "App Móvil Delivery & Reservas (Gourmet Express)",
    metrics: {
      commits: 42,
      figmaScreens: 18,
      activePRs: 3,
      ticketsPending: 2,
    },
    tasks: [
      { id: "DEV-301", title: "Integrar WebSockets GPS en Node.js y Redis (Iván Core)", status: "in_progress", priority: "Alta", tag: "Backend" },
      { id: "DEV-302", title: "Animar flujo de checkout y carrito a 60fps (Sofía Core)", status: "in_progress", priority: "Alta", tag: "UI / UX" },
      { id: "DEV-303", title: "Configurar webhooks de Stripe para pagos recurrentes", status: "done", priority: "Media", tag: "API / Pagos" },
      { id: "DEV-304", title: "Diseñar pantallas de perfil de usuario y pedidos previos", status: "done", priority: "Media", tag: "Figma" },
      { id: "DEV-305", title: "Pruebas E2E en Playwright y tests de carga k6", status: "pending", priority: "Baja", tag: "QA" },
    ],
    deployments: [
      { env: "Producción (AWS US-East)", url: "api.innocentia.tech", status: "Saludable (99.98%)", latency: "18ms", branch: "main" },
      { env: "Staging (Cloudflare Pages)", url: "staging.gourmetexpress.mx", status: "Build Exitoso", latency: "24ms", branch: "dev/sprint-4" },
    ],
  };

  // Sample Demo Data for Asesor (Ventas)
  const advisorData = {
    name: "Carlos Mendoza",
    role: "Asesor Comercial Senior",
    monthSales: "$48,500 USD",
    earnedCommissions: "$4,850 USD",
    closedDeals: 6,
    pipeline: [
      { client: "Dr. Roberto Garza", project: "Clínica Médica AI", amount: "$4,200 USD", stage: "Anticipo Pagado", comm: "$420 USD" },
      { client: "Restaurante La Toscana", project: "App Delivery GPS", amount: "$3,800 USD", stage: "En Desarrollo", comm: "$380 USD" },
      { client: "Grupo Logístico Norte", project: "ERP de Inventarios", amount: "$6,500 USD", stage: "Cotización Enviada", comm: "$650 USD" },
      { client: "Studio Fitness", project: "Web App Reservas", amount: "$2,400 USD", stage: "Cierre Próximo", comm: "$240 USD" },
    ],
    clients: [
      { name: "Dr. Roberto Garza", phone: "+52 81 1234 5678", email: "drgarza@medicloud.com", status: "Activo" },
      { name: "Ing. Laura Paredes", phone: "+52 55 9876 5432", email: "laura@grupolog.mx", status: "Negociación" },
      { name: "Marco Valdés", phone: "+52 33 4567 8901", email: "marco@latoscana.com", status: "Activo" },
    ],
  };

  // Sample Demo Data for Socio (Finanzas Globales, Métricas del Lugar & Estadísticas)
  const partnerData = {
    totalRevenue: "$186,400 USD",
    totalExpenses: "$54,200 USD",
    netProfit: "$132,200 USD",
    profitMargin: "70.9%",
    activeProjectsTotal: 14,
    onTimeRate: "98.2%",
    expensesBreakdown: [
      { category: "Infraestructura Cloud (AWS, Vercel & Cloudflare)", amount: "$4,800 USD", pct: "8.8%" },
      { category: "Licencias de Software & AI (OpenAI/Claude APIs)", amount: "$6,400 USD", pct: "11.8%" },
      { category: "Comisiones a Asesores Comerciales", amount: "$18,640 USD", pct: "34.4%" },
      { category: "Equipo de Ingeniería & Diseño", amount: "$24,360 USD", pct: "45.0%" },
    ],
    // Location & Place Metrics
    trafficMetrics: {
      totalVisitors: "48,920",
      monthlyGrowth: "+34.2%",
      activeNow: "142 personas",
      avgDuration: "4m 32s",
      bounceRate: "21.4%",
      leadConversionRate: "8.4%",
      quotesRequested: 38,
      dealsClosed: 14,
      uptime: "99.99%",
      edgeLatency: "38ms",
    },
    geoDistribution: [
      { country: "México 🇲🇽", users: "30,330", pct: 62, cities: "CDMX (45%), Guadalajara (28%), Monterrey (18%), Querétaro (9%)", trend: "+28%" },
      { country: "Estados Unidos 🇺🇸", users: "10,270", pct: 21, cities: "Miami (35%), Austin (30%), San Francisco (20%), New York (15%)", trend: "+45%" },
      { country: "Colombia & LATAM 🇨🇴", users: "5,870", pct: 12, cities: "Bogotá (50%), Medellín (35%), Santiago de Chile (15%)", trend: "+19%" },
      { country: "España & Europa 🇪🇸", users: "2,450", pct: 5, cities: "Madrid (60%), Barcelona (40%)", trend: "+12%" },
    ],
    deviceStats: [
      { device: "Dispositivos Móviles (iOS / Android)", count: "33,265 visitas", pct: 68, color: "#00E5FF" },
      { device: "Computadoras / Laptops (Mac / Windows)", count: "14,186 visitas", pct: 29, color: "#FF3858" },
      { device: "Tablets & Dispositivos Táctiles", count: "1,469 visitas", pct: 3, color: "#FFB703" },
    ],
    topPages: [
      { path: "/ (Inicio)", views: "34,120", avgTime: "3m 15s" },
      { path: "/#servicios (Capacidades)", views: "18,450", avgTime: "2m 10s" },
      { path: "/faq (Preguntas & Chat)", views: "12,900", avgTime: "4m 45s" },
      { path: "/portal (Portal Privado)", views: "8,340", avgTime: "6m 12s" },
    ],
  };

  // Quick Login Profiles Handler
  const handleLoginAs = (role: RoleType) => {
    if (role === "usuario") {
      setCurrentUser({
        id: "usr_101",
        name: "Alejandro Morales",
        email: "alejandro@gourmetexpress.mx",
        role: "usuario",
        roleTitle: "Cliente Verificado",
        company: "Gourmet Express S.A.",
      });
    } else if (role === "dev") {
      setCurrentUser({
        id: "usr_150",
        name: "Rodrigo Silva",
        email: "rodrigo.silva@innocentia.tech",
        role: "dev",
        roleTitle: "Dev & UX Engineer",
      });
    } else if (role === "asesor") {
      setCurrentUser({
        id: "usr_202",
        name: "Carlos Mendoza",
        email: "carlos.mendoza@innocentia.tech",
        role: "asesor",
        roleTitle: "Asesor Comercial Senior",
      });
    } else if (role === "socio") {
      setCurrentUser({
        id: "usr_303",
        name: "Dirección General",
        email: "direccion@innocentia.tech",
        role: "socio",
        roleTitle: "Socio Fundador / Board",
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Background Animated Canvas */}
      <AmbientLivingCanvas />

      {/* Top Portal Navigation */}
      <header className="relative z-40 border-b border-white/10 bg-[#040407]/90 backdrop-blur-2xl py-3.5 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Official Innocentia Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA"
              className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
            />
            <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#00D1FF] border border-[#00D1FF]/30 font-bold uppercase">
              PORTAL PRIVADO
            </span>
          </Link>

          {/* Right Area: Authenticated User Badge & Logout OR Return Link */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Fixed User Identity Badge */}
                <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl">
                  <div
                    className={`w-2 h-2 rounded-full animate-ping ${
                      currentUser.role === "usuario"
                        ? "bg-[#FF3858]"
                        : currentUser.role === "dev"
                        ? "bg-emerald-400"
                        : currentUser.role === "asesor"
                        ? "bg-[#00D1FF]"
                        : "bg-purple-400"
                    }`}
                  />
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                    <span className="text-[9px] font-mono text-gray-400">{currentUser.roleTitle}</span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  className="px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-white font-mono flex items-center gap-1 transition-all"
              >
                <span>← Volver al Sitio</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Quick Profile Switcher Bar */}
      <div className="relative z-30 bg-[#07070D]/90 border-b border-white/10 px-4 sm:px-12 py-2.5 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 overflow-x-auto text-xs font-mono py-0.5">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] text-gray-400 uppercase font-bold pr-1 hidden md:inline">
              Perfil Activo:
            </span>

            <button
              type="button"
              onClick={() => handleLoginAs("asesor")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentUser?.role === "asesor"
                  ? "bg-[#00D1FF]/20 border border-[#00D1FF] text-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.35)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <span>💼 Vendedor (Tabla de Comisiones)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLoginAs("usuario")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentUser?.role === "usuario"
                  ? "bg-[#FF3858]/20 border border-[#FF3858] text-[#FF3858] shadow-[0_0_15px_rgba(255,56,88,0.35)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <span>👤 Cliente</span>
            </button>

            <button
              type="button"
              onClick={() => handleLoginAs("dev")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentUser?.role === "dev"
                  ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <span>💻 Dev &amp; UX</span>
            </button>

            <button
              type="button"
              onClick={() => handleLoginAs("socio")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentUser?.role === "socio"
                  ? "bg-purple-500/20 border border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <span>👑 Socio / Finanzas</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                if (currentUser?.role === "asesor") setAdvisorTab("bitacora");
                else if (currentUser?.role === "usuario") setClientTab("bitacora");
                else if (currentUser?.role === "dev") setDevTab("bitacora");
                else if (currentUser?.role === "socio") setPartnerTab("bitacora");
              }}
              className="px-3.5 py-1.5 rounded-full bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/50 text-xs font-bold text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>📑 Bitácora &amp; Chat por Proyecto</span>
            </button>

            <Link
              href="/crear-proyecto"
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-[#00D1FF]/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 hover:text-white hover:border-emerald-400 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>⚡ Crear Proyecto</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsVendorModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00D1FF]/20 to-[#FF3858]/20 border border-[#00D1FF]/40 text-xs font-bold text-white hover:border-[#00D1FF] transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D1FF]" />
              <span>📋 Ver / Firmar Contrato</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Portal Body */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 relative z-10 space-y-8">
        {/* ========================================================================= */}
        {/* 0. LOGIN GATEWAY (SI NO HAY SESIÓN INICIADA) */}
        {/* ========================================================================= */}
        {!currentUser && (
          <div className="max-w-md mx-auto py-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF3858] to-[#00D1FF] p-[2px] mx-auto shadow-[0_0_30px_rgba(0,209,255,0.35)]">
              <div className="w-full h-full bg-[#07070D] rounded-[14px] flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#00D1FF]" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ACCESO AL PORTAL PRIVADO
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light">
                Selecciona tu perfil asignado para acceder a tu entorno de trabajo seguro en Innocentia Tech.
              </p>
            </div>

            {/* Role Gateway Cards */}
            <div className="space-y-3 text-left">
              {/* 1. Cliente */}
              <button
                onClick={() => handleLoginAs("usuario")}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#FF3858]/15 via-black/80 to-black border border-[#FF3858]/40 hover:border-[#FF3858] transition-all hover:scale-[1.02] flex items-center justify-between group cursor-pointer shadow-lg shadow-[#FF3858]/10"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF3858]/20 border border-[#FF3858]/40 flex items-center justify-center text-lg">
                    👤
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block group-hover:text-[#FF3858] transition-colors">
                      Alejandro Morales
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Cliente • Gourmet Express S.A.
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              {/* 2. Dev / UX (Programador & Diseñador) */}
              <button
                onClick={() => handleLoginAs("dev")}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-black/80 to-black border border-emerald-500/40 hover:border-emerald-400 transition-all hover:scale-[1.02] flex items-center justify-between group cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg">
                    💻
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block group-hover:text-emerald-300 transition-colors">
                      Rodrigo Silva
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Dev & UX • Ingeniería & Diseño
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              {/* 3. Asesor */}
              <button
                onClick={() => handleLoginAs("asesor")}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#00D1FF]/15 via-black/80 to-black border border-[#00D1FF]/40 hover:border-[#00D1FF] transition-all hover:scale-[1.02] flex items-center justify-between group cursor-pointer shadow-lg shadow-[#00D1FF]/10"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center text-lg">
                    💼
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block group-hover:text-[#00D1FF] transition-colors">
                      Carlos Mendoza
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Asesor Comercial Senior • Ventas & CRM
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              {/* 4. Socio */}
              <button
                onClick={() => handleLoginAs("socio")}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600/15 via-black/80 to-black border border-purple-500/40 hover:border-purple-400 transition-all hover:scale-[1.02] flex items-center justify-between group cursor-pointer shadow-lg shadow-purple-500/10"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-lg">
                    👑
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block group-hover:text-purple-300 transition-colors">
                      Dirección General
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Socio Fundador • Finanzas & Métricas
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              {/* Registro Oficial de Nuevos Vendedores con Contrato */}
              <div className="pt-3 border-t border-white/10 text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setIsVendorModalOpen(true)}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#00D1FF]/20 via-purple-900/30 to-[#FF3858]/20 border border-[#00D1FF]/50 hover:border-[#00D1FF] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(0,209,255,0.25)] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#00D1FF]" />
                  <span>Registrarme como Vendedor / Asesor Comercial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-gray-400 font-mono block">
                  Incluye Contrato de Colaboración Comercial &amp; Tabulador Oficial (20%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. PERFIL EXCLUSIVO: USUARIO (CLIENTE) */}
        {/* ========================================================================= */}
        {currentUser?.role === "usuario" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* User Greeting Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-[#FF3858]/15 via-purple-950/20 to-black/60 border border-white/20 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-xs font-mono text-[#FF3858] font-bold uppercase">
                  <span>PANEL DE CLIENTE • INNOCENTIA</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Bienvenido, {clientData.name}
                </h2>
                <p className="text-sm text-gray-300 font-light">
                  Empresa: <strong className="text-white">{clientData.company}</strong> • Proyecto Activo:{" "}
                  <strong className="text-[#00D1FF]">{clientData.project}</strong>
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setClientTab("crear_proyecto")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-[#00D1FF]/20 border border-emerald-400/50 text-xs font-mono font-bold text-emerald-300 hover:text-white hover:border-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>⚡ Iniciar / Crear Nuevo Proyecto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoginAs("asesor")}
                    className="px-4 py-2 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-xs font-mono font-bold text-[#00D1FF] hover:bg-[#00D1FF]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>💼 Ver Vista de Vendedor (Tabla de Comisiones) →</span>
                  </button>
                </div>
              </div>

              {/* Progress Donut Badge */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 text-center space-y-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase block">Avance Global</span>
                <span className="text-3xl font-black text-emerald-400 block">{clientData.progress}%</span>
                <span className="text-[10px] text-gray-400 font-mono">En tiempo de entrega</span>
              </div>
            </div>

            {/* Client Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {[
                { id: "proyectos", label: "📊 Estado de Proyecto & Sprints" },
                { id: "crear_proyecto", label: "⚡ Iniciar / Crear Nuevo Proyecto" },
                { id: "bitacora", label: "📑 Bitácora & Chat de Equipo por Proyecto" },
                { id: "cotizaciones", label: "📄 Cotizaciones & Documentos" },
                { id: "pagos", label: "💳 Centro de Pagos" },
                { id: "chat", label: "💬 Chat Directo Sofía & Iván" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setClientTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    clientTab === tab.id
                      ? "bg-white/20 border border-white/40 text-white shadow-lg"
                      : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: Crear Nuevo Proyecto desde Cliente */}
            {clientTab === "crear_proyecto" && (
              <div className="space-y-6 text-left">
                <ProjectCreationForm
                  initialVendorCode="VEN-CARLOS-202"
                  initialVendorName="Carlos Mendoza"
                  isEmbeddedInPortal={true}
                />
              </div>
            )}

            {/* TAB 1: Proyectos */}
            {clientTab === "proyectos" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase">{clientData.project}</h3>
                      <span className="text-xs text-[#00E5FF] font-mono">{clientData.currentSprint}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      En Desarrollo Activo
                    </span>
                  </div>

                  {/* Sprint Timeline */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-gray-400 uppercase font-bold block">
                      Hitos y Entregables del Pipeline:
                    </span>
                    <div className="space-y-3">
                      {clientData.timeline.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                            item.status === "done"
                              ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                              : item.status === "in_progress"
                              ? "bg-[#00D1FF]/10 border-[#00D1FF]/50 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                              : "bg-white/[0.02] border-white/10 text-gray-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.status === "done" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                            {item.status === "in_progress" && (
                              <div className="w-4 h-4 rounded-full bg-[#00D1FF] animate-ping" />
                            )}
                            {item.status === "pending" && <Clock className="w-5 h-5 text-gray-500" />}
                            <span className="text-xs sm:text-sm font-semibold">{item.step}</span>
                          </div>
                          <span className="text-xs font-mono">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Quick Summary */}
                <div className="lg:col-span-4 space-y-4 text-left">
                  <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 backdrop-blur-2xl space-y-4 shadow-xl">
                    <h4 className="text-sm font-bold text-white uppercase font-mono">Equipo Asignado</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-[#FF3858]/20 border border-[#FF3858] flex items-center justify-center text-xs">
                          🔴
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Sofía</span>
                          <span className="text-[10px] text-gray-400">Lead UX/UI & Colorimetría</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF] flex items-center justify-center text-xs">
                          🔵
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Iván</span>
                          <span className="text-[10px] text-gray-400">Lead Software Architect</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-950/40 to-black border border-purple-500/40 rounded-[32px] p-6 backdrop-blur-2xl space-y-3 shadow-xl">
                    <h4 className="text-sm font-bold text-white uppercase font-mono">¿Tienes dudas o cambios?</h4>
                    <p className="text-xs text-gray-300 font-light">
                      Conversa de inmediato con Sofía e Iván a través del chat o agenda una sesión de entrega.
                    </p>
                    <button
                      onClick={() => setClientTab("chat")}
                      className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white font-bold text-xs uppercase shadow-md cursor-pointer hover:scale-105 transition-all"
                    >
                      Abrir Canal Directo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Cotizaciones */}
            {clientTab === "cotizaciones" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">Cotizaciones & Contratos Oficiales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientData.invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-white/25 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#00E5FF] font-bold">{inv.id}</span>
                        <h4 className="text-sm font-bold text-white">{inv.desc}</h4>
                        <span className="text-xs text-gray-400 font-mono block">{inv.status}</span>
                      </div>
                      <div className="text-right space-y-2">
                        <span className="text-base font-extrabold text-white font-mono block">{inv.amount}</span>
                        <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-gray-200 transition-colors cursor-pointer">
                          Descargar PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Pagos */}
            {clientTab === "pagos" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">Pasarela de Pagos & Facturación</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/30 space-y-2">
                    <span className="text-xs text-emerald-400 font-mono uppercase">Total Pagado</span>
                    <h4 className="text-2xl font-black text-white font-mono">$3,800 USD</h4>
                    <span className="text-xs text-gray-400 block">50% del total contratado</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00D1FF]/20 to-black border border-[#00D1FF]/30 space-y-2">
                    <span className="text-xs text-[#00E5FF] font-mono uppercase">Saldo Pendiente</span>
                    <h4 className="text-2xl font-black text-white font-mono">$1,900 USD</h4>
                    <span className="text-xs text-gray-400 block">Exigible al despliegue final</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <span className="text-xs text-gray-400 font-mono uppercase">Método Guardado</span>
                    <span className="text-sm font-bold text-white">•••• 4242 (Stripe / Visa)</span>
                    <button className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer">
                      Pagar Saldo Restante
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Chat Directo Interactivo con Sofía e Iván */}
            {clientTab === "chat" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                {/* Header del Chat */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full bg-[#FF3858]/20 border-2 border-[#FF3858] flex items-center justify-center text-xs shadow-md">
                        🔴
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#00D1FF]/20 border-2 border-[#00D1FF] flex items-center justify-center text-xs shadow-md">
                        🔵
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase font-mono">
                        Canal Directo de Ingeniería &amp; Diseño
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Conversa con Sofía (UX/UI) e Iván (Software Architect) en tiempo real.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      Sofía &amp; Iván En Línea
                    </span>
                  </div>
                </div>

                {/* Quick Status Prompt Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                    ⚡ Preguntas Rápidas de Status &amp; Avance:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "📊 ¿Cuál es el status general del proyecto?", label: "Status General" },
                      { text: "🎨 Sofía, ¿cómo va el diseño de pantallas en Figma?", label: "Diseño & UX (Sofía)" },
                      { text: "⚡ Iván, ¿cómo va el Sprint 4 y WebSockets GPS?", label: "Backend & Tech (Iván)" },
                      { text: "🚀 ¿Qué falta para el despliegue final del 05 Sep?", label: "Despliegue & QA" },
                      { text: "💳 ¿Cuál es el saldo pendiente de facturación?", label: "Pagos & Facturación" },
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(chip.text)}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-[#00D1FF] text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{chip.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 max-h-[420px] overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      } space-y-1`}
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 px-1">
                        <span className="font-bold text-gray-300">{msg.senderName}</span>
                        {msg.tag && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] border ${
                              msg.sender === "sofia"
                                ? "bg-[#FF3858]/10 text-[#FF3858] border-[#FF3858]/30"
                                : msg.sender === "ivan"
                                ? "bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30"
                                : "bg-white/10 text-gray-300 border-white/20"
                            }`}
                          >
                            {msg.tag}
                          </span>
                        )}
                        <span>• {msg.time}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm font-mono leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-purple-600/30 to-[#00D1FF]/20 border border-[#00D1FF]/40 text-white rounded-tr-none shadow-md"
                            : msg.sender === "sofia"
                            ? "bg-[#FF3858]/10 border border-[#FF3858]/30 text-gray-100 rounded-tl-none shadow-md"
                            : "bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-gray-100 rounded-tl-none shadow-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00D1FF] py-2 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                      <span>{isTyping}</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-3 pt-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Escribe tu consulta o pide el status del proyecto a Sofía e Iván..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs sm:text-sm font-mono placeholder:text-gray-500 focus:outline-none focus:border-[#00D1FF] shadow-inner"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#00E5FF] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Enviar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: Bitácora & Chat de Equipo por Proyecto */}
            {clientTab === "bitacora" && (
              <ProjectTeamFeedAndChat
                currentRole="usuario"
                currentUserName={currentUser?.name || "Alejandro Morales"}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. PERFIL EXCLUSIVO: DEV / UX (PROGRAMADOR & DISEÑADOR) */}
        {/* ========================================================================= */}
        {currentUser?.role === "dev" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Dev Greeting Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-emerald-950/30 via-teal-950/20 to-black/60 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-400 font-bold uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>INNOCENTIA DEV HUB • ENGINEERING & DESIGN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Bienvenido, {devData.name}
                </h2>
                <p className="text-sm text-gray-300 font-light">
                  Rol: <strong className="text-white">{devData.roleTitle}</strong> • Proyecto Asignado:{" "}
                  <strong className="text-[#00D1FF]">{devData.assignedProject}</strong>
                </p>
              </div>

              {/* Dev Metrics Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/80 border border-white/15 text-center">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Commits (Semana)</span>
                  <span className="text-xl font-black text-emerald-400 font-mono block">{devData.metrics.commits}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/80 border border-white/15 text-center">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Figma Screens</span>
                  <span className="text-xl font-black text-[#FF3858] font-mono block">{devData.metrics.figmaScreens}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/80 border border-white/15 text-center">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">PRs Activos</span>
                  <span className="text-xl font-black text-[#00D1FF] font-mono block">{devData.metrics.activePRs}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/80 border border-white/15 text-center">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Tickets en Curso</span>
                  <span className="text-xl font-black text-amber-400 font-mono block">{devData.metrics.ticketsPending}</span>
                </div>
              </div>
            </div>

            {/* Dev Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {[
                { id: "tickets", label: "💻 Sprints & Tareas (Linear Style)" },
                { id: "bitacora", label: "📑 Bitácora & Chat por Proyecto" },
                { id: "tokens", label: "🎨 UI Components & Tokens" },
                { id: "cicd", label: "⚡ CI/CD & Deployments" },
                { id: "chat", label: "💬 Canal Directo con Cliente" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDevTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    devTab === tab.id
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-lg"
                      : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Tickets */}
            {devTab === "tickets" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white uppercase font-mono">
                    Tickets Asignados ({devData.activeSprint})
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">Iván & Sofía Dual Pipeline</span>
                </div>

                <div className="space-y-3">
                  {devData.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-400 font-bold">{task.id}</span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            task.status === "done"
                              ? "bg-emerald-400"
                              : task.status === "in_progress"
                              ? "bg-[#00D1FF] animate-pulse"
                              : "bg-gray-500"
                          }`}
                        />
                        <span className="text-sm font-semibold text-white">{task.title}</span>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300">
                          {task.tag}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                            task.status === "done"
                              ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40"
                              : task.status === "in_progress"
                              ? "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40"
                              : "bg-white/5 text-gray-400 border-white/10"
                          }`}
                        >
                          {task.status === "done" ? "Completado" : task.status === "in_progress" ? "En Desarrollo" : "Por Iniciar"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Tokens */}
            {devTab === "tokens" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">
                  Design Tokens & UI Component Registry
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#FF3858]/30 space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#FF3858] shadow-md shadow-[#FF3858]/30" />
                    <span className="text-xs font-mono font-bold text-white block">Sofía Crimson</span>
                    <span className="text-[10px] text-gray-400 font-mono">#FF3858 • Primary Brand</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/30 space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#00D1FF] shadow-md shadow-[#00D1FF]/30" />
                    <span className="text-xs font-mono font-bold text-white block">Iván Cyber Cyan</span>
                    <span className="text-[10px] text-gray-400 font-mono">#00D1FF • Tech & Code</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/30 space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#FF7A00] shadow-md shadow-[#FF7A00]/30" />
                    <span className="text-xs font-mono font-bold text-white block">Amber Flare</span>
                    <span className="text-[10px] text-gray-400 font-mono">#FF7A00 • Accent Aura</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-purple-500/30 space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#8A2BE2] shadow-md shadow-[#8A2BE2]/30" />
                    <span className="text-xs font-mono font-bold text-white block">Deep Violet</span>
                    <span className="text-[10px] text-gray-400 font-mono">#8A2BE2 • Glass Stage</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CI/CD */}
            {devTab === "cicd" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">
                  CI/CD Pipelines & Cloud Edge Status
                </h3>
                <div className="space-y-4">
                  {devData.deployments.map((dep, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <h4 className="text-sm font-bold text-white">{dep.env}</h4>
                        </div>
                        <span className="text-xs font-mono text-[#00D1FF] block">{dep.url}</span>
                        <span className="text-[10px] text-gray-400 font-mono block">Branch: {dep.branch}</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-xs font-bold text-emerald-400 font-mono block">{dep.status}</span>
                        <span className="text-[10px] text-gray-400 font-mono block">Latencia: {dep.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Chat */}
            {devTab === "chat" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">Canal Técnico de Soporte</h3>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 max-w-lg">
                    <span className="text-[10px] font-bold text-emerald-400 font-mono block mb-1">RODRIGO (DEV):</span>
                    <p className="text-xs text-gray-200">
                      Hola Alejandro, subimos el commit con la integración de pagos y el mapa interactivo de GPS. ¿Pudiste probarlo en staging?
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FF3858]/10 border border-[#FF3858]/30 max-w-lg">
                    <span className="text-[10px] font-bold text-[#FF3858] font-mono block mb-1">CLIENTE (ALEJANDRO):</span>
                    <p className="text-xs text-gray-200">
                      ¡Sí, la fluidez está increíble! Solo queremos ajustar el color del botón de checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Bitácora & Chat de Equipo por Proyecto */}
            {devTab === "bitacora" && (
              <ProjectTeamFeedAndChat
                currentRole="dev"
                currentUserName={devData.name}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PERFIL EXCLUSIVO: ASESOR COMERCIAL (VENTAS & CONTRATO OFICIAL) */}
        {/* ========================================================================= */}
        {currentUser?.role === "asesor" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Advisor Greeting Card with Contract Signature Badge */}
            <div className="rounded-[32px] bg-gradient-to-r from-[#00D1FF]/15 via-blue-950/20 to-black/60 border border-[#00D1FF]/30 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-xs font-mono text-[#00D1FF] font-bold uppercase">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>PANEL COMERCIAL • INNOCENTIA</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Contrato Comercial Firmado Digitalmente</span>
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Bienvenido, {currentUser.name}
                </h2>
                <p className="text-sm text-gray-300 font-light">
                  Colaborador Comercial Certificado • Fecha de Adhesión:{" "}
                  <strong className="text-[#00D1FF]">{currentUser.contractSignedDate || "15 de Agosto de 2026"}</strong>
                </p>
              </div>

              {/* Metrics Summary */}
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <div className="p-4 rounded-2xl bg-black/80 border border-white/15 text-center space-y-1 min-w-[120px]">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Ventas del Mes</span>
                  <span className="text-2xl font-black text-[#00D1FF] font-mono block">{advisorData.monthSales}</span>
                  <span className="text-[9px] text-gray-400 font-mono">{advisorData.closedDeals} Cierres</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/30 text-center space-y-1 min-w-[120px]">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Comisiones Ganadas</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono block">{advisorData.earnedCommissions}</span>
                  <span className="text-[9px] text-emerald-300 font-mono">Bolsa 20% Máx</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TABLA DE COMISIÓN SIEMPRE VISIBLE PARA VENDEDORES (CLÁUSULA 3 & ANEXO A) */}
            {/* ========================================================================= */}
            <div className="rounded-[28px] bg-gradient-to-r from-[#00D1FF]/10 via-[#07070D]/90 to-purple-950/20 border border-[#00D1FF]/40 p-5 sm:p-6 space-y-4 shadow-xl text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center text-sm">
                    📊
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white uppercase font-mono tracking-wider">
                      TABULADOR GENERAL DE COMISIONES (HASTA 20% MÁXIMO)
                    </h3>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Esquema Oficial de Atribución y Bolsa de Comisiones por Operación
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                    Pago a 15 Días Naturales
                  </span>
                  <button
                    onClick={() => setIsVendorModalOpen(true)}
                    className="text-[10px] font-mono text-[#00D1FF] hover:text-white bg-[#00D1FF]/20 hover:bg-[#00D1FF]/30 px-3 py-1 rounded-full border border-[#00D1FF]/40 font-bold transition-all cursor-pointer"
                  >
                    Ver Contrato Completo ↗
                  </button>
                </div>
              </div>

              {/* Grid 5 Funciones Comisionables */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono">
                <div className="p-3 rounded-2xl bg-black/70 border border-[#00D1FF]/30 hover:border-[#00D1FF] transition-all space-y-1.5 shadow-md">
                  <span className="text-[10px] text-gray-400 block font-bold">1. Titularidad del Cliente</span>
                  <span className="text-2xl font-black text-[#00D1FF] block">4%</span>
                  <p className="text-[9px] text-gray-400 leading-tight">Primer registro válido en CRM (Vigencia 24 meses)</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/70 border border-purple-500/30 hover:border-purple-400 transition-all space-y-1.5 shadow-md">
                  <span className="text-[10px] text-gray-400 block font-bold">2. Levantamiento &amp; Cotización</span>
                  <span className="text-2xl font-black text-purple-300 block">4%</span>
                  <p className="text-[9px] text-gray-400 leading-tight">Definición de requerimientos y costeo inicial</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/70 border border-[#FF3858]/30 hover:border-[#FF3858] transition-all space-y-1.5 shadow-md">
                  <span className="text-[10px] text-gray-400 block font-bold">3. Diseño &amp; Conceptualización</span>
                  <span className="text-2xl font-black text-[#FF3858] block">4%</span>
                  <p className="text-[9px] text-gray-400 leading-tight">UX/UI, prototipado y solución tecnológica</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/70 border border-emerald-500/30 hover:border-emerald-400 transition-all space-y-1.5 shadow-md">
                  <span className="text-[10px] text-gray-400 block font-bold">4. Negociación &amp; Cierre</span>
                  <span className="text-2xl font-black text-emerald-400 block">5%</span>
                  <p className="text-[9px] text-gray-400 leading-tight">Aprobación del cliente y cobro de anticipo</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/70 border border-amber-500/30 hover:border-amber-400 transition-all space-y-1.5 shadow-md col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-gray-400 block font-bold">5. Contrato &amp; Formalización</span>
                  <span className="text-2xl font-black text-amber-300 block">3%</span>
                  <p className="text-[9px] text-gray-400 leading-tight">Integración documental y firma de contrato</p>
                </div>
              </div>

              {/* Reglas de Oro Resumidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-[11px] font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Base Comisionable:</strong> Ingreso neto cobrado sin gastos externos ni IVA.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00D1FF]">✓</span>
                  <span><strong>Acumulación:</strong> Una misma persona puede ganar múltiples funciones (hasta 20%).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-300">✓</span>
                  <span><strong>Operaciones Futuras:</strong> El titular comercial conserva su 4% por 24 meses.</span>
                </div>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {[
                { id: "tabulador", label: "📊 Simulador de Comisiones (Anexo C)" },
                { id: "crear_proyecto", label: "⚡ Crear Nuevo Proyecto Vinculado" },
                { id: "bitacora", label: "📑 Bitácora & Chat por Proyecto" },
                { id: "pipeline", label: "📈 Pipeline de Prospectos & Ventas" },
                { id: "chat", label: "💬 Chat Sofía & Iván (Status de Proyectos)" },
                { id: "contrato", label: "📜 Contrato Legal & Ficha de Atribución" },
                { id: "clientes", label: "👥 Registro de Clientes (Principio 1er Registro)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdvisorTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    advisorTab === tab.id
                      ? "bg-[#00D1FF]/20 border border-[#00D1FF]/50 text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.25)]"
                      : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ======================================================== */}
            {/* SUB-TAB 1: SIMULADOR DE COMISIONES (ANEXO C) */}
            {/* ======================================================== */}
            {advisorTab === "tabulador" && (
              <div className="space-y-6 text-left">
                <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase font-mono">
                        Calculadora Interactiva de Base Comisionable
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Simula las ganancias exactas por función según el valor contratado y los costos no comisionables (Anexo C).
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full border border-[#00D1FF]/30">
                      Ejemplo Base Anexo C: $200k MXN
                    </span>
                  </div>

                  {/* Input Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <label className="text-xs font-mono text-gray-300 block">
                        Valor Total del Contrato (MXN sin IVA):
                      </label>
                      <input
                        type="number"
                        step="5000"
                        value={simProjectAmount}
                        onChange={(e) => setSimProjectAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-xl font-mono font-black text-white focus:outline-none focus:border-[#00D1FF]"
                      />
                      <span className="text-[10px] text-gray-500 font-mono">Monto total acordado con el cliente.</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <label className="text-xs font-mono text-gray-300 block">
                        Costos Externos No Comisionables (Hosting, Cloud, APIs, Licencias):
                      </label>
                      <input
                        type="number"
                        step="1000"
                        value={simExternalCosts}
                        onChange={(e) => setSimExternalCosts(Math.max(0, Number(e.target.value)))}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-xl font-mono font-black text-red-300 focus:outline-none focus:border-red-400"
                      />
                      <span className="text-[10px] text-gray-500 font-mono">Cláusula 16: Gastos de terceros trasladados al cliente.</span>
                    </div>
                  </div>

                  {/* Calculation Result */}
                  {(() => {
                    const baseComisionable = Math.max(0, simProjectAmount - simExternalCosts);
                    const titularidadAmt = baseComisionable * 0.04;
                    const levantamientoAmt = baseComisionable * 0.04;
                    const disenoAmt = baseComisionable * 0.04;
                    const cierreAmt = baseComisionable * 0.05;
                    const contratoAmt = baseComisionable * 0.03;
                    const totalComisiones = baseComisionable * 0.20;

                    return (
                      <div className="space-y-6">
                        {/* Highlights Banner */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                            <span className="text-[11px] text-gray-400 font-mono uppercase block">Base Comisionable Neta</span>
                            <h4 className="text-3xl font-black text-white font-mono">
                              ${baseComisionable.toLocaleString("es-MX")} <span className="text-sm font-normal text-gray-400">MXN</span>
                            </h4>
                            <span className="text-[10px] text-gray-400 font-mono block">Monto $ {simProjectAmount.toLocaleString()} - Costos $ {simExternalCosts.toLocaleString()}</span>
                          </div>

                          <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 space-y-1">
                            <span className="text-[11px] text-emerald-300 font-mono uppercase block">Bolsa Máxima Total (20%)</span>
                            <h4 className="text-3xl font-black text-emerald-400 font-mono">
                              ${totalComisiones.toLocaleString("es-MX")} <span className="text-sm font-normal text-emerald-200">MXN</span>
                            </h4>
                            <span className="text-[10px] text-emerald-300 font-mono block">A repartir según funciones ejecutadas</span>
                          </div>

                          <div className="p-5 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 space-y-1">
                            <span className="text-[11px] text-[#00D1FF] font-mono uppercase block">Pago de Anticipo (50%)</span>
                            <h4 className="text-3xl font-black text-[#00D1FF] font-mono">
                              ${(totalComisiones * 0.5).toLocaleString("es-MX")} <span className="text-sm font-normal text-gray-300">MXN</span>
                            </h4>
                            <span className="text-[10px] text-gray-400 font-mono block">A los 15 días tras liquidación de anticipo</span>
                          </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="overflow-x-auto rounded-2xl border border-white/10">
                          <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-white/[0.03] text-gray-300 border-b border-white/10">
                              <tr>
                                <th className="py-3 px-4">FUNCIÓN COMISIONABLE</th>
                                <th className="py-3 px-4 text-center">% TABULADOR</th>
                                <th className="py-3 px-4 text-right">TOTAL COMISIÓN</th>
                                <th className="py-3 px-4 text-right">EN ANTICIPO (50%)</th>
                                <th className="py-3 px-4 text-right">EN FINIQUITO (50%)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-black/40">
                              <tr>
                                <td className="py-3 px-4 font-bold text-[#00D1FF]">1. Titularidad del Cliente (Primer Registro)</td>
                                <td className="py-3 px-4 text-center font-bold">4%</td>
                                <td className="py-3 px-4 text-right font-black text-white">${titularidadAmt.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(titularidadAmt * 0.5).toLocaleString("es-MX")}</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(titularidadAmt * 0.5).toLocaleString("es-MX")}</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 font-bold text-purple-300">2. Levantamiento &amp; Cotización</td>
                                <td className="py-3 px-4 text-center font-bold">4%</td>
                                <td className="py-3 px-4 text-right font-black text-white">${levantamientoAmt.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(levantamientoAmt * 0.5).toLocaleString("es-MX")}</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(levantamientoAmt * 0.5).toLocaleString("es-MX")}</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 font-bold text-[#FF3858]">3. Diseño, Conceptualización &amp; Propuesta</td>
                                <td className="py-3 px-4 text-center font-bold">4%</td>
                                <td className="py-3 px-4 text-right font-black text-white">${disenoAmt.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(disenoAmt * 0.5).toLocaleString("es-MX")}</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(disenoAmt * 0.5).toLocaleString("es-MX")}</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 font-bold text-emerald-400">4. Negociación &amp; Cierre Comercial</td>
                                <td className="py-3 px-4 text-center font-bold">5%</td>
                                <td className="py-3 px-4 text-right font-black text-white">${cierreAmt.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(cierreAmt * 0.5).toLocaleString("es-MX")}</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(cierreAmt * 0.5).toLocaleString("es-MX")}</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 font-bold text-amber-300">5. Contrato &amp; Formalización</td>
                                <td className="py-3 px-4 text-center font-bold">3%</td>
                                <td className="py-3 px-4 text-right font-black text-white">${contratoAmt.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(contratoAmt * 0.5).toLocaleString("es-MX")}</td>
                                <td className="py-3 px-4 text-right text-gray-300">${(contratoAmt * 0.5).toLocaleString("es-MX")}</td>
                              </tr>
                            </tbody>
                            <tfoot className="bg-white/[0.04] border-t border-white/20 font-bold">
                              <tr>
                                <td className="py-3 px-4 text-white uppercase">TOTAL MÁXIMO DE BOLSA</td>
                                <td className="py-3 px-4 text-center text-emerald-400">20%</td>
                                <td className="py-3 px-4 text-right text-emerald-400 font-black">${totalComisiones.toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-emerald-400 font-black">${(totalComisiones * 0.5).toLocaleString("es-MX")} MXN</td>
                                <td className="py-3 px-4 text-right text-emerald-400 font-black">${(totalComisiones * 0.5).toLocaleString("es-MX")} MXN</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SUB-TAB 2: CREACIÓN DE PROYECTO VINCULADO AL ASESOR */}
            {/* ======================================================== */}
            {advisorTab === "crear_proyecto" && (
              <div className="space-y-6 text-left">
                <ProjectCreationForm
                  initialVendorCode="VEN-CARLOS-202"
                  initialVendorName={currentUser.name}
                  isEmbeddedInPortal={true}
                />
              </div>
            )}

            {/* ======================================================== */}
            {/* SUB-TAB 2: PIPELINE ACTIVO */}
            {/* ======================================================== */}
            {advisorTab === "pipeline" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white uppercase font-mono">Pipeline Activo de Negociaciones</h3>
                  <span className="text-xs text-gray-400 font-mono">4 Oportunidades Registradas</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-gray-400 border-b border-white/10 pb-2">
                        <th className="py-3 px-4">CLIENTE / EMPRESA</th>
                        <th className="py-3 px-4">PROYECTO</th>
                        <th className="py-3 px-4">MONTO</th>
                        <th className="py-3 px-4">ETAPA</th>
                        <th className="py-3 px-4 text-right">COMISIÓN ESTIMADA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {advisorData.pipeline.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{row.client}</td>
                          <td className="py-3 px-4 text-gray-300">{row.project}</td>
                          <td className="py-3 px-4 text-[#00E5FF] font-bold">{row.amount}</td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-gray-200">
                              {row.stage}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-emerald-400">{row.comm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SUB-TAB 3: CONTRATO LEGAL & FICHA DE ATRIBUCIÓN (ANEXO B) */}
            {/* ======================================================== */}
            {advisorTab === "contrato" && (
              <div className="space-y-6 text-left">
                {/* Contract Status Card */}
                <div className="bg-black/80 border border-emerald-500/40 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-4 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white uppercase font-mono">
                          Contrato Comercial de Colaboración Vigente
                        </h4>
                        <span className="text-xs text-emerald-400 font-mono">
                          Firmado y Vinculado a: {currentUser.name} ({currentUser.email})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsVendorModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white transition-all self-start sm:self-auto cursor-pointer"
                    >
                      Ver / Re-firmar Contrato
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-gray-300">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-gray-400 text-[10px] block uppercase">Jurisdicción Legal:</span>
                      <strong className="text-white">Mérida, Yucatán, México</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-gray-400 text-[10px] block uppercase">Plazo de Pago:</span>
                      <strong className="text-emerald-400">15 Días Naturales</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-gray-400 text-[10px] block uppercase">Protección de Cartera:</span>
                      <strong className="text-[#00D1FF]">24 Meses Continuos</strong>
                    </div>
                  </div>
                </div>

                {/* Anexo B: Ficha de Atribución */}
                <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-base font-bold text-white uppercase font-mono">
                      ANEXO B: Formato de Ficha de Atribución y Comisiones por Proyecto
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">Plantilla Oficial</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs font-mono text-gray-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><strong className="text-gray-400">EMPRESA:</strong> INNOCENTIA TECH</div>
                      <div><strong className="text-gray-400">TITULAR COMERCIAL:</strong> {currentUser.name}</div>
                      <div><strong className="text-gray-400">MODALIDAD DE PAGO:</strong> Proporcional a cada pago recibido (15 días)</div>
                      <div><strong className="text-gray-400">BASE COMISIONABLE:</strong> Cobro neto sin gastos de terceros</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SUB-TAB 4: REGISTRO DE CLIENTES (PRINCIPIO DE 1ER REGISTRO) */}
            {/* ======================================================== */}
            {advisorTab === "clientes" && (
              <div className="space-y-6 text-left">
                {/* Form to Register Lead */}
                <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase font-mono">
                        Registrar Nuevo Prospecto en CRM (Cláusula 4 y 5)
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Se te reconocerá como <strong>Titular Comercial (4%)</strong> al registrar con evidencia de contacto válida y verificable.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      Principio de Primer Registro
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadRegisteredSuccess(true);
                      setTimeout(() => setLeadRegisteredSuccess(false), 5000);
                      setNewLeadForm({
                        name: "",
                        company: "",
                        contactPerson: "",
                        phone: "",
                        email: "",
                        needDesc: "",
                        estimatedBudget: "",
                        evidence: "",
                      });
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-gray-300 block">Nombre del Cliente *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Ing. Laura Paredes"
                          value={newLeadForm.name}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-300 block">Empresa / Razón Social *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Grupo Logístico Norte"
                          value={newLeadForm.company}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-300 block">Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+52 55 9876 5432"
                          value={newLeadForm.phone}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-gray-300 block">Descripción de la Necesidad / Proyecto *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. ERP de inventarios multi-sucursal con app de repartidores"
                          value={newLeadForm.needDesc}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, needDesc: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-300 block">Evidencia de Contacto / Referido *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Conversación WhatsApp / Reunión Zoom"
                          value={newLeadForm.evidence}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, evidence: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                        />
                      </div>
                    </div>

                    {leadRegisteredSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>¡Prospecto registrado exitosamente! Se ha generado tu marca de tiempo y titularidad comercial protegida por 24 meses.</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] hover:from-[#00E5FF] hover:to-[#00B4D8] text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00D1FF]/20 hover:scale-105"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Registrar & Proteger Titularidad (4%)</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Registered Clients Directory */}
                <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-4 shadow-2xl">
                  <h3 className="text-base font-bold text-white uppercase font-mono border-b border-white/10 pb-3">
                    Directorio de Clientes con Titularidad Comercial Protegida
                  </h3>
                  <div className="space-y-3">
                    {advisorData.clients.map((c, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                        <div className="space-y-1">
                          <span className="text-white font-bold text-sm block">{c.name}</span>
                          <span className="text-gray-400 block">{c.email} • {c.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 font-bold">
                            Titularidad 4% Activa (24 Meses)
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: CHAT DIRECTO CON SOFÍA & IVÁN (STATUS DE PROYECTOS) */}
            {advisorTab === "chat" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                {/* Header del Chat */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full bg-[#FF3858]/20 border-2 border-[#FF3858] flex items-center justify-center text-xs shadow-md">
                        🔴
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#00D1FF]/20 border-2 border-[#00D1FF] flex items-center justify-center text-xs shadow-md">
                        🔵
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase font-mono">
                        Canal Comercial con Sofía &amp; Iván
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Consulta status técnico, estado de entregables, comisiones y avances para tus clientes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      Sofía &amp; Iván En Línea
                    </span>
                  </div>
                </div>

                {/* Quick Status Prompt Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                    ⚡ Consultas Rápidas de Status Comercial:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: "📊 ¿Cuál es el status de los proyectos de mis clientes?", label: "Status Clientes" },
                      { text: "💰 ¿Cuánto se ha cobrado y comisionado este mes?", label: "Comisiones" },
                      { text: "🎨 Sofía, ¿cómo van las propuestas visuales para cotizaciones?", label: "Diseño & Cotizaciones" },
                      { text: "⚡ Iván, ¿qué factibilidad técnica tienen los nuevos prospectos?", label: "Factibilidad Tech" },
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(chip.text)}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-[#00D1FF] text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{chip.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 max-h-[420px] overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      } space-y-1`}
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 px-1">
                        <span className="font-bold text-gray-300">{msg.senderName}</span>
                        {msg.tag && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] border ${
                              msg.sender === "sofia"
                                ? "bg-[#FF3858]/10 text-[#FF3858] border-[#FF3858]/30"
                                : msg.sender === "ivan"
                                ? "bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30"
                                : "bg-white/10 text-gray-300 border-white/20"
                            }`}
                          >
                            {msg.tag}
                          </span>
                        )}
                        <span>• {msg.time}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm font-mono leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-[#00D1FF]/30 to-purple-600/20 border border-[#00D1FF]/40 text-white rounded-tr-none shadow-md"
                            : msg.sender === "sofia"
                            ? "bg-[#FF3858]/10 border border-[#FF3858]/30 text-gray-100 rounded-tl-none shadow-md"
                            : "bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-gray-100 rounded-tl-none shadow-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00D1FF] py-2 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                      <span>{isTyping}</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-3 pt-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Pregúntale a Sofía e Iván sobre el avance de cualquier cliente o proyecto..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs sm:text-sm font-mono placeholder:text-gray-500 focus:outline-none focus:border-[#00D1FF] shadow-inner"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] hover:from-[#00E5FF] hover:to-[#00B4D8] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Enviar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* SUB-TAB 6: BITÁCORA & CHAT DE EQUIPO POR PROYECTO */}
            {advisorTab === "bitacora" && (
              <ProjectTeamFeedAndChat
                currentRole="asesor"
                currentUserName={currentUser?.name || "Carlos Mendoza"}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. PERFIL EXCLUSIVO: SOCIO (MÉTRICAS DEL LUGAR, ESTADÍSTICAS & FINANZAS) */}
        {/* ========================================================================= */}
        {currentUser?.role === "socio" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Partner Greeting Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-purple-900/25 via-indigo-950/20 to-black/60 border border-purple-500/40 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold uppercase">
                  <span>DIRECCIÓN EJECUTIVA &amp; BOARD • INNOCENTIA TECH</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Métricas Globales &amp; Control Estratégico
                </h2>
                <p className="text-sm text-gray-300 font-light">
                  Métricas de audiencia por lugar, estadísticas de conversión, rendimiento técnico y salud financiera del ecosistema.
                </p>
              </div>

              {/* Profit Margin Badge */}
              <div className="flex gap-3">
                <div className="p-4 rounded-2xl bg-black/80 border border-purple-500/30 text-center space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Visitantes Totales</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#00E5FF] font-mono block">
                    {partnerData.trafficMetrics.totalVisitors}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {partnerData.trafficMetrics.activeNow} en vivo
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black/80 border border-purple-500/30 text-center space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Margen Neto</span>
                  <span className="text-2xl sm:text-3xl font-black text-purple-300 font-mono block">
                    {partnerData.profitMargin}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">14 Proyectos</span>
                </div>
              </div>
            </div>

            {/* Socio Sub-Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {[
                { id: "metricas_lugar", label: "📍 Métricas del Lugar & Tráfico Geográfico" },
                { id: "bitacora", label: "📑 Bitácora & Chat de Proyecto (Diseño, Dev, Ventas)" },
                { id: "estadisticas", label: "📊 Estadísticas de Plataforma & Conversiones" },
                { id: "finanzas", label: "💰 Finanzas & Rentabilidad Global" },
                { id: "gastos", label: "📑 Desglose de Gastos & Operación" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPartnerTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    partnerTab === tab.id
                      ? "bg-purple-600/30 border border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ======================================================== */}
            {/* TAB 1: MÉTRICAS DEL LUGAR & TRÁFICO GEOGRÁFICO */}
            {/* ======================================================== */}
            {partnerTab === "metricas_lugar" && (
              <div className="space-y-6 text-left">
                {/* Geographic Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-[24px] bg-black/80 border border-white/15 space-y-1">
                    <span className="text-[11px] text-gray-400 font-mono uppercase block">Visitas este Mes</span>
                    <h4 className="text-2xl font-black text-white font-mono">{partnerData.trafficMetrics.totalVisitors}</h4>
                    <span className="text-xs text-emerald-400 font-mono block font-bold">{partnerData.trafficMetrics.monthlyGrowth} vs mes anterior</span>
                  </div>

                  <div className="p-5 rounded-[24px] bg-black/80 border border-white/15 space-y-1">
                    <span className="text-[11px] text-gray-400 font-mono uppercase block">Tiempo Medio en Sitio</span>
                    <h4 className="text-2xl font-black text-[#00E5FF] font-mono">{partnerData.trafficMetrics.avgDuration}</h4>
                    <span className="text-xs text-gray-400 font-mono block">Alta retención de lectura</span>
                  </div>

                  <div className="p-5 rounded-[24px] bg-black/80 border border-white/15 space-y-1">
                    <span className="text-[11px] text-gray-400 font-mono uppercase block">Tasa de Rebote</span>
                    <h4 className="text-2xl font-black text-emerald-400 font-mono">{partnerData.trafficMetrics.bounceRate}</h4>
                    <span className="text-xs text-emerald-400 font-mono block">Excelente (&lt; 35% estándar)</span>
                  </div>

                  <div className="p-5 rounded-[24px] bg-black/80 border border-white/15 space-y-1">
                    <span className="text-[11px] text-gray-400 font-mono uppercase block">Usuarios Activos Ahora</span>
                    <h4 className="text-2xl font-black text-[#FF3858] font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF3858] animate-ping" />
                      {partnerData.trafficMetrics.activeNow}
                    </h4>
                    <span className="text-xs text-gray-400 font-mono block">En tiempo real</span>
                  </div>
                </div>

                {/* Country Breakdown & Cities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Geo Distribution */}
                  <div className="lg:col-span-7 bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-5 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold text-white uppercase font-mono">
                        Distribución de Audiencia por País
                      </h3>
                      <span className="text-xs text-[#00E5FF] font-mono font-bold">Top Mercados</span>
                    </div>

                    <div className="space-y-4">
                      {partnerData.geoDistribution.map((geo, idx) => (
                        <div key={idx} className="space-y-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{geo.country}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-emerald-400 font-mono font-bold">{geo.trend}</span>
                              <span className="text-xs font-mono font-black text-white">{geo.users} ({geo.pct}%)</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF3858] via-purple-500 to-[#00D1FF]"
                              style={{ width: `${geo.pct}%` }}
                            />
                          </div>

                          <div className="text-[11px] text-gray-400 font-mono">
                            <strong className="text-gray-300">Ciudades clave:</strong> {geo.cities}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Devices & Popular Pages */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Device Breakdown */}
                    <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 backdrop-blur-2xl space-y-4 shadow-2xl">
                      <h3 className="text-lg font-bold text-white uppercase font-mono border-b border-white/10 pb-3">
                        Dispositivos de Acceso
                      </h3>
                      <div className="space-y-3">
                        {partnerData.deviceStats.map((dev, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-200">{dev.device}</span>
                              <span className="font-bold text-white">{dev.pct}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${dev.pct}%`, backgroundColor: dev.color }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">{dev.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 backdrop-blur-2xl space-y-3 shadow-2xl">
                      <h3 className="text-base font-bold text-white uppercase font-mono border-b border-white/10 pb-2">
                        Páginas Más Visitadas
                      </h3>
                      <div className="space-y-2">
                        {partnerData.topPages.map((pg, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono">
                            <span className="text-white font-semibold truncate pr-2">{pg.path}</span>
                            <div className="text-right flex-shrink-0">
                              <span className="text-[#00E5FF] font-bold block">{pg.views}</span>
                              <span className="text-[10px] text-gray-400 block">{pg.avgTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: ESTADÍSTICAS DE PLATAFORMA & CONVERSIONES */}
            {/* ======================================================== */}
            {partnerTab === "estadisticas" && (
              <div className="space-y-6 text-left">
                {/* Conversion Funnel */}
                <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase font-mono">
                        Embudo de Conversión &amp; Rendimiento de Leads
                      </h3>
                      <p className="text-xs text-gray-400">Desde la primera visita hasta la firma de contrato.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      Tasa de Éxito: {partnerData.trafficMetrics.leadConversionRate}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <span className="text-xs font-mono text-gray-400 uppercase">1. Tráfico Cualificado</span>
                      <h4 className="text-3xl font-black text-white font-mono">{partnerData.trafficMetrics.totalVisitors}</h4>
                      <p className="text-[11px] text-gray-400">Visitantes únicos mensuales a la web.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#00E5FF]/10 border border-[#00D1FF]/30 space-y-2">
                      <span className="text-xs font-mono text-[#00E5FF] uppercase">2. Propuestas Solicitadas</span>
                      <h4 className="text-3xl font-black text-[#00D1FF] font-mono">{partnerData.trafficMetrics.quotesRequested}</h4>
                      <p className="text-[11px] text-gray-300">Generadas con el Creador de Proyectos.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 space-y-2">
                      <span className="text-xs font-mono text-emerald-400 uppercase">3. Proyectos Cerrados</span>
                      <h4 className="text-3xl font-black text-emerald-400 font-mono">{partnerData.trafficMetrics.dealsClosed}</h4>
                      <p className="text-[11px] text-emerald-200">En desarrollo activo con anticipo cubierto.</p>
                    </div>
                  </div>
                </div>

                {/* Cloud & Tech Health */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[32px] bg-black/80 border border-white/15 space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">Disponibilidad de Servidores (Uptime)</span>
                    <h3 className="text-3xl font-black text-emerald-400 font-mono">{partnerData.trafficMetrics.uptime}</h3>
                    <p className="text-xs text-gray-400">Infraestructura Vercel Edge Serverless con redundancia multi-zona.</p>
                  </div>

                  <div className="p-6 rounded-[32px] bg-black/80 border border-white/15 space-y-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">Latencia Global Promedio</span>
                    <h3 className="text-3xl font-black text-[#00E5FF] font-mono">{partnerData.trafficMetrics.edgeLatency}</h3>
                    <p className="text-xs text-gray-400">Carga ultra-rápida en CDN distribuida en 300+ ciudades.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: FINANZAS & RENTABILIDAD */}
            {/* ======================================================== */}
            {partnerTab === "finanzas" && (
              <div className="space-y-6 text-left">
                {/* Financial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-[32px] bg-black/80 border border-white/15 space-y-2 text-left">
                    <span className="text-xs text-gray-400 font-mono uppercase">Ingresos Totales (Q3)</span>
                    <h3 className="text-3xl font-black text-emerald-400 font-mono">{partnerData.totalRevenue}</h3>
                    <span className="text-xs text-gray-400 block">+24.5% vs trimestre anterior</span>
                  </div>

                  <div className="p-6 rounded-[32px] bg-black/80 border border-white/15 space-y-2 text-left">
                    <span className="text-xs text-gray-400 font-mono uppercase">Egresos &amp; Costos Operativos</span>
                    <h3 className="text-3xl font-black text-red-400 font-mono">{partnerData.totalExpenses}</h3>
                    <span className="text-xs text-gray-400 block">Nómina, Cloud y Licencias</span>
                  </div>

                  <div className="p-6 rounded-[32px] bg-black/80 border border-purple-500/40 space-y-2 text-left">
                    <span className="text-xs text-purple-300 font-mono uppercase">Utilidad Neta Disponible</span>
                    <h3 className="text-3xl font-black text-white font-mono">{partnerData.netProfit}</h3>
                    <span className="text-xs text-emerald-400 block">Salud Financiera Excelente</span>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: GASTOS DE OPERACIÓN */}
            {/* ======================================================== */}
            {partnerTab === "gastos" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <h3 className="text-xl font-bold text-white uppercase font-mono">Desglose de Costos de Operación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerData.expensesBreakdown.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">{item.category}</h4>
                        <span className="text-xs text-gray-400 font-mono">{item.pct} del presupuesto total</span>
                      </div>
                      <span className="text-base font-extrabold text-gray-200 font-mono">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: BITÁCORA & CHAT DE PROYECTO (DISEÑO, DEV, VENTAS) */}
            {partnerTab === "bitacora" && (
              <ProjectTeamFeedAndChat
                currentRole="socio"
                currentUserName={partnerData.name}
              />
            )}
          </div>
        )}
      </div>

      {/* Modal Oficial de Registro de Vendedor y Contrato Comercial */}
      <VendorContractModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onAcceptAndRegister={(data) => {
          setVendorContractData(data);
          setIsVendorModalOpen(false);
          setCurrentUser({
            id: "usr_" + Math.floor(Math.random() * 1000),
            name: data.name,
            email: data.email,
            role: "asesor",
            roleTitle: "Colaborador Comercial Certificado",
            contractSignedDate: data.acceptedDate,
          });
        }}
      />
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#040407]" />}>
      <PortalContent />
    </Suspense>
  );
}
