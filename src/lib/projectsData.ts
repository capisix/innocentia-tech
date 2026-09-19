export interface ProjectCaseStudy {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  image: string;
  tag: string;
  stats: string;
  category: string;
  location: string;
  primaryColor: string;
  badgeColor: string;
  clientProblem: string;
  solutionOverview: string;
  keyFeatures: string[];
  costSavings: {
    stat: string;
    label: string;
    description: string;
  }[];
  processAutomation: string[];
  designAdvantages: string[];
  techStack: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  clientIndustry: string;
  deliverables: string[];
}

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    slug: "multisistema",
    id: "multisistema",
    title: "Multisistema / MultiApp",
    subtitle: "Plataforma multinegocio y multiambiente. Gestiona múltiples giros comerciales desde un único core empresarial cloud.",
    headline: "Ecosistema Multi-Tenant y Panel Administrativo Centralizado",
    image: "/images/apps/app_multisistema.png",
    tag: "ECOSISTEMA MULTIAPP",
    stats: "V2.0 PRO • Cloud",
    category: "Plataformas SaaS Empresariales",
    location: "México / LATAM",
    primaryColor: "#00D1FF",
    badgeColor: "#00D1FF",
    clientProblem: "El cliente administraba 3 empresas con giros comerciales distintos usando hojas de cálculo dispersas y 3 suscripciones SaaS diferentes, lo que generaba duplicidad de costos, pérdida de información y más de 40 horas al mes consolidando reportes.",
    solutionOverview: "Innocentia Tech diseñó una arquitectura Multi-Tenant con un único centro de acceso donde el usuario conmuta de empresa y ambiente en un clic, compartiendo catálogos pero manteniendo contabilidades, roles e inventarios estrictamente independientes.",
    keyFeatures: [
      "Switch instantáneo de ambiente comercial en menos de 0.2 segundos.",
      "Módulos configurables de ventas, compras, finanzas y almacén por empresa.",
      "Panel ejecutivo con métricas consolidadas en tiempo real.",
      "Gestión de permisos y roles granulares por sucursal.",
      "Arquitectura escalable en PostgreSQL con particionamiento de tenants.",
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
      "Alertas automáticas por correo y WhatsApp cuando un producto baja del stock mínimo.",
    ],
    designAdvantages: [
      "Sistema de diseño con paletas cromáticas diferenciadas para que el usuario nunca confunda en qué empresa está operando.",
      "Microinteracciones fluidas a 60 FPS que hacen la carga de datos veloz y sin curva de aprendizaje.",
      "Diseño 100% responsivo para operar en laptops de oficina o celulares en ruta de campo.",
    ],
    techStack: ["Next.js 15", "PostgreSQL Multi-Tenant", "Prisma ORM", "Redis Caching", "Tailwind CSS"],
    metaTitle: "Multisistema • Plataforma Multi-Tenant SaaS & Core Empresarial | Innocentia Tech",
    metaDescription: "Caso de estudio Multisistema: arquitectura multi-tenant para control de múltiples empresas en un solo core cloud. Ahorro de 65% en licencias y sincronización en tiempo real.",
    keywords: ["plataforma multi-tenant", "software empresarial saas", "desarrollo web a medida", "erp multiempresa", "nextjs postgresql saas"],
    clientIndustry: "Corporativos y Grupos Multinegocio",
    deliverables: ["Arquitectura Cloud Multi-Tenant", "Panel de Control Web", "API REST / GraphQL", "Módulo de Reportes Contables"],
  },
  {
    slug: "ikal-chukum",
    id: "ikal",
    title: "Ikal Chukum",
    subtitle: "Panel de operaciones integral con cotizador en tiempo real, inventarios por bodega, alertas de stock y bitácora de pedidos.",
    headline: "Cotizador en Tiempo Real y Panel Operativo en Mérida, Yucatán",
    image: "/images/apps/app_ikalchukum.png",
    tag: "OPERACIONES & CRM",
    stats: "Cotizador en Vivo",
    category: "Automatización & Cotizadores",
    location: "Mérida, Yucatán, México",
    primaryColor: "#F59E0B",
    badgeColor: "#F59E0B",
    clientProblem: "Los asesores comerciales tardaban hasta 4 horas en calcular metros cuadrados de material, fletes foráneos y descuentos para enviar una cotización formal. Se perdían cierres por demora y los errores humanos afectaban el margen comercial.",
    solutionOverview: "Desarrollamos un Cotizador Inteligente en Vivo que calcula m2, rendimiento de materiales, flete por zona geográfica y margen en solo 30 segundos, generando presupuestos oficiales en PDF y sincronizándose con WhatsApp al instante.",
    keyFeatures: [
      "Motor matemático de cálculo de m2 con optimización de mermas y aditivos.",
      "Generador de presupuestos oficiales en PDF con marca de agua y validez jurídica.",
      "Control de inventarios por bodega con alertas automáticas de reabastecimiento.",
      "Bitácora histórica de pedidos y trazabilidad de entregas en ruta.",
      "Conexión directa a WhatsApp Cloud API para envío inmediato de cotizaciones.",
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
      "Generación instantánea de PDF formal listo para firma digital.",
      "Envío automatizado al WhatsApp del cliente con el documento adjunto.",
      "Descuento automático de inventario en bodega al confirmar el anticipo.",
    ],
    designAdvantages: [
      "Panel oscuro de alto contraste que facilita la lectura de números grandes sin fatiga visual.",
      "Formularios inteligentes con sliders táctiles para ajustar metros cuadrados rápidamente frente al cliente.",
      "Diseño móvil optimizado para asesores en obras o visitas a clientes.",
    ],
    techStack: ["Next.js 15", "PostgreSQL", "PDF Engine", "WhatsApp Cloud API", "Tailwind CSS"],
    metaTitle: "Ikal Chukum • Cotizador en Tiempo Real & ERP en Mérida Yucatán | Innocentia Tech",
    metaDescription: "Caso de estudio Ikal Chukum en Mérida Yucatán: cotizador inteligente en tiempo real, reducción de 4 horas a 30 segundos en presupuestos y +38% en ventas.",
    keywords: ["cotizador en tiempo real yucatan", "software a medida merida", "desarrollo de cotizadores mexico", "sistema erp inventarios merida"],
    clientIndustry: "Construcción y Materiales de Alta Gama",
    deliverables: ["Cotizador Web Interactivo", "Generador de Presupuestos PDF", "Control de Bodegas e Inventarios", "Integración WhatsApp"],
  },
  {
    slug: "experience-safely",
    id: "safely",
    title: "Experience Safely",
    subtitle: "Plataforma turística oficial en Yucatán y Riviera Maya con motor de reservas de cenotes, catamaranes y experiencias VIP.",
    headline: "Motor de Reservas Turísticas y Concierge Digital en Riviera Maya",
    image: "/images/apps/app_experiencesafely.png",
    tag: "TURISMO & EXPERIENCIAS",
    stats: "Concierge VIP 24/7",
    category: "Turismo & E-Commerce",
    location: "Riviera Maya & Yucatán, México",
    primaryColor: "#10B981",
    badgeColor: "#10B981",
    clientProblem: "La empresa dependía de intermediarios que cobraban comisiones del 25% al 30% por cada reserva, además de sufrir sobreventas de cupos y falta de cobro en divisas internacionales para turistas extranjeros.",
    solutionOverview: "Creamos una plataforma de reservas directa de alta gama con pasarela de pagos internacional (Stripe), calendario de aforos en tiempo real y emisión de accesos con código QR dinámico antifraude.",
    keyFeatures: [
      "Motor de reservaciones en vivo con control estricto de aforos por horario y experiencia.",
      "Pasarela de cobro internacional multidivisa (USD / MXN / EUR) con Stripe Checkout.",
      "Generador de pases de acceso con código QR dinámico antifraude.",
      "Módulo de Concierge VIP 24/7 para atención personalizada a turistas.",
      "Integración con mapas interactivos y guías de viaje en tiempo real.",
    ],
    costSavings: [
      {
        stat: "70%",
        label: "Ahorro en Comisiones",
        description: "Al vender directamente sin comisiones de intermediarios.",
      },
      {
        stat: "0%",
        label: "Sobreventa de Cupos",
        description: "Bloqueo instantáneo de horarios al alcanzar aforo máximo.",
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
      "Recordatorio automatizado 24 horas antes del tour con geolocalización.",
    ],
    designAdvantages: [
      "Dirección de arte visual inmersiva con fotografía de alta resolución y tonalidades esmeralda/turquesa.",
      "Flujo de compra en solo 3 pasos para maximizar la conversión en dispositivos móviles.",
      "Microanimaciones elegantes que transmiten exclusividad, lujo y seguridad.",
    ],
    techStack: ["Next.js 15", "Stripe Checkout", "PostgreSQL", "QR Security Engine", "Framer Motion"],
    metaTitle: "Experience Safely • Plataforma Turística Riviera Maya & Yucatán | Innocentia Tech",
    metaDescription: "Caso de estudio Experience Safely: motor de reservas para cenotes y tours VIP en Riviera Maya y Yucatán. Pagos Stripe en USD y boletos con QR dinámico.",
    keywords: ["app turismo cenotes riviera maya", "motor de reservas yucatan", "desarrollo web turismo mexico", "sistema de tickets qr"],
    clientIndustry: "Turismo de Lujo y Hospitalidad",
    deliverables: ["Motor de Reservaciones Directas", "Pasarela Multidivisa Stripe", "Sistema de Boletos QR", "Panel de Concierge"],
  },
  {
    slug: "help-2-win",
    id: "help2win",
    title: "Help 2 Win",
    subtitle: "App móvil con autenticación segura, salas interactivas de aprendizaje, documentales en streaming y gestión comunitaria.",
    headline: "App Móvil Nativa de Streaming, Comunidad y Gamificación",
    image: "/images/apps/app_help2win.png",
    tag: "APP MÓVIL & STREAMING",
    stats: "v2.2 Mobile Native",
    category: "Apps Móviles & Streaming",
    location: "México / Global",
    primaryColor: "#8A2BE2",
    badgeColor: "#C084FC",
    clientProblem: "La comunidad de aprendizaje estaba dispersa en redes sociales sin privacidad, sufriendo altos costos de servidores para transmitir videos y sin poder medir el progreso académico real de los usuarios.",
    solutionOverview: "Desarrollamos una App Móvil nativa con salas interactivas de aprendizaje, reproductor de streaming optimizado en la nube (HLS), sistema de gamificación y foros de discusión en tiempo real.",
    keyFeatures: [
      "Reproductor de video HLS con calidad adaptativa según la conexión del usuario.",
      "Salas de estudio interactivas con foros temáticos y preguntas en vivo.",
      "Sistema de gamificación con insignias y desbloqueo de niveles formativos.",
      "Módulo de notificaciones push personalizadas por tema de interés.",
      "Protección de contenido con cifrado para evitar descargas no autorizadas.",
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
      "Sincronización en la nube del progreso del alumno entre múltiples dispositivos.",
    ],
    designAdvantages: [
      "Interfaz cinematográfica 'Dark Mode' que resalta las miniaturas de video.",
      "Navegación táctil fluida tipo feed con transiciones a 60 FPS.",
      "Modo offline para descargar lecciones y verlas sin conexión a internet.",
    ],
    techStack: ["React Native / Expo", "Next.js 15 API", "AWS CloudFront HLS", "PostgreSQL", "WebSockets"],
    metaTitle: "Help 2 Win • App Móvil de Streaming & Educación | Innocentia Tech",
    metaDescription: "Caso de estudio Help 2 Win: app móvil nativa de streaming de video HLS, salas interactivas, gamificación y 90% de ahorro en ancho de banda.",
    keywords: ["desarrollo de apps moviles mexico", "app streaming video flutter react native", "creacion de plataformas educativas", "desarrollo app ios android"],
    clientIndustry: "Educación Digital & Media Streaming",
    deliverables: ["App Móvil iOS y Android", "Arquitectura Streaming HLS", "Panel Administrativo de Alumnos", "Certificaciones Criptográficas"],
  },
];
