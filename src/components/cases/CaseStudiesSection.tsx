"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Smartphone,
  CheckCircle2,
  Layers,
  ExternalLink,
} from "../../lib/icons";
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
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [giopranaPreviewTab, setGiopranaPreviewTab] = useState<"split" | "web" | "webapp">("split");

  const handleCreateProject = () => {
    if (onOpenProjectModal) {
      onOpenProjectModal();
    } else {
      router.push("/crear-proyecto");
    }
  };

  const giopranaDetail: ProjectDetail = {
    id: "gioprana",
    title: "GIOPRANA — THE ART OF BEING ALIVE",
    subtitle:
      "Ecosistema integral 360° (Identidad Visual + Sitio Web Editorial Público + WebApp Privada Multi-Rol) donde la página web de captación y la aplicación privada de alumnas y coach operan separadas pero sincronizadas en tiempo real.",
    image: "/images/apps/gioprana_webapp_live.png",
    tag: "PILAR COMERCIAL • WEB PÚBLICA + WEBAPP INTEGRADA",
    primaryColor: "#D5B77B",
    badgeColor: "#D5B77B",
    demoUrl: "https://gleeful-quokka-88fea3.netlify.app/",
    interactiveDemoRoute: "/demo/gioprana",
    dualArchitecture: {
      webTitle: "1. Página Web Editorial Pública (Front-Stage)",
      webDesc:
        "Sitio de marca con 4 atmósferas editoriales, explorador SVG del símbolo, programas, eventos, blog con comentarios y equipamiento.",
      webItems: [
        "Explorador interactivo del símbolo en SVG (6 claves conceptuales)",
        "Programas híbridos ($1,850 / $3,900 / $980 MXN), eventos y blog con comentarios",
        "Catálogo de equipamiento oficial y Kit Visual de Marca desplegable",
      ],
      appTitle: "2. WebApp Privada Independiente (Alumna & Coach)",
      appDesc:
        "Aplicación privada con doble rol (Vista Alumna Valeria R. y Vista Coach Giovanna Monterrubio) conectada en vivo con la web.",
      appItems: [
        "01 · Expediente individual por alumna y evolución en los 5 pilares",
        "02 · Sala de clases En Vivo con cámara/chat + Videoteca On-Demand",
        "03 · Reservas presenciales/online, pagos (Tarjeta/SPEI) y esfera 4·4·6",
      ],
      integrationNote:
        "Las reservas, inscripciones a programas y sesiones completadas se sincronizan automáticamente entre la Web pública y el expediente de cada alumna en la WebApp.",
    },
    clientProblem:
      "Se requería una presencia web editorial de alta gama para presentar la filosofía de GIOPRANA ('Fuerza con Consciencia') y captar inscripciones, pero separada de una WebApp privada donde las alumnas entrenan en vivo, consultan clases grabadas, reservan y llevan su bitácora personal con su coach.",
    solutionOverview:
      "Diseñamos una arquitectura dual integrada: un Sitio Web Editorial público de 4 atmósferas conectado con una WebApp Privada multi-rol (Alumna y Coach Giovanna) con streaming en vivo, videoteca, reservas, pagos y seguimiento por clienta.",
    keyFeatures: [
      "Sitio Web Público + WebApp Privada separados pero sincronizados en tiempo real.",
      "Doble Rol en WebApp: Vista Alumna (práctica, reservas y pagos) y Vista Coach Giovanna (expedientes y seguimiento).",
      "Sala de Transmisión En Vivo con chat interactivo + Videoteca de sesiones anteriores filtrable por pilar.",
      "Motor de reservas (Estudio Presencial y Online) y pasarela de pago (Tarjeta, SPEI y Estudio).",
      "Instrumentos interactivos: esfera de respiración 4·4·6, audio generativo 432 Hz, checklist de hábitos y mural.",
    ],
    costSavings: [
      {
        stat: "2 en 1",
        label: "Web + WebApp Conectadas",
        description: "Sitio público de captación y plataforma privada de alumnas en un mismo ecosistema.",
      },
      {
        stat: "100%",
        label: "Trazabilidad por Alumna",
        description: "Control de sesiones asistidas, videos vistos, pagos y evolución en los 5 pilares.",
      },
      {
        stat: "0%",
        label: "Fricción en Reservas",
        description: "Paso directo desde la web informativa hacia la reserva y pago en la WebApp.",
      },
    ],
    processAutomation: [
      "Sincronización directa entre los botones de reserva/programas de la Web pública y la agenda/checkout de la WebApp.",
      "Suma automática de minutos entrenados y sesiones completadas al expediente de la alumna al terminar un video.",
      "Cambio instantáneo entre Vista Alumna y Vista Coach para revisar bitácoras y acuerdos de entrenamiento.",
    ],
    designAdvantages: [
      "Paleta editorial Carbón (#111416), Marfil (#F4F0E7), Dorado (#D5B77B), Violeta Raíz (#594362) y Verde Bosque (#284E40).",
      "Símbolo vectorial interactivo que ilumina y explica cada elemento al pasar el cursor.",
      "Selector de superficie en la WebApp y diseño enfocado en calma, claridad y presencia.",
    ],
    techStack: [
      "Web + WebApp Dual Engine",
      "Live Streaming & Videoteca",
      "Interactive SVG",
      "Web Audio 432Hz",
      "Netlify Edge",
    ],
  };

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
        "Plataforma de reservas de alta gama para cenotes, catamaranes, haciendas y tours VIP en Yucatán y Riviera Maya. Proyecto desarrollado y operado por Innocentia Tech.",
      image: "/images/apps/app_experiencesafely.png",
      tag: "PROYECTO OPERADO POR INNOCENTIA TECH",
      stats: "Operación en Vivo",
      primaryColor: "#10B981",
      badgeColor: "#10B981",
      demoUrl: "https://experiencesafely.com",
      cardBg: "from-[#10B981]/25 via-[#10B981]/10 to-black/90",
      borderColor: "border-[#10B981]/60 hover:border-[#10B981]",
      glowColor:
        "shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.45)]",
      auraColor: "bg-[#10B981]/30",
      tagBadge: "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50 font-bold",
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
      id: "ikal",
      title: "IKAL CHUKUM",
      subtitle:
        "Caso de éxito comprobado: +38% de incremento en ventas con cotizador inteligente en 30s y sistema de verificación de estatus de entregas e inventarios en bodega.",
      image: "/images/apps/app_ikalchukum.png",
      tag: "CASO DE ÉXITO • AUTOMATIZACIÓN",
      stats: "+38% Cierre de Ventas",
      primaryColor: "#F59E0B",
      badgeColor: "#F59E0B",
      demoUrl: "https://ikalchukum.com",
      cardBg: "from-[#F59E0B]/20 via-[#F59E0B]/5 to-black/90",
      borderColor: "border-[#F59E0B]/40 hover:border-[#F59E0B]",
      glowColor:
        "shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.4)]",
      auraColor: "bg-[#F59E0B]/25",
      tagBadge: "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/50 font-bold",
      accentBtn: "text-[#F59E0B] hover:text-white",

      clientProblem:
        "Los asesores tardaban hasta 4 horas en calcular metros cuadrados, mermas y fletes para enviar una cotización formal, perdiendo cierres frente a la competencia. Además, no había trazabilidad sobre el estatus de las entregas en bodega ni del stock en tiempo real.",
      solutionOverview:
        "Desarrollamos una solución integral 100% automatizada: Cotizador Inteligente que calcula m2 y fletes en 30 segundos emitiendo PDF oficial al instante, más un Módulo de Verificación de Estatus de Entregas que rastrea salidas de bodega y entregas en ruta en vivo.",
      keyFeatures: [
        "Cotizador inteligente que calcula metros cuadrados, aditivos y fletes en 30 segundos.",
        "Generador automático de presupuestos oficiales en PDF con formato formal y validez comercial.",
        "Sistema de Verificación de Estatus de Entregas en Bodega (Preparando / En Bodega / En Ruta / Entregado).",
        "Control de inventarios por bodega con alertas críticas automáticas de reabastecimiento.",
        "Envío directo de cotizaciones y estatus de pedido al WhatsApp del cliente con 1 clic.",
      ],
      costSavings: [
        {
          stat: "+38%",
          label: "Aumento en Ventas",
          description: "Disparo en el cierre de ventas al entregar cotizaciones al instante.",
        },
        {
          stat: "30 seg",
          label: "Tiempo de Cotización",
          description: "Reducción drástica de 4 horas de espera manual a solo 30 segundos.",
        },
        {
          stat: "100%",
          label: "Control de Entregas",
          description: "Verificación exacta del estatus de pedidos y salidas de bodega.",
        },
      ],
      processAutomation: [
        "Generación automática de presupuestos en PDF con formato oficial listo para firmar.",
        "Actualización automática del inventario en bodega al momento de confirmar el anticipo.",
        "Notificación automática al cliente y chofer cuando el material sale de bodega a entrega.",
      ],
      designAdvantages: [
        "Panel oscuro de alto contraste diseñado para consulta rápida y números grandes sin fatiga.",
        "Sliders táctiles para ajustar metros cuadrados y fletes rápidamente frente al cliente en celular.",
        "Tablero de estatus de entregas visual con semáforo de colores por pedido.",
      ],
      techStack: ["Next.js 15", "PostgreSQL", "PDF Engine", "WhatsApp Cloud API", "Tailwind CSS"],
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
      demoUrl: "https://multicommerce-omega.vercel.app",
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
                type="button"
                onClick={handleCreateProject}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider group cursor-pointer"
              >
                <span>Crear un nuevo proyecto</span>
                <ArrowRight className="w-4 h-4 text-[#FF3858] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* =================================================================
              FLAGSHIP SALES PILLAR SHOWCASE: GIOPRANA (WEB PÚBLICA + WEBAPP PRIVADA)
             ================================================================= */}
          <div className="relative rounded-[36px] bg-gradient-to-br from-[#1b1622]/95 via-[#0c0e11]/95 to-[#10211b]/95 border-2 border-[#D5B77B]/60 hover:border-[#D5B77B] p-6 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(213,183,123,0.22)] transition-all duration-500 overflow-hidden backdrop-blur-2xl">
            {/* Ambient Luxury Glows */}
            <div className="absolute -top-28 -left-28 w-96 h-96 bg-[#D5B77B]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-[#594362]/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column (5 Cols): Executive Pitch & Direct Actions */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#D5B77B]/20 border border-[#D5B77B]/60 text-[#D5B77B] text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-[0_0_20px_rgba(213,183,123,0.3)]">
                    ★ CASO INSIGNIA • ECOSISTEMA DUAL 360°
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Web + WebApp en Vivo</span>
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src="/images/branding/gioprana_simbolo.svg"
                    alt="GIOPRANA"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow-[0_0_15px_rgba(213,183,123,0.5)]"
                  />
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-wider uppercase leading-none">
                      GIOPRANA
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-[#D5B77B] tracking-[0.2em] uppercase block mt-1">
                      The Art of Being Alive.
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-[15px] text-gray-200 font-light leading-relaxed">
                  Nuestro modelo estrella de <strong className="text-white font-semibold">Arquitectura Dual Conectada</strong>: combina una <strong className="text-[#D5B77B]">Página Web Editorial Pública</strong> (diseñada para inspirar, posicionar la marca y captar clientes) con una <strong className="text-[#d8b4fe]">WebApp Privada Independiente</strong> donde cada usuaria y la coach gestionan clases en vivo, videoteca on-demand, reservas, pagos y expedientes de seguimiento en tiempo real.
                </p>

                {/* 3 Key Pillars Box */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-black/50 border border-[#D5B77B]/30 text-center space-y-0.5">
                    <span className="text-base sm:text-xl font-black text-[#D5B77B] block">1. Web</span>
                    <span className="text-[10px] font-mono text-gray-300 block">Editorial &amp; SEO</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/50 border border-purple-400/30 text-center space-y-0.5">
                    <span className="text-base sm:text-xl font-black text-purple-300 block">2. WebApp</span>
                    <span className="text-[10px] font-mono text-gray-300 block">Alumna &amp; Coach</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/50 border border-emerald-400/30 text-center space-y-0.5">
                    <span className="text-base sm:text-xl font-black text-emerald-400 block">3. Branding</span>
                    <span className="text-[10px] font-mono text-gray-300 block">Kit 360° &amp; Merch</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://gleeful-quokka-88fea3.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D5B77B] via-[#f3dfb2] to-[#b7883c] text-[#111416] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(213,183,123,0.45)] hover:scale-105 transition-all"
                  >
                    <span>Probar Web + WebApp en Vivo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Link
                    href="/demo/gioprana"
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-[#D5B77B]/50 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <Layers className="w-4 h-4 text-[#D5B77B]" />
                    <span>Simulador Dual →</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(giopranaDetail)}
                    className="px-4 py-3 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/15 text-gray-300 hover:text-[#D5B77B] font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Ficha Técnica &amp; ROI →
                  </button>
                </div>
              </div>

              {/* Right Column (7 Cols): Interactive Dual Stage (Web Pública + WebApp Privada Separated & Integrated) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Interactive Mode Switcher Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-black/60 p-2 rounded-2xl border border-white/15">
                  <span className="text-[11px] font-mono text-gray-300 pl-2 font-semibold">
                    Arquitectura Separada e Integrada:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setGiopranaPreviewTab("split")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        giopranaPreviewTab === "split"
                          ? "bg-[#D5B77B] text-[#111416]"
                          : "text-gray-400 hover:text-white bg-white/5"
                      }`}
                    >
                      ⚡ Vista Conectada (Web + App)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiopranaPreviewTab("web")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        giopranaPreviewTab === "web"
                          ? "bg-[#D5B77B] text-[#111416]"
                          : "text-gray-400 hover:text-white bg-white/5"
                      }`}
                    >
                      🌐 1. Sitio Web Público
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiopranaPreviewTab("webapp")}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        giopranaPreviewTab === "webapp"
                          ? "bg-[#594362] text-white border border-[#D5B77B]/50"
                          : "text-gray-400 hover:text-white bg-white/5"
                      }`}
                    >
                      📱 2. WebApp Privada
                    </button>
                  </div>
                </div>

                {/* SPLIT VIEW: Shows Web Pública on Left + Real-time Bridge + WebApp Privada on Right */}
                {giopranaPreviewTab === "split" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    {/* Card 1: Sitio Web Editorial Público */}
                    <div className="rounded-3xl bg-[#0e1113] border border-[#D5B77B]/45 p-4 flex flex-col justify-between space-y-3.5 text-left shadow-xl relative overflow-hidden group">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-[#D5B77B]/20 border border-[#D5B77B]/50 text-[#D5B77B] text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                            <Globe className="w-3 h-3" />
                            <span>1. SITIO WEB PÚBLICO</span>
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">Front-Stage</span>
                        </div>

                        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/15">
                          <Image
                            src="/images/apps/gioprana_webapp_live.png"
                            alt="GIOPRANA Sitio Web Editorial"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-white bg-black/75 px-2.5 py-0.5 rounded-md border border-[#D5B77B]/40">
                              Fuerza con Consciencia
                            </span>
                            <span className="text-[9px] font-mono text-[#D5B77B] bg-black/80 px-2 py-0.5 rounded">
                              4 Fondos Editoriales
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-sm font-black text-white uppercase">
                            Captación, Storytelling &amp; Programas
                          </h4>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-gray-300">
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Símbolo SVG Interactivo
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Los 5 Pilares &amp; Método
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Programas &amp; Eventos
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Blog + Comentarios
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-400">🔗 Envía reservas a la App</span>
                        <a
                          href="https://gleeful-quokka-88fea3.netlify.app/#inicio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D5B77B] hover:underline font-bold"
                        >
                          Ver Web ↗
                        </a>
                      </div>
                    </div>

                    {/* Card 2: WebApp Privada (Alumna / Coach) */}
                    <div className="rounded-3xl bg-[#120f18] border border-purple-400/45 p-4 flex flex-col justify-between space-y-3.5 text-left shadow-xl relative overflow-hidden">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/50 text-purple-200 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                            <Smartphone className="w-3 h-3 text-[#D5B77B]" />
                            <span>2. WEBAPP PRIVADA</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[9px] font-mono font-bold">
                            ● LIVE &amp; ON-DEMAND
                          </span>
                        </div>

                        {/* Interactive UI Preview of the Private WebApp */}
                        <div className="p-3 rounded-2xl bg-[#090b0d] border border-white/15 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <div>
                              <span className="text-[9px] font-mono text-[#D5B77B] uppercase block font-bold">
                                DOBLE ROL INTERACTIVO
                              </span>
                              <strong className="text-xs text-white">
                                Vista Alumna (Valeria) ⇄ Coach (Giovanna)
                              </strong>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                              Al corriente ✓
                            </span>
                          </div>

                          {/* Simulated Pillar Bars from the WebApp */}
                          <div className="space-y-1.5">
                            {[
                              { label: "01 · Seguimiento & Expediente Individual", pct: "88%", color: "#D5B77B" },
                              { label: "02 · Sala En Vivo + Videoteca Grabada", pct: "34 en vivo", color: "#9C75AF" },
                              { label: "03 · Reservas Estudio / Online & Pagos", pct: "SPEI / TDC", color: "#284E40" },
                            ].map((row, idx) => (
                              <div
                                key={idx}
                                className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-between text-[10px] font-mono"
                              >
                                <span className="text-gray-200 truncate pr-2">{row.label}</span>
                                <span className="text-[#D5B77B] font-bold shrink-0">{row.pct}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-sm font-black text-white uppercase">
                            Operación, Retención &amp; Comunidad
                          </h4>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-gray-300">
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Expediente por Clienta
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Streaming + Videoteca
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Pasarela &amp; Recibos
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                              ✦ Esfera 4·4·6 &amp; 432 Hz
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-purple-300">🧘🏻‍♀️ 5 Alumnas en Seguimiento</span>
                        <Link
                          href="/demo/gioprana"
                          className="text-[#D5B77B] hover:underline font-bold"
                        >
                          Abrir Simulador →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {giopranaPreviewTab === "web" && (
                  <div className="rounded-3xl bg-[#0e1113] border border-[#D5B77B]/50 p-5 space-y-4 text-left">
                    <div className="relative h-64 rounded-2xl overflow-hidden border border-white/15">
                      <Image
                        src="/images/apps/app_gioprana.jpg"
                        alt="Kit Visual Web GIOPRANA"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-black text-white">
                          Sistema de Diseño &amp; Página Web Editorial Pública
                        </h4>
                        <p className="text-xs text-gray-300">
                          4 fondos atmosféricos, paleta calibrada, explorador del símbolo en SVG, programas, eventos y tienda de equipamiento.
                        </p>
                      </div>
                      <a
                        href="https://gleeful-quokka-88fea3.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#D5B77B] text-[#111416] font-mono font-bold text-xs uppercase"
                      >
                        Abrir Web en Vivo ↗
                      </a>
                    </div>
                  </div>
                )}

                {giopranaPreviewTab === "webapp" && (
                  <div className="rounded-3xl bg-[#120f18] border border-purple-400/50 p-5 space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="relative h-56 rounded-2xl overflow-hidden border border-white/15">
                        <Image
                          src="/images/apps/gioprana_clases.jpg"
                          alt="WebApp Privada GIOPRANA"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-red-500/80 text-white text-[10px] font-mono font-bold">
                          ● SALA EN VIVO &amp; VIDEOTECA ON-DEMAND
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs text-gray-200">
                        <span className="text-[10px] font-mono font-bold text-[#D5B77B] uppercase block">
                          MÓDULOS INTERNOS DE LA WEBAPP PRIVADA
                        </span>
                        <p className="text-gray-300 leading-relaxed">
                          Al hacer clic en <strong>&ldquo;RESERVA / WEBAPP&rdquo;</strong> en la página, la usuaria entra a su aplicación privada con cambio de rol entre <strong>Vista Alumna</strong> y <strong>Vista Coach Giovanna</strong>:
                        </p>
                        <ul className="space-y-1.5 font-mono text-[11px]">
                          <li>✓ 01 · Expediente Individual &amp; Bitácora por Alumna</li>
                          <li>✓ 02 · Transmisión En Vivo con Cámara &amp; Videoteca</li>
                          <li>✓ 03 · Calendario de Reservas (Estudio &amp; Online)</li>
                          <li>✓ 04 · Pasarela de Pagos (Tarjeta, SPEI y Recibos)</li>
                          <li>✓ 05 · Esfera de Respiración 4·4·6 &amp; Audio 432 Hz</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Strip: Branding & Merchandising Deliverables */}
                <div className="grid grid-cols-4 gap-2.5 pt-1">
                  {[
                    { img: "/images/branding/gioprana_logo_3d_estudio.png", label: "Logo 3D Estudio" },
                    { img: "/images/branding/gioprana_botella_bosque.png", label: "Termo Bosque" },
                    { img: "/images/branding/gioprana_tapete_bosque.png", label: "Tapete Grabado" },
                    { img: "/images/branding/gioprana_app_9.png", label: "Tarjeta Marfil & Oro" },
                  ].map((asset, idx) => (
                    <Link
                      key={idx}
                      href="/demo/gioprana"
                      className="group relative h-16 sm:h-20 rounded-2xl overflow-hidden border border-white/15 hover:border-[#D5B77B] transition-all"
                    >
                      <Image
                        src={asset.img}
                        alt={asset.label}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-[9px] sm:text-[10px] font-mono font-bold text-white truncate">
                        {asset.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Cards Grid with Rich Visual Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {projects.map((project) => {
              const slugMap: Record<string, string> = {
                gioprana: "gioprana",
                safely: "experience-safely",
                ikal: "ikal-chukum",
                axana: "axana",
                multisistema: "multisistema",
                help2win: "help-2-win",
                tacoslarry: "tacos-larry",
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
