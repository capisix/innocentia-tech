"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ChevronDown, ArrowRight, MessageSquare } from "../../lib/icons";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Top 3 Essential Highlight Questions for the Home Page Teaser
  const featuredFaqs = [
    {
      q: "¿Necesito tener mi idea completamente definida?",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "No. Muchas veces una idea comienza como una sensación o necesidad. Escuchamos lo que imaginas, analizamos el problema y te ayudamos a convertir esa primera visión en un concepto claro, coherente y viable.",
    },
    {
      q: "¿Qué tipo de proyectos puede desarrollar Innocentia?",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "Desarrollamos soluciones digitales adaptadas a tu negocio: plataformas web en Next.js, aplicaciones móviles nativas, software empresarial, CRM/ERP a medida y agentes autónomos de Inteligencia Artificial.",
    },
    {
      q: "¿Quién tiene la propiedad del código y diseño desarrollado?",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "El cliente al 100%. Una vez concluido el proyecto y cubiertos los acuerdos, todos los derechos sobre el código, arquitectura, diseño y bases de datos son transferidos en su totalidad al cliente.",
    },
  ];

  return (
    <section id="preguntas" className="py-24 px-6 sm:px-8 max-w-5xl mx-auto text-center relative z-10">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl mb-6">
        <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-300 uppercase">
          CENTRO DE PREGUNTAS FRECUENTES
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">
        PREGUNTAS <span className="bg-gradient-to-r from-[#FF3858] to-[#00D1FF] bg-clip-text text-transparent">FRECUENTES</span>
      </h2>

      <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-10 font-light leading-relaxed">
        Resolvemos tus dudas principales. Para consultar todas las respuestas y platicar en vivo con Sofía e Iván, visita nuestro centro dedicado.
      </p>

      {/* Featured 3 Questions */}
      <div className="space-y-3.5 text-left mb-10">
        {featuredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#0A0A12] border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: faq.color,
                      boxShadow: `0 0 10px ${faq.color}`,
                    }}
                  />
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2 pt-2">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                      style={{
                        backgroundColor: `${faq.color}20`,
                        color: faq.color,
                        border: `1px solid ${faq.color}40`,
                      }}
                    >
                      Responde: {faq.authorName} ({faq.role})
                    </span>
                  </div>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* High-Converting Subpage CTA Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-white/[0.04] via-black/80 to-white/[0.04] border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-2 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(255,56,88,0.4)]">
              <Image src="/images/sofia_pink_beanbag.png" alt="Sofía" width={34} height={34} className="object-contain" />
            </div>
            <div className="w-12 h-12 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)]">
              <Image src="/images/ivan_standing_stylus.png" alt="Iván" width={34} height={34} className="object-contain" />
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <span>¿Tienes más preguntas o una idea específica?</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                EN VIVO
              </span>
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Accede a nuestro centro completo de 11+ preguntas y habla en tiempo real con Sofía e Iván.
            </p>
          </div>
        </div>

        <Link
          href="/faq"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] hover:from-[#FF4D6D] hover:to-[#00D1FF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-105 transition-all flex-shrink-0"
        >
          <span>Ver todas las preguntas &amp; Hablar en Vivo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
