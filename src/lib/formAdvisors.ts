export interface AdvisorProfile {
  name: string;
  role: string;
  avatar: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
}

export const ADVISOR_PROFILES: Record<"sofia" | "ivan" | "both", AdvisorProfile> = {
  sofia: {
    name: "Sofía",
    role: "Directora de Creatividad & UX",
    avatar: "/images/sofia_seated_art.jpg",
    color: "#FF3858",
    badgeBg: "rgba(255, 56, 88, 0.15)",
    badgeBorder: "rgba(255, 56, 88, 0.4)",
  },
  ivan: {
    name: "Iván",
    role: "Director de Arquitectura & Dev",
    avatar: "/images/ivan_seated_tech.jpg",
    color: "#00D1FF",
    badgeBg: "rgba(0, 209, 255, 0.15)",
    badgeBorder: "rgba(0, 209, 255, 0.4)",
  },
  both: {
    name: "Sofía & Iván",
    role: "Dirección Creativa y Tecnológica",
    avatar: "/images/hero_dual_desk_studio.png",
    color: "#A855F7",
    badgeBg: "rgba(168, 85, 247, 0.15)",
    badgeBorder: "rgba(168, 85, 247, 0.4)",
  },
};

export interface FormAdvisorTip {
  id: string;
  advisorKey: "sofia" | "ivan" | "both";
  optionTitle: string;
  tagline: string;
  advice: string[];
  recommendationWhen: string;
  chatPrompt: string;
}

