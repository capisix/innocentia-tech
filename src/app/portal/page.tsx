"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import VendorContractModal from "../../components/portal/VendorContractModal";
import ProjectTeamFeedAndChat from "../../components/portal/ProjectTeamFeedAndChat";
import ProjectCreationForm from "../../components/portal/ProjectCreationForm";
import AuthLoginModal, { RoleType, ROLE_PRESETS } from "../../components/portal/AuthLoginModal";
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
} from "../../lib/icons";

interface FinanceRecord {
  id: string;
  type: "ingreso" | "gasto" | "servicio";
  concept: string;
  category: string;
  amount: number;
  date: string;
  status: "pagado" | "pendiente" | "recurrente";
  dueDate?: string;
  provider?: string;
}

interface ServerService {
  id: string;
  name: string;
  type: "Servidor Cloud" | "Hosting" | "Dominio" | "Base de Datos" | "API AI";
  provider: string;
  costMonthly: number;
  renewalDate: string;
  daysRemaining: number;
  status: "optimo" | "proximo_a_vencer" | "critico";
  autoDebit: boolean;
}

interface AssignedProject {
  id: string;
  name: string;
  client: string;
  clientEmail: string;
  sellerId: string;
  sellerName: string;
  devLead: string;
  uxLead: string;
  devopsLead?: string;
  status: "En Desarrollo" | "Por Iniciar" | "Completado" | "En Revisión";
  progress: number;
  currentSprint: string;
  budget: number;
  paidAmount: number;
  targetDate: string;
  unreadAlerts: number;
}

interface SellerLead {
  id: string;
  clientName: string;
  company: string;
  phone: string;
  status: "Formulario Enviado" | "En Cotización" | "Aprobado - En Desarrollo" | "Cerrado";
  date: string;
  estimatedBudget: string;
  hasNewNotification: boolean;
}

