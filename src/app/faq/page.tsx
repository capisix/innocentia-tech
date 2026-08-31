"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import Footer from "../../components/footer/Footer";
import ProjectCreationModal from "../../components/common/ProjectCreationModal";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Send,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Globe,
  BrainCircuit,
  Zap,
} from "../../lib/icons";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState<"todos" | "sofia" | "ivan">("todos");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Live Chat Studio State
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: "user" | "sofia" | "ivan"; text: string }>
  >([
    {
      id: "1",
      sender: "sofia",
      text: "¡Hola! Estoy aquí para resolver cualquier duda sobre diseño, marca, prototipos en Figma o la identidad de tu proyecto.",
    },
    {
      id: "2",
      sender: "ivan",
      text: "Y yo responderé todas tus preguntas de arquitectura, bases de datos, APIs, costos técnicos y tiempos de desarrollo.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState<"sofia" | "ivan" | "both" | null>(null);

  const faqs = [
    {
      q: "¿Necesito tener mi idea completamente definida?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "No. Muchas veces una idea comienza como una sensación, una necesidad o simplemente la intuición de que exista una mejor manera de hacer algo. Escuchamos lo que imaginas, analizamos el problema, exploramos posibilidades y te ayudamos a convertir esa primera visión en un concepto claro, coherente y viable.",
    },
    {
      q: "¿Qué tipo de proyectos puede desarrollar Innocentia?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "Desarrollamos soluciones digitales adaptadas a las necesidades de cada proyecto: plataformas web, aplicaciones móviles, software empresarial, CRM/ERP, dashboards administrativos, marketplaces, reservaciones, automatizaciones, APIs, chatbots y agentes autónomos de IA.",
    },
    {
      q: "¿Trabajan únicamente con empresas grandes?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "No. Trabajamos con personas que tienen una idea, emprendedores, startups, pequeñas empresas y organizaciones consolidadas. El tamaño de una empresa no determina el potencial de una idea; lo más importante es la claridad del objetivo.",
    },
    {
      q: "¿Pueden ayudarme también con el diseño y la identidad visual?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "Sí. Desarrollamos la identidad visual completa: concepto de marca, dirección de arte, branding, paleta de colores, tipografía, iconografía, diseño UX/UI, ilustraciones y animaciones para que la tecnología y la identidad se sientan como una sola experiencia.",
    },
    {
      q: "¿Desarrollan software completamente personalizado?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "Sí. Cada proyecto se desarrolla a medida según sus objetivos y necesidades. No intentamos adaptar una empresa a una herramienta genérica; primero comprendemos cómo funciona el proyecto y después diseñamos la solución tecnológica adecuada.",
    },
    {
      q: "¿Utilizan inteligencia artificial en sus soluciones?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "Sí, cuando aporta valor real. Integramos IA para automatizar procesos, analizar información, crear chatbots conversacionales inteligentes y optimizar flujos de trabajo en plataformas digitales.",
    },
    {
      q: "¿La inteligencia artificial reemplaza a las personas?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "No. En Innocentia vemos la inteligencia artificial como una herramienta que potencia las capacidades humanas. La tecnología se encarga de lo repetitivo, permitiendo que las personas se concentren en lo estratégico, creativo y humano.",
    },
    {
      q: "¿Pueden conectar mi nuevo sistema con las herramientas que ya utilizo?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "Sí. Integramos sistemas mediante APIs con pasarelas de pago (Stripe, Mercado Pago), servicios de mensajería (WhatsApp), bases de datos externas, CRM y plataformas en la nube.",
    },
    {
      q: "¿Cuál es su proceso de desarrollo?",
      author: "both",
      authorName: "Sofía & Iván",
      role: "Metodología Dual",
      color: "#FFD166",
      a: "Trabajamos en cinco etapas estructuradas: 1) Descubrimiento y Conceptualización, 2) Diseño Visual y Experiencia (UI/UX), 3) Arquitectura e Ingeniería, 4) Pruebas y Optimización, y 5) Lanzamiento y Evolución Continua.",
    },
    {
      q: "¿Quién tiene la propiedad del código y del diseño desarrollado?",
      author: "ivan",
      authorName: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      a: "El cliente. Una vez concluido el proyecto y cubiertos los compromisos acordados, todos los derechos sobre el código, diseño y activos digitales desarrollados son transferidos en su totalidad al cliente.",
    },
    {
      q: "¿Cómo podemos comenzar un proyecto con Innocentia?",
      author: "sofia",
      authorName: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      a: "Es muy sencillo. Puedes dar clic en 'Crear Proyecto' o platicar directamente con nosotros en el chat interactivo para compartir tu idea y generar un primer diagnóstico conceptual y técnico.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (filter === "todos") return true;
    if (filter === "sofia") return faq.author === "sofia" || faq.author === "both";
    if (filter === "ivan") return faq.author === "ivan" || faq.author === "both";
    return true;
  });

  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: text.trim(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    const lower = text.toLowerCase();
    let respondingPersona: "sofia" | "ivan" | "both" = "both";
    if (
      lower.includes("diseñ") ||
      lower.includes("marca") ||
      lower.includes("ux") ||
      lower.includes("arte") ||
      lower.includes("color") ||
      lower.includes("logo")
    ) {
      respondingPersona = "sofia";
    } else if (
      lower.includes("app") ||
      lower.includes("código") ||
      lower.includes("api") ||
      lower.includes("base de datos") ||
      lower.includes("backend") ||
      lower.includes("servidor") ||
      lower.includes("costo")
    ) {
      respondingPersona = "ivan";
    }

    setIsTyping(respondingPersona);

    setTimeout(() => {
      setIsTyping(null);
      if (respondingPersona === "sofia") {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "sofia",
            text: "¡Excelente pregunta de diseño! En Innocentia cuidamos cada detalle visual: desde la arquitectura de información en Figma hasta las microinteracciones táctiles. ¿Te gustaría que preparemos un prototipo inicial?",
          },
        ]);
      } else if (respondingPersona === "ivan") {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ivan",
            text: "Sobre la arquitectura técnica: trabajamos con stacks modernos y escalables como Next.js, PostgreSQL y microservicios en la nube con 99.99% de disponibilidad garantizada. ¿Tienes requerimientos de APIs específicas?",
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "sofia",
            text: "Podemos arrancar definiendo los objetivos de tu marca y el viaje del usuario...",
          },
          {
            id: (Date.now() + 2).toString(),
            sender: "ivan",
            text: "...y simultáneamente yo estructuraré el plan técnico para entregarte un MVP funcional en pocas semanas.",
          },
        ]);
      }
    }, 1100);
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Background Animated Canvas */}
      <AmbientLivingCanvas />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#040407]/90 backdrop-blur-2xl border-b border-white/10 py-3.5 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA"
              className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </Link>

            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,56,88,0.4)] transition-all cursor-pointer hover:scale-105"
            >
              <span>Crear Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-16 pb-10 px-6 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-300 uppercase">
            CENTRO DE RESPUESTAS &amp; ASISTENCIA DUAL
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
          PREGUNTAS <br />
          <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,56,88,0.4)]">
            FRECUENTES
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Resolvemos tus dudas creativas, técnicas y estratégicas antes de comenzar tu próximo
          producto digital con Sofía e Iván.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setFilter("todos")}
            className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
              filter === "todos"
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-white/5 border border-white/15 text-gray-400 hover:text-white"
            }`}
          >
            TODAS ({faqs.length})
          </button>
          <button
            onClick={() => setFilter("sofia")}
            className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
              filter === "sofia"
                ? "bg-[#FF3858] text-white shadow-[0_0_15px_rgba(255,56,88,0.5)]"
                : "bg-white/5 border border-white/15 text-[#FF3858] hover:bg-[#FF3858]/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            SOFÍA (UX &amp; DISEÑO)
          </button>
          <button
            onClick={() => setFilter("ivan")}
            className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
              filter === "ivan"
                ? "bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.5)]"
                : "bg-white/5 border border-white/15 text-[#00D1FF] hover:bg-[#00D1FF]/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            IVÁN (INGENIERÍA &amp; CÓDIGO)
          </button>
        </div>
      </section>

      {/* Main Two-Column Layout: FAQ Accordion + Live Chat Studio with Sofia & Ivan */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: FAQ Accordion */}
        <div className="lg:col-span-7 space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
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
                      className="w-3 h-3 rounded-full flex-shrink-0"
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 space-y-3">
                    <div className="flex items-center gap-2 pt-2">
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase"
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

        {/* Right Column: Live Chat Studio with Sofia & Ivan */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-[32px] bg-[#07070D] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-5 sm:p-6 text-left flex flex-col h-[600px] justify-between relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/50 p-0.5 flex items-center justify-center">
                    <Image
                      src="/images/sofia_pink_beanbag.png"
                      alt="Sofía"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/50 p-0.5 flex items-center justify-center">
                    <Image
                      src="/images/ivan_standing_stylus.png"
                      alt="Iván"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white tracking-wider uppercase">
                    HABLA CON SOFÍA &amp; IVÁN
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    En línea para responder dudas
                  </span>
                </div>
              </div>

              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                LIVE IA
              </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white rounded-br-none"
                        : msg.sender === "sofia"
                        ? "bg-[#FF3858]/10 border border-[#FF3858]/30 text-gray-200 rounded-bl-none"
                        : "bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-gray-200 rounded-bl-none font-mono"
                    }`}
                  >
                    {msg.sender !== "user" && (
                      <span
                        className={`text-[9px] font-bold block mb-1 uppercase font-mono ${
                          msg.sender === "sofia" ? "text-[#FF3858]" : "text-[#00D1FF]"
                        }`}
                      >
                        {msg.sender === "sofia" ? "Sofía (UX & Diseño)" : "Iván (Arquitectura & Dev)"}
                      </span>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5 p-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                  <span>
                    {isTyping === "sofia"
                      ? "Sofía está escribiendo..."
                      : isTyping === "ivan"
                      ? "Iván está calculando..."
                      : "Escribiendo respuesta..."}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="py-2 flex gap-1.5 overflow-x-auto scrollbar-none border-t border-white/5">
              {[
                "¿Cuánto tarda un MVP?",
                "¿Qué necesito para empezar?",
                "¿Hacen diseño y código?",
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChatMessage(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu duda directamente a Sofía o Iván..."
                className="flex-1 bg-white/[0.04] border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D1FF]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white hover:scale-105 transition-transform cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      <ProjectCreationModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </main>
  );
}
