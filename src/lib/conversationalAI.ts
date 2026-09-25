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
  // 1. ELEGIR LOGO / BRANDING / IDENTIDAD VISUAL & CONCEPTUALIZACIÓN
  // =========================================================================
  {
    id: "branding_logo",
    priority: 98,
    keywords: [
      "logo",
      "logotipo",
      "isotipo",
      "imagotipo",
      "marca",
      "marcas",
      "branding",
      "identidad visual",
      "manual de marca",
      "colores de marca",
      "paleta de colores",
      "diseño de marca",
      "diseno de marca",
      "que necesito para diseñar mi marca",
      "qué necesito para diseñar mi marca",
      "que necesito para disenar mi marca",
      "que se necesita para diseñar mi marca",
      "que se necesita para disenar",
      "como diseñan la marca",
      "como disenan la marca",
      "como elegir el logo",
      "cómo elegir el logo",
      "como elegir un logo",
      "cómo elegir un logo",
      "como puede elegir el logo",
      "cómo puede elegir el logo",
      "como puedo elegir el logo",
      "cómo puedo elegir el logo",
      "como elijo mi logo",
      "cómo elijo mi logo",
      "como elijo el logo",
      "cómo elijo el logo",
      "como saber que logo",
      "elegir logo",
      "escoger logo",
      "definir logo",
      "crear logo",
      "hacer logo",
      "diseñar logo",
      "disenar logo",
      "definir mi marca",
      "logo para mi negocio",
      "logo de mi marca",
      "estilo visual",
      "tipografia",
      "tipografía",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta esa pregunta! Para elegir el logo y estilo visual ideal, lo más importante no es solo que se vea bonito, sino lo que comunica: ¿Qué tipo de negocio tienes y qué sensaciones o valores buscas proyectar a tus clientes (por ejemplo: elegancia, cercanía, modernidad, lujo o dinamismo)?",
          "Cuéntame también si ya tienes algún nombre en mente o si te gustaría que exploremos propuestas conceptuales desde cero.",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: El logo perfecto nace de la esencia de tu empresa. ¿A qué público te diriges principalmente y qué hace única a tu propuesta frente a otros negocios?",
          "IVÁN: Y además cuidamos que la identidad gráfica sea completamente versátil: que funcione nítida en redes sociales, en tu página web, en aplicaciones móviles y en aplicaciones físicas o uniformes.",
        ],
      },
    ],
  },

  // =========================================================================
  // 2. MARKETING DIGITAL, ESTRATEGIAS, GROWTH, PAUTAS & PUBLICIDAD
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
          "SOFÍA: Para armar una estrategia que realmente funcione y conecte con la gente adecuada: ¿Qué producto o servicio es hoy tu principal fuente de ingresos o el que más te interesa impulsar?",
          "IVÁN: Conocer eso nos ayuda a definir el canal perfecto (Meta Ads, Google o WhatsApp) y la configuración técnica de captación. ¿Has probado hacer publicidad antes o sería tu primera campaña?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: En marketing cuidamos que cada anuncio visual transmita confianza inmediata y despierte el interés de tus clientes potenciales.",
          "IVÁN: ¿Qué objetivo principal buscas alcanzar en este momento: dar a conocer una marca nueva o generar prospectos diarios calificados para cerrar ventas por WhatsApp?",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID)
  // =========================================================================
  {
    id: "apps_moviles",
    priority: 93,
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
          "IVÁN: Para orientarte con la mejor arquitectura técnica: ¿La app sería para que la descarguen tus clientes finales (como una tienda, reservas o comunidad) o para la operación interna de tu equipo de trabajo?",
          "SOFÍA: Y a nivel de experiencia, ¿tienes en mente alguna aplicación de referencia cuyo diseño o dinámica de uso te guste?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Construimos apps para iOS y Android con conexión a bases de datos en tiempo real, pasarelas de pago y notificaciones push. ¿Qué problema principal busca resolver tu app?",
          "SOFÍA: Diseñamos cada pantalla para que sea súper intuitiva y agradable de usar desde el primer día.",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. PLATAFORMAS WEB, SAAS, SISTEMAS & TIENDAS ONLINE
  // =========================================================================
  {
    id: "plataformas_web",
    priority: 91,
    keywords: [
      "pagina web",
      "página web",
      "sitio web",
      "landing page",
      "web",
      "plataforma",
      "plataformas",
      "plataforma web",
      "software",
      "saas",
      "sistema web",
      "portal web",
      "desarrollo web",
      "programar pagina",
      "programar web",
      "ecommerce",
      "tienda online",
      "tienda en linea",
      "tienda en línea",
      "sistema",
      "sistemas",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Para estructurar el diseño ideal: ¿Qué tipo de negocio tienes y cuál es el objetivo principal del sitio (mostrar tus servicios con autoridad o vender productos/suscripciones en línea)?",
          "IVÁN: Desarrollamos con Next.js 15 para máxima velocidad y posicionamiento en Google. ¿Necesitas que la plataforma cuente con panel de administración, cobros con tarjeta o roles de usuario?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos la web para que guíe a tus visitantes de forma natural hacia la acción que deseas (contactar por WhatsApp, agendar o comprar).",
          "IVÁN: ¿Cuentas ya con contenido e imágenes de tu negocio o te gustaría que te apoyemos con la redacción y conceptualización completa?",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. INTELIGENCIA ARTIFICIAL, AGENTES & AUTOMATIZACIONES
  // =========================================================================
  {
    id: "ia_agentes",
    priority: 90,
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
          "IVÁN: La Inteligencia Artificial ahorra cientos de horas al mes. En el día a día de tu negocio, ¿en qué tarea o atención a clientes siente tu equipo que invierte más tiempo repetitivo?",
          "SOFÍA: Configuramos al agente para que hable con la calidez, personalidad y vocabulario exacto de tu empresa. ¿Te gustaría que atienda en WhatsApp, redes sociales o en tu página web?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Conectamos la IA directo a tu inventario, WhatsApp o CRM para que califique prospectos, responda cotizaciones y agende citas de forma autónoma 24/7.",
          "SOFÍA: ¿Qué tipo de dudas o procesos te gustaría que resuelva de manera automática?",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. PRECIOS, COSTOS & COTIZACIÓN
  // =========================================================================
  {
    id: "precios_cotizacion",
    priority: 92,
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
      "cuanto cobran",
      "cuánto cobran",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Cada proyecto lo adaptamos a la medida de tu visión y presupuesto. Para darte una recomendación acertada: ¿estás buscando el diseño de tu marca/logo, un sitio web, una app móvil o una automatización con IA?",
          "IVÁN: Si nos cuentas qué funciones principales tienes en mente, con mucho gusto te damos un rango de inversión claro y sin ningún compromiso.",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Manejamos esquemas accesibles tanto para negocios que están iniciando como para empresas con proyectos a gran escala.",
          "IVÁN: Además ofrecemos modalidades de pago por avances de proyecto o de renta tecnológica mensual todo incluido con servidores y soporte. ¿Qué formato se adapta mejor a tu flujo?",
        ],
      },
    ],
  },

  // =========================================================================
  // 7. PROCESO DE TRABAJO & METODOLOGÍA (CÓMO TRABAJAN / PASOS)
  // =========================================================================
  {
    id: "proceso_trabajo",
    priority: 89,
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
          "SOFÍA: 1. Primero tenemos una sesión para aterrizar tu idea y creamos un prototipo interactivo en Figma para que pruebes y apruebes cada detalle visual y pantallas directamente en tu celular.",
          "IVÁN: 2. Luego programamos la tecnología y te damos acceso a un enlace privado con avances continuos para que pruebes todo antes del lanzamiento oficial. ¿Para cuándo tienes planeado el estreno de tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 8. ESCALABILIDAD, ALTA CONCURRENCIA, TRÁFICO & ARQUITECTURA
  // =========================================================================
  {
    id: "escalabilidad",
    priority: 88,
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
          "Construimos con arquitecturas modernas sobre Next.js, PostgreSQL con pool de conexiones y Cloudflare Edge para responder en milisegundos incluso ante picos altos de visitas.",
          "¿Tienes alguna estimación del volumen de usuarios o transacciones mensuales que esperas recibir en tu plataforma?",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. PROPIEDAD DEL CÓDIGO, DERECHOS & REPOSITORIOS
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
          "El código fuente, los repositorios en GitHub, las bases de datos y la propiedad intelectual son 100% de tu empresa desde el día de entrega. Cero dependencias forzosas ni candados.",
          "¿Cuentas con equipo técnico interno en tu empresa o prefieres que nosotros nos encarguemos del mantenimiento y hosting?",
        ],
      },
    ],
  },

  // =========================================================================
  // 10. INTEGRACIONES: PASARELAS DE PAGO, STRIPE, WHATSAPP, FACTURACIÓN SAT
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
          "Integramos cualquier servicio que tu negocio necesite: pagos con tarjeta y MSI vía Stripe/Mercado Pago, transferencias SPEI automatizadas, timbrado de facturas SAT CFDI 4.0 o WhatsApp Cloud API.",
          "¿Tienes ya alguna pasarela, banco o sistema de facturación con el que operes actualmente?",
        ],
      },
    ],
  },

  // =========================================================================
  // 11. GARANTÍA TÉCNICA, BUGS, SOPORTE & MONITOREO
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
          "Todos nuestros desarrollos incluyen garantía técnica contra fallas o bugs y monitoreo de servidores, además de respaldos diarios automáticos en la nube.",
          "¿Tu proyecto requerirá soporte continuo en horarios específicos o mejoras evolutivas mensuales?",
        ],
      },
    ],
  },

  // =========================================================================
  // 12. MODALIDADES DE INVERSIÓN: PROYECTO A MEDIDA VS RENTA TECNOLÓGICA
  // =========================================================================
  {
    id: "modalidades_pago",
    priority: 78,
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
          "Manejamos dos esquemas según la etapa de tu negocio:\n1. Desarrollo a Medida por Proyecto: Pagos por avances y la propiedad total del código.\n2. Renta Tecnológica Todo Incluido: Inversión inicial accesible con una tarifa mensual que cubre infraestructura en la nube, servidores y soporte continuo.",
          "¿Cuál de estos dos modelos se acomoda mejor a la etapa de tu empresa?",
        ],
      },
    ],
  },

  // =========================================================================
  // 13. MIGRACIÓN, REDISEÑO & MEJORA DE SISTEMAS EXISTENTES
  // =========================================================================
  {
    id: "migracion_rediseno",
    priority: 77,
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
          "SOFÍA: ¡Podemos modernizarlo y darle nueva vida! Cuéntanos: ¿qué aspectos sientes que hoy no están funcionando en tu página o sistema actual (diseño, lentitud o poca conversión de clientes)?",
          "IVÁN: Y nos encargamos de migrar tu base de datos y backend sin perder información de clientes ni interrumpir las ventas de tu negocio.",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. COMBINADO: LOGO + APP / SOFTWARE INTEGRAL
  // =========================================================================
  {
    id: "combo_logo_app",
    priority: 76,
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
          "SOFÍA: ¡Es la mejor decisión! Creamos toda la identidad visual y estilo de tu marca para que tu producto transmita solidez y confianza desde el inicio.",
          "IVÁN: Y en paralelo programamos la aplicación para que el diseño y la tecnología se sincronicen a la perfección. ¿Qué tipo de servicio o producto ofrecerás en la plataforma?",
        ],
      },
    ],
  },

  // =========================================================================
  // 15. CONTACTO, WHATSAPP & UBICACIÓN
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
          "SOFÍA: ¡Nos dará mucho gusto platicar contigo! Nuestro equipo tiene base en Mérida, Yucatán, y trabajamos con proyectos en todo México y el extranjero.",
          "IVÁN: Puedes escribirnos a nuestro WhatsApp oficial +52 960 177 1556 o escribirnos a contacto@innocentia.tech. ¿Prefieres que coordinemos una videollamada para platicar de tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 16. SALUDOS & PRESENTACIONES
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
          "SOFÍA: ¡Hola! Qué gusto saludarte. Soy Sofía y lidero el diseño, la experiencia visual y la conceptualización de marca en Innocentia.",
          "IVÁN: Y yo soy Iván, a cargo de la arquitectura, desarrollo de software y tecnología. ¿Qué tipo de negocio tienes o qué proyecto traes en mente?",
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
      text: ["¡Hola! Cuéntanos qué tipo de negocio o idea tienes en mente y con gusto te asesoramos."],
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

  // Dynamic context-aware human fallbacks with open discovery questions
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
        `SOFÍA: Para orientarte con tu consulta sobre "${rawQuery}": ¿Qué producto o servicio es tu principal fuerte y a qué tipo de clientes te diriges?`,
        "IVÁN: Conocer tu objetivo nos permite recomendarte la mejor combinación de anuncios y embudos de venta directos a WhatsApp.",
      ],
    };
  }

  const isDesignFocused =
    testKeywordMatch(normalizedQuery, "diseno") ||
    testKeywordMatch(normalizedQuery, "diseño") ||
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
        `¡Me parece una excelente iniciativa! Sobre "${rawQuery}": ¿Qué tipo de negocio tienes y qué es lo que más te gustaría proyectar con él (elegancia, modernidad, cercanía, tecnología)?`,
        "Cuéntame si ya tienes referencias visuales o un nombre en mente para empezar a darle forma.",
      ],
    };
  }

  const isCodeFocused =
    testKeywordMatch(normalizedQuery, "codigo") ||
    testKeywordMatch(normalizedQuery, "programar") ||
    testKeywordMatch(normalizedQuery, "app") ||
    testKeywordMatch(normalizedQuery, "software") ||
    testKeywordMatch(normalizedQuery, "sistema") ||
    testKeywordMatch(normalizedQuery, "base de datos") ||
    testKeywordMatch(normalizedQuery, "web");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Sobre tu consulta de "${rawQuery}": para recomendarte la solución técnica más adecuada, ¿qué problema principal o necesidad operativa buscas resolver en tu empresa?`,
        "¿Se trata de una plataforma web para clientes o una herramienta para tu equipo de trabajo?",
      ],
    };
  }

  // Default dual welcoming response with discovery question
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: ¡Qué interesante lo que mencionas sobre "${rawQuery}"! Para conocer un poco mejor tu visión: ¿qué tipo de negocio tienes o qué estás buscando proyectar?`,
      "IVÁN: Y si necesitas desarrollo tecnológico o automatización, cuéntanos qué proceso o reto buscas resolver para asesorarte.",
    ],
  };
}

