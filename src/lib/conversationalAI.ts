export interface ChatBotResponse {
  speaker: "SOFÍA" | "IVÁN" | "DUAL";
  type: "sofia" | "ivan" | "both" | "system";
  text: string[];
}

interface MatchRule {
  id: string;
  priority: number;
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
          "SOFÍA: ¡Me encanta ese enfoque! En marketing creamos la estrategia visual: anuncios de alto impacto para Instagram, Facebook y Google con copys persuasivos y páginas optimizadas para convertir visitas en clientes.",
          "IVÁN: Y en la parte técnica configuramos la segmentación de audiencias, píxeles de conversión CAPI y embudos conectados directo a WhatsApp o CRM para maximizar tus ventas y el retorno de tu inversión.",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos campañas integrales: desde el branding y creativos visuales para tus redes, hasta embudos de venta y automatizaciones de seguimiento.",
          "IVÁN: Optimizamos cada etapa del embudo de adquisición para que tu costo por cliente potencial disminuya semana a semana con datos reales y medición precisa.",
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
          "Nuestros sistemas están construidos para soportar alta demanda sin problemas. Arquitecturamos sobre Next.js 15, PostgreSQL con pool de conexiones y redes globales en Cloudflare Edge.",
          "Esto permite que tu plataforma inicie ligera y escale de forma transparente a miles o millones de usuarios concurrentes con tiempos de respuesta de milisegundos y 99.98% de disponibilidad.",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: A nivel de ingeniería utilizamos balanceo de carga automático y servidores Edge en la nube que responden en milisegundos sin importar el volumen de tráfico.",
          "SOFÍA: Y a nivel visual construimos con Sistemas de Diseño Modulares para que cuando tu plataforma crezca o agregues nuevos módulos, la interfaz se mantenga limpia, rápida y ordenada.",
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
      "soy dueño",
      "somos dueños",
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
          "El código fuente, los repositorios de GitHub, las bases de datos y la propiedad intelectual son 100% de tu empresa desde el día de entrega.",
          "No te atamos con licencias cerradas ni dependencias forzosas. Tienes control total para seguir desarrollando, cambiar de hosting o integrar a tu propio equipo técnico cuando lo decidas.",
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
          "Integramos cualquier pasarela o servicio que tu negocio requiera: cobros con tarjeta y MSI vía Stripe o Mercado Pago, transferencias SPEI automatizadas, timbrado de facturas SAT CFDI 4.0 y WhatsApp Cloud API oficial.",
          "Todo conectado en tiempo real con panel de administración y reportes automáticos para que tengas el control de tus operaciones.",
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
          "Todos nuestros desarrollos incluyen garantía técnica contra fallas o bugs y monitoreo de alta disponibilidad.",
          "Además, implementamos respaldos automáticos diarios en la nube para que la información de tu negocio esté siempre segura y respaldada.",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. PROCESO DE TRABAJO & METODOLOGÍA (CÓMO TRABAJAN / ETAPAS / PASOS)
  // =========================================================================
  {
    id: "proceso_trabajo",
    priority: 92,
    keywords: [
      "como trabajan",
      "cómo trabajan",
      "como es el proceso",
      "cómo es el proceso",
      "metodologia",
      "metodología",
      "pasos",
      "que pasos se siguen",
      "qué pasos se siguen",
      "pasos se siguen",
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
          "SOFÍA: 1. En la fase de Diseño & UX, nos reunimos para entender tu visión y construimos un prototipo interactivo en Figma para que pruebes y apruebes cada pantalla, colores y animaciones directamente en tu celular antes de programar.",
          "IVÁN: 2. En la fase de Ingeniería, programamos la arquitectura, base de datos y APIs con entregas y revisiones semanales en un enlace privado (staging) hasta hacer las pruebas finales de seguridad y el despliegue oficial.",
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
          "Manejamos 2 modalidades de inversión según la etapa de tu empresa:",
          "1. Desarrollo a Medida por Proyecto: Pagos divididos por etapas (Anticipo, Avances y Finiquito contra entrega). El código y plataforma son 100% tuyos.\n2. Renta Tecnológica Todo Incluido: Inversión inicial accesible con una tarifa mensual fija que incluye infraestructura en la nube, servidores, soporte técnico y mejoras continuas.",
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
          "SOFÍA: ¡Podemos modernizarlo por completo! Analizamos la usabilidad de tu plataforma actual para renovar la imagen, hacerla mucho más atractiva y aumentar la tasa de conversión de tus visitantes.",
          "IVÁN: Y migramos tus bases de datos y backend a arquitecturas modernas (Next.js + PostgreSQL) sin perder información de tus clientes ni interrumpir la operación de tu negocio.",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. CREACIÓN DE LOGO / BRANDING / IDENTIDAD VISUAL (¿QUÉ NECESITO?)
  // =========================================================================
  {
    id: "branding_logo",
    priority: 95,
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
      "diseño de marca",
      "que necesito para diseñar mi marca",
      "qué necesito para diseñar mi marca",
      "que necesito para disenar mi marca",
      "que se necesita para diseñar mi marca",
      "que se necesita para disenar",
      "como diseñan la marca",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta dar vida a nuevas identidades! Para empezar con el diseño de tu marca, lo principal es tener claro el propósito de tu proyecto, qué valores quieres transmitir y a qué tipo de clientes te diriges.",
          "Con eso definimos juntos la paleta cromática, tipografías, logotipo y manual de identidad completo. Te entregamos todos los archivos vectoriales (AI, SVG, PDF, PNG) listos para redes sociales, web, uniformes o papelería. ¿Tienes ya un nombre en mente o empezamos desde la conceptualización?",
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
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Es la mejor combinación! Creamos toda la identidad visual y estética de tu marca para que tu producto luzca profesional y coherente desde el primer día.",
          "IVÁN: Y en paralelo programamos la aplicación con la arquitectura tecnológica necesaria. Al trabajar ambas partes juntos, el diseño y el código se sincronizan a la perfección.",
        ],
      },
    ],
  },

  // =========================================================================
  // 11. INTELIGENCIA ARTIFICIAL, AGENTES & CHATBOTS WHATSAPP
  // =========================================================================
  {
    id: "ia_agentes",
    priority: 75,
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
          "IVÁN: Conectamos agentes de Inteligencia Artificial a tu WhatsApp Business o plataforma web capaces de atender clientes 24/7, resolver consultas y sincronizar datos en tiempo real.",
          "SOFÍA: Y cuidamos minuciosamente que las respuestas del bot tengan el tono, calidez, vocabulario y personalidad exacta de tu marca para que la atención se sienta natural y fluida.",
        ],
      },
    ],
  },

  // =========================================================================
  // 12. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID)
  // =========================================================================
  {
    id: "apps_moviles",
    priority: 70,
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
          "SOFÍA: Diseñamos la experiencia de tu app para que sea intuitiva, visualmente atractiva y fácil de usar con una sola mano a 60 FPS.",
          "IVÁN: Y la desarrollamos con rendimiento nativo para iOS y Android: notificaciones push, modo offline, pasarelas de pago y publicación oficial en App Store y Google Play Store.",
        ],
      },
    ],
  },

  // =========================================================================
  // 13. PRECIOS, COSTOS & COTIZACIÓN
  // =========================================================================
  {
    id: "precios_cotizacion",
    priority: 90,
    keywords: [
      "precio",
      "precios",
      "costo",
      "costos",
      "cuanto cuesta",
      "cuánto cuesta",
      "cuanto sale",
      "cuánto sale",
      "cotizar",
      "cotizacion",
      "cotización",
      "presupuesto",
      "tarifas",
      "valores",
      "inversion",
      "inversión",
      "paquetes",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Nuestros proyectos son a la medida! Manejamos referencias de inversión base:\n\n• Logotipos e Identidad de Marca: Desde $4,500 MXN.\n• Sitios Web y Landing Pages: Desde $12,000 MXN.\n• Campañas de Marketing & Growth: Planes de gestión mensual desde $8,000 MXN.\n• Apps Móviles y Plataformas SaaS: Desde $24,000 MXN (o en modalidad de renta tecnológica mensual con soporte).",
          "IVÁN: Si deseas calcular un presupuesto exacto con el desglose de funciones que requieres, puedes usar nuestro cotizador en línea o escribirnos por WhatsApp:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. CONTACTO, WHATSAPP & UBICACIÓN
  // =========================================================================
  {
    id: "contacto_ubicacion",
    priority: 85,
    keywords: [
      "contacto",
      "contactar",
      "telefono",
      "teléfono",
      "whatsapp",
      "correo",
      "email",
      "donde estan",
      "dónde están",
      "oficina",
      "oficinas",
      "merida",
      "mérida",
      "yucatan",
      "yucatán",
      "mexico",
      "méxico",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Nos encantará platicar contigo! Nuestro equipo tiene base en Mérida, Yucatán, y desarrollamos proyectos para clientes en todo México y el extranjero.",
          "IVÁN: Puedes escribirnos a nuestro WhatsApp oficial +52 960 177 1556 o enviarnos un correo a contacto@innocentia.tech para coordinar una videollamada.",
        ],
      },
    ],
  },

  // =========================================================================
  // 15. SALUDOS & PRESENTACIONES
  // =========================================================================
  {
    id: "saludos",
    priority: 60,
    keywords: [
      "hola",
      "buenos dias",
      "buenos días",
      "buenas tardes",
      "buenas noches",
      "que tal",
      "qué tal",
      "saludos",
      "hey",
      "quienes son",
      "quiénes son",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Hola! Qué gusto saludarte. Soy Sofía y lidero el diseño, la experiencia visual y la creatividad de marca en Innocentia.",
          "IVÁN: Y yo soy Iván, a cargo de la arquitectura, desarrollo de software y conexión de Inteligencia Artificial. ¿En qué tipo de proyecto estás pensando?",
        ],
      },
    ],
  },
];

