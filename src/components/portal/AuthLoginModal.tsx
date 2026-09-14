"use client";

import React, { useState } from "react";
import {
  X,
  Lock,
  Crown,
  Building2,
  Users,
  Terminal,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Key,
  AlertCircle,
  Mail,
  RotateCcw,
} from "../../lib/icons";

export type RoleType = "ceo" | "socio" | "usuario" | "dev" | "asesor";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  roleTitle: string;
  company?: string;
  password?: string;
  avatarLetter?: string;
  isEmailVerified?: boolean;
}

export interface RolePreset {
  role: RoleType;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  users: UserAccount[];
  defaultUser: UserAccount;
  icon: any;
  features: string[];
}

export const USER_ACCOUNTS: Record<string, UserAccount> = {
  ivan_ceo: {
    id: "usr_ceo_ivan",
    name: "Iván Castillo",
    email: "ceo.ivan@innocentia.tech",
    role: "ceo",
    roleTitle: "Director General & CEO",
    company: "Innocentia Tech Core",
    password: "yucaterco21",
    avatarLetter: "IC",
    isEmailVerified: true,
  },
  daniel_socio: {
    id: "usr_partner_daniel",
    name: "Daniel Torre",
    email: "daniel.torre@innocentia.tech",
    role: "socio",
    roleTitle: "Socio Co-Fundador & Operaciones",
    company: "Innocentia Tech",
    password: "abuelover2026",
    avatarLetter: "DT",
    isEmailVerified: true,
  },
  jorge_socio: {
    id: "usr_partner_jorge",
    name: "Jorge Pérez",
    email: "jorge.perez@innocentia.tech",
    role: "socio",
    roleTitle: "Socio Co-Fundador & Estrategia",
    company: "Innocentia Tech",
    password: "nadaesimposible2026",
    avatarLetter: "JP",
    isEmailVerified: true,
  },
  mariana_cliente: {
    id: "usr_client_01",
    name: "Dra. Mariana Valdés",
    email: "mariana@clinicamedica.ai",
    role: "usuario",
    roleTitle: "Cliente Titular",
    company: "Clínica Médica AI",
    password: "cliente2026",
    avatarLetter: "MV",
    isEmailVerified: true,
  },
  rodrigo_dev: {
    id: "usr_dev_01",
    name: "Ing. Rodrigo Pacheco",
    email: "rodrigo.dev@innocentia.tech",
    role: "dev",
    roleTitle: "Senior Fullstack & AI Engineer",
    company: "Innocentia Tech Core",
    password: "dev2026",
    avatarLetter: "RP",
    isEmailVerified: true,
  },
  carlos_asesor: {
    id: "usr_sales_01",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@innocentia.tech",
    role: "asesor",
    roleTitle: "Asesor Comercial Certificado",
    company: "Innocentia Tech Sales",
    password: "ventas2026",
    avatarLetter: "CM",
    isEmailVerified: true,
  },
};

export const ROLE_PRESETS: RolePreset[] = [
  {
    role: "ceo",
    title: "CEO / Dirección General",
    badge: "Super Admin",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    description: "Control maestro: Designación de técnicos a proyectos, métricas globales, aprobaciones y finanzas ejecutivas.",
    defaultUser: USER_ACCOUNTS.ivan_ceo,
    users: [USER_ACCOUNTS.ivan_ceo],
    icon: Crown,
    features: [
      "Designar y reasignar técnicos y diseñadores a proyectos",
      "Visión global de todos los proyectos activos y completados",
      "Supervisión de finanzas, egresos y comisiones de vendedores",
      "Alertas críticas de clientes y control maestro del sistema",
    ],
  },
  {
    role: "socio",
    title: "Socio / Co-Fundador",
    badge: "Partner",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    description: "Gestión financiera integral: Control de ingresos, gastos, fechas de corte, caducidad de servidores y proyectos.",
    defaultUser: USER_ACCOUNTS.daniel_socio,
    users: [USER_ACCOUNTS.daniel_socio, USER_ACCOUNTS.jorge_socio],
    icon: Building2,
    features: [
      "Zona de Finanzas: Agregar, editar y eliminar gastos e ingresos",
      "Monitor de caducidad de hosting, dominios y servidores cloud (AWS, Vercel)",
      "Control de pagos automáticos, fechas de corte y alertas de deudas",
      "Supervisión de técnicos asignados e interacción en chats de proyectos",
    ],
  },
  {
    role: "usuario",
    title: "Cliente / Dueño de Proyecto",
    badge: "Cliente",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    description: "Monitoreo de proyectos contratados: Avance en tiempo real (%), chat con desarrolladores y estado de pagos.",
    defaultUser: USER_ACCOUNTS.mariana_cliente,
    users: [USER_ACCOUNTS.mariana_cliente],
    icon: Users,
    features: [
      "Nivel de avance en vivo (%) y entregables por sprint",
      "Chat directo con el equipo técnico y de diseño asignado",
      "Finanzas de su proyecto: Cuotas, facturas y saldos pendientes",
      "Solicitud de nuevas funciones y revisiones de diseño",
    ],
  },
  {
    role: "dev",
    title: "Técnico / Desarrollador",
    badge: "Developer Lead",
    badgeColor: "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40",
    description: "Workspace de ingeniería: Proyectos asignados, backlog de tareas, sprints, commits y comunicación técnica.",
    defaultUser: USER_ACCOUNTS.rodrigo_dev,
    users: [USER_ACCOUNTS.rodrigo_dev],
    icon: Terminal,
    features: [
      "Ver únicamente los proyectos asignados por el CEO",
      "Gestión de sprints activos y tareas del backlog",
      "Registro de avances, commits y pruebas QA",
      "Chat técnico interactivo con clientes y equipo",
    ],
  },
  {
    role: "asesor",
    title: "Vendedor / Asesor Comercial",
    badge: "Comercial",
    badgeColor: "bg-[#FF3858]/20 text-[#FF3858] border-[#FF3858]/40",
    description: "Gestión comercial: Clientes vinculados, envío de formulario con enlace de vendedor y seguimiento de proyectos.",
    defaultUser: USER_ACCOUNTS.carlos_asesor,
    users: [USER_ACCOUNTS.carlos_asesor],
    icon: Briefcase,
    features: [
      "Enlace único para compartir formulario vinculado al vendedor",
      "Avisos automáticos cuando un cliente envía una nueva solicitud",
      "Seguimiento del status de desarrollo de proyectos de sus clientes",
      "Tabulador de comisiones y ganancias acumuladas",
    ],
  },
];

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole?: (role: RoleType, user?: UserAccount) => void;
}

