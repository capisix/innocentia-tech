"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Target,
  Users,
  Layers,
  Globe,
  DollarSign,
  CheckCircle2,
  Share2,
  Check,
  ShieldCheck,
  Smartphone,
  MessageSquare,
  BarChart2,
  Zap,
  Play,
  X,
  Cpu,
} from "../../lib/icons";

interface CampaignPlan {
  id: string;
  name: string;
  badge: string;
  feeMonthly: string;
  recommendedAdSpend: string;
  description: string;
  popular?: boolean;
  channels: string[];
  features: string[];
}

const CAMPAIGN_PLANS: CampaignPlan[] = [
  {
    id: "plan_starter",
    name: "Growth Starter",
    badge: "Captación Local & Leads Rápidos",
    feeMonthly: "$6,500 MXN / mes",
    recommendedAdSpend: "Inversión en pauta sugerida: $8,000 a $15,000 MXN",
    description: "Configuración y optimización continua de campañas en Google Search y Meta Ads para captar llamadas y mensajes directos de clientes potenciales.",
    channels: ["Google Search", "Meta Ads (Instagram & FB)", "WhatsApp Directo"],
    features: [
      "Diseño de anuncios de alto impacto por Sofía y estrategia técnica de Iván (3 variantes al mes)",
      "Segmentación geográfica precisa por códigos postales y ciudades clave",
      "Configuración de conversiones en Google Tag Manager y Pixel de Meta",
      "Optimización semanal de costo por clic (CPC) y palabras clave negativas",
      "Reporte mensual de rendimiento y prospectos generados",
    ],
  },
  {
    id: "plan_scale",
    name: "Scale Pro (Segmentación Cruzada)",
    badge: "⭐ RECOMENDADO PARA CRECIMIENTO",
    feeMonthly: "$12,500 MXN / mes",
    recommendedAdSpend: "Inversión en pauta sugerida: $18,000 a $45,000 MXN",
    popular: true,
    description: "Estrategia avanzada con segmentación cruzada (Poder adquisitivo + Intención + Cargos directivos), retargeting omnicanal y conexión con CRM.",
    channels: ["Google Ads", "Meta Ads Pro", "LinkedIn Ads / TikTok", "WhatsApp Cloud API", "CRM"],
    features: [
      "Todo lo incluido en Growth Starter",
      "Segmentación Cruzada: Nivel socioeconómico A/B/C+, directores y compradores frecuentes",
      "Embudos de Retargeting Dinámico (recuperación de visitantes del sitio web)",
      "Landing page de aterrizaje ultra rápida optimizada para conversión (< 1s)",
      "Conexión automatizada con WhatsApp API y notificación inmediata al equipo de ventas",
      "A/B Testing de creativos, copies y páginas de aterrizaje",
      "Dashboard ejecutivo con métricas en tiempo real",
    ],
  },
  {
    id: "plan_enterprise",
    name: "Enterprise 360 & B2B Inversores",
    badge: "Para Desarrollos & Grandes Marcas",
    feeMonthly: "$22,000 MXN / mes",
    recommendedAdSpend: "Inversión en pauta sugerida: $50,000+ MXN",
    description: "Estrategia de penetración de mercado nacional e internacional para venta de desarrollos inmobiliarios, software B2B o productos de alto ticket.",
    channels: ["Omnicanal 360", "Google Ads", "Meta VIP", "LinkedIn Enterprise", "Programmatic Ads"],
    features: [
      "Todo lo incluido en Scale Pro",
      "Segmentación internacional de inversionistas (EE.UU., Canadá, CDMX, Monterrey)",
      "Estrategia de Lead Scoring automatizado (calificación de prospectos calientes / fríos)",
      "Sesiones semanales de estrategia con directores de cuenta",
      "Producción de video ads con animación 3D y edición cinematográfica",
      "Integración profunda con ERP corporativo y bases de datos seguras",
    ],
  },
];

