export interface ChatBotResponse {
  speaker: "SOFÍA" | "IVÁN" | "DUAL";
  type: "sofia" | "ivan" | "both" | "system";
  text: string[];
}

interface MatchRule {
  keywords: string[];
  responses: Array<{
    speaker: "SOFÍA" | "IVÁN" | "DUAL";
    type: "sofia" | "ivan" | "both";
    text: string[];
  }>;
}

const RULES: MatchRule[] = [
  // 1. Pregunta combinada: Qué necesito para cotizar / Logo y Aplicación / Cotizar proyecto completo
  {
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
          "IVÁN: Y para tu aplicación o sistema web, solo cuéntanos qué funciones imaginas (por ejemplo: si llevará usuarios, catálogo, citas o cobros con tarjeta). Llenando nuestro formulario en 2 minutos te preparamos la cotización completa y desglosada.\n\n🚀 Puedes contarnos tu idea y cotizarla aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 2. Creación de Logo / Identidad de Marca / Branding / Vectores
  {
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
          "¡Me encanta dar vida a nuevas marcas! Diseñamos tu logotipo desde cero, asegurando que transmita confianza y profesionalismo.",
          "Te entregamos todos los formatos vectoriales listos para imprimir en cualquier tamaño, usar en redes sociales y en tu sitio web.\n\n🚀 Para iniciar tu diseño y recibir tu cotización, llena el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 3. Diseño UI/UX, Pantallas, Prototipos, Figma
  {
    keywords: ["figma", "ux", "ui", "prototipo", "interfaz", "diseño web", "wireframe", "pantallas", "mockup"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Diseñamos pantallas atractivas, modernas y muy fáciles de usar para tus clientes.",
          "Podrás probar el diseño interactivo directamente en tu teléfono antes de programar, para asegurarnos de que todo quede exactamente como lo soñaste.\n\n🚀 Cuéntanos qué pantallas necesitas llenando el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 4. Desarrollo de Apps Móviles (iOS y Android)
  {
    keywords: ["app", "aplicacion", "aplicación", "ios", "android", "play store", "app store", "flutter", "react native", "móvil", "movil", "celular", "telefono"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñamos la experiencia de tu app para que sea intuitiva, bonita y fácil de navegar con una sola mano.",
          "IVÁN: Y yo me encargo de programarla para que funcione súper rápido en iPhone y Android. Podemos incluir notificaciones, mapas, pagos o lo que requiera tu negocio. Con llenar el formulario te enviamos el costo exacto y tiempos.\n\n🚀 Registra los datos de tu app aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Creamos aplicaciones móviles a la medida para iPhone y Android, fáciles de administrar y listas para publicar en las tiendas de apps.",
          "Para decirte el presupuesto exacto solo necesitamos saber qué funciones te gustaría incluir. Llena el formulario en 2 minutos y te preparamos la propuesta:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 5. Plataformas Web, SaaS, Sistemas a Medida, CRM, Tiendas en Línea
  {
    keywords: ["saas", "plataforma", "sistema", "crm", "erp", "portal", "dashboard", "panel", "administrativo", "base de datos", "backend", "fullstack", "tienda", "ecommerce", "e-commerce"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Desarrollamos sistemas web y plataformas que automatizan tu negocio: paneles para administrar clientes, pedidos, cobros en línea y reportes en tiempo real.",
          "Son fáciles de usar desde cualquier computadora o celular. Cuéntanos qué proceso deseas digitalizar llenando el formulario para armar tu cotización:\n\n🚀 Llena tu solicitud aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 6. Inteligencia Artificial, Agentes, Chatbots, WhatsApp
  {
    keywords: ["ia", "inteligencia artificial", "agente", "chatbot", "chat bot", "automatizar", "automatizacion", "gpt", "llm", "openai"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Conectamos asistentes de Inteligencia Artificial a tu WhatsApp o página web para atender a tus clientes 24/7, responder dudas comunes y agendar citas automáticamente.",
          "SOFÍA: Y cuidamos que las respuestas se sientan cálidas, humanas y con el tono de tu marca.\n\n🚀 Para cotizar un asistente de IA para tu negocio, llena el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 7. Costos, Precios, Cuánto cuesta, Presupuesto
  {
    keywords: ["costo", "costos", "precio", "precios", "cuanto cuesta", "cuánto cuesta", "presupuesto", "cotizar", "cotizacion", "cotización", "tarifa", "valor"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Manejamos precios accesibles y esquemas flexibles (pago por etapas o modalidad de renta mensual con todo incluido):",
          "• Logotipos e Identidad Visual: Entregas rápidas con archivos vectoriales.\n• Sitios Web y Tiendas Online: Listos para vender y atraer clientes.\n• Aplicaciones y Sistemas a Medida: Desarrollados paso a paso para que pagues conforme apruebas avances.\n\n🚀 Para darte el presupuesto exacto según tu idea, llena el formulario en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 8. Tiempos de Entrega, Duración, Cuánto Tarda
  {
    keywords: ["tiempo", "tiempos", "cuanto tarda", "cuánto tarda", "duracion", "duración", "plazos", "dias", "semanas", "meses", "entrega", "cronograma"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Trabajamos con entregas rápidas y transparentes:",
          "• Logotipos y Diseños: De 3 a 7 días hábiles.\n• Sitios Web y Páginas de Venta: De 1 a 2 semanas.\n• Aplicaciones y Plataformas: De 3 a 6 semanas con avances visibles cada semana.\n\n🚀 Cuéntanos tu fecha objetivo llenando el formulario para adaptarnos a tu calendario:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 9. Seguridad, Código, Hosting, Servidores
  {
    keywords: ["seguridad", "hosting", "servidor", "nube", "cloud", "cifrado", "ssl", "postgresql", "supabase", "aws", "vercel"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Tu información y la de tus clientes siempre están protegidas: incluimos certificados de seguridad SSL, respaldos automáticos y servidores rápidos y estables. Además, el proyecto y el código son 100% tuyos.\n\n👉 Inicia tu proyecto de forma segura aquí: https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 10. Saludos y Charla Humana
  {
    keywords: ["hola", "buen dia", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos", "que tal", "qué tal", "como estas", "cómo estás"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Hola! Qué gusto saludarte. Yo me encargo del diseño, la imagen y que todo se vea increíble.",
          "IVÁN: ¡Hola! Y yo me encargo de la programación y que todo funcione a la perfección. Cuéntanos, ¿qué idea o proyecto tienes en mente?\n\nSi deseas cotizar de inmediato, puedes llenar el formulario aquí:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 11. Quiénes son / Qué es Innocentia
  {
    keywords: ["quienes son", "quiénes son", "quien eres", "quién eres", "que es innocentia", "qué es innocentia", "sofia", "sofía", "ivan", "iván", "dual core"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Somos el equipo de Innocentia Tech! Creamos marcas, sitios web y aplicaciones que ayudan a negocios a crecer y vender más.",
          "IVÁN: Te acompañamos desde la idea inicial hasta el lanzamiento final. Cuéntanos tu proyecto y con gusto te preparamos una propuesta sin compromiso:\n👉 https://innocentia.tech/crear-proyecto",
        ],
      },
    ],
  },

  // 12. Agradecimientos y Cierre
  {
    keywords: ["gracias", "muchas gracias", "excelente", "perfecto", "genial", "buenisimo", "buenísimo", "me gusta", "ok", "vale"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Con muchísimo gusto! Cuando desees dar el siguiente paso, aquí estaremos para apoyarte. Puedes llenar el formulario de cotización aquí:\n👉 https://innocentia.tech/crear-proyecto ✨",
        ],
      },
    ],
  },

  // 13. Contacto, Teléfono y WhatsApp Oficial de Innocentia
  {
    keywords: ["telefono", "teléfono", "whatsapp", "whats", "numero", "número", "celular", "llamar", "marcar", "contacto", "9601771556", "960 177 1556"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Nuestro canal oficial de WhatsApp y atención telefónica es el +52 960 177 1556. También nos puedes escribir a contacto@innocentia.tech.",
          "SOFÍA: Puedes escribirnos por WhatsApp al 960 177 1556 en cualquier momento o llenar el formulario de cotización en https://innocentia.tech/crear-proyecto para comenzar de inmediato.",
        ],
      },
    ],
  },
];

let lastResponseIndex: { [key: string]: number } = {};

export function getIntelligentHumanReply(userQuery: string): ChatBotResponse {
  const query = userQuery.toLowerCase().trim();
  if (!query) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: ["¿En qué podemos ayudarte hoy? Cuéntanos tu idea sobre diseño, desarrollo o tecnología."],
    };
  }

  // Find best match with scoring (longer, more specific keywords win)
  let bestMatch: MatchRule | null = null;
  let highestScore = 0;

  for (const rule of RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (query.includes(kw)) {
        score += kw.length * 2; // Specificity weighting
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && highestScore > 0) {
    const key = bestMatch.keywords[0];
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
    query.includes("visual") ||
    query.includes("dibuj") ||
    query.includes("estilo") ||
    query.includes("bonit") ||
    query.includes("color") ||
    query.includes("logo") ||
    query.includes("marca");

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `¡Claro que sí! Con respecto a "${userQuery}", en diseño nos enfocamos en que tu proyecto tenga una imagen atractiva, moderna y profesional.`,
        "Para conocer tu estilo y prepararte una propuesta personalizada, llena el formulario aquí en 2 minutos:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  const isCodeFocused =
    query.includes("funciona") ||
    query.includes("lenguaje") ||
    query.includes("servidor") ||
    query.includes("velocidad") ||
    query.includes("codigo") ||
    query.includes("app") ||
    query.includes("sistema");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Sobre tu consulta de "${userQuery}": nosotros nos encargamos de toda la parte técnica para que tu software sea rápido, seguro y fácil de usar.`,
        "Cuéntanos las funciones que imaginas llenando el formulario y te enviamos la cotización desglosada:\n👉 https://innocentia.tech/crear-proyecto",
      ],
    };
  }

  // Default dual welcoming response
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: ¡Excelente idea! Nos encantaría ayudarte con "${userQuery}".`,
      "IVÁN: Es muy fácil empezar: solo cuéntanos qué necesitas en nuestro formulario en 2 minutos y te preparamos la cotización completa:\n👉 https://innocentia.tech/crear-proyecto",
    ],
  };
}
