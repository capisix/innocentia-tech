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
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Claro que sí! Las campañas para renta de yates y experiencias náuticas son fascinantes. En este sector el factor visual lo es todo: fotos y tomas de drone al atardecer, copys aspiracionales que vendan la experiencia (cumpleaños, despedidas, paseos privados o días de descanso en alta mar) y anuncios en Instagram/Facebook segmentados a perfiles de alto poder adquisitivo y turistas en la zona.",
          "IVÁN: Y en la parte de conversión, armamos un embudo directo a tu WhatsApp con respuestas rápidas para enviar catálogo de fotos del yate, tarifas por hora o día, amenidades incluidas y disponibilidad de fechas de forma inmediata. ¿En qué puerto o destino tienes tu embarcación (Cancún, Progreso/Yucatán, Los Cabos, Vallarta)?",
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
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡Los proyectos gastronómicos son de mis favoritos! Para el logo de un restaurante, la identidad visual debe despertar apetito y reflejar la experiencia en la mesa:\n\n1. El concepto culinario: ¿qué tipo de comida ofrecen (cortes, mariscos, comida mexicana tradicional, italiana, café de especialidad o autor)?\n2. La atmósfera: ¿buscas que se sienta cálido y familiar, rústico, juvenil y dinámico, o una propuesta íntima y elegante?\n3. Aplicación real: cuidamos que el logo luzca impecable en menús impresos y digitales (QR), uniformes del staff, empaques to-go, servilletas y letreros luminosos.\n\n¿Ya tienes definido el concepto del menú o el nombre de tu restaurante?",
          "IVÁN: Y a nivel tecnológico, podemos conectar tu identidad a un menú digital interactivo, sistema de reservas o pedidos directos por WhatsApp para que no dependas de las altas comisiones de apps externas. ¿Cuentas con servicio en mesa o te enfocas en delivery?",
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
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: En el sector inmobiliario la imagen debe transmitir absoluta solidez, prestigio y confianza para inversionistas y compradores. Diseñamos marcas con líneas sobrias y elegantes, renders visuales y dossiers digitales de venta de alto impacto.",
          "IVÁN: Y a nivel de ingeniería podemos crear un catálogo interactivo con disponibilidad de lotes en tiempo real, cotizador de financiamiento y conexión directa a tu CRM. ¿Qué tipo de desarrollos comercializas?",
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
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Para el sector salud y bienestar, cuidamos que los colores y la tipografía transmitan higiene, empatía y calma clínica, alejándonos de lo frío y distante para crear cercanía humana con tus pacientes.",
          "IVÁN: Y podemos integrar un sistema de agenda médica en línea o recordatorios automáticos por WhatsApp para reducir ausencias a consultas. ¿Cuál es la especialidad principal de tu clínica?",
        ],
      },
    ],
  },

  // =========================================================================
  // 1. ¿ES DIFÍCIL / COMPLICADO DISEÑAR O CREAR UN SISTEMA O APP? (PREGUNTA DIRECTA)
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
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Para nada tiene por qué ser difícil ni abrumador si se trabaja con el método correcto. Lo que suele complicar un sistema es cuando se intenta programar sin tener clara la lógica o cuando se improvisa sobre la marcha. Nosotros nos encargamos de toda la complejidad técnica y dividimos el proyecto en pasos sencillos.",
          "SOFÍA: Exacto, tú no tienes que preocuparte por tecnicismos ni aprender código; primero creamos un prototipo interactivo en Figma para que pruebes y apruebes cada pantalla en tu celular como si fuera un juego. Cuéntanos, ¿qué proceso o problema de tu negocio te gustaría sistematizar?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Diseñar un sistema se vuelve muy fluido cuando empezamos por entender qué necesitas resolver en tu día a día. Hacemos que la experiencia sea visualmente limpia, rápida y muy fácil de usar para ti o tus colaboradores.",
          "IVÁN: Y por la parte técnica, estructuramos una arquitectura sólida para que no te dé dolores de cabeza a futuro. ¿El sistema que imaginas sería para uso interno de tu equipo o para que lo usen tus clientes?",
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
      "tiempos de entrega",
      "cuanto tiempo toma",
      "cuánto tiempo toma",
      "fecha de entrega",
      "tardan mucho",
      "se tardan mucho",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Los tiempos dependen del alcance: un sitio web o landing page profesional toma entre 1 y 2 semanas; una identidad de marca completa alrededor de 2 semanas; y una plataforma o app móvil a medida suele tomar entre 4 y 8 semanas, con entregas continuas cada semana para que pruebes los avances en vivo.",
          "SOFÍA: Además, desde la primera semana ya estás viendo y aprobando el diseño interactivo en tu celular. ¿Para qué fecha tienes planeado o te gustaría estrenar tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. DECISIÓN: ¿QUÉ ME CONVIENE? (WEB VS APP)
  // =========================================================================
  {
    id: "decision_web_vs_app",
    priority: 104,
    keywords: [
      "que me conviene",
      "qué me conviene",
      "web o app",
      "app o web",
      "pagina o app",
      "página o app",
      "me conviene una app",
      "necesito una app",
      "vale la pena una app",
      "conviene una pagina",
      "que es mejor una web o una app",
      "qué es mejor una web o una app",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "IVÁN: Para la gran mayoría de los negocios que inician, lo más inteligente, rápido y rentable es arrancar con una plataforma web optimizada para celular. Una app móvil descargable tiene sentido si requieres funciones nativas como GPS continuo en segundo plano, cámara en modo offline o notificaciones push frecuentes.",
          "SOFÍA: Cuéntanos un poco: ¿qué producto o servicio ofreces y de qué manera te gustaría que tus clientes interactúen contigo?",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. SOLO TENGO UNA IDEA / NO SÉ DE TECNOLOGÍA / APENAS VOY EMPEZANDO
  // =========================================================================
  {
    id: "solo_tengo_una_idea",
    priority: 103,
    keywords: [
      "apenas tengo una idea",
      "solo tengo una idea",
      "sólo tengo una idea",
      "tengo una idea pero",
      "no tengo nada",
      "no tengo nada listo",
      "no se nada de tecnologia",
      "no sé nada de tecnología",
      "no entiendo de tecnologia",
      "no entiendo de tecnología",
      "soy nuevo en esto",
      "apenas voy empezando",
      "no tengo logo ni nada",
      "por donde empiezo",
      "por dónde empiezo",
      "como se empieza",
      "cómo se empieza",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: ¡No te preocupes para nada! De hecho, la gran mayoría de nuestros clientes llegan exactamente así: con una idea en mente o anotada en una libreta. Nuestro trabajo es justamente ayudarte a darle forma desde cero: desde el nombre, los colores y el estilo visual, hasta la estructura del producto.",
          "IVÁN: Tú eres el experto en la necesidad de tu negocio y nosotros nos encargamos de toda la ingeniería. Platícanos un poco: ¿de qué se trata tu idea o qué problema quieres resolver?",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. ¿QUÉ PASA SI NO ME GUSTA EL DISEÑO? / GARANTÍAS Y REVISIONES
  // =========================================================================
  {
    id: "garantias_cambios",
    priority: 102,
    keywords: [
      "que pasa si no me gusta",
      "qué pasa si no me gusta",
      "y si no me gusta",
      "no me gusta el diseno",
      "no me gusta el diseño",
      "hacen cambios",
      "cuantas revisiones",
      "cuántas revisiones",
      "puedo pedir cambios",
      "si hay errores",
      "que garantia tengo",
      "qué garantía tengo",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Precisamente por eso nunca programamos nada a ciegas. Antes de escribir una sola línea de código, te entregamos un prototipo interactivo en Figma donde pruebas cada pantalla, color y botón en tu propio celular. Hacemos todas las rondas de ajustes necesarias hasta que te encante al 100%.",
          "IVÁN: Y en la parte técnica, todos nuestros desarrollos cuentan con garantía contra fallas y soporte post-lanzamiento. ¿Tienes en mente alguna referencia o estándar visual que te guste?",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. ¿QUÉ NECESITAN DE MÍ PARA EMPEZAR?
  // =========================================================================
  {
    id: "que_necesitan_de_mi",
    priority: 101,
    keywords: [
      "que necesitan de mi",
      "qué necesitan de mí",
      "que se necesita para empezar",
      "qué se necesita para empezar",
      "que requisitos",
      "qué requisitos",
      "que debo entregar",
      "qué debo entregar",
      "que informacion necesitan",
      "qué información necesitan",
    ],
    responses: [
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: Para arrancar no necesitas ningún documento complejo; solo platicar con nosotros sobre tu visión: qué problema resuelve tu negocio, a quién va dirigido y si tienes referencias de marcas que te agraden.",
          "IVÁN: Nosotros te hacemos las preguntas clave y nos encargamos de traducir tu idea a especificaciones técnicas y arquitectura de software. ¿De qué trata tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 7. ELEGIR LOGO / BRANDING / IDENTIDAD VISUAL (CONSULTORÍA)
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
  // 8. MARKETING DIGITAL, ESTRATEGIAS, GROWTH, PAUTAS & PUBLICIDAD
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
          "SOFÍA: ¡Totalmente! Para armar una campaña que conecte y genere resultados, lo primero es el impacto visual: diseñamos anuncios y videos con copys persuasivos pensados en el perfil de tus clientes ideales.",
          "IVÁN: Y configuramos la segmentación (Meta Ads o Google) conectada a un embudo directo a tu WhatsApp para que atiendas a los interesados en el momento exacto. Cuéntanos: ¿en qué ciudad o destino te gustaría captar más clientes?",
        ],
      },
      {
        speaker: "DUAL",
        type: "both",
        text: [
          "SOFÍA: En marketing cuidamos que cada anuncio visual transmita confianza inmediata y despierte el deseo de compra.",
          "IVÁN: ¿Qué objetivo principal buscas alcanzar en este momento: dar a conocer una marca nueva o generar prospectos diarios para cerrar ventas directas?",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. DESARROLLO DE APPS MÓVILES (iOS Y ANDROID)
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
  // 10. PLATAFORMAS WEB, SAAS, SISTEMAS & TIENDAS ONLINE
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
  // 11. INTELIGENCIA ARTIFICIAL, AGENTES & AUTOMATIZACIONES
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
  // 12. PRECIOS, COSTOS & COTIZACIÓN
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
      "es muy caro",
      "es caro",
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
  // 13. PROCESO DE TRABAJO & METODOLOGÍA (CÓMO TRABAJAN / PASOS)
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
          "IVÁN: 2. Luego programamos la tecnología y te damos acceso a un enlace privado con avances continuos para que pruebes todo antes del lanzamiento oficial. ¿Para cuándo te gustaría estrenar tu proyecto?",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. PROPIEDAD DEL CÓDIGO & DERECHOS
  // =========================================================================
  {
    id: "propiedad_codigo",
    priority: 88,
    keywords: [
      "codigo es mio",
      "código es mío",
      "el codigo es nuestro",
      "el código es nuestro",
      "propiedad intelectual",
      "derechos de autor",
      "codigo fuente",
      "código fuente",
      "repositorio",
      "github",
      "de quien es el codigo",
      "de quién es el código",
      "somos dueños",
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
        // Multi-word phrases receive substantial weight so exact questions win over single words
        const phraseBonus = isPhrase ? (normalizedKw.split(" ").length * 150) : 0;
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
