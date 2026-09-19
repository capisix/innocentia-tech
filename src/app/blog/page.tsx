import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import { BLOG_POSTS } from "../../lib/blogData";
import { ArrowRight, Sparkles, BookOpen, Clock, ChevronRight } from "../../lib/icons";

export const metadata: Metadata = {
  title: "Blog de Software, Costos de Apps e IA | Innocentia Tech",
  description: "Artículos, guías de precios de desarrollo de software, costos de apps móviles en México, arquitectura Next.js y automatización de ventas.",
  metadataBase: new URL("https://innocentia.tech"),
  alternates: {
    canonical: "https://innocentia.tech/blog",
  },
  openGraph: {
    title: "Blog de Software, Costos de Apps e IA | Innocentia Tech",
    description: "Guías técnicas, costos reales de aplicaciones y estrategias de software en México y LATAM.",
    url: "https://innocentia.tech/blog",
    siteName: "Innocentia Tech",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      <AmbientLivingCanvas />
      <Navbar />

      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 relative z-10 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#00D1FF] transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold">Blog & Recursos de Software</span>
        </nav>

        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30 text-xs font-mono text-[#FF3858]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RECURSOS, GUÍAS DE PRECIOS & ARQUITECTURA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Artículos & Guías de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3858] via-purple-400 to-[#00D1FF]">Software, Apps e IA</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Aprende sobre costos reales de desarrollo en México, mejores prácticas de ingeniería de software, arquitectura en la nube y cómo automatizar tu empresa con tecnología.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-white/[0.04] to-black/80 border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-xs font-mono text-gray-400">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00D1FF] font-bold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#00D1FF] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                  />
                  <span className="text-xs font-mono text-gray-300">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#00D1FF] transition-colors"
                >
                  <span>Leer artículo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Card */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-purple-950/40 via-cyan-950/40 to-black/90 border border-white/20 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ¿Quieres cotizar el desarrollo de tu aplicación o plataforma?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Recibe un presupuesto detallado con desglose de sprints, alcance técnico y tiempos de entrega garantizados.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/crear-proyecto"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Cotizar en Línea →
            </Link>
            <Link
              href="/proyectos"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              Ver Casos de Estudio
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
