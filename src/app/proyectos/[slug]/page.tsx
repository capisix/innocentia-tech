import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import AmbientLivingCanvas from "../../../components/common/AmbientLivingCanvas";
import { PROJECTS_DATA, ProjectCaseStudy } from "../../../lib/projectsData";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
} from "../../../lib/icons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyecto No Encontrado | Innocentia Tech",
    };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    metadataBase: new URL("https://innocentia.tech"),
    alternates: {
      canonical: `https://innocentia.tech/proyectos/${project.slug}`,
    },
    keywords: project.keywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://innocentia.tech/proyectos/${project.slug}`,
      siteName: "Innocentia Tech",
      images: [
        {
          url: project.image.startsWith("http") ? project.image : `https://innocentia.tech${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
      images: [project.image.startsWith("http") ? project.image : `https://innocentia.tech${project.image}`],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": project.title,
        "applicationCategory": project.category,
        "operatingSystem": "Web, iOS, Android, Cloud",
        "description": project.subtitle,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "MXN",
        },
        "author": {
          "@type": "Organization",
          "name": "Innocentia Tech",
          "url": "https://innocentia.tech",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://innocentia.tech",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Proyectos",
            "item": "https://innocentia.tech/proyectos",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `https://innocentia.tech/proyectos/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AmbientLivingCanvas />
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-16 relative z-10 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#00D1FF] transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/proyectos" className="hover:text-[#00D1FF] transition-colors">Proyectos</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold">{project.title}</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-[11px] font-mono px-3.5 py-1 rounded-full border font-bold uppercase tracking-wider bg-white/5"
              style={{ color: project.primaryColor, borderColor: `${project.primaryColor}55` }}
            >
              {project.tag}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              📍 {project.location}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              🏷️ {project.clientIndustry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {project.headline}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
            {project.subtitle}
          </p>

          {project.demoUrl && (
            <div className="pt-2">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] via-emerald-500 to-[#00D1FF] hover:from-[#38e0ff] hover:to-[#10b981] text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>Probar Demo en Vivo de {project.title} →</span>
              </a>
            </div>
          )}
        </header>

        {/* Impact ROI Metrics 3-Column */}
        <section aria-labelledby="roi-section" className="space-y-4">
          <h2 id="roi-section" className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D1FF]">
            Impacto Operativo & Resultados Medibles:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.costSavings.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-black/80 border border-white/10 space-y-2 shadow-xl"
              >
                <span className="text-3xl sm:text-4xl font-black text-white block" style={{ color: project.primaryColor }}>
                  {c.stat}
                </span>
                <span className="text-xs font-mono font-bold text-white uppercase block">{c.label}</span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem vs Solution Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* El Desafío */}
          <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <h2 className="text-base font-mono font-bold text-red-300 uppercase">El Desafío del Negocio</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {project.clientProblem}
            </p>
          </div>

          {/* La Solución */}
          <div className="p-7 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="text-base font-mono font-bold text-emerald-300 uppercase">Nuestra Solución Tecnológica</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {project.solutionOverview}
            </p>
          </div>
        </section>

        {/* Key Features & Automations */}
        <section className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Arquitectura, Funcionalidades & Automatización</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-gray-400">Funcionalidades Clave:</h3>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-gray-400">Automatizaciones de Proceso:</h3>
              <ul className="space-y-2.5">
                {project.processAutomation.map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <Sparkles className="w-4 h-4 text-[#00D1FF] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack & Deliverables */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-gray-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Stack Tecnológico Utilizado:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/15 text-xs font-mono text-gray-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-gray-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Entregables del Proyecto:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-purple-950/40 via-cyan-950/40 to-black/90 border border-white/20 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 font-bold uppercase">
            Transforma Tu Empresa
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ¿Necesitas una solución similar para {project.title}?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Podemos adaptar o crear un sistema especializado para tu industria en menos de 4 semanas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/crear-proyecto"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Cotizar Proyecto Similar →
            </Link>
            <Link
              href="/proyectos"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Otros Proyectos</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
