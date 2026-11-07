export interface DualArchitectureSpec {
  badge: string;
  summary: string;
  webPart: {
    title: string;
    subtitle: string;
    url: string;
    image: string;
    highlights: string[];
  };
  appPart: {
    title: string;
    subtitle: string;
    url: string;
    image: string;
    roles: string[];
    highlights: string[];
  };
  integrationBridges: {
    title: string;
    description: string;
  }[];
}

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
  interactiveDemoRoute?: string;
  dualArchitecture?: DualArchitectureSpec;
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
    slug: "gioprana",
    id: "gioprana",
    title: "GIOPRANA • Web & WebApp",
    subtitle:
      "Ecosistema dual integrado para Giovanna Monterrubio: Sitio Web Editorial de lujo (historia, símbolo interactivo, programas, eventos, blog con comentarios y equipamiento) conectado en tiempo real con su WebApp Privada independiente para seguimiento de alumnas, clases en vivo, videoteca on-demand, reservas y pagos.",
    headline:
      "GIOPRANA — The Art of Being Alive: Sitio Web Editorial + WebApp Privada de Práctica y Seguimiento en Tiempo Real",
    image: "/images/apps/app_gioprana.jpg",
    tag: "WEB PÚBLICA + WEBAPP PRIVADA INTEGRADA",
    stats: "Web + App en Vivo",
    category: "Wellness, Fitness, Streaming & SaaS Educativo",
    location: "Mérida, Yucatán & Comunidad Online",
    primaryColor: "#D5B77B",
    badgeColor: "#9C75AF",
    isFlagship: true,
    demoUrl: "https://gleeful-quokka-88fea3.netlify.app/",
    interactiveDemoRoute: "/demo/gioprana",
    dualArchitecture: {
      badge: "ARQUITECTURA DUAL • SITIO WEB + WEBAPP SEPARADOS QUE SE INTEGRAN",
      summary:
        "Diseñamos dos plataformas con responsabilidades claras pero conectadas por un mismo núcleo de datos: una Página Web Editorial pública orientada a inspirar, contar la historia de la marca y captar inscripciones, y una WebApp Privada independiente donde cada alumna entrena en vivo, consulta su videoteca y lleva su expediente personal junto con su coach Giovanna.",
      webPart: {
        title: "1. Sitio Web Informativo & Editorial (Front-Stage Público)",
        subtitle: "Captación, Storytelling, Programas, Eventos, Blog Interactivo & Tienda de Equipamiento",
        url: "https://gleeful-quokka-88fea3.netlify.app/#inicio",
        image: "/images/apps/app_gioprana.jpg",
        highlights: [
          "Dirección de arte en 4 atmósferas (Carbón #111416, Marfil Editorial #F4F0E7, Verde Bosque #284E40 y Dorado #D5B77B).",
          "Explorador interactivo en SVG del Símbolo de GIOPRANA con las 6 claves conceptuales de la marca.",
          "Sección de los 5 Pilares (Movimiento, Nutrición, Meditación, Música y Comunidad) con iconografía dorada a medida.",
          "Cartelera de Programas Híbridos, Eventos presenciales/online y Blog editorial con sistema de comentarios en vivo.",
          "Catálogo de Equipamiento Oficial (tapetes grabados, botellas térmicas, indumentaria técnica) y Kit Visual de Marca.",
        ],
      },
      appPart: {
        title: "2. WebApp Privada de Práctica & Gestión (Back-Stage Alumna / Coach)",
        subtitle: "Plataforma Aplicativa Independiente con Doble Rol: Vista Alumna & Vista Giovanna (Coach)",
        url: "https://gleeful-quokka-88fea3.netlify.app/",
        image: "/images/apps/gioprana_webapp_live.png",
        roles: [
          "Rol Alumna (Valeria R.): Mi Práctica, Reservas, Sala En Vivo, Videoteca, Pagos y Herramientas de los 5 Pilares",
          "Rol Coach / Admin (Giovanna Monterrubio): Selector de Alumnas, Expedientes Clínico-Deportivos, Bitácora y Transmisión con Cámara",
        ],
        highlights: [
          "01 · Seguimiento & Expediente Individual: Evolución porcentual en los 5 pilares, notas de cuidado articular y bitácora bidireccional.",
          "02 · Sala En Vivo & Videoteca On-Demand: Streaming HD con cámara en vivo, chat del círculo en tiempo real y archivo de clases grabadas.",
          "03 · Motor de Reservas Semanal: Agenda para Estudio Presencial (tapete incluido) o Streaming Online con control de cupos.",
          "04 · Pasarela de Pagos & Estado de Cuenta: Cobro con tarjeta, transferencia SPEI o pago en recepción con historial de recibos.",
          "05 · Instrumentos Interactivos de los 5 Pilares: Esfera guiada de respiración (4·4·6, 5·2·5, 4·6·8), audio generativo 432 Hz, checklist de hábitos y mural de la comunidad.",
        ],
      },
      integrationBridges: [
        {
          title: "Reserva en Web → Agenda & Expediente en WebApp",
          description:
            "Cuando una visitante hace clic en 'Reserva tu espacio' desde cualquier sección de la página web, el sistema abre el flujo de la WebApp sincronizando el horario elegido directamente con su agenda y expediente.",
        },
        {
          title: "Inscripción de Programas & Eventos → Pasarela & Membresía Activa",
          description:
            "Al elegir la Membresía Integral ($1,850 MXN), el Programa 'Volver a Empezar' ($3,900 MXN) o un evento desde la Web pública, se pre-carga automáticamente el concepto en el checkout de la WebApp y activa los accesos de la alumna.",
        },
        {
          title: "Videoteca & Clases En Vivo → Progreso Automático para la Coach",
          description:
            "Cada vez que una alumna marca una clase grabada o transmisión en vivo como completada en su WebApp, se actualizan al instante sus minutos entrenados y KPIs en el panel de seguimiento de Giovanna.",
        },
      ],
    },
    clientProblem:
      "Giovanna Monterrubio necesitaba mucho más que una página informativa tradicional: requería transmitir la profundidad estética y humana de GIOPRANA ('Fuerza con Consciencia') en una web pública de alto nivel editorial, pero al mismo tiempo contar con una WebApp privada donde pudiera transmitir clases en vivo, resguardar videos anteriores, gestionar pagos y llevar un expediente detallado del progreso y cuidado físico de cada alumna.",
    solutionOverview:
      "Innocentia Tech diseñó y construyó una arquitectura dual integrada: por fuera, un Sitio Web Editorial de lujo con explorador interactivo del símbolo, blog con comentarios, programas y tienda de equipamiento; por dentro, una WebApp Privada con doble rol (Alumna y Coach) que integra streaming en vivo, videoteca on-demand, reservas presenciales/online, pasarela de pagos y herramientas diarias para practicar los 5 pilares.",
    keyFeatures: [
      "Arquitectura Dual Conectada: Sitio Web Editorial Público + WebApp Privada independiente sincronizados en tiempo real.",
      "Doble Rol en WebApp: Vista Alumna (práctica, reservas, videos y pagos) y Vista Coach Giovanna (expediente individual por clienta).",
      "Sala de Transmisión En Vivo (con soporte de cámara en directo y chat grupal) + Videoteca On-Demand filtrable por pilar.",
      "Sistema de Reservas híbrido (Estudio Presencial y Streaming Online) y Pasarela de Pagos (Tarjeta, SPEI y Estudio).",
      "Herramientas interactivas de bienestar: esfera animada de respiración (4·4·6), frecuencias sonoras 432 Hz, hábitos y mural comunitario.",
    ],
    costSavings: [
      {
        stat: "2 en 1",
        label: "Web Pública + WebApp",
        description: "Sitio editorial de captación y plataforma privada de alumnas integrados sin pagar múltiples SaaS.",
      },
      {
        stat: "100%",
        label: "Seguimiento por Alumna",
        description: "Expediente individual con evolución en los 5 pilares, bitácora y clases completadas.",
      },
      {
        stat: "0%",
        label: "Fricción en Reservas",
        description: "Paso directo desde los programas de la web pública hacia la reserva y pago en la WebApp.",
      },
    ],
    processAutomation: [
      "Sincronización instantánea entre los botones de programas/eventos de la Web pública y la pasarela de pago de la WebApp.",
      "Actualización automática del expediente de la alumna (minutos entrenados y sesiones vistas) al concluir cada video.",
      "Cambio de rol en 1 clic entre Vista Alumna y Vista Coach para supervisión inmediata de las alumnas en seguimiento.",
    ],
    designAdvantages: [
      "Sistema visual completo con 4 fondos atmosféricos (Carbón, Marfil Editorial, Oscuro Intermedio y Amanecer Violeta-Dorado).",
      "Explorador vectorial interactivo que explica las 6 claves del símbolo de GIOPRANA al pasar el cursor.",
      "Modo de superficie adaptable en la WebApp y microinteracciones suaves pensadas para transmitir calma, fuerza y presencia.",
    ],
    techStack: [
      "Web + WebApp Dual Engine",
      "Live Streaming & Video On-Demand",
      "Web Audio API (432 Hz)",
      "Interactive SVG Engine",
      "Role-Based State (Alumna / Coach)",
      "Netlify Edge CDN",
    ],
    metaTitle: "GIOPRANA • Sitio Web Editorial + WebApp Privada Integrada | Innocentia Tech",
    metaDescription:
      "Caso de estudio GIOPRANA (The Art of Being Alive): arquitectura dual con sitio web editorial público y WebApp privada integrada para clases en vivo, videoteca, reservas, pagos y seguimiento de alumnas.",
    keywords: [
      "desarrollo web y webapp integrada",
      "plataforma de clases en vivo y reservas",
      "software para estudios de wellness y fitness",
      "gioprana innocentia tech",
    ],
    clientIndustry: "Wellness, Entrenamiento Consciente, Streaming & Comunidad",
    deliverables: [
      "Sitio Web Editorial Público",
      "WebApp Privada Multi-Rol (Alumna / Coach)",
      "Sala En Vivo & Videoteca On-Demand",
      "Motor de Reservas & Pasarela de Pagos",
      "Manual & Kit Visual de Marca Completo",
    ],
  },
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
  {
    slug: "open-house-yucatan",
    id: "openhouse",
    title: "Open House Yucatán",
    subtitle: "Plataforma PropTech integral para venta de terrenos y lotes de inversión en Yucatán. Agendador de visitas con asesores, calendario interactivo en vivo y portal de vendedores.",
    headline: "App PropTech: Agendamiento de Citas, Venta de Lotes y Terrenos, Calendario & Red de Vendedores",
    image: "/images/apps/app_experiencesafely.png",
    tag: "PROPTECH & BIENES RAÍCES YUCATÁN",
    stats: "Cierre de Ventas 24/7",
    category: "PropTech, Terrenos & Bienes Raíces",
    location: "Mérida & Costa de Yucatán, México",
    primaryColor: "#E87512",
    badgeColor: "#E87512",
    demoUrl: "/demo/openhouse",
    clientProblem: "La comercialización de terrenos y lotes de inversión requería coordinar citas manuales por WhatsApp, no existía visualización clara de lotes disponibles/apartados y el seguimiento de comisiones para la fuerza de ventas inmobiliaria era disperso.",
    solutionOverview: "Innocentia Tech diseñó una aplicación PropTech inteligente con agendador de citas físicas y virtuales con Google Meet, mapa interactivo de disponibilidad de terrenos con simulador de mensualidades, calendario de recorridos y portal de comisiones para asesores inmobiliarios.",
    keyFeatures: [
      "Agendador automatizado de visitas a desarrollos con selección de horario y asesor asignado.",
      "Catálogo interactivo de terrenos con cálculo automático de enganche y mensualidades (12, 24, 36, 48 MSI).",
      "Calendario en vivo de disponibilidad y citas con sincronización directa a Google Calendar.",
      "Portal exclusivo para vendedores con control de prospectos, estatus de escrituración y tabulador de comisiones.",
    ],
    costSavings: [
      {
        stat: "-75%",
        label: "Tiempo de Agendamiento",
        description: "El cliente agenda su recorrido o videollamada en menos de 1 minuto sin fricción.",
      },
      {
        stat: "+280%",
        label: "Conversión de Prospectos",
        description: "Mayor certidumbre visual sobre disponibilidad de lotes, precios y planos.",
      },
      {
        stat: "100%",
        label: "Trazabilidad de Ventas",
        description: "Control absoluto de comisiones y asignación de clientes por asesor inmobiliario.",
      },
    ],
    processAutomation: [
      "Confirmación inmediata de citas con envío de enlace Google Meet y ubicación GPS por WhatsApp.",
      "Apartado digital de terrenos con actualización inmediata en el mapa interactivo.",
      "Liquidación y tabulador automático de comisiones para los asesores comerciales.",
    ],
    designAdvantages: [
      "Interfaz de lujo moderna de alta gama optimizada para inversionistas nacionales y extranjeros.",
      "Simulador financiero de terrenos en tiempo real con cotización descargable en PDF.",
      "100% responsiva para asesores en campo desde smartphone o tablet.",
    ],
    techStack: ["Next.js 15", "TypeScript", "Google Calendar API", "PostgreSQL", "Tailwind CSS", "Prisma ORM"],
    metaTitle: "Open House Yucatán • App PropTech de Venta de Terrenos & Citas | Innocentia Tech",
    metaDescription: "Caso de estudio Open House Yucatán: app inmobiliaria con agendador de citas, venta de terrenos de inversión en Yucatán, calendario y portal de vendedores.",
    keywords: ["venta terrenos yucatan app", "software inmobiliario merida", "proptech yucatan", "sistema citas bienes raices"],
    clientIndustry: "Bienes Raíces, PropTech & Desarrollos de Inversión",
    deliverables: ["App Web PropTech", "Agendador de Citas Inteligente", "Catálogo de Lotes Interactivo", "Portal de Asesores & Comisiones"],
  },
  {
    slug: "tacos-larry",
    id: "tacoslarry",
    title: "Taquería Larry",
    subtitle: "Plataforma multi-sucursales, punto de venta (POS) en tiempo real, control de inventario de cocina, corte de caja y pedidos e-commerce para Taquería Larry por Daniel Torre.",
    headline: "Sistema Multi-Sucursales POS, Control de Almacén & E-Commerce Gastronómico para Taquería Larry",
    image: "/images/apps/app_multisistema.png",
    tag: "GASTRONOMÍA & SISTEMA POS MULTI-SUCURSAL",
    stats: "En Producción 100%",
    category: "Gastronomía, Retail & Punto de Venta",
    location: "Mérida, Yucatán & Sucursales",
    primaryColor: "#FF3858",
    badgeColor: "#FF7A00",
    demoUrl: "https://multicommerce-omega.vercel.app/tacoslarry",
    clientProblem: "El restaurante operaba con comandas de papel y puntos de venta desconectados entre sucursales, lo que provocaba descuadres en corte de caja nocturno, descontrol en el stock de carnes e insumos y pérdida de pedidos para llevar por falta de tienda digital sincronizada.",
    solutionOverview: "Innocentia Tech desarrolló una suite completa a medida: Punto de Venta táctil ultra rápido para meseros y cajeros, panel administrativo multi-sucursal con corte de caja automático por cuentas bancarias (Albo, BBVA, Spin), control de mermas y tienda de pedidos en línea directa.",
    keyFeatures: [
      "Punto de Venta (POS) táctil optimizado para toma de órdenes en menos de 15 segundos.",
      "Control de inventario de cocina con descuento automático de gramos de carne y complementos por taco/platillo.",
      "Corte de caja ciego y conciliación automática con cuentas bancarias y terminales de cobro.",
      "Módulo multi-bodega con alertas de resurtido para proveedores centrales.",
      "Menú digital interactivo para pedidos a domicilio sin comisiones a apps terceras.",
    ],
    costSavings: [
      {
        stat: "-80%",
        label: "Tiempo en Corte de Caja",
        description: "Conciliación automática diaria en menos de 5 minutos al cierre de turno.",
      },
      {
        stat: "100%",
        label: "Control de Insumos",
        description: "Cero fugas de inventario y mermas gracias a la receta estándar sincronizada.",
      },
      {
        stat: "+35%",
        label: "Pedidos a Domicilio",
        description: "Captación directa de pedidos por WhatsApp y menú web propio sin pagar 30% a apps.",
      },
    ],
    processAutomation: [
      "Impresión automática de comandas en cocina y barra de bebidas al confirmar la orden.",
      "Notificación en tiempo real a Daniel Torre y administradores ante cancelaciones o descuentos.",
      "Generación de reportes de ventas por hora para optimizar horarios del personal.",
    ],
    designAdvantages: [
      "Interfaz de alto contraste en modo noche diseñada para pantallas de cocina y tabletas de meseros.",
      "Botones táctiles grandes tipo teclado numérico para cobros y propinas rápidas.",
      "100% responsiva para supervisar sucursales desde el celular de los socios.",
    ],
    techStack: ["Next.js 15", "TypeScript", "PostgreSQL Multi-Tenant", "WebSockets Real-Time", "Tailwind CSS", "Prisma ORM"],
    metaTitle: "Taquería Larry • Sistema POS Multi-Sucursales & Control Gastronómico | Innocentia Tech",
    metaDescription: "Caso de estudio Taquería Larry: desarrollo de plataforma gastronómica multi-sucursales, punto de venta táctil y control de inventarios por Innocentia Tech.",
    keywords: ["software para restaurantes merida", "sistema pos taquerias", "punto de venta multi sucursal", "desarrollo web restaurantes yucatan"],
    clientIndustry: "Restaurantes, Franquicias & Gastronomía Multi-Sucursal",
    deliverables: ["Punto de Venta Táctil Web", "Panel Administrativo de Socios", "Módulo de Inventarios & Mermas", "Menú Digital de Pedidos"],
  },
];