export default function MarketingGrowthClient() {
  const [selectedPlan, setSelectedPlan] = useState<CampaignPlan>(CAMPAIGN_PLANS[1]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [adBudget, setAdBudget] = useState<number>(25000); // MXN per month

  // ROI Simulator calculations
  const estimatedClicks = Math.round(adBudget / 6.5);
  const estimatedLeads = Math.round(estimatedClicks * 0.085);
  const estimatedSales = Math.max(2, Math.round(estimatedLeads * 0.12));

  const getWhatsAppLink = (planName: string) => {
    const text = encodeURIComponent(
      `¡Hola Iván y equipo de Innocentia Tech! Me interesa una estrategia de Growth & Marketing Digital con el plan "${planName}". ¿Podemos agendar una sesión de segmentación para mi empresa?`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: IVÁN • TECH & GROWTH STRATEGIST */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#00D1FF]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#3A86FF]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Growth Strategy Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
              <Zap className="w-4 h-4 text-[#00D1FF]" />
              <span>IVÁN — LEAD TECH & GROWTH STRATEGIST</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
              Campañas Publicitarias que Convierten en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] via-[#70D6FF] to-white">
                Clientes Reales
              </span>
            </h1>

            {/* Manifiesto Estratégico de Iván */}
            <div className="space-y-2 border-l-2 border-[#00D1FF] pl-4">
              <p className="text-white text-base sm:text-lg font-medium leading-snug">
                No quemamos presupuesto en pauta genérica ni corazonadas.
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Diseñamos arquitectura de datos, segmentación cruzada y embudos automatizados con IA para maximizar el retorno de cada peso invertido.
              </p>
            </div>

            {/* Disciplinas */}
            <div className="text-xs font-mono text-gray-400 tracking-wide">
              Segmentación Cruzada · Google & Meta Ads · Retargeting Omnicanal · Automatización WhatsApp · Lead Scoring
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppLink(selectedPlan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyan-gradient px-7 py-4 rounded-full text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,209,255,0.4)] hover:scale-105"
              >
                <span className="text-slate-950 font-black">Diseñar mi Estrategia con Iván</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-4 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#00D1FF] text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <div className="w-6 h-6 rounded-full bg-[#00D1FF] flex items-center justify-center shadow-[0_0_10px_#00D1FF]">
                  <Play className="w-3 h-3 fill-black text-black ml-0.5" />
                </div>
                <span>Ver Video de Iván</span>
              </button>
            </div>

            {/* Micro badges: Precision × Automation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left font-mono">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#00D1FF] block">PRECISIÓN ALGORÍTMICA</span>
                <span className="text-[10px] text-gray-400">Filtros NSE + Intención Real</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-cyan-300 block">INFRAESTRUCTURA & CRM</span>
                <span className="text-[10px] text-gray-400">Conexión directa WhatsApp API</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-400 block">MÉTRICAS TRANSPARENTES</span>
                <span className="text-[10px] text-gray-400">ROAS & Lead Scoring Medible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Iván Master Artwork */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-full max-w-[440px] aspect-[1024/1100] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_20px_50px_rgba(0,209,255,0.3)] border border-[#00D1FF]/40 bg-black/60"
            >
              <Image
                src="/images/ivan_desktop_hd.png"
                alt="Iván - Lead Tech & Growth Strategist • Innocentia Tech"
                fill
                quality={100}
                unoptimized
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Floating Glass Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#00D1FF]/40 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D1FF] animate-ping" />
                  <div>
                    <span className="text-xs font-bold text-white block font-mono">IVÁN • TECH & GROWTH LEAD</span>
                    <span className="text-[10px] text-gray-400 font-mono leading-tight">
                      “La ingeniería de datos convierte cada peso invertido en ventas predecibles.”
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00D1FF] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/10 text-left font-mono mt-12">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-xs text-gray-400 block uppercase">Segmentación</span>
            <span className="text-xl font-bold text-[#00D1FF]">Hiper-Focalizada</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-xs text-gray-400 block uppercase">Conversión Promedio</span>
            <span className="text-xl font-bold text-emerald-400">4.8% a 12.5%</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-xs text-gray-400 block uppercase">Canales Activos</span>
            <span className="text-xl font-bold text-cyan-300">Google + Meta + LinkedIn</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <span className="text-xs text-gray-400 block uppercase">Velocidad de Respuesta</span>
            <span className="text-xl font-bold text-amber-400">&lt; 30 segundos</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EL PODER DE LA SEGMENTACIÓN CRUZADA (CROSS-AUDIENCE TARGETING) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono text-[#00D1FF] uppercase">
            <span>METODOLOGÍA EXCLUSIVA DE IVÁN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ¿Cómo funciona la Segmentación Cruzada?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            En lugar de mostrar tu anuncio a millones de personas sin dinero o sin interés, cruzamos 4 filtros de datos para impactar solo a quienes tienen el presupuesto y la necesidad real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "Filtro 01",
              title: "Poder Adquisitivo & NSE",
              desc: "Usuarios con historial de compras de alto valor, viajeros frecuentes internacionales y dispositivos premium (iPhone Pro, MacBook, etc.).",
              color: "#00D1FF",
            },
            {
              step: "Filtro 02",
              title: "Geolocalización Estratégica",
              desc: "Zonas de alta plusvalía y corredores corporativos: Monterrey (San Pedro), CDMX (Polanco, Santa Fe), Mérida Norte, Cancún y Querétaro.",
              color: "#10B981",
            },
            {
              step: "Filtro 03",
              title: "Cargos Directivos & B2B",
              desc: "Directores Generales, CTOs, Dueños de Negocio, Médicos Especialistas e Inversionistas identificados por intereses y cargos.",
              color: "#70D6FF",
            },
            {
              step: "Filtro 04",
              title: "Intención Transaccional",
              desc: "Personas buscando activamente soluciones en Google: 'cuánto cuesta...', 'cotizar desarrollo...', 'comprar lote de inversión...', etc.",
              color: "#38BDF8",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-xl space-y-3 relative group shadow-lg"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: item.color }}>
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIMULADOR DE RETORNO DE INVERSIÓN (ROI ESTIMATOR) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-black via-[#060D18] to-[#0A1628] border border-[#00D1FF]/30 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                SIMULADOR INTERACTIVO DE RESULTADOS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Calcula el Impacto de tu Inversión en Pauta
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Ajusta el presupuesto mensual estimado de publicidad para calcular los prospectos y ventas proyectadas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Budget Slider */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 uppercase block font-bold">
                  Presupuesto Mensual de Pauta (Google / Meta):
                </label>
                <div className="text-4xl font-black text-[#00D1FF] font-mono">
                  ${adBudget.toLocaleString()} MXN
                </div>
              </div>

              <input
                type="range"
                min={8000}
                max={100000}
                step={2000}
                value={adBudget}
                onChange={(e) => setAdBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
              />

              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>Mínimo: $8,000 MXN</span>
                <span>$50,000 MXN</span>
                <span>Escala: $100,000+ MXN</span>
              </div>

              <p className="text-xs text-gray-400 font-light">
                * Estimaciones basadas en métricas promedio de costo por clic ($6.50 MXN) y conversión a lead calificado (8.5%) en industrias B2B, inmobiliaria y servicios de tecnología.
              </p>
            </div>

            {/* Right Column: Projected Metrics */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-center space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase">Clics Calificados</span>
                <div className="text-3xl font-black text-white font-mono">{estimatedClicks.toLocaleString()}</div>
                <span className="text-[10px] text-cyan-300 font-mono block">Tráfico con alta intención</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-[#00D1FF]/40 text-center space-y-2 shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold">Prospectos / Leads</span>
                <div className="text-3xl font-black text-[#00D1FF] font-mono">{estimatedLeads}</div>
                <span className="text-[10px] text-emerald-400 font-mono block">Contactos en WhatsApp</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-cyan-400/40 text-center space-y-2 shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Cierres Estimados</span>
                <div className="text-3xl font-black text-white font-mono">{estimatedSales} clientes</div>
                <span className="text-[10px] text-emerald-400 font-mono block">Retorno altamente positivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PLANES DE GESTIÓN & PAUTA DE MARKETING */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-teal-500/10 border border-white/15 text-xs font-mono text-gray-300 uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>ESTRATEGIAS DE CRECIMIENTO A MEDIDA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Planes de Campañas & Aceleración de Ventas
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            <span className="text-cyan-300 font-medium font-mono text-xs block mb-1">
              📈 Precios recomendados de referencia • Nos adaptamos 100% a tus necesidades
            </span>
            Administramos tu pauta publicitaria, optimizamos creativos y medimos conversiones con retorno positivo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CAMPAIGN_PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-2xl ${
                  isSelected
                    ? "bg-black/90 border-2 border-[#00D1FF] shadow-[0_0_35px_rgba(0,209,255,0.35)] scale-[1.02]"
                    : "bg-black/60 border border-white/10 hover:border-white/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full btn-cyan-gradient text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">{plan.badge}</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{plan.name}</h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl sm:text-4xl font-black text-white font-mono">{plan.feeMonthly}</div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Sugerido</span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300">{plan.recommendedAdSpend}</div>
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed">{plan.description}</p>

                  {/* Channels Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {plan.channels.map((ch, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block font-bold">
                      Alcance del Plan:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-gray-200">
                        <Check className="w-3.5 h-3.5 text-[#00D1FF] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href={getWhatsAppLink(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-5 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "btn-cyan-gradient ring-2 ring-white/60 scale-[1.02]"
                        : "btn-glass-cyan"
                    }`}
                  >
                    <span className={isSelected ? "text-slate-950 font-black" : "text-cyan-200 font-bold"}>
                      Contratar {plan.name}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950 stroke-[2.5]" : "text-cyan-300"}`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda Elegante: Precios recomendados & Adaptabilidad */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-[#040810] to-blue-500/10 border border-cyan-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl text-left">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
              📈
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Precios Recomendados • Nos adaptamos a tus necesidades
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Nuestros paquetes de gestión son <em>referencias estratégicas</em>. Ajustamos el volumen de pauta, canales de difusión y embudos de conversión según la etapa y el presupuesto de tu empresa.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/529601771556?text=Hola%20Iván%20e%20Innocentia%20Tech,%20me%20gustaría%20una%20propuesta%20de%20campañas%20adaptada%20a%20mi%20presupuesto."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-cyan px-5 py-3 rounded-full font-mono text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span className="text-cyan-300">Plan a mi medida</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00D1FF]" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CTA FINAL: INICIAR CAMPAÑAS */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-[#00D1FF]/25 via-black to-[#3A86FF]/25 border border-[#00D1FF]/50 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ¿Listo para escalar las ventas de tu negocio?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Hagamos una auditoría inicial de tus canales con Iván y configuremos una campaña con segmentación cruzada diseñada para generar retorno real.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a
              href="https://wa.me/529601771556?text=Hola%20Iván%20e%20Innocentia%20Tech,%20quiero%20cotizar%20campañas%20de%20Marketing%20Digital%20y%20Segmentación%20Cruzada"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan-gradient px-8 py-4 rounded-full text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,209,255,0.4)]"
            >
              <MessageSquare className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span className="text-slate-950 font-black">WhatsApp de Estrategia (+52 960 177 1556)</span>
            </a>

            <Link
              href="/crear-proyecto"
              className="btn-glass-cyan px-7 py-4 rounded-full font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <span className="text-cyan-200">Llenar Formulario de Pauta</span>
              <ArrowRight className="w-4 h-4 text-[#00D1FF]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* IVÁN VIDEO PRESENTATION MODAL */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#060D18] border border-[#00D1FF]/50 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00D1FF] to-[#3A86FF] flex items-center justify-center text-lg shadow-md">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">IVÁN • PRESENTACIÓN OFICIAL</h3>
                  <span className="text-xs text-[#00D1FF] font-mono">Lead Tech & Growth Strategist en Innocentia Tech</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <video
                src="/videos/ivan_presentacion.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
