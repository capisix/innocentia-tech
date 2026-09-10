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
} from "../../lib/icons";

export type RoleType = "ceo" | "socio" | "usuario" | "dev" | "asesor";

export interface RolePreset {
  role: RoleType;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  defaultUser: {
    id: string;
    name: string;
    email: string;
    roleTitle: string;
    company?: string;
  };
  icon: any;
  features: string[];
}

export const ROLE_PRESETS: RolePreset[] = [
  {
    role: "ceo",
    title: "CEO / Director General",
    badge: "Super Admin",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    description: "Control maestro: Designación de técnicos a proyectos, métricas globales, aprobaciones y finanzas ejecutivas.",
    defaultUser: {
      id: "usr_ceo_01",
      name: "Capisix (CEO)",
      email: "ceo@innocentia.tech",
      roleTitle: "Chief Executive Officer y Fundador",
      company: "Innocentia Tech Core",
    },
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
    defaultUser: {
      id: "usr_partner_01",
      name: "Socio Director",
      email: "socio@innocentia.tech",
      roleTitle: "Socio Co-Fundador y Operaciones",
      company: "Innocentia Tech",
    },
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
    defaultUser: {
      id: "usr_client_01",
      name: "Dra. Mariana Valdés",
      email: "mariana@clinicamedica.ai",
      roleTitle: "Cliente Titular",
      company: "Clínica Médica AI",
    },
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
    defaultUser: {
      id: "usr_dev_01",
      name: "Ing. Rodrigo Pacheco",
      email: "rodrigo.dev@innocentia.tech",
      roleTitle: "Senior Fullstack y AI Engineer",
      company: "Innocentia Tech Core",
    },
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
    defaultUser: {
      id: "usr_sales_01",
      name: "Carlos Mendoza",
      email: "carlos.mendoza@innocentia.tech",
      roleTitle: "Asesor Comercial Certificado",
      company: "Innocentia Tech Sales",
    },
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
  onSelectRole?: (role: RoleType) => void;
}

export default function AuthLoginModal({ isOpen, onClose, onSelectRole }: AuthLoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<RoleType>("ceo");

  if (!isOpen) return null;

  const activePreset = ROLE_PRESETS.find((p) => p.role === selectedRole) || ROLE_PRESETS[0];

  const handleLogin = (roleToLogin: RoleType = selectedRole) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("innocentia_active_role", roleToLogin);
    }
    if (onSelectRole) {
      onSelectRole(roleToLogin);
    } else {
      window.location.href = `/portal?role=${roleToLogin}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 text-left">
      <div className="relative w-full max-w-4xl bg-[#07070E] border border-white/20 rounded-[32px] shadow-[0_0_90px_rgba(0,209,255,0.2)] overflow-hidden my-auto flex flex-col md:flex-row">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF3858]/20 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Left Column: Role Selector Tabs */}
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
                  Acceso al Portal
                </h3>
                <p className="text-[11px] font-mono text-gray-400">
                  Selecciona tu nivel para ingresar
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
                    onClick={() => setSelectedRole(preset.role)}
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
                        {preset.defaultUser.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>Seguridad SSL 256-bit</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Right Column: Selected Role Details & Login Action */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-gray-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00D1FF] animate-pulse" />
              <span>PERFIL SELECCIONADO</span>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              {activePreset.title}
            </h2>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              {activePreset.description}
            </p>

            {/* Features Included for this role */}
            <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
                Funcionalidades disponibles para este nivel:
              </span>
              <div className="space-y-2">
                {activePreset.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00D1FF] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo User Credential Display */}
            <div className="mt-5 p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block">Usuario simulado:</span>
                <span className="text-xs font-bold text-white">{activePreset.defaultUser.name}</span>
                <span className="text-[11px] font-mono text-gray-400 block">{activePreset.defaultUser.email}</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Sesión Lista
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => handleLogin(selectedRole)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#33DDFF] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(255,56,88,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <span>Ingresar como {activePreset.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-gray-400 font-mono">
              Puedes alternar entre cualquiera de los 5 niveles en cualquier momento dentro del portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
