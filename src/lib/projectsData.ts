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
  isFlagship?: boolean;
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
    slug: "experience-safely",
    id: "safely",
    title: "Experience Safely",
    subtitle: "Plataforma de reservas de alta gama para cenotes, catamaranes, haciendas y tours VIP en Yucatán y Riviera Maya. Proyecto insignia desarrollado y operado por Innocentia Tech.",
    headline: "Motor de Reservas Turísticas, Boletos con QR y Cobros Directos en Yucatán & Riviera Maya",
    image: "/images/apps/app_experiencesafely.png",
    tag: "PROYECTO OPERADO POR INNOCENTIA TECH",
    stats: "Operación en Vivo 24/7",
    category: "Turismo, Eventos & Experiencias",
    location: "Yucatán & Riviera Maya, México",
    primaryColor: "#10B981",
    badgeColor: "#10B981",
    isFlagship: true,
    clientProblem: "Los operadores turísticos y de experiencias locales dependían de plataformas intermediarias que cobraban hasta 30% de comisión por boleto, sufrían de sobreventa de cupos por atender en WhatsApp sin sistema y no podían cobrar en dólares a turistas extranjeros de forma segura.",
    solutionOverview: "Innocentia Tech construyó una plataforma propia de reservaciones directas con pasarela de pagos internacional (Stripe), control automático de cupos por horario, boletos digitales con código QR antifraude y concierge de atención rápida.",
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
    metaTitle: "Experience Safely • Plataforma Turística & Reservas en Yucatán | Innocentia Tech",
    metaDescription: "Caso insignia Experience Safely: motor de reservas para cenotes y tours VIP en Yucatán y Riviera Maya. Pagos directos en USD y boletos con código QR dinámico.",
    keywords: ["plataforma de reservas turismo yucatan", "app tours cenotes merida", "sistema de tickets qr turismo", "motor de reservas mexico"],
    clientIndustry: "Turismo, Hotelería & Experiencias VIP",
    deliverables: ["Plataforma de Reservas Web", "Pasarela de Pagos Stripe", "Sistema de Validación QR", "Automatización de WhatsApp"],
  },
  {
    slug: "ikal-chukum",
    id: "ikal",
    title: "Ikal Chukum",
    subtitle: "Caso de éxito comprobado: automatización total del sistema comercial con cotizador inteligente en 30s (+38% en ventas) y verificación de estatus de entregas e inventarios en bodega.",
    headline: "Automatización Comercial, Cotizador en Tiempo Real y Verificación de Estatus de Entregas en Bodega",
    image: "/images/apps/app_ikalchukum.png",
    tag: "CASO DE ÉXITO • AUTOMATIZACIÓN TOTAL",
    stats: "+38% Cierre de Ventas",
    category: "Automatización & Logística",
    location: "Mérida, Yucatán, México",
    primaryColor: "#F59E0B",
    badgeColor: "#F59E0B",
    clientProblem: "Los asesores comerciales tardaban hasta 4 horas en calcular metros cuadrados de material, fletes foráneos y mermas para enviar una cotización formal, perdiendo ventas por demora. Además, no existía un sistema confiable para saber en tiempo real el estatus de las entregas en bodega ni la disponibilidad exacta de material.",
    solutionOverview: "Desarrollamos un sistema integral 100% automatizado: 1) Un Cotizador Inteligente en Vivo que calcula m2, rendimiento y fletes en 30 segundos generando el PDF oficial al instante, y 2) Un Módulo de Verificación de Estatus de Entregas y Almacén que rastrea pedidos en ruta, valida salidas de bodega y actualiza el stock en tiempo real.",
    keyFeatures: [
      "Cotizador inteligente que calcula metros cuadrados, aditivos y fletes en menos de 30 segundos.",
      "Generador automático de presupuestos oficiales en PDF con formato formal y validez comercial.",
      "Sistema de Verificación de Estatus de Entregas en Bodega con bitácora de pedidos y confirmación en ruta.",
      "Control de inventarios por bodega con alertas críticas automáticas antes de agotar existencias.",
      "Envío directo de cotizaciones y estatus de pedido al WhatsApp del cliente en 1 clic.",
    ],
    costSavings: [
      {
        stat: "+38%",
        label: "Aumento en Ventas",
        description: "Disparo en la tasa de cierre al entregar cotizaciones al instante.",
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
      "Generación instantánea de presupuestos formales en PDF listos para firma y pago.",
      "Actualización automática del inventario en bodega al momento de confirmar un anticipo.",
      "Módulo de verificación que notifica al cliente y al chofer cuando el pedido sale de bodega a entrega.",
    ],
    designAdvantages: [
      "Panel oscuro de alto contraste diseñado por Sofía para consulta rápida sin fatiga visual.",
      "Sliders táctiles para ajustar metros cuadrados y fletes en segundos desde el celular frente al cliente.",
      "Tablero de estatus de entregas visual (Preparando / En Bodega / En Ruta / Entregado).",
    ],
    techStack: ["Next.js 15", "PostgreSQL", "PDF Engine", "WhatsApp Cloud API", "Tailwind CSS"],
    metaTitle: "Ikal Chukum • Caso de Éxito: Cotizador en Vivo y Control de Bodega | Innocentia Tech",
    metaDescription: "Caso de éxito Ikal Chukum en Mérida Yucatán: aumento de ventas del 38% automatizando cotizaciones de 4h a 30s y sistema de verificación de estatus de entregas en bodega.",
    keywords: ["caso de exito automatizacion ventas", "cotizador en tiempo real yucatan", "sistema entregas bodega merida", "control de inventarios software merida"],
    clientIndustry: "Materiales de Alta Gama, Construcción & Acabados",
    deliverables: ["Cotizador Web Inteligente", "Sistema de Verificación de Entregas", "Control de Bodegas en Tiempo Real", "Integración con WhatsApp"],
  },
  {
    slug: "axana",
    id: "axana",
    title: "Axana",
    subtitle: "Tienda digital interactiva y catálogo e-commerce para marcas locales. Pedidos por WhatsApp, pagos con tarjeta y control de inventarios.",
    headline: "Plataforma E-Commerce & Catálogo Digital con Cierre por WhatsApp",
    image: "/images/apps/app_multisistema.png",
    tag: "TIENDA & E-COMMERCE",
    stats: "Catálogo en Vivo",
    category: "Comercio Local & Tiendas",
    location: "Mérida, Yucatán, México",
    primaryColor: "#FF3858",
    badgeColor: "#FF3858",
    clientProblem: "Las marcas y tiendas locales perdían ventas enviando archivos PDF pesados o fotos desordenadas por chat. No tenían inventario sincronizado y los clientes tardaban en concretar el pago.",
    solutionOverview: "Diseñamos una tienda digital de alta velocidad donde el cliente navega productos en una interfaz táctil a 60 FPS, arma su carrito y finaliza la compra pagando en línea o enviando su pedido formateado directo al WhatsApp de la tienda.",
    keyFeatures: [
      "Catálogo interactivo con fotos en alta definición, filtros rápidos y variantes de producto.",
      "Pasarela de pago con tarjeta integrada o botón de pedido directo a WhatsApp.",
      "Panel de administración para subir productos, cambiar precios y ver pedidos en tiempo real.",
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
    metaTitle: "Axana • Tienda Digital & E-Commerce para Marcas | Innocentia Tech",
    metaDescription: "Caso de estudio Axana: plataforma e-commerce y catálogo interactivo con pedidos automáticos por WhatsApp y pagos en línea para comercios y marcas locales.",
    keywords: ["crear tienda online merida", "catalogo digital whatsapp", "desarrollo ecommerce mexico", "tienda web para marcas"],
    clientIndustry: "Comercio Minorista, Boutiques & Marcas Locales",
    deliverables: ["Tienda Digital E-Commerce", "Pasarela de Pagos", "Conexión a WhatsApp", "Panel Administrativo de Productos"],
  },
  {
    slug: "multisistema",
    id: "multisistema",
    title: "Multisistema Empresarial",
    subtitle: "Panel administrativo integral para negocios y empresas con múltiples sucursales, control de ventas, compras e inventarios.",
    headline: "Sistema de Gestión Comercial y Control Operativo Multi-Sucursal",
    image: "/images/apps/app_multisistema.png",
    tag: "GESTIÓN EMPRESARIAL",
    stats: "V2.0 Cloud",
    category: "Software Administrativo & ERP",
    location: "México / LATAM",
    primaryColor: "#00D1FF",
    badgeColor: "#00D1FF",
    clientProblem: "La empresa operaba con hojas de cálculo dispersas y sistemas lentos que provocaban descuadres en almacén, pérdida de tiempo consolidando números y falta de reportes claros para la toma de decisiones.",
    solutionOverview: "Creamos un panel centralizado en la nube donde la dirección y los colaboradores registran ventas, controlan almacén por sucursal y consultan ganancias en tiempo real desde cualquier dispositivo.",
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
    metaTitle: "Multisistema • Software de Gestión y Control Comercial | Innocentia Tech",
    metaDescription: "Caso de estudio Multisistema: sistema de control comercial, inventarios multi-sucursal y reportes en tiempo real para empresas en crecimiento.",
    keywords: ["software de gestion empresarial", "sistema punto de venta merida", "control de inventarios yucatan", "desarrollo de sistemas a medida"],
    clientIndustry: "Empresas Comerciales, Distribuidoras & Servicios",
    deliverables: ["Panel de Control Administrativo", "Módulo de Inventarios", "Reportes Financieros", "App Web Multi-Dispositivo"],
  },
  {
    slug: "help-2-win",
    id: "help2win",
    title: "Help 2 Win",
    subtitle: "App móvil para comunidades, academias y creadores de contenido. Salas interactivas, cursos en video y notificaciones.",
    headline: "App Móvil de Comunidad, Cursos Digitales y Streaming de Video",
    image: "/images/apps/app_help2win.png",
    tag: "APP MÓVIL & COMUNIDAD",
    stats: "iOS & Android",
    category: "Apps Móviles & Educación",
    location: "México / Global",
    primaryColor: "#8A2BE2",
    badgeColor: "#C084FC",
    clientProblem: "La academia tenía a sus alumnos dispersos en grupos de redes sociales sin privacidad, sufriendo altos costos de servidores para transmitir videos y sin poder medir el progreso real de los estudiantes.",
    solutionOverview: "Desarrollamos una App Móvil nativa para iOS y Android con reproductor de video protegido, salas de discusión temáticas, progreso de alumnos y notificaciones push directas al celular.",
    keyFeatures: [
      "Reproductor de video rápido que se adapta a la velocidad de internet del usuario.",
      "Salas de estudio interactivas con foros temáticos y preguntas en vivo.",
      "Módulo de notificaciones push para avisar de nuevos contenidos o eventos en vivo.",
      "Protección de video para evitar descargas o copias no autorizadas.",
    ],
    costSavings: [
      {
        stat: "90%",
        label: "Ahorro en Servidores",
        description: "Gracias a la compresión inteligente de video en la nube.",
      },
      {
        stat: "+400%",
        label: "Participación",
        description: "Mayor retención y asistencia de alumnos en la aplicación.",
      },
      {
        stat: "100%",
        label: "Protección de Contenido",
        description: "Contenidos exclusivos seguros dentro de la app.",
      },
    ],
    processAutomation: [
      "Desbloqueo automático de lecciones conforme el alumno avanza.",
      "Envío automático de recordatorios push antes de cada transmisión en vivo.",
      "Entrega automática de reconocimientos digitales al terminar un curso.",
    ],
    designAdvantages: [
      "Diseño moderno estilo streaming que hace atractiva la navegación.",
      "Transiciones fluidas que responden al tacto con naturalidad.",
      "Modo oscuro para leer y estudiar cómodamente de noche.",
    ],
    techStack: ["React Native / Expo", "Next.js 15", "AWS CloudFront", "PostgreSQL", "Push Engine"],
    metaTitle: "Help 2 Win • App Móvil de Cursos y Comunidad | Innocentia Tech",
    metaDescription: "Caso de estudio Help 2 Win: app móvil nativa en iOS y Android para academias digitales, streaming de video y comunidades interactivas.",
    keywords: ["desarrollo de apps para academias", "crear app movil ios android mexico", "app de cursos online", "desarrollo react native merida"],
    clientIndustry: "Educación, Academias & Creadores de Contenido",
    deliverables: ["App Móvil iOS y Android", "Plataforma de Streaming", "Panel de Administración", "Notificaciones Push"],
  },
];
