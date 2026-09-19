import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import AmbientLivingCanvas from "../../../components/common/AmbientLivingCanvas";
import { BLOG_POSTS, BlogPostArticle } from "../../../lib/blogData";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "../../../lib/icons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Artículo No Encontrado | Innocentia Tech",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    metadataBase: new URL("https://innocentia.tech"),
    alternates: {
      canonical: `https://innocentia.tech/blog/${post.slug}`,
    },
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://innocentia.tech/blog/${post.slug}`,
      siteName: "Innocentia Tech",
      images: [
        {
          url: "https://innocentia.tech/images/og_preview.png?v=11",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["https://innocentia.tech/images/og_preview.png?v=11"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription,
        "datePublished": "2026-09-15T09:00:00+00:00",
        "dateModified": "2026-09-18T12:00:00+00:00",
        "mainEntityOfPage": `https://innocentia.tech/blog/${post.slug}`,
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Innocentia Tech",
          "logo": {
            "@type": "ImageObject",
            "url": "https://innocentia.tech/images/innocentia_logo_official.png",
          },
        },
        "image": "https://innocentia.tech/images/og_preview.png?v=11",
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
            "name": "Blog",
            "item": "https://innocentia.tech/blog",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://innocentia.tech/blog/${post.slug}`,
          },
        ],
      },
      ...(post.faq && post.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": post.faq.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AmbientLivingCanvas />
      <Navbar />

      <article className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12 relative z-10 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#00D1FF] transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#00D1FF] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Header Section */}
        <header className="space-y-6 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400">
            <span className="px-3 py-1 rounded-full bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 font-bold">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{post.readTime}</span>
            </div>
            <span>•</span>
            <span>{post.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-3.5 pt-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md"
            />
            <div>
              <span className="text-sm font-bold text-white block">{post.author.name}</span>
              <span className="text-xs font-mono text-gray-400">{post.author.role}</span>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="space-y-10 text-gray-300 font-light leading-relaxed">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg leading-relaxed text-gray-300">
                  {p}
                </p>
              ))}

              {section.highlights && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 my-4">
                  {section.highlights.map((h, hIdx) => (
                    <p key={hIdx} className="text-sm sm:text-base text-gray-200 font-normal">
                      {h}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* FAQ Section if available */}
          {post.faq && post.faq.length > 0 && (
            <section className="pt-8 border-t border-white/10 space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#00D1FF]" />
                <span>Preguntas Frecuentes Relacionadas</span>
              </h2>

              <div className="space-y-4">
                {post.faq.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
                  >
                    <h3 className="text-base font-bold text-white font-mono">
                      Q: {f.question}
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-black/90 border border-white/20 text-center space-y-6 shadow-2xl mt-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ¿Quieres cotizar tu proyecto de software o app móvil?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Platica con nuestro equipo de ingenieros y diseñadores para recibir una propuesta formal y personalizada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/crear-proyecto"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Iniciar Cotización →
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Más Artículos</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
