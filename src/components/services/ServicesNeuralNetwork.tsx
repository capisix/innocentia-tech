"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  Smartphone,
  Globe,
  Zap,
  BarChart3,
  Cloud,
  Network,
  Users,
  ArrowRight,
  Sparkles,
} from "../../lib/icons";
import Image from "next/image";

export default function ServicesNeuralNetwork() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const services = [
    {
      id: "ai",
      title: "Inteligencia Artificial con Propósito",
      subtitle: "Asistentes, Agentes & LLMs",
      desc: "Modelos personalizados de IA para automatización de respuestas, análisis predictivo y agentes autónomos.",
      icon: BrainCircuit,
      color: "#8A2BE2",
      badge: "AGENTES & IA",
    },
    {
      id: "web",
      title: "Plataformas Web Vivas",
      subtitle: "Next.js, React & Cloud Native",
      desc: "Plataformas web de alta velocidad, arquitectura serverless y experiencias interactivas sin fricción.",
      icon: Globe,
      color: "#00E5FF",
      badge: "WEB STUDIO",
    },
    {
      id: "mobile",
      title: "Experiencias Móviles Intuitivas",
      subtitle: "iOS, Android & Multiplataforma",
      desc: "Aplicaciones móviles nativas con Flutter y React Native con diseño de experiencia táctil intuitiva.",
      icon: Smartphone,
      color: "#FF3B5C",
      badge: "MOBILE ENGINE",
    },
    {
      id: "cloud",
      title: "Arquitectura Cloud Escalable",
      subtitle: "AWS, Cloudflare & Serverless",
      desc: "Infraestructura global con escalamiento automático, seguridad antibot y máxima disponibilidad.",
      icon: Cloud,
      color: "#3B82F6",
      badge: "CLOUD INFRA",
    },
    {
      id: "apis",
      title: "Ecosistemas & APIs Conectadas",
      subtitle: "Webhooks & Integraciones",
      desc: "Conexión fluida con sistemas de pago, CRM, WhatsApp, correo y bases de datos relacionales.",
      icon: Network,
      color: "#10B981",
      badge: "CONNECTIVITY",
    },
    {
      id: "dashboards",
      title: "Dashboards que Inspiran Decisiones",
      subtitle: "Telemetría en Tiempo Real",
      desc: "Paneles administrativos interactivos que transforman datos complejos en conocimiento estratégico.",
      icon: BarChart3,
      color: "#F59E0B",
      badge: "DATA VISUALS",
    },
    {
      id: "crm",
      title: "Sistemas de Gestión a Medida",
      subtitle: "CRM, ERP & Cotizadores",
      desc: "Sistemas de administración empresarial a medida para controlar operaciones, ventas y distribuidores.",
      icon: Users,
      color: "#EC4899",
      badge: "ENTERPRISE",
    },
    {
      id: "auto",
      title: "Automatización de Procesos",
      subtitle: "Flujos de Trabajo & Bots",
      desc: "Eliminación de tareas repetitivas mediante bots de software y pipelines de integración continua.",
      icon: Zap,
      color: "#FF8800",
      badge: "WORKFLOWS",
    },
  ];

  return (
    <section id="servicios" className="relative py-20 bg-[#040407] overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#00E5FF] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPACIDADES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              LO QUE SOMOS CAPACES DE CONSTRUIR...
            </h2>
            <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed">
              No ofrecemos un catálogo rígido de servicios. Diseñamos ecosistemas vivos donde la imaginación y la ingeniería convergen.
            </p>
          </div>

          {/* Central Brand Core Badge */}
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/15 rounded-2xl p-4 backdrop-blur-2xl">
            <Image
              src="/images/sofia_ivan_chars.png"
              alt="Innocentia Core"
              width={70}
              height={50}
              className="object-contain filter drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]"
            />
            <div className="text-left">
              <span className="text-xs font-bold font-mono text-white block">INNOCENTIA CORE</span>
              <span className="text-[10px] text-gray-400 font-mono">SOFÍA IMAGINA • IVÁN CONSTRUYE</span>
            </div>
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = activeCategory === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveCategory(service.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="group relative p-7 rounded-[28px] bg-white/[0.02] border border-white/15 hover:border-white/35 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-xl overflow-hidden"
                style={{
                  boxShadow: isHovered ? `0 10px 40px ${service.color}33` : "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Top Corner Glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: service.color }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: `${service.color}25`, color: service.color, border: `1px solid ${service.color}45` }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase"
                      style={{ backgroundColor: `${service.color}15`, color: service.color }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{service.title}</h3>
                    <span className="text-xs font-mono text-gray-400 block pt-0.5">{service.subtitle}</span>
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors uppercase tracking-wider"
                  >
                    <span>Explorar capacidad</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
