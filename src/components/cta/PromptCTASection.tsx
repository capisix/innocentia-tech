"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare } from "../../lib/icons";
import Image from "next/image";

interface PromptCTASectionProps {
  onOpenProjectModal?: () => void;
}

export default function PromptCTASection({ onOpenProjectModal }: PromptCTASectionProps) {
  const [userPrompt, setUserPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenProjectModal) {
      onOpenProjectModal();
      return;
    }
    const promptText = userPrompt.trim() || "Quiero iniciar un nuevo proyecto con Innocentia";
    setSubmitted(true);

    const encodedMessage = encodeURIComponent(`Hola Innocentia! Me gustaría construir el siguiente proyecto: ${promptText}`);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="cta" className="relative py-24 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="relative rounded-[36px] bg-gradient-to-r from-[#FF3B5C]/15 via-purple-950/30 to-[#00E5FF]/15 border border-white/20 p-8 sm:p-14 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF3B5C]/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00E5FF]/25 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Text */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono tracking-wider text-[#FF8800] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>INICIA TU PROYECTO HOY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                ¿LISTO PARA TRANSFORMAR TU IDEA EN TECNOLOGÍA?
              </h2>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                Cuéntanos tu visión. Sofía (Diseño & UX) e Iván (Ingeniería & Backend) están listos para construir tu arquitectura.
              </p>
            </div>

            {/* Right Input Box & Characters */}
            <div className="lg:col-span-6 space-y-4">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative w-full flex items-center">
                  <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Escribe tu idea aquí... Ej: App de delivery médico con IA"
                    className="w-full pl-6 pr-60 py-5 rounded-full bg-black/90 border border-white/25 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FF3B5C] transition-all shadow-2xl"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF3B5C] to-[#FF8800] hover:from-[#FF4D6D] hover:to-[#FFA000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_#FF3B5C] cursor-pointer hover:scale-105"
                  >
                    <span className="drop-shadow-md">Crear mi proyecto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="w-full p-6 rounded-3xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-sm font-semibold text-center flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-left">¡Idea enviada! Sofía e Iván están procesando tu propuesta en WhatsApp.</span>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase transition-all cursor-pointer border border-emerald-500/40"
                  >
                    Escribir otra idea
                  </button>
                </div>
              )}

              {/* Characters Illustration Badge */}
              <div className="flex items-center justify-between px-4 pt-2">
                <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
                  Conexión directa vía WhatsApp con Sofía e Iván
                </span>

                <div className="relative w-16 h-12 flex-shrink-0">
                  <Image
                    src="/images/sofia_ivan_chars.png"
                    alt="Sofía & Iván"
                    width={70}
                    height={50}
                    className="object-contain filter drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
