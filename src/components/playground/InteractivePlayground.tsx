"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Send, RefreshCw, CheckCircle2, Cpu, Palette } from "../../lib/icons";

interface ChatMessage {
  id: string;
  sender: "user" | "sofia" | "ivan";
  text: string;
  topic?: "design" | "tech" | "both";
  time: string;
  isStreaming?: boolean;
}

interface InteractivePlaygroundProps {
  onOpenProjectModal?: () => void;
}

export default function InteractivePlayground({ onOpenProjectModal }: InteractivePlaygroundProps) {
  const [activeAssistant, setActiveAssistant] = useState<"ambos" | "sofia" | "ivan">("ambos");
  const [activeChipIndex, setActiveChipIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"chat" | "arch">("chat");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState<"sofia" | "ivan" | "both" | null>(null);

  // 6 Visual Suggested Topics requested by User
  const visualTopics = [
    {
      id: "brand",
      label: "🎨 Diseñar una marca",
      short: "Branding & UX",
      target: "sofia",
      prompt: "Quiero diseñar la identidad visual de mi marca, logotipo, colorimetría y la experiencia de usuario (UX).",
      responseSofia:
        "En Innocentia diseñamos la colorimetría basándonos en la psicología emocional de tu usuario. Construimos un logotipo memorable, tipografía moderna, dirección de arte y un Design System completo antes de programar.",
      responseIvan:
        "Y desde el inicio, estructuro los componentes visuales en tokens de diseño limpios listos para sincronizarse con Tailwind v4 y React 19.",
      mockupData: {
        title: "Brand & Identity Studio",
        stats: ["4 Colores Core", "Design System", "WCAG AAA"],
        liveTag: "Colorimetría Activa",
        bars: [95, 80, 100, 85, 90],
      },
    },
    {
      id: "app",
      label: "📱 Crear una App",
      short: "iOS & Android",
      target: "both",
      prompt: "Quiero crear una aplicación móvil nativa para iOS y Android con reservas, pagos y diseño fluido.",
      responseSofia:
        "Diseñaremos un flujo de navegación táctil en 3 pasos con microanimaciones a 60fps y una interfaz hermosa que tus usuarios amarán abrir todos los días.",
      responseIvan:
        "En ingeniería móvil, desarrollamos en Flutter o React Native con sincronización en tiempo real vía WebSockets, pasarela de pago segura (Stripe / MercadoPago) y base de datos PostgreSQL.",
      mockupData: {
        title: "Mobile Native App",
        stats: ["iOS + Android", "60 FPS UI", "Offline Cache"],
        liveTag: "Flutter Engine",
        bars: [60, 85, 75, 95, 80],
      },
    },
    {
      id: "auto",
      label: "🤖 Automatizar procesos",
      short: "Bots & Webhooks",
      target: "ivan",
      prompt: "¿Cómo automatizan flujos de trabajo, bots, webhooks y tareas repetitivas en mi negocio?",
      responseSofia:
        "Diseñamos paneles visuales claros donde tu equipo supervisa todas las automatizaciones sin complicaciones técnicas.",
      responseIvan:
        "Conectamos pipelines automáticos con Webhooks, integraciones con WhatsApp Business API, generación serverless de reportes en PDF y bots de software que eliminan horas de trabajo manual cada día.",
      mockupData: {
        title: "Automation Engine",
        stats: ["99.8% Eficiencia", "-40h / semana", "0 Errores"],
        liveTag: "Webhooks Sync",
        bars: [85, 90, 75, 100, 95],
      },
    },
    {
      id: "ai",
      label: "🧠 Integrar IA",
      short: "Agentes & LLMs",
      target: "both",
      prompt: "Quiero integrar modelos de inteligencia artificial, agentes autónomos y LLMs a mi sistema.",
      responseSofia:
        "Para la IA, creamos una experiencia conversacional natural, empática y clara, con respuestas visuales estructuradas.",
      responseIvan:
        "Implementamos llamadas asíncronas con OpenAI GPT-4o / Claude 3.5 Sonnet, base de datos vectorial para memoria semántica y embeddings privados para proteger los datos de tu empresa.",
      mockupData: {
        title: "AI Neural Agent",
        stats: ["GPT-4o + Claude", "< 400ms", "Vector Memory"],
        liveTag: "Embeddings OK",
        bars: [70, 95, 85, 100, 90],
      },
    },
    {
      id: "web",
      label: "🌐 Plataforma Web",
      short: "Next.js 16 SaaS",
      target: "both",
      prompt: "Necesito una plataforma web moderna de alta velocidad con panel de clientes, suscripciones y e-commerce.",
      responseSofia:
        "Diseñaremos una experiencia web inmersiva con modo oscuro, tipografía pulida y arquitectura de información sin fricción.",
      responseIvan:
        "Construimos con Next.js 16 App Router, arquitectura serverless en Cloudflare Edge Workers, base de datos PostgreSQL en Supabase y autenticación con roles cifrados.",
      mockupData: {
        title: "Next.js Platform",
        stats: ["100/100 Core Web", "< 25ms Edge", "PostgreSQL"],
        liveTag: "Edge Serverless",
        bars: [80, 95, 90, 85, 100],
      },
    },
    {
      id: "crm",
      label: "📊 CRM Empresarial",
      short: "ERP & Analytics",
      target: "ivan",
      prompt: "Requiero un sistema CRM/ERP para gestionar prospectos de ventas, cotizaciones en PDF e inventario.",
      responseSofia:
        "Tableros Kanban interactivos estilo Linear para mover oportunidades comerciales con drag & drop táctil y métricas visuales.",
      responseIvan:
        "Estructura relacional PostgreSQL, generación instantánea de cotizaciones en PDF, telemetría de ingresos y roles de acceso jerárquicos.",
      mockupData: {
        title: "Enterprise CRM & ERP",
        stats: ["154 Leads", "$240k Pipeline", "94% Cierres"],
        liveTag: "Realtime Sync",
        bars: [75, 90, 85, 95, 100],
      },
    },
  ];

  const currentTopic = visualTopics[activeChipIndex];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "sofia",
      text: currentTopic.responseSofia,
      topic: "design",
      time: "Ahora",
    },
    {
      id: "2",
      sender: "ivan",
      text: currentTopic.responseIvan,
      topic: "tech",
      time: "Ahora",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "sofia",
        text: currentTopic.responseSofia,
        topic: "design",
        time: "Ahora",
      },
      {
        id: "2",
        sender: "ivan",
        text: currentTopic.responseIvan,
        topic: "tech",
        time: "Ahora",
      },
    ]);
  }, [activeChipIndex]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChipSelect = (index: number) => {
    setActiveChipIndex(index);
    const selected = visualTopics[index];
    setMessages([
      {
        id: Date.now().toString(),
        sender: "user",
        text: selected.prompt,
        time: "Ahora",
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "sofia",
        text: selected.responseSofia,
        topic: "design",
        time: "Ahora",
      },
      {
        id: (Date.now() + 2).toString(),
        sender: "ivan",
        text: selected.responseIvan,
        topic: "tech",
        time: "Ahora",
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: userText,
        time: "Ahora",
      },
    ]);

    const textLower = userText.toLowerCase();
    const isDesign =
      textLower.includes("diseño") ||
      textLower.includes("ux") ||
      textLower.includes("ui") ||
      textLower.includes("logo") ||
      textLower.includes("color") ||
      textLower.includes("branding") ||
      textLower.includes("arte") ||
      textLower.includes("visual");

    const isTech =
      textLower.includes("software") ||
      textLower.includes("codigo") ||
      textLower.includes("backend") ||
      textLower.includes("database") ||
      textLower.includes("base de datos") ||
      textLower.includes("postgres") ||
      textLower.includes("api") ||
      textLower.includes("cloud");

    if (activeAssistant === "sofia" || (isDesign && !isTech && activeAssistant === "ambos")) {
      setIsTyping("sofia");
      setTimeout(() => {
        setIsTyping(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "sofia",
            text: "Conceptualizamos la experiencia visual, la colorimetría psicológica y las animaciones para que tu producto cautive desde el primer segundo.",
            time: "Ahora",
          },
        ]);
      }, 700);
    } else if (activeAssistant === "ivan" || (isTech && !isDesign && activeAssistant === "ambos")) {
      setIsTyping("ivan");
      setTimeout(() => {
        setIsTyping(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "ivan",
            text: "Arquitectura confirmada: Desarrollamos con Next.js 16, base de datos relacional PostgreSQL con Supabase, endpoints seguros y despliegue serverless.",
            time: "Ahora",
          },
        ]);
      }, 700);
    } else {
      setIsTyping("sofia");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "sofia",
            text: "Para tu propuesta, diseñaremos un flujo intuitivo y una interfaz memorable centrada en la emoción humana.",
            time: "Ahora",
          },
        ]);
        setIsTyping("ivan");
        setTimeout(() => {
          setIsTyping(null);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: "ivan",
              text: "Y por la parte de ingeniería, levantamos la arquitectura de base de datos, APIs y servidores con escalamiento automático.",
              time: "Ahora",
            },
          ]);
        }, 800);
      }, 700);
    }
  };

  return (
    <section id="playground" className="relative py-20 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-8">
        {/* ========================================================== */}
        {/* DUAL CORE HERO BANNER (PUNTO 5: CREATIVIDAD + INGENIERÍA) */}
        {/* ========================================================== */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FF3B5C]/15 via-purple-950/30 to-[#00E5FF]/15 border border-white/20 p-6 backdrop-blur-2xl text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-white uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>SISTEMA DUAL CORE INNOCENTIA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Creatividad <span className="text-[#FF8800]">+</span> Ingeniería
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Imaginación + Software • Diseño + Arquitectura • Sofía + Iván
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/50 text-white font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B5C] animate-pulse" />
              <span>🔴 SOFÍA: Diseño & Emoción</span>
            </div>
            <span className="text-gray-400 font-bold">+</span>
            <div className="px-3.5 py-2 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/50 text-white font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span>🔵 IVÁN: Software & Cloud</span>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 text-left max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
              LABORATORIO INNOCENTIA
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Experimenta cómo Sofía e Iván transforman una idea en arquitectura, interfaz y código funcional en tiempo real.
            </p>
          </div>

          <button
            onClick={onOpenProjectModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#3B82F6] to-[#8A2BE2] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-105 cursor-pointer flex-shrink-0"
          >
            <span>Crear mi prototipo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Visual Suggested Topics */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block text-left">
            PREGUNTAS SUGERIDAS (SELECCIONA UN TEMA):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {visualTopics.map((topic, idx) => {
              const isSelected = activeChipIndex === idx;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleChipSelect(idx)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    isSelected
                      ? "bg-white/[0.12] border-white/40 shadow-[0_0_20px_rgba(0,229,255,0.3)] scale-[1.03]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/25 text-gray-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-sm font-bold text-white block">{topic.label}</span>
                  <span className="text-[10px] font-mono text-gray-400 block">{topic.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Grid: Perfectly aligned 2-column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Chat & Specs Console */}
          <div className="lg:col-span-7 bg-black/75 border border-white/20 rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl flex flex-col justify-between space-y-6 shadow-2xl h-[560px]">
            {/* Top Bar: Assistant Selector & Mode Switch */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block uppercase mb-1.5 font-bold text-left">
                  ASISTENTE ACTIVO:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveAssistant("sofia")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      activeAssistant === "sofia"
                        ? "bg-[#FF3B5C]/25 border-[#FF3B5C] text-white shadow-[0_0_15px_#FF3B5C]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    🔴 Sofía (UX)
                  </button>
                  <button
                    onClick={() => setActiveAssistant("ivan")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      activeAssistant === "ivan"
                        ? "bg-[#00E5FF]/25 border-[#00E5FF] text-white shadow-[0_0_15px_#00E5FF]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    🔵 Iván (Código)
                  </button>
                  <button
                    onClick={() => setActiveAssistant("ambos")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      activeAssistant === "ambos"
                        ? "bg-purple-600/35 border-purple-400 text-white shadow-[0_0_15px_#8A2BE2]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    ✨ AMBOS (Dual Core)
                  </button>
                </div>
              </div>

              {/* Console Mode Switch */}
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    activeTab === "chat" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Conversación
                </button>
                <button
                  onClick={() => setActiveTab("arch")}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    activeTab === "arch" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Arquitectura Specs
                </button>
              </div>
            </div>

            {/* Main Console Content */}
            {activeTab === "chat" ? (
              <div
                ref={chatContainerRef}
                className="space-y-4 text-left overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1"
              >
                {/* Active Prompt Bubble */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-900/80 border border-purple-500/50 rounded-2xl rounded-tr-none p-4 text-xs sm:text-sm text-white leading-relaxed max-w-lg shadow-lg">
                    {currentTopic.prompt}
                  </div>
                </div>

                {/* Messages Feed with Custom Painting vs Compiling Effects */}
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "sofia" && (
                      <div className="w-8 h-8 rounded-full bg-[#FF3B5C]/20 border border-[#FF3B5C] flex items-center justify-center text-xs flex-shrink-0 shadow-[0_0_10px_rgba(255,59,92,0.4)]">
                        🔴
                      </div>
                    )}
                    {msg.sender === "ivan" && (
                      <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-xs flex-shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                        🔵
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-purple-900/80 border border-purple-500/50 text-white rounded-tr-none"
                          : msg.sender === "sofia"
                          ? "bg-gradient-to-r from-[#FF3B5C]/10 via-[#FF8800]/10 to-black/60 border border-[#FF3B5C]/40 text-gray-100 rounded-tl-none relative overflow-hidden"
                          : "bg-black/90 border border-[#00E5FF]/40 text-cyan-100 font-mono rounded-tl-none relative overflow-hidden"
                      }`}
                    >
                      {/* SOFÍA (PUNTO 6: EFECTO PINTANDO CON PINCEL) */}
                      {msg.sender === "sofia" && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF3B5C] font-bold mb-1.5">
                          <span>🖌️ SOFÍA • PINTANDO VISIÓN VISUAL & UX</span>
                          <span className="w-2 h-2 rounded-full bg-[#FF8800] animate-ping ml-1 inline-block" />
                        </div>
                      )}

                      {/* IVÁN (PUNTO 6: EFECTO COMPILANDO CÓDIGO) */}
                      {msg.sender === "ivan" && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00E5FF] font-bold mb-1.5">
                          <span>⚡ IVÁN • COMPILANDO ARQUITECTURA CLOUD</span>
                          <span className="w-1.5 h-3 bg-[#00E5FF] animate-pulse inline-block" />
                        </div>
                      )}

                      <p className={msg.sender === "ivan" ? "font-mono tracking-wide text-xs" : "font-sans leading-relaxed"}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 items-center text-xs font-mono text-gray-400 py-1">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                    <span>
                      {isTyping === "sofia"
                        ? "🎨 Sofía está pintando la respuesta..."
                        : isTyping === "ivan"
                        ? "⚡ Iván está compilando la arquitectura..."
                        : "✨ Sofía e Iván están respondiendo en sincronía..."}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs text-left bg-black/70 border border-white/10 p-5 rounded-2xl flex-1 flex flex-col justify-between">
                <div className="flex justify-between border-b border-white/10 pb-2 text-gray-400">
                  <span>ESPECIFICACIÓN TÉCNICA:</span>
                  <span className="text-emerald-400 font-bold">PROTOTIPO OPERATIVO</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Stack Frontend:</span>
                  <span className="text-white">Next.js 16 + React 19 + Tailwind v4</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Base de Datos:</span>
                  <span className="text-[#00E5FF]">PostgreSQL + Supabase Realtime</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>IA Engine:</span>
                  <span className="text-[#8A2BE2]">OpenAI GPT-4o / Claude 3.5 Sonnet</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Despliegue Cloud:</span>
                  <span className="text-[#FF8800]">AWS Serverless + Cloudflare Edge Workers</span>
                </div>
                <div className="flex justify-between text-gray-300 border-t border-white/10 pt-2">
                  <span>Seguridad:</span>
                  <span className="text-emerald-400 font-bold">Cifrado AES-256 / SSL</span>
                </div>
              </div>
            )}

            {/* Interactive Input Form */}
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe a Sofía o Iván... Ej: ¿Cómo diseñan el logo y qué base de datos usan?"
                className="flex-1 pl-4 pr-12 py-3 rounded-full bg-white/[0.06] border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] hover:scale-105 text-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Live App Preview Smartphone Device */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm h-[560px] rounded-[40px] bg-black border-4 border-white/20 shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
              {/* Speaker Notch */}
              <div className="w-24 h-4 bg-white/15 rounded-full mx-auto mb-3" />

              {/* Live Preview Screen */}
              <div className="flex-1 bg-[#090A10] rounded-[28px] p-5 space-y-4 text-left border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-sm font-black text-white block">{currentTopic.mockupData.title}</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {currentTopic.mockupData.liveTag}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-gray-300">
                    LIVE DEMO
                  </span>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Métrica 1</span>
                    <span className="text-xs font-bold text-[#00E5FF]">{currentTopic.mockupData.stats[0]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Métrica 2</span>
                    <span className="text-xs font-bold text-[#FF3B5C]">{currentTopic.mockupData.stats[1]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Métrica 3</span>
                    <span className="text-xs font-bold text-emerald-400">{currentTopic.mockupData.stats[2]}</span>
                  </div>
                </div>

                {/* App Analytics & Live Telemetry Dashboard */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/15 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                      <span className="text-xs text-white font-bold font-mono">Telemetría de la App</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ▲ +34.8% hoy
                    </span>
                  </div>

                  {/* Dynamic Activity Bar Chart with Labels */}
                  <div className="space-y-1">
                    <div className="w-full h-20 flex items-end gap-1.5 pt-2">
                      {[
                        { label: "08:00", h: 45, val: "1.2k" },
                        { label: "11:00", h: 75, val: "2.8k" },
                        { label: "14:00", h: 95, val: "4.1k" },
                        { label: "17:00", h: 80, val: "3.4k" },
                        { label: "20:00", h: 100, val: "5.2k" },
                        { label: "23:00", h: 65, val: "2.1k" },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
                          <div
                            className="w-full rounded-t-md transition-all duration-500 hover:brightness-125"
                            style={{
                              height: `${bar.h}%`,
                              background: i % 2 === 0 
                                ? "linear-gradient(to top, #FF3B5C, #FF8800)" 
                                : "linear-gradient(to top, #00E5FF, #8A2BE2)",
                              boxShadow: i === 4 ? "0 0 12px rgba(0,229,255,0.5)" : "none",
                            }}
                          />
                          <span className="text-[8px] font-mono text-gray-500">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Realtime Live App Activity Feed */}
                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-[10px] font-mono">
                    <div className="flex items-center justify-between text-gray-300 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Transacción procesada
                      </span>
                      <span className="text-emerald-400 font-bold">+$1,450 MXN</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-300 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                        Latencia Edge API
                      </span>
                      <span className="text-[#00E5FF] font-bold">14ms (Cero Lag)</span>
                    </div>
                  </div>
                </div>

                {/* Live Core Badge with Sofia & Ivan Micro-Avatars */}
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[10px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sincronización Dual Core Activa</span>
                    </div>
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-[#FF3B5C] bg-black">
                        <img src="/images/sofia_pink_beanbag.png" alt="S" className="w-full h-full object-contain" />
                      </div>
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-[#00E5FF] bg-black">
                        <img src="/images/ivan_standing_stylus.png" alt="I" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-[9px] leading-tight font-light">
                    Sofía diseña la interfaz fluida mientras Iván asegura la base de datos y APIs.
                  </p>
                </div>

                <div className="pt-0.5 text-center">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    INNOCENTIA LIVE CORE v3.6
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
