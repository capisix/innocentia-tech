export interface ChatBotResponse {
  speaker: "SOFÍA" | "IVÁN" | "DUAL";
  type: "sofia" | "ivan" | "both" | "system";
  text: string[];
}

export interface ChatHistoryMessage {
  sender: "user" | "sofia" | "ivan" | "both" | "system";
  text: string;
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
  // 0.0 GIRO ESPECÍFICO: YATES, RENTA DE EMBARCACIONES, TURISMO & LUJO
  // =========================================================================
  {
    id: "giro_yates_turismo",
    priority: 120,
    keywords: [
      "yate",
      "yates",
      "rentar mi yate",
      "rentar un yate",
      "renta de yates",
      "renta de yate",
      "rentar yates",
      "embarcacion",
      "embarcaciones",
      "lancha",
      "lanchas",
      "catamaran",
      "catamarán",
      "paseo en barco",
      "turismo de lujo",
      "experiencias nauticas",
      "experiencias náuticas",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Claro que sí! Las marcas y experiencias náuticas son fascinantes. En este sector el factor visual lo es todo: estética de lujo, tipografías elegantes y una narrativa aspiracional que transmita exclusividad, atardeceres y confort en alta mar.",
          "¿En qué puerto o destino se encuentra tu embarcación (Cancún, Progreso/Yucatán, Los Cabos, Vallarta) y qué tipo de experiencia buscas ofrecer a tus clientes?",
        ],
      },
    ],
  },

  // =========================================================================
  // 0.1 GIRO ESPECÍFICO: RESTAURANTES, GASTRONOMÍA, CAFETERÍAS & BARES
  // =========================================================================
  {
    id: "giro_restaurante",
    priority: 115,
    keywords: [
      "restaurante",
      "restaurantes",
      "logo de un restaurante",
      "logo para un restaurante",
      "logo para restaurante",
      "logo restaurante",
      "marca de restaurante",
      "cafeteria",
      "cafetería",
      "cafe",
      "café",
      "bar",
      "taqueria",
      "taquería",
      "comida",
      "gastronomia",
      "gastronomía",
      "gourmet",
      "antojitos",
      "reposteria",
      "repostería",
      "pasteleria",
      "pastelería",
      "pizzeria",
      "pizzería",
      "menu digital",
      "menú digital",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Los proyectos gastronómicos son de mis favoritos! Para el logo o la marca de un restaurante, la identidad visual debe despertar apetito y reflejar la experiencia en la mesa:\n\n1. El concepto culinario: ¿qué tipo de propuesta ofrecen (cortes, mariscos, cocina mexicana tradicional, italiana, café de especialidad o autor)?\n2. La atmósfera: ¿buscas que se sienta cálido y familiar, rústico, juvenil y dinámico, o una propuesta íntima y elegante?\n3. Aplicación real: cuidamos que el logo luzca impecable en menús impresos y digitales (QR), uniformes del staff, empaques to-go, servilletas y letreros luminosos.",
          "¿Cuál es la idea o concepto que quieres desarrollar para tu restaurante y ya tienes algún nombre en mente?",
        ],
      },
    ],
  },

  // =========================================================================
  // 0.2 GIRO ESPECÍFICO: INMOBILIARIAS, BIENES RAÍCES & ARQUITECTURA
  // =========================================================================
  {
    id: "giro_inmobiliaria",
    priority: 114,
    keywords: [
      "inmobiliaria",
      "inmobiliarias",
      "bienes raices",
      "bienes raíces",
      "desarrollo inmobiliario",
      "desarrolladora",
      "lotes",
      "terrenos",
      "departamentos",
      "constructora",
      "arquitectura",
      "propiedades",
      "logo inmobiliaria",
      "web inmobiliaria",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "En el sector inmobiliario la imagen debe transmitir absoluta solidez, prestigio y confianza para inversionistas y compradores. Diseñamos marcas con líneas sobrias y elegantes, paletas minerales y dossiers digitales de venta de altísimo impacto visual.",
          "¿Qué tipo de desarrollos o propiedades comercializas (residencial, lotes de inversión, departamentos boutique) y qué valores te gustaría proyectar?",
        ],
      },
    ],
  },

  // =========================================================================
  // 0.3 GIRO ESPECÍFICO: SALUD, CLÍNICAS, MÉDICOS & BIENESTAR
  // =========================================================================
  {
    id: "giro_salud",
    priority: 114,
    keywords: [
      "clinica",
      "clínica",
      "medico",
      "médico",
      "doctores",
      "dental",
      "dentista",
      "odontologia",
      "odontología",
      "spa",
      "estetica",
      "estética",
      "salud",
      "psicologia",
      "psicología",
      "dermatologia",
      "dermatología",
      "consultorio",
      "hospital",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Para el sector salud y bienestar, cuidamos que los colores y la tipografía transmitan higiene, empatía y calma clínica, alejándonos de lo frío y distante para crear una conexión humana y de absoluta confianza con tus pacientes.",
          "¿Cuál es la especialidad principal de tu clínica o consultorio y cómo te gustaría que comencemos a desarrollar tu marca?",
        ],
      },
    ],
  },

  // =========================================================================
  // 0.4 GIRO ESPECÍFICO: TALLERES MECÁNICOS, AUTOMOTRIZ & REFACCIONARIAS
  // =========================================================================
  {
    id: "giro_taller_mecanico",
    priority: 120,
    keywords: [
      "mecanico",
      "mecánico",
      "taller",
      "taller mecanico",
      "taller mecánico",
      "automotriz",
      "talleres",
      "hojalateria",
      "refaccionaria",
      "frenos",
      "suspension",
      "mecanica",
      "mecánica",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Un taller mecánico con una imagen formal y bien cuidada destaca de inmediato sobre toda la competencia tradicional! Para el sector automotriz, la clave de la marca es proyectar absoluta **confianza, honestidad y orden**:\n\n• **Identidad Visual:** Diseñamos un logo con tipografía robusta y colores que transmiten solidez (como tonos industriales grafito, azul profundo o acentos en rojo), pensado para lucir impecable en fachadas, uniformes del equipo, notas de servicio membretadas y letreros exteriores.\n• **Cero Complicaciones:** ¡No necesitas saber nada de diseño ni traer referencias, nosotros nos encargamos de prepararte las propuestas visuales!",
          "¿Cómo se llama actualmente tu taller o qué nombre te gustaría ponerle?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Me encanta la meta de hacer crecer tu taller! Nos encargamos de diseñar una marca sólida y confiable para que tus clientes sientan garantía desde que ven tu fachada o tu uniforme.",
          "IVÁN: Y para ayudarte a atraer más clientes y organizar el crecimiento: optimizamos tu presencia en Google Maps y WhatsApp, e incluso podemos crear un sistema sencillo para cotizar y registrar servicios. ¿Cuáles son los trabajos que más realizas en tu taller?",
        ],
      },
    ],
  },

  // =========================================================================
  // 0.5 CLIENTE SIN REFERENCIAS / DUEÑO DE NEGOCIO QUE BUSCA CRECER
  // =========================================================================
  {
    id: "usuario_sin_idea_asesoria",
    priority: 125,
    keywords: [
      "no tengo idea",
      "no se",
      "no sé",
      "solo soy",
      "sólo soy",
      "no conozco de diseño",
      "no se de diseño",
      "no sé de diseño",
      "no entiendo de diseño",
      "no tengo referencias",
      "tu dime",
      "tú dime",
      "recomiendame",
      "recomiéndame",
      "que me recomiendas",
      "qué me recomiendas",
      "ayudame a empezar",
      "ayúdame a empezar",
      "para crecer",
      "todo lo que me sirva",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Para nada te preocupes! Precisamente para eso estamos aquí: no necesitas tener ideas de diseño ni referencias previas. Nuestro trabajo es aterrizar todo de forma clara y presentarte opciones visuales profesionales listas para tu negocio.",
          "Para empezar a crear tus propuestas: ¿cómo se llama actualmente tu negocio o cómo te gustaría llamarlo?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡No te preocupes por no tener ideas de diseño! Nosotros nos encargamos de crear una imagen visual atractiva y profesional para tu negocio.",
          "IVÁN: Y de mi lado te ayudamos con todo lo necesario para crecer y captar clientes: presencia en Google, canal de WhatsApp y herramientas para tu día a día. ¿Cuáles son los servicios o productos estrella de tu negocio?",
        ],
      },
    ],
  },

  // =========================================================================
  // 1. ¿ES DIFÍCIL / COMPLICADO DISEÑAR O CREAR UN SISTEMA O APP?
  // =========================================================================
  {
    id: "dificultad_sistema_proceso",
    priority: 110,
    keywords: [
      "es dificil",
      "es difícil",
      "es muy dificil",
      "es muy difícil",
      "es complicado",
      "es muy complicado",
      "es dificil diseñar",
      "es difícil diseñar",
      "es dificil crear",
      "es difícil crear",
      "es dificil hacer",
      "es difícil hacer",
      "es dificil diseñar un sistema",
      "es difícil diseñar un sistema",
      "es dificil hacer un sistema",
      "es difícil hacer un sistema",
      "es dificil programar",
      "es difícil programar",
      "que tan dificil",
      "qué tan difícil",
      "que tan complicado",
      "qué tan complicado",
      "cuesta mucho trabajo",
      "se puede hacer",
      "es posible",
      "da miedo",
      "es facil",
      "es fácil",
      "es sencillo",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Para nada tiene que ser complicado! Hacemos que todo el proceso sea muy fluido y visual: primero creamos un prototipo interactivo en Figma para que puedas probar y aprobar cada pantalla y color directamente en tu celular antes de escribir una sola línea de código.",
          "¿Cuál es la idea o proyecto que quieres desarrollar y qué problema te gustaría resolver?",
        ],
      },
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Para nada es complicado si se sigue una metodología clara. Nosotros nos encargamos de toda la complejidad técnica, bases de datos y arquitectura para que tu sistema sea rápido y seguro.",
          "¿Qué funcionalidades o módulos imaginas para tu plataforma?",
        ],
      },
    ],
  },

  // =========================================================================
  // 2. TIEMPOS DE ENTREGA, DURACIÓN Y PLAZOS
  // =========================================================================
  {
    id: "tiempos_duracion",
    priority: 105,
    keywords: [
      "cuanto tardan",
      "cuánto tardan",
      "cuanto tiempo lleva",
      "cuánto tiempo lleva",
      "cuanto tiempo se tarda",
      "cuánto tiempo se tarda",
      "en cuanto tiempo",
      "en cuánto tiempo",
      "cuanto demora",
      "cuánto demora",
      "plazos de entrega",
      "plazos",
      "tiempos de entrega",
      "cronograma",
      "urgente",
      "en cuanto tiempo entregan",
      "en cuánto tiempo entregan",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Trabajamos con cronogramas claros y avances semanales en enlaces privados para que siempre veas el progreso en tiempo real:\n\n• Identidad de Marca & Logotipos: 3 a 7 días hábiles.\n• Sitios Web y Landing Pages: 1 a 2 semanas.\n• Apps Móviles y Plataformas SaaS: 3 a 6 semanas (con prototipo inicial listo en los primeros 5 días).",
          "¿Tienes alguna fecha límite o evento especial para el lanzamiento de tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. PRECIOS, COSTOS & FORMAS DE INVERSIÓN
  // =========================================================================
  {
    id: "precios_costos_claros",
    priority: 104,
    keywords: [
      "cuanto cobran",
      "cuánto cobran",
      "cuanto cuesta",
      "cuánto cuesta",
      "precios",
      "precio",
      "costo",
      "costos",
      "tarifas",
      "presupuesto",
      "cotizacion",
      "cotización",
      "inversion",
      "inversión",
      "formas de pago",
      "meses sin intereses",
      "facilidades de pago",
    ],
    responses: [
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Nuestros presupuestos son transparentes, detallados y sin letras chiquitas:\n\n• Identidad Visual & Logotipos: Desde $4,500 MXN.\n• Sitios Web & Landing Pages: Desde $12,000 MXN.\n• Plataformas SaaS & Apps Móviles: Desde $24,000 MXN (o en modalidad de renta tecnológica mensual con soporte incluido).\n• Campañas de Marketing & Growth: Planes de gestión mensual desde $8,000 MXN.",
          "¿Qué tipo de proyecto deseas cotizar y cuáles son las funciones principales que tienes en mente?",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. CREACIÓN DE LOGO / BRANDING / IDENTIDAD VISUAL (100% SOFÍA)
  // =========================================================================
  {
    id: "branding_logo",
    priority: 102,
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
      "diseño",
      "diseno",
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
      "empaque",
      "packaging",
      "etiquetas",
      "rediseño de logo",
      "rediseño de marca",
    ],
    responses: [
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Me encanta dar vida a nuevas marcas! Para diseñar la identidad visual perfecta, nos enfocamos en que tu logo no solo se vea impecable, sino que transmita los valores exactos de tu negocio y conecte con las emociones de tus clientes.",
          "¿Cuál es la idea que quieres desarrollar para tu marca y de qué trata tu negocio o emprendimiento?",
        ],
      },
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Diseñar una marca es uno de los pasos más emocionantes! Te entregamos tu logotipo en todos los formatos vectoriales de alta resolución (AI, SVG, PDF, PNG), paleta de colores oficial, tipografías y manual de uso listo para redes, empaques o sitio web.",
          "¿Tienes alguna referencia visual, estilo o paleta de colores en mente, o te gustaría que comencemos a explorar propuestas desde cero?",
        ],
      },
      {
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Una gran marca nace de su propósito. Cuidamos cada curva, tipografía y contraste para que tu proyecto destaque con personalidad propia frente a la competencia.",
          "¿Es una marca completamente nueva o buscas renovar y modernizar una identidad que ya existe?",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. DISEÑO UI/UX, PANTALLAS, FIGMA & PROTOTIPOS (100% SOFÍA)
  // =========================================================================
  {
    id: "ui_ux_figma",
    priority: 99,
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
          "Diseñamos interfaces atractivas, modernas e intuitivas en Figma. Podrás probar el prototipo interactivo directamente en tu teléfono antes de programar, para asegurarnos de que la navegación y cada detalle visual queden perfectos.",
          "¿Qué tipo de aplicación o plataforma estás planeando y qué pantallas clave imaginas para tus usuarios?",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. MARKETING DIGITAL, ESTRATEGIAS, GROWTH, PAUTAS & PUBLICIDAD
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
          "SOFÍA: ¡Me apasiona el marketing visual! Creamos anuncios atractivos con copys persuasivos y landing pages diseñadas para convertir visitas en clientes reales.",
          "IVÁN: Y en la parte analítica, configuramos segmentación cruzada en Meta & Google Ads con píxeles de conversión y embudos conectados a WhatsApp o CRM para maximizar tu retorno (ROAS). ¿Cuál es tu producto o servicio principal y a qué público te gustaría llegar?",
        ],
      },
    ],
  },

  // =========================================================================
  // 6.5 SISTEMAS DE RESERVAS, CITAS Y AGENDAMIENTO WEB (DUAL & SENCILLO)
  // =========================================================================
  {
    id: "reservas_citas_web",
    priority: 115,
    keywords: [
      "reservar",
      "reservas",
      "citas",
      "agenda",
      "agendamiento",
      "pagina de reservas",
      "página de reservas",
      "sistema de citas",
      "sistema de reservas",
      "agendar",
      "calendario",
      "turnos",
      "apartar",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Excelente idea! Diseñamos una página muy visual, limpia y atractiva para que tus clientes sientan total confianza desde que entran y puedan reservar en menos de 1 minuto desde su celular.",
          "IVÁN: Y en la parte de funcionamiento: creamos un sistema ágil donde tus clientes eligen día, hora y servicio disponible, con confirmación directa a WhatsApp y recordatorios automáticos para que no se te cruce ninguna cita.\n\n¿Te gustaría que generemos el [Blueprint de tu Proyecto](/crear-proyecto) para ver el alcance exacto, tiempos de entrega y cotización formal?",
        ],
      },
      {
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Podemos crear una página web de reservas muy rápida y sencilla para tus clientes: eligen el servicio, la fecha y el horario disponible desde su teléfono, y a ti te llega la notificación inmediata a WhatsApp o a tu panel de control.\n\n¿Te gustaría que generemos el [Blueprint de tu Proyecto](/crear-proyecto) para armar la propuesta técnica y costos exactos?",
        ],
      },
    ],
  },

  // =========================================================================
  // 7. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID) (100% IVÁN - LENGUAJE CLARO)
  // =========================================================================
  {
    id: "apps_moviles",
    priority: 92,
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
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Desarrollamos aplicaciones móviles para iPhone (iOS) y Android que son súper rápidas y fáciles de usar: mapas y ubicación, notificaciones directas al teléfono de tus clientes, cobros seguros con tarjeta y publicación oficial en la App Store y Google Play.",
          "¿Qué funciones principales imaginas para tu app o qué problema le resolverá a tus clientes?",
        ],
      },
    ],
  },

  // =========================================================================
  // 8. SISTEMAS WEB, SAAS, CRM, ERP & PLATAFORMAS (100% IVÁN - LENGUAJE CLARO)
  // =========================================================================
  {
    id: "sistemas_saas",
    priority: 90,
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
          "Construimos sistemas y plataformas web a la medida de tu negocio utilizando tecnología moderna (Next.js 15 para máxima velocidad en Google y bases de datos seguras): paneles para administrar tu operación, control de clientes y ventas, cotizadores automáticos y reportes en tiempo real.",
          "¿Qué tareas o procesos de tu empresa te gustaría tener bajo control o automatizar?",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. INTELIGENCIA ARTIFICIAL, AGENTES & CHATBOTS WHATSAPP
  // =========================================================================
  {
    id: "ia_agentes",
    priority: 88,
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
        speaker: "IVÁN",
        type: "ivan",
        text: [
          "Conectamos agentes de Inteligencia Artificial directamente a tu WhatsApp Business o plataforma web capaces de atender consultas 24/7, calificar prospectos y agendar citas o cotizaciones de forma autónoma.",
          "¿Qué tipo de consultas o tareas repetitivas te gustaría que el agente de IA resuelva automáticamente en tu empresa?",
        ],
      },
    ],
  },

  // =========================================================================
  // 10. PROPIEDAD DEL CÓDIGO, DERECHOS & REPOSITORIOS
  // =========================================================================
  {
    id: "propiedad_codigo",
    priority: 85,
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
          "El código fuente, los repositorios de GitHub, las bases de datos y los derechos de propiedad intelectual son 100% de tu empresa desde el día de entrega, sin licencias cerradas ni ataduras.",
          "¿Tienes algún equipo técnico interno o prefieres que nosotros nos encarguemos también del soporte y la infraestructura cloud?",
        ],
      },
    ],
  },

  // =========================================================================
  // 11. UBICACIÓN, OFICINAS, VISITAS & REUNIONES VIRTUALES
  // =========================================================================
  {
    id: "ubicacion_contacto",
    priority: 80,
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
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "Nuestra base de diseño e ingeniería está ubicada en Mérida, Yucatán, y colaboramos activamente con empresas de toda la República Mexicana, Estados Unidos y Latinoamérica.",
          "Podemos coordinar una videollamada por Google Meet o agendar una cita presencial si te encuentras en Mérida. ¿Desde qué ciudad o país nos escribes?",
        ],
      },
    ],
  },

  // =========================================================================
  // 12. SALUDOS & CHARLA HUMANA
  // =========================================================================
  {
    id: "saludos",
    priority: 70,
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
        speaker: "SOFÍA",
        type: "sofia",
        text: [
          "¡Hola! Qué gusto saludarte. Soy Sofía, líder de diseño y experiencia visual en Innocentia Tech.",
          "¿Cuál es la idea o proyecto que tienes en mente y cómo te gustaría que comencemos a darle forma?",
        ],
      },
    ],
  },

  // =========================================================================
  // 13. AGRADECIMIENTOS & CIERRE
  // =========================================================================
  {
    id: "agradecimientos",
    priority: 60,
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
          "¡Con muchísimo gusto! Cuando estés listo para dar el siguiente paso, aquí estaremos para crear algo extraordinario. ✨",
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

/**
 * Intelligent Human-Centric Engine:
 * - Direct specialist answers (Sofía for design/brand, Iván for tech/code).
 * - Engaging open-ended discovery questions.
 * - Progressive Tech Handover: After Sofía has led 2+ turns, Iván joins smoothly.
 */
export function getIntelligentHumanReply(
  userQuery: string,
  history?: Array<{ sender: string; text: string }>
): ChatBotResponse {
  const rawQuery = userQuery.trim();
  if (!rawQuery) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        "¡Hola! ¿Cuál es la idea o proyecto que te gustaría desarrollar hoy?",
      ],
    };
  }

  const normalizedQuery = normalizeText(rawQuery);

  // Count how many times Sofía has interacted in this session
  const sofiaInteractions = (history || []).filter(
    (m) => m.sender === "sofia" || (m.sender === "both" && m.text.includes("SOFÍA"))
  ).length;

  const isDesignFocused =
    testKeywordMatch(normalizedQuery, "diseno") ||
    testKeywordMatch(normalizedQuery, "diseño") ||
    testKeywordMatch(normalizedQuery, "logo") ||
    testKeywordMatch(normalizedQuery, "marca") ||
    testKeywordMatch(normalizedQuery, "branding") ||
    testKeywordMatch(normalizedQuery, "color") ||
    testKeywordMatch(normalizedQuery, "colores") ||
    testKeywordMatch(normalizedQuery, "estilo") ||
    testKeywordMatch(normalizedQuery, "visual") ||
    testKeywordMatch(normalizedQuery, "figma") ||
    testKeywordMatch(normalizedQuery, "empaque") ||
    testKeywordMatch(normalizedQuery, "restaurante") ||
    testKeywordMatch(normalizedQuery, "clinica") ||
    testKeywordMatch(normalizedQuery, "inmobiliaria");

  const isTechMentioned =
    testKeywordMatch(normalizedQuery, "app") ||
    testKeywordMatch(normalizedQuery, "aplicacion") ||
    testKeywordMatch(normalizedQuery, "web") ||
    testKeywordMatch(normalizedQuery, "sistema") ||
    testKeywordMatch(normalizedQuery, "programar") ||
    testKeywordMatch(normalizedQuery, "codigo") ||
    testKeywordMatch(normalizedQuery, "servidor") ||
    testKeywordMatch(normalizedQuery, "cobrar");

  // =========================================================================
  // PROGRESSIVE 3RD TURN HANDOVER:
  // If Sofía has already interacted 2+ times and the conversation is maturing,
  // Iván steps in warmly to offer the technological implementation!
  // =========================================================================
  if (sofiaInteractions >= 2 && (isDesignFocused || isTechMentioned)) {
    return {
      speaker: "DUAL",
      type: "both",
      text: [
        `SOFÍA: ¡Me encanta la dirección que está tomando tu idea! Con respecto a lo que comentas: podemos darle una personalidad visual única que resalte desde el primer momento.`,
        "IVÁN: Me sumo a la plática con Sofía: una vez que tengamos listos los prototipos y la identidad visual, yo me encargo de construir toda la arquitectura técnica (sitio web, aplicación móvil o sistema de cobros y base de datos). ¿Tienes pensado que tu proyecto cuente con tienda en línea, app móvil o portal para tus clientes?",
      ],
    };
  }

  // Find best match with priority scoring
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
        const phraseBonus = isPhrase ? normalizedKw.split(" ").length * 150 : 0;
        const lengthBonus = normalizedKw.length * 5;

        score += rule.priority * 20 + lengthBonus + phraseBonus;
      }
    }

    if (matchedKeywordsCount > 1) {
      score += matchedKeywordsCount * 60;
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

  // Dynamic context-aware fallbacks
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
        `SOFÍA: Para tu estrategia de marketing sobre "${rawQuery}": diseñamos anuncios y creativos visuales de alto impacto que conecten con tu audiencia ideal.`,
        "IVÁN: Y configuramos segmentación cruzada y embudos directos a WhatsApp para maximizar tus ventas. ¿Cuál es tu producto o servicio estrella y a qué público buscas llegar?",
      ],
    };
  }

  if (isDesignFocused) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      text: [
        `¡Me parece una excelente iniciativa! Sobre "${rawQuery}": ¿Cuál es la idea o concepto que quieres desarrollar para tu marca y de qué trata tu negocio?`,
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
        `Sobre tu consulta de "${rawQuery}": para recomendarte la arquitectura técnica más adecuada, ¿qué problema principal o necesidad operativa buscas resolver en tu empresa?`,
        "¿Se trata de una plataforma web para tus clientes o una herramienta para tu equipo de trabajo?",
      ],
    };
  }

  // Default natural welcoming response from Sofía
  return {
    speaker: "SOFÍA",
    type: "sofia",
    text: [
      `¡Qué interesante lo que mencionas sobre "${rawQuery}"! Para conocer mejor tu visión: ¿cuál es la idea qué quieres desarrollar o cómo te gustaría que comencemos a desarrollar tu proyecto?`,
    ],
  };
}
