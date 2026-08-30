"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown } from "../../lib/icons";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState<"todos" | "sofia" | "ivan">("todos");

  const faqs = [
    {
      q: "¿Necesito tener mi idea completamente definida?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      avatar: "🔴",
      color: "#FF3B5C",
      a: "No. Muchas veces una idea comienza como una sensación, una necesidad o simplemente la intuición de que exista una mejor manera de hacer algo. Escuchamos lo que imaginas, analizamos el problema, exploramos posibilidades y te ayudamos a convertir esa primera visión en un concepto claro, coherente y viable.",
    },
    {
      q: "¿Qué tipo de proyectos puede desarrollar Innocentia?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Desarrollamos soluciones digitales adaptadas a las necesidades de cada proyecto: plataformas web, aplicaciones móviles, software empresarial, CRM/ERP, dashboards administrativos, marketplaces, reservaciones, automatizaciones, APIs, chatbots y agentes autónomos de IA.",
    },
    {
      q: "¿Trabajan únicamente con empresas grandes?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      avatar: "🔴",
      color: "#FF3B5C",
      a: "No. Trabajamos con personas que tienen una idea, emprendedores, startups, pequeñas empresas y organizaciones consolidadas. El tamaño de una empresa no determina el potencial de una idea; lo más importante es la claridad del objetivo.",
    },
    {
      q: "¿Pueden ayudarme también con el diseño y la identidad visual?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      avatar: "🔴",
      color: "#FF3B5C",
      a: "Sí. Desarrollamos la identidad visual completa: concepto de marca, dirección de arte, branding, paleta de colores, tipografía, iconografía, diseño UX/UI, ilustraciones y animaciones para que la tecnología y la identidad se sientan como una sola experiencia.",
    },
    {
      q: "¿Desarrollan software completamente personalizado?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Sí. Cada proyecto se desarrolla a medida según sus objetivos y necesidades. No intentamos adaptar una empresa a una herramienta genérica; primero comprendemos cómo funciona el proyecto y después diseñamos la solución tecnológica adecuada.",
    },
    {
      q: "¿Utilizan inteligencia artificial en sus soluciones?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Sí, cuando aporta un beneficio real. La utilizamos para asistir usuarios, automatizar tareas, analizar información, clasificar datos, generar contenido y construir agentes inteligentes de software. No la incorporamos por moda, sino cuando mejora significativamente una solución.",
    },
    {
      q: "¿La inteligencia artificial reemplaza a las personas?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      avatar: "🔴",
      color: "#FF3B5C",
      a: "No. Para Innocentia, la IA es una herramienta capaz de ampliar capacidades humanas. Permite ahorrar tiempo y automatizar tareas repetitivas para que las personas concentren su energía en lo que requiere criterio, creatividad y sensibilidad. La tecnología debe estar al servicio de las personas.",
    },
    {
      q: "¿Pueden conectar mi nuevo sistema con las herramientas que ya utilizo?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Sí. Desarrollamos integraciones mediante APIs y webhooks para conectar plataformas de pago, CRM, WhatsApp, correo, bases de datos y servicios en la nube en un mismo ecosistema escalable.",
    },
    {
      q: "¿Cuál es su proceso de desarrollo?",
      author: "ambos",
      authorName: "Sofía & Iván",
      role: "Dual Core",
      avatar: "✨",
      color: "#8A2BE2",
      a: "Trabajamos en 5 etapas principales: 1. Descubrimiento (Comprender objetivos), 2. Diseño (Experiencia visual y funcional), 3. Desarrollo (Construir arquitectura), 4. Comprobación (Pruebas y calidad), 5. Entrega y Evolución (Acompañamiento continuo).",
    },
    {
      q: "¿Cuánto cuesta y cuánto tiempo tarda un proyecto?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Depende del alcance del proyecto. Preferimos ofrecer una estimación basada en información real tras la fase inicial. Además, podemos desarrollar primero un MVP o versión inicial por etapas para validar la idea antes de realizar mayores inversiones.",
    },
    {
      q: "¿El proyecto será mío y ofrecen soporte después de la entrega?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      avatar: "🔵",
      color: "#00E5FF",
      a: "Sí. Las condiciones de propiedad se establecen claramente desde el inicio. Además, ofrecemos acompañamiento, mantenimiento, soporte y mejoras evolutivas para que la plataforma continúe creciendo junto con tu negocio.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) => filter === "todos" || f.author === filter || f.author === "ambos"
  );

  return (
    <section id="faq" className="relative py-16 bg-[#040407] overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#FF8800] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>RESPUESTAS DE SOFÍA E IVÁN</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            PREGUNTAS FRECUENTES
          </h2>

          <p className="text-gray-300 text-base sm:text-lg font-light">
            Resolvemos tus dudas creativas y técnicas antes de comenzar tu próximo proyecto.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-3">
          <button
            onClick={() => setFilter("todos")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === "todos"
                ? "bg-white/20 border border-white/40 text-white shadow-lg"
                : "bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            Todas ({faqs.length})
          </button>
          <button
            onClick={() => setFilter("sofia")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === "sofia"
                ? "bg-[#FF3B5C]/20 border border-[#FF3B5C] text-white shadow-[0_0_20px_#FF3B5C]"
                : "bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            🔴 Sofía (UX/Diseño)
          </button>
          <button
            onClick={() => setFilter("ivan")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === "ivan"
                ? "bg-[#00E5FF]/20 border border-[#00E5FF] text-white shadow-[0_0_20px_#00E5FF]"
                : "bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            🔵 Iván (Ingeniería)
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left max-w-4xl mx-auto">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/15 overflow-hidden backdrop-blur-2xl transition-all shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{faq.avatar}</span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-300 font-light leading-relaxed border-t border-white/10 pt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase inline-block"
                        style={{ backgroundColor: `${faq.color}22`, color: faq.color, border: `1px solid ${faq.color}44` }}
                      >
                        Responde {faq.authorName} ({faq.role})
                      </span>
                    </div>
                    <p className="text-base leading-relaxed text-gray-200">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
