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
  const [inputIdentifier, setInputIdentifier] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAuthenticate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    const identifier = inputIdentifier.trim().toLowerCase();
    const password = inputPassword.trim();

    if (!identifier || !password) {
      setAuthError("Ingresa tu correo o usuario y tu contraseña de seguridad.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching user by email, id, key, or first name
      const foundEntry = Object.entries(USER_ACCOUNTS).find(([key, u]) => {
        const matchesIdentifier =
          u.email.toLowerCase() === identifier ||
          u.id.toLowerCase() === identifier ||
          key.toLowerCase() === identifier ||
          u.name.toLowerCase().split(" ")[0] === identifier ||
          u.name.toLowerCase() === identifier;

        return matchesIdentifier && u.password === password;
      });

      if (!foundEntry) {
        setIsLoading(false);
        setAuthError("Credenciales incorrectas. Acceso restringido por seguridad.");
        return;
      }

      const [, matchedUser] = foundEntry;

      // Success: Save auth session
      if (typeof window !== "undefined") {
        sessionStorage.setItem("innocentia_session_auth_id", matchedUser.id);
        localStorage.setItem("innocentia_active_role", matchedUser.role);
        localStorage.setItem("innocentia_active_user", JSON.stringify(matchedUser));
        localStorage.setItem("innocentia_auth_token", "AUTH_" + matchedUser.id + "_" + Date.now());
        localStorage.setItem("innocentia_auth_user_id", matchedUser.id);
      }

      setIsLoading(false);

      if (onSelectRole) {
        onSelectRole(matchedUser.role, matchedUser);
      } else {
        window.location.href = `/portal?role=${matchedUser.role}&userId=${matchedUser.id}`;
      }
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 text-left">
      <div className="relative w-full max-w-lg bg-[#07070E] border border-white/20 rounded-[32px] shadow-[0_0_90px_rgba(0,209,255,0.2)] overflow-hidden my-auto p-6 sm:p-8">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 flex items-center justify-center shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#00D1FF]" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-emerald-400 mb-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>SSL 256-BIT CIFRADO SEGURO</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Acceso al Portal
              </h2>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-mono">
            Ingresa tus credenciales autorizadas. El sistema detectará automáticamente tu nivel de acceso y permisos asignados.
          </p>

          {/* Clean Anonymous Login Form */}
          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>Correo Electrónico o Usuario:</span>
              </label>
              <input
                type="text"
                value={inputIdentifier}
                onChange={(e) => {
                  setInputIdentifier(e.target.value);
                  if (authError) setAuthError(null);
                }}
                placeholder="ejemplo: tu-usuario@innocentia.tech"
                className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] focus:outline-none transition-all placeholder:text-gray-600"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>Contraseña de Seguridad:</span>
              </label>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  if (authError) setAuthError(null);
                }}
                placeholder="Escribe tu contraseña"
                className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] focus:outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-in shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(255,56,88,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? "Validando..." : "Autenticar y Entrar"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Security Notice */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span>Innocentia Tech Security Core</span>
            <span>Zero-Knowledge Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
}