function PortalMainContent() {
  const searchParams = useSearchParams();
  const urlRole = searchParams.get("role") as RoleType | null;

  // Active Role State
  const [activeRole, setActiveRole] = useState<RoleType>("ceo");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize from URL or LocalStorage
  useEffect(() => {
    if (urlRole && ["ceo", "socio", "usuario", "dev", "asesor"].includes(urlRole)) {
      setActiveRole(urlRole);
    } else if (typeof window !== "undefined") {
      const saved = localStorage.getItem("innocentia_active_role") as RoleType | null;
      if (saved && ["ceo", "socio", "usuario", "dev", "asesor"].includes(saved)) {
        setActiveRole(saved);
      }
    }
  }, [urlRole]);

  const handleRoleChange = (newRole: RoleType) => {
    setActiveRole(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_active_role", newRole);
    }
  };

  const currentPreset = ROLE_PRESETS.find((p) => p.role === activeRole) || ROLE_PRESETS[0];

  // Tab States per Role
  const [ceoTab, setCeoTab] = useState<"proyectos" | "asignacion" | "finanzas" | "chat" | "alertas">("proyectos");
  const [partnerTab, setPartnerTab] = useState<"finanzas" | "proyectos" | "servidores" | "gastos" | "chat">("finanzas");
  const [clientTab, setClientTab] = useState<"proyectos" | "finanzas" | "chat" | "solicitudes">("proyectos");
  const [devTab, setDevTab] = useState<"mis_proyectos" | "sprints" | "entregables" | "chat">("mis_proyectos");
  const [advisorTab, setAdvisorTab] = useState<"leads_formulario" | "status_proyectos" | "comisiones" | "chat">("leads_formulario");

  // ==========================================
  // SHARED DATABASE MOCK STATE
  // ==========================================

  // Projects State
  const [projects, setProjects] = useState<AssignedProject[]>([
    {
      id: "PRJ-01",
      name: "Clínica Médica AI - Portal de Diagnósticos",
      client: "Dra. Mariana Valdés",
      clientEmail: "mariana@clinicamedica.ai",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Ing. Rodrigo Pacheco",
      uxLead: "Sofía (Innocentia Design)",
      devopsLead: "Iván (Innocentia Tech)",
      status: "En Desarrollo",
      progress: 78,
      currentSprint: "Sprint 3: Módulo de IA y Visor DICOM",
      budget: 185000,
      paidAmount: 120000,
      targetDate: "28 de Septiembre de 2026",
      unreadAlerts: 2,
    },
    {
      id: "PRJ-02",
      name: "Gourmet Express - App Móvil Multi-Restaurante",
      client: "Lic. Roberto Garza",
      clientEmail: "roberto@gourmetexpress.mx",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Iván (Software Architect)",
      uxLead: "Sofía (Innocentia Design)",
      devopsLead: "Ing. Rodrigo Pacheco",
      status: "En Desarrollo",
      progress: 65,
      currentSprint: "Sprint 4: Pasarela Stripe & GPS en Vivo",
      budget: 240000,
      paidAmount: 160000,
      targetDate: "15 de Octubre de 2026",
      unreadAlerts: 1,
    },
    {
      id: "PRJ-03",
      name: "LogisTrack ERP - Cadena de Suministro",
      client: "Ing. Fernando Castro",
      clientEmail: "fcastro@logistrack.com",
      sellerId: "usr_sales_02",
      sellerName: "Elena Ramos",
      devLead: "Sin Asignar",
      uxLead: "Sofía (Innocentia Design)",
      status: "Por Iniciar",
      progress: 15,
      currentSprint: "Sprint 1: Arquitectura de Base de Datos",
      budget: 310000,
      paidAmount: 93000,
      targetDate: "20 de Noviembre de 2026",
      unreadAlerts: 3,
    },
    {
      id: "PRJ-04",
      name: "Ikal Chukum - E-commerce de Acabados de Lujo",
      client: "Arq. Valentina Suárez",
      clientEmail: "valentina@ikalchukum.com",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Ing. Rodrigo Pacheco",
      uxLead: "Sofía (Innocentia Design)",
      status: "Completado",
      progress: 100,
      currentSprint: "Entrega Final y Soporte Post-Lanzamiento",
      budget: 95000,
      paidAmount: 95000,
      targetDate: "10 de Agosto de 2026",
      unreadAlerts: 0,
    },
  ]);

  // CEO Project Assignment Modal State
  const [selectedProjectForAssign, setSelectedProjectForAssign] = useState<AssignedProject | null>(null);
  const [assignDevLead, setAssignDevLead] = useState("");
  const [assignUxLead, setAssignUxLead] = useState("");
  const [assignDevopsLead, setAssignDevopsLead] = useState("");
  const [assignStatus, setAssignStatus] = useState<any>("En Desarrollo");

  const openAssignModal = (proj: AssignedProject) => {
    setSelectedProjectForAssign(proj);
    setAssignDevLead(proj.devLead);
    setAssignUxLead(proj.uxLead);
    setAssignDevopsLead(proj.devopsLead || "Iván (Innocentia Tech)");
    setAssignStatus(proj.status);
  };

  const handleSaveAssignment = () => {
    if (!selectedProjectForAssign) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectForAssign.id
          ? {
              ...p,
              devLead: assignDevLead,
              uxLead: assignUxLead,
              devopsLead: assignDevopsLead,
              status: assignStatus,
            }
          : p
      )
    );
    setSelectedProjectForAssign(null);
  };

  // Finance Records (Socio / CEO)
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([
    {
      id: "FIN-01",
      type: "ingreso",
      concept: "Anticipo 60% - Clínica Médica AI (Fase 2)",
      category: "Proyectos Software",
      amount: 120000,
      date: "01 de Septiembre de 2026",
      status: "pagado",
    },
    {
      id: "FIN-02",
      type: "ingreso",
      concept: "Pago Sprint 3 - Gourmet Express",
      category: "Proyectos Software",
      amount: 80000,
      date: "05 de Septiembre de 2026",
      status: "pagado",
    },
    {
      id: "FIN-03",
      type: "gasto",
      concept: "AWS Cloud Infrastructure - Servidores Producción",
      category: "Servidores & Hosting",
      amount: 14500,
      date: "02 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "15 de Septiembre de 2026",
      provider: "Amazon Web Services",
    },
    {
      id: "FIN-04",
      type: "gasto",
      concept: "Vercel Enterprise & Cloudflare DNS Pro",
      category: "Servidores & Hosting",
      amount: 6200,
      date: "04 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "20 de Septiembre de 2026",
      provider: "Vercel Inc.",
    },
    {
      id: "FIN-05",
      type: "gasto",
      concept: "Comisión Venta - Carlos Mendoza (Clínica Médica)",
      category: "Comisiones Asesores",
      amount: 22200,
      date: "03 de Septiembre de 2026",
      status: "pagado",
    },
    {
      id: "FIN-06",
      type: "servicio",
      concept: "OpenAI API & Anthropic Claude Tokens",
      category: "IA & LLM APIs",
      amount: 8900,
      date: "07 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "30 de Septiembre de 2026",
      provider: "OpenAI LLC",
    },
  ]);

  // New Finance Movement Modal State
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [finType, setFinType] = useState<"ingreso" | "gasto" | "servicio">("gasto");
  const [finConcept, setFinConcept] = useState("");
  const [finCategory, setFinCategory] = useState("Servidores & Hosting");
  const [finAmount, setFinAmount] = useState<number>(5000);
  const [finDueDate, setFinDueDate] = useState("30 de Septiembre de 2026");
  const [finProvider, setFinProvider] = useState("");

  const handleAddFinanceRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finConcept.trim() || finAmount <= 0) return;

    const newRec: FinanceRecord = {
      id: "FIN-" + Date.now().toString().slice(-4),
      type: finType,
      concept: finConcept,
      category: finCategory,
      amount: Number(finAmount),
      date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
      status: finType === "ingreso" ? "pagado" : "recurrente",
      dueDate: finDueDate,
      provider: finProvider || undefined,
    };

    setFinanceRecords((prev) => [newRec, ...prev]);
    setIsFinanceModalOpen(false);
    setFinConcept("");
    setFinAmount(5000);
  };

  const handleDeleteFinanceRecord = (id: string) => {
    setFinanceRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Cloud Servers, Hosting & Expiration Monitor State
  const [servers, setServers] = useState<ServerService[]>([
    {
      id: "SRV-01",
      name: "Cluster AWS ECS & Aurora PostgreSQL",
      type: "Servidor Cloud",
      provider: "Amazon Web Services (us-east-1)",
      costMonthly: 14500,
      renewalDate: "15 de Septiembre de 2026",
      daysRemaining: 6,
      status: "proximo_a_vencer",
      autoDebit: true,
    },
    {
      id: "SRV-02",
      name: "innocentia.tech & Subdominios SSL",
      type: "Dominio",
      provider: "Namecheap / Cloudflare Enterprise",
      costMonthly: 1200,
      renewalDate: "14 de Diciembre de 2026",
      daysRemaining: 96,
      status: "optimo",
      autoDebit: true,
    },
    {
      id: "SRV-03",
      name: "Vercel Edge Network Next.js 15",
      type: "Hosting",
      provider: "Vercel Enterprise",
      costMonthly: 6200,
      renewalDate: "20 de Septiembre de 2026",
      daysRemaining: 11,
      status: "optimo",
      autoDebit: true,
    },
    {
      id: "SRV-04",
      name: "OpenAI GPT-4o & Embeddings RAG Cluster",
      type: "API AI",
      provider: "OpenAI Enterprise",
      costMonthly: 8900,
      renewalDate: "30 de Septiembre de 2026",
      daysRemaining: 21,
      status: "optimo",
      autoDebit: true,
    },
    {
      id: "SRV-05",
      name: "Supabase Vector Storage (Clínica Médica)",
      type: "Base de Datos",
      provider: "Supabase Inc.",
      costMonthly: 3400,
      renewalDate: "10 de Septiembre de 2026",
      daysRemaining: 1,
      status: "critico",
      autoDebit: false,
    },
  ]);

  // Seller Leads & Linked Form System
  const [sellerLeads, setSellerLeads] = useState<SellerLead[]>([
    {
      id: "LEAD-101",
      clientName: "Dra. Mariana Valdés",
      company: "Clínica Médica AI",
      phone: "+52 999 555 1234",
      status: "Aprobado - En Desarrollo",
      date: "Hace 3 días",
      estimatedBudget: "$185,000 MXN",
      hasNewNotification: true,
    },
    {
      id: "LEAD-102",
      clientName: "Lic. Roberto Garza",
      company: "Gourmet Express Delivery",
      phone: "+52 81 444 9876",
      status: "Aprobado - En Desarrollo",
      date: "Hace 1 semana",
      estimatedBudget: "$240,000 MXN",
      hasNewNotification: false,
    },
    {
      id: "LEAD-103",
      clientName: "Lic. Andrea Morales",
      company: "Fintech Seguros MX",
      phone: "+52 55 111 8899",
      status: "Formulario Enviado",
      date: "Hoy, 10:15 AM",
      estimatedBudget: "$150,000 MXN",
      hasNewNotification: true,
    },
  ]);

  // Vendor Referral Link
  const vendorReferralLink = "https://innocentia.tech/crear-proyecto?ref=VEND_CARLOS";

  const handleCopyVendorLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(vendorReferralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Commission Calculations
  const totalIncome = financeRecords.filter((r) => r.type === "ingreso").reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = financeRecords.filter((r) => r.type === "gasto" || r.type === "servicio").reduce((sum, r) => sum + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white pb-24">
      {/* Background Animated Canvas */}
      <AmbientLivingCanvas />

      {/* ========================================================================= */}
      {/* TOP PORTAL NAVIGATION BAR WITH ACTIVE ROLE & FAST ROLE SWITCHER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#07070E]/90 backdrop-blur-2xl border-b border-white/10 py-3.5 px-4 sm:px-8 shadow-xl">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Portal Breadcrumb */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <img
                src="/images/logo_official_header.png?v=2"
                alt="INNOCENTIA"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SISTEMA DE CONTROL MULTI-ROL</span>
            </span>
          </div>

          {/* Role Badges & Quick Switcher Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden lg:block mr-1">
              Perfil:
            </span>

            {ROLE_PRESETS.map((preset) => {
              const isCurrent = activeRole === preset.role;
              const IconComp = preset.icon;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleRoleChange(preset.role)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? "bg-white/20 text-white border border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.3)] scale-105"
                      : "bg-white/[0.04] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isCurrent ? "text-[#00D1FF]" : "text-gray-400"}`} />
                  <span>{preset.badge}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white transition-all cursor-pointer ml-1"
              title="Cambiar sesión / Ver todos los roles"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER CONTENT */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
        {/* User Identity Header Card */}
        <div className="relative p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden mb-8 text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF3858]/10 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_30px_rgba(255,56,88,0.3)] flex-shrink-0">
                <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                  <currentPreset.icon className="w-8 h-8 text-[#00D1FF]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`text-[10px] font-mono px-3 py-0.5 rounded-full border ${currentPreset.badgeColor}`}>
                    {currentPreset.badge.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTENTICADO
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                  {currentPreset.defaultUser.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5">
                  {currentPreset.defaultUser.roleTitle} • {currentPreset.defaultUser.email}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar on Header */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">Proyectos Activos</span>
                <span className="text-lg font-black text-white">{projects.filter((p) => p.status === "En Desarrollo").length}</span>
              </div>

              {activeRole === "ceo" || activeRole === "socio" ? (
                <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Balance Neto</span>
                  <span className="text-lg font-black text-emerald-400">${netProfit.toLocaleString()} MXN</span>
                </div>
              ) : activeRole === "asesor" ? (
                <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Comisiones Acumuladas</span>
                  <span className="text-lg font-black text-[#FF3858]">$64,200 MXN</span>
                </div>
              ) : (
                <div className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Entregables Listos</span>
                  <span className="text-lg font-black text-[#00D1FF]">12 de 16</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-gray-400" />
                <span>Cambiar Rol</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CEO (DIRECTOR GENERAL / SUPER ADMIN) */}
        {/* ========================================================================= */}
        {activeRole === "ceo" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Sub-tabs for CEO */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setCeoTab("proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "proyectos"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Todos los Proyectos ({projects.length})</span>
              </button>

              <button
                onClick={() => setCeoTab("asignacion")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "asignacion"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Designación de Técnicos</span>
              </button>

              <button
                onClick={() => setCeoTab("finanzas")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "finanzas"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Supervisión Financiera Global</span>
              </button>

              <button
                onClick={() => setCeoTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "chat"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chats Multi-Equipo</span>
              </button>
            </div>

            {/* CEO Tab 1: Proyectos Globales */}
            {ceoTab === "proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 hover:border-[#00D1FF]/50 transition-all shadow-xl space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#00D1FF] font-bold block">{proj.id}</span>
                        <h3 className="text-lg font-black text-white mt-0.5">{proj.name}</h3>
                        <p className="text-xs text-gray-400">Cliente: {proj.client} ({proj.clientEmail})</p>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                          proj.status === "Completado"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : proj.status === "Por Iniciar"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                            : "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40"
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Avance General</span>
                        <span className="text-white font-bold">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <p className="text-[11px] font-mono text-gray-400 pt-1">
                        📍 {proj.currentSprint}
                      </p>
                    </div>

                    {/* Team Assignments */}
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dev Lead:</span>
                        <span className="text-white font-bold">{proj.devLead}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">UX/UI Lead:</span>
                        <span className="text-white font-bold">{proj.uxLead}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Vendedor Asignado:</span>
                        <span className="text-[#FF3858] font-bold">{proj.sellerName}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-mono text-gray-300">
                        Presupuesto: <strong className="text-emerald-400">${proj.budget.toLocaleString()} MXN</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => openAssignModal(proj)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#00D1FF] hover:text-black border border-white/20 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Reasignar Equipo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CEO Tab 2: Designación de Técnicos */}
            {ceoTab === "asignacion" && (
              <div className="p-8 rounded-[32px] bg-[#07070E] border border-white/15 text-left space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-400" />
                      <span>Mesa Directiva: Asignación de Roles por Proyecto</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Como CEO, puedes definir los líderes de arquitectura, ingeniería y diseño asignados a cada cliente.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/15 text-gray-400 uppercase">
                        <th className="py-3 px-4">Proyecto</th>
                        <th className="py-3 px-4">Cliente</th>
                        <th className="py-3 px-4">Tech Lead</th>
                        <th className="py-3 px-4">UX Lead</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {projects.map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.02]">
                          <td className="py-4 px-4 font-bold text-white">{p.name}</td>
                          <td className="py-4 px-4 text-gray-300">{p.client}</td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 font-bold">
                              {p.devLead}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-[#FF3858]/10 text-[#FF3858] border border-[#FF3858]/30 font-bold">
                              {p.uxLead}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400">{p.status}</td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => openAssignModal(p)}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00D1FF] hover:text-black text-xs font-bold text-white transition-all cursor-pointer"
                            >
                              Designar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CEO Tab 3: Finanzas Ejecutivas */}
            {ceoTab === "finanzas" && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Ingresos Facturados</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">${totalIncome.toLocaleString()} MXN</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 block">Cobros a clientes en sprints</span>
                  </div>
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Egresos & Servidores</span>
                    <span className="text-2xl font-black text-rose-400 mt-1 block">${totalExpenses.toLocaleString()} MXN</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 block">Infraestructura, APIs & Comisiones</span>
                  </div>
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Utilidad Neta</span>
                    <span className="text-2xl font-black text-[#00D1FF] mt-1 block">${netProfit.toLocaleString()} MXN</span>
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Margen de rentabilidad: 74%</span>
                  </div>
                </div>

                {/* Movements List */}
                <div className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                  <h3 className="text-base font-black text-white uppercase">Historial de Movimientos</h3>
                  <div className="space-y-2">
                    {financeRecords.map((r) => (
                      <div key={r.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">{r.concept}</span>
                          <span className="text-[10px] font-mono text-gray-400">{r.category} • {r.date}</span>
                        </div>
                        <span className={`text-sm font-black font-mono ${r.type === "ingreso" ? "text-emerald-400" : "text-rose-400"}`}>
                          {r.type === "ingreso" ? "+" : "-"}${r.amount.toLocaleString()} MXN
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CEO Tab 4: Chats */}
            {ceoTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="socio" userName={currentPreset.defaultUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SOCIO / CO-FUNDADOR (FINANZAS, SERVIDORES & PROYECTOS) */}
        {/* ========================================================================= */}
        {activeRole === "socio" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Sub-tabs for Partner */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setPartnerTab("finanzas")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "finanzas"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Zona de Finanzas & Gastos</span>
              </button>

              <button
                onClick={() => setPartnerTab("servidores")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "servidores"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Server className="w-4 h-4" />
                <span>Servidores & Caducidades</span>
              </button>

              <button
                onClick={() => setPartnerTab("proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "proyectos"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Proyectos & Asignaciones</span>
              </button>

              <button
                onClick={() => setPartnerTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "chat"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chats de Proyectos</span>
              </button>
            </div>

            {/* Partner Tab 1: Finanzas & Gastos */}
            {partnerTab === "finanzas" && (
              <div className="space-y-6">
                {/* Financial Overview Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#07070E] border border-white/15">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">Ingresos Totales</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">${totalIncome.toLocaleString()} MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#07070E] border border-white/15">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">Gastos Operativos</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">${totalExpenses.toLocaleString()} MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#07070E] border border-white/15">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">Utilidad Neta</span>
                    <span className="text-xl font-black text-purple-400 mt-1 block">${netProfit.toLocaleString()} MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#07070E] border border-white/15">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">Próximos Cortes</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">3 en 15 días</span>
                  </div>
                </div>

                {/* Interactive Movements Table with Add/Delete/Edit */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <span>Libro Contable de Movimientos</span>
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Agrega, edita y gestiona gastos de nómina, infraestructura y cobros de clientes.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFinanceModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-[#00D1FF] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar Movimiento</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/15 text-gray-400 uppercase">
                          <th className="py-3 px-3">Tipo</th>
                          <th className="py-3 px-3">Concepto</th>
                          <th className="py-3 px-3">Categoría</th>
                          <th className="py-3 px-3">Fecha / Corte</th>
                          <th className="py-3 px-3 text-right">Monto</th>
                          <th className="py-3 px-3 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {financeRecords.map((r) => (
                          <tr key={r.id} className="hover:bg-white/[0.02]">
                            <td className="py-3 px-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  r.type === "ingreso"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                }`}
                              >
                                {r.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-bold text-white">{r.concept}</td>
                            <td className="py-3 px-3 text-gray-400">{r.category}</td>
                            <td className="py-3 px-3 text-gray-300">{r.dueDate || r.date}</td>
                            <td className={`py-3 px-3 text-right font-black ${r.type === "ingreso" ? "text-emerald-400" : "text-rose-400"}`}>
                              {r.type === "ingreso" ? "+" : "-"}${r.amount.toLocaleString()} MXN
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteFinanceRecord(r.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Partner Tab 2: Monitor de Servidores y Caducidades */}
            {partnerTab === "servidores" && (
              <div className="space-y-6">
                <div className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                        <Server className="w-5 h-5 text-[#00D1FF]" />
                        <span>Vigencia de Servidores, Hosting & Dominios</span>
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Monitoreo activo de cortes automáticos y fechas de renovación de infraestructura cloud.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                    {servers.map((srv) => (
                      <div
                        key={srv.id}
                        className={`p-5 rounded-2xl bg-white/[0.02] border transition-all ${
                          srv.status === "critico"
                            ? "border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                            : srv.status === "proximo_a_vencer"
                            ? "border-amber-500/50"
                            : "border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {srv.type}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              srv.status === "critico"
                                ? "bg-rose-500/20 text-rose-300 animate-pulse"
                                : srv.status === "proximo_a_vencer"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }`}
                          >
                            {srv.daysRemaining} días restantes
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white">{srv.name}</h3>
                        <p className="text-xs text-gray-400 mt-1 font-mono">{srv.provider}</p>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">Corte: {srv.renewalDate}</span>
                          <span className="text-white font-bold">${srv.costMonthly.toLocaleString()} /mes</span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-gray-400 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                            {srv.autoDebit ? "Débito Automático" : "Pago Manual"}
                          </span>
                          <span className="text-[#00D1FF] font-bold">Activo 99.9%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Partner Tab 3: Proyectos */}
            {partnerTab === "proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-3">
                    <span className="text-[10px] font-mono text-[#00D1FF] font-bold">{proj.id}</span>
                    <h3 className="text-lg font-black text-white">{proj.name}</h3>
                    <p className="text-xs text-gray-400">Cliente: {proj.client}</p>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-[#00D1FF]" style={{ width: `${proj.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs font-mono pt-2 text-gray-300">
                      <span>Tech Lead: {proj.devLead}</span>
                      <span className="text-emerald-400 font-bold">${proj.budget.toLocaleString()} MXN</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Partner Tab 4: Chats */}
            {partnerTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="socio" userName={currentPreset.defaultUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CLIENTE (PROYECTOS EN VIVO, FINANZAS & CHAT TÉCNICO) */}
        {/* ========================================================================= */}
        {activeRole === "usuario" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Sub-tabs for Client */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setClientTab("proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  clientTab === "proyectos"
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Mi Proyecto en Desarrollo</span>
              </button>

              <button
                onClick={() => setClientTab("finanzas")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  clientTab === "finanzas"
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Mis Finanzas & Pagos</span>
              </button>

              <button
                onClick={() => setClientTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  clientTab === "chat"
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directo con Desarrolladores</span>
              </button>
            </div>

            {/* Client Tab 1: Live Project Status */}
            {clientTab === "proyectos" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-mono text-[#00D1FF] font-bold uppercase">PRJ-01 • ACTIVO</span>
                    <h2 className="text-2xl font-black text-white mt-1">Clínica Médica AI - Portal de Diagnósticos</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Fecha estimada de entrega final: <strong className="text-white">28 de Septiembre de 2026</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-400">78%</span>
                    <span className="text-xs font-mono text-gray-400 block">Avance Global</span>
                  </div>
                </div>

                {/* Phased Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold">1. Prototipado UX/UI</span>
                      <span className="text-emerald-400">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-full" />
                    </div>
                    <span className="text-[10px] text-gray-400 block font-mono">Lead: Sofía (Diseño)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold">2. Arquitectura & DB</span>
                      <span className="text-emerald-400">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-full" />
                    </div>
                    <span className="text-[10px] text-gray-400 block font-mono">Lead: Iván (Tech)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold">3. Módulo de IA</span>
                      <span className="text-[#00D1FF]">75%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00D1FF] rounded-full w-[75%]" />
                    </div>
                    <span className="text-[10px] text-gray-400 block font-mono">Lead: Rodrigo Pacheco</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold">4. Pruebas QA & App</span>
                      <span className="text-amber-400">40%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[40%]" />
                    </div>
                    <span className="text-[10px] text-gray-400 block font-mono">En curso</span>
                  </div>
                </div>

                {/* Assigned Tech Leads Contact */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                      DEV
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Equipo de Desarrollo Asignado</span>
                      <span className="text-[11px] text-gray-400 font-mono">Ing. Rodrigo Pacheco (Tech Lead) • Sofía (Design Lead)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClientTab("chat")}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Abrir Chat con el Equipo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Client Tab 2: Finanzas del Cliente */}
            {clientTab === "finanzas" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Estado de Cuenta de mi Proyecto</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Costo Total Contratado</span>
                    <span className="text-2xl font-black text-white mt-1 block">$185,000 MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Total Pagado</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">$120,000 MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Saldo Pendiente (Fase Final)</span>
                    <span className="text-2xl font-black text-amber-400 mt-1 block">$65,000 MXN</span>
                  </div>
                </div>
              </div>
            )}

            {/* Client Tab 3: Chat */}
            {clientTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="usuario" userName={currentPreset.defaultUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: TÉCNICO / DESARROLLADOR */}
        {/* ========================================================================= */}
        {activeRole === "dev" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Sub-tabs for Dev */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setDevTab("mis_proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  devTab === "mis_proyectos"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Mis Proyectos Asignados</span>
              </button>

              <button
                onClick={() => setDevTab("sprints")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  devTab === "sprints"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Sprints & Backlog</span>
              </button>

              <button
                onClick={() => setDevTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  devTab === "chat"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Técnico del Proyecto</span>
              </button>
            </div>

            {/* Dev Projects View */}
            {devTab === "mis_proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects
                  .filter((p) => p.devLead.includes("Rodrigo") || p.devopsLead?.includes("Rodrigo"))
                  .map((proj) => (
                    <div key={proj.id} className="p-6 rounded-[28px] bg-[#07070E] border border-[#00D1FF]/30 space-y-4 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-[#00D1FF] font-bold">{proj.id}</span>
                          <h3 className="text-lg font-black text-white">{proj.name}</h3>
                          <p className="text-xs text-gray-400">Cliente: {proj.client}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] font-mono font-bold">
                          Tu Rol: Tech Lead
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                        <span className="text-xs font-bold text-gray-200 block">{proj.currentSprint}</span>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-[#00D1FF]" style={{ width: `${proj.progress}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-gray-400">
                          <span>Entrega: {proj.targetDate}</span>
                          <span>Avance: {proj.progress}%</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setDevTab("chat")}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#00D1FF] hover:text-black font-bold text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Abrir Chat con el Cliente</span>
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {/* Dev Chat */}
            {devTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="dev" userName={currentPreset.defaultUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: VENDEDOR / ASESOR COMERCIAL (CLIENTES VINCULADOS & ENLACE DE FORMULARIO) */}
        {/* ========================================================================= */}
        {activeRole === "asesor" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Sub-tabs for Seller */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setAdvisorTab("leads_formulario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  advisorTab === "leads_formulario"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Formulario de Clientes Vinculados</span>
              </button>

              <button
                onClick={() => setAdvisorTab("status_proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  advisorTab === "status_proyectos"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Status de Proyectos Vendidos</span>
              </button>

              <button
                onClick={() => setAdvisorTab("comisiones")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  advisorTab === "comisiones"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Mis Comisiones & Ganancias</span>
              </button>

              <button
                onClick={() => setAdvisorTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  advisorTab === "chat"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat con Clientes y Técnicos</span>
              </button>
            </div>

            {/* Seller Tab 1: Form Link Generator & Linked Leads */}
            {advisorTab === "leads_formulario" && (
              <div className="space-y-6">
                {/* Referral Link Box */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#FF3858]/15 via-purple-900/10 to-transparent border border-[#FF3858]/30 backdrop-blur-2xl shadow-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#FF3858] uppercase font-bold tracking-wider">
                        ENLACE PERSONALIZADO DE VENDEDOR
                      </span>
                      <h2 className="text-xl font-black text-white mt-0.5">
                        Envía este formulario a tus clientes
                      </h2>
                      <p className="text-xs text-gray-300 mt-1">
                        Cualquier proyecto que tu cliente registre a través de este enlace quedará automáticamente vinculado a tu ID (<strong>VEND_CARLOS</strong>) y recibirás una notificación al instante.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyVendorLink}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,56,88,0.4)] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedLink ? "¡Enlace Copiado!" : "Copiar Enlace para Cliente"}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs text-gray-300">
                    <span className="truncate">{vendorReferralLink}</span>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold ml-2">Vinculación Activa</span>
                  </div>
                </div>

                {/* Linked Leads Table */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-4">
                  <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FF3858]" />
                    <span>Mis Clientes & Solicitudes Recibidas</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/15 text-gray-400 uppercase">
                          <th className="py-3 px-3">Cliente</th>
                          <th className="py-3 px-3">Empresa</th>
                          <th className="py-3 px-3">Presupuesto</th>
                          <th className="py-3 px-3">Estado</th>
                          <th className="py-3 px-3">Avisos</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sellerLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02]">
                            <td className="py-4 px-3 font-bold text-white">{lead.clientName}</td>
                            <td className="py-4 px-3 text-gray-300">{lead.company}</td>
                            <td className="py-4 px-3 text-emerald-400 font-bold">{lead.estimatedBudget}</td>
                            <td className="py-4 px-3">
                              <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-200 text-[10px] font-bold">
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-4 px-3">
                              {lead.hasNewNotification ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold animate-pulse">
                                  <Bell className="w-3.5 h-3.5" />
                                  <span>Nueva solicitud</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-500">Sin cambios</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Seller Tab 2: Status Proyectos */}
            {advisorTab === "status_proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-[#FF3858] font-bold">{proj.id}</span>
                        <h3 className="text-lg font-black text-white">{proj.name}</h3>
                        <p className="text-xs text-gray-400">Cliente: {proj.client}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Comisión: ${(proj.budget * 0.12).toLocaleString()} MXN
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">Avance de Desarrollo</span>
                        <span className="text-white font-bold">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF]" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono flex justify-between text-gray-300">
                      <span>Tech Lead: {proj.devLead}</span>
                      <span>UX Lead: {proj.uxLead}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Seller Tab 3: Comisiones */}
            {advisorTab === "comisiones" && (
              <div className="p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Tabulador de Comisiones Comerciales</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Comisiones Ganadas</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">$64,200 MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Comisiones por Cobrar</span>
                    <span className="text-2xl font-black text-amber-400 mt-1 block">$37,200 MXN</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 uppercase block">Proyectos Cerrados</span>
                    <span className="text-2xl font-black text-white mt-1 block">4 Proyectos</span>
                  </div>
                </div>
              </div>
            )}

            {/* Seller Tab 4: Chat */}
            {advisorTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="asesor" userName={currentPreset.defaultUser.name} />
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CEO ASSIGNMENT MODAL (DESIGNAR TÉCNICOS) */}
      {/* ========================================================================= */}
      {selectedProjectForAssign && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 text-left">
          <div className="w-full max-w-lg rounded-[32px] bg-[#07070E] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-bold">MESA DIRECTIVA CEO</span>
              <h3 className="text-xl font-black text-white mt-1">Designar Técnicos y Líderes</h3>
              <p className="text-xs text-gray-400 mt-0.5">{selectedProjectForAssign.name}</p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-gray-300 block mb-1.5 font-bold">Líder de Desarrollo (Tech Lead):</label>
                <select
                  value={assignDevLead}
                  onChange={(e) => setAssignDevLead(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                >
                  <option value="Ing. Rodrigo Pacheco" className="bg-black">Ing. Rodrigo Pacheco (Senior Fullstack & AI)</option>
                  <option value="Iván (Software Architect)" className="bg-black">Iván (Innocentia Software Architect)</option>
                  <option value="Ing. Manuel Domínguez" className="bg-black">Ing. Manuel Domínguez (Backend Senior)</option>
                  <option value="Sin Asignar" className="bg-black">Sin Asignar</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1.5 font-bold">Líder de Diseño (UX/UI Lead):</label>
                <select
                  value={assignUxLead}
                  onChange={(e) => setAssignUxLead(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                >
                  <option value="Sofía (Innocentia Design)" className="bg-black">Sofía (Lead UX/UI & Branding)</option>
                  <option value="Lic. Ana Karenina" className="bg-black">Lic. Ana Karenina (Product Designer)</option>
                  <option value="Sin Asignar" className="bg-black">Sin Asignar</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1.5 font-bold">Estado del Proyecto:</label>
                <select
                  value={assignStatus}
                  onChange={(e) => setAssignStatus(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                >
                  <option value="En Desarrollo" className="bg-black">En Desarrollo</option>
                  <option value="Por Iniciar" className="bg-black">Por Iniciar</option>
                  <option value="En Revisión" className="bg-black">En Revisión</option>
                  <option value="Completado" className="bg-black">Completado</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProjectForAssign(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveAssignment}
                className="px-6 py-2.5 rounded-xl bg-[#00D1FF] text-black font-black text-xs uppercase tracking-wider hover:bg-[#33DDFF] transition-all cursor-pointer shadow-lg"
              >
                Guardar Designación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD FINANCE RECORD MODAL (SOCIO / FINANZAS) */}
      {/* ========================================================================= */}
      {isFinanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 text-left">
          <form
            onSubmit={handleAddFinanceRecord}
            className="w-full max-w-lg rounded-[32px] bg-[#07070E] border border-white/20 p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in duration-200"
          >
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase font-bold">ZONA DE FINANZAS</span>
              <h3 className="text-xl font-black text-white mt-1">Registrar Movimiento Financiero</h3>
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFinType("gasto")}
                  className={`flex-1 py-2 rounded-xl font-bold uppercase transition-all ${
                    finType === "gasto" ? "bg-rose-500 text-white" : "bg-white/5 text-gray-400"
                  }`}
                >
                  Gasto / Egreso
                </button>
                <button
                  type="button"
                  onClick={() => setFinType("ingreso")}
                  className={`flex-1 py-2 rounded-xl font-bold uppercase transition-all ${
                    finType === "ingreso" ? "bg-emerald-500 text-black" : "bg-white/5 text-gray-400"
                  }`}
                >
                  Ingreso Proyecto
                </button>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Concepto o Descripción:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Servidor AWS, Pago Sprint Cliente..."
                  value={finConcept}
                  onChange={(e) => setFinConcept(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Categoría:</label>
                  <select
                    value={finCategory}
                    onChange={(e) => setFinCategory(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                  >
                    <option value="Servidores & Hosting" className="bg-black">Servidores & Hosting</option>
                    <option value="Proyectos Software" className="bg-black">Proyectos Software</option>
                    <option value="Nóminas & Técnicos" className="bg-black">Nóminas & Técnicos</option>
                    <option value="Comisiones Asesores" className="bg-black">Comisiones Asesores</option>
                    <option value="IA & LLM APIs" className="bg-black">IA & LLM APIs</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Monto ($ MXN):</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={finAmount}
                    onChange={(e) => setFinAmount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Fecha de Corte o Vencimiento:</label>
                <input
                  type="text"
                  placeholder="Ej. 15 de Octubre de 2026"
                  value={finDueDate}
                  onChange={(e) => setFinDueDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsFinanceModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#00D1FF] text-white font-black text-xs uppercase tracking-wider hover:scale-105 transition-all cursor-pointer shadow-lg"
              >
                Guardar Movimiento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Role Selection Modal */}
      <AuthLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectRole={(r) => {
          handleRoleChange(r);
          setIsAuthModalOpen(false);
        }}
      />
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#040407] flex items-center justify-center text-white">Cargando Portal...</div>}>
      <PortalMainContent />
    </Suspense>
  );
}
