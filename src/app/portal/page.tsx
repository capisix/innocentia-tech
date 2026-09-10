"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import VendorContractModal from "../../components/portal/VendorContractModal";
import ProjectTeamFeedAndChat from "../../components/portal/ProjectTeamFeedAndChat";
import ProjectCreationForm from "../../components/portal/ProjectCreationForm";
import AuthLoginModal, { RoleType, ROLE_PRESETS, USER_ACCOUNTS, UserAccount } from "../../components/portal/AuthLoginModal";
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
  Key,
  Flame,
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
  sourceAccount: string;
  registeredBy: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: "INGRESO" | "GASTO" | "EDICION" | "ELIMINACION" | "ASIGNACION_TECNICO" | "CAMBIO_ESTADO";
  authorName: string;
  authorRole: string;
  sourceAccount?: string;
  target: string;
  amount?: number;
  details: string;
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
  paymentAccount: string;
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

  // Active Role & User State
  const [activeRole, setActiveRole] = useState<RoleType>("ceo");
  const [activeUser, setActiveUser] = useState<UserAccount>(USER_ACCOUNTS.ivan_ceo);
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string | null>(null);
  const [gatePasswordInput, setGatePasswordInput] = useState<string>("");
  const [gateAuthError, setGateAuthError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize from URL or LocalStorage and check Auth Status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuthUserId = localStorage.getItem("innocentia_auth_user_id");
      if (savedAuthUserId) {
        setAuthenticatedUserId(savedAuthUserId);
      }
    }

    const urlUserId = searchParams.get("userId");
    if (urlUserId) {
      const foundUser = Object.values(USER_ACCOUNTS).find((u) => u.id === urlUserId);
      if (foundUser) {
        setActiveUser(foundUser);
        setActiveRole(foundUser.role);
        return;
      }
    }

    if (urlRole && ["ceo", "socio", "usuario", "dev", "asesor"].includes(urlRole)) {
      setActiveRole(urlRole);
      const preset = ROLE_PRESETS.find((p) => p.role === urlRole);
      if (preset) setActiveUser(preset.defaultUser);
    } else if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("innocentia_active_role") as RoleType | null;
      const savedUserStr = localStorage.getItem("innocentia_active_user");
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          setActiveUser(parsed);
          setActiveRole(parsed.role);
          return;
        } catch (e) {
          // fallback
        }
      }
      if (savedRole && ["ceo", "socio", "usuario", "dev", "asesor"].includes(savedRole)) {
        setActiveRole(savedRole);
        const preset = ROLE_PRESETS.find((p) => p.role === savedRole);
        if (preset) setActiveUser(preset.defaultUser);
      }
    }
  }, [urlRole, searchParams]);

  const handleRoleChange = (newRole: RoleType, specificUser?: UserAccount) => {
    setActiveRole(newRole);
    const preset = ROLE_PRESETS.find((p) => p.role === newRole);
    const userToSet = specificUser || preset?.defaultUser || USER_ACCOUNTS.ivan_ceo;
    setActiveUser(userToSet);
    setGateAuthError(null);
    setGatePasswordInput("");
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_active_role", newRole);
      localStorage.setItem("innocentia_active_user", JSON.stringify(userToSet));
    }
  };

  const handleUnlockGate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGateAuthError(null);

    if (!gatePasswordInput.trim()) {
      setGateAuthError("Ingresa tu contraseña para acceder a este entorno.");
      return;
    }

    if (gatePasswordInput.trim() !== activeUser.password) {
      setGateAuthError("Contraseña incorrecta. Acceso denegado.");
      return;
    }

    // Success
    setAuthenticatedUserId(activeUser.id);
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_auth_user_id", activeUser.id);
      localStorage.setItem("innocentia_auth_token", "AUTH_" + activeUser.id + "_" + Date.now());
      localStorage.setItem("innocentia_active_role", activeUser.role);
      localStorage.setItem("innocentia_active_user", JSON.stringify(activeUser));
    }
  };

  const handleLogout = () => {
    setAuthenticatedUserId(null);
    setGatePasswordInput("");
    setGateAuthError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("innocentia_auth_user_id");
      localStorage.removeItem("innocentia_auth_token");
    }
  };

  const currentPreset = ROLE_PRESETS.find((p) => p.role === activeRole) || ROLE_PRESETS[0];

  // Tab States per Role
  const [ceoTab, setCeoTab] = useState<"proyectos" | "asignacion" | "finanzas" | "auditoria" | "chat">("proyectos");
  const [partnerTab, setPartnerTab] = useState<"finanzas" | "auditoria" | "servidores" | "proyectos" | "chat">("finanzas");
  const [clientTab, setClientTab] = useState<"proyectos" | "finanzas" | "chat" | "solicitudes">("proyectos");
  const [devTab, setDevTab] = useState<"mis_proyectos" | "sprints" | "entregables" | "chat">("mis_proyectos");
  const [advisorTab, setAdvisorTab] = useState<"leads_formulario" | "status_proyectos" | "comisiones" | "chat">("leads_formulario");

  // Filters for Audit Log
  const [auditFilterAccount, setAuditFilterAccount] = useState<string>("all");
  const [auditFilterAuthor, setAuditFilterAuthor] = useState<string>("all");

  // ==========================================
  // SHARED DATABASE MOCK STATE
  // ==========================================

  // Projects State
  const [projects, setProjects] = useState<AssignedProject[]>([
    {
      id: "PRJ-01",
      name: "Clínica Médica AI - Sistema de Triaje y Citas",
      client: "Dra. Mariana Valdés",
      clientEmail: "mariana@clinicamedica.ai",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Ing. Rodrigo Pacheco",
      uxLead: "Sofía (Innocentia Design)",
      devopsLead: "Iván Castillo (CEO)",
      status: "En Desarrollo",
      progress: 68,
      currentSprint: "Sprint 4: Integración de Motor de Diagnóstico LLM y Citas por WhatsApp",
      budget: 185000,
      paidAmount: 120000,
      targetDate: "15 de Octubre de 2026",
      unreadAlerts: 1,
    },
    {
      id: "PRJ-02",
      name: "Gourmet Express - App Móvil y Ruteo Inteligente",
      client: "Lic. Roberto Garza",
      clientEmail: "roberto@gourmetexpress.mx",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Ing. Rodrigo Pacheco",
      uxLead: "Sofía (Innocentia Design)",
      devopsLead: "Ing. Rodrigo Pacheco",
      status: "En Desarrollo",
      progress: 42,
      currentSprint: "Sprint 2: Algoritmo de Reparto en Tiempo Real con WebSockets",
      budget: 240000,
      paidAmount: 140000,
      targetDate: "28 de Noviembre de 2026",
      unreadAlerts: 0,
    },
    {
      id: "PRJ-03",
      name: "Fintech Seguros MX - Portal de Cotizaciones B2B",
      client: "Lic. Andrea Morales",
      clientEmail: "andrea@fintechseguros.mx",
      sellerId: "usr_sales_01",
      sellerName: "Carlos Mendoza",
      devLead: "Por Asignar (CEO)",
      uxLead: "Sofía (Innocentia Design)",
      status: "Por Iniciar",
      progress: 10,
      currentSprint: "Fase 0: Levantamiento de Requerimientos y Arquitectura de Datos",
      budget: 150000,
      paidAmount: 50000,
      targetDate: "15 de Diciembre de 2026",
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

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "LOG-101",
      timestamp: "09 Sep 2026, 18:35",
      action: "INGRESO",
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "Clínica Médica AI - Anticipo Fase 2",
      amount: 120000,
      details: "Recepción de anticipo 60% vía transferencia SPEI validado por Dirección General.",
    },
    {
      id: "LOG-102",
      timestamp: "09 Sep 2026, 15:20",
      action: "GASTO",
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "AWS Cloud Infrastructure",
      amount: 14500,
      details: "Pago programado de servidores ECS y base de datos relacional Aurora.",
    },
    {
      id: "LOG-103",
      timestamp: "08 Sep 2026, 12:45",
      action: "ASIGNACION_TECNICO",
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Gestión Operativa Core",
      target: "Clínica Médica AI",
      details: "Asignación de Ing. Rodrigo Pacheco (Tech Lead) y Sofía (UX Lead) para entrega de Sprint 4.",
    },
    {
      id: "LOG-104",
      timestamp: "07 Sep 2026, 11:10",
      action: "INGRESO",
      authorName: "Jorge Pérez",
      authorRole: "Socio Estrategia",
      sourceAccount: "BBVA Operativa & Nómina",
      target: "Gourmet Express - Sprint 3",
      amount: 80000,
      details: "Liquidación de Sprint 3 por cliente Roberto Garza validado en conciliación.",
    },
    {
      id: "LOG-105",
      timestamp: "06 Sep 2026, 17:00",
      action: "GASTO",
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Stripe Gateway / Tarjeta",
      target: "Vercel Enterprise & Cloudflare DNS",
      amount: 6200,
      details: "Renovación mensual de cluster edge y protección contra ataques DDoS.",
    },
    {
      id: "LOG-106",
      timestamp: "05 Sep 2026, 14:30",
      action: "GASTO",
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "BBVA Operativa & Nómina",
      target: "Comisión Venta - Carlos Mendoza",
      amount: 22200,
      details: "Aprobación y dispersión de comisión de venta por cierre de Clínica Médica AI.",
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
    setAssignDevopsLead(proj.devopsLead || "Iván Castillo (CEO)");
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

    // Add to Audit Log
    const newLog: AuditLogEntry = {
      id: "LOG-" + Date.now().toString().slice(-4),
      timestamp: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      action: "ASIGNACION_TECNICO",
      authorName: activeUser.name,
      authorRole: activeUser.roleTitle,
      sourceAccount: "Panel de Dirección",
      target: selectedProjectForAssign.name,
      details: `Reasignación técnica: Dev Lead (${assignDevLead}), UX Lead (${assignUxLead}), DevOps (${assignDevopsLead || 'N/A'}), Estado: ${assignStatus}.`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

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
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Iván Castillo (CEO)",
    },
    {
      id: "FIN-02",
      type: "ingreso",
      concept: "Pago Sprint 3 - Gourmet Express",
      category: "Proyectos Software",
      amount: 80000,
      date: "05 de Septiembre de 2026",
      status: "pagado",
      sourceAccount: "BBVA Operativa & Nómina",
      registeredBy: "Jorge Pérez (Socio)",
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
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Daniel Torre (Socio)",
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
      sourceAccount: "Stripe Gateway / Tarjeta",
      registeredBy: "Daniel Torre (Socio)",
    },
    {
      id: "FIN-05",
      type: "gasto",
      concept: "Comisión Venta - Carlos Mendoza (Clínica Médica)",
      category: "Comisiones Asesores",
      amount: 22200,
      date: "03 de Septiembre de 2026",
      status: "pagado",
      sourceAccount: "BBVA Operativa & Nómina",
      registeredBy: "Iván Castillo (CEO)",
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
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Jorge Pérez (Socio)",
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
  const [finSourceAccount, setFinSourceAccount] = useState("Santander Corporativa (Innocentia Tech)");

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
      sourceAccount: finSourceAccount,
      registeredBy: `${activeUser.name} (${activeUser.role === 'ceo' ? 'CEO' : 'Socio'})`,
    };

    setFinanceRecords((prev) => [newRec, ...prev]);

    // Push into Audit Log
    const newLog: AuditLogEntry = {
      id: "LOG-" + Date.now().toString().slice(-4),
      timestamp: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      action: finType === "ingreso" ? "INGRESO" : "GASTO",
      authorName: activeUser.name,
      authorRole: activeUser.roleTitle,
      sourceAccount: finSourceAccount,
      target: finConcept,
      amount: Number(finAmount),
      details: `Registro de ${finType} en categoría "${finCategory}" cargado a cuenta "${finSourceAccount}".`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setIsFinanceModalOpen(false);
    setFinConcept("");
    setFinAmount(5000);
  };

  const handleDeleteFinanceRecord = (id: string) => {
    const itemToDelete = financeRecords.find((r) => r.id === id);
    if (itemToDelete) {
      const newLog: AuditLogEntry = {
        id: "LOG-" + Date.now().toString().slice(-4),
        timestamp: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        action: "ELIMINACION",
        authorName: activeUser.name,
        authorRole: activeUser.roleTitle,
        sourceAccount: itemToDelete.sourceAccount,
        target: itemToDelete.concept,
        amount: itemToDelete.amount,
        details: `Eliminación de registro financiero "${itemToDelete.concept}" ($${itemToDelete.amount.toLocaleString()} MXN).`,
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
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
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
    },
    {
      id: "SRV-02",
      name: "Vercel Enterprise Edge Hosting & CDN",
      type: "Hosting",
      provider: "Vercel Inc.",
      costMonthly: 4200,
      renewalDate: "20 de Septiembre de 2026",
      daysRemaining: 11,
      status: "optimo",
      autoDebit: true,
      paymentAccount: "Stripe Gateway / Tarjeta",
    },
    {
      id: "SRV-03",
      name: "Dominios Globales (.tech / .com / .mx)",
      type: "Dominio",
      provider: "Cloudflare Registrar",
      costMonthly: 2000,
      renewalDate: "05 de Octubre de 2026",
      daysRemaining: 26,
      status: "optimo",
      autoDebit: true,
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
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
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
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
      paymentAccount: "BBVA Operativa & Nómina",
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

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter((log) => {
    if (auditFilterAccount !== "all" && log.sourceAccount !== auditFilterAccount) return false;
    if (auditFilterAuthor !== "all" && log.authorName !== auditFilterAuthor) return false;
    return true;
  });

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

            {authenticatedUserId === activeUser.id && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                title="Cerrar Sesión Segura"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECURITY LOCK GATE (IF NOT AUTHENTICATED) */}
      {/* ========================================================================= */}
      {authenticatedUserId !== activeUser.id ? (
        <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 relative z-20 text-center animate-in fade-in duration-300">
          <div className="p-8 sm:p-10 rounded-[36px] bg-[#07070E]/95 border border-white/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,209,255,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

            {/* Lock Shield Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_35px_rgba(0,209,255,0.3)] mb-6 flex items-center justify-center">
              <div className="w-full h-full bg-[#07070E] rounded-[22px] flex items-center justify-center">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#00D1FF] animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-gray-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ENTORNO PROTEGIDO CON CONTRASEÑA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Acceso Restringido
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1.5 max-w-sm mx-auto">
              Ingresa tu contraseña para acceder a los balances, proyectos y métricas confidenciales.
            </p>

            {/* Selected User Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block">
                Cuenta a autenticar:
              </span>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <h3 className="text-sm font-black text-white">{activeUser.name}</h3>
                  <span className="text-xs font-mono text-[#00D1FF] block">{activeUser.roleTitle}</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/15">
                  {currentPreset.badge}
                </span>
              </div>
            </div>

            {/* If Socio, allow selecting between Daniel and Jorge */}
            {activeRole === "socio" && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleChange("socio", USER_ACCOUNTS.daniel_socio)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    activeUser.id === USER_ACCOUNTS.daniel_socio.id
                      ? "bg-purple-600/40 border-purple-400 text-white font-bold"
                      : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  Daniel Torre
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("socio", USER_ACCOUNTS.jorge_socio)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    activeUser.id === USER_ACCOUNTS.jorge_socio.id
                      ? "bg-purple-600/40 border-purple-400 text-white font-bold"
                      : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  Jorge Pérez
                </button>
              </div>
            )}

            {/* Password Input Form */}
            <form onSubmit={handleUnlockGate} className="mt-5 space-y-3 text-left">
              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Contraseña de Seguridad:</span>
                </label>
                <input
                  type="password"
                  value={gatePasswordInput}
                  onChange={(e) => {
                    setGatePasswordInput(e.target.value);
                    if (gateAuthError) setGateAuthError(null);
                  }}
                  placeholder="Escribe tu contraseña"
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] focus:outline-none transition-all placeholder:text-gray-600"
                  autoFocus
                />
              </div>

              {gateAuthError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{gateAuthError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(255,56,88,0.4)] hover:scale-[1.02] cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Desbloquear Acceso al Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[#00D1FF] hover:underline cursor-pointer"
              >
                ← Cambiar de Rol / Nivel
              </button>
              <span>SSL 256-bit Secure</span>
            </div>
          </div>
        </div>
      ) : (
      /* ========================================================================= */
      /* MAIN CONTAINER CONTENT (AUTHENTICATED) */
      /* ========================================================================= */
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
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <span className={`text-[10px] font-mono px-3 py-0.5 rounded-full border ${currentPreset.badgeColor}`}>
                    {currentPreset.badge.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTENTICADO
                  </span>
                  {activeRole === "socio" && (
                    <div className="flex items-center gap-1 ml-2 bg-purple-900/30 p-1 rounded-xl border border-purple-500/30 text-[10px] font-mono">
                      <span className="text-purple-300 px-1 hidden sm:inline">Socio:</span>
                      <button
                        type="button"
                        onClick={() => handleRoleChange("socio", USER_ACCOUNTS.daniel_socio)}
                        className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                          activeUser.id === USER_ACCOUNTS.daniel_socio.id
                            ? "bg-purple-600 text-white font-bold shadow-md"
                            : "text-purple-300 hover:text-white"
                        }`}
                      >
                        Daniel Torre
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleChange("socio", USER_ACCOUNTS.jorge_socio)}
                        className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                          activeUser.id === USER_ACCOUNTS.jorge_socio.id
                            ? "bg-purple-600 text-white font-bold shadow-md"
                            : "text-purple-300 hover:text-white"
                        }`}
                      >
                        Jorge Pérez
                      </button>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                  {activeUser.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5">
                  {activeUser.roleTitle} • {activeUser.email}
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
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold text-red-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CEO (DIRECTOR GENERAL / SUPER ADMIN) */}
        {/* ========================================================================= */}
        {activeRole === "ceo" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
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
                <Crown className="w-4 h-4 text-amber-500" />
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
                onClick={() => setCeoTab("auditoria")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "auditoria"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Bitácora de Auditoría ({auditLogs.length})</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Crown className="w-3.5 h-3.5" />
                        <span>Designar Técnicos</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CEO Tab 2: Designación de Técnicos */}
            {ceoTab === "asignacion" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span>Panel de Designación Técnica (CEO Exclusivo)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Como Director General, asigna y reasigna los ingenieros, diseñadores y DevOps a cada proyecto en desarrollo.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/15 text-gray-400 uppercase">
                        <th className="py-3 px-3">Proyecto</th>
                        <th className="py-3 px-3">Dev Lead</th>
                        <th className="py-3 px-3">UX / Diseñador</th>
                        <th className="py-3 px-3">DevOps / Cloud</th>
                        <th className="py-3 px-3">Estado</th>
                        <th className="py-3 px-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{proj.name}</span>
                            <span className="text-[10px] text-gray-400">{proj.client}</span>
                          </td>
                          <td className="py-3.5 px-3 text-[#00D1FF] font-bold">{proj.devLead}</td>
                          <td className="py-3.5 px-3 text-purple-400 font-bold">{proj.uxLead}</td>
                          <td className="py-3.5 px-3 text-emerald-400 font-bold">{proj.devopsLead || "Iván Castillo (CEO)"}</td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/10 border border-white/15 text-gray-300">
                              {proj.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => openAssignModal(proj)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
                            >
                              Modificar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CEO Tab 3: Supervisión Financiera */}
            {ceoTab === "finanzas" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 uppercase">Ingresos Facturados</span>
                    <h3 className="text-2xl font-black text-emerald-400 mt-1">${totalIncome.toLocaleString()} MXN</h3>
                  </div>
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 uppercase">Costos de Operación</span>
                    <h3 className="text-2xl font-black text-rose-400 mt-1">${totalExpenses.toLocaleString()} MXN</h3>
                  </div>
                  <div className="p-6 rounded-[24px] bg-[#07070E] border border-white/15">
                    <span className="text-xs font-mono text-gray-400 uppercase">Utilidad Líquida</span>
                    <h3 className="text-2xl font-black text-[#00D1FF] mt-1">${netProfit.toLocaleString()} MXN</h3>
                  </div>
                </div>

                {/* Finance Table with Accounts */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-4">
                  <h3 className="text-lg font-black text-white uppercase">Movimientos Registrados</h3>
                  <div className="divide-y divide-white/10">
                    {financeRecords.map((r) => (
                      <div key={r.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-sm font-bold text-white block">{r.concept}</span>
                          <span className="text-[11px] font-mono text-gray-400">
                            {r.category} • <strong className="text-gray-300">{r.sourceAccount}</strong> • Registrado por: <strong className="text-[#00D1FF]">{r.registeredBy}</strong>
                          </span>
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

            {/* CEO Tab 4: Bitácora de Auditoría */}
            {ceoTab === "auditoria" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#00D1FF]" />
                      <span>Bitácora de Auditoría & Registro de Movimientos</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Registro inmutable de transacciones, cuentas de origen, fechas y socios responsables.
                    </p>
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={auditFilterAccount}
                      onChange={(e) => setAuditFilterAccount(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs text-gray-300 font-mono focus:outline-none"
                    >
                      <option value="all">Todas las Cuentas</option>
                      <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa</option>
                      <option value="BBVA Operativa & Nómina">BBVA Operativa</option>
                      <option value="Stripe Gateway / Tarjeta">Stripe Gateway</option>
                    </select>

                    <select
                      value={auditFilterAuthor}
                      onChange={(e) => setAuditFilterAuthor(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs text-gray-300 font-mono focus:outline-none"
                    >
                      <option value="all">Todos los Autores</option>
                      <option value="Iván Castillo">Iván Castillo (CEO)</option>
                      <option value="Daniel Torre">Daniel Torre (Socio)</option>
                      <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                    </select>
                  </div>
                </div>

                {/* Audit Feed List */}
                <div className="space-y-3">
                  {filteredAuditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              log.action === "INGRESO"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                : log.action === "GASTO"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                                : log.action === "ASIGNACION_TECNICO"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/40"
                            }`}
                          >
                            {log.action}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">{log.timestamp}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                            💳 {log.sourceAccount}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-1">{log.details}</h4>
                        <span className="text-[10px] font-mono text-gray-400 block">
                          Objetivo: <strong className="text-gray-200">{log.target}</strong>
                        </span>
                      </div>

                      <div className="text-left md:text-right flex-shrink-0">
                        {log.amount && (
                          <span className={`text-sm font-black font-mono block ${log.action === "INGRESO" ? "text-emerald-400" : "text-rose-400"}`}>
                            {log.action === "INGRESO" ? "+" : "-"}${log.amount.toLocaleString()} MXN
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#00D1FF] block mt-0.5">
                          👤 {log.authorName} ({log.authorRole})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CEO Tab 5: Chats */}
            {ceoTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="socio" userName={activeUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SOCIO / CO-FUNDADOR (FINANZAS, AUDITORÍA & SERVIDORES) */}
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
                onClick={() => setPartnerTab("auditoria")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "auditoria"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Auditoría & Cuentas ({auditLogs.length})</span>
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
                        <span>Libro Contable con Cuentas de Origen</span>
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Registro y trazabilidad de ingresos, gastos, cuenta de origen y socio responsable.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFinanceModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-[#00D1FF] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Registrar Movimiento</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/15 text-gray-400 uppercase">
                          <th className="py-3 px-3">Tipo</th>
                          <th className="py-3 px-3">Concepto</th>
                          <th className="py-3 px-3">Cuenta de Origen</th>
                          <th className="py-3 px-3">Registrado Por</th>
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
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                {r.sourceAccount}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-purple-300 font-bold">{r.registeredBy}</td>
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

            {/* Partner Tab 2: Auditoría y Cuentas */}
            {partnerTab === "auditoria" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <span>Auditoría de Movimientos & Trazabilidad de Cuentas</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Consulta cada acción, fecha, banco de procedencia y socio responsable de cada registro.
                    </p>
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={auditFilterAccount}
                      onChange={(e) => setAuditFilterAccount(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs text-gray-300 font-mono focus:outline-none"
                    >
                      <option value="all">Todas las Cuentas</option>
                      <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa</option>
                      <option value="BBVA Operativa & Nómina">BBVA Operativa</option>
                      <option value="Stripe Gateway / Tarjeta">Stripe Gateway</option>
                    </select>

                    <select
                      value={auditFilterAuthor}
                      onChange={(e) => setAuditFilterAuthor(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs text-gray-300 font-mono focus:outline-none"
                    >
                      <option value="all">Todos los Socios</option>
                      <option value="Iván Castillo">Iván Castillo (CEO)</option>
                      <option value="Daniel Torre">Daniel Torre (Socio)</option>
                      <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredAuditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              log.action === "INGRESO"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                : log.action === "GASTO"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/40"
                            }`}
                          >
                            {log.action}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">{log.timestamp}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                            🏦 {log.sourceAccount}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-1">{log.details}</h4>
                        <span className="text-[10px] font-mono text-gray-400 block">
                          Concepto: <strong className="text-gray-200">{log.target}</strong>
                        </span>
                      </div>

                      <div className="text-left md:text-right flex-shrink-0">
                        {log.amount && (
                          <span className={`text-sm font-black font-mono block ${log.action === "INGRESO" ? "text-emerald-400" : "text-rose-400"}`}>
                            {log.action === "INGRESO" ? "+" : "-"}${log.amount.toLocaleString()} MXN
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-purple-300 block mt-0.5">
                          ✍️ Registrado por: <strong>{log.authorName}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partner Tab 3: Monitor de Servidores y Caducidades */}
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
                        Monitoreo activo de cortes automáticos, cuentas de cargo y fechas de renovación de infraestructura cloud.
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
                          <span className="text-[10px] font-mono font-bold text-gray-400">{srv.type}</span>
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              srv.status === "critico"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
                                : srv.status === "proximo_a_vencer"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            }`}
                          >
                            {srv.status === "critico" ? "⚠️ CRÍTICO" : srv.status === "proximo_a_vencer" ? "PRÓXIMO A VENCER" : "ÓPTIMO"}
                          </span>
                        </div>

                        <h3 className="text-sm font-black text-white">{srv.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{srv.provider}</p>

                        <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Renovación:</span>
                            <span className="text-white font-bold">{srv.renewalDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cuenta de Cargo:</span>
                            <span className="text-purple-300 font-bold">{srv.paymentAccount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Costo Mensual:</span>
                            <span className="text-emerald-400 font-bold">${srv.costMonthly.toLocaleString()} MXN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Días Restantes:</span>
                            <span className={`font-bold ${srv.daysRemaining <= 3 ? "text-rose-400 animate-pulse" : "text-white"}`}>
                              {srv.daysRemaining} días
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Partner Tab 4: Proyectos */}
            {partnerTab === "proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 font-bold">{proj.id}</span>
                        <h3 className="text-lg font-black text-white">{proj.name}</h3>
                        <p className="text-xs text-gray-400">Cliente: {proj.client}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">${proj.budget.toLocaleString()} MXN</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tech Lead:</span>
                        <span className="text-white font-bold">{proj.devLead}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Diseño:</span>
                        <span className="text-white font-bold">{proj.uxLead}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Partner Tab 5: Chats */}
            {partnerTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="socio" userName={activeUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CLIENTE / USUARIO FINAL */}
        {/* ========================================================================= */}
        {activeRole === "usuario" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
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
                <CreditCard className="w-4 h-4" />
                <span>Estado de Pagos & Facturación</span>
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

            {clientTab === "proyectos" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">PROYECTO PRINCIPAL #PRJ-01</span>
                    <h2 className="text-2xl font-black text-white mt-1">Clínica Médica AI - Sistema de Triaje</h2>
                    <p className="text-xs text-gray-400">Titular: Dra. Mariana Valdés • Clínica Médica AI</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
                    68% Completado
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-[#00D1FF] rounded-full" style={{ width: "68%" }} />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>Sprint Actual: Diagnóstico LLM & Triaje</span>
                    <span className="text-white font-bold">Entrega estimada: 15 de Octubre 2026</span>
                  </div>
                </div>

                {/* Assigned Team */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Ingeniero Tech Lead Asignado:</span>
                    <span className="text-sm font-bold text-white block mt-1">Ing. Rodrigo Pacheco</span>
                    <span className="text-xs font-mono text-[#00D1FF]">rodrigo.dev@innocentia.tech</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Líder de Diseño UI/UX:</span>
                    <span className="text-sm font-bold text-white block mt-1">Sofía (Innocentia Design Lead)</span>
                    <span className="text-xs font-mono text-purple-400">sofia.design@innocentia.tech</span>
                  </div>
                </div>
              </div>
            )}

            {clientTab === "finanzas" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <h3 className="text-lg font-black text-white uppercase">Resumen de Pagos del Proyecto</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 block">Total Cotizado</span>
                    <span className="text-xl font-black text-white mt-1 block">$185,000 MXN</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 block">Monto Pagado</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">$120,000 MXN</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono text-gray-400 block">Saldo Pendiente</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">$65,000 MXN</span>
                  </div>
                </div>
              </div>
            )}

            {clientTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="cliente" userName={activeUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: TÉCNICO / DESARROLLADOR */}
        {/* ========================================================================= */}
        {activeRole === "dev" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
              <button
                onClick={() => setDevTab("mis_proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  devTab === "mis_proyectos"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Mis Proyectos Asignados por CEO</span>
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
                <span>Chat Técnico de Ingeniería</span>
              </button>
            </div>

            {devTab === "mis_proyectos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.filter((p) => p.devLead.includes("Rodrigo")).map((proj) => (
                  <div key={proj.id} className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                    <span className="text-[10px] font-mono text-[#00D1FF] font-bold">{proj.id}</span>
                    <h3 className="text-lg font-black text-white">{proj.name}</h3>
                    <p className="text-xs text-gray-400">Cliente: {proj.client}</p>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                      <span className="text-gray-400">Sprint Activo: </span>
                      <strong className="text-[#00D1FF]">{proj.currentSprint}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {devTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="dev" userName={activeUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: VENDEDOR / ASESOR COMERCIAL */}
        {/* ========================================================================= */}
        {activeRole === "asesor" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
              <button
                onClick={() => setAdvisorTab("leads_formulario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  advisorTab === "leads_formulario"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Link de Vendedor & Leads</span>
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
                <span>Mis Comisiones</span>
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
                <span>Chat Comercial</span>
              </button>
            </div>

            {advisorTab === "leads_formulario" && (
              <div className="space-y-6">
                {/* Referral Link Generator */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#FF3858]/10 via-[#00D1FF]/10 to-transparent border border-white/20 space-y-4">
                  <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-[#FF3858]" />
                    <span>Tu Enlace Exclusivo para Cotización de Clientes</span>
                  </h3>
                  <p className="text-xs text-gray-300">
                    Envía este link a tus prospectos. Cuando un cliente llena el formulario, el proyecto queda registrado automáticamente a tu nombre y recibes alertas al instante.
                  </p>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      value={vendorReferralLink}
                      className="flex-1 px-4 py-3 bg-black/60 border border-white/15 rounded-2xl text-xs font-mono text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopyVendorLink}
                      className="px-5 py-3 rounded-2xl bg-[#FF3858] hover:bg-[#FF4D6D] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                      <span>{copiedLink ? "¡Copiado!" : "Copiar Enlace"}</span>
                    </button>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                  <h3 className="text-base font-black text-white uppercase">Clientes que han llenado tu formulario</h3>
                  <div className="divide-y divide-white/10">
                    {sellerLeads.map((lead) => (
                      <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-sm font-bold text-white block">{lead.clientName} ({lead.company})</span>
                          <span className="text-xs font-mono text-gray-400">{lead.phone} • {lead.date}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-gray-300">
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {advisorTab === "comisiones" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-4">
                <h3 className="text-xl font-black text-white uppercase">Tabulador de Comisiones Acumuladas</h3>
                <span className="text-3xl font-black text-[#FF3858] block">$64,200 MXN</span>
                <p className="text-xs text-gray-400 font-mono">
                  Comisiones calculadas al 12% por proyectos cerrados y facturados en Innocentia Tech.
                </p>
              </div>
            )}

            {advisorTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="asesor" userName={activeUser.name} />
            )}
          </div>
        )}
      </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CEO PROJECT ASSIGNMENT */}
      {/* ========================================================================= */}
      {selectedProjectForAssign && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#07070E] border border-amber-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl text-left space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Designación Oficial CEO</span>
                <h3 className="text-lg font-black text-white">{selectedProjectForAssign.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProjectForAssign(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 mb-1">Ingeniero Dev Lead:</label>
                <select
                  value={assignDevLead}
                  onChange={(e) => setAssignDevLead(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                >
                  <option value="Ing. Rodrigo Pacheco">Ing. Rodrigo Pacheco (Senior Fullstack & AI)</option>
                  <option value="Ing. Manuel Torres">Ing. Manuel Torres (Backend & Microservices)</option>
                  <option value="Ing. Andrea Rivas">Ing. Andrea Rivas (Frontend React/Next.js)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Líder de UX / Diseño Visual:</label>
                <select
                  value={assignUxLead}
                  onChange={(e) => setAssignUxLead(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                >
                  <option value="Sofía (Innocentia Design Lead)">Sofía (Innocentia Design Lead)</option>
                  <option value="Lic. Valeria Gómez">Lic. Valeria Gómez (Branding & Motion UI)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">DevOps & Arquitectura Cloud:</label>
                <select
                  value={assignDevopsLead}
                  onChange={(e) => setAssignDevopsLead(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                >
                  <option value="Iván Castillo (CEO)">Iván Castillo (CEO / Super Admin)</option>
                  <option value="Ing. Rodrigo Pacheco">Ing. Rodrigo Pacheco (Fullstack)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Estado del Proyecto:</label>
                <select
                  value={assignStatus}
                  onChange={(e) => setAssignStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                >
                  <option value="En Desarrollo">En Desarrollo</option>
                  <option value="Por Iniciar">Por Iniciar</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProjectForAssign(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveAssignment}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-lg"
              >
                Guardar Designación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD FINANCE MOVEMENT (SOCIO / CEO) */}
      {/* ========================================================================= */}
      {isFinanceModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <form
            onSubmit={handleAddFinanceRecord}
            className="w-full max-w-lg bg-[#07070E] border border-purple-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl text-left space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Libro Contable</span>
                <h3 className="text-lg font-black text-white">Nuevo Registro de Movimiento</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFinanceModalOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFinType("gasto")}
                  className={`py-2 rounded-xl border text-center font-bold uppercase ${
                    finType === "gasto" ? "bg-rose-500/20 text-rose-400 border-rose-500" : "bg-white/5 text-gray-400 border-white/10"
                  }`}
                >
                  Gasto
                </button>
                <button
                  type="button"
                  onClick={() => setFinType("ingreso")}
                  className={`py-2 rounded-xl border text-center font-bold uppercase ${
                    finType === "ingreso" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-white/5 text-gray-400 border-white/10"
                  }`}
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  onClick={() => setFinType("servicio")}
                  className={`py-2 rounded-xl border text-center font-bold uppercase ${
                    finType === "servicio" ? "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]" : "bg-white/5 text-gray-400 border-white/10"
                  }`}
                >
                  Servicio
                </button>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Concepto del Movimiento:</label>
                <input
                  type="text"
                  value={finConcept}
                  onChange={(e) => setFinConcept(e.target.value)}
                  placeholder="ej: Pago de Servidor Cloud AWS"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Monto (MXN):</label>
                  <input
                    type="number"
                    value={finAmount}
                    onChange={(e) => setFinAmount(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Categoría:</label>
                  <select
                    value={finCategory}
                    onChange={(e) => setFinCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none"
                  >
                    <option value="Servidores & Hosting">Servidores & Hosting</option>
                    <option value="Proyectos Software">Proyectos Software</option>
                    <option value="Comisiones Asesores">Comisiones Asesores</option>
                    <option value="Nómina & Honorarios">Nómina & Honorarios</option>
                    <option value="IA & LLM APIs">IA & LLM APIs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Cuenta de Origen / Destino:</label>
                <select
                  value={finSourceAccount}
                  onChange={(e) => setFinSourceAccount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-bold"
                >
                  <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa (Innocentia Tech)</option>
                  <option value="BBVA Operativa & Nómina">BBVA Operativa & Nómina</option>
                  <option value="Stripe Gateway / Tarjeta">Stripe Gateway / Tarjeta</option>
                  <option value="Transferencia SPEI Directa">Transferencia SPEI Directa</option>
                  <option value="PayPal Business Internacional">PayPal Business Internacional</option>
                  <option value="Caja Chica Efectivo">Caja Chica Efectivo</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-gray-300">
                <span>Registrado por: <strong>{activeUser.name}</strong> ({activeUser.roleTitle})</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsFinanceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-lg"
              >
                Guardar en Libro
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fast Action Floating Widget / Quick Help */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/faq"
          className="px-4 py-3 rounded-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.4)] hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ayuda & IA en Vivo</span>
        </Link>
      </div>

      <AuthLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectRole={(role, user) => {
          handleRoleChange(role, user);
          setIsAuthModalOpen(false);
        }}
      />
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#040407] text-white flex items-center justify-center font-mono text-sm">Cargando Portal de Control...</div>}>
      <PortalMainContent />
    </Suspense>
  );
}
