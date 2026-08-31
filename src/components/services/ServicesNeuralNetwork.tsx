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
import CapabilityDetailModal, { CapabilityItem } from "./CapabilityDetailModal";

interface ServicesNeuralNetworkProps {
  onOpenProjectModal?: () => void;
}

export default function ServicesNeuralNetwork({ onOpenProjectModal }: ServicesNeuralNetworkProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);

  const services: CapabilityItem[] = [
    {
      id: "ai",
      title: "Inteligencia Artificial con Propósito",
      subtitle: "Asistentes, Agentes & LLMs",
      desc: "Modelos personalizados de IA para automatización de respuestas, análisis predictivo y agentes autónomos.",
      icon: BrainCircuit,
      color: "#8A2BE2",
      badge: "AGENTES & IA",
      sofiaInsight: "Diseñamos la personalidad del agente, la fluidez conversacional y una interfaz intuitiva para que los usuarios sientan una interacción natural, empática y memorable.",
      ivanInsight: "Implementamos RAG vectorial con embeddings, orquestación de agentes con LangChain/LlamaIndex, guardrails de seguridad y optimización de tokens para latencia mínima.",
      keyDeliverables: [
        "Chatbots inteligentes en web y WhatsApp",
        "Sistemas RAG conectados a tus documentos",
        "Automatización de soporte 24/7 sin errores",
        "Análisis semántico y reportes predictivos"
      ],
      recommendedStack: ["OpenAI / Anthropic", "LangChain", "Pinecone", "Python", "FastAPI"]
    },
    {
      id: "web",
      title: "Plataformas Web Vivas",
      subtitle: "Next.js, React & Cloud Native",
      desc: "Plataformas web de alta velocidad, arquitectura serverless y experiencias interactivas sin fricción.",
      icon: Globe,
      color: "#00E5FF",
      badge: "WEB STUDIO",
      sofiaInsight: "Creamos experiencias visuales inmersivas a 60fps, microanimaciones fluidas, tipografías con carácter y diseño responsive de alta gama que cautiva desde el primer segundo.",
      ivanInsight: "Arquitectura Serverless y Edge Rendering con Next.js 15, optimización Core Web Vitals 100/100, pipelines de CI/CD automatizados y bases de datos distribuidas con réplicas de lectura.",
      keyDeliverables: [
        "Portales Web y SaaS de alto rendimiento",
        "Paneles de administración y dashboards",
        "E-commerce con pasarelas de pago globales",
        "Arquitectura Cloud escalable a millones de visitas"
      ],
      recommendedStack: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "Vercel / AWS"]
    },
    {
      id: "mobile",
      title: "Experiencias Móviles Intuitivas",
      subtitle: "iOS, Android & Multiplataforma",
      desc: "Aplicaciones móviles nativas con Flutter y React Native con diseño de experiencia táctil intuitiva.",
      icon: Smartphone,
      color: "#FF3B5C",
      badge: "MOBILE ENGINE",
      sofiaInsight: "Construimos flujos de navegación táctil diseñados con ergonomía para el pulgar, retroalimentación háptica, modo oscuro dinámico y transiciones orgánicas nativas.",
      ivanInsight: "Desarrollo en Flutter y React Native con soporte Offline-First, sincronización en segundo plano con SQLite/WatermelonDB, notificaciones Push segmentadas y cifrado biométrico.",
      keyDeliverables: [
        "Apps nativas publicadas en App Store y Google Play",
        "Sincronización sin conexión a internet (Offline First)",
        "Integración con cámaras, sensores y biometría",
        "Notificaciones Push inteligentes en tiempo real"
      ],
      recommendedStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"]
    },
    {
      id: "cloud",
      title: "Arquitectura Cloud Escalable",
      subtitle: "AWS, Cloudflare & Serverless",
      desc: "Infraestructura global con escalamiento automático, seguridad antibot y máxima disponibilidad.",
      icon: Cloud,
      color: "#3B82F6",
      badge: "CLOUD INFRA",
      sofiaInsight: "Monitoreo visual intuitivo y alertas en tiempo real diseñadas para que los directores de tecnología comprendan el estado de su infraestructura sin fricción técnica.",
      ivanInsight: "Infraestructura como Código (IaC) con Terraform/Docker, balanceadores de carga globales, protección Cloudflare WAF, backups automáticos multi-región y SLA 99.99%.",
      keyDeliverables: [
        "Configuración de clusters Kubernetes / Docker",
        "Políticas de Auto-Scaling y protección DDoS",
        "Redundancia geográfica y recuperación ante desastres",
        "Reducción de costos de servidores hasta un 60%"
      ],
      recommendedStack: ["AWS", "Google Cloud", "Cloudflare", "Docker", "Terraform"]
    },
    {
      id: "apis",
      title: "Ecosistemas & APIs Conectadas",
      subtitle: "Webhooks & Integraciones",
      desc: "Conexión fluida con sistemas de pago, CRM, WhatsApp, correo y bases de datos relacionales.",
      icon: Network,
      color: "#10B981",
      badge: "CONNECTIVITY",
      sofiaInsight: "Documentación interactiva y diagramas de flujo claros para que desarrolladores y clientes visualicen exactamente cómo viajan sus datos entre plataformas.",
      ivanInsight: "APIs RESTful y GraphQL con rate limiting, autenticación OAuth2 / JWT, colas de mensajes con Redis/RabbitMQ y webhooks resilientes con reintentos automáticos.",
      keyDeliverables: [
        "Integración con Stripe, Mercado Pago y PayPal",
        "Conexión con WhatsApp Business Cloud API",
        "Sincronización bidireccional con CRMs y ERPs",
        "Middleware para unificar sistemas heredados"
      ],
      recommendedStack: ["Node.js", "Go", "GraphQL", "Redis", "PostgreSQL"]
    },
    {
      id: "dashboards",
      title: "Dashboards que Inspiran Decisiones",
      subtitle: "Telemetría en Tiempo Real",
      desc: "Paneles administrativos interactivos que transforman datos complejos en conocimiento estratégico.",
      icon: BarChart3,
      color: "#F59E0B",
      badge: "DATA VISUALS",
      sofiaInsight: "Jerarquía de información visual de precisión, paletas neón de alto contraste y gráficos interactivos que facilitan la toma de decisiones ejecutivas al instante.",
      ivanInsight: "Procesamiento de flujos de datos en tiempo real con WebSockets y ClickHouse, agregaciones en memoria y exportación instantánea a PDF/Excel con firmas digitales.",
      keyDeliverables: [
        "Métricas financieras y KPIs en tiempo real",
        "Alertas automáticas por anomalías en ventas",
        "Filtros multidimensionales y analítica avanzada",
        "Acceso seguro con roles y permisos jerárquicos"
      ],
      recommendedStack: ["ClickHouse", "Chart.js / Recharts", "WebSockets", "Supabase", "Next.js"]
    },
    {
      id: "crm",
      title: "Sistemas de Gestión a Medida",
      subtitle: "CRM, ERP & Cotizadores",
      desc: "Sistemas de administración empresarial a medida para controlar operaciones, ventas y distribuidores.",
      icon: Users,
      color: "#EC4899",
      badge: "ENTERPRISE",
      sofiaInsight: "Eliminamos las pantallas aburridas de los ERPs tradicionales creando interfaces limpias, tableros Kanban intuitivos y formularios asistidos que aceleran el trabajo del equipo.",
      ivanInsight: "Modelado relacional ACID en PostgreSQL, control de auditoría de cambios en cada registro, motores de cotización en tiempo real y facturación electrónica automatizada.",
      keyDeliverables: [
        "Cotizadores automáticos con cálculo de márgenes y fletes",
        "Gestión de inventarios multisede en tiempo real",
        "Módulos de comisiones y seguimiento de agentes",
        "Generador de presupuestos en PDF con marca de agua"
      ],
      recommendedStack: ["PostgreSQL", "Prisma ORM", "Next.js 15", "PDF Engine", "WhatsApp Cloud"]
    },
    {
      id: "auto",
      title: "Automatización de Procesos",
      subtitle: "Flujos de Trabajo & Bots",
      desc: "Eliminación de tareas repetitivas mediante bots de software y pipelines de integración continua.",
      icon: Zap,
      color: "#FF8800",
      badge: "WORKFLOWS",
      sofiaInsight: "Mapeo visual de los procesos humanos del negocio para identificar cuellos de botella y diseñar la transición a flujos automáticos sin resistencia operativa.",
      ivanInsight: "Pipelines de eventos desacoplados, webhooks reactivos, scripts de sincronización idempotentes y alertas inmediatas ante fallos para asegurar 100% de confiabilidad.",
      keyDeliverables: [
        "Ahorro de hasta 25 horas semanales por empleado",
        "Notificaciones y alertas automatizadas a clientes",
        "Sincronización automática de inventario y pedidos",
        "Generación automática de contratos y reportes"
      ],
      recommendedStack: ["Temporal.io", "Python", "Node.js", "Redis Queues", "Webhook Engine"]
    },
  ];

  return (
    <section id="servicios" className="relative py-20 bg-[#040407] overflow-hidden border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#00E5FF] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPACIDADES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              LO QUE SOMOS CAPACES DE CONSTRUIR...
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg font-light leading-relaxed">
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
                onClick={() => setSelectedCapability(service)}
                onMouseEnter={() => setActiveCategory(service.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="group relative p-6 sm:p-7 rounded-[28px] bg-white/[0.02] border border-white/15 hover:border-white/35 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-xl overflow-hidden cursor-pointer"
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCapability(service);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>Explorar capacidad</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Capability Detail Modal */}
      <CapabilityDetailModal
        capability={selectedCapability}
        isOpen={Boolean(selectedCapability)}
        onClose={() => setSelectedCapability(null)}
        onOpenProjectModal={() => {
          setSelectedCapability(null);
          onOpenProjectModal?.();
        }}
      />
    </section>
  );
}