export const FORM_ADVISOR_TIPS: Record<string, FormAdvisorTip> = {
  // ==========================================
  // PASO 2: TIPO DE SOLUCIÓN TECNOLÓGICA
  // ==========================================
  mobile_app: {
    id: "mobile_app",
    advisorKey: "ivan",
    optionTitle: "App Móvil (iPhone & Android)",
    tagline: "Presencia directa en el bolsillo de tu cliente con hardware nativo",
    advice: [
      "Elige esta opción si tu modelo de negocio depende de notificaciones push frecuentes (para fidelizar y vender más), geolocalización en tiempo real en segundo plano (estilo Uber o Rappi) o uso de cámara y sensores sin conexión a internet.",
      "Si tu cliente solo necesita hacer compras o consultar información de vez en cuando, te recomiendo evaluar primero una Plataforma Web: se lanza en la mitad de tiempo y no obligas al usuario a descargar nada desde la App Store o Google Play.",
    ],
    recommendationWhen: "Ideal cuando: necesitas retención recurrente, mapas en vivo, choferes/repartidores o acceso al hardware del teléfono.",
    chatPrompt: "Hola Iván, estoy llenando el formulario de proyecto y tengo dudas sobre si a mi empresa le conviene más una App Móvil para iOS y Android o una Plataforma Web. ¿Qué me recomiendas según mi giro?",
  },

  web_platform: {
    id: "web_platform",
    advisorKey: "ivan",
    optionTitle: "Plataforma Web / Sistema en la Nube",
    tagline: "Accesibilidad universal instantánea desde cualquier dispositivo sin descargas",
    advice: [
      "Es la alternativa recomendada para más del 80% de los proyectos. Cualquier persona en el mundo puede abrir tu sistema desde su celular, tablet o laptop con solo dar clic a un enlace o escanear un código QR.",
      "La construimos con Next.js y React de alto rendimiento, lo que permite que Google posicione tu plataforma en SEO para que te descubran nuevos clientes orgánicamente. Además, las actualizaciones son instantáneas sin esperar revisiones de Apple.",
    ],
    recommendationWhen: "Ideal cuando: quieres portales de clientes, tiendas online con catálogo, cotizadores o sistemas operativos accesibles desde cualquier navegador.",
    chatPrompt: "Hola Iván, ¿cuáles son las ventajas de una Plataforma Web en la Nube frente a una App tradicional para la operación de mi negocio?",
  },

  ai_system: {
    id: "ai_system",
    advisorKey: "ivan",
    optionTitle: "Inteligencia Artificial & Automatización",
    tagline: "Agentes inteligentes 24/7 entrenados con el ADN de tu negocio",
    advice: [
      "Integramos modelos de IA conectados directamente a tu base de datos y a la API oficial de WhatsApp Cloud de Meta. Imagina a un asesor de ventas que nunca duerme, responde dudas técnicas complejas de tus productos y califica prospectos al instante.",
      "No son simples respuestas pregrabadas de 'presione 1 o 2'; la IA comprende modismos, audio y contexto real, generando cotizaciones inmediatas y transfiriendo al cliente con tu equipo humano cuando está listo para pagar.",
    ],
    recommendationWhen: "Ideal cuando: recibes muchos mensajes por WhatsApp, tienes soporte repetitivo o quieres automatizar cotizaciones y agendamiento 24/7.",
    chatPrompt: "Hola Iván, ¿cómo podemos conectar un agente de Inteligencia Artificial al WhatsApp de mi negocio para atender prospectos y cotizar 24/7?",
  },

  enterprise_erp: {
    id: "enterprise_erp",
    advisorKey: "ivan",
    optionTitle: "Sistema de Gestión Empresarial (CRM / ERP)",
    tagline: "Control operativo absoluto, inventarios y finanzas en tiempo real",
    advice: [
      "Si hoy tu empresa depende de hojas de cálculo de Excel desactualizadas, WhatsApps de empleados dispersos o notas en papel, un CRM/ERP a tu medida elimina los errores humanos y te ahorra decenas de horas a la semana.",
      "Centralizamos inventarios multi-sucursal, seguimiento de prospectos en embudo, control de empleados con permisos restringidos, timbrado de facturación SAT CFDI 4.0 y métricas financieras en vivo.",
    ],
    recommendationWhen: "Ideal cuando: tu negocio factura y opera con varios colaboradores, necesitas evitar pérdidas de inventario o quieres profesionalizar tu administración.",
    chatPrompt: "Hola Iván, quiero saber qué módulos básicos me recomiendas incluir en un CRM/ERP a medida para tener control total de mi empresa.",
  },

  full_ecosystem: {
    id: "full_ecosystem",
    advisorKey: "both",
    optionTitle: "Ecosistema Digital Integral (Web + App + Panel)",
    tagline: "La solución todo-en-uno: marca premium + apps nativas + centro de control en la nube",
    advice: [
      "Sofía e Iván te aconsejan: Es la solución definitiva para empresas que quieren dominar su mercado. Diseñamos la marca y la interfaz con Sofía para que cause impacto inmediato, mientras Iván programa la app móvil, el portal web y el panel de administración centralizado.",
      "Todo comparte la misma base de datos en tiempo real: lo que un cliente pide desde la app se ve reflejado al instante en el panel administrativo y le llega una confirmación por WhatsApp.",
    ],
    recommendationWhen: "Ideal cuando: buscas lanzar un producto completo de alto impacto sin parches ni dependencias fragmentadas.",
    chatPrompt: "Hola Sofía e Iván, me interesa desarrollar un Ecosistema Digital Integral (Web + App + Panel). ¿Cuál es la ruta de trabajo recomendada?",
  },

  // ==========================================
  // PASO 3: SERVICIOS & PILARES REQUERIDOS
  // ==========================================
  brand_marketing: {
    id: "brand_marketing",
    advisorKey: "sofia",
    optionTitle: "Diseño de Marca, Identidad & Campaña de Marketing",
    tagline: "Construye una marca magnética que inspire confianza y cobre lo que realmente vale",
    advice: [
      "Una tecnología increíble sin una identidad visual cuidada no genera la confianza necesaria para cerrar ventas de alto valor. La primera impresión ocurre en menos de 3 segundos.",
      "Nos encargamos de crear una marca memorable: logotipo vectorial, tipografías corporativas, colores con psicología de compra, empaques y campañas de marketing para posicionarte por encima de tus competidores más baratos.",
    ],
    recommendationWhen: "Ideal cuando: vas a lanzar un nuevo negocio, tu logotipo actual se ve anticuado o tus clientes regatean tus precios.",
    chatPrompt: "Hola Sofía, ¿cómo nos ayuda el diseño de identidad y branding profesional a cobrar más caro y atraer mejores clientes?",
  },

  software_dev: {
    id: "software_dev",
    advisorKey: "ivan",
    optionTitle: "Desarrollo de Software, App o Plataforma Digital",
    tagline: "Ingeniería de software robusta, código limpio y escalabilidad garantizada",
    advice: [
      "Aquí transformamos tu modelo operativo en código de alto rendimiento. Diseñamos arquitecturas en Next.js, React, Node.js y bases de datos cloud con cifrado de nivel bancario.",
      "Tu sistema queda preparado para recibir miles de usuarios concurrentes sin caídas, con copias de seguridad automáticas y optimizado para una velocidad de carga inferior a 1 segundo.",
    ],
    recommendationWhen: "Ideal cuando: necesitas una herramienta funcional, base de datos, módulos de usuarios, pagos o cualquier automatización de procesos.",
    chatPrompt: "Hola Iván, ¿cuál es el proceso técnico para asegurar que el software sea rápido, seguro y escalable a largo plazo?",
  },

  // ==========================================
  // PASO 4: REQUERIMIENTOS DE MARCA & MARKETING
  // ==========================================
  logo_design: {
    id: "logo_design",
    advisorKey: "sofia",
    optionTitle: "🎨 Diseño de Logotipo Profesional",
    tagline: "El rostro oficial de tu empresa en vectores de máxima nitidez",
    advice: [
      "Diseño tu isotipo e imagotipo desde bocetos conceptuales hasta archivos vectoriales finales (AI, SVG, PDF, PNG transparente).",
      "Garantizamos que se vea impecable tanto en el favicon de 16 píxeles de un celular como en un espectacular gigante o en el bordado de camisas corporativas.",
    ],
    recommendationWhen: "Indispensable si aún no tienes un logo en curvas vectoriales o si el actual fue hecho con plantillas genéricas.",
    chatPrompt: "Hola Sofía, ¿qué variantes de logotipo me recomiendas para que mi marca se vea profesional en medios digitales y físicos?",
  },

  identity_design: {
    id: "identity_design",
    advisorKey: "sofia",
    optionTitle: "✨ Diseño de Identidad Visual Completa",
    tagline: "El manual de normas gráficas que le da coherencia y estatus a tu negocio",
    advice: [
      "Una marca no es solo un logo; es un sistema visual completo: códigos cromáticos exactos (HEX, RGB, CMYK, Pantone), familias tipográficas oficiales, estilos de fotografía y patrones de fondo.",
      "Con este manual, cualquier diseñador, imprenta o agencia sabrá exactamente cómo presentar tu empresa sin distorsionar su imagen de prestigio.",
    ],
    recommendationWhen: "Recomendado para negocios que quieren verse consolidados y transmitir solidez corporativa.",
    chatPrompt: "Hola Sofía, ¿qué elementos incluye el manual de identidad visual de Innocentia y cómo se aplica a mi negocio?",
  },

  brand_projection: {
    id: "brand_projection",
    advisorKey: "sofia",
    optionTitle: "🚀 Proyección y Posicionamiento de Marca",
    tagline: "Define por qué tus clientes deben elegirte a ti y no a la competencia",
    advice: [
      "Estructuramos tu Propuesta Única de Valor (UVP), el tono de voz de comunicación (cercano, sofisticado, disruptivo) y el mensaje central de venta.",
      "Esto resuelve el problema común de 'no sé cómo explicar lo que hace mi empresa' y logra que tu cliente entienda el valor en los primeros 10 segundos de visitarte.",
    ],
    recommendationWhen: "Ideal si estás entrando a un mercado competitivo y necesitas diferenciarte claramente.",
    chatPrompt: "Hola Sofía, ¿cómo podemos definir una propuesta de valor contundente para destacar de mi competencia?",
  },

  market_research: {
    id: "market_research",
    advisorKey: "sofia",
    optionTitle: "📊 Estudio de Mercado y Análisis de Competencia",
    tagline: "Descubre los puntos débiles de tu competencia antes de invertir en pauta",
    advice: [
      "Analizamos qué están haciendo tus competidores directos e indirectos: qué precios manejan, qué opinan sus clientes en redes sociales, qué anuncios tienen activos y qué vacíos de mercado han dejado sin atender.",
      "Con esta información construimos ventajas competitivas reales en lugar de adivinar qué podría funcionar.",
    ],
    recommendationWhen: "Recomendado cuando lanzas un nuevo giro de negocio o quieres capturar cuota de mercado en tu ciudad.",
    chatPrompt: "Hola Sofía, ¿en qué consiste el estudio de competencia y cómo lo aprovechamos en el proyecto?",
  },

  audience_segmentation: {
    id: "audience_segmentation",
    advisorKey: "sofia",
    optionTitle: "🎯 Segmentación Especializada & Campaña de Marketing",
    tagline: "Atrae prospectos listos para comprar reduciendo el costo por adquisición",
    advice: [
      "Definimos el perfil de tu Buyer Persona (edad, intereses, nivel socioeconómico, dolores y hábitos de compra) y configuramos campañas de adquisición de prospectos en Meta Ads (Instagram/Facebook) y Google.",
      "Creamos los anuncios visuales y los textos persuasivos enfocados en conseguir mensajes directos de clientes calificados a tu WhatsApp o página web.",
    ],
    recommendationWhen: "Ideal si quieres ventas activas desde el día 1 del lanzamiento de tu plataforma o marca.",
    chatPrompt: "Hola Sofía, ¿qué canales de marketing digital (Meta, Google, TikTok) tienen mejor retorno de inversión para mi empresa?",
  },

  // ==========================================
  // PASO 5: FUNCIONALIDADES & MÓDULOS TÉCNICOS
  // ==========================================
  auth_db: {
    id: "auth_db",
    advisorKey: "ivan",
    optionTitle: "🔐 Cuentas de Usuario y Base de Datos Segura",
    tagline: "Acceso protegido, roles de usuario y base de datos relacional cifrada",
    advice: [
      "Tus usuarios inician sesión con contraseña protegida, Google o Apple ID. Gestionamos permisos por roles: por ejemplo, administradores con acceso completo, colaboradores con vista limitada y clientes con su propio portal personal.",
      "Los datos se guardan en bases de datos PostgreSQL en la nube con copias de seguridad automáticas y cumplimiento de normas de privacidad.",
    ],
    recommendationWhen: "Indispensable si tu plataforma maneja clientes registrados, paneles internos o información privada.",
    chatPrompt: "Hola Iván, ¿cómo estructuramos los permisos de usuarios y la seguridad de la base de datos para mi plataforma?",
  },

  payments: {
    id: "payments",
    advisorKey: "ivan",
    optionTitle: "💳 Cobros y Pagos con Tarjeta en Línea",
    tagline: "Recibe pagos con tarjeta de débito/crédito, transferencias y OXXO al instante",
    advice: [
      "Conectamos pasarelas internacionales de primer nivel como Stripe, Mercado Pago o PayPal. Tus clientes pueden pagar con Visa, Mastercard, AMEX, meses sin intereses o transferencias SPEI automatizadas.",
      "Al confirmarse el pago mediante Webhooks seguros, tu sistema libera el pedido, genera la factura y notifica al cliente en automático sin intervención manual.",
    ],
    recommendationWhen: "Recomendado para e-commerce, membresías recurrentes, cobro de anticipos o venta de servicios digitales.",
    chatPrompt: "Hola Iván, ¿cuál pasarela de pagos nos conviene más en México (Stripe vs Mercado Pago) para las menores comisiones?",
  },

  realtime_gps: {
    id: "realtime_gps",
    advisorKey: "ivan",
    optionTitle: "📍 Ubicación y Rastreo en Tiempo Real (GPS / Mapas)",
    tagline: "Monitoreo en vivo de unidades, entregas y geofencing interactivo",
    advice: [
      "Integramos mapas dinámicos con Google Maps o Mapbox. Permite a los clientes ver en vivo cómo se acerca su repartidor o chofer con actualización continua mediante WebSockets.",
      "También podemos calcular distancias y tarifas automáticas según zonas de entrega (geofencing) y registrar rutas históricas.",
    ],
    recommendationWhen: "Crucial para servicios de entrega a domicilio, logística de transporte, taxis privados o visitas a terreno.",
    chatPrompt: "Hola Iván, ¿cómo funciona el rastreo en tiempo real y qué costo tiene el consumo de APIs de mapas?",
  },

  whatsapp_api: {
    id: "whatsapp_api",
    advisorKey: "ivan",
    optionTitle: "📲 Notificaciones y Mensajes Automáticos por WhatsApp",
    tagline: "Confirmaciones inmediatas con una tasa de apertura superior al 95%",
    advice: [
      "Nos conectamos a la API Oficial de WhatsApp Cloud de Meta. Cada vez que hay una compra, confirmación de cita o cambio de estado, el sistema envía un mensaje formal al teléfono del cliente.",
      "Al ser la API oficial verificada, no hay riesgo de bloqueos de número y el cliente recibe botones interactivos para confirmar con un solo toque.",
    ],
    recommendationWhen: "Altamente recomendado para cualquier negocio en México y Latinoamérica: es el canal que la gente más lee.",
    chatPrompt: "Hola Iván, ¿cómo se implementan los mensajes automáticos de WhatsApp en mi proyecto y qué plantillas podemos usar?",
  },

  admin_dashboard: {
    id: "admin_dashboard",
    advisorKey: "ivan",
    optionTitle: "📊 Panel de Control y Reportes para el Administrador",
    tagline: "El centro de control de tu empresa accesible desde cualquier lugar",
    advice: [
      "Una pantalla privada y moderna con métricas visuales: cuántos ingresos van en el mes, qué productos se venden más, qué pedidos están pendientes y qué colaboradores tienen tareas abiertas.",
      "Incluye filtros avanzados por rango de fechas y descarga de reportes en un clic a Excel o PDF para tu contador y junta directiva.",
    ],
    recommendationWhen: "Indispensable para directores y gerentes que necesitan visibilidad total de la operación sin depender de reportes manuales.",
    chatPrompt: "Hola Iván, ¿qué gráficas e indicadores clave (KPIs) me recomiendas tener en el panel de administración?",
  },

  custom_ai_bot: {
    id: "custom_ai_bot",
    advisorKey: "ivan",
    optionTitle: "🤖 Bot Personalizado / Asistente de IA para Clientes",
    tagline: "Atención al cliente 24/7 entrenada con los datos reales de tu negocio",
    advice: [
      "Entrenamos un asistente con tus preguntas frecuentes, catálogo de precios, políticas de garantía y horarios. Responde con lenguaje natural y amigable.",
      "Puede consultar tu base de datos en tiempo real (por ejemplo: '¿Dónde está mi pedido #1024?' o '¿Tienen mesa disponible a las 8pm?') y responder certeramente.",
    ],
    recommendationWhen: "Ideal si recibes muchas dudas repetitivas que consumen tiempo valioso de tu equipo comercial.",
    chatPrompt: "Hola Iván, ¿cómo se entrena el bot con la información de mi negocio y qué nivel de precisión tiene?",
  },

  multichannel_social: {
    id: "multichannel_social",
    advisorKey: "ivan",
    optionTitle: "🌐 Conexión a Múltiples Redes Sociales y Canales",
    tagline: "Centraliza WhatsApp, Instagram Direct, Facebook y Correo en una sola bandeja",
    advice: [
      "Evita que tus vendedores tengan que abrir 4 aplicaciones distintas en sus celulares. Todos los mensajes entrantes de clientes se concentran en un único panel centralizado.",
      "Puedes asignar conversaciones a diferentes miembros de tu equipo, ver quién atendió a quién y medir los tiempos de respuesta del equipo.",
    ],
    recommendationWhen: "Recomendado si recibes prospectos por Instagram, Facebook y WhatsApp y se te están perdiendo ventas por tardar en responder.",
    chatPrompt: "Hola Iván, ¿cómo funciona la bandeja omnicanal unificada para gestionar a mi equipo de ventas?",
  },

  calendar_sync: {
    id: "calendar_sync",
    advisorKey: "ivan",
    optionTitle: "📅 Calendarios y Agendamiento con Sincronización de APIs",
    tagline: "Citas automatizadas con sincronización a Google Calendar y Outlook",
    advice: [
      "Tus clientes ven únicamente los horarios que tienes verdaderamente libres, eligen fecha y hora, y el sistema bloquea el evento en tu Google Calendar u Outlook de forma bidireccional.",
      "Se envían confirmaciones y recordatorios automáticos por WhatsApp y correo para reducir el ausentismo (no-shows) hasta en un 80%.",
    ],
    recommendationWhen: "Esencial para clínicas, consultorías, despachos, academias o cualquier negocio basado en citas y reservaciones.",
    chatPrompt: "Hola Iván, ¿cómo podemos automatizar la agenda de citas y sincronizarla con los calendarios de mi equipo?",
  },

  // ==========================================
  // PASO 6: PRESUPUESTO
  // ==========================================
  "50k_150k": {
    id: "50k_150k",
    advisorKey: "ivan",
    optionTitle: "Inversión: $50,000 - $150,000 MXN",
    tagline: "Lanzamiento ágil de un Producto Mínimo Viable (MVP) para validar mercado",
    advice: [
      "Es el rango perfecto para validar una idea de negocio rápido sin sobre-ingeniería. Nos enfocamos en las 2 o 3 funcionalidades más importantes para que empieces a captar clientes y facturar de inmediato.",
      "Incluye diseño limpio y responsivo, desarrollo funcional en Next.js, base de datos en la nube y configuración de lanzamiento.",
    ],
    recommendationWhen: "Ideal para: startups en fase inicial, negocios que quieren digitalizar un proceso específico o primeras versiones comerciales.",
    chatPrompt: "Hola Iván, con un presupuesto de $50k a $150k MXN, ¿qué alcance funcional podemos construir en un primer sprint?",
  },

  "150k_350k": {
    id: "150k_350k",
    advisorKey: "both",
    optionTitle: "Inversión: $150,000 - $350,000 MXN",
    tagline: "La solución profesional completa: diseño de alta gama y plataforma escalable",
    advice: [
      "Sofía e Iván te aconsejan: Es el rango de inversión más popular y recomendado para empresas que buscan una ventaja competitiva contundente.",
      "Permite un desarrollo integral: diseño de marca o interfaz UI/UX en Figma a 60fps por Sofía, y por el lado de Iván, plataforma web o app nativa robusta con pagos, panel administrativo y automatización por WhatsApp.",
    ],
    recommendationWhen: "Ideal para: empresas con operaciones activas que buscan escalar ventas y sistematizar su operación con tecnología propia.",
    chatPrompt: "Hola Sofía e Iván, ¿qué incluye un proyecto en el rango de $150k a $350k MXN y cómo se divide el plan de trabajo?",
  },

  "350k_plus": {
    id: "350k_plus",
    advisorKey: "both",
    optionTitle: "Inversión: $350,000+ MXN",
    tagline: "Ecosistemas corporativos de alta escala, apps nativas duales e IA profunda",
    advice: [
      "Diseñado para grandes proyectos que requieren desarrollo multi-plataforma simultáneo (App iOS nativa + App Android + Plataforma Web + Panel Maestro de Operaciones).",
      "Incluye arquitectura para soportar cientos de miles de usuarios, integración de modelos de IA propios, auditorías de ciberseguridad y soporte de despliegue continuo.",
    ],
    recommendationWhen: "Ideal para: corporativos, franquicias, plataformas SaaS con proyección internacional o startups con financiamiento.",
    chatPrompt: "Hola equipo, para un proyecto corporativo de alta escala (+$350k MXN), ¿cómo estructuramos la arquitectura y las fases de entrega?",
  },
};

