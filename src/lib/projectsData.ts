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
  demoUrl?: string;
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
    demoUrl: "https://experiencesafely.com",
    clientProblem: "Los operadores turísticos y de experiencias locales dependían de plataformas intermediarias que cobraban hasta 30% de comisión por boleto, sufrían de sobreventa de cupos por atender en WhatsApp sin sistema y no podían cobrar en dólares a turistas extranjeros de forma segura.",
    solutionOverview: "Innocentia Tech construyó una plataforma propia de reservaciones directas con pasarela de pagos internacional (Stripe), control automático de cupos por horario, boletos digitales con código QR antifraude y concierge de atención rápida.",
    keyFeatures: [
      "Motor de reservaciones instantáneas con selección de fecha, turno y cantidad de boletos.",
      "Generación y entrega automática de pases con Código QR dinámico al correo y WhatsApp.",
      "Pasarela de pago multidivisa (USD / MXN) con Stripe, tarjetas de crédito y Apple Pay.",
      "Lector QR para staff en taquilla que valida y quema boletos en menos de 1 segundo.",
    ],
    costSavings: [
      {
        stat: "0%",
        label: "Comisiones a Terceros",
        description: "Cobro directo y control del 100% de la utilidad de cada boleto vendido.",
      },
      {
        stat: "3 clics",
        label: "Flujo de Compra",
        description: "El turista reserva desde su teléfono en menos de 45 segundos.",
      },
      {
        stat: "100%",
        label: "Cero Fraudes",
        description: "Boletos QR cifrados e irrepetibles que impiden clonaciones o duplicados.",
      },
    ],
    processAutomation: [
      "Confirmación inmediata con envío de voucher PDF y código QR por WhatsApp.",
      "Bloqueo en tiempo real de horarios agotados para evitar sobrecupos.",
      "Liquidación automática de pagos a la cuenta bancaria del operador.",
    ],
    designAdvantages: [
      "Diseño de lujo inmersivo enfocado en turismo internacional y hospitalidad premium.",
      "Optimizado para cargar a máxima velocidad en conexiones móviles de playa o selva.",
      "Totalmente bilingüe (Español / Inglés) con detección automática de idioma.",
    ],
    techStack: ["Next.js 15", "TypeScript", "Stripe API", "QR Dynamic Engine", "PostgreSQL", "Tailwind CSS"],
    metaTitle: "Experience Safely • Motor de Reservas y Boletos QR | Innocentia Tech",
    metaDescription: "Caso de estudio de Experience Safely: plataforma de reservas de tours, cenotes y experiencias VIP con boletos QR y pagos directos operada por Innocentia Tech.",
    keywords: ["sistema de reservas cancun", "venta boletos qr yucatan", "software turismo riviera maya", "plataforma de tours merida"],
    clientIndustry: "Turismo de Experiencias, Hospitalidad & Eventos",
    deliverables: ["Motor de Reservas Web", "Generador de Boletos QR", "Pasarela de Cobro Stripe", "App de Validación en Taquilla"],
  },
  {
    slug: "ikal-chukum",
    id: "chukum",
    title: "Ikal Chukum",
    subtitle: "Solución integral de ventas, cotizaciones en tiempo real y verificación de estatus de entregas en bodega para acabados arquitectónicos en la Península de Yucatán.",
    headline: "Cotizador Inteligente, Control de Bodegas y Automatización de Ventas para Ikal Chukum",
    image: "/images/apps/app_ikalchukum.png",
    tag: "AUMENTO COMPROBADO DE VENTAS",
    stats: "+340% Eficiencia Operativa",
    category: "Construcción & Materiales Arquitectónicos",
    location: "Mérida & Península de Yucatán, México",
    primaryColor: "#E0983A",
    badgeColor: "#E0983A",
    demoUrl: "https://ikalchukum.com",
    clientProblem: "Los asesores comerciales cotizaban de forma manual con tablas de Excel desactualizadas, causando errores en precios y demoras de horas. Además, los clientes llamaban constantemente para saber si su material ya estaba listo en bodega para recolección.",
    solutionOverview: "Diseñamos un cotizador paramétrico automatizado que calcula metros cuadrados, aditivos y flete en segundos, sincronizado con un módulo de verificación de estatus de entregas en bodega que notifica al cliente por WhatsApp cuando su pedido está listo para recolección o despacho.",
    keyFeatures: [
      "Calculadora paramétrica de m² de resina y pasta de chukum con cálculo de rendimiento exacto.",
      "Módulo de Verificación de Estatus de Entregas en Bodega (En preparación, Listo, Despachado).",
      "Generación instantánea de cotizaciones formales en PDF con botón de aprobación por WhatsApp.",
      "Panel de control para inventario de producto terminado en almacén central.",
    ],
    costSavings: [
      {
        stat: "+65%",
        label: "Aumento en Ventas",
        description: "Cotizaciones enviadas en menos de 2 minutos que cierran clientes al momento.",
      },
      {
        stat: "90%",
        label: "Menos Llamadas a Bodega",
        description: "El cliente consulta el estatus de su entrega en vivo mediante su folio.",
      },
      {
        stat: "0",
        label: "Errores de Cálculo",
        description: "Rendimientos y aditivos dosificados automáticamente por el sistema.",
      },
    ],
    processAutomation: [
      "Alerta automática por WhatsApp al cliente cuando bodega marca el pedido como 'Listo para entrega'.",
      "Actualización de stock de sacos de chukum y garrafas de resina por cada pedido aprobado.",
      "Registro de comisiones por asesor de ventas en tiempo real.",
    ],
    designAdvantages: [
      "Paleta visual inspirada en la arquitectura yucateca, tonos tierra y acabados naturales.",
      "Interfaz simplificada para que los bodegueros actualicen el estatus con 1 solo toque en tablet.",
      "Cotizaciones ejecutivas con imagen corporativa de alto prestigio.",
    ],
    techStack: ["Next.js 15", "Node.js", "WhatsApp Business API", "PostgreSQL", "Tailwind CSS"],
    metaTitle: "Ikal Chukum • Cotizador y Control de Bodegas | Innocentia Tech",
    metaDescription: "Caso de éxito de Ikal Chukum: incremento de ventas con cotizador automatizado y verificación de estatus de entregas en bodega desarrollado por Innocentia Tech.",
    keywords: ["software para distribuidoras merida", "sistema de control de bodega yucatan", "cotizador automatizado materiales", "desarrollo web empresas merida"],
    clientIndustry: "Materiales de Construcción & Acabados de Autor",
    deliverables: ["Cotizador Web Inteligente", "Sistema de Verificación de Entregas", "Control de Bodegas en Tiempo Real", "Integración con WhatsApp"],
  },
  {
    slug: "axana",
    id: "axana",
    title: "AXANA NEXT 360",
    subtitle: "Ecosistema Nacional de Salud Empresarial, Salud Ocupacional, Botiquines Industriales NOM-005, DEAs, Normativa NOM-035, Customer Intelligence Matrix y asistente médico con Inteligencia Artificial.",
    headline: "Plataforma Integral de Salud Ocupacional, Botiquines Industriales & E-Commerce B2B",
    image: "/images/apps/app_multisistema.png",
    tag: "ECOSISTEMA DE SALUD EMPRESARIAL",
    stats: "DEMO OFICIAL EN VIVO",
    category: "Salud Empresarial & Suministros Médicos",
    location: "CDMX, Querétaro & Cobertura Nacional",
    primaryColor: "#0056b3",
    badgeColor: "#008b7a",
    demoUrl: "https://multicommerce-omega.vercel.app",
    clientProblem: "La gestión de salud ocupacional y suministro de botiquines normativos NOM-005 y DEAs dependía de procesos manuales dispersos, sin trazabilidad de caducidades ni priorización inteligente de cuentas corporativas.",
    solutionOverview: "Construimos AXANA NEXT 360: una suite B2B híbrida con matriz de Customer Intelligence para priorizar clientes de alto valor, control de 29 sucursales con certificación NOM-035, catálogo interactivo con cotizador por volumen y asistente médico con IA.",
    keyFeatures: [
      "Customer Intelligence Matrix: priorización automática de clientes corporativos según probabilidad de compra.",
      "Control de botiquines industriales NOM-005, gabinetes y monitoreo de caducidad en plantas y sedes.",
      "E-Commerce B2B con cotizador por volumen y solicitud de crédito a 30 días.",
      "Asistente Médico IA especializado en normatividad STPS (NOM-035, NOM-005 y DEAs).",
    ],
    costSavings: [
      {
        stat: "$501K+",
        label: "Ingresos B2B Facturados",
        description: "Monitoreo en tiempo real de facturación y cotizaciones activas.",
      },
      {
        stat: "29 Sedes",
        label: "Plantas con Cobertura",
        description: "Control centralizado de insumos médicos en CDMX, Querétaro y Yucatán.",
      },
      {
        stat: "96.4%",
        label: "Cumplimiento NOM-035",
        description: "Certificaciones y auditorías STPS aprobadas sin retrasos.",
      },
    ],
    processAutomation: [
      "Alertas automáticas de recarga semestral para 140 gabinetes de botiquines en planta.",
      "Priorización inteligente de prospectos según historial y visitas al catálogo.",
      "Generación inmediata de fichas técnicas de DEAs, camillas y botiquines industriales.",
    ],
    designAdvantages: [
      "Interfaz clínica de alta gama en tonos azul médico y turquesa higiénico.",
      "Modo multi-perfil 1-clic para alternar entre CEO, KAM de Ventas, Almacén y Logística.",
      "Propuesta Maestra interactiva de 16 slides integrada en la plataforma.",
    ],
    techStack: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Customer Intelligence Engine"],
    metaTitle: "AXANA NEXT 360 • Ecosistema de Salud Empresarial & Suministros B2B | Innocentia Tech",
    metaDescription: "Caso de estudio AXANA NEXT 360: plataforma de salud ocupacional, botiquines industriales, cumplimiento normativo NOM-035 y Customer Intelligence desarrollada por Innocentia Tech.",
    keywords: ["plataforma salud ocupacional", "botiquines industriales nom-005", "sistema cotizador insumos medicos", "software nom-035 empresas"],
    clientIndustry: "Salud Ocupacional, Insumos Médicos & Seguridad Industrial",
    deliverables: ["Plataforma AXANA NEXT 360", "Customer Intelligence Matrix", "Catálogo B2B con Cotizador", "Asistente Médico IA"],
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
