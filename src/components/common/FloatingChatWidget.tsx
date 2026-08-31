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
    {
      label: "🎨 Diseñar una marca",
      query: "Quiero diseñar la identidad visual y marca de mi proyecto.",
      sender: "sofia" as const,
    },
    {
      label: "📱 Crear una App Móvil",
      query: "Quiero desarrollar una aplicación móvil para iOS y Android.",
      sender: "ivan" as const,
    },
    {
      label: "🤖 Automatizar con IA",
      query: "¿Cómo puedo integrar agentes de Inteligencia Artificial en mi negocio?",
      sender: "both" as const,
    },
    {
      label: "🌐 Plataforma SaaS Web",
      query: "Necesito una plataforma web escalable en Next.js con pagos y roles.",
      sender: "ivan" as const,
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate AI dual intelligence response
    const lower = text.toLowerCase();
    let respondingPersona: "sofia" | "ivan" | "both" = "both";
    if (lower.includes("diseñ") || lower.includes("marca") || lower.includes("ux") || lower.includes("arte")) {
      respondingPersona = "sofia";
    } else if (lower.includes("app") || lower.includes("código") || lower.includes("api") || lower.includes("base de datos") || lower.includes("backend")) {
      respondingPersona = "ivan";
    }

    setIsTyping(respondingPersona);

    setTimeout(() => {
      setIsTyping(null);
      if (respondingPersona === "sofia") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "sofia",
            text: "¡Me encanta esa visión visual! Diseñaremos un sistema de diseño con micro-interacciones, tipografía memorable y una paleta cromática con identidad única.",
          },
        ]);
      } else if (respondingPersona === "ivan") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ivan",
            text: "Esa arquitectura es sólida. Propongo construirla con Next.js 15, PostgreSQL, endpoints en Server Actions y un pipeline CI/CD de alto rendimiento.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "sofia",
            text: "Primero definiremos el flujo del usuario y el prototipo interactivo para validar la experiencia con tu audiencia.",
          },
          {
            id: (Date.now() + 2).toString(),
            sender: "ivan",
            text: "Y de inmediato yo comenzaré con la infraestructura en la nube, seguridad y bases de datos para entregar en sprints rápidos.",
          },
        ]);
      }
    }, 1200);
  };

  return (
    <>
      {/* ========================================================== */}
      {/* FULL-SCREEN MAXIMIZED CHAT MODAL (Z-[9999]) */}
      {/* ========================================================== */}
      {isOpen && isMaximized && (
        <div className="fixed inset-0 z-[9999] bg-[#020204]/95 backdrop-blur-3xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl h-full max-h-[850px] rounded-[32px] bg-[#07070D] border border-white/20 shadow-[0_0_80px_rgba(255,56,88,0.25)] flex flex-col overflow-hidden text-left relative">
            {/* Top Modal Header */}
            <div className="px-6 py-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/50 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,56,88,0.4)]">
                    <Image
                      src="/images/sofia_pink_beanbag.png"
                      alt="Sofía"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/50 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)]">
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
                  <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase flex items-center gap-2">
                    <span>INNOCENTIA AI DUAL CORE</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      MODO EXTENDIDO
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Sofía (UX & Creatividad) • Iván (Arquitectura & Código)
                  </p>
                </div>
              </div>

              {/* Action Buttons (Minimize / Close) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMaximize}
                  title="Modo Flotante"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  title="Cerrar Chat"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Chips in Maximized View */}
            <div className="px-6 py-2.5 bg-white/[0.01] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono text-gray-500 uppercase flex-shrink-0">
                Sugerencias:
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="px-3.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{q.label}</span>
                </button>
              ))}
            </div>

            {/* Maximized Messages Stream */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender !== "user" && (
                    <div
                      className={`w-9 h-9 rounded-full p-0.5 flex-shrink-0 flex items-center justify-center border ${
                        msg.sender === "sofia"
                          ? "bg-[#FF3858]/20 border-[#FF3858]/60 shadow-[0_0_12px_rgba(255,56,88,0.4)]"
                          : "bg-[#00D1FF]/20 border-[#00D1FF]/60 shadow-[0_0_12px_rgba(0,209,255,0.4)]"
                      }`}
                    >
                      <Image
                        src={
                          msg.sender === "sofia"
                            ? "/images/sofia_pink_beanbag.png"
                            : "/images/ivan_idea_laptop.png"
                        }
                        alt={msg.sender}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] sm:max-w-[65%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white rounded-br-none shadow-[0_5px_20px_rgba(255,56,88,0.3)]"
                        : msg.sender === "sofia"
                        ? "bg-[#FF3858]/10 border border-[#FF3858]/30 text-gray-100 rounded-tl-none shadow-[0_5px_20px_rgba(255,56,88,0.15)]"
                        : "bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-gray-100 rounded-tl-none font-mono shadow-[0_5px_20px_rgba(0,209,255,0.15)]"
                    }`}
                  >
                    {msg.sender !== "user" && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded-full ${
                            msg.sender === "sofia"
                              ? "bg-[#FF3858]/20 text-[#FF3858]"
                              : "bg-[#00D1FF]/20 text-[#00D1FF]"
                          }`}
                        >
                          {msg.sender === "sofia"
                            ? "Sofía • Creatividad & UX"
                            : "Iván • Arquitectura & Dev"}
                        </span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 p-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                  <span>
                    {isTyping === "sofia"
                      ? "Sofía está visualizando la solución..."
                      : isTyping === "ivan"
                      ? "Iván está estructurando el código..."
                      : "Sofía & Iván están sincronizando..."}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 sm:p-6 bg-black/80 border-t border-white/10 space-y-3">
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
                  placeholder="Describe tu idea, requerimientos o preguntas técnicas..."
                  className="flex-1 bg-white/[0.05] border border-white/15 focus:border-[#00D1FF] rounded-full px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_25px_rgba(0,209,255,0.4)] cursor-pointer"
                >
                  <span>Enviar</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Blueprint Action Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs pt-1 gap-2">
                <span className="text-gray-400 font-mono text-center sm:text-left">
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
      {/* CLEAN FLOATING WIDGET (BOTTOM RIGHT - ZERO INVASIVE OVERLAY) */}
      {/* ========================================================== */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none">
        {/* Clean Trigger Pill Button (Peaceful, Elegant, No Spontaneous Overlays) */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMaximized(false);
            }}
            className="group flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#040407]/95 border border-white/20 hover:border-[#00D1FF]/60 shadow-[0_0_25px_rgba(0,209,255,0.35)] backdrop-blur-2xl transition-all hover:scale-105 cursor-pointer relative"
          >
            <div className="flex items-center -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/50 flex items-center justify-center overflow-hidden">
                <Image src="/images/sofia_pink_beanbag.png" alt="S" width={16} height={16} className="object-contain" />
              </div>
              <div className="w-5 h-5 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/50 flex items-center justify-center overflow-hidden">
                <Image src="/images/ivan_standing_stylus.png" alt="I" width={16} height={16} className="object-contain" />
              </div>
            </div>
            <div className="text-left whitespace-nowrap">
              <span className="text-xs font-bold text-white block leading-tight">¿Necesitas ayuda?</span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono">Sofía & Iván</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          </button>
        )}

        {/* Standard Floating Chat Window (Mobile & Desktop Responsive) */}
        {isOpen && !isMaximized && (
          <div className="w-[calc(100vw-32px)] sm:w-[400px] h-[520px] max-h-[80vh] rounded-[28px] sm:rounded-[32px] bg-[#07070D]/98 border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar */}
            <div className="p-3.5 sm:p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
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
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
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
