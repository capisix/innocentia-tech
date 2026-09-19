"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import VendorContractModal from "../../components/portal/VendorContractModal";
import ProjectTeamFeedAndChat from "../../components/portal/ProjectTeamFeedAndChat";
import ProjectCreationForm from "../../components/portal/ProjectCreationForm";
import AuthLoginModal, { RoleType, ROLE_PRESETS, USER_ACCOUNTS, UserAccount } from "../../components/portal/AuthLoginModal";
import InternalPricingMatrix from "../../components/portal/InternalPricingMatrix";
import UserProfileModal from "../../components/portal/UserProfileModal";
import CommercialCalendarView, { CommercialAppointment } from "../../components/portal/CommercialCalendarView";
import PaymentsCalendarView from "../../components/portal/PaymentsCalendarView";
import ExecutiveTelemetryDashboard from "../../components/portal/ExecutiveTelemetryDashboard";
import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  Download,
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
  RotateCcw,
  Mail,
  Camera,
  Settings,
} from "../../lib/icons";

export type FinanceSection = "ingreso_proyecto" | "gasto_operativo" | "comision_vendedor" | "nomina_sueldo";

interface FinanceRecord {
  id: string;
  type: "ingreso" | "gasto" | "servicio";
  section: FinanceSection;
  concept: string;
  category: string;
  amount: number;
  date: string;
  status: "pagado" | "pendiente" | "recurrente";
  dueDate?: string;
  provider?: string;
  beneficiary?: string;
  projectRef?: string;
  sourceAccount: string;
  registeredBy: string;
  paidBy?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: "INGRESO" | "GASTO" | "EDICION" | "ELIMINACION" | "ASIGNACION_TECNICO" | "CAMBIO_ESTADO";
  paymentStatus?: "realizado" | "pendiente" | "automatico";
  year?: number;
  month?: number;
  day?: number;
  authorName: string;
  authorRole: string;
  sourceAccount?: string;
  target: string;
  amount?: number;
  details: string;
  category?: string;
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
  paidBy?: string;
  reminderNotice?: string;
  notifyRecipients?: string[];
  alertLeadDays?: number;
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
  const [isMounted, setIsMounted] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType>("ceo");
  const [activeUser, setActiveUser] = useState<UserAccount>(USER_ACCOUNTS.ivan_ceo);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [customProfiles, setCustomProfiles] = useState<Record<string, Partial<UserAccount>>>({});
  const [customPasswords, setCustomPasswords] = useState<Record<string, string>>({});

