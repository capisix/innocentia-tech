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
  const [selectedRole, setSelectedRole] = useState<RoleType>("ceo");
  const [selectedUserKey, setSelectedUserKey] = useState<string>("ivan_ceo");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const activePreset = ROLE_PRESETS.find((p) => p.role === selectedRole) || ROLE_PRESETS[0];
  const activeUser = USER_ACCOUNTS[selectedUserKey] || activePreset.defaultUser;

  const handleRoleTabClick = (role: RoleType) => {
    setSelectedRole(role);
    setAuthError(null);
    setInputPassword("");
    const preset = ROLE_PRESETS.find((p) => p.role === role);
    if (preset && preset.users.length > 0) {
      const foundKey = Object.keys(USER_ACCOUNTS).find((k) => USER_ACCOUNTS[k].id === preset.users[0].id);
      if (foundKey) setSelectedUserKey(foundKey);
    }
  };

  const handleSelectSpecificUser = (userKey: string) => {
    setSelectedUserKey(userKey);
    setAuthError(null);
    setInputPassword("");
    const user = USER_ACCOUNTS[userKey];
    if (user) {
      setSelectedRole(user.role);
    }
  };

  const handleAuthenticate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    // Strict Password Validation
    if (!inputPassword.trim()) {
      setAuthError("Por favor, ingresa tu contraseña de seguridad para acceder.");
      return;
    }

    if (inputPassword.trim() !== activeUser.password) {
      setAuthError("Contraseña incorrecta. Acceso restringido por seguridad.");
      return;
    }

    // Success: save authenticated state
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_active_role", activeUser.role);
      localStorage.setItem("innocentia_active_user", JSON.stringify(activeUser));
      localStorage.setItem("innocentia_auth_token", "AUTH_" + activeUser.id + "_" + Date.now());
      localStorage.setItem("innocentia_auth_user_id", activeUser.id);
    }

    if (onSelectRole) {
      onSelectRole(activeUser.role, activeUser);
    } else {
      window.location.href = `/portal?role=${activeUser.role}&userId=${activeUser.id}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 text-left">
      <div className="relative w-full max-w-4xl bg-[#07070E] border border-white/20 rounded-[32px] shadow-[0_0_90px_rgba(0,209,255,0.2)] overflow-hidden my-auto flex flex-col md:flex-row">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Left Column: Role & User Selector */}
        <div className="w-full md:w-5/12 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF3858] to-[#00D1FF] p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#00D1FF]" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  Acceso Seguro
                </h3>
                <p className="text-[11px] font-mono text-gray-400">
                  Autenticación de Usuarios
                </p>
              </div>
            </div>

            {/* Roles List */}
            <div className="space-y-2">
              {ROLE_PRESETS.map((preset) => {
                const IconComponent = preset.icon;
                const isSelected = selectedRole === preset.role;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handleRoleTabClick(preset.role)}
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? "bg-white/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)] scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-[#00D1FF]/20 text-[#00D1FF]" : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate block">
                          {preset.title}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${preset.badgeColor}`}
                        >
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">
                        {preset.users.map((u) => u.name).join(" • ")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>Encriptación SSL 256-bit</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Right Column: User Selection, Credentials & Strict Password Validation */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-gray-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00D1FF] animate-pulse" />
              <span>NIVEL REQUERIDO: {activePreset.badge.toUpperCase()}</span>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              {activePreset.title}
            </h2>

            {/* If there are multiple users (Socios: Daniel Torre & Jorge Pérez), show selector buttons */}
            {activePreset.users.length > 1 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/40">
                <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block font-bold mb-2">
                  Selecciona la cuenta de Socio a autenticar:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activePreset.users.map((u) => {
                    const uKey = Object.keys(USER_ACCOUNTS).find((k) => USER_ACCOUNTS[k].id === u.id) || "";
                    const isSelected = activeUser.id === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleSelectSpecificUser(uKey)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-purple-600/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-white"
                            : "bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-purple-500/30 text-purple-200 text-xs font-mono flex items-center justify-center font-bold">
                            {u.avatarLetter}
                          </span>
                          <div className="truncate">
                            <span className="text-xs font-bold block truncate">{u.name}</span>
                            <span className="text-[9px] font-mono opacity-70 block truncate">{u.roleTitle}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* User Profile Card */}
            <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    Cuenta Seleccionada:
                  </span>
                  <span className="text-base font-black text-white">{activeUser.name}</span>
                  <span className="text-xs font-mono text-gray-300 block">{activeUser.email}</span>
                  <span className="text-[10px] font-mono text-[#00D1FF] block mt-0.5">{activeUser.roleTitle}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Requiere Clave</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Mandatory Password Form */}
            <form onSubmit={handleAuthenticate} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Contraseña de Seguridad Requerida:</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={inputPassword}
                    onChange={(e) => {
                      setInputPassword(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Escribe tu contraseña de acceso"
                    className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-xl text-white text-sm font-mono focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] focus:outline-none transition-all placeholder:text-gray-600"
                    autoFocus
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-in shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}
            </form>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => handleAuthenticate()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(255,56,88,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Validar Contraseña y Entrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-gray-400 font-mono">
              El acceso a balances financieros, proyectos ejecutivos y asignación de técnicos está estrictamente protegido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
