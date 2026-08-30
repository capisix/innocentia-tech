"use client";

import React, { useState } from "react";
import { Sparkles } from "../../lib/icons";
import Image from "next/image";

export default function AboutUsSection() {
  const [activeTab, setActiveTab] = useState<"manifiesto" | "principios">("manifiesto");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (tab: "manifiesto" | "principios") => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 200);
  };

  const principios = [
    {
      title: "La tecnología al servicio de las personas",
      desc: "Una herramienta tiene valor cuando simplifica una tarea o amplía una capacidad. Si obliga a adaptarse a ella, pierde su propósito.",
      color: "#FF3B5C",
    },
    {
      title: "La imaginación precede a la innovación",
      desc: "Ningún algoritmo ni lenguaje de programación reemplaza el momento en que una persona observa un problema e imagina una solución diferente.",
      color: "#00E5FF",
    },
    {
      title: "Escuchar es el primer acto de diseño",
      desc: "Antes de proponer una solución necesitamos comprender el problema. La mejor tecnología no nace de asumir respuestas, sino de hacer las preguntas correctas.",
      color: "#FF8800",
    },
    {
      title: "La simplicidad demuestra comprensión",
      desc: "Hacer algo complejo es sencillo. Hacerlo simple requiere entender profundamente su funcionamiento. Eliminamos lo innecesario.",
      color: "#8A2BE2",
    },
    {
      title: "La belleza cumple una función",
      desc: "Un diseño bien pensado transmite claridad, confianza y armonía. La estética no es un adorno; es una parte esencial de la experiencia.",
      color: "#10B981",
    },
    {
      title: "Ingeniería con responsabilidad",
      desc: "Programar no consiste únicamente en hacer que algo funcione; consiste en hacerlo sostenible, escalable y preparado para evolucionar.",
      color: "#3B82F6",
    },
  ];

  return (
    <section id="nosotros" className="relative py-16 bg-[#040407] overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-8">
        {/* Navigation Tabs Header */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-xl">
            <button
              onClick={() => handleTabChange("manifiesto")}
              className={`px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "manifiesto"
                  ? "bg-gradient-to-r from-[#FF3B5C] to-[#FF8800] text-white shadow-[0_0_25px_rgba(255,59,92,0.45)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EL MANIFIESTO
            </button>
            <button
              onClick={() => handleTabChange("principios")}
              className={`px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "principios"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white shadow-[0_0_25px_rgba(0,229,255,0.45)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              NUESTROS PRINCIPIOS
            </button>
          </div>
        </div>

        {/* Smooth Container with Fixed Min Height to Prevent Layout Shift Below */}
        <div className="min-h-[440px] flex items-center justify-center transition-all duration-500 ease-in-out">
          <div
            className={`w-full transition-all duration-300 transform ${
              isAnimating ? "opacity-0 scale-98" : "opacity-100 scale-100"
            }`}
          >
            {activeTab === "manifiesto" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Content Card */}
                <div className="lg:col-span-7 bg-white/[0.02] border border-white/15 rounded-[32px] p-8 sm:p-10 backdrop-blur-2xl space-y-5 text-left shadow-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide border-b border-white/10 pb-4">
                      El origen de toda innovación es la imaginación
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      <p>
                        Antes de existir una aplicación, alguien imaginó una mejor forma de conectar a las personas. Antes de existir una inteligencia artificial, alguien se preguntó si era posible construir una herramienta capaz de aprender.
                      </p>
                      <p>
                        Elegimos llamarnos <strong className="text-white font-semibold">Innocentia</strong> no porque la inocencia represente desconocimiento, sino porque simboliza la capacidad de regresar al estado más puro de la creatividad: ese momento donde todavía no existen prejuicios suficientes para limitar una idea.
                      </p>
                      <p>
                        Para nosotros, la tecnología nunca ha sido el punto de partida; es la consecuencia. El software, las aplicaciones y la inteligencia artificial son únicamente herramientas capaces de materializar aquello que primero nació en la imaginación.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center gap-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF3B5C]" />
                      <span className="text-xs font-semibold text-white">Sofía (Imagina)</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
                      <span className="text-xs font-semibold text-white">Iván (Construye)</span>
                    </div>
                  </div>
                </div>

                {/* Right Character Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#FF3B5C]/15 via-purple-950/25 to-[#00E5FF]/15 border border-white/20 rounded-[32px] p-8 backdrop-blur-2xl flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
                  <div className="relative w-full h-56 flex items-center justify-center">
                    <Image
                      src="/images/sofia_ivan_chars.png"
                      alt="Innocentia Characters"
                      width={340}
                      height={240}
                      className="object-contain filter drop-shadow-[0_0_30px_rgba(255,69,0,0.5)] animate-float"
                    />
                  </div>
                  <blockquote className="text-xs font-mono text-gray-200 italic max-w-sm leading-relaxed border-t border-white/10 pt-4">
                    "La imaginación marca el rumbo y la ingeniería construye el camino. Una sin la otra permanece incompleta."
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principios.map((p, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-3xl bg-white/[0.02] border border-white/15 hover:border-white/30 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between text-left shadow-xl"
                  >
                    <div className="space-y-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}
                      >
                        0{idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
