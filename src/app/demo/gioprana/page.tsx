"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Globe,
  Smartphone,
  Layers,
  CheckCircle2,
  ExternalLink,
  Share2,
  Check,
  Calendar,
  CreditCard,
  Users,
  Play,
  Heart,
  Zap,
  ShieldCheck,
} from "../../../lib/icons";

type ViewMode = "integracion" | "web_live" | "webapp_simulator";
type AppRole = "alumna" | "coach";
type AppModuleId = "dashboard" | "live" | "reservas" | "pagos" | "pilares";

export default function GiopranaDualDemoPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("integracion");
  const [activeRole, setActiveRole] = useState<AppRole>("alumna");
  const [activeModule, setActiveModule] = useState<AppModuleId>("dashboard");
  const [selectedClientIdx, setSelectedClientIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeBridgeIdx, setActiveBridgeIdx] = useState(0);

  const liveUrl = "https://gleeful-quokka-88fea3.netlify.app/";

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const trackedClients = [
    {
      name: "Valeria R.",
      email: "valeria@gioprana.com",
      plan: "Membresía Integral (Estudio + WebApp)",
      status: "Práctica Constante",
      paymentStatus: "Al corriente · $1,850 MXN",
      sessions: 14,
      videos: 4,
      minutes: 580,
      goal: "Desarrollar fuerza funcional en tren superior y sostener energía estable durante la semana.",
      careNotes: "Cuidar hiperextensión de codos en planchas; responde excelente a bloques de kettlebell.",
      pillars: [
        { name: "01 · Movimiento", pct: 88, color: "#D5B77B" },
        { name: "02 · Nutrición", pct: 80, color: "#8EA77A" },
        { name: "03 · Meditación", pct: 72, color: "#9C75AF" },
        { name: "04 · Música", pct: 90, color: "#D5B77B" },
        { name: "05 · Comunidad", pct: 85, color: "#284E40" },
      ],
      notes: [
        {
          author: "Giovanna (Coach)",
          date: "6 Nov 2026",
          pillar: "01 · Movimiento & Fuerza",
          text: "Excelente control escapular hoy en remo y press. Subimos a 12 kg en peso muerto rumano manteniendo respiración fluida.",
        },
        {
          author: "Valeria R. (Alumna)",
          date: "4 Nov 2026",
          pillar: "03 · Meditación & Descanso",
          text: "Realicé el video de Movilidad de Cadera y 10 min de respiración 4·4·6 en la WebApp. Dormí mucho más profundo.",
        },
      ],
    },
    {
      name: "Mariana L.",
      email: "mariana@gioprana.com",
      plan: "Programa 'Volver a Empezar' (8 Semanas)",
      status: "Volviendo a Empezar",
      paymentStatus: "Al corriente · $3,900 MXN",
      sessions: 8,
      videos: 6,
      minutes: 340,
      goal: "Retomar el movimiento después de pausa prolongada, priorizando movilidad lumbar y vitalidad.",
      careNotes: "Evitar impacto alto; priorizar cadencia controlada y exhalación 4·4·6 al cierre.",
      pillars: [
        { name: "01 · Movimiento", pct: 74, color: "#D5B77B" },
        { name: "02 · Nutrición", pct: 82, color: "#8EA77A" },
        { name: "03 · Meditación", pct: 91, color: "#9C75AF" },
        { name: "04 · Música", pct: 78, color: "#D5B77B" },
        { name: "05 · Comunidad", pct: 88, color: "#284E40" },
      ],
      notes: [
        {
          author: "Giovanna (Coach)",
          date: "5 Nov 2026",
          pillar: "Seguimiento Integral",
          text: "Semana 4 completada sin molestia en espalda baja. Lista para incorporar mancuernas de 6 kg la próxima sesión.",
        },
      ],
    },
    {
      name: "Claudia R.",
      email: "claudia@gioprana.com",
      plan: "Membresía Digital · En Vivos & Videoteca",
      status: "Práctica Online Activa",
      paymentStatus: "Al corriente · $980 MXN",
      sessions: 19,
      videos: 11,
      minutes: 790,
      goal: "Entrenar desde casa a las 7:30 am manteniendo postura y fuerza de centro.",
      careNotes: "Excelente ritmo en sesiones en vivo; liberar tensión cervical en calentamientos.",
      pillars: [
        { name: "01 · Movimiento", pct: 92, color: "#D5B77B" },
        { name: "02 · Nutrición", pct: 85, color: "#8EA77A" },
        { name: "03 · Meditación", pct: 80, color: "#9C75AF" },
        { name: "04 · Música", pct: 86, color: "#D5B77B" },
        { name: "05 · Comunidad", pct: 79, color: "#284E40" },
      ],
      notes: [
        {
          author: "Claudia R. (Alumna)",
          date: "Ayer",
          pillar: "01 · Movimiento",
          text: "Desde que cuido mi respiración en las series de fuerza en vivo con Giovanna terminé sin tensión en cuello.",
        },
      ],
    },
  ];

  const activeClient = trackedClients[selectedClientIdx];

  const integrationEvents = [
    {
      id: "bridge_reserva",
      webAction: "Visitante da clic en 'Reserva tu Espacio' en la Web Pública",
      webSection: "Hero Principal / Experiencias / Calendario",
      appTarget: "reservas" as AppModuleId,
      appReaction:
        "La WebApp abre automáticamente el Módulo 03 · Reservas de Clases con la modalidad elegida (Estudio Presencial o Streaming Online) y vincula la cita al expediente de la alumna.",
      badge: "SINCRONIZACIÓN DE AGENDA",
    },
    {
      id: "bridge_programa",
      webAction: "Usuaria selecciona 'Membresía Integral ($1,850 MXN)' o 'Volver a Empezar ($3,900 MXN)' en la Web",
      webSection: "Sección de Programas & Eventos",
      appTarget: "pagos" as AppModuleId,
      appReaction:
        "La WebApp pre-selecciona el programa en el Módulo 04 · Pasarela de Pagos (Tarjeta, SPEI o Estudio), genera el recibo foliado (ej. GP-2026-0841) y activa su membresía.",
      badge: "CHECKOUT & ACTIVACIÓN",
    },
    {
      id: "bridge_live",
      webAction: "Alumna ingresa a 'Sala En Vivo / Videoteca' y marca una sesión como completada",
      webSection: "Acceso a Plataforma GIOPRANA",
      appTarget: "dashboard" as AppModuleId,
      appReaction:
        "Se suman automáticamente los minutos entrenados, el video completado y la evolución por pilar en el Expediente Individual que supervisa Giovanna (Modo Coach).",
      badge: "TELEMETRÍA DE PROGRESO",
    },
  ];

  const equipmentShowcase = [
    {
      title: "Escultura Mural 3D Oro & Esmalte",
      category: "Identidad en Estudio",
      spec: "Acabado Metálico #D5B77B",
      image: "/images/branding/gioprana_logo_3d_estudio.png",
    },
    {
      title: "Botella Térmica GIOPRANA Bosque",
      category: "Hidratación · Verde Bosque",
      spec: "$680 MXN · Acero 750 ml",
      image: "/images/branding/gioprana_botella_bosque.png",
    },
    {
      title: "Camiseta Técnica Entrenamiento Consciente",
      category: "Ropa Deportiva · Carbón",
      spec: "$790 MXN · Tejido Respirable",
      image: "/images/branding/gioprana_camiseta_carbon.png",
    },
    {
      title: "Tapete de Práctica Verde Bosque Grabado",
      category: "Equipamiento · Estudio",
      spec: "$1,450 MXN · Caucho 5 mm",
      image: "/images/branding/gioprana_tapete_bosque.png",
    },
    {
      title: "Top & Prenda Técnica Edición Loto",
      category: "Ropa Técnica · Violeta Raíz",
      spec: "$890 MXN · Soporte Medio-Alto",
      image: "/images/branding/gioprana_top_loto.png",
    },
    {
      title: "Bolsa Deportiva Carbón & Violeta",
      category: "Transporte · Estudio & Día",
      spec: "$1,650 MXN · Lona Impermeable",
      image: "/images/branding/gioprana_bolsa_deportiva.png",
    },
    {
      title: "Toalla de Práctica Algodón Orgánico",
      category: "Textiles · Violeta Raíz",
      spec: "$520 MXN · #594362 & Marfil",
      image: "/images/branding/gioprana_toalla_violeta.png",
    },
    {
      title: "Tarjeta Editorial Marfil & Oro",
      category: "Papelería & Membresías VIP",
      spec: "Papel Algodón #F4F0E7",
      image: "/images/branding/gioprana_app_9.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080A0C] text-[#F4F0E7] font-sans selection:bg-[#D5B77B]/30 selection:text-white">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0D1013]/95 backdrop-blur-2xl border-b border-[#D5B77B]/25 px-4 sm:px-8 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Back to Innocentia + Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/proyectos/gioprana"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D5B77B]" />
              <span>Caso de Estudio</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <img
                src="/images/branding/gioprana_simbolo.svg"
                alt="GIOPRANA"
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-[0.18em] text-sm sm:text-base text-[#D5B77B]">
                    GIOPRANA
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#284E40]/40 border border-[#D5B77B]/40 text-[9px] font-mono text-[#D5B77B] uppercase font-bold">
                    WEB + WEBAPP INTEGRADA
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 block">
                  The Art of Being Alive · Fundadora: Giovanna Monterrubio
                </span>
              </div>
            </div>
          </div>

          {/* Center: 3-Mode Switcher (Web + WebApp Architecture Showcase) */}
          <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-[#D5B77B]/30 text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode("integracion")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "integracion"
                  ? "bg-gradient-to-r from-[#D5B77B] to-[#b7883c] text-[#111416] shadow-[0_0_20px_rgba(213,183,123,0.4)]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Arquitectura Web + WebApp</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("webapp_simulator")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "webapp_simulator"
                  ? "bg-[#594362] text-white border border-[#D5B77B]/50 shadow-[0_0_20px_rgba(156,117,175,0.4)]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#D5B77B]" />
              <span>2. Simulador WebApp (Alumna/Coach)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("web_live")}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "web_live"
                  ? "bg-[#284E40] text-white border border-[#D5B77B]/50 shadow-[0_0_20px_rgba(40,78,64,0.5)]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#D5B77B]" />
              <span>3. Interactuar en Vivo (Full)</span>
            </button>
          </div>

          {/* Right: External Launch & Copy */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-[#D5B77B]" />
              )}
              <span className="hidden sm:inline">{copied ? "¡Copiado!" : "Copiar Link"}</span>
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#D5B77B] hover:bg-[#e3c891] text-[#111416] font-mono font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
            >
              <span>Abrir Sitio Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          VIEW MODE 1: ARQUITECTURA DUAL (WEB PÚBLICA + WEBAPP PRIVADA QUE SE INTEGRAN)
         ===================================================================== */}
      {viewMode === "integracion" && (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-14">
          {/* Hero Explanation Banner */}
          <section className="relative rounded-[32px] bg-gradient-to-br from-[#16121c] via-[#111416] to-[#13221c] border border-[#D5B77B]/35 p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#594362]/25 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#284E40]/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5B77B]/15 border border-[#D5B77B]/40 text-xs font-mono text-[#D5B77B] font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EJEMPLO DE ARQUITECTURA DUAL • WEB + WEBAPP SEPARADAS QUE SE INTEGRAN</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                  GIOPRANA:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5B77B] via-[#F4F0E7] to-[#8EA77A]">
                    Página Web Editorial + WebApp Privada de Práctica
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                  Este proyecto demuestra cómo Innocentia Tech diseña <strong>dos ecosistemas separados pero unidos por el mismo núcleo</strong>: por un lado, una <strong>Página Web Informativa Pública</strong> de alto impacto visual para contar la historia de la marca, mostrar los 5 pilares, publicar artículos en el blog y presentar programas; y por otro lado, una <strong>WebApp Privada independiente</strong> a la que ingresan las alumnas y la coach Giovanna Monterrubio para transmitir clases en vivo, ver repeticiones en la videoteca, reservar horarios, procesar pagos y llevar el expediente individual de seguimiento.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("webapp_simulator")}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D5B77B] to-[#b7883c] text-[#111416] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(213,183,123,0.4)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Probar Simulador de la WebApp Privada →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("web_live")}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#D5B77B]/40 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-[#D5B77B]" />
                    <span>Navegar Sitio + WebApp en Vivo</span>
                  </button>
                </div>
              </div>

              {/* Right Visual Card: 3D Studio Sign + Portrait */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="col-span-2 relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#D5B77B]/40 shadow-2xl">
                  <Image
                    src="/images/apps/gioprana_webapp_live.png"
                    alt="GIOPRANA — The Art of Being Alive"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/80 border border-[#D5B77B]/50 text-[#D5B77B]">
                      IDENTIDAD OFICIAL & ECOSISTEMA DIGITAL
                    </span>
                    <span className="text-[10px] font-mono text-gray-200 bg-black/70 px-2 py-0.5 rounded-md">
                      5 Pilares
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-left space-y-1">
                  <span className="text-[10px] font-mono text-[#D5B77B] uppercase font-bold block">
                    PARTE 1 · FRONT-STAGE
                  </span>
                  <strong className="text-xs sm:text-sm text-white block">
                    Sitio Web Editorial Público
                  </strong>
                  <span className="text-[11px] text-gray-400 block">
                    Esencia, Símbolo SVG, 5 Pilares, Programas, Eventos, Blog y Tienda.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-left space-y-1">
                  <span className="text-[10px] font-mono text-[#9C75AF] uppercase font-bold block">
                    PARTE 2 · BACK-STAGE
                  </span>
                  <strong className="text-xs sm:text-sm text-white block">
                    WebApp Privada (Alumna / Coach)
                  </strong>
                  <span className="text-[11px] text-gray-400 block">
                    Expedientes, Clases En Vivo, Videoteca, Reservas, Pagos y Respiración.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SIDE-BY-SIDE DUAL ARCHITECTURE: WEB PÚBLICA vs WEBAPP PRIVADA */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div className="text-left space-y-1">
                <span className="text-xs font-mono text-[#D5B77B] uppercase tracking-widest font-bold block">
                  SEPARACIÓN E INTEGRACIÓN DE ENTORNOS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  ¿Cómo se dividen y cómo se conectan la Web y la WebApp?
                </h2>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Haz clic en cualquier puente de integración para simular el flujo
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT COLUMN: SITIO WEB INFORMATIVO PÚBLICO */}
              <div className="lg:col-span-5 rounded-[28px] bg-gradient-to-b from-[#1a1815] to-[#0d0f11] border border-[#D5B77B]/40 p-6 flex flex-col justify-between space-y-5 shadow-xl text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#D5B77B]/20 border border-[#D5B77B]/50 text-[#D5B77B] text-[10px] font-mono font-bold uppercase">
                      🌐 1. PÁGINA WEB PÚBLICA (#publicSiteView)
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">Acceso Abierto SEO</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Sitio Editorial, Storytelling & Captación Comercial
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      Diseñado con 4 atmósferas editoriales (Carbón, Marfil #F4F0E7, Oscuro Intermedio y Amanecer) para presentar la filosofía de Giovanna Monterrubio y convertir visitantes en alumnas.
                    </p>
                  </div>

                  {/* Preview Image of Web Kit */}
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15">
                    <Image
                      src="/images/apps/app_gioprana.jpg"
                      alt="Sitio Web Editorial GIOPRANA"
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Web Modules List */}
                  <div className="space-y-2 pt-1">
                    {[
                      "Hero 'Fuerza con Consciencia' con retrato y halo dorado.",
                      "Sección Marfil 'Volver a Empezar' + Explorador Interactivo del Símbolo en SVG (6 partes clicables).",
                      "Bento de Los 5 Pilares (Movimiento, Nutrición, Meditación, Música y Comunidad).",
                      "Experiencias, Programas Híbridos ($1,850 / $3,900 / $980 MXN) y Calendario de Eventos.",
                      "Blog Editorial con filtro por pilar y comentarios interactivos en tiempo real.",
                      "Catálogo de Equipamiento Oficial y Kit Visual de Marca desplegable.",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2 text-xs text-gray-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#D5B77B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode("web_live")}
                    className="w-full py-3 rounded-xl bg-[#D5B77B]/20 hover:bg-[#D5B77B] text-[#D5B77B] hover:text-[#111416] border border-[#D5B77B]/50 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Ver Página Web Pública en Vivo →
                  </button>
                </div>
              </div>

              {/* CENTER COLUMN: PUENTES DE INTEGRACIÓN EN TIEMPO REAL */}
              <div className="lg:col-span-2 flex flex-col justify-center space-y-3">
                <div className="text-center py-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    🔗 PUENTES WEB ↔ APP
                  </span>
                </div>

                {integrationEvents.map((ev, idx) => {
                  const isSelected = activeBridgeIdx === idx;
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => {
                        setActiveBridgeIdx(idx);
                        setActiveModule(ev.appTarget);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                        isSelected
                          ? "bg-gradient-to-b from-[#D5B77B]/25 to-[#284E40]/30 border-[#D5B77B] shadow-[0_0_25px_rgba(213,183,123,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold text-[#D5B77B] uppercase block">
                        {ev.badge}
                      </span>
                      <p className="text-[11px] font-bold text-white leading-snug">
                        {ev.webAction}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 pt-1">
                        <span>Conecta con WebApp</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT COLUMN: WEBAPP PRIVADA (#webAppView) */}
              <div className="lg:col-span-5 rounded-[28px] bg-gradient-to-b from-[#17121e] to-[#0d1211] border border-[#9C75AF]/50 p-6 flex flex-col justify-between space-y-5 shadow-xl text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#9C75AF]/20 border border-[#9C75AF]/50 text-[#d8b4fe] text-[10px] font-mono font-bold uppercase">
                      📱 2. WEBAPP PRIVADA (#webAppView)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      ● Doble Rol: Alumna & Coach
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Plataforma Privada de Seguimiento, Clases En Vivo, Videoteca & Pagos
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      Al iniciar sesión o reservar desde la Web, se abre la WebApp privada con barra lateral, estadísticas en vivo y cambio instantáneo entre la vista de Alumna y la vista de Coach Giovanna.
                    </p>
                  </div>

                  {/* Active Bridge Highlight Box */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                      ⚡ RESPUESTA AUTOMÁTICA EN LA WEBAPP:
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {integrationEvents[activeBridgeIdx].appReaction}
                    </p>
                  </div>

                  {/* 5 WebApp Modules */}
                  <div className="space-y-2">
                    {[
                      {
                        id: "dashboard",
                        num: "01",
                        title: "Seguimiento & Expediente por Alumna",
                        desc: "Selector de clientas para Giovanna, progreso en los 5 pilares, notas de cuidado articular y bitácora.",
                      },
                      {
                        id: "live",
                        num: "02",
                        title: "Sala En Vivo (Streaming) & Videoteca On-Demand",
                        desc: "Reproductor en vivo con soporte de cámara web, chat en tiempo real y archivo de clases anteriores.",
                      },
                      {
                        id: "reservas",
                        num: "03",
                        title: "Reservas de Clases (Estudio & Online)",
                        desc: "Agenda semanal por día y modalidad con confirmación instantánea en el expediente.",
                      },
                      {
                        id: "pagos",
                        num: "04",
                        title: "Pasarela de Pagos, Membresías & Recibos",
                        desc: "Cobro con Tarjeta, Transferencia SPEI o Recepción en Estudio con historial foliado.",
                      },
                      {
                        id: "pilares",
                        num: "05",
                        title: "Práctica Interactiva de los 5 Pilares",
                        desc: "Esfera animada de respiración (4·4·6), audio generativo 432 Hz, checklist de hábitos y mural comunitario.",
                      },
                    ].map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setActiveModule(m.id as AppModuleId);
                          setViewMode("webapp_simulator");
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#D5B77B]/50 flex items-start justify-between gap-2 text-xs cursor-pointer transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#D5B77B]/20 text-[#D5B77B] font-mono font-bold text-[10px]">
                            {m.num}
                          </span>
                          <div>
                            <strong className="text-white block">{m.title}</strong>
                            <span className="text-[11px] text-gray-400">{m.desc}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D5B77B] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewMode("webapp_simulator")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#594362] to-[#284E40] hover:from-[#6d5278] hover:to-[#346352] text-white border border-[#D5B77B]/50 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    Abrir Simulador de la WebApp Privada →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* BRANDING, EQUIPAMIENTO & KIT VISUAL COMPLETO EXTRAÍDO DE LA PÁGINA */}
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="text-left space-y-1">
                <span className="text-xs font-mono text-[#D5B77B] uppercase tracking-widest font-bold block">
                  UNIVERSO DE MARCA, EQUIPAMIENTO & SISTEMA DE DISEÑO
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Identidad Visual, Equipamiento Oficial & Kit UI de GIOPRANA
                </h2>
              </div>
              <Link
                href="/branding"
                className="text-xs font-mono text-[#D5B77B] hover:underline flex items-center gap-1.5"
              >
                <span>Ver también en el Estudio de Branding de Sofía</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {equipmentShowcase.map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-[#111416] border border-[#D5B77B]/25 hover:border-[#D5B77B]/70 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
                >
                  <div className="relative h-48 w-full bg-black/80 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D5B77B]/40 text-[9px] font-mono font-bold text-[#D5B77B] uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-left space-y-1">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-xs font-mono text-[#D5B77B] block">{item.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          VIEW MODE 2: SIMULADOR INTERACTIVO DE LA WEBAPP PRIVADA (ALUMNA & COACH)
         ===================================================================== */}
      {viewMode === "webapp_simulator" && (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Top Role & Context Bar */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-[#16121d] via-[#111416] to-[#12201b] border border-[#D5B77B]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D5B77B]/20 text-[#D5B77B] text-[10px] font-mono font-bold uppercase">
                  VISTA 2 · WEBAPP PRIVADA (#webAppView)
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  ● Sincronizada con la Página Web Pública
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Plataforma Privada GIOPRANA — Cambia entre Rol Alumna y Rol Coach Giovanna
              </h2>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/15">
              <button
                type="button"
                onClick={() => setActiveRole("alumna")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeRole === "alumna"
                    ? "bg-[#D5B77B] text-[#111416] shadow-md"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                👩🏻 Vista Alumna (Valeria R.)
              </button>
              <button
                type="button"
                onClick={() => setActiveRole("coach")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeRole === "coach"
                    ? "bg-[#594362] text-white border border-[#D5B77B]/50 shadow-md"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                🧘🏻‍♀️ Vista Coach (Giovanna Monterrubio)
              </button>
            </div>
          </div>

          {/* WebApp Shell Layout: Sidebar + Main Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* WebApp Sidebar */}
            <aside className="lg:col-span-3 rounded-[28px] bg-[#111416] border border-[#D5B77B]/30 p-5 space-y-5 text-left">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#D5B77B] uppercase block">
                  {activeRole === "coach" ? "MODO COACH / DIRECCIÓN" : "ALUMNA ACTIVA"}
                </span>
                <strong className="text-base font-black text-white block">
                  {activeRole === "coach" ? "Giovanna Monterrubio" : activeClient.name}
                </strong>
                <span className="text-xs text-gray-400 block">
                  {activeRole === "coach"
                    ? "5 Alumnas en Seguimiento Activo"
                    : activeClient.plan}
                </span>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "dashboard", num: "01", label: "Seguimiento & Expediente" },
                  { id: "live", num: "02", label: "En Vivo & Videos Anteriores", live: true },
                  { id: "reservas", num: "03", label: "Reservas de Clases" },
                  { id: "pagos", num: "04", label: "Pagos & Membresías" },
                  { id: "pilares", num: "05", label: "Práctica de los 5 Pilares" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModule(tab.id as AppModuleId)}
                    className={`w-full p-3 rounded-xl font-mono text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeModule === tab.id
                        ? "bg-gradient-to-r from-[#D5B77B]/25 to-[#284E40]/30 text-white border border-[#D5B77B]"
                        : "bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 border border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#D5B77B]">{tab.num}</span>
                      <span>{tab.label}</span>
                    </div>
                    {tab.live && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[9px]">
                        LIVE
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => setViewMode("integracion")}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  ← Volver a Vista Web + WebApp
                </button>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#D5B77B] text-[#111416] font-mono font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Abrir en Pantalla Completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </aside>

            {/* WebApp Main Content */}
            <div className="lg:col-span-9 rounded-[28px] bg-[#111416] border border-white/15 p-6 sm:p-8 space-y-6 text-left">
              {/* Coach Client Selector Bar */}
              <div className="p-4 rounded-2xl bg-[#181420] border border-[#9C75AF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D5B77B] uppercase block">
                    {activeRole === "coach"
                      ? "SELECTOR DE EXPEDIENTES DE CLIENTAS (MODO GIOVANNA)"
                      : "EXPEDIENTE PERSONAL SINCRONIZADO"}
                  </span>
                  <p className="text-xs text-gray-300">
                    Selecciona una alumna para inspeccionar su evolución en los 5 pilares, videos vistos, pagos y bitácora:
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {trackedClients.map((c, idx) => (
                    <button
                      key={c.email}
                      type="button"
                      onClick={() => setSelectedClientIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                        selectedClientIdx === idx
                          ? "bg-[#D5B77B] text-[#111416]"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick KPIs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Sesiones Asistidas
                  </span>
                  <strong className="text-2xl font-black text-[#D5B77B]">
                    {activeClient.sessions}
                  </strong>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Videos Completados
                  </span>
                  <strong className="text-2xl font-black text-white">
                    {activeClient.videos}
                  </strong>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Minutos Entrenados
                  </span>
                  <strong className="text-2xl font-black text-[#8EA77A]">
                    {activeClient.minutes} min
                  </strong>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Estado de Cuenta
                  </span>
                  <strong className="text-sm font-black text-emerald-400 block mt-1">
                    {activeClient.paymentStatus}
                  </strong>
                </div>
              </div>

              {/* Dynamic Module View */}
              {activeModule === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#D5B77B] uppercase font-bold">
                        EXPEDIENTE INDIVIDUAL · {activeClient.status}
                      </span>
                      <h3 className="text-lg font-black text-white mt-0.5">
                        Evolución de {activeClient.name} en los 5 Pilares
                      </h3>
                      <p className="text-xs text-gray-300 mt-1">{activeClient.goal}</p>
                      <p className="text-[11px] text-amber-300/90 mt-1 font-mono">
                        Nota de cuidado: {activeClient.careNotes}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {activeClient.pillars.map((p) => (
                        <div key={p.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-200">{p.name}</span>
                            <span className="text-[#D5B77B] font-bold">{p.pct}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-[10px] font-mono text-[#D5B77B] uppercase font-bold block">
                      BITÁCORA BIDIRECCIONAL (COACH GIOVANNA ↔ ALUMNA)
                    </span>
                    <div className="space-y-3">
                      {activeClient.notes.map((n, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#D5B77B]">
                            <strong>{n.author}</strong>
                            <span>{n.date}</span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400 block">
                            {n.pillar}
                          </span>
                          <p className="text-xs text-gray-200 leading-relaxed">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModule !== "dashboard" && (
                <div className="p-6 rounded-2xl bg-black/50 border border-[#D5B77B]/30 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#D5B77B] uppercase font-bold block">
                        MÓDULO INTERACTIVO EN VIVO
                      </span>
                      <h3 className="text-lg font-black text-white">
                        Explora este módulo directamente en el entorno interactivo de GIOPRANA
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("web_live")}
                      className="px-5 py-2.5 rounded-xl bg-[#D5B77B] text-[#111416] font-mono font-bold text-xs uppercase cursor-pointer"
                    >
                      Interactuar en Vivo con este Módulo →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          VIEW MODE 3: SITIO WEB + WEBAPP EN VIVO (IFRAME INTERACTIVO COMPLETO)
         ===================================================================== */}
      {viewMode === "web_live" && (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-4">
          <div className="p-4 rounded-2xl bg-[#111416] border border-[#D5B77B]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">
                ENTORNO EN VIVO: Haz clic en &ldquo;RESERVA / WEBAPP&rdquo; arriba a la derecha dentro de la página para pasar de la Web Pública a la WebApp Privada
              </span>
            </div>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D5B77B] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Abrir en pestaña nueva</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-[82vh] rounded-[28px] overflow-hidden border-2 border-[#D5B77B]/40 shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-[#111416]">
            <iframe
              src={liveUrl}
              title="GIOPRANA — Sitio Web Informativo & WebApp Privada"
              className="w-full h-full border-0"
              allow="camera; microphone; fullscreen"
            />
          </div>
        </main>
      )}
    </div>
  );
}
