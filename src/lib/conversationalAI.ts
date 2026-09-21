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
  // 1. ESCALABILIDAD, ALTA CONCURRENCIA, TRÁFICO & ARQUITECTURA (PRIORIDAD MÁXIMA)
  // =========================================================================
  {
    id: "escalabilidad",
    priority: 100,
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
  // 2. PROPIEDAD DEL CÓDIGO, DERECHOS & REPOSITORIOS (PRIORIDAD 90)
  // =========================================================================
  {
    id: "propiedad_codigo",
    priority: 90,
    keywords: [
      "codigo es mio",
      "código es mío",
      "el codigo es nuestro",
      "el código es nuestro",
      "soy dueño",
      "somos dueños",
      "propiedad intelectual",
      "derechos de autor",
      "codigo fuente",
      "código fuente",
      "repositorio",
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
  // 3. INTEGRACIONES: PASARELAS DE PAGO, STRIPE, WHATSAPP, FACTURACIÓN SAT
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
      "api externa",
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
  // 4. GARANTÍA TÉCNICA, BUGS, SOPORTE & MONITOREO POST-VENTA
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
  // 5. PROCESO DE TRABAJO & METODOLOGÍA (CÓMO TRABAJAN / ETAPAS)
  // =========================================================================
  {
    id: "proceso_trabajo",
    priority: 75,
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
  // 6. MODALIDADES DE INVERSIÓN: DESARROLLO A MEDIDA VS RENTA TECNOLÓGICA
  // =========================================================================
  {
    id: "modalidades_pago",
    priority: 70,
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
  // 7. MIGRACIÓN, REDISEÑO & MEJORA DE SISTEMAS EXISTENTES
  // =========================================================================
  {
    id: "migracion_rediseno",
    priority: 65,
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
  // 8. UBICACIÓN, OFICINAS, VISITAS & REUNIONES VIRTUALES
  // =========================================================================
  {
    id: "ubicacion_contacto",
    priority: 60,
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
          "SOFÍA: Nuestra base de diseño e ingeniería está ubicada en Mérida, Yucatán, y colaboramos con empresas en toda la República Mexicana (CDMX, Monterrey, Guadalajara, Riviera Maya), así como en Estados Unidos y Latinoamérica.",
          "IVÁN: Podemos coordinar una sesión virtual por Google Meet en cualquier momento o agendar una reunión presencial si te encuentras en la península. Escríbenos directamente al WhatsApp +52 960 177 1556 o llena tu solicitud en https://innocentia.tech/crear-proyecto.",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. PREGUNTA COMBINADA: LOGO + APP / COTIZACIÓN INTEGRAL
  // =========================================================================
  {
    id: "combo_logo_app",
    priority: 55,
    keywords: [
      "logo y una aplicacion",
      "logo y una aplicación",
      "logo y app",
      "cotizar un logo y",
      "que necesito para cotizar",
      "qué necesito para cotizar",
      "requisitos para cotizar",
      "como cotizar",
      "cómo cotizar",
      "para cotizar",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Es muy sencillo! Para tu logotipo o marca solo necesitamos conocer de qué trata tu negocio, a quién va dirigido y tus preferencias de colores o estilo.",
          "IVÁN: Y para tu aplicación o sistema web, cuéntanos qué funciones imaginas (usuarios, catálogo, citas o cobros con tarjeta). Llenando nuestro formulario en 2 minutos te preparamos la cotización completa y desglosada.\n\n🚀 Puedes contarnos tu idea y cotizarla aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 10. CREACIÓN DE LOGO / BRANDING / IDENTIDAD VISUAL
  // =========================================================================
  {
    id: "branding_logo",
    priority: 50,
    keywords: [
      "logo",
      "logotipo",
      "isotipo",
      "imagotipo",
      "marca",
      "branding",
      "identidad visual",
      "colores de marca",
      "vector",
      "svg",
      "illustrator",
      "curvas",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta dar vida a nuevas marcas! Diseñamos tu logotipo desde cero, asegurando que transmita confianza, personalidad y alto impacto.",
          "Te entregamos todos los formatos vectoriales listos para imprimir en cualquier tamaño, usar en redes sociales, papelería y en tu sitio web.\n\n🚀 Para iniciar tu diseño y recibir tu cotización, llena el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 11. DISEÑO UI/UX, PANTALLAS, PROTOTIPOS, FIGMA
  // =========================================================================
  {
    id: "ui_ux_figma",
    priority: 45,
    keywords: ["figma", "ux", "ui", "prototipo", "interfaz", "diseño web", "wireframe", "pantallas", "mockup"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Diseñamos interfaces atractivas, modernas y muy intuitivas para tus clientes.",
          "Podrás probar el prototipo interactivo directamente en tu teléfono antes de programar, para asegurarnos de que los flujos y animaciones queden perfectos.\n\n🚀 Cuéntanos qué pantallas necesitas llenando el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 12. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID)
  // =========================================================================
  {
    id: "apps_moviles",
    priority: 40,
    keywords: [
      "app",
      "aplicacion",
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
      "telefono",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos la experiencia de tu app para que sea fluida, bonita y fácil de navegar con una sola mano.",
          "IVÁN: Y yo me encargo de programarla con rendimiento nativo a 60 FPS en iPhone y Android: notificaciones push, geolocalización, pasarelas de pago y publicación en las tiendas oficiales.\n\n🚀 Registra los datos de tu app para cotizarla aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 13. SISTEMAS WEB, SAAS, CRM, ERP, PANELES DE CONTROL
  // =========================================================================
  {
    id: "sistemas_saas",
    priority: 35,
    keywords: [
      "saas",
      "plataforma",
      "sistema",
      "crm",
      "erp",
      "portal",
      "dashboard",
      "panel",
      "administrativo",
      "base de datos",
      "backend",
      "fullstack",
      "tienda online",
      "ecommerce",
      "e-commerce",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Desarrollamos plataformas web y sistemas a medida que automatizan la operación de tu negocio: administración de usuarios, control de inventario, cotizadores automáticos, cobros en línea y reportes en tiempo real.",
          "Totalmente responsivos y accesibles desde cualquier navegador o dispositivo.\n\n🚀 Cuéntanos qué proceso deseas digitalizar aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. INTELIGENCIA ARTIFICIAL, AGENTES & CHATBOTS WHATSAPP
  // =========================================================================
  {
    id: "ia_agentes",
    priority: 30,
    keywords: ["ia", "inteligencia artificial", "agente", "chatbot", "chat bot", "automatizar", "automatizacion", "gpt", "llm", "openai"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Conectamos agentes de Inteligencia Artificial a tu WhatsApp Business o sitio web para atender clientes 24/7, resolver consultas técnicas complejas y agendar citas o cotizaciones automáticamente.",
          "SOFÍA: Cuidando que las respuestas tengan el tono, calidez y personalidad exacta de tu marca.\n\n🚀 Cotiza tu asistente inteligente aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 15. COSTOS, PRECIOS & COTIZACIONES GENERALES
  // =========================================================================
  {
    id: "costos_precios",
    priority: 25,
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
      "valor",
      "inversion",
      "inversión",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Nuestros presupuestos son claros, transparentes y sin costos ocultos:",
          "• Logotipos e Identidad de Marca: Desde $4,500 MXN.\n• Sitios Web y Páginas de Venta: Desde $12,000 MXN.\n• Aplicaciones Móviles y Plataformas SaaS: Desde $24,000 MXN (o en modalidad de renta tecnológica mensual con soporte incluido).\n\n🚀 Para calcular el costo exacto con tu desglose de funciones, llena el formulario en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 16. TIEMPOS DE ENTREGA & CRONOGRAMAS
  // =========================================================================
  {
    id: "tiempos_entrega",
    priority: 20,
    keywords: ["tiempo", "tiempos", "cuanto tarda", "cuánto tarda", "duracion", "duración", "plazos", "dias", "semanas", "meses", "entrega", "cronograma"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Trabajamos con plazos ágiles y entregas visibles por semana:",
          "• Identidad Visual & Logotipos: 3 a 7 días hábiles.\n• Sitios Web & Landing Pages: 1 a 2 semanas.\n• Apps Móviles & Sistemas Web: 3 a 6 semanas con prototipo inicial listo en los primeros 5 días.\n\n🚀 Registra las fechas de tu proyecto aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 17. SEGURIDAD & INFRAESTRUCTURA CLOUD
  // =========================================================================
  {
    id: "seguridad_cloud",
    priority: 18,
    keywords: ["seguridad", "hosting", "servidor", "nube", "cloud", "cifrado", "ssl", "postgresql", "supabase", "aws", "vercel", "cloudflare"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Blindamos tu plataforma con cifrado SSL de grado bancario, protección Cloudflare contra ataques DDoS, aislamiento multi-tenant en PostgreSQL y respaldos automáticos.",
          "Tu infraestructura cumple con los más altos estándares de seguridad y disponibilidad.\n\n👉 Conoce más creando tu proyecto aquí: https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 18. SALUDOS & CHARLA HUMANA
  // =========================================================================
  {
    id: "saludos",
    priority: 15,
    keywords: ["hola", "buen dia", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos", "que tal", "qué tal", "como estas", "cómo estás"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Hola! Qué gusto saludarte. Yo lidero el diseño, la experiencia visual y la creatividad.",
          "IVÁN: ¡Hola! Y yo lidero la arquitectura de software, código y tecnología. Cuéntanos, ¿qué idea, app o sistema deseas construir?\n\nSi deseas cotizar de inmediato, puedes llenar el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 19. IDENTIDAD DE INNOCENTIA & DUAL CORE
  // =========================================================================
  {
    id: "identidad_innocentia",
    priority: 12,
    keywords: ["quienes son", "quiénes son", "quien eres", "quién eres", "que es innocentia", "qué es innocentia", "sofia", "sofía", "ivan", "iván", "dual core"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Somos Innocentia Tech! Un laboratorio de software, diseño e inteligencia artificial donde unimos la creatividad con la ingeniería de alto impacto.",
          "IVÁN: Te acompañamos desde el concepto inicial hasta el escalamiento global de tu plataforma.\n\n🚀 Conoce nuestras soluciones y cotiza tu idea aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 20. AGRADECIMIENTOS & CIERRE
  // =========================================================================
  {
    id: "agradecimientos",
    priority: 10,
    keywords: ["gracias", "muchas gracias", "excelente", "perfecto", "genial", "buenisimo", "buenísimo", "me gusta", "ok", "vale"],
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
  // 21. WHATSAPP & CONTACTO OFICIAL
  // =========================================================================
  {
    id: "contacto_whatsapp",
    priority: 8,
    keywords: ["telefono", "teléfono", "whatsapp", "whats", "numero", "número", "celular", "llamar", "marcar", "contacto", "9601771556", "960 177 1556"],
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

export function getIntelligentHumanReply(userQuery: string): ChatBotResponse {
  const rawQuery = userQuery.toLowerCase().trim();
  if (!rawQuery) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: ["¿En qué podemos ayudarte hoy? Cuéntanos tu idea sobre diseño, desarrollo o tecnología."],
    };
  }

  // Normalize query removing accents for robust matching
  const normalizedQuery = rawQuery
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Find best match with priority and specificity scoring
  let bestMatch: MatchRule | null = null;
  let highestScore = -1;

  for (const rule of RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      const normalizedKw = kw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (normalizedQuery.includes(normalizedKw) || rawQuery.includes(kw)) {
        // High priority multiplier + keyword length specificity
        score += rule.priority * 10 + normalizedKw.length * 3;
      }
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

  // Dynamic context-aware fallback
  const isDesignFocused =
    normalizedQuery.includes("visual") ||
    normalizedQuery.includes("dibuj") ||
    normalizedQuery.includes("estilo") ||
    normalizedQuery.includes("color") ||
    normalizedQuery.includes("logo") ||
    normalizedQuery.includes("marca") ||
    normalizedQuery.includes("imagen");

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `¡Claro que sí! Con respecto a "${userQuery}", en diseño nos enfocamos en que tu proyecto tenga una imagen atractiva, memorable y profesional.`,
        "Para conocer tu estilo y prepararte una propuesta personalizada, llena el formulario aquí en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  const isCodeFocused =
    normalizedQuery.includes("funciona") ||
    normalizedQuery.includes("lenguaje") ||
    normalizedQuery.includes("servidor") ||
    normalizedQuery.includes("velocidad") ||
    normalizedQuery.includes("codigo") ||
    normalizedQuery.includes("programar") ||
    normalizedQuery.includes("app") ||
    normalizedQuery.includes("sistema");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Sobre tu consulta de "${userQuery}": en Innocentia nos encargamos de toda la arquitectura e ingeniería técnica para que tu software sea ultra rápido, seguro y escalable.`,
        "Cuéntanos las funciones que imaginas llenando el formulario y te enviamos la cotización desglosada:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  // Default dual welcoming response
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: ¡Excelente consulta sobre "${userQuery}"! Nos encantaría ayudarte a darle forma visual y técnica.`,
      "IVÁN: Es muy fácil empezar: cuéntanos qué necesitas en nuestro formulario en 2 minutos y te preparamos la cotización completa y desglosada:\n👉 https://innocentia.tech/crear-proyecto",
    ],
  };
}
