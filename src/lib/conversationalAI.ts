export interface ChatBotResponse {
  speaker: "SOFÍA" | "IVÁN" | "DUAL";
  type: "sofia" | "ivan" | "both" | "system";
  text: string[];
}

interface MatchRule {
  id: string;
  priority: number; // Higher number = checked first & prioritized
  keywords: string[];
  responses: Array<{
    speaker: "SOFÍA" | "IVÁN" | "DUAL";
    type: "sofia" | "ivan" | "both";
    text: string[];
  }>;
}

const RULES: MatchRule[] = [
  // =========================================================================
  // 1. MARKETING DIGITAL, ESTRATEGIAS, GROWTH, PAUTAS & PUBLICIDAD
  // =========================================================================
  {
    id: "marketing_growth",
    priority: 95,
    keywords: [
      "marketing",
      "estrategia de marketing",
      "estrategia digital",
      "estrategia d marketing",
      "estrategia comercial",
      "estrategia de ventas",
      "estrategia",
      "estrategias",
      "campaña",
      "campanas",
      "campana",
      "campañas",
      "growth",
      "growth marketing",
      "meta ads",
      "facebook ads",
      "instagram ads",
      "google ads",
      "tiktok ads",
      "pauta",
      "pautas",
      "publicidad",
      "redes sociales",
      "seo",
      "posicionamiento",
      "posicionamiento web",
      "embudo de ventas",
      "embudo",
      "embudos",
      "funnel",
      "funnels",
      "leads",
      "prospectos",
      "captacion",
      "captación",
      "conversion",
      "conversión",
      "ventas",
      "vender mas",
      "vender más",
      "segmentacion",
      "segmentación",
      "retargeting",
      "roas",
      "anuncios",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Me encanta! En marketing y crecimiento digital creamos la estrategia visual completa: anuncios de alto impacto para Instagram, Facebook y Google, copys persuasivos y landing pages diseñadas para convertir visitas en clientes reales.",
          "IVÁN: Y en la parte técnica y analítica, configuramos segmentación cruzada avanzada (Meta Ads + Google Ads), píxeles de conversión con API CAPI y embudos automatizados conectados directo a tu WhatsApp o CRM para maximizar el retorno de tu inversión (ROAS).\n\n🚀 Conoce nuestros planes de Marketing & Growth o agenda tu sesión estratégica aquí:\n👉 https://innocentia.tech/marketing",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos campañas integrales: desde el branding y creativos visuales para tus redes, hasta embudos de venta y automatizaciones de seguimiento.",
          "IVÁN: Optimizamos cada etapa del embudo de adquisición para que tu costo por cliente potencial disminuya semana a semana con datos reales y medición precisa.\n\n🚀 Puedes cotizar tu estrategia de marketing en 2 minutos aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 2. ESCALABILIDAD, ALTA CONCURRENCIA, TRÁFICO & ARQUITECTURA
  // =========================================================================
  {
    id: "escalabilidad",
    priority: 90,
    keywords: [
      "escalable",
      "escalables",
      "escalabilidad",
      "escalar",
      "concurrencia",
      "concurrente",
      "usuarios simultaneos",
      "usuarios simultáneos",
      "muchos usuarios",
      "trafico alto",
      "tráfico alto",
      "alto trafico",
      "alto tráfico",
      "millones de usuarios",
      "miles de usuarios",
      "soporta trafico",
      "soporta tráfico",
      "se cae",
      "se caiga",
      "crecimiento",
      "crecer",
      "rendimiento a escala",
      "arquitectura cloud",
      "servidores potentes",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Totalmente escalables. Arquitecturamos nuestros sistemas y aplicaciones sobre Next.js 15, bases de datos PostgreSQL (Supabase / Supavisor con pool de conexiones), microservicios serverless y redes globales Cloudflare Edge.",
          "Esto garantiza que tu plataforma pueda iniciar con 50 usuarios y escalar de forma transparente a cientos de miles o millones de usuarios concurrentes con latencia ultrabaja (< 15ms), sin caídas de servidor ni cuellos de botella.\n\n🚀 Si deseas cotizar una arquitectura de alta escala para tu negocio, puedes registrarla aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: A nivel de ingeniería, utilizamos infraestructura multi-tenant aislada, balanceo de carga automático y servidores Edge en la nube que responden en milisegundos sin importar el volumen de tráfico.",
          "SOFÍA: Y a nivel de experiencia visual, construimos con Sistemas de Diseño Modulares (Design Systems) para que cuando tu plataforma crezca o agregues nuevos módulos y funciones, la interfaz se expanda limpiamente a 60 FPS.\n\n🚀 Cotiza tu proyecto escalable aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. PROPIEDAD DEL CÓDIGO, DERECHOS & REPOSITORIOS
  // =========================================================================
  {
    id: "propiedad_codigo",
    priority: 88,
    keywords: [
      "codigo es mio",
      "código es mío",
      "el codigo es nuestro",
      "el código es nuestro",
      "codigo me pertenece",
      "código me pertenece",
      "me pertenece",
      "pertenece",
      "de quien es el codigo",
      "de quién es el código",
      "quien es el dueño",
      "quién es el dueño",
      "quien es el dueno",
      "soy dueño",
      "somos dueños",
      "soy dueno",
      "propiedad intelectual",
      "propiedad del codigo",
      "propiedad del código",
      "derechos de autor",
      "codigo fuente",
      "código fuente",
      "repositorio",
      "repositorios",
      "github",
      "licencia",
      "ataduras",
      "dependencia",
      "entregan el codigo",
      "entregan el código",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "El código fuente, los repositorios de GitHub, las bases de datos y la propiedad intelectual son 100% tuyos desde el día de entrega.",
          "No te atamos con licencias cerradas ni mensualidades forzosas. Tu empresa tiene el control total para seguir desarrollando, desplegar donde prefieras o integrar a tu propio equipo técnico cuando lo decidas.\n\n👉 Inicia tu proyecto con total tranquilidad aquí: https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. INTEGRACIONES: PASARELAS DE PAGO, STRIPE, WHATSAPP, FACTURACIÓN SAT
  // =========================================================================
  {
    id: "integraciones_pagos",
    priority: 85,
    keywords: [
      "pasarela",
      "pasarelas",
      "stripe",
      "mercadopago",
      "mercado pago",
      "paypal",
      "spei",
      "tarjeta",
      "tarjetas",
      "cobros",
      "cobrar en linea",
      "cobros en línea",
      "facturacion",
      "facturación",
      "facturas",
      "sat",
      "cfdi",
      "whatsapp api",
      "google maps",
      "webhook",
      "webhooks",
      "api externa",
      "apis externas",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Integramos cualquier pasarela o API del mercado: pagos con tarjeta de crédito/débito y MSI vía Stripe o Mercado Pago, transferencias SPEI automatizadas, timbrado de facturas SAT CFDI 4.0 y WhatsApp Cloud API oficial para notificaciones instantáneas a tus clientes.",
          "Todo conectado en tiempo real con panel de administración y reportes financieros automáticos.\n\n🚀 Cuéntanos qué integraciones necesitas para tu plataforma:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. GARANTÍA TÉCNICA, BUGS, SOPORTE & MONITOREO POST-VENTA
  // =========================================================================
  {
    id: "garantia_soporte",
    priority: 80,
    keywords: [
      "garantia",
      "garantía",
      "que pasa si falla",
      "qué pasa si falla",
      "soporte",
      "mantenimiento",
      "bugs",
      "errores",
      "falla",
      "actualizaciones",
      "respaldos",
      "backup",
      "post venta",
      "postventa",
      "monitoreo",
      "poliza",
      "póliza",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Todos nuestros desarrollos incluyen Póliza de Garantía Técnica contra fallas o bugs y monitoreo de alta disponibilidad 99.98% SLA.",
          "Además, implementamos respaldos automáticos diarios en la nube para que tu información y la de tus clientes estén 100% blindadas en todo momento.",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. PROCESO DE TRABAJO & METODOLOGÍA (CÓMO TRABAJAN / ETAPAS)
  // =========================================================================
  {
    id: "proceso_trabajo",
    priority: 78,
    keywords: [
      "como trabajan",
      "cómo trabajan",
      "como es el proceso",
      "cómo es el proceso",
      "metodologia",
      "metodología",
      "pasos",
      "etapas de trabajo",
      "como empezamos",
      "cómo empezamos",
      "como se hace",
      "fases",
      "fase de desarrollo",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Paso 1 (Diseño & UX): Construimos un prototipo interactivo en Figma para que pruebes y apruebes cada pantalla, colores y animaciones directamente en tu celular antes de escribir una sola línea de código.",
          "IVÁN: Paso 2 (Ingeniería & Sprints): Programamos la arquitectura, base de datos y APIs con avances semanales en un enlace privado (staging). Paso 3 (Lanzamiento): Pruebas de carga, seguridad y despliegue oficial a producción con tu dominio.\n\n🚀 Da el primer paso cotizando tu proyecto aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 7. MODALIDADES DE INVERSIÓN: DESARROLLO A MEDIDA VS RENTA TECNOLÓGICA
  // =========================================================================
  {
    id: "modalidades_pago",
    priority: 75,
    keywords: [
      "modalidad",
      "modalidades",
      "renta",
      "rentar",
      "suscripcion",
      "suscripción",
      "mensualidad",
      "formas de pago",
      "planes de pago",
      "financiamiento",
      "meses sin intereses",
      "etapas de pago",
      "hitos",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Ofrecemos 2 modalidades de inversión flexibles según la etapa de tu empresa:",
          "1. Desarrollo a Medida por Proyecto: Pagos divididos por etapas (Anticipo, Avance y Finiquito contra entrega). El código y plataforma son 100% tuyos.\n2. Renta Tecnológica Todo Incluido: Inversión inicial reducida con una tarifa mensual fija que incluye infraestructura en la nube, servidores, soporte técnico y actualizaciones continuas.\n\n🚀 Cotiza la opción ideal para tu presupuesto aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 8. MIGRACIÓN, REDISEÑO & MEJORA DE SISTEMAS EXISTENTES
  // =========================================================================
  {
    id: "migracion_rediseno",
    priority: 72,
    keywords: [
      "ya tengo una pagina",
      "ya tengo una página",
      "ya tengo sistema",
      "ya tengo app",
      "rediseñar",
      "rediseño",
      "migrar",
      "migracion",
      "migración",
      "modernizar",
      "mejorar mi web",
      "cambiar de proveedor",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Podemos modernizarlo por completo! Analizamos la usabilidad de tu plataforma actual para renovar la imagen, volverla moderna y aumentar la tasa de conversión de tus clientes.",
          "IVÁN: Y migramos tus bases de datos y backend a arquitecturas modernas (Next.js 15 + PostgreSQL) sin perder un solo dato de tus clientes ni interrumpir la operación de tu negocio.\n\n🚀 Solicita tu auditoría y rediseño aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. CREACIÓN DE LOGO / BRANDING / IDENTIDAD VISUAL
  // =========================================================================
  {
    id: "branding_logo",
    priority: 70,
    keywords: [
      "logo",
      "logotipo",
      "isotipo",
      "imagotipo",
      "marca",
      "branding",
      "identidad visual",
      "manual de marca",
      "colores de marca",
      "vector",
      "svg",
      "illustrator",
      "curvas",
      "diseño de marca",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta dar vida a nuevas marcas! Diseñamos tu identidad visual desde cero: logotipo, paleta cromática, tipografías y manual de marca para que transmitas profesionalismo y confianza.",
          "Te entregamos todos los archivos vectoriales (AI, SVG, PDF, PNG de alta resolución) listos para redes sociales, sitio web, uniformes o impresión en gran formato.\n\n🚀 Puedes iniciar el diseño de tu marca aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 10. COMBINADO: LOGO + APP / SOFTWARE INTEGRAL
  // =========================================================================
  {
    id: "combo_logo_app",
    priority: 68,
    keywords: [
      "logo y una aplicacion",
      "logo y una aplicación",
      "logo y app",
      "marca y app",
      "marca y sistema",
      "cotizar un logo y",
      "que necesito para cotizar",
      "qué necesito para cotizar",
      "requisitos para cotizar",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Es un combo perfecto! Creamos toda la identidad visual y estética de tu marca para que tu producto luzca impecable y coherente desde el primer día.",
          "IVÁN: Y en paralelo programamos la aplicación o plataforma con la arquitectura tecnológica necesaria. Al contratar ambos servicios con nosotros, el diseño y el código se sincronizan a la perfección sin fricciones.\n\n🚀 Puedes cotizar tu paquete integral aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 11. INTELIGENCIA ARTIFICIAL, AGENTES & CHATBOTS WHATSAPP
  // =========================================================================
  {
    id: "ia_agentes",
    priority: 65,
    keywords: [
      "ia",
      "inteligencia artificial",
      "agente",
      "agentes",
      "agente de ia",
      "agentes de ia",
      "chatbot",
      "chatbots",
      "chat bot",
      "automatizar",
      "automatizacion",
      "automatizaciones",
      "gpt",
      "llm",
      "openai",
      "deepseek",
      "gemini",
      "claude",
      "bot de whatsapp",
      "chatbot whatsapp",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Conectamos agentes de Inteligencia Artificial a tu WhatsApp Business o plataforma web capaces de atender clientes 24/7, resolver consultas técnicas complejas, cotizar y registrar citas o ventas en tu base de datos automáticamente.",
          "SOFÍA: Cuidamos minuciosamente que las respuestas del bot tengan el tono, calidez, vocabulario y personalidad exacta de tu marca para que la atención se sienta natural y fluida.\n\n🚀 Cotiza tu asistente de IA inteligente aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 12. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID)
  // =========================================================================
  {
    id: "apps_moviles",
    priority: 60,
    keywords: [
      "app",
      "apps",
      "aplicacion",
      "aplicaciones",
      "aplicación",
      "ios",
      "android",
      "play store",
      "app store",
      "flutter",
      "react native",
      "móvil",
      "movil",
      "celular",
      "app movil",
      "app móvil",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos la experiencia de tu app para que sea fluida, visualmente impactante y fácil de navegar con una sola mano a 60 FPS.",
          "IVÁN: Y yo me encargo de programarla con rendimiento nativo para iOS y Android: notificaciones push, modo offline, geolocalización en tiempo real, pasarelas de pago y publicación en Apple App Store y Google Play Store.\n\n🚀 Cuéntanos las funciones de tu app para cotizarla aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 13. SISTEMAS WEB, SAAS, CRM, ERP & PANELES DE CONTROL
  // =========================================================================
  {
    id: "sistemas_saas",
    priority: 55,
    keywords: [
      "saas",
      "plataforma",
      "plataformas",
      "sistema",
      "sistemas",
      "crm",
      "erp",
      "portal",
      "dashboard",
      "panel",
      "administrativo",
      "base de datos",
      "backend",
      "fullstack",
      "software a medida",
      "desarrollo web",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Desarrollamos plataformas web y sistemas SaaS a medida que digitalizan y automatizan la operación de tu negocio: administración de usuarios por roles, control de inventario, cotizadores automáticos, cobros recurrentes y reportes en tiempo real.",
          "Construidos con Next.js 15, PostgreSQL y microservicios ultra rápidos accesibles desde cualquier navegador o dispositivo móvil.\n\n🚀 Cuéntanos qué proceso deseas digitalizar aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. E-COMMERCE, TIENDAS ONLINE & CATÁLOGOS CON PAGOS
  // =========================================================================
  {
    id: "ecommerce_tiendas",
    priority: 52,
    keywords: [
      "tienda",
      "tiendas",
      "tienda online",
      "tienda en linea",
      "tienda en línea",
      "ecommerce",
      "e-commerce",
      "comercio electronico",
      "comercio electrónico",
      "carrito de compras",
      "vender productos",
      "catalogo de productos",
      "catálogo de productos",
      "shopify",
      "woocommerce",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos tiendas online visualmente increíbles, con fichas de producto atractivas, filtros rápidos y un proceso de checkout limpio que minimiza los carritos abandonados.",
          "IVÁN: Integramos pasarelas de pago seguras (Stripe, Mercado Pago, PayPal, SPEI), cálculo automático de envíos, control de inventario y facturación automática en el SAT.\n\n🚀 Cotiza tu tienda online lista para vender aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 15. DISEÑO UI/UX, PANTALLAS, FIGMA & PROTOTIPOS
  // =========================================================================
  {
    id: "ui_ux_figma",
    priority: 50,
    keywords: [
      "figma",
      "ux",
      "ui",
      "ui/ux",
      "ui ux",
      "prototipo",
      "prototipos",
      "interfaz",
      "interfaces",
      "wireframe",
      "wireframes",
      "pantallas",
      "mockup",
      "mockups",
      "experiencia de usuario",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Diseñamos interfaces atractivas, modernas y muy intuitivas para tus clientes en Figma.",
          "Podrás probar el prototipo interactivo directamente en tu teléfono antes de programar, para asegurarnos de que los flujos, animaciones y micro-interacciones queden impecables.\n\n🚀 Cuéntanos qué pantallas necesitas llenando el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 16. COSTOS, PRECIOS & COTIZACIONES GENERALES
  // =========================================================================
  {
    id: "costos_precios",
    priority: 45,
    keywords: [
      "costo",
      "costos",
      "precio",
      "precios",
      "cuanto cuesta",
      "cuánto cuesta",
      "presupuesto",
      "cotizar",
      "cotizacion",
      "cotización",
      "tarifa",
      "tarifas",
      "valor",
      "inversion",
      "inversión",
      "cuanto cobran",
      "cuánto cobran",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Nuestros presupuestos son transparentes, estructurados y sin costos ocultos:",
          "• Logotipos e Identidad de Marca: Desde $4,500 MXN.\n• Sitios Web y Landing Pages: Desde $12,000 MXN.\n• Campañas de Marketing & Growth: Planes de gestión mensual desde $8,000 MXN.\n• Apps Móviles y Plataformas SaaS: Desde $24,000 MXN (o en modalidad de renta tecnológica mensual con soporte).\n\n🚀 Para calcular el costo exacto con tu desglose de funciones, llena el formulario en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 17. TIEMPOS DE ENTREGA & CRONOGRAMAS
  // =========================================================================
  {
    id: "tiempos_entrega",
    priority: 40,
    keywords: [
      "tiempo",
      "tiempos",
      "cuanto tarda",
      "cuánto tarda",
      "duracion",
      "duración",
      "plazos",
      "dias",
      "días",
      "semanas",
      "meses",
      "entrega",
      "entregas",
      "cronograma",
      "plazo",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Trabajamos con plazos ágiles y entregas visibles por semana:",
          "• Identidad Visual & Logotipos: 3 a 7 días hábiles.\n• Sitios Web & Landing Pages: 1 a 2 semanas.\n• Estrategias de Marketing: Lanzamiento de campañas en 5 a 7 días.\n• Apps Móviles & Sistemas Web: 3 a 6 semanas con prototipo interactivo listo en los primeros 5 días.\n\n🚀 Registra las fechas estimadas de tu proyecto aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 18. UBICACIÓN, OFICINAS, VISITAS & REUNIONES VIRTUALES
  // =========================================================================
  {
    id: "ubicacion_contacto",
    priority: 35,
    keywords: [
      "donde estan",
      "dónde están",
      "ubicacion",
      "ubicación",
      "oficina",
      "oficinas",
      "merida",
      "mérida",
      "yucatan",
      "yucatán",
      "mexico",
      "méxico",
      "presencial",
      "reunion",
      "reunión",
      "videollamada",
      "zoom",
      "meet",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Nuestra base de diseño e ingeniería está ubicada en Mérida, Yucatán, y colaboramos con clientes en toda la República Mexicana, Estados Unidos y Latinoamérica.",
          "IVÁN: Podemos coordinar una sesión virtual por Google Meet en cualquier momento o agendar una reunión presencial si te encuentras en Mérida. Escríbenos al WhatsApp +52 960 177 1556 o llena tu solicitud en https://innocentia.tech/crear-proyecto.",
        ],
      },
    ],
  },

  // =========================================================================
  // 19. SALUDOS & CHARLA HUMANA
  // =========================================================================
  {
    id: "saludos",
    priority: 30,
    keywords: [
      "hola",
      "buen dia",
      "buen día",
      "buenos dias",
      "buenos días",
      "buenas tardes",
      "buenas noches",
      "hey",
      "saludos",
      "que tal",
      "qué tal",
      "como estas",
      "cómo estás",
      "como andan",
      "cómo andan",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Hola! Qué gusto saludarte. Yo lidero el diseño, la experiencia visual y la creatividad de marca.",
          "IVÁN: ¡Hola! Y yo lidero la arquitectura de software, código y tecnología. Cuéntanos, ¿qué idea, app, sistema o campaña deseas construir?\n\nSi deseas cotizar de inmediato, puedes llenar el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 20. IDENTIDAD DE INNOCENTIA & DUAL CORE
  // =========================================================================
  {
    id: "identidad_innocentia",
    priority: 25,
    keywords: [
      "quienes son",
      "quiénes son",
      "quien eres",
      "quién eres",
      "que es innocentia",
      "qué es innocentia",
      "sofia",
      "sofía",
      "ivan",
      "iván",
      "dual core",
      "a que se dedican",
      "a qué se dedican",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Somos Innocentia Tech! Un estudio y laboratorio de tecnología donde unimos el diseño visual de alto impacto con la ingeniería de software más avanzada.",
          "IVÁN: Diseñamos marcas, desarrollamos apps móviles, plataformas web y conectamos agentes de inteligencia artificial para impulsar negocios reales.\n\n🚀 Conoce más o cotiza tu proyecto aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 21. AGRADECIMIENTOS & CIERRE
  // =========================================================================
  {
    id: "agradecimientos",
    priority: 20,
    keywords: [
      "gracias",
      "muchas gracias",
      "excelente",
      "perfecto",
      "genial",
      "buenisimo",
      "buenísimo",
      "me gusta",
      "ok",
      "vale",
      "entendido",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Con muchísimo gusto! Cuando estés listo para dar el siguiente paso, aquí estaremos para crear algo extraordinario. Puedes llenar tu solicitud aquí:\n👉 https://innocentia.tech/crear-proyecto ✨",
        ],
      },
    ],
  },

  // =========================================================================
  // 22. WHATSAPP & CONTACTO OFICIAL
  // =========================================================================
  {
    id: "contacto_whatsapp",
    priority: 15,
    keywords: [
      "telefono",
      "teléfono",
      "whatsapp",
      "whats",
      "numero",
      "número",
      "celular",
      "llamar",
      "marcar",
      "contacto",
      "9601771556",
      "960 177 1556",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Nuestro canal oficial de WhatsApp y atención directa es el +52 960 177 1556.",
          "SOFÍA: También puedes escribirnos a contacto@innocentia.tech o llenar el formulario de cotización en https://innocentia.tech/crear-proyecto.",
        ],
      },
    ],
  },
];

let lastResponseIndex: { [key: string]: number } = {};

/**
 * Normalizes text removing diacritics and non-essential punctuation
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Checks if a keyword matches inside a query using strict whole-word / phrase boundaries.
 * Prevents false positives like "ui" matching inside "quiero" or "ia" matching inside "estrategia".
 */
function testKeywordMatch(normalizedQuery: string, normalizedKw: string): boolean {
  // If the query is an exact match
  if (normalizedQuery === normalizedKw) return true;

  // Escape regex special chars in keyword
  const escapedKw = normalizedKw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Word boundary regex that works with alphanumeric characters and Spanish text
  // Matches keyword only if surrounded by start/end of string or non-alphanumeric chars
  const pattern = new RegExp(`(^|[^a-z0-9])${escapedKw}([^a-z0-9]|$)`, "i");
  return pattern.test(normalizedQuery);
}

export function getIntelligentHumanReply(userQuery: string): ChatBotResponse {
  const rawQuery = userQuery.trim();
  if (!rawQuery) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: ["¿En qué podemos ayudarte hoy? Cuéntanos tu idea sobre diseño, desarrollo, marketing o inteligencia artificial."],
    };
  }

  const normalizedQuery = normalizeText(rawQuery);

  // Find best match with priority, token count, and keyword length specificity scoring
  let bestMatch: MatchRule | null = null;
  let highestScore = -1;

  for (const rule of RULES) {
    let score = 0;
    let matchedKeywordsCount = 0;

    for (const kw of rule.keywords) {
      const normalizedKw = normalizeText(kw);

      if (testKeywordMatch(normalizedQuery, normalizedKw)) {
        matchedKeywordsCount++;
        // Priority weight + phrase length bonus
        const isPhrase = normalizedKw.includes(" ");
        const lengthBonus = normalizedKw.length * 4;
        const phraseBonus = isPhrase ? 80 : 0;

        score += rule.priority * 15 + lengthBonus + phraseBonus;
      }
    }

    if (matchedKeywordsCount > 1) {
      // Bonus for multiple keyword hits in same domain
      score += matchedKeywordsCount * 40;
    }

    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && highestScore > 0) {
    const key = bestMatch.id;
    const prevIdx = lastResponseIndex[key] ?? -1;
    const nextIdx = (prevIdx + 1) % bestMatch.responses.length;
    lastResponseIndex[key] = nextIdx;
    const selected = bestMatch.responses[nextIdx];

    return {
      speaker: selected.speaker,
      type: selected.type,
      text: selected.text,
    };
  }

  // =========================================================================
  // DYNAMIC CONTEXT-AWARE FALLBACK
  // =========================================================================
  const isMarketingFocused =
    testKeywordMatch(normalizedQuery, "marketing") ||
    testKeywordMatch(normalizedQuery, "estrategia") ||
    testKeywordMatch(normalizedQuery, "vender") ||
    testKeywordMatch(normalizedQuery, "campana") ||
    testKeywordMatch(normalizedQuery, "anuncio") ||
    testKeywordMatch(normalizedQuery, "pauta") ||
    testKeywordMatch(normalizedQuery, "publicidad");

  if (isMarketingFocused) {
    return {
      speaker: "DUAL",
      type: "both",
      text: [
        `SOFÍA: ¡Excelente! Con respecto a "${rawQuery}", en Innocentia combinamos diseño de anuncios con copys persuasivos para captar clientes potenciales desde el primer día.`,
        "IVÁN: Y configuramos la pauta en Meta y Google Ads con segmentación precisa y seguimiento de conversiones.\n\n🚀 Puedes contarnos los detalles de tu estrategia aquí:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  const isDesignFocused =
    testKeywordMatch(normalizedQuery, "diseno") ||
    testKeywordMatch(normalizedQuery, "visual") ||
    testKeywordMatch(normalizedQuery, "estilo") ||
    testKeywordMatch(normalizedQuery, "color") ||
    testKeywordMatch(normalizedQuery, "logo") ||
    testKeywordMatch(normalizedQuery, "marca") ||
    testKeywordMatch(normalizedQuery, "imagen") ||
    testKeywordMatch(normalizedQuery, "interfaz");

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `¡Claro que sí! Con respecto a "${rawQuery}", en diseño nos enfocamos en que tu proyecto tenga una identidad atractiva, moderna y profesional que cautive a tu audiencia.`,
        "Para conocer tu estilo y prepararte una propuesta personalizada, llena el formulario aquí en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  const isCodeFocused =
    testKeywordMatch(normalizedQuery, "codigo") ||
    testKeywordMatch(normalizedQuery, "programar") ||
    testKeywordMatch(normalizedQuery, "app") ||
    testKeywordMatch(normalizedQuery, "software") ||
    testKeywordMatch(normalizedQuery, "sistema") ||
    testKeywordMatch(normalizedQuery, "servidor") ||
    testKeywordMatch(normalizedQuery, "lenguaje") ||
    testKeywordMatch(normalizedQuery, "base de datos");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Sobre tu consulta de "${rawQuery}": en Innocentia nos encargamos de toda la arquitectura e ingeniería técnica para que tu software sea ultra rápido, seguro y escalable.`,
        "Cuéntanos las funciones que imaginas llenando el formulario y te enviamos la cotización desglosada:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  // Default dual welcoming response
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: ¡Excelente consulta sobre "${rawQuery}"! Nos encantaría ayudarte a darle forma visual y comercial.`,
      "IVÁN: Y yo me encargo de que toda la tecnología y arquitectura funcione de manera perfecta. Cuéntanos qué necesitas en nuestro formulario en 2 minutos y te preparamos la cotización completa y desglosada:\n👉 https://innocentia.tech/crear-proyecto",
    ],
  };
}