let lastResponseIndex: { [key: string]: number } = {};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function testKeywordMatch(normalizedQuery: string, normalizedKw: string): boolean {
  if (normalizedQuery === normalizedKw) return true;
  const escapedKw = normalizedKw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^a-z0-9])${escapedKw}([^a-z0-9]|$)`, "i");
  return pattern.test(normalizedQuery);
}

export function getIntelligentHumanReply(userQuery: string): ChatBotResponse {
  const rawQuery = userQuery.trim();
  if (!rawQuery) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: ["¡Hola! Cuéntanos en qué proyecto estás pensando y con gusto te asesoramos."],
    };
  }

  const normalizedQuery = normalizeText(rawQuery);

  let bestMatch: MatchRule | null = null;
  let highestScore = -1;

  for (const rule of RULES) {
    let score = 0;
    let matchedKeywordsCount = 0;

    for (const kw of rule.keywords) {
      const normalizedKw = normalizeText(kw);

      if (testKeywordMatch(normalizedQuery, normalizedKw)) {
        matchedKeywordsCount++;
        const isPhrase = normalizedKw.includes(" ");
        const lengthBonus = normalizedKw.length * 4;
        const phraseBonus = isPhrase ? 80 : 0;

        score += rule.priority * 15 + lengthBonus + phraseBonus;
      }
    }

    if (matchedKeywordsCount > 1) {
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

  // Dynamic context-aware human fallbacks
  const isMarketingFocused =
    testKeywordMatch(normalizedQuery, "marketing") ||
    testKeywordMatch(normalizedQuery, "estrategia") ||
    testKeywordMatch(normalizedQuery, "vender") ||
    testKeywordMatch(normalizedQuery, "campana") ||
    testKeywordMatch(normalizedQuery, "publicidad");

  if (isMarketingFocused) {
    return {
      speaker: "DUAL",
      type: "both",
      text: [
        `SOFÍA: Con respecto a lo que mencionas sobre "${rawQuery}", en diseño de marketing creamos anuncios y copys visuales pensados para conectar emocionalmente con tus clientes.`,
        "IVÁN: Y configuramos las campañas y embudos técnicos para asegurar que cada clic tenga una alta probabilidad de convertirse en una venta.",
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
    testKeywordMatch(normalizedQuery, "interfaz");

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `¡Me parece una gran idea! Sobre "${rawQuery}", en diseño cuidamos que cada detalle visual exprese profesionalismo, confianza y modernidad.`,
        "¿Tienes alguna referencia o estilo visual que te guste, o prefieres que exploremos propuestas desde cero?",
      ],
    };
  }

  const isCodeFocused =
    testKeywordMatch(normalizedQuery, "codigo") ||
    testKeywordMatch(normalizedQuery, "programar") ||
    testKeywordMatch(normalizedQuery, "app") ||
    testKeywordMatch(normalizedQuery, "software") ||
    testKeywordMatch(normalizedQuery, "sistema") ||
    testKeywordMatch(normalizedQuery, "base de datos");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Sobre tu consulta de "${rawQuery}": estructuramos la tecnología para que sea rápida, modular y fácil de mantener a largo plazo.`,
        "¿Se trata de un desarrollo web, una app móvil o un sistema administrativo para tu operación interna?",
      ],
    };
  }

  // Default dual welcoming response
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: ¡Qué interesante lo que planteas sobre "${rawQuery}"! Nos encanta transformar ideas en experiencias visuales memorables.`,
      "IVÁN: Y nos aseguramos de que toda la ingeniería y funcionalidad técnica sea impecable. Cuéntanos un poco más para orientarte con la mejor solución.",
    ],
  };
}
