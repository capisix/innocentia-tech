"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      id: "safely",
      title: "EXPERIENCE SAFELY",
      subtitle:
        "Plataforma de reservas de alta gama para cenotes, catamaranes, haciendas y tours VIP en Yucatán y Riviera Maya. Desarrollada y operada por Innocentia Tech.",
      image: "/images/apps/app_experiencesafely.png",
      tag: "CASO INSIGNIA • PROYECTO PROPIO",
      stats: "Operación en Vivo",
      primaryColor: "#10B981",
      badgeColor: "#10B981",
      cardBg: "from-[#10B981]/25 via-[#10B981]/10 to-black/90",
      borderColor: "border-[#10B981]/60 hover:border-[#10B981]",
      glowColor:
        "shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.45)]",
      auraColor: "bg-[#10B981]/30",
      tagBadge: "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50",
      accentBtn: "text-[#10B981] hover:text-white",

      clientProblem:
        "Los operadores turísticos y de experiencias locales dependían de intermediarios que cobraban comisiones de hasta 30% por boleto, sufrían de sobreventas por WhatsApp y no podían cobrar en dólares a turistas extranjeros de forma segura.",
      solutionOverview:
        "Innocentia Tech construyó una plataforma propia de reservaciones directas con pasarela de pagos internacional (Stripe), control automático de cupos por horario, boletos con código QR dinámico y concierge de atención rápida.",
      keyFeatures: [
        "Motor de reservaciones en vivo con aforo automático y bloqueo de fechas agotadas.",
        "Cobros internacionales con tarjeta (USD / MXN / EUR) directamente a la cuenta del negocio.",
        "Emisión automática de boletos digitales con código QR seguro para escanear en taquilla.",
        "Envío instantáneo de confirmación y mapa de llegada directo al WhatsApp del cliente.",
        "Panel de administración para consultar ingresos, validar accesos y gestionar guías.",
      ],
      costSavings: [
        {
          stat: "0%",
          label: "Comisiones a Terceros",
          description: "Ventas 100% directas sin intermediarios turísticos abusivos.",
        },
        {
          stat: "100%",
          label: "Control de Aforo",
          description: "Cero sobreventas de cupos en cenotes o embarcaciones.",
        },
        {
          stat: "+85%",
          label: "Ventas a Extranjeros",
          description: "Facilidad de pago en dólares con tarjeta antes de llegar al destino.",
        },
      ],
      processAutomation: [
        "Generación y envío automático del ticket con código QR al confirmar el pago.",
        "Validación de acceso en menos de 1 segundo escaneando el QR con el celular.",
        "Recordatorios automáticos por WhatsApp con ubicación de Google Maps 24h antes del tour.",
      ],
      designAdvantages: [
        "Diseño visual de lujo inmersivo con fotos de alta resolución que transmiten exclusividad.",
        "Proceso de reserva ultrarrápido en 3 pasos optimizado para celulares de turistas.",
        "Carga instantánea en menos de 0.8 segundos incluso con señal móvil moderada.",
      ],
      techStack: ["Next.js 15", "Stripe Checkout", "PostgreSQL", "QR Security Engine", "WhatsApp Cloud API"],
    },
    {
      id: "axana",
      title: "AXANA • TIENDA & CATÁLOGO",
      subtitle:
        "Tienda digital interactiva y catálogo e-commerce para marcas y comercios locales. Pedidos por WhatsApp y pagos con tarjeta.",
      image: "/images/apps/app_multisistema.png",
      tag: "TIENDA & E-COMMERCE",
      stats: "Catálogo en Vivo",
      primaryColor: "#FF3858",
      badgeColor: "#FF3858",
      cardBg: "from-[#FF3858]/15 via-[#FF3858]/5 to-black/90",
      borderColor: "border-[#FF3858]/35 hover:border-[#FF3858]",
      glowColor:
        "shadow-[0_20px_50px_rgba(255,56,88,0.18)] hover:shadow-[0_25px_70px_rgba(255,56,88,0.38)]",
      auraColor: "bg-[#FF3858]/20",
      tagBadge: "bg-[#FF3858]/20 text-[#FF3858] border-[#FF3858]/40",
      accentBtn: "text-[#FF3858] hover:text-white",

      clientProblem:
        "Las marcas y tiendas locales perdían ventas enviando archivos PDF pesados o fotos desordenadas por chat. No tenían inventario sincronizado y los clientes tardaban en concretar el pago.",
      solutionOverview:
        "Diseñamos una tienda digital de alta velocidad donde el cliente navega productos en una interfaz táctil a 60 FPS, arma su carrito y finaliza la compra pagando en línea o enviando su pedido formateado directo al WhatsApp.",
      keyFeatures: [
        "Catálogo interactivo con fotos en alta definición, filtros rápidos y variantes.",
        "Pasarela de pago con tarjeta integrada o botón de pedido directo a WhatsApp.",
        "Panel de administración para subir productos, cambiar precios y ver pedidos.",
        "Diseño responsive perfecto para navegar y comprar cómodamente desde el celular.",
      ],
      costSavings: [
        {
          stat: "+45%",
          label: "Cierre de Pedidos",
          description: "Proceso de compra fluido sin fricciones ni esperas.",
        },
        {
          stat: "75%",
          label: "Menos Tiempo en Chat",
          description: "El cliente llega con su pedido listo y productos seleccionados.",
        },
        {
          stat: "100%",
          label: "Control de Stock",
          description: "Los productos agotados se ocultan automáticamente.",
        },
      ],
      processAutomation: [
        "Notificación instantánea de nueva compra al WhatsApp y correo del comercio.",
        "Descuento automático de stock de producto al procesar la venta.",
        "Generación de ticket de compra digital para el cliente.",
      ],
      designAdvantages: [
        "Dirección de arte estética que resalta la calidad y prestigio de la marca.",
        "Navegación ultra fluida tipo aplicación móvil sin recargas molestas.",
        "Botones de compra grandes y cómodos para tocar con una sola mano en el celular.",
      ],
      techStack: ["Next.js 15", "PostgreSQL", "Mercado Pago / Stripe", "WhatsApp API", "Tailwind CSS"],
    },
    {
      id: "multisistema",
      title: "MULTISISTEMA EMPRESARIAL",
      subtitle:
        "Panel administrativo para negocios y empresas con múltiples sucursales, control de ventas, compras e inventarios.",
      image: "/images/apps/app_multisistema.png",
      tag: "GESTIÓN EMPRESARIAL",
      stats: "V2.0 Cloud",
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
        "La empresa operaba con hojas de cálculo dispersas y sistemas lentos que provocaban descuadres en almacén, pérdida de tiempo consolidando números y falta de reportes claros.",
      solutionOverview:
        "Creamos un panel centralizado en la nube donde la dirección y los colaboradores registran ventas, controlan almacén por sucursal y consultan ganancias en tiempo real desde cualquier dispositivo.",
      keyFeatures: [
        "Panel con métricas de ventas diarias, ingresos y productos más vendidos.",
        "Control de inventario por sucursal con alertas de poco stock.",
        "Módulos configurables de clientes, facturación y cuentas por cobrar.",
        "Acceso seguro con roles personalizados para administradores y vendedores.",
      ],
      costSavings: [
        {
          stat: "65%",
          label: "Ahorro en Software",
          description: "Sustitución de múltiples suscripciones costosas por un sistema propio.",
        },
        {
          stat: "40 hrs",
          label: "Tiempo Ahorrado",
          description: "Al mes en reportes manuales y conciliaciones.",
        },
        {
          stat: "100%",
          label: "Trazabilidad",
          description: "Control exacto de entradas y salidas de mercancía.",
        },
      ],
      processAutomation: [
        "Reportes ejecutivos automáticos al cierre de cada jornada.",
        "Alertas automáticas por WhatsApp cuando se requiere reabastecer stock.",
        "Cálculo automático de comisiones para el equipo de ventas.",
      ],
      designAdvantages: [
        "Tableros limpios de alto contraste fáciles de leer sin saturación visual.",
        "Flujos de trabajo simplificados para que el personal aprenda a usarlo en 15 minutos.",
        "100% adaptable a computadoras, tablets y celulares.",
      ],
      techStack: ["Next.js 15", "PostgreSQL Multi-Tenant", "Prisma ORM", "Redis Caching", "Tailwind CSS"],
    },
    {
      id: "help2win",
      title: "HELP 2 WIN",
      subtitle:
        "App móvil para comunidades, academias y creadores de contenido. Salas interactivas, cursos en video y notificaciones.",
      image: "/images/apps/app_help2win.png",
      tag: "APP MÓVIL & COMUNIDAD",
      stats: "iOS & Android",
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
        "La academia tenía a sus alumnos dispersos en grupos de redes sociales sin privacidad, sufriendo altos costos de servidores para transmitir videos y sin poder medir el progreso real de los estudiantes.",
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

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00D1FF] hover:text-white uppercase tracking-wider group cursor-pointer"
              >
                <span>Ver Portafolio Completo</span>
                <ArrowRight className="w-4 h-4 text-[#00D1FF] group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={onOpenProjectModal}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider group cursor-pointer"
              >
                <span>Crear un nuevo proyecto</span>
                <ArrowRight className="w-4 h-4 text-[#FF3858] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4 Cards Grid with Rich Visual Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {projects.map((project) => {
              const slugMap: Record<string, string> = {
                safely: "experience-safely",
                axana: "axana",
                multisistema: "multisistema",
                help2win: "help-2-win",
              };
              const projectSlug = slugMap[project.id] || "experience-safely";

              return (
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

                  {/* Action Button & Direct URL Link */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${project.accentBtn} transition-colors uppercase tracking-wider cursor-pointer`}
                    >
                      <span>Detalles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <Link
                      href={`/proyectos/${projectSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] font-mono text-gray-400 hover:text-white uppercase transition-colors px-2 py-1 rounded-md bg-white/5 border border-white/10"
                    >
                      Página →
                    </Link>
                  </div>
                </div>
              );
            })}
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
