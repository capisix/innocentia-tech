"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "../../lib/icons";
import ProjectCaseStudyModal, { ProjectDetail } from "./ProjectCaseStudyModal";

interface CaseStudiesSectionProps {
  onOpenProjectModal?: () => void;
  onOpenChatModal?: () => void;
  onAskSofia?: (projectName: string) => void;
  onAskIvan?: (projectName: string) => void;
}

export default function CaseStudiesSection({
  onOpenProjectModal,
  onOpenChatModal,
  onAskSofia,
  onAskIvan,
}: CaseStudiesSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const projects: (ProjectDetail & {
    stats: string;
    cardBg: string;
    borderColor: string;
    glowColor: string;
    auraColor: string;
    tagBadge: string;
    accentBtn: string;
  })[] = [
    {
      id: "multisistema",
      title: "MULTISISTEMA / MULTIAPP",
      subtitle:
        "Plataforma multinegocio y multiambiente. Selecciona y gestiona múltiples giros comerciales desde un único core empresarial.",
      image: "/images/apps/app_multisistema.png",
      tag: "ECOSISTEMA MULTIAPP",
      stats: "V2.0 PRO • Cloud",
      primaryColor: "#00D1FF",
      badgeColor: "#00D1FF",
      cardBg: "from-[#00D1FF]/15 via-[#00D1FF]/5 to-black/90",
      borderColor: "border-[#00D1FF]/35 hover:border-[#00D1FF]",
      glowColor:
        "shadow-[0_20px_50px_rgba(0,209,255,0.18)] hover:shadow-[0_25px_70px_rgba(0,209,255,0.38)]",
      auraColor: "bg-[#00D1FF]/20",
      tagBadge: "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40",
      accentBtn: "text-[#00D1FF] hover:text-white",

      clientProblem:
        "El cliente administraba 3 empresas con giros distintos usando hojas de cálculo separadas y 3 sistemas SaaS diferentes, lo que generaba duplicidad de costos, pérdida de información y más de 40 horas al mes consolidando reportes.",
      solutionOverview:
        "Innocentia diseñó una arquitectura Multi-Tenant con un único centro de acceso donde el usuario cambia de empresa y ambiente en 1 clic, compartiendo catálogos pero manteniendo contabilidades e inventarios independientes.",
      keyFeatures: [
        "Switch instantáneo de ambiente comercial en menos de 0.2 segundos.",
        "Módulos configurables de ventas, compras, finanzas y almacén por empresa.",
        "Panel ejecutivo con métricas consolidadas en tiempo real.",
        "Gestión de permisos y roles granulares por sucursal.",
      ],
      costSavings: [
        {
          stat: "65%",
          label: "Ahorro en Licencias",
          description: "Eliminación de 3 suscripciones SaaS externas costosas.",
        },
        {
          stat: "40 hrs",
          label: "Ahorro Mensual",
          description: "De trabajo manual consolidando reportes contables.",
        },
        {
          stat: "100%",
          label: "Trazabilidad",
          description: "Cero discrepancias entre compras y stock de almacén.",
        },
      ],
      processAutomation: [
        "Sincronización automática de inventarios entre bodegas centrales y sucursales.",
        "Cierre contable automático al final del día con exportación a Excel y PDF.",
        "Alertas por correo y WhatsApp cuando un producto baja del stock mínimo.",
      ],
      designAdvantages: [
        "Sofía creó un sistema de diseño con paletas cromáticas diferenciadas para que el usuario nunca confunda en qué empresa está operando.",
        "Microinteracciones fluidas a 60fps que hacen la carga de datos veloz y sin curva de aprendizaje.",
        "Diseño 100% responsivo para operar en laptops de oficina o celulares de campo.",
      ],
      techStack: ["Next.js 15", "PostgreSQL Multi-Tenant", "Prisma ORM", "Redis Caching", "Tailwind CSS"],
    },
    {
      id: "ikal",
      title: "IKAL CHUKUM",
      subtitle:
        "Panel de operaciones integral con cotizador en tiempo real, inventarios por bodega, alertas críticas de stock y bitácora de pedidos.",
      image: "/images/apps/app_ikalchukum.png",
      tag: "OPERACIONES & CRM",
      stats: "Cotizador en Vivo",
      primaryColor: "#F59E0B",
      badgeColor: "#F59E0B",
      cardBg: "from-[#F59E0B]/15 via-[#F59E0B]/5 to-black/90",
      borderColor: "border-[#F59E0B]/35 hover:border-[#F59E0B]",
      glowColor:
        "shadow-[0_20px_50px_rgba(245,158,11,0.18)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.38)]",
      auraColor: "bg-[#F59E0B]/20",
      tagBadge: "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40",
      accentBtn: "text-[#F59E0B] hover:text-white",

      clientProblem:
        "Los asesores tardaban hasta 4 horas en calcular m2 de material, flete y descuentos para enviar una cotización formal. Muchas ventas se perdían por demoras y los errores de cálculo provocaban pérdidas de margen.",
      solutionOverview:
        "Desarrollamos un Cotizador Inteligente en Vivo que calcula m2, rendimiento de materiales, flete por zona geográfica y margen comercial en solo 30 segundos, generando el PDF oficial al instante.",
      keyFeatures: [
        "Motor de cálculo de m2 con optimización de mermas y aditivos.",
        "Generador de presupuestos oficiales en PDF con marca de agua y validez.",
        "Control de inventarios por bodega con alertas de reabastecimiento.",
        "Bitácora histórica de pedidos y estatus de entrega en ruta.",
      ],
      costSavings: [
        {
          stat: "85%",
          label: "Reducción de Tiempo",
          description: "De 4 horas de espera por cotización a 30 segundos en vivo.",
        },
        {
          stat: "0%",
          label: "Margen de Error",
          description: "Cálculos matemáticos exactos en m2, fletes y descuentos.",
        },
        {
          stat: "+38%",
          label: "Cierre de Ventas",
          description: "Mayor tasa de conversión al entregar presupuestos al instante.",
        },
      ],
      processAutomation: [
        "Generación automática de PDF con formato oficial listo para firmar.",
        "Envío con un clic directo al WhatsApp del cliente con el PDF adjunto.",
        "Descuento automático de inventario en bodega al momento de confirmar el anticipo.",
      ],
      designAdvantages: [
        "Sofía diseñó un panel oscuro de alto contraste que facilita la lectura de números grandes sin fatiga visual.",
        "Formularios inteligentes con validación inmediata y sliders táctiles para ajustar metros cuadrados rápidamente.",
        "Botones de acción rápida optimizados para que los vendedores coticen desde su celular frente al cliente.",
      ],
      techStack: ["Next.js 15", "PostgreSQL", "PDF Engine", "WhatsApp Cloud API", "Tailwind CSS"],
    },
    {
      id: "safely",
      title: "EXPERIENCE SAFELY",
      subtitle:
        "Plataforma turística oficial en Yucatán y Riviera Maya con motor de reservas de cenotes, catamaranes y eventos VIP exclusivos.",
      image: "/images/apps/app_experiencesafely.png",
      tag: "TURISMO & EXPERIENCIAS",
      stats: "Concierge VIP 24/7",
      primaryColor: "#10B981",
      badgeColor: "#10B981",
      cardBg: "from-[#10B981]/15 via-[#10B981]/5 to-black/90",
      borderColor: "border-[#10B981]/35 hover:border-[#10B981]",
      glowColor:
        "shadow-[0_20px_50px_rgba(16,185,129,0.18)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.38)]",
      auraColor: "bg-[#10B981]/20",
      tagBadge: "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40",
      accentBtn: "text-[#10B981] hover:text-white",

      clientProblem:
        "La empresa dependía de plataformas intermediarias que cobraban comisiones del 25% al 30% por cada reserva, además de sufrir problemas de sobreventa y falta de cobros en dólares para turistas extranjeros.",
      solutionOverview:
        "Creamos una plataforma de reservas directa de alta gama con pasarela de pagos internacional (Stripe), calendario de cupos en tiempo real y confirmación con código QR de acceso.",
      keyFeatures: [
        "Motor de reservaciones en vivo con control estricto de aforos por horario.",
        "Pasarela de cobro internacional multidivisa (USD / MXN / EUR) con Stripe.",
        "Generador de pases de acceso con código QR dinámico antifraude.",
        "Módulo de Concierge VIP 24/7 para atención personalizada a turistas.",
      ],
      costSavings: [
        {
          stat: "70%",
          label: "Ahorro en Comisiones",
          description: "Al vender directamente sin intermediarios turísticos.",
        },
        {
          stat: "0%",
          label: "Sobreventa de Cupos",
          description: "Bloqueo instantáneo de horarios una vez lleno el aforo.",
        },
        {
          stat: "+120%",
          label: "Ingreso Promedio",
          description: "Incremento en ventas de paquetes VIP y tours privados.",
        },
      ],
      processAutomation: [
        "Envío automático del ticket y código QR al correo y WhatsApp del turista.",
        "Lectura rápida de QR en la entrada del cenote o catamarán para validar acceso.",
        "Recordatorio automatizado 24 horas antes del tour con ubicación en Google Maps.",
      ],
      designAdvantages: [
        "Sofía concibió una dirección de arte visual inmersiva con fotografía de alta resolución y colores esmeralda/turquesa que evocan el agua de los cenotes.",
        "Flujo de compra sin fricciones de solo 3 pasos para maximizar la conversión en celulares.",
        "Microanimaciones elegantes que transmiten exclusividad, lujo y seguridad.",
      ],
      techStack: ["Next.js 15", "Stripe Checkout", "PostgreSQL", "QR Security Engine", "Framer Motion"],
    },
    {
      id: "help2win",
      title: "HELP 2 WIN",
      subtitle:
        "App móvil con autenticación segura, salas interactivas de aprendizaje, documentales en streaming y gestión comunitaria.",
      image: "/images/apps/app_help2win.png",
      tag: "APP MÓVIL & STREAMING",
      stats: "v2.2 Mobile Native",
      primaryColor: "#8A2BE2",
      badgeColor: "#C084FC",
      cardBg: "from-[#8A2BE2]/15 via-[#8A2BE2]/5 to-black/90",
      borderColor: "border-[#8A2BE2]/35 hover:border-[#8A2BE2]",
      glowColor:
        "shadow-[0_20px_50px_rgba(138,43,226,0.18)] hover:shadow-[0_25px_70px_rgba(138,43,226,0.38)]",
      auraColor: "bg-[#8A2BE2]/20",
      tagBadge: "bg-[#8A2BE2]/20 text-[#C084FC] border-[#8A2BE2]/40",
      accentBtn: "text-[#C084FC] hover:text-white",

      clientProblem:
        "La comunidad de aprendizaje estaba dispersa en grupos de redes sociales sin privacidad, sufriendo altos costos de servidores para transmitir videos y sin poder medir el progreso real de los estudiantes.",
      solutionOverview:
        "Desarrollamos una App Móvil nativa con salas interactivas de aprendizaje, reproductor de streaming optimizado en la nube (HLS), gamificación y foros de discusión en tiempo real.",
      keyFeatures: [
        "Reproductor de video HLS con calidad adaptativa según la conexión del usuario.",
        "Salas de estudio interactivas con foros temáticos y preguntas en vivo.",
        "Sistema de gamificación con insignias y desbloqueo de niveles educativos.",
        "Módulo de notificaciones push personalizadas por tema de interés.",
      ],
      costSavings: [
        {
          stat: "90%",
          label: "Ahorro en Streaming",
          description: "Mediante compresión adaptativa y distribución en Cloud Edge.",
        },
        {
          stat: "+400%",
          label: "Retención Comunitaria",
          description: "Incremento en horas de estudio y participación en foros.",
        },
        {
          stat: "100%",
          label: "Seguridad de Contenido",
          description: "Protección DRM contra descargas y grabaciones no autorizadas.",
        },
      ],
      processAutomation: [
        "Desbloqueo automático de módulos conforme el alumno concluye lecciones.",
        "Generación automática de certificados digitales con firma criptográfica.",
        "Notificaciones push inteligentes recordando sesiones en vivo y tareas pendientes.",
      ],
      designAdvantages: [
        "Sofía diseñó una experiencia inmersiva modo noche con toques violetas a 60fps pensada para largas sesiones de estudio sin cansancio.",
        "Navegación gestual nativa (swipe) para cambiar de documental o sala de estudio con una sola mano.",
        "Indicadores visuales de progreso y logros que motivan a completar los cursos.",
      ],
      techStack: ["React Native", "Next.js API", "HLS Video Streaming", "PostgreSQL", "WebSockets"],
    },
  ];

  return (
    <>
      <section id="proyectos" className="relative py-24 bg-transparent overflow-hidden border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 relative z-10 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono tracking-wider text-[#FF8800] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CASOS DE ÉXITO &amp; SOFTWARE EN PRODUCCIÓN</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                PROYECTOS QUE GENERAN IMPACTO
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light">
                Haz clic en cualquier proyecto para ver sus características, reducción de costos, automatización y ventajas de diseño.
              </p>
            </div>

            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider group cursor-pointer"
            >
              <span>Crear un nuevo proyecto</span>
              <ArrowRight className="w-4 h-4 text-[#FF3858] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Cards Grid with Rich Visual Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-[32px] bg-gradient-to-b ${project.cardBg} border ${project.borderColor} p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl ${project.glowColor} space-y-5 cursor-pointer`}
              >
                {/* Volumetric Glow */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 ${project.auraColor} rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                {/* Screenshot Container */}
                <div className="w-full h-48 rounded-2xl bg-black/90 border border-white/15 relative overflow-hidden group-hover:border-white/30 transition-all shadow-2xl z-10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${project.tagBadge}`}
                    >
                      {project.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-3 z-10">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-gray-200 font-bold backdrop-blur-md">
                      {project.stats}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 text-left flex-1 relative z-10">
                  <h3 className="text-xl font-extrabold text-white tracking-wide uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold ${project.accentBtn} transition-colors uppercase tracking-wider cursor-pointer`}
                  >
                    <span>Ver caso de estudio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onOpenProjectModal={onOpenProjectModal}
        onAskSofia={onAskSofia}
        onAskIvan={onAskIvan}
      />
    </>
  );
}