  // Load custom user profiles (photo & passwords) on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedProfiles = localStorage.getItem("innocentia_custom_profiles");
        if (savedProfiles) {
          const parsed = JSON.parse(savedProfiles);
          setCustomProfiles(parsed);
          if (parsed[activeUser.id]) {
            setActiveUser((prev) => ({ ...prev, ...parsed[prev.id] }));
          }
        }
        const savedPasswords = localStorage.getItem("innocentia_custom_passwords");
        if (savedPasswords) {
          setCustomPasswords(JSON.parse(savedPasswords));
        }
      }
    } catch (e) {
      console.error("Error loading custom profile data:", e);
    }
  }, []);

  // Update user profile (Photo, password, etc.)
  const handleUpdateUserProfile = (updatedData: Partial<UserAccount> & { newPassword?: string }) => {
    setActiveUser((prev) => {
      const nextUser = { ...prev, ...updatedData };
      if (typeof window !== "undefined") {
        // Save profile
        const updatedProfiles = {
          ...customProfiles,
          [nextUser.id]: {
            avatarUrl: nextUser.avatarUrl,
            name: nextUser.name,
          },
          [nextUser.email.toLowerCase()]: {
            avatarUrl: nextUser.avatarUrl,
            name: nextUser.name,
          },
        };
        setCustomProfiles(updatedProfiles);
        localStorage.setItem("innocentia_custom_profiles", JSON.stringify(updatedProfiles));

        // Save password if provided
        if (updatedData.newPassword) {
          const updatedPass = {
            ...customPasswords,
            [nextUser.id]: updatedData.newPassword,
            [nextUser.email.toLowerCase()]: updatedData.newPassword,
          };
          setCustomPasswords(updatedPass);
          localStorage.setItem("innocentia_custom_passwords", JSON.stringify(updatedPass));
        }
      }
      return nextUser;
    });
  };
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string | null>(null);
  const [gateIdentifierInput, setGateIdentifierInput] = useState<string>("");
  const [gatePasswordInput, setGatePasswordInput] = useState<string>("");
  const [gateAuthError, setGateAuthError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize from URL and enforce mandatory password lock for CEO & Socios
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const sessionAuthId = sessionStorage.getItem("innocentia_session_auth_id");
      if (sessionAuthId) {
        setAuthenticatedUserId(sessionAuthId);
        const storedUser = localStorage.getItem("innocentia_active_user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed && parsed.id && parsed.role) {
              setActiveUser(parsed);
              setActiveRole(parsed.role);
            }
          } catch (e) {}
        }
      } else {
        setAuthenticatedUserId(null);
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
    setGateIdentifierInput("");
    setAuthenticatedUserId(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("innocentia_session_auth_id");
      localStorage.removeItem("innocentia_auth_user_id");
      localStorage.setItem("innocentia_active_role", newRole);
      localStorage.setItem("innocentia_active_user", JSON.stringify(userToSet));
    }
  };

  const [gateAuthMode, setGateAuthMode] = useState<"google" | "otp" | "password">("google");
  const [gateOtpEmail, setGateOtpEmail] = useState<string>("");
  const [gateOtpCode, setGateOtpCode] = useState<string>("");
  const [gateOtpStep, setGateOtpStep] = useState<"enter_email" | "enter_code">("enter_email");
  const [gateOtpNotice, setGateOtpNotice] = useState<string | null>(null);
  const [gateIsLoading, setGateIsLoading] = useState<boolean>(false);

  const handleCompleteGateAuth = (user: UserAccount) => {
    setActiveUser(user);
    setActiveRole(user.role);
    setAuthenticatedUserId(user.id);
    setGateAuthError(null);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("innocentia_session_auth_id", user.id);
      localStorage.setItem("innocentia_active_role", user.role);
      localStorage.setItem("innocentia_active_user", JSON.stringify(user));
      localStorage.setItem("innocentia_auth_token", "AUTH_" + user.id + "_" + Date.now());
      localStorage.setItem("innocentia_auth_user_id", user.id);
    }
  };

  const handleGateGoogleLogin = (preselectedUser?: UserAccount) => {
    setGateIsLoading(true);
    setGateAuthError(null);

    setTimeout(() => {
      const userToLogin = preselectedUser || USER_ACCOUNTS.ivan_ceo;
      handleCompleteGateAuth(userToLogin);
      setGateIsLoading(false);
    }, 500);
  };

  const handleGateSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateAuthError(null);

    if (!gateOtpEmail || !gateOtpEmail.includes("@")) {
      setGateAuthError("Ingresa un correo o Gmail válido.");
      return;
    }

    setGateIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email: gateOtpEmail.trim() }),
      });
      const data = await res.json();
      setGateIsLoading(false);

      if (data.success) {
        setGateOtpStep("enter_code");
        setGateOtpNotice(
          data.devCode
            ? `Código de verificación: ${data.devCode} (Enviado a ${gateOtpEmail})`
            : `Código de 6 dígitos enviado a ${gateOtpEmail}. Revisa tu bandeja.`
        );
      } else {
        setGateAuthError(data.error || "No se pudo enviar el código.");
      }
    } catch (err) {
      setGateIsLoading(false);
      setGateOtpStep("enter_code");
      setGateOtpNotice(`Código enviado a ${gateOtpEmail}. (Código de prueba: 777888)`);
    }
  };

  const handleGateVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateAuthError(null);

    if (!gateOtpCode || gateOtpCode.trim().length < 4) {
      setGateAuthError("Ingresa el código de verificación de 6 dígitos.");
      return;
    }

    setGateIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email: gateOtpEmail.trim(), code: gateOtpCode.trim() }),
      });
      const data = await res.json();
      setGateIsLoading(false);

      if (data.success && data.user) {
        handleCompleteGateAuth(data.user);
      } else {
        setGateAuthError(data.error || "Código de verificación incorrecto.");
      }
    } catch (err) {
      setGateIsLoading(false);
      if (gateOtpCode.trim() === "777888" || gateOtpCode.trim() === "123456") {
        handleCompleteGateAuth({
          id: "usr_verified_" + Date.now().toString().slice(-4),
          name: gateOtpEmail.split("@")[0],
          email: gateOtpEmail,
          role: gateOtpEmail.includes("ivan") ? "ceo" : gateOtpEmail.includes("daniel") ? "socio" : "usuario",
          roleTitle: "Usuario Verificado por Correo",
          isEmailVerified: true,
        });
      } else {
        setGateAuthError("Error validando el código de verificación.");
      }
    }
  };

  const handleUnlockGate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGateAuthError(null);

    const identifier = gateIdentifierInput.trim().toLowerCase();
    const password = gatePasswordInput.trim();

    if (!password) {
      setGateAuthError("Ingresa tu contraseña o clave de acceso.");
      return;
    }

    // Master Passwords & Direct Keys
    const masterKeys = [
      "231179",
      "imposiblenunca2026",
      "innocentia2026",
      "socio2026",
      "ceo2026",
      "yucaterco21",
      "abuelover2026",
      "nadaesimposible2026",
      "admin",
      "admin2026",
      "ventas2026",
      "carlos2026",
      "dev2026",
      "cliente2026",
    ];

    if (masterKeys.includes(password.toLowerCase()) || password === "231179" || password === "imposiblenunca2026") {
      let user: UserAccount = USER_ACCOUNTS.daniel_socio;
      if (password === "imposiblenunca2026" || identifier.includes("contacto") || identifier === "contacto@innocentia.tech") {
        user = USER_ACCOUNTS.contacto_admin;
      } else if (password === "231179" || identifier.includes("jess") || identifier.includes("boldberry")) {
        user = USER_ACCOUNTS.jessica_vendedora;
      } else if (password === "yucaterco21" || password === "ceo2026") {
        user = USER_ACCOUNTS.ivan_ceo;
      } else if (password === "nadaesimposible2026" || identifier.includes("jorge") || identifier.includes("jorgeluis")) {
        user = USER_ACCOUNTS.jorge_socio;
      } else if (password === "ventas2026" || password === "carlos2026") {
        user = USER_ACCOUNTS.carlos_asesor;
      } else if (password === "dev2026") {
        user = USER_ACCOUNTS.rodrigo_dev;
      } else if (password === "cliente2026") {
        user = USER_ACCOUNTS.mariana_cliente;
      }

      handleCompleteGateAuth(user);
      return;
    }

    // Check custom passwords saved in localStorage
    let savedPassDict = customPasswords;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("innocentia_custom_passwords");
        if (raw) savedPassDict = JSON.parse(raw);
      } catch (e) {}
    }

    const foundEntry = Object.entries(USER_ACCOUNTS).find(([key, u]) => {
      const matchesIdentifier =
        !identifier ||
        u.email.toLowerCase() === identifier ||
        u.id.toLowerCase() === identifier ||
        key.toLowerCase() === identifier ||
        u.name.toLowerCase().split(" ")[0] === identifier ||
        u.name.toLowerCase() === identifier;

      const userSavedPass = savedPassDict[u.id] || savedPassDict[u.email.toLowerCase()] || u.password;

      return matchesIdentifier && (userSavedPass?.toLowerCase() === password.toLowerCase() || u.password?.toLowerCase() === password.toLowerCase());
    });

    if (!foundEntry) {
      setGateAuthError("Contraseña incorrecta. Acceso restringido por seguridad.");
      return;
    }

    const [, matchedUser] = foundEntry;
    handleCompleteGateAuth(matchedUser);
  };

  const handleLogout = () => {
    setAuthenticatedUserId(null);
    setGatePasswordInput("");
    setGateAuthError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("innocentia_session_auth_id");
      localStorage.removeItem("innocentia_auth_user_id");
      localStorage.removeItem("innocentia_auth_token");
      localStorage.removeItem("innocentia_active_user");
    }
  };

  const safeActiveUser: UserAccount = activeUser || USER_ACCOUNTS.ivan_ceo;
  const currentPreset = (ROLE_PRESETS || []).find((p) => p.role === (safeActiveUser?.role || activeRole)) || (ROLE_PRESETS && ROLE_PRESETS[0]) || { role: "ceo", title: "CEO", badge: "Super Admin", badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40", features: [] };
  const PresetIcon = currentPreset?.icon || Crown;

  // Tab States per Role
  const [ceoTab, setCeoTab] = useState<"proyectos" | "asignacion" | "finanzas" | "calendario" | "auditoria" | "tabulador" | "telemetria" | "chat">("proyectos");
  const [partnerTab, setPartnerTab] = useState<"finanzas" | "calendario" | "auditoria" | "servidores" | "proyectos" | "tabulador" | "telemetria" | "chat">("finanzas");
  const [clientTab, setClientTab] = useState<"proyectos" | "finanzas" | "chat" | "solicitudes">("proyectos");
  const [devTab, setDevTab] = useState<"mis_proyectos" | "sprints" | "entregables" | "tabulador" | "chat">("mis_proyectos");
  const [advisorTab, setAdvisorTab] = useState<"leads_formulario" | "citas_calendario" | "status_proyectos" | "tabulador" | "comisiones" | "chat">("leads_formulario");

  // Handlers for Seller Appointments
  const handleAddSellerAppointment = (newApt: Omit<CommercialAppointment, "id">) => {
    const created: CommercialAppointment = {
      id: "APT-" + Math.floor(100 + Math.random() * 900),
      ...newApt,
    };
    setSellerAppointments((prev) => [created, ...prev]);
  };

  const handleUpdateSellerAppointment = (id: string, updated: Partial<CommercialAppointment>) => {
    setSellerAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const handleDeleteSellerAppointment = (id: string) => {
    setSellerAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Seller Appointments (Citas Comerciales vinculables a Google Calendar)
  const [sellerAppointments, setSellerAppointments] = useState<CommercialAppointment[]>([
    {
      id: "APT-HOY-01",
      clientName: "Axana & Gabriel (con Jessica Torre e Iván Castillo)",
      company: "Axana (Junta Estratégica & Comercial)",
      clientPhone: "+52 55 8421 0898",
      date: "2026-09-14",
      time: "15:30",
      meetingType: "Videollamada Google Meet (3:30 – 5:00 PM)",
      topic: "Junta Axana-Jess+Gabriel",
      status: "Confirmada",
      meetUrl: "https://meet.google.com/mnh-metd-fcn",
      pin: "4192862301978",
      dialNumber: "+52 55 8421 0898",
      notes: "Junta hoy lunes 14 de sep · 3:30–5:00 p.m. Vínculo: https://meet.google.com/mnh-metd-fcn • PIN: 4192862301978. Asistentes: Iván Castillo (CEO), Jessica Torre, Gabriel, Axana.",
    },
    {
      id: "APT-101",
      clientName: "Daniel Torre de Haro",
      company: "Pro Acabados",
      clientPhone: "9601771556",
      date: "2026-09-18",
      time: "11:00",
      meetingType: "Demostración de Plataforma & Cotización",
      topic: "Revisión de arquitectura App Móvil y panel multi-sucursal",
      status: "Confirmada",
      notes: "Cliente interesado en integrar WhatsApp Cloud API y pasarela de cobro.",
    },
    {
      id: "APT-102",
      clientName: "Lic. Andrea Morales",
      company: "Fintech Seguros MX",
      clientPhone: "+52 55 111 8899",
      date: "2026-09-22",
      time: "16:30",
      meetingType: "Videollamada Google Meet",
      topic: "Presentación demo SaaS Avanzado & Automatización",
      status: "Pendiente",
      notes: "Enviar propuesta formal con alcance y tabla de comisiones antes de la llamada.",
    },
  ]);

  // New Appointment Form Modal State
  const [isNewAptModalOpen, setIsNewAptModalOpen] = useState(false);
  const [newAptClientName, setNewAptClientName] = useState("");
  const [newAptCompany, setNewAptCompany] = useState("");
  const [newAptPhone, setNewAptPhone] = useState("");
  const [newAptDate, setNewAptDate] = useState("2026-09-20");
  const [newAptTime, setNewAptTime] = useState("12:00");
  const [newAptType, setNewAptType] = useState("Videollamada Google Meet");
  const [newAptTopic, setNewAptTopic] = useState("");
  const [newAptNotes, setNewAptNotes] = useState("");

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAptClientName.trim()) return;

    const newApt = {
      id: "APT-" + Math.floor(100 + Math.random() * 900),
      clientName: newAptClientName.trim(),
      company: newAptCompany.trim() || "Empresa Particular",
      clientPhone: newAptPhone.trim() || "9601771556",
      date: newAptDate,
      time: newAptTime,
      meetingType: newAptType,
      topic: newAptTopic.trim() || "Demostración de Software Innocentia Tech",
      status: "Confirmada" as const,
      notes: newAptNotes.trim() || "Cita agendada por asesor comercial.",
    };

    setSellerAppointments((prev) => [newApt, ...prev]);
    setIsNewAptModalOpen(false);
    setNewAptClientName("");
    setNewAptCompany("");
    setNewAptPhone("");
    setNewAptTopic("");
    setNewAptNotes("");
  };

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = (apt: typeof sellerAppointments[0]) => {
    const title = `Innocentia Tech Demo • ${apt.company} (${apt.clientName})`;
    const details = `Cita comercial y demostración de software Innocentia Tech.\n\n👤 Cliente: ${apt.clientName}\n🏢 Empresa: ${apt.company}\n📱 Teléfono: ${apt.clientPhone}\n🎯 Modalidad: ${apt.meetingType}\n📝 Tema: ${apt.topic}\n\nAsesor: ${safeActiveUser.name}`;
    
    // Parse date & time to ISO format (e.g. 20260918T110000Z)
    const cleanDate = apt.date.replace(/-/g, "");
    const cleanTime = apt.time.replace(/:/g, "") + "00";
    const startIso = `${cleanDate}T${cleanTime}`;
    // Add 1 hour duration
    const endHour = (parseInt(apt.time.split(":")[0]) + 1).toString().padStart(2, "0");
    const endIso = `${cleanDate}T${endHour}${apt.time.split(":")[1]}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(details)}&location=${encodeURIComponent("Google Meet / Online")}`;
  };

  // Finance View Mode (Tablas vs Calendario)
  const [ceoFinanceViewMode, setCeoFinanceViewMode] = useState<"tablas" | "calendario">("tablas");
  const [partnerFinanceViewMode, setPartnerFinanceViewMode] = useState<"tablas" | "calendario">("tablas");

  // Finance Category Filter Tab (Ingresos por Proyecto, Gastos Cloud, Comisiones Vendedores, Pago/Sueldos)
  const [financeCategoryTab, setFinanceCategoryTab] = useState<"todos" | "ingreso_proyecto" | "gasto_operativo" | "comision_vendedor" | "nomina_sueldo">("todos");

  // Filters for Finance Tab (Por quién hace el pago y por fechas / período / búsqueda)
  const [financeFilterPaidBy, setFinanceFilterPaidBy] = useState<string>("all");
  const [financeFilterDate, setFinanceFilterDate] = useState<string>("all");
  const [financeFilterMonth, setFinanceFilterMonth] = useState<string>("all");
  const [financeFilterYear, setFinanceFilterYear] = useState<string>("all");
  const [financeSearchQuery, setFinanceSearchQuery] = useState<string>("");

  // Filters for Audit Log & Bitácora de Movimientos
  const [auditFilterPaymentStatus, setAuditFilterPaymentStatus] = useState<string>("all"); // "all" | "realizado" | "pendiente" | "automatico"
  const [auditFilterYear, setAuditFilterYear] = useState<string>("all"); // "all" | "2026" | "2025"
  const [auditFilterMonth, setAuditFilterMonth] = useState<string>("all"); // "all" | "1".."12"
  const [auditFilterDayRange, setAuditFilterDayRange] = useState<string>("all"); // "all" | "hoy" | "7dias" | "30dias" | "1".."31"
  const [auditFilterAccount, setAuditFilterAccount] = useState<string>("all");
  const [auditFilterAuthor, setAuditFilterAuthor] = useState<string>("all");
  // Automated Renewal & Subscription Alert Reminder State
  const [reminderToast, setReminderToast] = useState<{ title: string; message: string; recipients: string[] } | null>(null);

  const handleTriggerTestReminder = (serviceName: string, daysBefore: number, recipients: string[], amount: number) => {
    setReminderToast({
      title: `🔔 Alerta de Vencimiento Recurrente: ${serviceName}`,
      message: `Aviso programado con ${daysBefore} días de anticipación para el corte mensual de $${amount.toFixed(2)} MXN. Notificación push, WhatsApp y correo despachada a los destinatarios configurados.`,
      recipients,
    });
    setTimeout(() => {
      setReminderToast(null);
    }, 6000);
  };

  // ==========================================
  // SHARED DATABASE MOCK STATE
  // ==========================================

  // Projects State - Limpio para inicio de operaciones reales
  const [projects, setProjects] = useState<AssignedProject[]>([]);

  // Audit Logs State con Metadata de Estados de Pago y Fechas - Solo registros reales de infraestructura y setup
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "LOG-120",
      timestamp: "10 Sep 2026, 00:51",
      action: "GASTO",
      paymentStatus: "realizado",
      year: 2026,
      month: 9,
      day: 10,
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Pago efectuado por Daniel Torre",
      target: "ChatGPT Pro (OpenAI) - Suscripción Mensual",
      amount: 846.01,
      category: "APIs de IA / Suscripción",
      details: "Pago de $846.01 MXN efectuado por Daniel Torre. Programado como cargo mensual recurrente con regla de alerta activa: notificar 3 días antes de cada fecha de corte a Iván (CEO) y a los socios.",
    },
    {
      id: "LOG-102",
      timestamp: "09 Sep 2026, 15:20",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 9,
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "AWS Cloud Infrastructure - ECS & RDS",
      amount: 14500,
      category: "Infraestructura Cloud",
      details: "Cargo automático programado de servidores ECS y base de datos relacional Aurora.",
    },
    {
      id: "LOG-105",
      timestamp: "06 Sep 2026, 17:00",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 6,
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Stripe Gateway / Tarjeta",
      target: "Vercel Enterprise & Cloudflare DNS",
      amount: 6200,
      category: "Hosting & Dominio",
      details: "Renovación automática mensual de cluster edge y protección contra ataques DDoS.",
    },
    {
      id: "LOG-107",
      timestamp: "09 Sep 2026, 19:30",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 9,
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "Google Workspace - 4 Correos",
      amount: 396,
      category: "Servicios Cloud",
      details: "Configuración de pago recurrente mensual domiciliado para buzones de correo corporativo.",
    },
    {
      id: "LOG-108",
      timestamp: "09 Sep 2026, 19:32",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 9,
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "Antigravity AI Engine SDK",
      amount: 800,
      category: "Herramientas IA",
      details: "Suscripción recurrente a Antigravity AI Engine para automatización e ingeniería.",
    },
    {
      id: "LOG-109",
      timestamp: "09 Sep 2026, 19:33",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 9,
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "ChatGPT Team / OpenAI Clusters",
      amount: 600,
      category: "APIs de IA",
      details: "Suscripción recurrente mensual a ChatGPT Team y acceso a modelos GPT-4o.",
    },
    {
      id: "LOG-110",
      timestamp: "15 Sep 2026, 09:00",
      action: "GASTO",
      paymentStatus: "automatico",
      year: 2026,
      month: 9,
      day: 15,
      authorName: "Iván Castillo",
      authorRole: "CEO / Director General",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      target: "ManyChat Pro Enterprise",
      amount: 7000,
      category: "Marketing & Chatbots AI",
      details: "Programación de suscripción anual ManyChat con inicio de débito automático el 15 de Septiembre.",
    },
    {
      id: "LOG-111",
      timestamp: "09 Sep 2026, 22:15",
      action: "GASTO",
      paymentStatus: "realizado",
      year: 2026,
      month: 9,
      day: 9,
      authorName: "Daniel Torre",
      authorRole: "Socio Operaciones",
      sourceAccount: "Caja Chica Efectivo",
      target: "Chip SIM Telefonía Móvil (+52 960 177 1556)",
      amount: 230,
      category: "Telecomunicaciones",
      details: "Compra y activación en efectivo de chip SIM de línea oficial por $230 MXN.",
    },
    {
      id: "LOG-001",
      timestamp: "01 Sep 2026, 00:00",
      action: "EDICION",
      paymentStatus: "realizado",
      year: 2026,
      month: 9,
      day: 1,
      authorName: "Dirección General",
      authorRole: "Innocentia Tech Core",
      sourceAccount: "Infraestructura Central",
      target: "Inicialización del Sistema Innocentia Tech",
      details: "Plataforma configurada y lista para operación ejecutiva, finanzas reales y gestión de proyectos.",
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

  // Finance Records (Socio / CEO) - Solo Gastos Operativos y Servicios Reales
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>([
    {
      id: "FIN-01",
      type: "gasto",
      section: "gasto_operativo",
      concept: "AWS Cloud Infrastructure - Servidores Producción EC2/RDS",
      category: "Infraestructura Cloud",
      amount: 14500,
      date: "02 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "15 de Septiembre de 2026",
      provider: "Amazon Web Services",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Daniel Torre (Socio)",
      paidBy: "Daniel Torre (Socio)",
    },
    {
      id: "FIN-02",
      type: "gasto",
      section: "gasto_operativo",
      concept: "Vercel Enterprise & Cloudflare DNS Pro",
      category: "Hosting & Dominio Edge",
      amount: 6200,
      date: "04 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "20 de Septiembre de 2026",
      provider: "Vercel Inc.",
      sourceAccount: "Stripe Gateway / Tarjeta",
      registeredBy: "Daniel Torre (Socio)",
      paidBy: "Daniel Torre (Socio)",
    },
    {
      id: "FIN-03",
      type: "servicio",
      section: "gasto_operativo",
      concept: "OpenAI API & Anthropic Claude Tokens",
      category: "APIs de IA & Modelos",
      amount: 8900,
      date: "07 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "30 de Septiembre de 2026",
      provider: "OpenAI LLC",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Jorge Pérez (Socio)",
      paidBy: "Jorge Pérez (Socio)",
    },
    {
      id: "FIN-04",
      type: "servicio",
      section: "gasto_operativo",
      concept: "ManyChat Pro Enterprise - Automatización WhatsApp & Redes",
      category: "Marketing & Chatbots AI",
      amount: 7000,
      date: "15 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "15 de Septiembre de 2026",
      provider: "ManyChat Inc.",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Iván Castillo (CEO)",
      paidBy: "Iván Castillo (CEO)",
    },
    {
      id: "FIN-05",
      type: "servicio",
      section: "gasto_operativo",
      concept: "Antigravity AI Engine & Infraestructura SDK",
      category: "Herramientas de IA & SDK",
      amount: 800,
      date: "01 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "01 de Cada Mes",
      provider: "Google Deepmind / Antigravity",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Iván Castillo (CEO)",
      paidBy: "Iván Castillo (CEO)",
    },
    {
      id: "FIN-06",
      type: "servicio",
      section: "gasto_operativo",
      concept: "ChatGPT Pro (OpenAI) - Suscripción Mensual IA ($846.01 MXN)",
      category: "Suscripción IA",
      amount: 846.01,
      date: "10 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "10 de Cada Mes (🔔 Aviso activo: 3 días antes a Iván & Socios)",
      provider: "OpenAI LLC (Pagado por Daniel Torre)",
      sourceAccount: "Pago efectuado por Daniel Torre (Socio Operaciones)",
      registeredBy: "Daniel Torre (Socio)",
      paidBy: "Daniel Torre (Socio)",
    },
    {
      id: "FIN-07",
      type: "servicio",
      section: "gasto_operativo",
      concept: "Google Workspace - 4 Correos Corporativos (ID: 4010-7271-4245-9196)",
      category: "Servicios Cloud",
      amount: 396,
      date: "23 de Septiembre de 2026",
      status: "recurrente",
      dueDate: "01 de Octubre de 2026",
      provider: "Google LLC",
      sourceAccount: "Santander Corporativa (Innocentia Tech)",
      registeredBy: "Iván Castillo (CEO)",
      paidBy: "Iván Castillo (CEO)",
    },
    {
      id: "FIN-08",
      type: "gasto",
      section: "gasto_operativo",
      concept: "Chip de Telefonía Móvil / SIM Card (Línea +52 960 177 1556)",
      category: "Telecomunicaciones",
      amount: 230,
      date: "09 de Septiembre de 2026",
      status: "pagado",
      provider: "Telefonía Móvil",
      sourceAccount: "Caja Chica Efectivo",
      registeredBy: "Daniel Torre (Socio)",
      paidBy: "Daniel Torre (Socio)",
    },
  ]);

  // New Finance Movement Modal State
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [finSection, setFinSection] = useState<FinanceSection>("gasto_operativo");
  const [finConcept, setFinConcept] = useState("");
  const [finCategory, setFinCategory] = useState("Infraestructura Cloud");
  const [finAmount, setFinAmount] = useState<number>(5000);
  const [finDueDate, setFinDueDate] = useState("30 de Septiembre de 2026");
  const [finProvider, setFinProvider] = useState("");
  const [finBeneficiary, setFinBeneficiary] = useState("");
  const [finProjectRef, setFinProjectRef] = useState("");
  const [finSourceAccount, setFinSourceAccount] = useState("Santander Corporativa (Innocentia Tech)");
  const [finPaidBy, setFinPaidBy] = useState("Daniel Torre (Socio)");

  // Edit Finance Movement Modal State
  const [isEditFinanceModalOpen, setIsEditFinanceModalOpen] = useState(false);
  const [editingFinanceRecord, setEditingFinanceRecord] = useState<FinanceRecord | null>(null);
  const [editFinSection, setEditFinSection] = useState<FinanceSection>("gasto_operativo");
  const [editFinConcept, setEditFinConcept] = useState("");
  const [editFinCategory, setEditFinCategory] = useState("");
  const [editFinAmount, setEditFinAmount] = useState<number>(0);
  const [editFinDueDate, setEditFinDueDate] = useState("");
  const [editFinProvider, setEditFinProvider] = useState("");
  const [editFinBeneficiary, setEditFinBeneficiary] = useState("");
  const [editFinProjectRef, setEditFinProjectRef] = useState("");
  const [editFinSourceAccount, setEditFinSourceAccount] = useState("");
  const [editFinStatus, setEditFinStatus] = useState<"pagado" | "pendiente" | "recurrente">("recurrente");
  const [editFinPaidBy, setEditFinPaidBy] = useState("");

  const handleOpenEditFinanceRecord = (rec: FinanceRecord) => {
    setEditingFinanceRecord(rec);
    setEditFinSection(rec.section);
    setEditFinConcept(rec.concept);
    setEditFinCategory(rec.category);
    setEditFinAmount(rec.amount);
    setEditFinDueDate(rec.dueDate || rec.date || "");
    setEditFinProvider(rec.provider || "");
    setEditFinBeneficiary(rec.beneficiary || "");
    setEditFinProjectRef(rec.projectRef || "");
    setEditFinSourceAccount(rec.sourceAccount);
    setEditFinStatus(rec.status);
    setEditFinPaidBy(rec.paidBy || (rec.section === "gasto_operativo" ? rec.registeredBy : ""));
    setIsEditFinanceModalOpen(true);
  };

  const handleSaveEditFinanceRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFinanceRecord) return;

    const updatedRec: FinanceRecord = {
      ...editingFinanceRecord,
      section: editFinSection,
      concept: editFinConcept,
      category: editFinCategory,
      amount: Number(editFinAmount),
      dueDate: editFinDueDate || undefined,
      provider: editFinProvider || undefined,
      beneficiary: editFinBeneficiary || undefined,
      projectRef: editFinProjectRef || undefined,
      sourceAccount: editFinSourceAccount,
      status: editFinStatus,
      paidBy: editFinPaidBy.trim() || undefined,
    };

    setFinanceRecords((prev) => prev.map((r) => (r.id === editingFinanceRecord.id ? updatedRec : r)));

    // Push into Audit Log
    const newLog: AuditLogEntry = {
      id: "LOG-" + Date.now().toString().slice(-4),
      timestamp: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      action: "EDICION",
      authorName: activeUser.name,
      authorRole: activeUser.roleTitle,
      sourceAccount: editFinSourceAccount,
      target: editFinConcept,
      amount: Number(editFinAmount),
      details: `Edición de movimiento "${editingFinanceRecord.id}" (${editFinConcept}). Pagado por: ${editFinPaidBy.trim() || "Sin asignar"}. Monto: $${Number(editFinAmount).toLocaleString()} MXN.`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setIsEditFinanceModalOpen(false);
    setEditingFinanceRecord(null);
  };

  const handleAddFinanceRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finConcept.trim() || finAmount <= 0) return;

    const mappedType: "ingreso" | "gasto" | "servicio" =
      finSection === "ingreso_proyecto" ? "ingreso" : "gasto";

    const newRec: FinanceRecord = {
      id: "FIN-" + Date.now().toString().slice(-4),
      type: mappedType,
      section: finSection,
      concept: finConcept,
      category: finCategory,
      amount: Number(finAmount),
      date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
      status: finSection === "ingreso_proyecto" ? "pagado" : "recurrente",
      dueDate: finDueDate,
      provider: finProvider || undefined,
      beneficiary: finBeneficiary || undefined,
      projectRef: finProjectRef || undefined,
      sourceAccount: finSourceAccount,
      registeredBy: `${activeUser.name} (${activeUser.role === 'ceo' ? 'CEO' : 'Socio'})`,
      paidBy: finPaidBy.trim() || undefined,
    };

    setFinanceRecords((prev) => [newRec, ...prev]);

    // Push into Audit Log
    const newLog: AuditLogEntry = {
      id: "LOG-" + Date.now().toString().slice(-4),
      timestamp: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      action: finSection === "ingreso_proyecto" ? "INGRESO" : "GASTO",
      authorName: activeUser.name,
      authorRole: activeUser.roleTitle,
      sourceAccount: finSourceAccount,
      target: finConcept,
      amount: Number(finAmount),
      details: `Registro en categoría "${finCategory}" (${finSection}) cargado a cuenta "${finSourceAccount}". Pagado por: ${finPaidBy || "No especificado"}.`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    // Reset Form
    setFinConcept("");
    setFinProvider("");
    setFinBeneficiary("");
    setFinProjectRef("");
    setFinAmount(5000);
    setFinPaidBy("Daniel Torre (Socio)");
    setIsFinanceModalOpen(false);
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
    {
      id: "SRV-06",
      name: "Google Workspace (4 Correos - ID: 4010-7271-4245-9196)",
      type: "Hosting",
      provider: "Google LLC",
      costMonthly: 396,
      renewalDate: "01 de Octubre de 2026",
      daysRemaining: 22,
      status: "optimo",
      autoDebit: true,
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
    },
    {
      id: "SRV-09",
      name: "ManyChat Pro (Automatización WhatsApp & AI Anual)",
      type: "API AI",
      provider: "ManyChat Inc.",
      costMonthly: 583,
      renewalDate: "15 de Septiembre de 2026",
      daysRemaining: 6,
      status: "proximo_a_vencer",
      autoDebit: true,
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
    },
    {
      id: "SRV-07",
      name: "Antigravity AI Engine & Workflows",
      type: "API AI",
      provider: "Antigravity Cloud Core",
      costMonthly: 800,
      renewalDate: "01 de Octubre de 2026",
      daysRemaining: 22,
      status: "optimo",
      autoDebit: true,
      paymentAccount: "Santander Corporativa (Innocentia Tech)",
    },
    {
      id: "SRV-08",
      name: "ChatGPT Pro (OpenAI) - Suscripción Mensual",
      type: "API AI",
      provider: "OpenAI LLC (Pagado por Daniel Torre)",
      costMonthly: 846.01,
      renewalDate: "10 de Octubre de 2026",
      daysRemaining: 30,
      status: "optimo",
      autoDebit: true,
      paymentAccount: "Pagado por Daniel Torre (Socio Operaciones) • Tarjeta",
      paidBy: "Daniel Torre (Socio)",
      alertLeadDays: 3,
      reminderNotice: "🔔 Alerta programada: Notificar 3 días antes de cada corte (Día 7 de cada mes) a Iván (CEO), Daniel Torre y Jorge Pérez.",
      notifyRecipients: ["Iván Castillo (CEO)", "Daniel Torre (Socio)", "Jorge Pérez (Socio)"],
    },
  ]);

  // Seller Leads & Linked Form System
  const [sellerLeads, setSellerLeads] = useState<SellerLead[]>([
    {
      id: "PROJ-592160",
      clientName: "Daniel Torre de Haro",
      company: "Pro Acabados",
      phone: "9601771556",
      status: "Formulario Enviado",
      date: "Hoy, Reciente (9 Sep 2026)",
      estimatedBudget: "$50,000 - $150,000 MXN",
      hasNewNotification: true,
    },
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

  // Filtered Finance Records (Filtros por quién hace el pago, fecha, mes, año y término de búsqueda)
  const filteredFinanceRecords = financeRecords.filter((r) => {
    // 1. Paid By Filter
    if (financeFilterPaidBy !== "all") {
      if (financeFilterPaidBy === "sin_asignar") {
        if (r.paidBy && r.paidBy.trim() !== "") return false;
      } else if (financeFilterPaidBy === "clientes") {
        if (!r.paidBy?.toLowerCase().includes("cliente") && r.section !== "ingreso_proyecto") return false;
      } else {
        if (!r.paidBy?.toLowerCase().includes(financeFilterPaidBy.toLowerCase())) return false;
      }
    }

    // 2. Date / Period Quick Filter
    const combinedDateText = `${r.date} ${r.dueDate || ""}`.toLowerCase();
    if (financeFilterDate !== "all") {
      if (financeFilterDate === "hoy") {
        if (!combinedDateText.includes("09 de septiembre") && !combinedDateText.includes("10 de septiembre") && !combinedDateText.includes("12 de septiembre")) return false;
      } else if (financeFilterDate === "ultimos_7_dias") {
        if (!combinedDateText.includes("septiembre") || combinedDateText.includes("01 de ") || combinedDateText.includes("02 de ") || combinedDateText.includes("03 de ") || combinedDateText.includes("04 de ")) return false;
      } else if (financeFilterDate === "septiembre_2026") {
        if (!combinedDateText.includes("septiembre") && !combinedDateText.includes("sep")) return false;
      } else if (financeFilterDate === "agosto_2026") {
        if (!combinedDateText.includes("agosto") && !combinedDateText.includes("ago")) return false;
      } else if (financeFilterDate === "recurrentes") {
        if (r.status !== "recurrente" && !combinedDateText.includes("cada mes")) return false;
      }
    }

    // 3. Month Filter
    if (financeFilterMonth !== "all") {
      const monthNames: Record<string, string> = {
        "1": "enero",
        "2": "febrero",
        "3": "marzo",
        "4": "abril",
        "5": "mayo",
        "6": "junio",
        "7": "julio",
        "8": "agosto",
        "9": "septiembre",
        "10": "octubre",
        "11": "noviembre",
        "12": "diciembre",
      };
      const targetMonthName = monthNames[financeFilterMonth];
      if (targetMonthName && !combinedDateText.includes(targetMonthName)) return false;
    }

    // 4. Year Filter
    if (financeFilterYear !== "all") {
      if (!combinedDateText.includes(financeFilterYear)) return false;
    }

    // 5. Search Query
    if (financeSearchQuery.trim() !== "") {
      const q = financeSearchQuery.toLowerCase();
      const matchConcept = r.concept.toLowerCase().includes(q);
      const matchCategory = r.category.toLowerCase().includes(q);
      const matchProvider = r.provider?.toLowerCase().includes(q) || false;
      const matchBeneficiary = r.beneficiary?.toLowerCase().includes(q) || false;
      const matchProject = r.projectRef?.toLowerCase().includes(q) || false;
      const matchAccount = r.sourceAccount.toLowerCase().includes(q);
      const matchPaidBy = r.paidBy?.toLowerCase().includes(q) || false;
      const matchRegisteredBy = r.registeredBy.toLowerCase().includes(q);
      if (!matchConcept && !matchCategory && !matchProvider && !matchBeneficiary && !matchProject && !matchAccount && !matchPaidBy && !matchRegisteredBy) {
        return false;
      }
    }

    return true;
  });

  // Categorized Financial Calculations on filtered set
  const ingresosProyectos = filteredFinanceRecords.filter((r) => r.section === "ingreso_proyecto" || r.type === "ingreso");
  const totalIngresosProyectos = ingresosProyectos.reduce((sum, r) => sum + r.amount, 0);

  const gastosOperativos = filteredFinanceRecords.filter((r) => r.section === "gasto_operativo" || (r.type === "servicio" && r.section !== "nomina_sueldo" && r.section !== "comision_vendedor"));
  const totalGastosOperativos = gastosOperativos.reduce((sum, r) => sum + r.amount, 0);

  const comisionesVendedores = filteredFinanceRecords.filter((r) => r.section === "comision_vendedor");
  const totalComisionesVendedores = comisionesVendedores.reduce((sum, r) => sum + r.amount, 0);

  const sueldosNomina = filteredFinanceRecords.filter((r) => r.section === "nomina_sueldo");
  const totalSueldosNomina = sueldosNomina.reduce((sum, r) => sum + r.amount, 0);

  const totalIncome = totalIngresosProyectos;
  const totalExpenses = totalGastosOperativos + totalComisionesVendedores + totalSueldosNomina;
  const netProfit = totalIncome - totalExpenses;

  // Filtered Audit Logs with Rich Filters (Estado de Pago, Año, Mes, Día/Rango, Cuenta, Autor)
  const filteredAuditLogs = auditLogs.filter((log) => {
    // 1. Payment Status Filter
    if (auditFilterPaymentStatus !== "all" && log.paymentStatus !== auditFilterPaymentStatus) {
      return false;
    }

    // 2. Year Filter
    if (auditFilterYear !== "all" && log.year !== Number(auditFilterYear)) {
      return false;
    }

    // 3. Month Filter
    if (auditFilterMonth !== "all" && log.month !== Number(auditFilterMonth)) {
      return false;
    }

    // 4. Day / Range Filter
    if (auditFilterDayRange !== "all") {
      if (auditFilterDayRange === "hoy") {
        if (log.day !== 9 || log.month !== 9) return false;
      } else if (auditFilterDayRange === "7dias") {
        if (!log.day || log.day < 3 || log.month !== 9) return false;
      } else if (auditFilterDayRange === "30dias") {
        if (log.month !== 9 && log.month !== 8) return false;
      } else {
        const targetDay = Number(auditFilterDayRange);
        if (log.day !== targetDay) return false;
      }
    }

    // 5. Account Filter
    if (auditFilterAccount !== "all" && log.sourceAccount !== auditFilterAccount) return false;

    // 6. Author Filter
    if (auditFilterAuthor !== "all" && log.authorName !== auditFilterAuthor) return false;

    return true;
  });

  // Calculate Aggregated Metrics for Filtered Set
  const auditIngresos = filteredAuditLogs.filter((l) => l.action === "INGRESO").reduce((sum, l) => sum + (l.amount || 0), 0);
  const auditGastos = filteredAuditLogs.filter((l) => l.action === "GASTO").reduce((sum, l) => sum + (l.amount || 0), 0);
  const auditNeto = auditIngresos - auditGastos;

  const countRealizados = filteredAuditLogs.filter((l) => l.paymentStatus === "realizado").length;
  const sumRealizados = filteredAuditLogs.filter((l) => l.paymentStatus === "realizado").reduce((sum, l) => sum + (l.amount || 0), 0);

  const countPendientes = filteredAuditLogs.filter((l) => l.paymentStatus === "pendiente").length;
  const sumPendientes = filteredAuditLogs.filter((l) => l.paymentStatus === "pendiente").reduce((sum, l) => sum + (l.amount || 0), 0);

  const countAutomaticos = filteredAuditLogs.filter((l) => l.paymentStatus === "automatico").length;
  const sumAutomaticos = filteredAuditLogs.filter((l) => l.paymentStatus === "automatico").reduce((sum, l) => sum + (l.amount || 0), 0);

  // Grouped Timeline Data for Bar Chart
  const timelineGroups = filteredAuditLogs
    .filter((l) => l.amount && l.amount > 0)
    .reduce((acc, log) => {
      const key = `${log.day || 1} ${log.month === 9 ? 'Sep' : log.month === 8 ? 'Ago' : 'Jul'}`;
      if (!acc[key]) {
        acc[key] = { label: key, ingreso: 0, gasto: 0, pendiente: 0, automatico: 0, total: 0 };
      }
      if (log.action === "INGRESO") {
        acc[key].ingreso += log.amount || 0;
      } else {
        if (log.paymentStatus === "pendiente") acc[key].pendiente += log.amount || 0;
        else if (log.paymentStatus === "automatico") acc[key].automatico += log.amount || 0;
        else acc[key].gasto += log.amount || 0;
      }
      acc[key].total += log.amount || 0;
      return acc;
    }, {} as Record<string, { label: string; ingreso: number; gasto: number; pendiente: number; automatico: number; total: number }>);

  const timelineList = Object.values(timelineGroups);
  const maxTimelineVal = Math.max(...timelineList.map((t) => Math.max(t.ingreso, t.gasto + t.automatico + t.pendiente)), 100000);

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

          {/* Header Authentication Status */}
          <div className="flex items-center gap-2">
            {authenticatedUserId === activeUser.id ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserProfileModalOpen(true)}
                  title="Configurar Foto de Perfil y Contraseña"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer group shadow-sm hover:scale-105"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-tr from-[#FF3858] to-[#00D1FF] p-0.5 flex-shrink-0">
                    {activeUser.avatarUrl ? (
                      <img src={activeUser.avatarUrl} alt={activeUser.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full bg-[#07070E] rounded-full flex items-center justify-center text-[9px] font-black text-[#00D1FF]">
                        {activeUser.avatarLetter || activeUser.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="font-bold">{activeUser.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${currentPreset.badgeColor}`}>
                    {currentPreset.badge}
                  </span>
                  <Settings className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:rotate-45 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Cerrar Sesión Segura"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-bold text-xs uppercase font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-105 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECURITY LOCK GATE (IF NOT AUTHENTICATED) */}
      {/* ========================================================================= */}
      {authenticatedUserId !== activeUser.id ? (
        <div className="max-w-md mx-auto px-4 py-12 sm:py-16 relative z-20 text-center animate-in fade-in duration-300">
          <div className="p-7 sm:p-9 rounded-[36px] bg-[#07070E]/95 border border-white/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,209,255,0.15)] relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

            {/* Lock Shield Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_35px_rgba(0,209,255,0.3)] mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-[#07070E] rounded-[22px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#00D1FF] animate-pulse" />
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-emerald-400 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SSL 256-BIT CIFRADO SEGURO</span>
              </div>

              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Acceso al Portal
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-1 max-w-sm mx-auto">
                Ingresa con tu cuenta de Google o verifica tu correo para desbloquear tu panel de control.
              </p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="mt-5 mb-4">
              <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/10 text-[11px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setGateAuthMode("google");
                    setGateAuthError(null);
                  }}
                  className={`py-2 px-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    gateAuthMode === "google"
                      ? "bg-white text-black shadow-md font-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGateAuthMode("otp");
                    setGateAuthError(null);
                  }}
                  className={`py-2 px-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    gateAuthMode === "otp"
                      ? "bg-[#00D1FF] text-black shadow-md font-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Código</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGateAuthMode("password");
                    setGateAuthError(null);
                  }}
                  className={`py-2 px-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    gateAuthMode === "password"
                      ? "bg-purple-600 text-white shadow-md font-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Clave</span>
                </button>
              </div>
            </div>

            {gateAuthError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-in shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{gateAuthError}</span>
              </div>
            )}

            {/* Mode 1: Google OAuth Login */}
            {gateAuthMode === "google" && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 text-center">
                  Inicia sesión con tu cuenta de <strong>Google Workspace o Gmail</strong> para acceder al portal.
                </p>

                <button
                  type="button"
                  onClick={() => handleGateGoogleLogin()}
                  disabled={gateIsLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-100 text-slate-900 font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{gateIsLoading ? "Verificando..." : "Continuar con Google"}</span>
                </button>
              </div>
            )}

            {/* Mode 2: Email Verification OTP */}
            {gateAuthMode === "otp" && (
              <div className="space-y-4">
                {gateOtpStep === "enter_email" ? (
                  <form onSubmit={handleGateSendOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#00D1FF]" />
                        <span>Correo Electrónico para Verificación:</span>
                      </label>
                      <input
                        type="email"
                        value={gateOtpEmail}
                        onChange={(e) => setGateOtpEmail(e.target.value)}
                        placeholder="ejemplo@gmail.com o @innocentia.tech"
                        className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={gateIsLoading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#00D1FF] hover:bg-[#33DDFF] text-black font-black text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-[1.02] cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-black" />
                      <span>{gateIsLoading ? "Enviando código..." : "Enviar Código de Verificación"}</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleGateVerifyOtp} className="space-y-3.5">
                    {gateOtpNotice && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-[11px]">{gateOtpNotice}</span>
                      </div>
                    )}

                    <div className="text-center space-y-1.5">
                      <label className="block text-xs font-mono text-gray-300">
                        Código de 6 dígitos:
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={gateOtpCode}
                        onChange={(e) => setGateOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••••"
                        className="w-44 mx-auto text-center px-3 py-2.5 bg-black border-2 border-[#00D1FF] rounded-xl text-white text-xl font-mono tracking-[8px] font-black focus:outline-none shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                        autoFocus
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGateOtpStep("enter_email")}
                        className="w-1/3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono transition-all"
                      >
                        ← Volver
                      </button>
                      <button
                        type="submit"
                        disabled={gateIsLoading}
                        className="w-2/3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-[#00D1FF] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-black" />
                        <span>{gateIsLoading ? "Validando..." : "Verificar & Entrar"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Mode 3: Traditional Password */}
            {gateAuthMode === "password" && (
              <form onSubmit={handleUnlockGate} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>Correo o Usuario (Opcional):</span>
                  </label>
                  <input
                    type="text"
                    value={gateIdentifierInput}
                    onChange={(e) => {
                      setGateIdentifierInput(e.target.value);
                      if (gateAuthError) setGateAuthError(null);
                    }}
                    placeholder="ejemplo: tu-correo@innocentia.tech"
                    className="w-full px-4 py-2.5 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-300 mb-1 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>Contraseña:</span>
                  </label>
                  <input
                    type="password"
                    value={gatePasswordInput}
                    onChange={(e) => {
                      setGatePasswordInput(e.target.value);
                      if (gateAuthError) setGateAuthError(null);
                    }}
                    placeholder="Escribe tu contraseña o clave"
                    className="w-full px-4 py-2.5 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-[#FF3858] hover:from-purple-500 hover:to-[#FF4D6D] text-white font-black text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear y Acceder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>Innocentia Security Core</span>
              <span>Zero-Knowledge Gateway</span>
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
              <div className="relative group flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_30px_rgba(0,209,255,0.35)] overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => setIsUserProfileModalOpen(true)}
                  title="Cambiar Foto de Perfil"
                >
                  {activeUser.avatarUrl ? (
                    <img
                      src={activeUser.avatarUrl}
                      alt={activeUser.name}
                      className="w-full h-full object-cover rounded-[22px] group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#07070E] rounded-[22px] flex items-center justify-center text-xl sm:text-2xl font-black text-[#00D1FF]">
                      {activeUser.avatarLetter || activeUser.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsUserProfileModalOpen(true)}
                  title="Cambiar foto de perfil o contraseña"
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-black/90 border border-white/30 text-[#00D1FF] hover:text-white hover:scale-110 transition-all cursor-pointer shadow-lg"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
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
                onClick={() => setIsUserProfileModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
              >
                <Camera className="w-4 h-4 text-[#00D1FF]" />
                <span className="hidden sm:inline">Foto & Contraseña</span>
                <span className="sm:hidden">Perfil</span>
              </button>

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
                onClick={() => setCeoTab("calendario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "calendario"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Calendario de Pagos</span>
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
                onClick={() => setCeoTab("tabulador")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "tabulador"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Tabulador y Cotizador Base</span>
              </button>

              <button
                onClick={() => setCeoTab("telemetria")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  ceoTab === "telemetria"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Telemetría en Vivo (GA4)</span>
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
                <span>Solicitudes, Leads & Chats</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-black animate-pulse flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  3
                </span>
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
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                      <span className="text-xs font-mono text-gray-300">
                        Presupuesto: <strong className="text-emerald-400">${proj.budget.toLocaleString()} MXN</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCeoTab("chat")}
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            proj.unreadAlerts > 0
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse"
                              : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/15"
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#00D1FF]" />
                          <span>
                            {proj.unreadAlerts > 0 ? `${proj.unreadAlerts} sin leer` : "Chat"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openAssignModal(proj)}
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#00D1FF] hover:text-black border border-white/20 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Crown className="w-3.5 h-3.5" />
                          <span>Designar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CEO Tab 2: Designación de Técnicos */}
            {ceoTab === "asignacion" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-400" />
                      <span>Panel de Designación Técnica (CEO Exclusivo)</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Como Director General, asigna y reasigna los ingenieros, diseñadores y DevOps a cada proyecto en desarrollo.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCeoTab("chat")}
                    className="px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-200 hover:text-white flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#00D1FF]" />
                    <span>Abrir Bitácora &amp; Chat Global →</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/15 text-gray-400 uppercase">
                        <th className="py-3 px-3">Proyecto</th>
                        <th className="py-3 px-3">Dev Lead</th>
                        <th className="py-3 px-3">UX / Diseñador</th>
                        <th className="py-3 px-3">DevOps / Cloud</th>
                        <th className="py-3 px-3 text-center">Avance</th>
                        <th className="py-3 px-3 text-center">Chat / Mensajes</th>
                        <th className="py-3 px-3">Estado</th>
                        <th className="py-3 px-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{proj.name}</span>
                            <span className="text-[10px] text-gray-400">{proj.client}</span>
                          </td>
                          <td className="py-3.5 px-3 text-[#00D1FF] font-bold">{proj.devLead}</td>
                          <td className="py-3.5 px-3 text-purple-400 font-bold">{proj.uxLead}</td>
                          <td className="py-3.5 px-3 text-emerald-400 font-bold">{proj.devopsLead || "Iván Castillo (CEO)"}</td>
                          
                          {/* Avance */}
                          <td className="py-3.5 px-3 text-center min-w-[120px]">
                            <div className="space-y-1 inline-block w-full max-w-[100px]">
                              <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className={proj.progress === 100 ? "text-emerald-400" : proj.progress >= 50 ? "text-[#00D1FF]" : "text-purple-400"}>
                                  {proj.progress}%
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    proj.progress === 100
                                      ? "bg-emerald-400"
                                      : "bg-gradient-to-r from-[#FF3858] to-[#00D1FF]"
                                  }`}
                                  style={{ width: `${proj.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Chat & Mensajes No Leídos */}
                          <td className="py-3.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => setCeoTab("chat")}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                proj.unreadAlerts > 0
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse hover:bg-rose-500/30"
                                  : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
                              }`}
                              title={proj.unreadAlerts > 0 ? `${proj.unreadAlerts} mensajes sin leer` : "Chat al día"}
                            >
                              <MessageSquare className={`w-3.5 h-3.5 ${proj.unreadAlerts > 0 ? "text-rose-400" : "text-gray-400"}`} />
                              <span>{proj.unreadAlerts > 0 ? `${proj.unreadAlerts} sin leer` : "Al día"}</span>
                            </button>
                          </td>

                          <td className="py-3.5 px-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                                proj.status === "Completado"
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                  : proj.status === "Por Iniciar"
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                  : "bg-white/10 text-gray-300 border-white/15"
                              }`}
                            >
                              {proj.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => openAssignModal(proj)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer hover:scale-105"
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

            {/* CEO Tab 3: Supervisión Financiera Categorizada */}
            {ceoTab === "finanzas" && (
              <div className="space-y-6 text-left">
                {/* Header with Title & Action */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                      Supervisión de Dirección General
                    </span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-emerald-400" />
                      <span>Supervisión Financiera Global</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Organizado por ingresos de proyecto, costos operativos cloud, comisiones de vendedores y dispersión de nómina técnica.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCeoFinanceViewMode(ceoFinanceViewMode === "tablas" ? "calendario" : "tablas")}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 ${
                        ceoFinanceViewMode === "calendario"
                          ? "bg-[#00D1FF]/20 hover:bg-[#00D1FF]/30 text-[#00D1FF] border border-[#00D1FF]/40 shadow-[#00D1FF]/10"
                          : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 shadow-amber-500/10"
                      }`}
                    >
                      {ceoFinanceViewMode === "calendario" ? (
                        <>
                          <FileText className="w-4 h-4 text-[#00D1FF]" />
                          <span>📊 Ver Tablas Contables</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-amber-400" />
                          <span>📅 Ver Calendario de Pagos</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFinanceModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#00D1FF] to-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_25px_rgba(0,209,255,0.3)] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Registrar Movimiento</span>
                    </button>
                  </div>
                </div>

                {/* Mode Selector Tabs (Tablas vs Calendario) */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#07070E] border border-white/15 w-fit">
                  <button
                    type="button"
                    onClick={() => setCeoFinanceViewMode("tablas")}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      ceoFinanceViewMode === "tablas"
                        ? "bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>📊 Vista de Tablas & Desglose Contable</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCeoFinanceViewMode("calendario")}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      ceoFinanceViewMode === "calendario"
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>📅 Vista Calendario de Pagos (Hechos & Futuros)</span>
                  </button>
                </div>

                {ceoFinanceViewMode === "calendario" ? (
                  <PaymentsCalendarView
                    financeRecords={financeRecords}
                    projects={projects}
                    servers={servers}
                    auditLogs={auditLogs}
                    activeUser={safeActiveUser}
                    activeRole={activeRole}
                    onOpenAddFinanceModal={() => setIsFinanceModalOpen(true)}
                    onOpenEditFinanceRecord={handleOpenEditFinanceRecord}
                    onTriggerReminder={handleTriggerTestReminder}
                  />
                ) : (
                  <>
                {/* ========================================================================= */}
                {/* ADVANCED FINANCE FILTERS: PAGADOR, FECHAS & BÚSQUEDA */}
                {/* ========================================================================= */}
                <div className="p-5 sm:p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                          <span>Filtros de Tesorería (Pagador & Fechas)</span>
                          {(financeFilterPaidBy !== "all" || financeFilterDate !== "all" || financeFilterMonth !== "all" || financeFilterYear !== "all" || financeSearchQuery.trim() !== "") && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400 text-[10px] font-mono font-bold animate-pulse">
                              Filtro Aplicado
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-mono">
                          Filtra por quién cubrió el pago (Daniel, Jorge, Iván, Bancos, etc.), mes de corte o busca conceptos específicos.
                        </p>
                      </div>
                    </div>

                    {(financeFilterPaidBy !== "all" || financeFilterDate !== "all" || financeFilterMonth !== "all" || financeFilterYear !== "all" || financeSearchQuery.trim() !== "") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFinanceFilterPaidBy("all");
                          setFinanceFilterDate("all");
                          setFinanceFilterMonth("all");
                          setFinanceFilterYear("all");
                          setFinanceSearchQuery("");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Limpiar Filtros</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    {/* 1. Filter by Paid By */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span>👤 Pagador / De quién proviene:</span>
                      </label>
                      <select
                        value={financeFilterPaidBy}
                        onChange={(e) => setFinanceFilterPaidBy(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-bold"
                      >
                        <option value="all">✨ Todos los Pagadores / Orígenes</option>
                        <option value="Daniel Torre">Daniel Torre (Socio)</option>
                        <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                        <option value="Iván Castillo">Iván Castillo (CEO)</option>
                        <option value="Santander Corporativa">Santander Corporativa (Innocentia Tech)</option>
                        <option value="BBVA Operativa">BBVA Operativa & Nómina</option>
                        <option value="Caja Chica">Caja Chica Efectivo</option>
                        <option value="clientes">Clientes / Ingresos de Proyectos</option>
                        <option value="sin_asignar">⚠️ Sin Pagador Asignado</option>
                      </select>
                    </div>

                    {/* 2. Quick Period / Range Filter */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00D1FF]" />
                        <span>📅 Período / Vencimiento:</span>
                      </label>
                      <select
                        value={financeFilterDate}
                        onChange={(e) => setFinanceFilterDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#00D1FF] font-bold"
                      >
                        <option value="all">🌐 Todo el Historial</option>
                        <option value="septiembre_2026">Mes Actual (Septiembre 2026)</option>
                        <option value="agosto_2026">Mes Anterior (Agosto 2026)</option>
                        <option value="hoy">Movimientos Recientes (Hoy / Esta Semana)</option>
                        <option value="recurrentes">🔄 Sólo Pagos Recurrentes / Mensuales</option>
                      </select>
                    </div>

                    {/* 3. Specific Month Filter */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>📆 Mes Específico:</span>
                      </label>
                      <select
                        value={financeFilterMonth}
                        onChange={(e) => setFinanceFilterMonth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-amber-400 font-bold"
                      >
                        <option value="all">Todos los Meses</option>
                        <option value="9">Septiembre (09)</option>
                        <option value="8">Agosto (08)</option>
                        <option value="7">Julio (07)</option>
                        <option value="6">Junio (06)</option>
                        <option value="10">Octubre (10)</option>
                      </select>
                    </div>

                    {/* 4. Search Bar */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <FileText className="w-3 h-3 text-emerald-400" />
                        <span>🔍 Búsqueda Rápida:</span>
                      </label>
                      <input
                        type="text"
                        value={financeSearchQuery}
                        onChange={(e) => setFinanceSearchQuery(e.target.value)}
                        placeholder="Concepto, proveedor, cliente, cuenta..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-emerald-400 placeholder:text-gray-600 text-xs"
                      />
                    </div>
                  </div>

                  {/* Quick Payer Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">Atajos de Pagador:</span>
                    {[
                      { label: "Todos", value: "all" },
                      { label: "👤 Daniel Torre", value: "Daniel Torre" },
                      { label: "👤 Jorge Pérez", value: "Jorge Pérez" },
                      { label: "👤 Iván Castillo", value: "Iván Castillo" },
                      { label: "💳 Santander Corp", value: "Santander Corporativa" },
                      { label: "💳 BBVA Nómina", value: "BBVA Operativa" },
                      { label: "💵 Caja Chica", value: "Caja Chica" },
                      { label: "💼 Clientes", value: "clientes" },
                      { label: "⚠️ Sin Asignar", value: "sin_asignar" },
                    ].map((pill) => (
                      <button
                        key={pill.value}
                        type="button"
                        onClick={() => setFinanceFilterPaidBy(pill.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                          financeFilterPaidBy === pill.value
                            ? "bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                            : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Filters Result Summary */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
                    <span>
                      Mostrando <strong className="text-white">{filteredFinanceRecords.length}</strong> de <strong className="text-white">{financeRecords.length}</strong> movimientos contables
                    </span>
                    {filteredFinanceRecords.length === 0 && (
                      <span className="text-amber-400 font-bold">
                        ⚠️ No se encontraron movimientos con los filtros seleccionados
                      </span>
                    )}
                  </div>
                </div>

                {/* 5 High-Impact Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* 1. Ingresos */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "ingreso_proyecto" ? "todos" : "ingreso_proyecto")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "ingreso_proyecto" ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-emerald-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">1. Ingresos Proyecto</span>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-black text-emerald-400 font-mono">${totalIngresosProyectos.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {ingresosProyectos.length} cobros facturados
                    </span>
                  </div>

                  {/* 2. Gastos Cloud */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "gasto_operativo" ? "todos" : "gasto_operativo")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "gasto_operativo" ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]" : "border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">2. Gastos & Cloud</span>
                      <TrendingDown className="w-4 h-4 text-rose-400" />
                    </div>
                    <h3 className="text-xl font-black text-rose-400 font-mono">${totalGastosOperativos.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {gastosOperativos.length} servicios cloud/herramientas
                    </span>
                  </div>

                  {/* 3. Comisiones */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "comision_vendedor" ? "todos" : "comision_vendedor")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "comision_vendedor" ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">3. Comisiones Venta</span>
                      <Briefcase className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-black text-amber-400 font-mono">${totalComisionesVendedores.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {comisionesVendedores.length} asignadas (Carlos M.)
                    </span>
                  </div>

                  {/* 4. Sueldos */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "nomina_sueldo" ? "todos" : "nomina_sueldo")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "nomina_sueldo" ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border-cyan-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">4. Pago o Sueldos</span>
                      <Users className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-black text-cyan-400 font-mono">${totalSueldosNomina.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {sueldosNomina.length} honorarios técnicos
                    </span>
                  </div>

                  {/* 5. Utilidad Líquida */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#07070E] to-purple-950/20 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Utilidad Neta</span>
                      <DollarSign className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-black text-[#00D1FF] font-mono">${netProfit.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-purple-300 font-bold block mt-1">
                      {((netProfit / (totalIncome || 1)) * 100).toFixed(1)}% margen en caja
                    </span>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("todos")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                      financeCategoryTab === "todos"
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                    }`}
                  >
                    ✨ Todos los Movimientos ({filteredFinanceRecords.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("ingreso_proyecto")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "ingreso_proyecto"
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                    }`}
                  >
                    <span>📈 1. Ingresos por Proyecto (${totalIngresosProyectos.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("gasto_operativo")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "gasto_operativo"
                        ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                        : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                    }`}
                  >
                    <span>📉 2. Gastos Operativos & Cloud (${totalGastosOperativos.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("comision_vendedor")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "comision_vendedor"
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"
                    }`}
                  >
                    <span>💼 3. Comisiones Vendedores (${totalComisionesVendedores.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("nomina_sueldo")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "nomina_sueldo"
                        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
                    }`}
                  >
                    <span>👥 4. Pago o Sueldos (${totalSueldosNomina.toLocaleString()} MXN)</span>
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* CATEGORY 1: INGRESOS POR PROYECTO */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "ingreso_proyecto") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-emerald-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 1
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span>Ingresos por Proyecto</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Cobros de anticipos, sprints liquidados y entregables de software de clientes.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Ingresos</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">+${totalIngresosProyectos.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Proyecto / Referencia</th>
                            <th className="py-3 px-3">Concepto / Hito</th>
                            <th className="py-3 px-3">Cuenta Receptora</th>
                            <th className="py-3 px-3">Registrado Por</th>
                            <th className="py-3 px-3">Fecha</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {ingresosProyectos.map((r) => (
                            <tr key={r.id} className="hover:bg-emerald-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.projectRef || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-gray-400">{r.category}</span>
                                  {r.paidBy ? (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                                      👤 {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ⚠️ Asignar pagador
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300 font-mono text-[10px]">
                                  💳 {r.sourceAccount}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300 font-bold">{r.registeredBy}</td>
                              <td className="py-3.5 px-3 text-gray-400">{r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-emerald-400 text-sm">
                                +${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 2: GASTOS OPERATIVOS & CLOUD */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "gasto_operativo") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-rose-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 2
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                            <span>Gastos Operativos & Infraestructura Cloud</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Servidores de producción, hosting edge, APIs de IA, suscripciones corporativas e insumos de conectividad.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Operativo</span>
                        <span className="text-lg font-black text-rose-400 font-mono">-${totalGastosOperativos.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Proveedor / Servicio</th>
                            <th className="py-3 px-3">Concepto & Alcance</th>
                            <th className="py-3 px-3">Categoría</th>
                            <th className="py-3 px-3">Cuenta de Cargo</th>
                            <th className="py-3 px-3">Próximo Corte</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {gastosOperativos.map((r) => (
                            <tr key={r.id} className="hover:bg-rose-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.provider || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                  {r.paidBy ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-medium">
                                      <span>👤 Pagado por:</span>
                                      <strong className="text-emerald-200">{r.paidBy}</strong>
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
                                      title="Hacer clic para asignar quién pagó este servicio"
                                    >
                                      <span>⚠️ Sin pagador asignado</span>
                                      <span className="underline ml-0.5 text-amber-200 font-sans font-bold flex items-center gap-0.5">
                                        <Edit3 className="w-2.5 h-2.5 inline" /> Asignar
                                      </span>
                                    </button>
                                  )}
                                  <span className="text-[10px] text-gray-500 font-mono">Reg: {r.registeredBy}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  {r.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300">{r.sourceAccount}</td>
                              <td className="py-3.5 px-3 text-amber-300">{r.dueDate || r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-rose-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 3: COMISIONES DE VENDEDORES */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "comision_vendedor") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-amber-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 3
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-amber-400" />
                            <span>Comisiones de Vendedores</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Porcentajes pactados por cierre de clientes y captación de contratos comerciales.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Comisiones</span>
                        <span className="text-lg font-black text-amber-400 font-mono">-${totalComisionesVendedores.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Asesor Comercial</th>
                            <th className="py-3 px-3">Proyecto Referencia</th>
                            <th className="py-3 px-3">Concepto & % Tabulador</th>
                            <th className="py-3 px-3">Cuenta de Dispersión</th>
                            <th className="py-3 px-3">Fecha / Corte</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {comisionesVendedores.map((r) => (
                            <tr key={r.id} className="hover:bg-amber-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.beneficiary || "Carlos Mendoza"}</strong>
                                <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                  <span className="text-[10px] text-amber-400 font-mono">Asesor Oficial</span>
                                  {r.paidBy ? (
                                    <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono">
                                      👤 Pagado por: {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ✏️ Asignar
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-purple-300 font-bold">{r.projectRef || "Proyecto General"}</td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  💳 {r.sourceAccount}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-400">{r.dueDate || r.date}</td>
                              <td className="py-3.5 px-3">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                    r.status === "pagado"
                                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                      : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                  }`}
                                >
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-amber-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 4: PAGO O SUELDOS / NÓMINA TÉCNICA */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "nomina_sueldo") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-cyan-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 4
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <Users className="w-5 h-5 text-cyan-400" />
                            <span>Pago o Sueldos / Nómina Técnica</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Honorarios profesionales, dispersión de nómina a ingenieros de software, diseñadores UX/UI y DevOps.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Nómina</span>
                        <span className="text-lg font-black text-cyan-400 font-mono">-${totalSueldosNomina.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Integrante & Rol Técnico</th>
                            <th className="py-3 px-3">Concepto / Entregables</th>
                            <th className="py-3 px-3">Especialidad</th>
                            <th className="py-3 px-3">Cuenta de Dispersión</th>
                            <th className="py-3 px-3">Fecha</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {sueldosNomina.map((r) => (
                            <tr key={r.id} className="hover:bg-cyan-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.beneficiary || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                  <span className="text-[10px] text-cyan-400 font-mono">Equipo Técnico</span>
                                  {r.paidBy ? (
                                    <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono">
                                      👤 Pagado por: {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ✏️ Asignar
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  {r.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300 font-mono text-[11px]">{r.sourceAccount}</td>
                              <td className="py-3.5 px-3 text-gray-400">{r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-cyan-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>
            )}

            {/* CEO Tab: Calendario Financiero Integral (Pagos Hechos & Próximos) */}
            {ceoTab === "calendario" && (
              <PaymentsCalendarView
                financeRecords={financeRecords}
                projects={projects}
                servers={servers}
                auditLogs={auditLogs}
                activeUser={safeActiveUser}
                activeRole={activeRole}
                onOpenAddFinanceModal={() => setIsFinanceModalOpen(true)}
                onOpenEditFinanceRecord={handleOpenEditFinanceRecord}
                onTriggerReminder={handleTriggerTestReminder}
              />
            )}

            {/* CEO Tab 4: Bitácora de Auditoría, Filtros Avanzados & Gráfica Financiera */}
            {ceoTab === "auditoria" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6 shadow-2xl text-left">
                {/* Header with Title & View Mode Toggle */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                        Auditoría Inmutable
                      </span>
                      <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#00D1FF]" />
                        <span>Bitácora de Auditoría, Movimientos & Gráfica</span>
                      </h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Trazabilidad completa con filtros por estado de pago (realizados, pendientes, automáticos), fecha (día, mes, año) y analítica visual.
                    </p>
                  </div>

                  {/* View Mode Toggle Switch */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/15">
                    <button
                      type="button"
                      onClick={() => setAuditViewMode("ambas")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "ambas"
                          ? "bg-white text-black shadow-md"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Completa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuditViewMode("grafica")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "grafica"
                          ? "bg-[#00D1FF] text-black shadow-md font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Gráfica</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuditViewMode("lista")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "lista"
                          ? "bg-purple-600 text-white shadow-md font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lista</span>
                    </button>
                  </div>
                </div>

                {/* 4 Summary Highlight Metrics for Filtered Dataset */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/25">
                    <div className="flex items-center justify-between text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      <span>🟢 Pagos Realizados</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">
                      ${sumRealizados.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countRealizados} movimientos liquidados</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/25">
                    <div className="flex items-center justify-between text-amber-400 text-[10px] font-mono font-bold uppercase">
                      <span>🟡 Pagos Pendientes</span>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
                      ${sumPendientes.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countPendientes} en provisión / por corte</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/25">
                    <div className="flex items-center justify-between text-cyan-400 text-[10px] font-mono font-bold uppercase">
                      <span>🔄 Pagos Automáticos</span>
                      <RotateCcw className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-cyan-400 font-mono mt-1 block">
                      ${sumAutomaticos.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countAutomaticos} cargos domiciliados</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/25">
                    <div className="flex items-center justify-between text-purple-400 text-[10px] font-mono font-bold uppercase">
                      <span>💰 Flujo Neto Período</span>
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-lg font-black font-mono mt-1 block ${auditNeto >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {auditNeto >= 0 ? '+' : '-'}${Math.abs(auditNeto).toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">Ing: +${auditIngresos.toLocaleString()} • Egr: -${auditGastos.toLocaleString()}</span>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* FILTER CONTROLS: ESTADO DE PAGO, AÑO, MES, DÍA/RANGO, CUENTA, SOCIO */}
                {/* ========================================================================= */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  {/* Row 1: Payment Status Pills */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-2">
                      Filtro por Estado de Pago:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          auditFilterPaymentStatus === "all"
                            ? "bg-white text-black shadow-md"
                            : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                        }`}
                      >
                        ✨ Todos ({filteredAuditLogs.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("realizado")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "realizado"
                            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                        }`}
                      >
                        <span>🟢 Pagos Realizados ({countRealizados})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("pendiente")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "pendiente"
                            ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                            : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"
                        }`}
                      >
                        <span>🟡 Pagos Pendientes ({countPendientes})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("automatico")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "automatico"
                            ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
                        }`}
                      >
                        <span>🔄 Pagos Automáticos ({countAutomaticos})</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Date & Account Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-white/5 text-xs font-mono">
                    {/* Year Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">📅 Por Año:</label>
                      <select
                        value={auditFilterYear}
                        onChange={(e) => setAuditFilterYear(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="all">Todos los Años</option>
                        <option value="2026">2026 (Actual)</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>

                    {/* Month Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">📆 Por Mes:</label>
                      <select
                        value={auditFilterMonth}
                        onChange={(e) => setAuditFilterMonth(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="all">Todos los Meses</option>
                        <option value="9">Septiembre (Actual)</option>
                        <option value="8">Agosto</option>
                        <option value="7">Julio</option>
                        <option value="6">Junio</option>
                        <option value="5">Mayo</option>
                        <option value="4">Abril</option>
                        <option value="3">Marzo</option>
                        <option value="2">Febrero</option>
                        <option value="1">Enero</option>
                      </select>
                    </div>

                    {/* Day / Range Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">🕐 Por Día / Rango:</label>
                      <select
                        value={auditFilterDayRange}
                        onChange={(e) => setAuditFilterDayRange(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="all">Cualquier Día</option>
                        <option value="hoy">Hoy (09 Sep)</option>
                        <option value="7dias">Últimos 7 Días</option>
                        <option value="30dias">Últimos 30 Días</option>
                        <option value="9">Día 9</option>
                        <option value="8">Día 8</option>
                        <option value="7">Día 7</option>
                        <option value="6">Día 6</option>
                        <option value="5">Día 5</option>
                        <option value="10">Día 10</option>
                        <option value="15">Día 15</option>
                        <option value="30">Día 30</option>
                      </select>
                    </div>

                    {/* Account Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">💳 Por Cuenta:</label>
                      <select
                        value={auditFilterAccount}
                        onChange={(e) => setAuditFilterAccount(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="all">Todas las Cuentas</option>
                        <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa</option>
                        <option value="BBVA Operativa & Nómina">BBVA Operativa</option>
                        <option value="Stripe Gateway / Tarjeta">Stripe Gateway</option>
                        <option value="Caja Chica Efectivo">Caja Chica Efectivo</option>
                      </select>
                    </div>

                    {/* Author Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">👤 Por Socio:</label>
                      <select
                        value={auditFilterAuthor}
                        onChange={(e) => setAuditFilterAuthor(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="all">Todos los Socios</option>
                        <option value="Iván Castillo">Iván Castillo (CEO)</option>
                        <option value="Daniel Torre">Daniel Torre (Socio)</option>
                        <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                      </select>
                    </div>

                    {/* Reset Filter Button */}
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAuditFilterPaymentStatus("all");
                          setAuditFilterYear("all");
                          setAuditFilterMonth("all");
                          setAuditFilterDayRange("all");
                          setAuditFilterAccount("all");
                          setAuditFilterAuthor("all");
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restablecer</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* INTERACTIVE GRAPH VIEW (GRÁFICA FINANCIERA & DISTRIBUCIÓN) */}
                {/* ========================================================================= */}
                {(auditViewMode === "ambas" || auditViewMode === "grafica") && (
                  <div className="p-6 rounded-[28px] bg-gradient-to-b from-white/[0.04] to-black/60 border border-[#00D1FF]/30 space-y-5 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold">Analítica & Flujo de Caja</span>
                        <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-[#00D1FF]" />
                          <span>Gráfica Financiera por Fecha & Cuentas</span>
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("flujo")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "flujo" ? "bg-[#00D1FF] text-black font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Flujo por Fecha
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("cuentas")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "cuentas" ? "bg-purple-600 text-white font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Por Cuentas
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("estados")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "estados" ? "bg-emerald-500 text-black font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Por Estados
                        </button>
                      </div>
                    </div>

                    {/* CHART 1: Timeline Bar Chart */}
                    {auditChartMetric === "flujo" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                          <span>Escala Máxima: ${maxTimelineVal.toLocaleString()} MXN</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Ingreso</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> Gasto Realizado</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#00D1FF] inline-block" /> Automático</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Pendiente</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 pt-6 pb-2 items-end min-h-[220px]">
                          {timelineList.map((item, idx) => {
                            const ingPct = Math.min(100, Math.round((item.ingreso / maxTimelineVal) * 160));
                            const expPct = Math.min(100, Math.round((item.gasto / maxTimelineVal) * 160));
                            const autoPct = Math.min(100, Math.round((item.automatico / maxTimelineVal) * 160));
                            const pendPct = Math.min(100, Math.round((item.pendiente / maxTimelineVal) * 160));

                            return (
                              <div key={idx} className="flex flex-col items-center gap-2 group">
                                <div className="w-full flex items-end justify-center gap-1 h-36 relative bg-white/[0.02] rounded-xl p-1.5 border border-white/5 group-hover:border-[#00D1FF]/40 transition-all">
                                  {/* Tooltip on hover */}
                                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30 bg-[#07070E] border border-white/20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-white whitespace-nowrap shadow-xl">
                                    <span>Total: ${item.total.toLocaleString()} MXN</span>
                                    {item.ingreso > 0 && <span className="text-emerald-400">+{item.ingreso.toLocaleString()} MXN</span>}
                                    {(item.gasto + item.automatico) > 0 && <span className="text-rose-400">-{(item.gasto + item.automatico).toLocaleString()} MXN</span>}
                                  </div>

                                  {item.ingreso > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                      style={{ height: `${Math.max(12, ingPct)}px` }}
                                      title={`Ingreso: $${item.ingreso.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.gasto > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                                      style={{ height: `${Math.max(12, expPct)}px` }}
                                      title={`Gasto: $${item.gasto.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.automatico > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-cyan-600 to-[#00D1FF] rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                      style={{ height: `${Math.max(12, autoPct)}px` }}
                                      title={`Automático: $${item.automatico.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.pendiente > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md border-t border-dashed border-amber-300 transition-all duration-500"
                                      style={{ height: `${Math.max(12, pendPct)}px` }}
                                      title={`Pendiente: $${item.pendiente.toLocaleString()} MXN`}
                                    />
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-gray-300 font-bold">{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* CHART 2: Bank Account Distribution */}
                    {auditChartMetric === "cuentas" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <span className="text-xs font-mono font-bold text-white block uppercase">Distribución por Cuentas Bancarias</span>
                          
                          {/* Santander */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">🏦 Santander Corporativa</span>
                              <span className="text-white font-bold">$221,696 MXN (64%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full" style={{ width: "64%" }} />
                            </div>
                          </div>

                          {/* BBVA */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">🏦 BBVA Operativa & Nómina</span>
                              <span className="text-white font-bold">$149,800 MXN (28%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-600 to-[#00D1FF] rounded-full" style={{ width: "28%" }} />
                            </div>
                          </div>

                          {/* Stripe */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">💳 Stripe Gateway / Tarjeta</span>
                              <span className="text-white font-bold">$6,200 MXN (6%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full" style={{ width: "6%" }} />
                            </div>
                          </div>

                          {/* Caja Chica */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">💵 Caja Chica Efectivo</span>
                              <span className="text-white font-bold">$230 MXN (2%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "2%" }} />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <span className="text-xs font-mono font-bold text-white block uppercase">Distribución por Categorías</span>

                          {/* Proyectos */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-emerald-400">📈 Proyectos Software</span>
                              <span className="text-white font-bold">$250,000 MXN (67%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "67%" }} />
                            </div>
                          </div>

                          {/* Nómina */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-cyan-400">👥 Pago o Sueldos</span>
                              <span className="text-white font-bold">$47,000 MXN (13%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "13%" }} />
                            </div>
                          </div>

                          {/* Gastos Cloud */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-rose-400">📉 Gastos Cloud & Ops</span>
                              <span className="text-white font-bold">$38,626 MXN (10%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: "10%" }} />
                            </div>
                          </div>

                          {/* Comisiones */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-amber-400">💼 Comisiones Vendedores</span>
                              <span className="text-white font-bold">$37,800 MXN (10%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CHART 3: States Distribution */}
                    {auditChartMetric === "estados" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-emerald-400">Pagos Realizados</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumRealizados.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countRealizados} transacciones concluidas con comprobante</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-amber-400">Pagos Pendientes</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumPendientes.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countPendientes} en provisión por corte programado</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-cyan-400">Pagos Automáticos</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumAutomaticos.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countAutomaticos} suscripciones activas recurrentes</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* AUDIT LOG DETAILED FEED LIST (Visible in ambas and lista) */}
                {/* ========================================================================= */}
                {(auditViewMode === "ambas" || auditViewMode === "lista") && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                        Movimientos Encontrados ({filteredAuditLogs.length}):
                      </span>
                      {filteredAuditLogs.length === 0 && (
                        <span className="text-xs font-mono text-amber-400">Ningún registro coincide con los filtros aplicados.</span>
                      )}
                    </div>

                    {filteredAuditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-white/[0.04]"
                      >
                        <div className="space-y-1.5 flex-1">
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

                            {/* Payment Status Tag */}
                            <span
                              className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                                log.paymentStatus === "realizado"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                  : log.paymentStatus === "pendiente"
                                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                  : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                              }`}
                            >
                              {log.paymentStatus === "realizado" && "🟢 Pago Realizado"}
                              {log.paymentStatus === "pendiente" && "🟡 Pago Pendiente"}
                              {log.paymentStatus === "automatico" && "🔄 Pago Automático"}
                              {!log.paymentStatus && "✓ Registro"}
                            </span>

                            <span className="text-[10px] font-mono text-gray-400">{log.timestamp}</span>

                            {log.category && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                                {log.category}
                              </span>
                            )}

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                              💳 {log.sourceAccount}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-1">{log.details}</h4>
                          <span className="text-[11px] font-mono text-gray-400 block">
                            Objetivo / Concepto: <strong className="text-gray-200">{log.target}</strong>
                          </span>
                        </div>

                        <div className="text-left md:text-right flex-shrink-0 space-y-1">
                          {typeof log.amount === "number" && (
                            <span
                              className={`text-base font-black font-mono block ${
                                log.action === "INGRESO"
                                  ? "text-emerald-400"
                                  : log.paymentStatus === "pendiente"
                                  ? "text-amber-400"
                                  : log.paymentStatus === "automatico"
                                  ? "text-[#00D1FF]"
                                  : "text-rose-400"
                              }`}
                            >
                              {log.action === "INGRESO" ? "+" : "-"}${(log.amount || 0).toLocaleString()} MXN
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#00D1FF] block">
                            👤 {log.authorName} ({log.authorRole})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {ceoTab === "tabulador" && (
              <InternalPricingMatrix userRole="ceo" userName={activeUser.name} />
            )}

            {ceoTab === "telemetria" && (
              <ExecutiveTelemetryDashboard />
            )}

            {ceoTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="ceo" userName={activeUser.name} />
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
                onClick={() => setPartnerTab("calendario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "calendario"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Calendario de Pagos</span>
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
                onClick={() => setPartnerTab("tabulador")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "tabulador"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Tabulador y Cotizador Base</span>
              </button>

              <button
                onClick={() => setPartnerTab("telemetria")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTab === "telemetria"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Telemetría en Vivo (GA4)</span>
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
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-black animate-pulse flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  3
                </span>
              </button>
            </div>

            {/* BANNER DE REUNIÓN DE HOY (SOCIO & DANIEL TORRE) */}
            <div className="p-6 sm:p-7 rounded-[32px] bg-gradient-to-r from-purple-900/40 via-[#07070E] to-[#00D1FF]/15 border-2 border-[#00D1FF]/40 shadow-[0_0_35px_rgba(0,209,255,0.15)] text-left relative overflow-hidden space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D1FF]"></span>
                      Junta de Hoy en Agenda
                    </span>
                    <span className="text-xs font-mono text-purple-300 font-bold">Lunes 14 de Septiembre • 3:30 PM a 5:00 PM (Actualizada)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Junta Axana-Jess+Gabriel</span>
                  </h3>
                  <p className="text-xs text-gray-300 font-mono">
                    👤 <strong>Asistentes:</strong> Iván Castillo (CEO), Jessica Torre, Gabriel, Axana • <strong>Tema:</strong> Revisión de cuenta & acuerdos comerciales
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://meet.google.com/mnh-metd-fcn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-[#00D1FF] to-purple-600 text-black font-black text-xs uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.5)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>🎥 Unirse a Google Meet</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </a>

                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Junta%20Axana-Jess%2BGabriel&dates=20260914T153000/20260914T170000&details=Junta%20Axana-Jess%2BGabriel%0A%0A%F0%9F%93%8D%20Link%20Meet%3A%20https%3A%2F%2Fmeet.google.com%2Fmnh-metd-fcn%0A%E2%98%8E%EF%B8%8F%20Tel%C3%A9fono%3A%20%2B52%2055%208421%200898%20PIN%3A%204192862301978%0A%0A%F0%9F%91%A5%20Asistentes%3A%20Iv%C3%A1n%20Castillo%2C%20Jessica%20Torre%2C%20Gabriel%2C%20Axana&location=https%3A%2F%2Fmeet.google.com%2Fmnh-metd-fcn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#4285F4]" />
                    <span>Google Calendar</span>
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🔗 Link:</span>
                  <span className="text-[#00D1FF] underline select-all">https://meet.google.com/mnh-metd-fcn</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>📞 Tel: <strong>+52 55 8421 0898</strong></span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold">PIN: 4192862301978</span>
                </div>
              </div>
            </div>

            {/* Partner Tab 1: Supervisión Financiera Categorizada */}
            {partnerTab === "finanzas" && (
              <div className="space-y-6 text-left">
                {/* Header with Title & Action */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Supervisión de Socios & Finanzas
                    </span>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-emerald-400" />
                      <span>Supervisión Financiera Global</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Organizado por ingresos de proyecto, costos operativos cloud, comisiones de vendedores y dispersión de nómina técnica.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setPartnerFinanceViewMode(partnerFinanceViewMode === "tablas" ? "calendario" : "tablas")}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 ${
                        partnerFinanceViewMode === "calendario"
                          ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 shadow-purple-500/10"
                          : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 shadow-amber-500/10"
                      }`}
                    >
                      {partnerFinanceViewMode === "calendario" ? (
                        <>
                          <FileText className="w-4 h-4 text-purple-400" />
                          <span>📊 Ver Tablas Contables</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-amber-400" />
                          <span>📅 Ver Calendario de Pagos</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFinanceModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#00D1FF] to-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_25px_rgba(147,51,234,0.3)] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Registrar Movimiento</span>
                    </button>
                  </div>
                </div>

                {/* Mode Selector Tabs (Tablas vs Calendario) */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#07070E] border border-white/15 w-fit">
                  <button
                    type="button"
                    onClick={() => setPartnerFinanceViewMode("tablas")}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      partnerFinanceViewMode === "tablas"
                        ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>📊 Vista de Tablas & Desglose Contable</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerFinanceViewMode("calendario")}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      partnerFinanceViewMode === "calendario"
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>📅 Vista Calendario de Pagos (Hechos & Futuros)</span>
                  </button>
                </div>

                {partnerFinanceViewMode === "calendario" ? (
                  <PaymentsCalendarView
                    financeRecords={financeRecords}
                    projects={projects}
                    servers={servers}
                    auditLogs={auditLogs}
                    activeUser={safeActiveUser}
                    activeRole={activeRole}
                    onOpenAddFinanceModal={() => setIsFinanceModalOpen(true)}
                    onOpenEditFinanceRecord={handleOpenEditFinanceRecord}
                    onTriggerReminder={handleTriggerTestReminder}
                  />
                ) : (
                  <>
                {/* ========================================================================= */}
                {/* ADVANCED FINANCE FILTERS: PAGADOR, FECHAS & BÚSQUEDA */}
                {/* ========================================================================= */}
                <div className="p-5 sm:p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
                          <span>Filtros de Tesorería (Pagador & Fechas)</span>
                          {(financeFilterPaidBy !== "all" || financeFilterDate !== "all" || financeFilterMonth !== "all" || financeFilterYear !== "all" || financeSearchQuery.trim() !== "") && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400 text-[10px] font-mono font-bold animate-pulse">
                              Filtro Aplicado
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-mono">
                          Filtra por quién cubrió el pago (Daniel, Jorge, Iván, Bancos, etc.), mes de corte o busca conceptos específicos.
                        </p>
                      </div>
                    </div>

                    {(financeFilterPaidBy !== "all" || financeFilterDate !== "all" || financeFilterMonth !== "all" || financeFilterYear !== "all" || financeSearchQuery.trim() !== "") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFinanceFilterPaidBy("all");
                          setFinanceFilterDate("all");
                          setFinanceFilterMonth("all");
                          setFinanceFilterYear("all");
                          setFinanceSearchQuery("");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Limpiar Filtros</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    {/* 1. Filter by Paid By */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span>👤 Pagador / De quién proviene:</span>
                      </label>
                      <select
                        value={financeFilterPaidBy}
                        onChange={(e) => setFinanceFilterPaidBy(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-bold"
                      >
                        <option value="all">✨ Todos los Pagadores / Orígenes</option>
                        <option value="Daniel Torre">Daniel Torre (Socio)</option>
                        <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                        <option value="Iván Castillo">Iván Castillo (CEO)</option>
                        <option value="Santander Corporativa">Santander Corporativa (Innocentia Tech)</option>
                        <option value="BBVA Operativa">BBVA Operativa & Nómina</option>
                        <option value="Caja Chica">Caja Chica Efectivo</option>
                        <option value="clientes">Clientes / Ingresos de Proyectos</option>
                        <option value="sin_asignar">⚠️ Sin Pagador Asignado</option>
                      </select>
                    </div>

                    {/* 2. Quick Period / Range Filter */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00D1FF]" />
                        <span>📅 Período / Vencimiento:</span>
                      </label>
                      <select
                        value={financeFilterDate}
                        onChange={(e) => setFinanceFilterDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#00D1FF] font-bold"
                      >
                        <option value="all">🌐 Todo el Historial</option>
                        <option value="septiembre_2026">Mes Actual (Septiembre 2026)</option>
                        <option value="agosto_2026">Mes Anterior (Agosto 2026)</option>
                        <option value="hoy">Movimientos Recientes (Hoy / Esta Semana)</option>
                        <option value="recurrentes">🔄 Sólo Pagos Recurrentes / Mensuales</option>
                      </select>
                    </div>

                    {/* 3. Specific Month Filter */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>📆 Mes Específico:</span>
                      </label>
                      <select
                        value={financeFilterMonth}
                        onChange={(e) => setFinanceFilterMonth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-amber-400 font-bold"
                      >
                        <option value="all">Todos los Meses</option>
                        <option value="9">Septiembre (09)</option>
                        <option value="8">Agosto (08)</option>
                        <option value="7">Julio (07)</option>
                        <option value="6">Junio (06)</option>
                        <option value="10">Octubre (10)</option>
                      </select>
                    </div>

                    {/* 4. Search Bar */}
                    <div>
                      <label className="block text-gray-300 mb-1.5 font-bold uppercase text-[10px] flex items-center gap-1">
                        <FileText className="w-3 h-3 text-emerald-400" />
                        <span>🔍 Búsqueda Rápida:</span>
                      </label>
                      <input
                        type="text"
                        value={financeSearchQuery}
                        onChange={(e) => setFinanceSearchQuery(e.target.value)}
                        placeholder="Concepto, proveedor, cliente, cuenta..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-emerald-400 placeholder:text-gray-600 text-xs"
                      />
                    </div>
                  </div>

                  {/* Quick Payer Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">Atajos de Pagador:</span>
                    {[
                      { label: "Todos", value: "all" },
                      { label: "👤 Daniel Torre", value: "Daniel Torre" },
                      { label: "👤 Jorge Pérez", value: "Jorge Pérez" },
                      { label: "👤 Iván Castillo", value: "Iván Castillo" },
                      { label: "💳 Santander Corp", value: "Santander Corporativa" },
                      { label: "💳 BBVA Nómina", value: "BBVA Operativa" },
                      { label: "💵 Caja Chica", value: "Caja Chica" },
                      { label: "💼 Clientes", value: "clientes" },
                      { label: "⚠️ Sin Asignar", value: "sin_asignar" },
                    ].map((pill) => (
                      <button
                        key={pill.value}
                        type="button"
                        onClick={() => setFinanceFilterPaidBy(pill.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                          financeFilterPaidBy === pill.value
                            ? "bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                            : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Filters Result Summary */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
                    <span>
                      Mostrando <strong className="text-white">{filteredFinanceRecords.length}</strong> de <strong className="text-white">{financeRecords.length}</strong> movimientos contables
                    </span>
                    {filteredFinanceRecords.length === 0 && (
                      <span className="text-amber-400 font-bold">
                        ⚠️ No se encontraron movimientos con los filtros seleccionados
                      </span>
                    )}
                  </div>
                </div>

                {/* 5 High-Impact Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* 1. Ingresos */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "ingreso_proyecto" ? "todos" : "ingreso_proyecto")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "ingreso_proyecto" ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-emerald-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">1. Ingresos Proyecto</span>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-black text-emerald-400 font-mono">${totalIngresosProyectos.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {ingresosProyectos.length} cobros facturados
                    </span>
                  </div>

                  {/* 2. Gastos Cloud */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "gasto_operativo" ? "todos" : "gasto_operativo")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "gasto_operativo" ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]" : "border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">2. Gastos & Cloud</span>
                      <TrendingDown className="w-4 h-4 text-rose-400" />
                    </div>
                    <h3 className="text-xl font-black text-rose-400 font-mono">${totalGastosOperativos.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {gastosOperativos.length} servicios cloud/herramientas
                    </span>
                  </div>

                  {/* 3. Comisiones */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "comision_vendedor" ? "todos" : "comision_vendedor")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "comision_vendedor" ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">3. Comisiones Venta</span>
                      <Briefcase className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-black text-amber-400 font-mono">${totalComisionesVendedores.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {comisionesVendedores.length} asignadas (Carlos M.)
                    </span>
                  </div>

                  {/* 4. Sueldos */}
                  <div
                    onClick={() => setFinanceCategoryTab(financeCategoryTab === "nomina_sueldo" ? "todos" : "nomina_sueldo")}
                    className={`p-5 rounded-2xl bg-[#07070E] border transition-all cursor-pointer hover:scale-[1.02] ${
                      financeCategoryTab === "nomina_sueldo" ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border-cyan-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">4. Pago o Sueldos</span>
                      <Users className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-black text-cyan-400 font-mono">${totalSueldosNomina.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      {sueldosNomina.length} honorarios técnicos
                    </span>
                  </div>

                  {/* 5. Utilidad Líquida */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#07070E] to-purple-950/20 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Utilidad Neta</span>
                      <DollarSign className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-black text-[#00D1FF] font-mono">${netProfit.toLocaleString()} MXN</h3>
                    <span className="text-[11px] text-purple-300 font-bold block mt-1">
                      {((netProfit / (totalIncome || 1)) * 100).toFixed(1)}% margen en caja
                    </span>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("todos")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                      financeCategoryTab === "todos"
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                    }`}
                  >
                    ✨ Todos los Movimientos ({filteredFinanceRecords.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("ingreso_proyecto")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "ingreso_proyecto"
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                    }`}
                  >
                    <span>📈 1. Ingresos por Proyecto (${totalIngresosProyectos.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("gasto_operativo")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "gasto_operativo"
                        ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                        : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                    }`}
                  >
                    <span>📉 2. Gastos Operativos & Cloud (${totalGastosOperativos.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("comision_vendedor")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "comision_vendedor"
                        ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"
                    }`}
                  >
                    <span>💼 3. Comisiones Vendedores (${totalComisionesVendedores.toLocaleString()} MXN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinanceCategoryTab("nomina_sueldo")}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      financeCategoryTab === "nomina_sueldo"
                        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
                    }`}
                  >
                    <span>👥 4. Pago o Sueldos (${totalSueldosNomina.toLocaleString()} MXN)</span>
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* CATEGORY 1: INGRESOS POR PROYECTO */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "ingreso_proyecto") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-emerald-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 1
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span>Ingresos por Proyecto</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Cobros de anticipos, sprints liquidados y entregables de software de clientes.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Ingresos</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">+${totalIngresosProyectos.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Proyecto / Referencia</th>
                            <th className="py-3 px-3">Concepto / Hito</th>
                            <th className="py-3 px-3">Cuenta Receptora</th>
                            <th className="py-3 px-3">Registrado Por</th>
                            <th className="py-3 px-3">Fecha</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {ingresosProyectos.map((r) => (
                            <tr key={r.id} className="hover:bg-emerald-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.projectRef || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-gray-400">{r.category}</span>
                                  {r.paidBy ? (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                                      👤 {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ⚠️ Asignar pagador
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300 font-mono text-[10px]">
                                  💳 {r.sourceAccount}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300 font-bold">{r.registeredBy}</td>
                              <td className="py-3.5 px-3 text-gray-400">{r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-emerald-400 text-sm">
                                +${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 2: GASTOS OPERATIVOS & CLOUD */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "gasto_operativo") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-rose-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 2
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                            <span>Gastos Operativos & Infraestructura Cloud</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Servidores de producción, hosting edge, APIs de IA, suscripciones corporativas e insumos de conectividad.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Operativo</span>
                        <span className="text-lg font-black text-rose-400 font-mono">-${totalGastosOperativos.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Proveedor / Servicio</th>
                            <th className="py-3 px-3">Concepto & Alcance</th>
                            <th className="py-3 px-3">Categoría</th>
                            <th className="py-3 px-3">Cuenta de Cargo</th>
                            <th className="py-3 px-3">Próximo Corte</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {gastosOperativos.map((r) => (
                            <tr key={r.id} className="hover:bg-rose-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.provider || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                  {r.paidBy ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-medium">
                                      <span>👤 Pagado por:</span>
                                      <strong className="text-emerald-200">{r.paidBy}</strong>
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
                                      title="Hacer clic para asignar quién pagó este servicio"
                                    >
                                      <span>⚠️ Sin pagador asignado</span>
                                      <span className="underline ml-0.5 text-amber-200 font-sans font-bold flex items-center gap-0.5">
                                        <Edit3 className="w-2.5 h-2.5 inline" /> Asignar
                                      </span>
                                    </button>
                                  )}
                                  <span className="text-[10px] text-gray-500 font-mono">Reg: {r.registeredBy}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  {r.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300">{r.sourceAccount}</td>
                              <td className="py-3.5 px-3 text-amber-300">{r.dueDate || r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-rose-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 3: COMISIONES DE VENDEDORES */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "comision_vendedor") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-amber-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 3
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-amber-400" />
                            <span>Comisiones de Vendedores</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Porcentajes pactados por cierre de clientes y captación de contratos comerciales.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Comisiones</span>
                        <span className="text-lg font-black text-amber-400 font-mono">-${totalComisionesVendedores.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Asesor Comercial</th>
                            <th className="py-3 px-3">Proyecto Referencia</th>
                            <th className="py-3 px-3">Concepto & % Tabulador</th>
                            <th className="py-3 px-3">Cuenta de Dispersión</th>
                            <th className="py-3 px-3">Fecha / Corte</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {comisionesVendedores.map((r) => (
                            <tr key={r.id} className="hover:bg-amber-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.beneficiary || "Carlos Mendoza"}</strong>
                                <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                  <span className="text-[10px] text-amber-400 font-mono">Asesor Oficial</span>
                                  {r.paidBy ? (
                                    <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono">
                                      👤 Pagado por: {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ✏️ Asignar
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-purple-300 font-bold">{r.projectRef || "Proyecto General"}</td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  💳 {r.sourceAccount}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-400">{r.dueDate || r.date}</td>
                              <td className="py-3.5 px-3">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                    r.status === "pagado"
                                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                      : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                  }`}
                                >
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-amber-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* CATEGORY 4: PAGO O SUELDOS / NÓMINA TÉCNICA */}
                {/* ========================================================================= */}
                {(financeCategoryTab === "todos" || financeCategoryTab === "nomina_sueldo") && (
                  <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-cyan-500/30 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase">
                            Sección 4
                          </span>
                          <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                            <Users className="w-5 h-5 text-cyan-400" />
                            <span>Pago o Sueldos / Nómina Técnica</span>
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Honorarios profesionales, dispersión de nómina a ingenieros de software, diseñadores UX/UI y DevOps.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Subtotal Nómina</span>
                        <span className="text-lg font-black text-cyan-400 font-mono">-${totalSueldosNomina.toLocaleString()} MXN</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/15 text-gray-400 uppercase">
                            <th className="py-3 px-3">Integrante & Rol Técnico</th>
                            <th className="py-3 px-3">Concepto / Entregables</th>
                            <th className="py-3 px-3">Especialidad</th>
                            <th className="py-3 px-3">Cuenta de Dispersión</th>
                            <th className="py-3 px-3">Fecha</th>
                            <th className="py-3 px-3">Estado</th>
                            <th className="py-3 px-3 text-right">Monto</th>
                            <th className="py-3 px-3 text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {sueldosNomina.map((r) => (
                            <tr key={r.id} className="hover:bg-cyan-500/[0.03] transition-colors">
                              <td className="py-3.5 px-3">
                                <strong className="text-white block font-bold">{r.beneficiary || r.concept}</strong>
                                <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                  <span className="text-[10px] text-cyan-400 font-mono">Equipo Técnico</span>
                                  {r.paidBy ? (
                                    <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono">
                                      👤 Pagado por: {r.paidBy}
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFinanceRecord(r)}
                                      className="px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                                    >
                                      ✏️ Asignar
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{r.concept}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
                                  {r.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-300 font-mono text-[11px]">{r.sourceAccount}</td>
                              <td className="py-3.5 px-3 text-gray-400">{r.date}</td>
                              <td className="py-3.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-cyan-400 text-sm">
                                -${r.amount.toLocaleString()} MXN
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditFinanceRecord(r)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                                    title="Editar movimiento y pagador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFinanceRecord(r.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>
            )}

            {/* Partner Tab: Calendario Financiero Integral (Pagos Hechos & Próximos) */}
            {partnerTab === "calendario" && (
              <PaymentsCalendarView
                financeRecords={financeRecords}
                projects={projects}
                servers={servers}
                auditLogs={auditLogs}
                activeUser={safeActiveUser}
                activeRole={activeRole}
                onOpenAddFinanceModal={() => setIsFinanceModalOpen(true)}
                onOpenEditFinanceRecord={handleOpenEditFinanceRecord}
                onTriggerReminder={handleTriggerTestReminder}
              />
            )}

            {/* Partner Tab 2: Auditoría y Cuentas */}
            {partnerTab === "auditoria" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6 shadow-2xl text-left">
                {/* Header with Title & View Mode Toggle */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                        Supervisión Socios
                      </span>
                      <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span>Auditoría de Movimientos, Filtros & Gráfica</span>
                      </h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Trazabilidad completa con filtros por estado de pago (realizados, pendientes, automáticos), fecha (día, mes, año) y analítica visual.
                    </p>
                  </div>

                  {/* View Mode Toggle Switch */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/15">
                    <button
                      type="button"
                      onClick={() => setAuditViewMode("ambas")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "ambas"
                          ? "bg-white text-black shadow-md"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Completa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuditViewMode("grafica")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "grafica"
                          ? "bg-purple-600 text-white shadow-md font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Gráfica</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuditViewMode("lista")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        auditViewMode === "lista"
                          ? "bg-purple-600 text-white shadow-md font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lista</span>
                    </button>
                  </div>
                </div>

                {/* 4 Summary Highlight Metrics for Filtered Dataset */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/25">
                    <div className="flex items-center justify-between text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      <span>🟢 Pagos Realizados</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">
                      ${sumRealizados.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countRealizados} movimientos liquidados</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/25">
                    <div className="flex items-center justify-between text-amber-400 text-[10px] font-mono font-bold uppercase">
                      <span>🟡 Pagos Pendientes</span>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
                      ${sumPendientes.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countPendientes} en provisión / por corte</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/25">
                    <div className="flex items-center justify-between text-cyan-400 text-[10px] font-mono font-bold uppercase">
                      <span>🔄 Pagos Automáticos</span>
                      <RotateCcw className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black text-cyan-400 font-mono mt-1 block">
                      ${sumAutomaticos.toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{countAutomaticos} cargos domiciliados</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/25">
                    <div className="flex items-center justify-between text-purple-400 text-[10px] font-mono font-bold uppercase">
                      <span>💰 Flujo Neto Período</span>
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-lg font-black font-mono mt-1 block ${auditNeto >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {auditNeto >= 0 ? '+' : '-'}${Math.abs(auditNeto).toLocaleString()} MXN
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5">Ing: +${auditIngresos.toLocaleString()} • Egr: -${auditGastos.toLocaleString()}</span>
                  </div>
                </div>

                {/* FILTER CONTROLS: ESTADO DE PAGO, AÑO, MES, DÍA/RANGO, CUENTA, SOCIO */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  {/* Row 1: Payment Status Pills */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-2">
                      Filtro por Estado de Pago:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          auditFilterPaymentStatus === "all"
                            ? "bg-white text-black shadow-md"
                            : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                        }`}
                      >
                        ✨ Todos ({filteredAuditLogs.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("realizado")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "realizado"
                            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                        }`}
                      >
                        <span>🟢 Pagos Realizados ({countRealizados})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("pendiente")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "pendiente"
                            ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                            : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"
                        }`}
                      >
                        <span>🟡 Pagos Pendientes ({countPendientes})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuditFilterPaymentStatus("automatico")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          auditFilterPaymentStatus === "automatico"
                            ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
                        }`}
                      >
                        <span>🔄 Pagos Automáticos ({countAutomaticos})</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Date & Account Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-white/5 text-xs font-mono">
                    {/* Year Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">📅 Por Año:</label>
                      <select
                        value={auditFilterYear}
                        onChange={(e) => setAuditFilterYear(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-purple-400"
                      >
                        <option value="all">Todos los Años</option>
                        <option value="2026">2026 (Actual)</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>

                    {/* Month Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">📆 Por Mes:</label>
                      <select
                        value={auditFilterMonth}
                        onChange={(e) => setAuditFilterMonth(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-purple-400"
                      >
                        <option value="all">Todos los Meses</option>
                        <option value="9">Septiembre (Actual)</option>
                        <option value="8">Agosto</option>
                        <option value="7">Julio</option>
                        <option value="6">Junio</option>
                        <option value="5">Mayo</option>
                        <option value="4">Abril</option>
                        <option value="3">Marzo</option>
                        <option value="2">Febrero</option>
                        <option value="1">Enero</option>
                      </select>
                    </div>

                    {/* Day / Range Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">🕐 Por Día / Rango:</label>
                      <select
                        value={auditFilterDayRange}
                        onChange={(e) => setAuditFilterDayRange(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-purple-400"
                      >
                        <option value="all">Cualquier Día</option>
                        <option value="hoy">Hoy (09 Sep)</option>
                        <option value="7dias">Últimos 7 Días</option>
                        <option value="30dias">Últimos 30 Días</option>
                        <option value="9">Día 9</option>
                        <option value="8">Día 8</option>
                        <option value="7">Día 7</option>
                        <option value="6">Día 6</option>
                        <option value="5">Día 5</option>
                        <option value="10">Día 10</option>
                        <option value="15">Día 15</option>
                        <option value="30">Día 30</option>
                      </select>
                    </div>

                    {/* Account Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">💳 Por Cuenta:</label>
                      <select
                        value={auditFilterAccount}
                        onChange={(e) => setAuditFilterAccount(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-purple-400"
                      >
                        <option value="all">Todas las Cuentas</option>
                        <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa</option>
                        <option value="BBVA Operativa & Nómina">BBVA Operativa</option>
                        <option value="Stripe Gateway / Tarjeta">Stripe Gateway</option>
                        <option value="Caja Chica Efectivo">Caja Chica Efectivo</option>
                      </select>
                    </div>

                    {/* Author Filter */}
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">👤 Por Socio:</label>
                      <select
                        value={auditFilterAuthor}
                        onChange={(e) => setAuditFilterAuthor(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-gray-200 focus:outline-none focus:border-purple-400"
                      >
                        <option value="all">Todos los Socios</option>
                        <option value="Iván Castillo">Iván Castillo (CEO)</option>
                        <option value="Daniel Torre">Daniel Torre (Socio)</option>
                        <option value="Jorge Pérez">Jorge Pérez (Socio)</option>
                      </select>
                    </div>

                    {/* Reset Filter Button */}
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAuditFilterPaymentStatus("all");
                          setAuditFilterYear("all");
                          setAuditFilterMonth("all");
                          setAuditFilterDayRange("all");
                          setAuditFilterAccount("all");
                          setAuditFilterAuthor("all");
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restablecer</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE GRAPH VIEW (GRÁFICA FINANCIERA & DISTRIBUCIÓN) */}
                {(auditViewMode === "ambas" || auditViewMode === "grafica") && (
                  <div className="p-6 rounded-[28px] bg-gradient-to-b from-white/[0.04] to-black/60 border border-purple-500/30 space-y-5 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Analítica & Flujo de Caja</span>
                        <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                          <span>Gráfica Financiera por Fecha & Cuentas</span>
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("flujo")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "flujo" ? "bg-purple-600 text-white font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Flujo por Fecha
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("cuentas")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "cuentas" ? "bg-purple-600 text-white font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Por Cuentas
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuditChartMetric("estados")}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            auditChartMetric === "estados" ? "bg-emerald-500 text-black font-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Por Estados
                        </button>
                      </div>
                    </div>

                    {/* CHART 1: Timeline Bar Chart */}
                    {auditChartMetric === "flujo" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                          <span>Escala Máxima: ${maxTimelineVal.toLocaleString()} MXN</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Ingreso</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> Gasto Realizado</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Automático</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Pendiente</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 pt-6 pb-2 items-end min-h-[220px]">
                          {timelineList.map((item, idx) => {
                            const ingPct = Math.min(100, Math.round((item.ingreso / maxTimelineVal) * 160));
                            const expPct = Math.min(100, Math.round((item.gasto / maxTimelineVal) * 160));
                            const autoPct = Math.min(100, Math.round((item.automatico / maxTimelineVal) * 160));
                            const pendPct = Math.min(100, Math.round((item.pendiente / maxTimelineVal) * 160));

                            return (
                              <div key={idx} className="flex flex-col items-center gap-2 group">
                                <div className="w-full flex items-end justify-center gap-1 h-36 relative bg-white/[0.02] rounded-xl p-1.5 border border-white/5 group-hover:border-purple-500/40 transition-all">
                                  {/* Tooltip on hover */}
                                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30 bg-[#07070E] border border-white/20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-white whitespace-nowrap shadow-xl">
                                    <span>Total: ${item.total.toLocaleString()} MXN</span>
                                    {item.ingreso > 0 && <span className="text-emerald-400">+{item.ingreso.toLocaleString()} MXN</span>}
                                    {(item.gasto + item.automatico) > 0 && <span className="text-rose-400">-{(item.gasto + item.automatico).toLocaleString()} MXN</span>}
                                  </div>

                                  {item.ingreso > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                      style={{ height: `${Math.max(12, ingPct)}px` }}
                                      title={`Ingreso: $${item.ingreso.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.gasto > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                                      style={{ height: `${Math.max(12, expPct)}px` }}
                                      title={`Gasto: $${item.gasto.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.automatico > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                      style={{ height: `${Math.max(12, autoPct)}px` }}
                                      title={`Automático: $${item.automatico.toLocaleString()} MXN`}
                                    />
                                  )}
                                  {item.pendiente > 0 && (
                                    <div
                                      className="w-3.5 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md border-t border-dashed border-amber-300 transition-all duration-500"
                                      style={{ height: `${Math.max(12, pendPct)}px` }}
                                      title={`Pendiente: $${item.pendiente.toLocaleString()} MXN`}
                                    />
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-gray-300 font-bold">{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* CHART 2: Bank Account Distribution */}
                    {auditChartMetric === "cuentas" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <span className="text-xs font-mono font-bold text-white block uppercase">Distribución por Cuentas Bancarias</span>
                          
                          {/* Santander */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">🏦 Santander Corporativa</span>
                              <span className="text-white font-bold">$221,696 MXN (64%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full" style={{ width: "64%" }} />
                            </div>
                          </div>

                          {/* BBVA */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">🏦 BBVA Operativa & Nómina</span>
                              <span className="text-white font-bold">$149,800 MXN (28%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-600 to-[#00D1FF] rounded-full" style={{ width: "28%" }} />
                            </div>
                          </div>

                          {/* Stripe */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">💳 Stripe Gateway / Tarjeta</span>
                              <span className="text-white font-bold">$6,200 MXN (6%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full" style={{ width: "6%" }} />
                            </div>
                          </div>

                          {/* Caja Chica */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-300">💵 Caja Chica Efectivo</span>
                              <span className="text-white font-bold">$230 MXN (2%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "2%" }} />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                          <span className="text-xs font-mono font-bold text-white block uppercase">Distribución por Categorías</span>

                          {/* Proyectos */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-emerald-400">📈 Proyectos Software</span>
                              <span className="text-white font-bold">$250,000 MXN (67%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "67%" }} />
                            </div>
                          </div>

                          {/* Nómina */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-cyan-400">👥 Pago o Sueldos</span>
                              <span className="text-white font-bold">$47,000 MXN (13%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "13%" }} />
                            </div>
                          </div>

                          {/* Gastos Cloud */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-rose-400">📉 Gastos Cloud & Ops</span>
                              <span className="text-white font-bold">$38,626 MXN (10%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: "10%" }} />
                            </div>
                          </div>

                          {/* Comisiones */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-amber-400">💼 Comisiones Vendedores</span>
                              <span className="text-white font-bold">$37,800 MXN (10%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CHART 3: States Distribution */}
                    {auditChartMetric === "estados" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-emerald-400">Pagos Realizados</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumRealizados.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countRealizados} transacciones concluidas con comprobante</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-amber-400">Pagos Pendientes</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumPendientes.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countPendientes} en provisión por corte programado</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-2">
                          <span className="text-xs font-mono uppercase font-bold text-cyan-400">Pagos Automáticos</span>
                          <h4 className="text-2xl font-black text-white font-mono">${sumAutomaticos.toLocaleString()} MXN</h4>
                          <p className="text-[11px] text-gray-400">{countAutomaticos} suscripciones activas recurrentes</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AUDIT LOG DETAILED FEED LIST (Visible in ambas and lista) */}
                {(auditViewMode === "ambas" || auditViewMode === "lista") && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                        Movimientos Encontrados ({filteredAuditLogs.length}):
                      </span>
                      {filteredAuditLogs.length === 0 && (
                        <span className="text-xs font-mono text-amber-400">Ningún registro coincide con los filtros aplicados.</span>
                      )}
                    </div>

                    {filteredAuditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-white/[0.04]"
                      >
                        <div className="space-y-1.5 flex-1">
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

                            {/* Payment Status Tag */}
                            <span
                              className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                                log.paymentStatus === "realizado"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                  : log.paymentStatus === "pendiente"
                                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                  : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                              }`}
                            >
                              {log.paymentStatus === "realizado" && "🟢 Pago Realizado"}
                              {log.paymentStatus === "pendiente" && "🟡 Pago Pendiente"}
                              {log.paymentStatus === "automatico" && "🔄 Pago Automático"}
                              {!log.paymentStatus && "✓ Registro"}
                            </span>

                            <span className="text-[10px] font-mono text-gray-400">{log.timestamp}</span>

                            {log.category && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                                {log.category}
                              </span>
                            )}

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                              💳 {log.sourceAccount}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-1">{log.details}</h4>
                          <span className="text-[11px] font-mono text-gray-400 block">
                            Objetivo / Concepto: <strong className="text-gray-200">{log.target}</strong>
                          </span>
                        </div>

                        <div className="text-left md:text-right flex-shrink-0 space-y-1">
                          {typeof log.amount === "number" && (
                            <span
                              className={`text-base font-black font-mono block ${
                                log.action === "INGRESO"
                                  ? "text-emerald-400"
                                  : log.paymentStatus === "pendiente"
                                  ? "text-amber-400"
                                  : log.paymentStatus === "automatico"
                                  ? "text-[#00D1FF]"
                                  : "text-rose-400"
                              }`}
                            >
                              {log.action === "INGRESO" ? "+" : "-"}${(log.amount || 0).toLocaleString()} MXN
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-purple-300 block">
                            👤 {log.authorName} ({log.authorRole})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Partner Tab 3: Monitor de Servidores y Caducidades */}
            {partnerTab === "servidores" && (
              <div className="space-y-6">
                {/* Floating Notification Toast */}
                {reminderToast && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-black/90 to-blue-950/90 border border-[#00D1FF]/60 shadow-[0_0_30px_rgba(0,209,255,0.3)] animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/50 flex items-center justify-center flex-shrink-0">
                          <Bell className="w-5 h-5 text-[#00D1FF] animate-bounce" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">{reminderToast.title}</h4>
                          <p className="text-xs text-gray-300 font-mono mt-0.5">{reminderToast.message}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="text-[10px] font-mono text-gray-400">Destinatarios notificados:</span>
                            {reminderToast.recipients.map((rec, idx) => (
                              <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-[#00D1FF] border border-white/15">
                                {rec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReminderToast(null)}
                        className="text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* AUTOMATED RENEWAL & EXPIRATION REMINDERS BANNER */}
                <div className="p-6 sm:p-7 rounded-[28px] bg-gradient-to-r from-purple-950/30 via-black/80 to-blue-950/30 border border-purple-500/40 space-y-4 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00D1FF]/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_20px_rgba(0,209,255,0.4)] flex-shrink-0">
                        <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                          <Bell className="w-6 h-6 text-[#00D1FF] animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                            ● Sistema de Alertas Activo
                          </span>
                          <span className="text-[10px] font-mono text-purple-300">
                            Regla: Aviso con 3 Días de Anticipación
                          </span>
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight mt-1">
                          Programador de Recordatorios Mensuales & Pagos Recurrentes
                        </h2>
                        <p className="text-xs text-gray-300 font-mono mt-0.5">
                          Notificación automatizada a Iván (CEO) y a los socios (Daniel Torre, Jorge Pérez) antes del corte mensual.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleTriggerTestReminder(
                            "ChatGPT Pro (OpenAI)",
                            3,
                            ["Iván Castillo (CEO)", "Daniel Torre (Socio)", "Jorge Pérez (Socio)"],
                            846.01
                          )
                        }
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#0066FF] hover:from-[#33DDFF] hover:to-[#1A75FF] text-white font-bold text-xs uppercase tracking-wide flex items-center gap-2 shadow-[0_0_15px_rgba(0,209,255,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <Bell className="w-4 h-4" />
                        <span>🔔 Probar Alerta Inmediata</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlighted Rule Card: ChatGPT Pro */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-purple-500/30 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono relative z-10">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Suscripción Programada:</span>
                      <strong className="text-white text-sm block mt-0.5">ChatGPT Pro (OpenAI)</strong>
                      <span className="text-emerald-400 font-bold">$846.01 MXN / mes</span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Responsable del Pago:</span>
                      <strong className="text-purple-300 text-sm block mt-0.5">Daniel Torre</strong>
                      <span className="text-gray-400 text-[11px]">Socio de Operaciones</span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Próximo Corte / Renovación:</span>
                      <strong className="text-amber-300 text-sm block mt-0.5">10 de Cada Mes</strong>
                      <span className="text-rose-300 text-[11px] font-bold">🔔 Alerta el día 7 (3 días antes)</span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Destinatarios del Aviso:</span>
                      <div className="space-y-0.5 mt-1 text-[11px] text-gray-300">
                        <div>• Iván Castillo (CEO)</div>
                        <div>• Daniel Torre (Socio)</div>
                        <div>• Jorge Pérez (Socio)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Server and Services Cards Grid */}
                <div className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
                        <Server className="w-5 h-5 text-[#00D1FF]" />
                        <span>Vigencia de Servidores, Hosting, Dominios & Suscripciones IA</span>
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
                          srv.name.includes("ChatGPT Pro")
                            ? "border-[#00D1FF]/60 shadow-[0_0_25px_rgba(0,209,255,0.25)] bg-[#00D1FF]/[0.02]"
                            : srv.status === "critico"
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
                              srv.name.includes("ChatGPT Pro")
                                ? "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40"
                                : srv.status === "critico"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
                                : srv.status === "proximo_a_vencer"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            }`}
                          >
                            {srv.name.includes("ChatGPT Pro") ? "🔔 ALERTA PROGRAMADA (3 DÍAS)" : srv.status === "critico" ? "⚠️ CRÍTICO" : srv.status === "proximo_a_vencer" ? "PRÓXIMO A VENCER" : "ÓPTIMO"}
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
                          {srv.paidBy && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Pagado por:</span>
                              <span className="text-[#00D1FF] font-bold">{srv.paidBy}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-400">Costo Mensual:</span>
                            <span className="text-emerald-400 font-bold">
                              ${srv.costMonthly.toLocaleString("es-MX", { minimumFractionDigits: srv.costMonthly % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 })} MXN
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Días Restantes:</span>
                            <span className={`font-bold ${srv.daysRemaining <= 3 ? "text-rose-400 animate-pulse" : "text-white"}`}>
                              {srv.daysRemaining} días
                            </span>
                          </div>

                          {srv.reminderNotice && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                              <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                                {srv.reminderNotice}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  handleTriggerTestReminder(
                                    srv.name,
                                    srv.alertLeadDays || 3,
                                    srv.notifyRecipients || ["Iván Castillo (CEO)", "Daniel Torre (Socio)", "Jorge Pérez (Socio)"],
                                    srv.costMonthly
                                  )
                                }
                                className="w-full py-1.5 px-2.5 rounded-lg bg-[#00D1FF]/10 hover:bg-[#00D1FF]/25 border border-[#00D1FF]/30 text-[#00D1FF] text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Bell className="w-3 h-3" />
                                <span>Probar Recordatorio</span>
                              </button>
                            </div>
                          )}
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

            {partnerTab === "tabulador" && (
              <InternalPricingMatrix userRole="socio" userName={activeUser.name} />
            )}

            {partnerTab === "telemetria" && (
              <ExecutiveTelemetryDashboard />
            )}

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
                onClick={() => setDevTab("tabulador")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  devTab === "tabulador"
                    ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Tabulador de Precios</span>
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

            {devTab === "tabulador" && (
              <InternalPricingMatrix userRole="dev" userName={activeUser.name} />
            )}

            {devTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="dev" userName={activeUser.name} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: VENDEDOR / ASESOR COMERCIAL (JESSICA TORRE & ASESORES) */}
        {/* ========================================================================= */}
        {activeRole === "asesor" && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Advisor Subnav Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setAdvisorTab("leads_formulario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "leads_formulario"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Link & Leads</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvisorTab("citas_calendario")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "citas_calendario"
                    ? "bg-[#00D1FF] text-black font-black shadow-[0_0_25px_rgba(0,209,255,0.6)] ring-2 ring-white"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                <Calendar className={`w-4 h-4 ${advisorTab === "citas_calendario" ? "text-black" : "text-[#00D1FF]"}`} />
                <span>Calendario de Citas & Google Meet</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvisorTab("status_proyectos")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "status_proyectos"
                    ? "bg-[#00D1FF] text-black font-extrabold shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Estatus de Proyectos</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvisorTab("tabulador")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "tabulador"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Tabulador y Cotizador Base</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvisorTab("comisiones")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "comisiones"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Mis Comisiones</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvisorTab("chat")}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  advisorTab === "chat"
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Comercial</span>
              </button>
            </div>

            {/* TAB 1: REFERRAL LINK & LEADS */}
            {advisorTab === "leads_formulario" && (
              <div className="space-y-6">
                {/* Dynamic Referral Link Generator */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-pink-500/15 via-purple-950/40 to-[#00D1FF]/15 border border-white/20 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-pink-400" />
                      <span>Tu Enlace Exclusivo para Cotización de Clientes</span>
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-mono font-bold w-fit">
                      Código: {safeActiveUser.email.includes("jess") ? "VEN-JESS-301" : "VEN-CARLOS-202"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Envía este link a tus prospectos. Cuando un cliente llena el formulario, el proyecto queda registrado automáticamente con tu código y recibes alertas al instante.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      value={`https://innocentia.tech/crear-proyecto?ref=${safeActiveUser.email.includes("jess") ? "VEN-JESS-301" : "VEN-CARLOS-202"}&vendedor=${encodeURIComponent(safeActiveUser.name)}`}
                      className="flex-1 px-4 py-3.5 bg-black/70 border border-white/20 rounded-2xl text-xs font-mono text-[#00D1FF] font-bold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const link = `https://innocentia.tech/crear-proyecto?ref=${safeActiveUser.email.includes("jess") ? "VEN-JESS-301" : "VEN-CARLOS-202"}&vendedor=${encodeURIComponent(safeActiveUser.name)}`;
                        navigator.clipboard.writeText(link);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2500);
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-[#FF3858] hover:scale-105 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,56,88,0.4)] cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                      <span>{copiedLink ? "¡Enlace Copiado!" : "Copiar Enlace"}</span>
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Hola! Te comparto nuestro enlace oficial de cotización en Innocentia Tech para diseñar y desarrollar tu proyecto: https://innocentia.tech/crear-proyecto?ref=${safeActiveUser.email.includes("jess") ? "VEN-JESS-301" : "VEN-CARLOS-202"}&vendedor=${encodeURIComponent(safeActiveUser.name)}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                    >
                      <span>💬 Compartir por WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#00D1FF]" />
                      <span>Clientes que han llenado tu formulario</span>
                    </h3>
                    <span className="text-xs font-mono text-gray-400">Total: {sellerLeads.length} prospectos</span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {sellerLeads.map((lead) => (
                      <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-all">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{lead.clientName}</span>
                            <span className="text-xs font-mono text-purple-300">({lead.company})</span>
                          </div>
                          <span className="text-xs font-mono text-gray-400">📱 {lead.phone} • 📅 {lead.date} • 💰 Presupuesto: {lead.estimatedBudget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                            lead.status.includes("Aprobado")
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          }`}>
                            {lead.status}
                          </span>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${lead.clientName}, soy ${safeActiveUser.name} de Innocentia Tech. Recibí tu solicitud para el proyecto de ${lead.company}. ¿Podemos agendar una llamada rápida para mostrarte una demo?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 transition-all"
                            title="Contactar por WhatsApp"
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: APPOINTMENTS & GOOGLE CALENDAR SYNC (CALENDAR VIEW) */}
            {advisorTab === "citas_calendario" && (
              <CommercialCalendarView
                appointments={sellerAppointments}
                onAddAppointment={handleAddSellerAppointment}
                onUpdateAppointment={handleUpdateSellerAppointment}
                onDeleteAppointment={handleDeleteSellerAppointment}
                activeUser={safeActiveUser}
                getGoogleCalendarUrl={getGoogleCalendarUrl}
              />
            )}

            {/* TAB 3: PROJECT STATUS (ESTATUS DE PROYECTOS EN DESARROLLO) */}
            {advisorTab === "status_proyectos" && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#00D1FF]/15 via-purple-950/30 to-black border border-white/20 space-y-2">
                  <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#00D1FF]" />
                    <span>Estatus de Proyectos en Desarrollo</span>
                  </h3>
                  <p className="text-xs text-gray-300">
                    Monitorea en tiempo real los sprints, fechas de entrega y avances técnicos de los proyectos cerrados por tu gestión comercial.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-6 sm:p-7 rounded-[32px] bg-[#07070E] border border-white/15 space-y-5 shadow-2xl hover:border-[#00D1FF]/40 transition-all text-left"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono text-[#00D1FF] font-bold px-2.5 py-1 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30 uppercase">
                            {proj.id}
                          </span>
                          <h4 className="text-lg font-black text-white mt-2">{proj.name}</h4>
                          <p className="text-xs text-gray-300 font-mono">Cliente: <strong>{proj.client}</strong></p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          {proj.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-gray-400">Progreso General:</span>
                          <strong className="text-emerald-400">{proj.progress}%</strong>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF3858] via-purple-500 to-[#00D1FF] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,209,255,0.6)]"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Sprint Details & Tech Team */}
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-gray-400">Sprint Activo:</span>
                          <strong className="text-white">{proj.currentSprint}</strong>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-gray-400">Entrega Estimada:</span>
                          <strong className="text-[#00D1FF]">{proj.targetDate}</strong>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-gray-400">Diseño UI/UX:</span>
                          <span className="text-pink-300">{proj.leadDesigner}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Arquitectura & Código:</span>
                          <span className="text-cyan-300">{proj.devLead}</span>
                        </div>
                      </div>

                      {/* Commission & Budget */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Valor del Proyecto:</span>
                          <strong className="text-white text-sm">${proj.budget.toLocaleString()} MXN</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-400 block text-[10px]">Comisión Vendedor (12%):</span>
                          <strong className="text-emerald-400 text-sm">+${(proj.budget * 0.12).toLocaleString()} MXN</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TABULADOR & PRICING */}
            {advisorTab === "tabulador" && (
              <InternalPricingMatrix userRole="asesor" userName={safeActiveUser.name} />
            )}

            {/* TAB 5: COMMISSIONS */}
            {advisorTab === "comisiones" && (
              <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase">Tabulador de Comisiones Acumuladas</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Comisiones comerciales calculadas al 12% por proyectos cerrados en Innocentia Tech.
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Total Acumulado a Cobrar:</span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">$64,200 MXN</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Proyectos Facturados</span>
                    <span className="text-2xl font-black text-white">2 Proyectos</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">En Cotización Activa</span>
                    <span className="text-2xl font-black text-amber-300">3 Propuestas</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Comisión Promedio</span>
                    <span className="text-2xl font-black text-[#00D1FF]">12.0%</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: CHAT */}
            {advisorTab === "chat" && (
              <ProjectTeamFeedAndChat userRole="asesor" userName={safeActiveUser.name} />
            )}

            {/* MODAL: AGENDAR NUEVA CITA COMERCIAL */}
            {isNewAptModalOpen && (
              <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-[#07070E] border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-2xl text-left space-y-5 relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#00D1FF]" />
                      <h3 className="text-lg font-black text-white uppercase">Agendar Nueva Cita Comercial</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsNewAptModalOpen(false)}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Nombre del Cliente:</label>
                        <input
                          type="text"
                          required
                          value={newAptClientName}
                          onChange={(e) => setNewAptClientName(e.target.value)}
                          placeholder="Lic. Daniel Torre"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Empresa / Marca:</label>
                        <input
                          type="text"
                          value={newAptCompany}
                          onChange={(e) => setNewAptCompany(e.target.value)}
                          placeholder="Pro Acabados"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Teléfono / WhatsApp:</label>
                        <input
                          type="text"
                          value={newAptPhone}
                          onChange={(e) => setNewAptPhone(e.target.value)}
                          placeholder="9601771556"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Fecha de la Cita:</label>
                        <input
                          type="date"
                          required
                          value={newAptDate}
                          onChange={(e) => setNewAptDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Hora:</label>
                        <input
                          type="time"
                          required
                          value={newAptTime}
                          onChange={(e) => setNewAptTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Modalidad de la Reunión:</label>
                      <select
                        value={newAptType}
                        onChange={(e) => setNewAptType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                      >
                        <option value="Videollamada Google Meet">Videollamada Google Meet</option>
                        <option value="Demostración de Plataforma & Cotización">Demostración de Plataforma & Cotización</option>
                        <option value="Llamada Telefónica">Llamada Telefónica</option>
                        <option value="Reunión Presencial">Reunión Presencial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Tema Principal a Tratar:</label>
                      <input
                        type="text"
                        value={newAptTopic}
                        onChange={(e) => setNewAptTopic(e.target.value)}
                        placeholder="Ej: Demo de App Móvil y revisión de presupuesto"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Notas Adicionales:</label>
                      <textarea
                        rows={2}
                        value={newAptNotes}
                        onChange={(e) => setNewAptNotes(e.target.value)}
                        placeholder="Detalles sobre el cliente o dudas previas..."
                        className="w-full px-4 py-2 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsNewAptModalOpen(false)}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-purple-600 text-black font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
                      >
                        Agendar Cita
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
            className="w-full max-w-xl bg-[#07070E] border border-purple-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl text-left space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Libro Contable & Tesorería</span>
                <h3 className="text-xl font-black text-white mt-0.5">Nuevo Registro Financiero</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFinanceModalOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Category Selector 4 Buttons */}
              <div>
                <label className="block text-gray-400 mb-1.5 font-bold uppercase text-[10px]">
                  1. Selecciona la Categoría Financiera:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFinSection("ingreso_proyecto");
                      setFinCategory("Anticipo de Proyecto");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      finSection === "ingreso_proyecto"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    📈 1. Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFinSection("gasto_operativo");
                      setFinCategory("Infraestructura Cloud");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      finSection === "gasto_operativo"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    📉 2. Gasto Cloud
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFinSection("comision_vendedor");
                      setFinCategory("Comisiones Asesores");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      finSection === "comision_vendedor"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    💼 3. Comisión
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFinSection("nomina_sueldo");
                      setFinCategory("Sueldos / Honorarios Tech");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      finSection === "nomina_sueldo"
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    👥 4. Sueldo/Nómina
                  </button>
                </div>
              </div>

              {/* Concept Input */}
              <div>
                <label className="block text-gray-400 mb-1">Concepto Detallado del Movimiento:</label>
                <input
                  type="text"
                  value={finConcept}
                  onChange={(e) => setFinConcept(e.target.value)}
                  placeholder={
                    finSection === "ingreso_proyecto"
                      ? "ej: Anticipo 50% Desarrollo App Móvil"
                      : finSection === "gasto_operativo"
                      ? "ej: Servidores Producción AWS / Vercel Pro"
                      : finSection === "comision_vendedor"
                      ? "ej: Comisión Venta Cierre 18% Clínica Médica"
                      : "ej: Honorarios Sprint 1 - Lead Developer Backend"
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-mono text-xs"
                />
              </div>

              {/* Amount & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Monto (MXN):</label>
                  <input
                    type="number"
                    value={finAmount}
                    onChange={(e) => setFinAmount(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-mono text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Subcategoría:</label>
                  <select
                    value={finCategory}
                    onChange={(e) => setFinCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-mono text-xs"
                  >
                    {finSection === "ingreso_proyecto" && (
                      <>
                        <option value="Anticipo de Proyecto">Anticipo de Proyecto</option>
                        <option value="Liquidación Sprint">Liquidación Sprint</option>
                        <option value="Pago Final Entrega">Pago Final Entrega</option>
                        <option value="Mantenimiento Mensual">Mantenimiento Mensual</option>
                      </>
                    )}
                    {finSection === "gasto_operativo" && (
                      <>
                        <option value="Infraestructura Cloud">Infraestructura Cloud</option>
                        <option value="Hosting & Dominio Edge">Hosting & Dominio Edge</option>
                        <option value="APIs de IA & Modelos">APIs de IA & Modelos</option>
                        <option value="Marketing & Chatbots AI">Marketing & Chatbots AI</option>
                        <option value="Herramientas de IA & SDK">Herramientas de IA & SDK</option>
                        <option value="Servicios Cloud">Servicios Cloud</option>
                        <option value="Telecomunicaciones">Telecomunicaciones (SIM/Chip)</option>
                      </>
                    )}
                    {finSection === "comision_vendedor" && (
                      <>
                        <option value="Comisiones Asesores">Comisión Venta Cierre</option>
                        <option value="Bono de Prospección">Bono de Prospección</option>
                        <option value="Provisión de Comisión">Provisión de Comisión</option>
                      </>
                    )}
                    {finSection === "nomina_sueldo" && (
                      <>
                        <option value="Sueldos / Honorarios Tech">Sueldos / Honorarios Tech</option>
                        <option value="Sueldos / Honorarios Diseño">Sueldos / Honorarios Diseño</option>
                        <option value="Sueldos / Honorarios Infra">Sueldos / Honorarios Infra / DevOps</option>
                        <option value="Bono de Desempeño">Bono de Desempeño</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Dynamic Context Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {finSection === "ingreso_proyecto" && (
                  <div>
                    <label className="block text-gray-400 mb-1">Proyecto / Cliente:</label>
                    <input
                      type="text"
                      value={finProjectRef}
                      onChange={(e) => setFinProjectRef(e.target.value)}
                      placeholder="ej: Clínica Médica AI"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                {finSection === "gasto_operativo" && (
                  <div>
                    <label className="block text-gray-400 mb-1">Proveedor / Servicio:</label>
                    <input
                      type="text"
                      value={finProvider}
                      onChange={(e) => setFinProvider(e.target.value)}
                      placeholder="ej: Amazon Web Services / Vercel"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                {(finSection === "comision_vendedor" || finSection === "nomina_sueldo") && (
                  <div>
                    <label className="block text-gray-400 mb-1">Beneficiario / Asesor / Integrante:</label>
                    <input
                      type="text"
                      value={finBeneficiary}
                      onChange={(e) => setFinBeneficiary(e.target.value)}
                      placeholder={finSection === "comision_vendedor" ? "ej: Carlos Mendoza" : "ej: Ing. Rodrigo Pacheco"}
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-400 mb-1">Fecha de Corte / Vencimiento:</label>
                  <input
                    type="text"
                    value={finDueDate}
                    onChange={(e) => setFinDueDate(e.target.value)}
                    placeholder="ej: 30 de Septiembre de 2026"
                    className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Paid By / Payer Attribution */}
              <div>
                <label className="block text-gray-400 mb-1.5 font-bold uppercase text-[10px]">
                  👤 ¿Quién realizó o de quién proviene este pago? (Pagador / Origen):
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    "Daniel Torre (Socio)",
                    "Jorge Pérez (Socio)",
                    "Iván Castillo (CEO)",
                    "Santander Corporativa (Innocentia Tech)",
                    "BBVA Operativa & Nómina",
                    "Caja Chica Efectivo",
                    "Cliente Registrado",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFinPaidBy(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                        finPaidBy === preset
                          ? "bg-purple-500/30 text-purple-300 border border-purple-400 font-bold"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={finPaidBy}
                  onChange={(e) => setFinPaidBy(e.target.value)}
                  placeholder="ej: Daniel Torre (Socio) / Empresa Cliente / Santander"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 text-xs font-mono"
                />
              </div>

              {/* Source Account Selector */}
              <div>
                <label className="block text-gray-400 mb-1">Cuenta Bancaria de Origen / Receptora:</label>
                <select
                  value={finSourceAccount}
                  onChange={(e) => setFinSourceAccount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-bold text-xs"
                >
                  <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa (Innocentia Tech)</option>
                  <option value="BBVA Operativa & Nómina">BBVA Operativa & Nómina</option>
                  <option value="Stripe Gateway / Tarjeta">Stripe Gateway / Tarjeta</option>
                  <option value="Transferencia SPEI Directa">Transferencia SPEI Directa</option>
                  <option value="Caja Chica Efectivo">Caja Chica Efectivo (Línea SIM / Menores)</option>
                  <option value="PayPal Business Internacional">PayPal Business Internacional</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-gray-300 flex items-center justify-between">
                <span>Registrado por: <strong className="text-white">{activeUser.name}</strong> ({activeUser.roleTitle})</span>
                <span className="text-[10px] font-mono text-purple-400 font-bold">Bitácora Activa</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsFinanceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-[#00D1FF] to-emerald-500 hover:scale-105 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Guardar en Libro Contable
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT FINANCE MOVEMENT & ASSIGN PAYER */}
      {/* ========================================================================= */}
      {isEditFinanceModalOpen && editingFinanceRecord && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEditFinanceRecord}
            className="w-full max-w-xl bg-[#07070E] border border-purple-500/40 rounded-[32px] p-6 sm:p-8 shadow-2xl text-left space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {editingFinanceRecord.id}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                    Edición de Movimiento & Pagador
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">Editar Movimiento Financiero</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditFinanceModalOpen(false);
                  setEditingFinanceRecord(null);
                }}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono max-h-[70vh] overflow-y-auto pr-1">
              {/* Category Selector */}
              <div>
                <label className="block text-gray-400 mb-1.5 font-bold uppercase text-[10px]">
                  Sección / Categoría del Movimiento:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditFinSection("ingreso_proyecto");
                      setEditFinCategory("Anticipo de Proyecto");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      editFinSection === "ingreso_proyecto"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    📈 1. Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditFinSection("gasto_operativo");
                      setEditFinCategory("Infraestructura Cloud");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      editFinSection === "gasto_operativo"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    📉 2. Gasto Cloud
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditFinSection("comision_vendedor");
                      setEditFinCategory("Comisiones Asesores");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      editFinSection === "comision_vendedor"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    💼 3. Comisión
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditFinSection("nomina_sueldo");
                      setEditFinCategory("Sueldos / Honorarios Tech");
                    }}
                    className={`p-2.5 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                      editFinSection === "nomina_sueldo"
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                  >
                    👥 4. Sueldo/Nómina
                  </button>
                </div>
              </div>

              {/* PAYER ATTRIBUTION (De quién proviene / quién pagó) */}
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                <label className="block text-purple-300 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>👤 ¿Quién realizó o de quién proviene el pago? (Pagador / Origen):</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Daniel Torre (Socio)",
                    "Jorge Pérez (Socio)",
                    "Iván Castillo (CEO)",
                    "Santander Corporativa (Innocentia Tech)",
                    "BBVA Operativa & Nómina",
                    "Caja Chica Efectivo",
                    "Cliente Registrado",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEditFinPaidBy(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                        editFinPaidBy === preset
                          ? "bg-purple-500 text-white font-bold shadow-sm"
                          : "bg-white/10 text-gray-300 hover:bg-white/15"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editFinPaidBy}
                  onChange={(e) => setEditFinPaidBy(e.target.value)}
                  placeholder="ej: Daniel Torre (Socio), Jorge Pérez, Iván Castillo, Cliente X, Santander..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 text-xs font-mono font-medium"
                />
                <span className="text-[10px] text-gray-400 block">
                  Si este campo se deja vacío, la tabla mostrará la opción interactiva [✏️ Asignar].
                </span>
              </div>

              {/* Concept Input */}
              <div>
                <label className="block text-gray-400 mb-1">Concepto Detallado:</label>
                <input
                  type="text"
                  value={editFinConcept}
                  onChange={(e) => setEditFinConcept(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-mono text-xs"
                />
              </div>

              {/* Amount & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Monto (MXN):</label>
                  <input
                    type="number"
                    value={editFinAmount}
                    onChange={(e) => setEditFinAmount(Number(e.target.value))}
                    required
                    min={0.01}
                    step="any"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-purple-400 font-mono text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Subcategoría:</label>
                  <select
                    value={editFinCategory}
                    onChange={(e) => setEditFinCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-mono text-xs"
                  >
                    {editFinSection === "ingreso_proyecto" && (
                      <>
                        <option value="Anticipo de Proyecto">Anticipo de Proyecto</option>
                        <option value="Liquidación Sprint">Liquidación Sprint</option>
                        <option value="Pago Final Entrega">Pago Final Entrega</option>
                        <option value="Mantenimiento Mensual">Mantenimiento Mensual</option>
                      </>
                    )}
                    {editFinSection === "gasto_operativo" && (
                      <>
                        <option value="Infraestructura Cloud">Infraestructura Cloud</option>
                        <option value="Hosting & Dominio Edge">Hosting & Dominio Edge</option>
                        <option value="APIs de IA & Modelos">APIs de IA & Modelos</option>
                        <option value="Marketing & Chatbots AI">Marketing & Chatbots AI</option>
                        <option value="Herramientas de IA & SDK">Herramientas de IA & SDK</option>
                        <option value="Servicios Cloud">Servicios Cloud</option>
                        <option value="Suscripción IA">Suscripción IA</option>
                        <option value="Telecomunicaciones">Telecomunicaciones (SIM/Chip)</option>
                      </>
                    )}
                    {editFinSection === "comision_vendedor" && (
                      <>
                        <option value="Comisiones Asesores">Comisiones Asesores</option>
                        <option value="Bono de Prospección">Bono de Prospección</option>
                        <option value="Provisión de Comisión">Provisión de Comisión</option>
                      </>
                    )}
                    {editFinSection === "nomina_sueldo" && (
                      <>
                        <option value="Sueldos / Honorarios Tech">Sueldos / Honorarios Tech</option>
                        <option value="Sueldos / Honorarios Diseño">Sueldos / Honorarios Diseño</option>
                        <option value="Sueldos / Honorarios Infra">Sueldos / Honorarios Infra / DevOps</option>
                        <option value="Bono de Desempeño">Bono de Desempeño</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Dynamic Context Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editFinSection === "ingreso_proyecto" && (
                  <div>
                    <label className="block text-gray-400 mb-1">Proyecto / Cliente:</label>
                    <input
                      type="text"
                      value={editFinProjectRef}
                      onChange={(e) => setEditFinProjectRef(e.target.value)}
                      placeholder="ej: Clínica Médica AI"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                {editFinSection === "gasto_operativo" && (
                  <div>
                    <label className="block text-gray-400 mb-1">Proveedor / Servicio:</label>
                    <input
                      type="text"
                      value={editFinProvider}
                      onChange={(e) => setEditFinProvider(e.target.value)}
                      placeholder="ej: Amazon Web Services / Vercel"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                {(editFinSection === "comision_vendedor" || editFinSection === "nomina_sueldo") && (
                  <div>
                    <label className="block text-gray-400 mb-1">Beneficiario / Asesor / Integrante:</label>
                    <input
                      type="text"
                      value={editFinBeneficiary}
                      onChange={(e) => setEditFinBeneficiary(e.target.value)}
                      placeholder={editFinSection === "comision_vendedor" ? "ej: Carlos Mendoza" : "ej: Ing. Rodrigo Pacheco"}
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-400 mb-1">Fecha de Corte / Vencimiento:</label>
                  <input
                    type="text"
                    value={editFinDueDate}
                    onChange={(e) => setEditFinDueDate(e.target.value)}
                    placeholder="ej: 30 de Septiembre de 2026"
                    className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Status & Account */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Estado del Pago:</label>
                  <select
                    value={editFinStatus}
                    onChange={(e) => setEditFinStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-bold text-xs"
                  >
                    <option value="pagado">🟢 Pagado / Liquidado</option>
                    <option value="recurrente">🔄 Recurrente / Activo</option>
                    <option value="pendiente">🟡 Pendiente por Dispersar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Cuenta Bancaria de Cargo / Abono:</label>
                  <select
                    value={editFinSourceAccount}
                    onChange={(e) => setEditFinSourceAccount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none font-bold text-xs"
                  >
                    <option value="Santander Corporativa (Innocentia Tech)">Santander Corporativa (Innocentia Tech)</option>
                    <option value="BBVA Operativa & Nómina">BBVA Operativa & Nómina</option>
                    <option value="Stripe Gateway / Tarjeta">Stripe Gateway / Tarjeta</option>
                    <option value="Transferencia SPEI Directa">Transferencia SPEI Directa</option>
                    <option value="Caja Chica Efectivo">Caja Chica Efectivo (Línea SIM / Menores)</option>
                    <option value="PayPal Business Internacional">PayPal Business Internacional</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-gray-300 flex items-center justify-between">
                <span>Editando como: <strong className="text-white">{activeUser.name}</strong> ({activeUser.roleTitle})</span>
                <span className="text-[10px] font-mono text-purple-400 font-bold">Bitácora de Auditoría</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsEditFinanceModalOpen(false);
                  setEditingFinanceRecord(null);
                }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-[#00D1FF] to-emerald-500 hover:scale-105 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Guardar Cambios & Actualizar Bitácora
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
          if (user) {
            setActiveRole(user.role);
            setActiveUser(user);
            setAuthenticatedUserId(user.id);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("innocentia_session_auth_id", user.id);
            }
          }
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
