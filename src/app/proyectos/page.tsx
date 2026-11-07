import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import { PROJECTS_DATA } from "../../lib/projectsData";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Zap } from "../../lib/icons";

export const metadata: Metadata = {
  title: "Casos de Estudio & Proyectos de Software | Innocentia Tech",
  description: "Explora nuestros proyectos de software a medida, apps móviles nativas, plataformas SaaS multi-tenant y cotizadores inteligentes desarrollados en México.",
  metadataBase: new URL("https://innocentia.tech"),
  alternates: {
    canonical: "https://innocentia.tech/proyectos",
  },
  openGraph: {
    title: "Casos de Estudio & Proyectos de Software | Innocentia Tech",
    description: "Proyectos reales de ingeniería de software, aplicaciones móviles y soluciones con IA.",
    url: "https://innocentia.tech/proyectos",
    siteName: "Innocentia Tech",
  },
};

export default function ProyectosIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      <AmbientLivingCanvas />
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 relative z-10 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#00D1FF] transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold">Proyectos & Casos de Estudio</span>
        </nav>

        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-xs font-mono text-[#00D1FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTAFOLIO DE INGENIERÍA & PRODUCTOS ACTIVOS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Casos de Estudio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] via-[#70D6FF] to-white">Software, Apps & SaaS</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Descubre cómo diseñamos y construimos plataformas tecnológicas de alto impacto para empresas en México, Riviera Maya y el extranjero, reduciendo costos operativos y multiplicando la conversión en ventas.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((p) => {
            const isDualFlagship = Boolean(p.dualArchitecture);
            return (
              <article
                key={p.slug}
                className={`p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-white/[0.05] via-black/80 to-black/95 border transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 group hover:-translate-y-1 relative backdrop-blur-xl ${
                  isDualFlagship
                    ? "lg:col-span-2 border-[#D5B77B]/45 hover:border-[#D5B77B] shadow-[0_25px_80px_rgba(213,183,123,0.12)]"
                    : "border-white/10 hover:border-[#00D1FF]/50"
                }`}
              >
                {isDualFlagship && p.dualArchitecture ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
                    {/* Left: Dual Visual Showcase */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Web Editorial Card */}
                      <Link
                        href={`/proyectos/${p.slug}`}
                        className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-black/90 border border-[#D5B77B]/40 group/img shadow-2xl block"
                      >
                        <Image
                          src={p.dualArchitecture.webPart.image}
                          alt={p.dualArchitecture.webPart.title}
                          fill
                          className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 35vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/85 border border-[#D5B77B]/60 text-[#D5B77B] font-bold uppercase tracking-wider">
                            🌐 1. SITIO WEB EDITORIAL
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
                          <p className="text-xs font-bold text-white">Front-Stage Público de Marca</p>
                          <p className="text-[11px] text-gray-300 line-clamp-2">
                            Historia, Símbolo Interactivo SVG, 5 Pilares, Programas, Eventos, Blog y Equipamiento Oficial.
                          </p>
                        </div>
                      </Link>

                      {/* WebApp Privada Card */}
                      <Link
                        href={p.interactiveDemoRoute || `/proyectos/${p.slug}`}
                        className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-black/90 border border-[#9C75AF]/50 group/img shadow-2xl block"
                      >
                        <Image
                          src={p.dualArchitecture.appPart.image}
                          alt={p.dualArchitecture.appPart.title}
                          fill
                          className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 35vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/85 border border-[#C3A2D6]/60 text-[#C3A2D6] font-bold uppercase tracking-wider">
                            📱 2. WEBAPP PRIVADA
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Rol Alumna + Coach
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
                          <p className="text-xs font-bold text-white">Back-Stage Operativo Conectado</p>
                          <p className="text-[11px] text-gray-300 line-clamp-2">
                            Expediente individual, Sala en Vivo HD, Videoteca On-Demand, Reservas y Pagos SPEI/Tarjeta.
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Right: Sales Pillar Details */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#D5B77B]/20 border border-[#D5B77B]/50 text-[#D5B77B] text-[10px] font-mono font-bold uppercase tracking-wider">
                          ★ CASO INSIGNIA • PILAR DE VENTAS
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#9C75AF]/20 border border-[#9C75AF]/40 text-[#C3A2D6] text-[10px] font-mono font-bold uppercase tracking-wider">
                          WEB + WEBAPP INTEGRADA
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black text-white group-hover:text-[#D5B77B] transition-colors">
                        <Link href={`/proyectos/${p.slug}`}>{p.title}</Link>
                      </h2>

                      <p className="text-sm text-gray-300 leading-relaxed font-light">
                        {p.subtitle}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                        {p.costSavings.map((c, idx) => (
                          <div key={idx} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                            <span className="text-base sm:text-xl font-black block" style={{ color: p.primaryColor }}>
                              {c.stat}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono block leading-tight font-medium">
                              {c.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Standard Image Preview Container */}
                    <Link
                      href={`/proyectos/${p.slug}`}
                      className="block relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-black/90 border border-white/15 group-hover:border-[#00D1FF]/50 transition-all duration-500 shadow-2xl group/img"
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                      {/* Badges on Image */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className="text-[10px] font-mono px-3 py-1 rounded-full border font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md shadow-lg"
                          style={{ color: p.primaryColor, borderColor: `${p.primaryColor}88` }}
                        >
                          {p.tag}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-gray-300 font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{p.stats}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs font-mono">
                        <span className="text-[11px] text-gray-200 font-semibold truncate max-w-[65%]">{p.category}</span>
                        <span className="text-[10px] text-gray-400">{p.location}</span>
                      </div>
                    </Link>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#00D1FF] transition-colors">
                          <Link href={`/proyectos/${p.slug}`}>
                            {p.title}
                          </Link>
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
                          {p.subtitle}
                        </p>
                      </div>

                      {/* Key Metrics Badges */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                        {p.costSavings.map((c, idx) => (
                          <div key={idx} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 shadow-inner">
                            <span className="text-base sm:text-xl font-black text-white block" style={{ color: p.primaryColor }}>
                              {c.stat}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono block leading-tight font-medium">{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-gray-400">
                    {p.techStack.slice(0, isDualFlagship ? 5 : 3).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {p.interactiveDemoRoute && (
                      <Link
                        href={p.interactiveDemoRoute}
                        className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D5B77B] to-[#E5C992] text-[#111416] hover:brightness-110 inline-flex items-center gap-1.5 text-xs font-mono font-black transition-all shadow-lg"
                      >
                        <span>Explorar Demo Web + WebApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {p.demoUrl && isDualFlagship && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-bold text-white transition-all"
                      >
                        Abrir Sitio Real ↗
                      </a>
                    )}
                    <Link
                      href={`/proyectos/${p.slug}`}
                      className="btn-glass-cyan px-4 py-2.5 rounded-full inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#00D1FF] transition-all"
                    >
                      <span>Ver caso de estudio</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-black/90 border border-white/20 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ¿Tienes una idea de software o app para tu empresa?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light">
            En Innocentia Tech convertimos requerimientos complejos en aplicaciones funcionales y rápidas a 60 FPS. Cotiza tu proyecto en minutos con nuestros asesores comerciales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/crear-proyecto"
              className="w-full sm:w-auto px-8 py-4 rounded-full btn-cyan-gradient text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Cotizar Mi Proyecto →
            </Link>
            <a
              href="https://wa.me/529601771556"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              Hablar por WhatsApp Directo
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
