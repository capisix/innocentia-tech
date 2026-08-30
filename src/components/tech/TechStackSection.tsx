"use client";

import React, { useState } from "react";
import { Sparkles } from "../../lib/icons";

export default function TechStackSection() {
  const [filter, setFilter] = useState("TODOS");

  const stack = [
    { name: "React / Next.js", category: "FRONTEND", color: "#00E5FF", desc: "Frameworks web de máxima velocidad y renderizado de vanguardia." },
    { name: "Flutter", category: "MOBILE", color: "#3B82F6", desc: "Aplicaciones nativas de alto rendimiento para iOS y Android." },
    { name: "Node.js", category: "BACKEND", color: "#10B981", desc: "Microservicios asíncronos y APIs de baja latencia." },
    { name: "Python", category: "AI & BACKEND", color: "#F59E0B", desc: "Pipelines de ciencia de datos, machine learning e IA avanzada." },
    { name: "Docker", category: "INFRA", color: "#2563EB", desc: "Contenedores y despliegues aislados de alta portabilidad." },
    { name: "OpenAI API", category: "AI CORE", color: "#10B981", desc: "Modelos GPT-4o y procesamiento sintáctico de texto." },
    { name: "Anthropic Claude", category: "AI CORE", color: "#D97706", desc: "Razonamiento lógico complejo y análisis documental masivo." },
    { name: "Google Gemini", category: "AI CORE", color: "#8A2BE2", desc: "Modelos multimodales texto, imagen y código en tiempo real." },
    { name: "Supabase", category: "DATABASE", color: "#059669", desc: "Backend BaaS con PostgreSQL, Auth y Realtime websockets." },
    { name: "PostgreSQL", category: "DATABASE", color: "#3B82F6", desc: "Base de datos relacional indestructible y altamente estructurada." },
    { name: "AWS Cloud", category: "INFRA", color: "#FF8800", desc: "Servidores cloud serverless, almacenamiento S3 y CDN global." },
    { name: "Cloudflare", category: "INFRA", color: "#F97316", desc: "Seguridad DDoS, CDN edge workers y aceleración DNS." },
  ];

  const categories = ["TODOS", "FRONTEND", "MOBILE", "BACKEND", "AI CORE", "DATABASE", "INFRA"];

  const filteredStack = filter === "TODOS" ? stack : stack.filter((s) => s.category === filter);

  return (
    <section id="tech" className="relative py-20 bg-[#040407] overflow-hidden border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#00E5FF] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>TECNOLOGÍA & INFRAESTRUCTURA</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            STACK DE VANGUARDIA
          </h2>

          <p className="text-gray-300 font-light text-base sm:text-lg">
            Seleccionamos las herramientas más potentes del mercado para garantizar escalabilidad y cero deuda técnica.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? "bg-white/20 border border-white/40 text-white shadow-lg"
                  : "bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
          {filteredStack.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/15 hover:border-white/35 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase"
                    style={{ backgroundColor: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{item.name}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
