"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail, ShieldCheck, Sparkles, MapPin } from "../../lib/icons";

export default function Footer() {
  const contactChannels = [
    {
      id: "contacto",
      type: "email",
      badge: "GENERAL & ALIANZAS",
      badgeColor: "bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30",
      dotColor: "bg-[#00D1FF]",
      title: "contacto@innocentia.tech",
      href: "mailto:contacto@innocentia.tech",
      description: "Consultas institucionales, prensa, alianzas comerciales y conferencias.",
      actionText: "Escribir correo",
    },
    {
      id: "ventas",
      type: "email",
      badge: "NUEVOS PROYECTOS & COTIZACIÓN",
      badgeColor: "bg-[#FF3858]/10 text-[#FF3858] border-[#FF3858]/30",
      dotColor: "bg-[#FF3858]",
      title: "ventas@innocentia.tech",
      href: "mailto:ventas@innocentia.tech",
      description: "Cotización de software, presupuesto formal de apps, SaaS y prototipos a la medida.",
      actionText: "Cotizar proyecto",
    },
    {
      id: "soporte",
      type: "email",
      badge: "SOPORTE TÉCNICO & CLOUD",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      dotColor: "bg-emerald-400",
      title: "soporte@innocentia.tech",
      href: "mailto:soporte@innocentia.tech",
      description: "Mantenimiento de servidores, monitoreo de infraestructura y atención post-entrega.",
      actionText: "Soporte técnico",
    },
    {
      id: "whatsapp",
      type: "whatsapp",
      badge: "ATENCIÓN INMEDIATA 24/7",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
      dotColor: "bg-emerald-400",
      title: "+52 960 177 1556",
      href: "https://wa.me/529601771556",
      description: "Atención directa con dirección de proyectos, respuestas inmediatas y citas rápidas.",
      actionText: "Abrir WhatsApp",
      isLive: true,
    },
  ];

  return (
    <footer className="relative bg-[#020204] py-16 border-t border-white/10 text-gray-400 text-xs overflow-hidden">
      {/* Subtle ambient gradient backdrops */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF3858]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10 text-left">
        {/* Top Header: Logo & Mission Statement */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_official_header.png?v=2"
                alt="INNOCENTIA TECH"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)]"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Ingeniería de software de alto impacto, arquitectura serverless en la nube y diseño sensorial táctil a 60 FPS.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-[11px] font-mono text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CANALES DE ATENCIÓN DIRECTA Y OFICIAL</span>
          </div>
        </div>

        {/* Canales de Contacto con Descripción de Uso Específico (Punto solicitado por usuario) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 font-bold">
              DIRECTORIO DE COMUNICACIÓN & CONTACTO:
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              Selecciona el canal según el objetivo de tu solicitud
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {contactChannels.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target={c.type === "whatsapp" ? "_blank" : undefined}
                rel={c.type === "whatsapp" ? "noopener noreferrer" : undefined}
                className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden backdrop-blur-xl ${
                  c.isLive
                    ? "bg-gradient-to-b from-emerald-950/30 to-black/80 border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1"
                    : "bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/25 hover:-translate-y-1 shadow-lg"
                }`}
              >
                {/* Top Badge & Live Indicator */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${c.badgeColor}`}
                    >
                      {c.badge}
                    </span>

                    {c.isLive ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${c.dotColor}`} />
                    )}
                  </div>

                  {/* Main Contact Title / Address */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block mb-0.5">
                      {c.type === "whatsapp" ? "WhatsApp Oficial:" : "Correo Corporativo:"}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00D1FF] transition-colors break-all leading-snug">
                      {c.title}
                    </span>
                  </div>

                  {/* Specific Use Description Requested by User */}
                  <p className="text-[11px] text-gray-300 font-light leading-relaxed border-t border-white/10 pt-2.5">
                    {c.description}
                  </p>
                </div>

                {/* Bottom Action CTA Row */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono font-bold text-gray-400 group-hover:text-white transition-colors border-t border-white/5">
                  <span>{c.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Structured Site Directory & Local SEO Links */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left text-xs font-mono">
          {/* Col 1: Proyectos */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
              <span>Casos de Estudio</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/proyectos/experience-safely" className="hover:text-emerald-400 text-emerald-300 font-bold transition-colors">
                  ★ Experience Safely • Motor de Reservas
                </Link>
              </li>
              <li>
                <Link href="/proyectos/ikal-chukum" className="hover:text-amber-400 text-amber-300 font-bold transition-colors">
                  ✓ Ikal Chukum • Automatización & Bodega
                </Link>
              </li>
              <li>
                <Link href="/proyectos/axana" className="hover:text-white transition-colors">
                  Axana • Tienda Digital & Catálogo
                </Link>
              </li>
              <li>
                <Link href="/proyectos/multisistema" className="hover:text-white transition-colors">
                  Multisistema • Gestión Empresarial
                </Link>
              </li>
              <li>
                <Link href="/proyectos/help-2-win" className="hover:text-white transition-colors">
                  Help 2 Win • App Móvil & Comunidad
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/proyectos" className="text-[#00D1FF] hover:underline font-bold">
                  Ver todos los proyectos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Blog & Guías de Precios */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3858]" />
              <span>Guías & Precios 2026</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog/cuanto-cuesta-desarrollar-una-app-mexico" className="hover:text-white transition-colors">
                  ¿Cuánto cuesta una app en México?
                </Link>
              </li>
              <li>
                <Link href="/blog/agencia-desarrollo-software-ia-merida-yucatan" className="hover:text-white transition-colors">
                  Software e IA en Mérida, Yucatán
                </Link>
              </li>
              <li>
                <Link href="/blog/desarrollo-web-nextjs-empresas-saas" className="hover:text-white transition-colors">
                  Next.js 15 para Empresas y SaaS
                </Link>
              </li>
              <li>
                <Link href="/blog/cotizador-en-tiempo-real-automatizacion-ventas" className="hover:text-white transition-colors">
                  Automatizar Cotizaciones (+38% Ventas)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/blog" className="text-[#FF3858] hover:underline font-bold">
                  Ver blog completo →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Capacidades & Empresa */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Soluciones & Acceso</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/branding" className="hover:text-[#FF3858] text-rose-300 font-bold transition-colors flex items-center gap-1.5">
                  <span>🎨 Estudio de Branding (Sofía)</span>
                </Link>
              </li>
              <li>
                <Link href="/marketing" className="hover:text-[#00D1FF] text-cyan-300 font-bold transition-colors flex items-center gap-1.5">
                  <span>📈 Campañas & Segmentación</span>
                </Link>
              </li>
              <li>
                <Link href="/crear-proyecto" className="hover:text-white transition-colors">
                  Cotizador Oficial de Proyectos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Preguntas Frecuentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-white transition-colors">
                  Capacidades & Red Neuronal
                </Link>
              </li>
              <li>
                <Link href="/#playground" className="hover:text-white transition-colors">
                  Laboratorio Interactivo Sofía & Iván
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: SEO Local & Sede */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Sede & Cobertura</span>
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-[11px] text-gray-300">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Mérida, Yucatán, México</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Desarrollo de software de alta gama para México, Riviera Maya, Estados Unidos y Latinoamérica.
              </p>
              <div className="pt-1 text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Atención Presencial & Remota 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Legal, CEO Mail & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 font-mono text-[11px] pt-8 border-t border-white/10">
          <div>
            <span>© {new Date().getFullYear()} Innocentia Tech Core. Todos los derechos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:ceo.ivan@innocentia.tech"
              className="hover:text-amber-300 text-gray-400 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Dirección General: ceo.ivan@innocentia.tech</span>
            </a>
            <span>•</span>
            <a href="#privacy" className="hover:text-gray-300 transition-colors">
              Privacidad
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-gray-300 transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