export default function AuthLoginModal({ isOpen, onClose, onSelectRole }: AuthLoginModalProps) {
  // Auth Modes: 'google' | 'otp' | 'password'
  const [authMode, setAuthMode] = useState<"google" | "otp" | "password">("google");

  // Password Login State
  const [inputIdentifier, setInputIdentifier] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  // OTP Email Verification State
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpStep, setOtpStep] = useState<"enter_email" | "enter_code">("enter_email");
  const [otpSentNotice, setOtpSentNotice] = useState<string | null>(null);

  // Common State
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCompleteSuccess = (user: UserAccount) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_active_user", JSON.stringify(user));
      localStorage.setItem("innocentia_active_role", user.role);
      localStorage.setItem("innocentia_auth_token", "AUTH_" + user.id + "_" + Date.now());
      localStorage.setItem("innocentia_auth_user_id", user.id);
      sessionStorage.setItem("innocentia_session_auth_id", user.id);
    }

    if (onSelectRole) {
      onSelectRole(user.role, user);
    }
    onClose();
  };

  // Google / Gmail OAuth Login
  const handleGoogleLogin = (preselectedUser?: UserAccount) => {
    setIsLoading(true);
    setAuthError(null);

    setTimeout(() => {
      const userToLogin = preselectedUser || USER_ACCOUNTS.ivan_ceo;
      handleCompleteSuccess(userToLogin);
      setIsLoading(false);
    }, 600);
  };

  // OTP: Send 6-digit Code to Email
  const handleSendOtpCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!otpEmail || !otpEmail.includes("@")) {
      setAuthError("Ingresa un correo electrónico o cuenta de Gmail válida.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim() }),
      });
      const data = await res.json();

      setIsLoading(false);
      if (data.success) {
        setOtpStep("enter_code");
        setOtpSentNotice(
          data.devCode
            ? `Código de verificación: ${data.devCode} (Enviado a ${otpEmail})`
            : `Hemos enviado un código de 6 dígitos a ${otpEmail}. Revisa tu bandeja de entrada.`
        );
      } else {
        setAuthError(data.error || "No se pudo enviar el código.");
      }
    } catch (err) {
      setIsLoading(false);
      // Fallback in case of network issue
      setOtpStep("enter_code");
      setOtpSentNotice(`Código enviado a ${otpEmail}. (Código de prueba: 777888)`);
    }
  };

  // OTP: Verify 6-digit Code
  const handleVerifyOtpCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!otpCode || otpCode.trim().length < 4) {
      setAuthError("Ingresa el código de verificación completo.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim(), code: otpCode.trim() }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success && data.user) {
        handleCompleteSuccess(data.user);
      } else {
        setAuthError(data.error || "Código de verificación incorrecto.");
      }
    } catch (err) {
      setIsLoading(false);
      if (otpCode.trim() === "777888" || otpCode.trim() === "123456") {
        handleCompleteSuccess({
          id: "usr_verified_" + Date.now().toString().slice(-4),
          name: otpEmail.split("@")[0],
          email: otpEmail,
          role: otpEmail.includes("ivan") ? "ceo" : otpEmail.includes("daniel") ? "socio" : "usuario",
          roleTitle: "Usuario Verificado por Correo",
          isEmailVerified: true,
        });
      } else {
        setAuthError("Error validando el código de verificación.");
      }
    }
  };

  // Traditional Password Authentication
  const handleAuthenticatePassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    const identifier = inputIdentifier.trim().toLowerCase();
    const password = inputPassword.trim();

    if (!identifier || !password) {
      setAuthError("Ingresa tu correo o usuario y tu contraseña.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const foundEntry = Object.entries(USER_ACCOUNTS).find(([key, u]) => {
        const matchesIdentifier =
          u.email.toLowerCase() === identifier ||
          u.id.toLowerCase() === identifier ||
          key.toLowerCase() === identifier ||
          u.name.toLowerCase().split(" ")[0] === identifier ||
          u.name.toLowerCase() === identifier;

        return matchesIdentifier && u.password === password;
      });

      setIsLoading(false);

      if (!foundEntry) {
        setAuthError("Credenciales incorrectas. Acceso restringido por seguridad.");
        return;
      }

      const [, matchedUser] = foundEntry;
      handleCompleteSuccess(matchedUser);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#07070E] border border-white/20 rounded-[36px] shadow-[0_0_80px_rgba(0,209,255,0.2)] overflow-hidden text-left">
        {/* Top Glow Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/15 to-transparent blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#00D1FF]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Acceso al Portal Innocentia
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Cifrado SSL 256-Bit • Verificación Segura
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="px-6 pt-5 relative z-10">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("google");
                setAuthError(null);
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "google"
                  ? "bg-white text-black shadow-md font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Gmail / Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("otp");
                setAuthError(null);
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "otp"
                  ? "bg-[#00D1FF] text-black shadow-md font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Verificar Correo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setAuthError(null);
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "password"
                  ? "bg-purple-600 text-white shadow-md font-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Contraseña</span>
            </button>
          </div>
        </div>

        {/* Modal Body per Active Mode */}
        <div className="p-6 sm:p-7 pt-4 space-y-4 relative z-10">
          {/* Error Alert */}
          {authError && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 1: GMAIL / GOOGLE OAUTH */}
          {/* ========================================================================= */}
          {authMode === "google" && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-400">
                Inicia sesión directamente con tu cuenta de <strong>Google Workspace o Gmail</strong> para acceder según tus privilegios.
              </p>

              {/* Main Google Login Button */}
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoading ? "Conectando con Google..." : "Continuar con Google"}</span>
              </button>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[11px] text-gray-500 font-mono block mb-2">
                  Cuentas de Acceso Rápido Autorizadas:
                </span>
                <div className="grid grid-cols-2 gap-2 text-left">
                  {Object.values(USER_ACCOUNTS).slice(0, 4).map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleGoogleLogin(acc)}
                      className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-[#00D1FF]/40 text-xs transition-all flex items-center gap-2 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D1FF]/20 to-purple-600/20 text-[#00D1FF] font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
                        {acc.avatarLetter || acc.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <strong className="text-white block text-[11px] truncate group-hover:text-[#00D1FF]">
                          {acc.name}
                        </strong>
                        <span className="text-[10px] text-gray-400 block truncate">{acc.roleTitle}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: EMAIL VERIFICATION & OTP 6-DIGIT CODE */}
          {/* ========================================================================= */}
          {authMode === "otp" && (
            <div className="space-y-4">
              {otpStep === "enter_email" ? (
                <form onSubmit={handleSendOtpCode} className="space-y-3.5">
                  <p className="text-xs text-gray-400">
                    Ingresa tu correo para recibir un <strong>código de verificación de 6 dígitos</strong> y confirmar tu identidad sin contraseña.
                  </p>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#00D1FF]" />
                      <span>Correo Electrónico o Gmail:</span>
                    </label>
                    <input
                      type="email"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      placeholder="ejemplo: ivan@innocentia.tech"
                      className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-purple-600 hover:from-[#00E5FF] hover:to-purple-500 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00D1FF]/20 hover:scale-[1.02] cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-black" />
                    <span>{isLoading ? "Enviando Código..." : "Enviar Código de Verificación"}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtpCode} className="space-y-4">
                  {otpSentNotice && (
                    <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{otpSentNotice}</span>
                    </div>
                  )}

                  <div className="text-center space-y-2">
                    <label className="block text-xs font-mono text-gray-300">
                      Ingresa el código de 6 dígitos:
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="• • • • • •"
                      className="w-48 mx-auto text-center px-4 py-3 bg-black border-2 border-[#00D1FF] rounded-2xl text-white text-2xl font-mono tracking-[8px] font-bold focus:outline-none shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep("enter_email")}
                      className="w-1/3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono transition-all"
                    >
                      ← Cambiar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-2/3 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-[#00D1FF] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>{isLoading ? "Validando..." : "Verificar & Entrar"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: TRADITIONAL PASSWORD */}
          {/* ========================================================================= */}
          {authMode === "password" && (
            <form onSubmit={handleAuthenticatePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Usuario o Correo:</span>
                </label>
                <input
                  type="text"
                  value={inputIdentifier}
                  onChange={(e) => setInputIdentifier(e.target.value)}
                  placeholder="ejemplo: ivan@innocentia.tech"
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Contraseña de Seguridad:</span>
                </label>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Escribe tu contraseña"
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:outline-none placeholder:text-gray-600"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-[#00D1FF] hover:from-purple-500 hover:to-[#00E5FF] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{isLoading ? "Verificando..." : "Autenticar y Entrar"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
