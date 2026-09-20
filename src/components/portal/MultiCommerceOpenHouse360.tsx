"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
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
  Crown,
  Server,
  AlertCircle,
  Calendar,
  Bell,
  UserPlus,
  Link2,
  Trash2,
  Edit3,
  Check,
  Plus,
  Share2,
  Key,
  Flame,
  RotateCcw,
  Mail,
  Camera,
  Settings,
  ExternalLink,
  Smartphone,
  LayoutGrid,
  MapPin,
  Search,
  CheckCircle2,
  Phone,
  Copy,
} from "../../lib/icons";

interface InvestorLead {
  id: string;
  name: string;
  contact: string;
  location: string;
  scoreTag: string;
  scoreColor: string;
  summary: string;
  activeInterest: string;
  status: string;
}

export default function MultiCommerceOpenHouse360() {
  const [activeTab, setActiveTab] = useState<string>("panel");
  const [activeDemoTab, setActiveDemoTab] = useState<"multicommerce" | "axana" | "openhouse">("openhouse");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "ia", text: "¡Hola Eduardo! Soy tu Asistente MultiChat IA de Open House 360. Tienes 3 inversionistas de alta prioridad y 14 desarrollos activos hoy en la península. ¿En qué te puedo apoyar?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Selected Lot / Development
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<string | null>(null);

  const investors: InvestorLead[] = [
    {
      id: "INV-01",
      name: "Grupo Inmobiliario Bosques & Asesores",
      contact: "Lic. Fernando Alarcón • Director de Inversiones & Desarrollos",
      location: "CDMX",
      scoreTag: "HOT +96%",
      scoreColor: "bg-red-500/20 text-red-400 border-red-500/40",
      summary: "Alta intención de compra: Cita Open House VIP agendada para este sábado. Solicitó borrador notarial.",
      activeInterest: "$18,500,000 MXN",
      status: "Cita Notarial Programada"
    },
    {
      id: "INV-02",
      name: "Inversiones Peninsulares & Riviera Maya",
      contact: "Dra. Mónica Silva • Fideicomiso Familiar & Inversiones Turísticas",
      location: "Cancún",
      scoreTag: "WARM +88%",
      scoreColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      summary: "Oportunidad de Inversión: Presentación de propuesta con ROI estimado 12% anual por renta vacacional.",
      activeInterest: "$14,200,000 MXN",
      status: "Propuesta de ROI Enviada"
    },
    {
      id: "INV-03",
      name: "Desarrollos Industriales & Residenciales N.L.",
      contact: "Ing. Carlos Sada • CFO & Inversionista Principal",
      location: "Monterrey",
      scoreTag: "SEGUIMIENTO +78%",
      scoreColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      summary: "Seguimiento activo: Recorrido virtual 360° realizado. Esperando dictamen de crédito hipotecario.",
      activeInterest: "$6,800,000 MXN",
      status: "Crédito en Validación"
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ia",
          text: `Entendido. He registrado la solicitud para "${userText}". Jessica Torre (VEN-JESS-101) y el equipo técnico de Open House 360 han sido notificados.`
        }
      ]);
    }, 600);
  };

  const handleCopyB2BLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://innocentia.tech/demo/openhouse");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070B] text-slate-100 font-sans antialiased flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* ========================================================================= */}
      {/* TOP HEADER MULTICOMMERCE BASE / MULTI-ENVIRONMENT */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#0A0D14]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Context Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-[#00D1FF] flex items-center justify-center text-white font-black text-xs shadow-md">
              M
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">MultiCommerce</span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[9px] font-mono font-black uppercase">
                BASE
              </span>
            </div>
          </div>

          {/* Business Unit Context Dropdown & Official Pills */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase leading-none">
                  EVENTOS & HOSPEDAJE & EXCLUSIVAS
                </span>
                <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                  Venta de Desarrollos Residenciales, Recorridos 360°, Open House VIP & Brokerage
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Eventos & Hospedaje (Spa, Canchas & Villas)</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DEMO OFICIAL OPEN HOUSE 360</span>
            </div>
          </div>
        </div>

        {/* Center/Right: Multi-Platform Demos Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center bg-black/50 p-1 rounded-2xl border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveDemoTab("multicommerce")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDemoTab === "multicommerce"
                  ? "bg-white/15 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MultiCommerce</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDemoTab("axana")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDemoTab === "axana"
                  ? "bg-blue-600 text-white shadow-md font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Demo AXANA</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDemoTab("openhouse")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDemoTab === "openhouse"
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>🏝️</span>
              <span className="font-black">Demo OPEN HOUSE</span>
            </button>
          </div>

          {/* Quick B2B Share Link */}
          <button
            type="button"
            onClick={handleCopyB2BLink}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden md:inline">{copiedLink ? "¡Copiado!" : "Link B2B"}</span>
          </button>

          {/* Notifications */}
          <div className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-mono font-bold flex items-center justify-center">
              3
            </span>
          </div>

          {/* User Profile */}
          <Link
            href="/portal?user=eduardo"
            className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-black font-black flex items-center justify-center text-xs">
              EC
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-bold text-white block leading-tight">Perfil Activo</span>
              <span className="text-[10px] font-mono text-emerald-400 block">Admin • Open House</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN LAYOUT: SIDEBAR + 360 DASHBOARD */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-64 xl:w-72 bg-[#090C12] border-r border-white/10 p-4 hidden md:flex flex-col justify-between overflow-y-auto scrollbar-thin">
          <div className="space-y-4">
            {/* Top Role Badge Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  PERFIL: DIRECTOR GENERAL
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h4 className="text-xs font-bold text-white mt-1">
                Eventos & Hospedaje (Spa, Canchas & Villas)
              </h4>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                Agenda de citas, reservas por hora/noche y gestión de espacios.
              </p>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("panel")}
                className={`w-full px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "panel"
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutGrid className="w-4 h-4 text-emerald-400" />
                  <span>Panel General</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  360°
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pos")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "pos" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>Puntos de Venta (POS)</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">Ventas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reservaciones")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "reservaciones" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Reservaciones & Villas</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">Citas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("inventario")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "inventario" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-gray-400" />
                  <span>Inventario & Stock</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">Stock</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("catalogo")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "catalogo" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Catálogo de Propiedades</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("logistica")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "logistica" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Logística & Recorridos</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">Envíos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("vendedores")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "vendedores" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>Vendedores & Comisiones</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">KAM</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("facturacion")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "facturacion" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>Facturación 4.0 & Cobros</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">SAT</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("creditos")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "creditos" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Calendario de Créditos</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-mono">30 Días</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("finanzas")}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "finanzas" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <PieChart className="w-4 h-4 text-gray-400" />
                  <span>Finanzas & Cobranza</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Mis Negocios</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                3
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono mt-1.5 text-center">
              MultiCommerce 360 • Eventos & Hospedaje (Spa, Canchas & Villas)
            </p>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 text-left">
          {/* ========================================================================= */}
          {/* HERO BANNER: OPEN HOUSE 360 — MATRIZ DESARROLLOS & EXCLUSIVAS */}
          {/* ========================================================================= */}
          <div className="relative rounded-[32px] p-6 sm:p-8 bg-gradient-to-r from-[#0C1412] via-[#09110F] to-[#0D1814] border border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    OPEN HOUSE 360 • ECOSISTEMA INMOBILIARIO & DESARROLLOS
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-black font-black text-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    OH
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tracking-tight">
                      OPEN HOUSE 360 — Matriz Desarrollos & Exclusivas
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-300 font-mono mt-1">
                      Venta de Desarrollos Residenciales, Recorridos 360°, Open House VIP & Brokerage
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("catalogo")}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all cursor-pointer"
                >
                  <span>🍰 Catálogo de Propiedades VIP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("reservaciones")}
                  className="px-5 py-3 rounded-2xl bg-black/60 hover:bg-black/90 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Citas & Recorridos 360° VIP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4 LARGE KPI CARDS */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="p-5 rounded-3xl bg-[#0B0E14] border border-white/10 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Ventas & Enganches</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                  $1,280,000 MXN
                </div>
                <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1 mt-1 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +35% vs mes anterior
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-3xl bg-[#0B0E14] border border-white/10 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Proyectos & Torres Activas</span>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  14 Desarrollos
                </div>
                <span className="text-[11px] font-mono text-gray-400 block mt-1">
                  CDMX, Cancún & Monterrey
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-3xl bg-[#0B0E14] border border-white/10 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Asistencia Open House</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight">
                  98.2% Confirmada
                </div>
                <span className="text-[11px] font-mono text-gray-400 block mt-1">
                  Recorridos Presenciales & VR
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-3xl bg-[#0B0E14] border border-white/10 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Exclusivas Residenciales</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300 tracking-tight">
                  42 Propiedades
                </div>
                <span className="text-[11px] font-mono text-gray-400 block mt-1">
                  Pent-houses, Villas & Lofts
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* REAL ESTATE INTELLIGENCE MATRIX */}
          {/* ========================================================================= */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#090D14] border border-white/10 space-y-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider">
                    REAL ESTATE INTELLIGENCE MATRIX
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    ALGORITMO ACTIVO
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white font-mono mt-1">
                  Priorización Automática de Inversionistas & Brokers VIP
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Calculado en tiempo real con recorridos 360°, cotizaciones de enganche y citas notariales programadas.
                </p>
              </div>

              <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                3 Inversionistas Monitoreados
              </span>
            </div>

            {/* 3 Investor Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {investors.map((inv) => (
                <div
                  key={inv.id}
                  className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3.5 text-xs font-mono flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${inv.scoreColor}`}>
                        {inv.scoreTag}
                      </span>
                      <span className="text-gray-400 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" />
                        {inv.location}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-white text-sm leading-snug">{inv.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-1">{inv.contact}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-300 leading-relaxed">
                      <span className="mr-1">📁</span> {inv.summary}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Interés Activo:</span>
                    <span className="font-black text-emerald-400 text-sm">{inv.activeInterest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Catalog Showcase in Open House 360 */}
          {activeTab === "catalogo" && (
            <div className="p-6 rounded-3xl bg-[#090D14] border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white font-mono uppercase">
                Catálogo de Desarrollos & Lotes en Exclusiva
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#141A24] border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white">Costa Esmeralda Beach Club • Telchac</h5>
                    <p className="text-xs text-gray-400">Lote 350 m² • 4 min del mar</p>
                    <span className="text-emerald-400 font-mono font-black text-sm">$295,000 MXN</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    Disponible
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#141A24] border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white">Dzidzantún Oasis Country</h5>
                    <p className="text-xs text-gray-400">Lote 450 m² • Inversión sin buró</p>
                    <span className="text-emerald-400 font-mono font-black text-sm">$198,000 MXN</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    Disponible
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM-RIGHT MULTICHAT IA WIDGET (IVÁN & SOFÍA) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isChatOpen ? (
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-xs">
              🤖
            </div>
            <span>MultiChat IA</span>
            <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px]">AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-3xl bg-[#090D14] border border-indigo-500/40 shadow-2xl overflow-hidden flex flex-col text-xs font-mono">
            <div className="p-4 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🤖</span>
                <div>
                  <h4 className="font-bold text-white">MultiChat IA • Open House 360</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Asistente Iván & Sofía Activo
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white text-base px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 h-64 overflow-y-auto bg-black/40">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.sender === "ia"
                      ? "bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 self-start"
                      : "bg-emerald-500 text-black font-bold self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex items-center gap-2 bg-[#090D14]">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Escribe tu consulta o comando..."
                className="flex-1 px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
              >
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
