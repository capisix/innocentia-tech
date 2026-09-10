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
  // 1. Logos Vectoriales / Curvas / Formatos SVG / Illustrator
  {
    keywords: ["vector", "svg", "illustrator", "curvas", "eps", "pdf editable", "escalable", "formato vector"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Claro que sí! Todo logotipo que diseñamos se entrega en formato 100% vectorial (.SVG, .AI de Adobe Illustrator y .EPS en curvas).",
          "Esto significa que podrás escalarlo desde un favicon de 16px hasta un espectacular panorámico gigante sin perder ni un milímetro de nitidez. Además, te entregamos las versiones en positivo, negativo, monocromático y su paleta de colores oficial.",
        ],
      },
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Por supuesto! El diseño vectorial es la base de cualquier identidad profesional. Te entregamos los archivos maestros en vectores limpios, optimizados para impresión en gran formato, serigrafía, bordado y código web en SVG con carga instantánea.",
        ],
      },
    ],
  },

  // 2. Creación de Logo / Identidad de Marca / Branding
  {
    keywords: ["logo", "logotipo", "isotipo", "imagotipo", "marca", "branding", "identidad visual", "colores de marca"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta dar vida a nuevas marcas! Para tu logo trabajamos en la conceptualización, exploración de formas, psicología del color y tipografía personalizada.",
          "Te entregamos un manual de identidad completo con aplicaciones digitales, versiones para modo claro y oscuro, y todos los assets listos para tus redes y tu web. ¿Tienes ya algún estilo en mente o empezamos desde una hoja en blanco?",
        ],
      },
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Diseñar una marca es capturar el alma de tu proyecto. En Innocentia creamos logotipos memorables que destacan en pantallas digitales y en físico, acompañados de su guía de estilo tipográfico y paleta cromática.",
        ],
      },
    ],
  },

  // 3. Diseño UI/UX, Prototipos, Figma
  {
    keywords: ["figma", "ux", "ui", "prototipo", "interfaz", "diseño web", "wireframe", "pantallas", "mockup"],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "En UX/UI construimos el sistema de diseño completo en Figma con componentes interactivos a 60 fps.",
          "Diseñamos cada flujo pensando en la facilidad de uso de tus clientes, con animaciones fluidas y microinteracciones que convierten visitantes en usuarios recurrentes. Podrás probar y navegar el prototipo en tu teléfono antes de programar una sola línea de código.",
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
          "SOFÍA: Diseñamos la experiencia de tu app con gestos táctiles naturales, modo oscuro/claro y navegación fluida pensada para pulgares.",
          "IVÁN: Y en la parte de ingeniería, desarrollamos con arquitectura nativa y multiplataforma (React Native / Flutter) conectada a backend en tiempo real, notificaciones push, modo offline y publicación directa en App Store y Google Play.",
        ],
      },
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Desarrollamos aplicaciones móviles de alto rendimiento para iOS y Android con sincronización en tiempo real, autenticación biométrica y consumo de batería ultra eficiente.",
          "Podemos integrar pasarelas de pago, geolocalización, cámara y sincronización con tu base de datos central.",
        ],
      },
    ],
  },

  // 5. Plataformas Web, SaaS, Sistemas a Medida, CRM, ERP
  {
    keywords: ["saas", "plataforma", "sistema", "crm", "erp", "portal", "dashboard", "panel", "administrativo", "base de datos", "backend", "fullstack", "nextjs", "react"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Estructuramos plataformas web y SaaS completas sobre Next.js 15, PostgreSQL y arquitectura serverless. Incluye autenticación segura, roles de usuario (admin, cliente, operador), pasarela de cobros recurrentes (Stripe / Mercado Pago) y paneles analíticos en tiempo real.",
          "Todo el código se entrega modular, documentado y listo para escalar a miles de usuarios concurrentes.",
        ],
      },
    ],
  },

  // 6. Inteligencia Artificial, Agentes, Chatbots, Automatización
  {
    keywords: ["ia", "inteligencia artificial", "agente", "chatbot", "chat bot", "automatizar", "automatizacion", "gpt", "llm", "deep learning", "gemini", "openai"],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Integramos agentes de Inteligencia Artificial conectados a los datos de tu empresa (mediante RAG y embeddings vectoriales). Pueden atender clientes por WhatsApp, generar cotizaciones automáticas o analizar reportes en segundos.",
          "SOFÍA: Y cuidamos que la interfaz de conversación sea empática, rápida y con una personalidad fiel a tu marca para que los usuarios sientan una atención humana y natural.",
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
          "Manejamos presupuestos transparentes y modulares por etapas o sprints semanales, lo que te permite pagar conforme validas avances reales:",
          "• Identidad de Marca y Prototipado UX/UI: Desde proyectos ágiles hasta sistemas completos.\n• Landing Pages & Web Corporativa: Rápidas, optimizadas para SEO y móviles.\n• MVPs y Apps / SaaS a medida: Entregados en sprints de 2 a 4 semanas.\n\nPuedes ingresar a 'Crear Proyecto' o 'Portal' para obtener una estimación desglosada y adaptada exactamente a lo que necesitas.",
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
          "Trabajamos con metodología ágil en sprints de entrega continua:",
          "• Branding y Prototipos UI/UX: 5 a 10 días hábiles con revisiones directas en Figma.\n• Landing pages y webs interactivas: 1 a 2 semanas.\n• Aplicaciones completas y MVPs: De 3 a 6 semanas, con despliegues semanales para que pruebes el avance en vivo.",
        ],
      },
    ],
  },

  // 9. Seguridad, Código, Hosting, Nube, Base de Datos
  {
    keywords: ["seguridad", "hosting", "servidor", "nube", "cloud", "cifrado", "ssl", "postgresql", "supabase", "aws", "vercel"],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "La seguridad y la propiedad del código son innegociables: todo el software se despliega con certificados SSL automáticos, bases de datos cifradas en reposo y en tránsito, copias de seguridad diarias y repositorios privados de Git transferidos al 100% a tu empresa.",
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
          "SOFÍA: ¡Hola! Qué alegría saludarte. Soy Sofía, encargada del diseño, arte y experiencia de usuario en Innocentia.",
          "IVÁN: ¡Hola! Y yo soy Iván, a cargo de la arquitectura, código y tecnología. Cuéntanos, ¿qué proyecto o idea tienes en mente hoy?",
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
          "SOFÍA: ¡Somos el corazón de Innocentia Tech! Yo represento la imaginación, la creatividad visual y el diseño centrado en personas.",
          "IVÁN: Y yo represento la ingeniería rigurosa, el desarrollo de software y la infraestructura escalable. Juntos convertimos cualquier idea en tecnología real y funcional.",
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
          "¡Con muchísimo gusto! Cuando estés listo para comenzar o quieras explorar más detalles, aquí estaremos. También puedes hacer clic en 'Crear Proyecto' para iniciar tu cotización personalizada. ✨",
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
    query.includes("color");

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `Comprendo lo que buscas sobre "${userQuery}". En diseño cuidamos cada detalle visual, desde la paleta de colores hasta la composición y legibilidad.`,
        "Podemos crear propuestas personalizadas para que tu producto transmita exactamente el valor y la confianza que deseas.",
      ],
    };
  }

  const isCodeFocused =
    query.includes("funciona") ||
    query.includes("lenguaje") ||
    query.includes("servidor") ||
    query.includes("velocidad") ||
    query.includes("codigo");

  if (isCodeFocused) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      text: [
        `Respecto a tu consulta sobre "${userQuery}": en Innocentia desarrollamos con estándares modernos de ingeniería, garantizando código limpio, tiempos de respuesta ultra rápidos y alta seguridad.`,
        "Cuéntame más sobre los requerimientos técnicos y te diré la mejor forma de implementarlo.",
      ],
    };
  }

  // Default dual welcoming response
  return {
    speaker: "DUAL",
    type: "both",
    text: [
      `SOFÍA: Entendido. Nos encanta analizar nuevas ideas como "${userQuery}".`,
      "IVÁN: Cuéntanos un poco más sobre el alcance o presiona en 'Crear Proyecto' para estructurar un Blueprint con cotización y tiempos de entrega.",
    ],
  };
}