// Helper lookup by key or by label text
export function getAdvisorTip(identifier: string): FormAdvisorTip | undefined {
  if (FORM_ADVISOR_TIPS[identifier]) {
    return FORM_ADVISOR_TIPS[identifier];
  }

  // Fallback search by matching keywords in label
  const idLower = identifier.toLowerCase();
  if (idLower.includes("logotipo") || idLower.includes("logo")) return FORM_ADVISOR_TIPS["logo_design"];
  if (idLower.includes("identidad")) return FORM_ADVISOR_TIPS["identity_design"];
  if (idLower.includes("proyección") || idLower.includes("posicionamiento")) return FORM_ADVISOR_TIPS["brand_projection"];
  if (idLower.includes("estudio de mercado") || idLower.includes("competencia")) return FORM_ADVISOR_TIPS["market_research"];
  if (idLower.includes("segmentación") || idLower.includes("marketing digital")) return FORM_ADVISOR_TIPS["audience_segmentation"];

  if (idLower.includes("cuentas de usuario") || idLower.includes("base de datos")) return FORM_ADVISOR_TIPS["auth_db"];
  if (idLower.includes("cobros") || idLower.includes("pagos") || idLower.includes("tarjeta")) return FORM_ADVISOR_TIPS["payments"];
  if (idLower.includes("gps") || idLower.includes("rastreo") || idLower.includes("mapas")) return FORM_ADVISOR_TIPS["realtime_gps"];
  if (idLower.includes("whatsapp")) return FORM_ADVISOR_TIPS["whatsapp_api"];
  if (idLower.includes("panel de control") || idLower.includes("reportes")) return FORM_ADVISOR_TIPS["admin_dashboard"];
  if (idLower.includes("bot personalizado") || idLower.includes("asistente de ia") || idLower.includes("chatbot")) return FORM_ADVISOR_TIPS["custom_ai_bot"];
  if (idLower.includes("redes sociales") || idLower.includes("multicanal")) return FORM_ADVISOR_TIPS["multichannel_social"];
  if (idLower.includes("calendario") || idLower.includes("agendamiento") || idLower.includes("citas")) return FORM_ADVISOR_TIPS["calendar_sync"];

  return undefined;
}

// Utility to dispatch the chat trigger event anywhere in the app
export function openAdvisorChat(prompt: string, autoSend: boolean = false) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("innocentia-open-chat", {
      detail: { prompt, autoSend },
    });
    window.dispatchEvent(event);
  }
}
