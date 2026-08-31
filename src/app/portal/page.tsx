"use client";

import React, { useState } from "react";
import Link from "next/link";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
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
}

export default function PortalPage() {
  // Default to Cliente (or null for Login Screen)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: "usr_101",
    name: "Alejandro Morales",
    email: "alejandro@gourmetexpress.mx",
    role: "usuario",
    roleTitle: "Cliente Verificado",
    company: "Gourmet Express S.A.",
  });

  const [clientTab, setClientTab] = useState<"proyectos" | "cotizaciones" | "pagos" | "chat">("proyectos");
  const [devTab, setDevTab] = useState<"tickets" | "tokens" | "cicd" | "chat">("tickets");
  const [advisorTab, setAdvisorTab] = useState<"pipeline" | "clientes" | "comisiones" | "cotizador">("pipeline");
  const [partnerTab, setPartnerTab] = useState<"finanzas" | "gastos" | "comisiones" | "auditoria">("finanzas");

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

            {/* TAB 4: Chat Directo */}
            {clientTab === "chat" && (
              <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white uppercase font-mono">
                    Canal Directo de Ingeniería & Diseño
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                    Sofía & Iván En Línea
                  </span>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#FF3858]/10 border border-[#FF3858]/30 max-w-lg">
                    <span className="text-[10px] font-bold text-[#FF3858] font-mono block mb-1">SOFÍA (UX/UI):</span>
                    <p className="text-xs text-gray-200">
                      Hola Alejandro, terminamos las 18 pantallas del flujo de pedidos. ¿Pudiste revisar el prototipo en Figma?
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 max-w-lg">
                    <span className="text-[10px] font-bold text-[#00D1FF] font-mono block mb-1">IVÁN (TECH):</span>
                    <p className="text-xs text-gray-200">
                      Y la base de datos PostgreSQL ya está conectada al cluster de WebSockets para el rastreo GPS en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
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
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PERFIL EXCLUSIVO: ASESOR COMERCIAL (VENTAS) */}
        {/* ========================================================================= */}
        {currentUser?.role === "asesor" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Advisor Greeting Card */}
            <div className="rounded-[32px] bg-gradient-to-r from-[#00D1FF]/15 via-blue-950/20 to-black/60 border border-[#00D1FF]/30 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-xs font-mono text-[#00D1FF] font-bold uppercase">
                  <span>PANEL COMERCIAL • INNOCENTIA</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Bienvenido, {advisorData.name}
                </h2>
                <p className="text-sm text-gray-300 font-light">
                  Rol: <strong className="text-white">{advisorData.role}</strong> • Cierres del Mes:{" "}
                  <strong className="text-emerald-400">{advisorData.closedDeals} proyectos</strong>
                </p>
              </div>

              {/* Metrics Summary */}
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-black/80 border border-white/15 text-center space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Ventas del Mes</span>
                  <span className="text-2xl font-black text-[#00D1FF] font-mono block">{advisorData.monthSales}</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/30 text-center space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Comisiones Ganadas (10%)</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono block">{advisorData.earnedCommissions}</span>
                </div>
              </div>
            </div>

            {/* Pipeline Table */}
            <div className="bg-black/80 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl space-y-6 text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white uppercase font-mono">Pipeline Activo de Prospectos</h3>
                <span className="text-xs text-gray-400 font-mono">4 Negociaciones en curso</span>
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
          </div>
        )}
      </div>
    </main>
  );
}
