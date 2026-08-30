"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Sparkles, Maximize2, Minimize2, ArrowRight } from "../../lib/icons";
import Image from "next/image";

interface FloatingChatWidgetProps {
  onOpenProjectModal?: () => void;
  isOpenExternal?: boolean;
  isMaximizedExternal?: boolean;
  onCloseExternal?: () => void;
}

export default function FloatingChatWidget({
  onOpenProjectModal,
  isOpenExternal,
  isMaximizedExternal,
  onCloseExternal,
}: FloatingChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState<"sofia" | "ivan" | "both" | null>(null);

  // Synchronize external triggers (e.g. from Hero button)
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (isMaximizedExternal !== undefined) {
      setIsMaximized(isMaximizedExternal);
    }
  }, [isMaximizedExternal]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  // Proactive Spontaneous Idle Balloons (Interacción Viral)
  const [idleStep, setIdleStep] = useState<number>(0);

  useEffect(() => {
    // Balloon 1: Sofía habla a los 4.5 segundos
    const timer1 = setTimeout(() => {
      setIdleStep(1);
    }, 4500);

    // Balloon 2: Iván complementa a los 9.5 segundos
    const timer2 = setTimeout(() => {
      setIdleStep(2);
    }, 9500);

    // Auto-dismiss balloons después de 25 segundos
    const timer3 = setTimeout(() => {
      setIdleStep(0);
    }, 25000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const [messages, setMessages] = useState<
    Array<{ id: string; sender: "user" | "sofia" | "ivan"; text: string }>
  >([
    {
      id: "1",
      sender: "sofia",
      text: "¡Hola! Soy Sofía. Cuéntame qué estás imaginando: diseño de marca, experiencia de usuario o una idea que quieras hacer realidad.",
    },
    {
      id: "2",
      sender: "ivan",
      text: "Y yo soy Iván. Estoy listo para estructurar la arquitectura, definir la base de datos, APIs y el código escalable.",
    },
  ]);

  const quickQuestions = [
    { label: "🎨 Diseñar una marca", query: "Quiero diseñar la identidad visual y branding de mi marca" },
    { label: "📱 Crear una App Móvil", query: "Quiero crear una aplicación móvil para iOS y Android" },
    { label: "🤖 Automatizar con IA", query: "¿Cómo podemos integrar agentes de inteligencia artificial a mi negocio?" },
    { label: "🌐 Plataforma Web SaaS", query: "Necesito una plataforma web escalable y segura" },
    { label: "📊 CRM Empresarial", query: "Queremos implementar un CRM con cotizaciones y control comercial" },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    setInputValue("");
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: query }]);

    const textLower = query.toLowerCase();

    const isDesign =
      textLower.includes("diseño") ||
      textLower.includes("ux") ||
      textLower.includes("ui") ||
      textLower.includes("logo") ||
      textLower.includes("color") ||
      textLower.includes("branding") ||
      textLower.includes("marca") ||
      textLower.includes("arte") ||
      textLower.includes("visual") ||
      textLower.includes("estilo");

    const isTech =
      textLower.includes("software") ||
      textLower.includes("codigo") ||
      textLower.includes("backend") ||
      textLower.includes("database") ||
      textLower.includes("base de datos") ||
      textLower.includes("postgres") ||
      textLower.includes("api") ||
      textLower.includes("cloud") ||
      textLower.includes("servidor") ||
      textLower.includes("seguridad") ||
      textLower.includes("app");

    if (isDesign && !isTech) {
      setIsTyping("sofia");
      setTimeout(() => {
        setIsTyping(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "sofia",
            text: "¡Me fascina esa dirección visual! Vamos a crear una paleta emocional y una experiencia que conecte inmediatamente con tus clientes.",
          },
        ]);
      }, 700);
    } else if (isTech && !isDesign) {
      setIsTyping("ivan");
      setTimeout(() => {
        setIsTyping(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "ivan",
            text: "Perfecto. Diseñaremos una arquitectura cloud multi-tenant con microservicios, seguridad criptográfica y base de datos de alta disponibilidad.",
          },
        ]);
      }, 700);
    } else {
      // Dual response
      setIsTyping("sofia");
      setTimeout(() => {
        setIsTyping(null);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "sofia",
            text: "¡Genial! Primero definimos el viaje del usuario y una interfaz tan fluida que dé gusto usarla.",
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
              text: "Y de inmediato levantamos la infraestructura cloud, APIs y pipelines de automatización con monitoreo 24/7.",
            },
          ]);
        }, 800);
      }, 700);
    }
  };

  return (
    <>
      {/* ========================================================== */}
      {/* MAXIMIZED MODAL OVERLAY BACKDROP (Z-INDEX 9999) */}
      {/* ========================================================== */}
      {isOpen && isMaximized && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 select-none"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-4xl h-[88vh] max-h-[850px] rounded-[36px] bg-[#07070D]/95 border border-white/20 shadow-[0_25px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3858]/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D1FF]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Top Bar (Maximized) */}
            <div className="p-5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center -space-x-3">
                  <div className="relative w-10 h-10 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 p-1 flex items-center justify-center">
                    <Image
                      src="/images/sofia_pink_beanbag.png"
                      alt="Sofía"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-10 h-10 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 p-1 flex items-center justify-center">
                    <Image
                      src="/images/ivan_standing_stylus.png"
                      alt="Iván"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-white tracking-wide uppercase flex items-center gap-2">
                    <span>CHATBOT DUAL CORE</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40">
                      EN VIVO
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    Sofía (Creatividad & UX) + Iván (Ingeniería & Software)
                  </p>
                </div>
              </div>

              {/* Actions: Minimize & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMaximize}
                  title="Minimizar a ventana flotante"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  title="Cerrar"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggested Questions Chips */}
            <div className="px-6 py-2.5 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none relative z-10">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold flex-shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFD166]" />
                Sugerencias:
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00D1FF]/50 text-xs text-gray-200 hover:text-white whitespace-nowrap transition-all flex-shrink-0 cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Message Stream (Maximized) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 relative z-10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white rounded-br-none shadow-lg shadow-[#FF3858]/20"
                        : msg.sender === "sofia"
                        ? "bg-[#FF3858]/10 border border-[#FF3858]/35 text-gray-100 rounded-bl-none shadow-md"
                        : "bg-[#00D1FF]/10 border border-[#00D1FF]/35 text-gray-100 rounded-bl-none shadow-md font-mono"
                    }`}
                  >
                    {msg.sender !== "user" && (
                      <div className="flex items-center gap-1.5 mb-1.5 font-bold font-mono text-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            msg.sender === "sofia" ? "bg-[#FF3858]" : "bg-[#00D1FF]"
                          }`}
                        />
                        <span className={msg.sender === "sofia" ? "text-[#FF3858]" : "text-[#00D1FF]"}>
                          {msg.sender === "sofia" ? "SOFÍA (DISEÑO & UX)" : "IVÁN (SOFTWARE & TECH)"}
                        </span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                  <span>
                    {isTyping === "sofia"
                      ? "Sofía está pintando una respuesta..."
                      : isTyping === "ivan"
                      ? "Iván está compilando la arquitectura..."
                      : "Sofía e Iván están respondiendo..."}
                  </span>
                </div>
              )}
            </div>

            {/* Input Bar (Maximized) */}
            <div className="p-5 bg-white/[0.03] border-t border-white/10 relative z-10 space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pregúntale a Sofía e Iván sobre tu proyecto..."
                  className="flex-1 bg-black/60 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#00D1FF]/60 placeholder-gray-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white hover:scale-105 transition-all shadow-lg shadow-[#00D1FF]/25 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>

              {/* Blueprint Action Banner */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gray-400 font-mono">
                  ¿Listo para formalizar tu idea con un alcance técnico oficial?
                </span>
                <button
                  onClick={() => {
                    handleClose();
                    onOpenProjectModal?.();
                  }}
                  className="text-[#00D1FF] hover:text-white font-bold font-mono uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Generar Blueprint de Proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* STANDARD FLOATING WIDGET (BOTTOM RIGHT) */}
      {/* ========================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
        {/* Proactive Idle Dialogue Balloons with Animated Character Appearances */}
        {!isOpen && idleStep > 0 && (
          <div className="mb-3 flex flex-col items-end space-y-3 max-w-[320px] animate-in fade-in slide-in-from-bottom-3 duration-500">
            {/* Sofía Speaks -> Sofía Character Pops Up on Her Bubble */}
            {idleStep >= 1 && (
              <div
                onClick={() => {
                  setIsOpen(true);
                  setIsMaximized(false);
                  setIdleStep(0);
                }}
                className="group flex items-end gap-2.5 cursor-pointer hover:scale-105 transition-all"
              >
                {/* Sofía Avatar Popup */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/sofia_pink_beanbag.png"
                    alt="Sofía"
                    width={48}
                    height={48}
                    className="object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.8)] animate-bounce"
                  />
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#FFD166] animate-ping" />
                </div>

                {/* Sofía Bubble */}
                <div className="bg-black/95 border border-[#FF3858]/60 rounded-2xl rounded-br-none p-3.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(255,56,88,0.35)] text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF3858] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#FF3858] font-bold">SOFÍA</span>
                  </div>
                  <p className="text-xs text-white font-medium leading-snug">
                    💬 Hola... <br />
                    <strong className="text-[#FF7A00]">¿Qué estás imaginando hoy?</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Iván Speaks -> Iván Character Pops Up on His Bubble */}
            {idleStep >= 2 && (
              <div
                onClick={() => {
                  setIsOpen(true);
                  setIsMaximized(false);
                  setIdleStep(0);
                }}
                className="group flex items-end gap-2.5 cursor-pointer hover:scale-105 transition-all"
              >
                {/* Iván Avatar Popup */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/ivan_idea_laptop.png"
                    alt="Iván"
                    width={48}
                    height={48}
                    className="object-contain filter drop-shadow-[0_0_12px_rgba(0,209,255,0.8)] animate-bounce"
                  />
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                </div>

                {/* Iván Bubble */}
                <div className="bg-black/95 border border-[#00D1FF]/60 rounded-2xl rounded-br-none p-3.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,209,255,0.35)] text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#00D1FF] font-bold">IVÁN</span>
                  </div>
                  <p className="text-xs text-white font-medium leading-snug">
                    ⚡ Si ya tienes una idea, yo puedo ayudarte a construirla.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Clean Trigger Pill Button (Without static character atop) */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMaximized(false);
              setIdleStep(0);
            }}
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#040407]/95 border border-white/20 hover:border-[#00D1FF]/60 shadow-[0_0_30px_rgba(0,209,255,0.35)] backdrop-blur-2xl transition-all hover:scale-105 cursor-pointer relative"
          >
            <div className="text-left whitespace-nowrap">
              <span className="text-xs font-bold text-white block">¿Necesitas ayuda?</span>
              <span className="text-[10px] text-gray-400 font-mono">Sofía & Iván</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          </button>
        )}

        {/* Standard Floating Chat Window (When open but not maximized) */}
        {isOpen && !isMaximized && (
          <div className="w-[360px] sm:w-[400px] h-[540px] rounded-[32px] bg-black/95 border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 p-0.5 flex items-center justify-center">
                    <Image
                      src="/images/sofia_pink_beanbag.png"
                      alt="Sofía"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 p-0.5 flex items-center justify-center">
                    <Image
                      src="/images/ivan_standing_stylus.png"
                      alt="Iván"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white tracking-wide uppercase">
                    SOFÍA & IVÁN DUAL CORE
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] text-emerald-400 font-mono">En Línea</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMaximize}
                  title="Maximizar ventana"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  title="Cerrar"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="px-3 py-2 bg-white/[0.02] border-b border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.slice(0, 3).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0 cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
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
                        {msg.sender === "sofia" ? "SOFÍA (UX/ARTE)" : "IVÁN (TECH/CÓDIGO)"}
                      </span>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5 p-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                  <span>Respondiendo...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregunta sobre diseño o software..."
                className="flex-1 bg-black/60 border border-white/15 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D1FF]/60 placeholder-gray-500"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white hover:scale-105 transition-transform cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
