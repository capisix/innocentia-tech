"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AmbientLivingCanvas from "../../components/common/AmbientLivingCanvas";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Send,
  Terminal,
  Search,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Zap,
  Code2,
  Palette,
  Layers,
} from "../../lib/icons";

interface FAQItem {
  id: string;
  q: string;
  category: "sofia" | "ivan" | "both" | "proceso";
  author: string;
  role: string;
  color: string;
  tag: string;
  answers: {
    speaker?: "SOFÍA" | "IVÁN" | "INNOCENTIA";
    color?: string;
    text: string[];
  }[];
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>("idea-definida");
  const [filter, setFilter] = useState<"todas" | "sofia" | "ivan" | "proceso">("todas");
  const [searchQuery, setSearchQuery] = useState("");

  // Cyber Terminal State
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{
      id: string;
      type: "user" | "sofia" | "ivan" | "system";
      senderName: string;
      content: string | string[];
      time: string;
    }>
  >([
    {
      id: "sys-init",
      type: "system",
      senderName: "CORE_KERNEL",
      content: "INNOCENTIA DUAL-CORE NEURAL CLI v3.6 — CONECTADO",
      time: "00:00:01",
    },
    {
      id: "sofia-init",
      type: "sofia",
      senderName: "SOFÍA (UX/ARTE)",
      content:
        "¡Hola! Soy Sofía. Pregúntame sobre diseño, concepto de marca, Figma o qué hacer si tu idea aún no está 100% definida.",
      time: "00:00:02",
    },
    {
      id: "ivan-init",
      type: "ivan",
      senderName: "IVÁN (TECH/CODE)",
      content:
        "Y yo soy Iván. Consulta costos estimados, tiempos de MVP, arquitectura de bases de datos, APIs o viabilidad técnica.",
      time: "00:00:03",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isTerminalBusy, setIsTerminalBusy] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const allFaqs: FAQItem[] = [
    {
      id: "idea-definida",
      q: "¿NECESITO TENER MI IDEA COMPLETAMENTE DEFINIDA?",
      category: "sofia",
      author: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      tag: "CONCEPTUALIZACIÓN",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "No.",
            "Muchas veces una idea comienza como una sensación, una necesidad o simplemente la intuición de que existe una mejor manera de hacer algo.",
            "Podemos ayudarte desde esa primera etapa.",
            "Escuchamos lo que imaginas, analizamos el problema, exploramos posibilidades y te ayudamos a convertir una idea inicial en un concepto más claro, coherente y viable.",
            "No necesitas llegar con todas las respuestas.",
            "Parte de nuestro trabajo consiste precisamente en ayudarte a encontrar las preguntas correctas.",
          ],
        },
      ],
    },
    {
      id: "tipo-proyectos",
      q: "¿QUÉ TIPO DE PROYECTOS PUEDE DESARROLLAR INNOCENTIA?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "ALCANCE TÉCNICO",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Desarrollamos soluciones digitales adaptadas a las necesidades de cada proyecto.",
            "Entre ellas: Sitios y plataformas web, Aplicaciones móviles nativas, Software empresarial, CRM y ERP a medida, Dashboards y sistemas administrativos, Marketplaces, Sistemas de reservaciones, Automatizaciones de procesos, Integraciones mediante APIs, Chatbots y Agentes de inteligencia artificial, Herramientas internas y Plataformas multiplataforma.",
            "Sin embargo, no partimos de un catálogo cerrado de productos.",
            "Si una idea requiere combinar varias tecnologías o construir algo que no encaja dentro de una categoría tradicional, diseñamos la arquitectura necesaria para hacerlo posible.",
          ],
        },
      ],
    },
    {
      id: "empresas-grandes",
      q: "¿TRABAJAN ÚNICAMENTE CON EMPRESAS GRANDES?",
      category: "sofia",
      author: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      tag: "CLIENTES",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "No.",
            "Trabajamos con personas que tienen una idea, emprendedores, startups, pequeñas empresas y organizaciones consolidadas.",
            "El tamaño de una empresa no determina el potencial de una idea.",
            "Lo que buscamos es comprender qué se desea construir, qué problema resolverá y qué valor puede generar.",
          ],
        },
      ],
    },
    {
      id: "diseno-identidad",
      q: "¿PUEDEN AYUDARME TAMBIÉN CON EL DISEÑO Y LA IDENTIDAD DE MI PROYECTO?",
      category: "sofia",
      author: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      tag: "BRANDING & UX",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "Sí.",
            "Podemos desarrollar o fortalecer la identidad visual de un proyecto antes de comenzar el desarrollo tecnológico.",
            "Esto puede incluir: Concepto de marca, Dirección de arte, Branding, Paleta de colores, Tipografía, Iconografía, Diseño UX/UI interactivo, Ilustraciones, Animaciones a 60fps, Experiencia visual y Diseño de interfaces.",
            "Nuestro objetivo es que la tecnología y la identidad del proyecto se sientan como una sola experiencia.",
          ],
        },
      ],
    },
    {
      id: "software-personalizado",
      q: "¿DESARROLLAN SOFTWARE COMPLETAMENTE PERSONALIZADO?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "INGENIERÍA A MEDIDA",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí.",
            "Cada proyecto puede desarrollarse a medida según sus objetivos, procesos y necesidades.",
            "No intentamos adaptar una empresa a una herramienta simplemente porque ya existe.",
            "Primero comprendemos cómo funciona el proyecto y después diseñamos la solución tecnológica adecuada.",
            "Cuando una herramienta existente puede resolver una necesidad de forma eficiente, también podemos integrarla.",
            "El objetivo no es desarrollar más código. El objetivo es construir la mejor solución.",
          ],
        },
      ],
    },
    {
      id: "utilizan-ia",
      q: "¿UTILIZAN INTELIGENCIA ARTIFICIAL?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "IA & AUTOMATIZACIÓN",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí, cuando aporta un beneficio real.",
            "La inteligencia artificial puede utilizarse para: Asistir usuarios, Automatizar tareas, Analizar información, Clasificar datos, Generar contenido, Crear asistentes especializados, Optimizar procesos, Consultar grandes bases de conocimiento, Personalizar experiencias y Construir agentes inteligentes.",
            "No incorporamos inteligencia artificial simplemente porque esté de moda. La utilizamos cuando mejora significativamente una solución.",
          ],
        },
      ],
    },
    {
      id: "ia-reemplaza-personas",
      q: "¿LA INTELIGENCIA ARTIFICIAL REEMPLAZA A LAS PERSONAS EN SUS SOLUCIONES?",
      category: "sofia",
      author: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      tag: "FILOSOFÍA HUMANA",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "No entendemos la inteligencia artificial de esa manera.",
            "Para Innocentia, la inteligencia artificial es una herramienta capaz de ampliar determinadas capacidades humanas.",
            "Puede ahorrar tiempo, organizar información y automatizar actividades repetitivas, permitiendo que las personas concentren mayor atención en aquello que requiere criterio, creatividad, sensibilidad y capacidad de decisión.",
            "La tecnología debe estar al servicio de las personas. Nunca al contrario.",
          ],
        },
      ],
    },
    {
      id: "conectar-herramientas",
      q: "¿PUEDEN CONECTAR MI NUEVO SISTEMA CON LAS HERRAMIENTAS QUE YA UTILIZO?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "APIS & INTEGRACIONES",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "En muchos casos, sí.",
            "Podemos desarrollar integraciones mediante APIs, webhooks y otros mecanismos de comunicación para conectar diferentes plataformas.",
            "Por ejemplo: Sistemas de pago (Stripe/MercadoPago), CRM, Servicios de correo, WhatsApp API, Sistemas administrativos, Inteligencia artificial, Bases de datos, Servicios en la nube y Herramientas de automatización.",
            "Durante el análisis inicial revisamos la viabilidad técnica de cada integración.",
          ],
        },
      ],
    },
    {
      id: "mejorar-app-existente",
      q: "¿PUEDEN MEJORAR UNA APLICACIÓN O SISTEMA QUE YA EXISTE?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "OPTIMIZACIÓN",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí. No siempre es necesario empezar desde cero.",
            "Podemos analizar una plataforma existente y determinar si conviene mejorarla, modernizarla, optimizarla o reconstruir determinadas áreas.",
            "Podemos trabajar sobre: Diseño, Experiencia de usuario, Arquitectura, Rendimiento, Base de datos, Seguridad, Automatizaciones, Nuevas funcionalidades, Integraciones y Escalabilidad.",
            "La decisión dependerá del estado actual del proyecto y de sus objetivos futuros.",
          ],
        },
      ],
    },
    {
      id: "como-comienza-proyecto",
      q: "¿CÓMO COMIENZA UN PROYECTO CON INNOCENTIA?",
      category: "both",
      author: "Sofía & Iván",
      role: "Metodología Dual",
      color: "#FFD166",
      tag: "ARRANQUE",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "Comienza con una conversación. Queremos entender qué imaginas, qué quieres mejorar, qué problema has identificado, quién utilizará la solución y qué experiencia quieres ofrecer.",
          ],
        },
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Después organizamos la información y analizamos su viabilidad.",
            "A partir de ahí podemos definir alcance, arquitectura, fases, tecnologías, tiempos y prioridades.",
            "Primero entendemos. Después diseñamos. Luego construimos.",
          ],
        },
      ],
    },
    {
      id: "proceso-desarrollo",
      q: "¿CUÁL ES SU PROCESO DE DESARROLLO?",
      category: "proceso",
      author: "Innocentia",
      role: "5 Etapas",
      color: "#10B981",
      tag: "PIPELINE",
      answers: [
        {
          speaker: "INNOCENTIA",
          color: "#10B981",
          text: [
            "Trabajamos mediante cinco etapas principales:",
            "1. DESCUBRIMIENTO: Comprendemos el proyecto, los usuarios, los objetivos y las necesidades principales.",
            "2. DISEÑO: Transformamos las ideas en una experiencia visual y funcional.",
            "3. DESARROLLO: Construimos la solución utilizando la arquitectura y las tecnologías adecuadas.",
            "4. COMPROBACIÓN: Probamos funcionalidades, rendimiento, estabilidad, experiencia de usuario y diferentes escenarios de uso.",
            "5. ENTREGA Y EVOLUCIÓN: Implementamos la solución, realizamos los ajustes finales y definimos las siguientes etapas cuando el proyecto requiere continuar creciendo.",
          ],
        },
      ],
    },
    {
      id: "cuanto-tiempo-tarda",
      q: "¿CUÁNTO TIEMPO TARDA UN PROYECTO?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "CRONOGRAMA",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Depende completamente del alcance.",
            "Una landing page puede requerir mucho menos tiempo que una plataforma empresarial con diferentes usuarios, automatizaciones, aplicaciones móviles e inteligencia artificial.",
            "Después de definir correctamente el proyecto podemos establecer etapas y tiempos estimados de desarrollo.",
            "Preferimos ofrecer una estimación basada en información real antes que prometer fechas sin comprender primero la complejidad del proyecto.",
          ],
        },
      ],
    },
    {
      id: "cuanto-cuesta",
      q: "¿CUÁNTO CUESTA DESARROLLAR UNA APLICACIÓN O PLATAFORMA?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "PRESUPUESTO",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "No existe un precio único porque no existen dos proyectos idénticos.",
            "El costo depende de factores como: Cantidad de funcionalidades, Número de plataformas, Diseño, Integraciones, Arquitectura, Automatizaciones, Inteligencia artificial, Usuarios, Infraestructura y Complejidad del proyecto.",
            "Podemos comenzar con una primera versión funcional (MVP) y evolucionarla progresivamente cuando el proyecto lo permita.",
          ],
        },
      ],
    },
    {
      id: "desarrollar-por-etapas",
      q: "¿PUEDO DESARROLLAR EL PROYECTO POR ETAPAS?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "ESTRATEGIA MVP",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí. De hecho, en muchos proyectos es la mejor estrategia.",
            "Podemos identificar las funcionalidades esenciales y desarrollar primero un MVP o versión inicial.",
            "Después, utilizando información obtenida del uso real de la plataforma, podemos incorporar nuevas funcionalidades y mejorar el producto.",
            "Esto permite validar ideas antes de realizar inversiones innecesarias.",
          ],
        },
      ],
    },
    {
      id: "proyecto-sera-mio",
      q: "¿EL PROYECTO SERÁ MÍO?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "PROPIEDAD INTELECTUAL",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Las condiciones de propiedad se establecen claramente antes de comenzar cada proyecto.",
            "Definimos qué elementos son desarrollados específicamente para el cliente, qué herramientas externas pueden utilizarse y qué licencias o servicios de terceros forman parte de la solución.",
            "Nuestra intención es que exista total claridad desde el inicio.",
          ],
        },
      ],
    },
    {
      id: "soporte-post-entrega",
      q: "¿OFRECEN SOPORTE DESPUÉS DE LA ENTREGA?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "MANTENIMIENTO",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí. Una plataforma digital nunca permanece completamente estática.",
            "Los usuarios cambian. Los negocios evolucionan. Las tecnologías avanzan.",
            "Podemos ofrecer mantenimiento, soporte, optimización, nuevas funcionalidades y evolución continua del sistema según las necesidades del proyecto.",
          ],
        },
      ],
    },
    {
      id: "crecimiento-futuro",
      q: "¿PUEDEN HACER QUE MI PLATAFORMA CREZCA EN EL FUTURO?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "ESCALABILIDAD",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Ese es uno de nuestros objetivos principales.",
            "Cuando diseñamos una arquitectura buscamos evitar que las primeras decisiones técnicas se conviertan en obstáculos posteriormente.",
            "Siempre que el proyecto lo permita, pensamos desde el inicio en: Escalabilidad, Integraciones futuras, Nuevos usuarios, Nuevos módulos, Automatizaciones, Aplicaciones móviles, Inteligencia artificial y Expansión internacional.",
            "Una buena solución no debería limitar el crecimiento de una buena idea.",
          ],
        },
      ],
    },
    {
      id: "clientes-fuera-mexico",
      q: "¿TRABAJAN CON CLIENTES FUERA DE MÉXICO?",
      category: "sofia",
      author: "Sofía",
      role: "UX & Creatividad",
      color: "#FF3858",
      tag: "INTERNACIONAL",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "Sí.",
            "La naturaleza de nuestro trabajo nos permite colaborar digitalmente con proyectos y equipos ubicados en diferentes lugares del mundo.",
            "La comunicación, documentación y seguimiento del proyecto pueden realizarse de forma remota con total transparencia.",
          ],
        },
      ],
    },
    {
      id: "varios-idiomas",
      q: "¿PUEDEN DESARROLLAR UNA PLATAFORMA EN VARIOS IDIOMAS?",
      category: "ivan",
      author: "Iván",
      role: "Arquitectura & Backend",
      color: "#00D1FF",
      tag: "MULTI-IDIOMA",
      answers: [
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Sí.",
            "Podemos diseñar sistemas preparados para múltiples idiomas y diferentes regiones (i18n).",
            "Dependiendo del proyecto, las traducciones pueden administrarse manualmente o apoyarse mediante sistemas automáticos y herramientas de inteligencia artificial.",
          ],
        },
      ],
    },
    {
      id: "como-se-si-es-viable",
      q: "¿CÓMO SÉ SI MI IDEA ES VIABLE?",
      category: "both",
      author: "Sofía & Iván",
      role: "Diagnóstico Dual",
      color: "#FFD166",
      tag: "VIABILIDAD",
      answers: [
        {
          speaker: "SOFÍA",
          color: "#FF3858",
          text: [
            "No necesitas saberlo antes de hablar con nosotros. Precisamente para eso existe la etapa de descubrimiento.",
          ],
        },
        {
          speaker: "IVÁN",
          color: "#00D1FF",
          text: [
            "Analizamos la idea desde diferentes perspectivas: Funcionalidad, Tecnología, Complejidad, Escalabilidad, Costos, Dependencias, Integraciones y Tiempo de desarrollo.",
            "Cuando encontramos una limitación, nuestro trabajo no consiste únicamente en decir que algo no puede hacerse. Buscamos entender qué se pretende lograr y exploramos caminos alternativos para conseguirlo.",
          ],
        },
      ],
    },
    {
      id: "ver-algo-antes",
      q: "¿PUEDO VER ALGO ANTES DE CONTRATAR UN PROYECTO?",
      category: "both",
      author: "Innocentia",
      role: "Laboratorio",
      color: "#FF7A00",
      tag: "LABORATORIO DEMO",
      answers: [
        {
          speaker: "INNOCENTIA",
          color: "#FF7A00",
          text: [
            "Sí. El Laboratorio Innocentia fue creado precisamente para eso.",
            "Los usuarios registrados podrán experimentar con diferentes demostraciones, herramientas y prototipos interactivos.",
            "Podrás explorar ejemplos de aplicaciones, interfaces, automatizaciones, inteligencia artificial y otras experiencias desarrolladas para mostrar cómo pensamos y qué podemos construir.",
            "No queremos únicamente contarte lo que hacemos. Queremos que puedas experimentarlo.",
          ],
        },
      ],
    },
    {
      id: "que-hace-diferente",
      q: "¿QUÉ HACE DIFERENTE A INNOCENTIA?",
      category: "both",
      author: "Sofía & Iván",
      role: "Manifiesto Central",
      color: "#FFD166",
      tag: "ESENCIA",
      answers: [
        {
          speaker: "INNOCENTIA",
          color: "#FFD166",
          text: [
            "No creemos que la diferencia se encuentre únicamente en las tecnologías que utilizamos. Muchas empresas pueden utilizar las mismas herramientas. La diferencia está en cómo se utilizan.",
            "En Innocentia combinamos imaginación, diseño e ingeniería dentro del mismo proceso.",
            "Sofía representa la capacidad de imaginar aquello que todavía no existe.",
            "Iván representa la disciplina necesaria para convertir esa posibilidad en una solución funcional.",
            "Entre ambos existe el espacio donde nace nuestro trabajo: Innocentia. Donde la imaginación se convierte en tecnología.",
          ],
        },
      ],
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesFilter =
      filter === "todas"
        ? true
        : filter === "sofia"
        ? faq.category === "sofia" || faq.category === "both"
        : filter === "ivan"
        ? faq.category === "ivan" || faq.category === "both"
        : faq.category === "proceso";

    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answers.some((a) =>
        a.text.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );

    return matchesFilter && matchesSearch;
  });

  // Handle Terminal Interactions
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = terminalInput.trim();
    if (!query) return;

    const time = new Date().toTimeString().split(" ")[0];

    // Add user message
    setTerminalHistory((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: "user",
        senderName: "TÚ (QUERY)",
        content: query,
        time,
      },
    ]);
    setTerminalInput("");
    setIsTerminalBusy(true);

    // AI Dual Engine Query Matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedFaq = allFaqs.find(
        (f) =>
          f.q.toLowerCase().includes(lower) ||
          f.answers.some((a) => a.text.some((t) => t.toLowerCase().includes(lower)))
      );

      if (matchedFaq) {
        matchedFaq.answers.forEach((ans, idx) => {
          setTimeout(() => {
            const isSofia = ans.speaker === "SOFÍA";
            const isIvan = ans.speaker === "IVÁN";
            setTerminalHistory((prev) => [
              ...prev,
              {
                id: `ans-${Date.now()}-${idx}`,
                type: isSofia ? "sofia" : isIvan ? "ivan" : "system",
                senderName: ans.speaker ? `${ans.speaker}` : "DUAL_ENGINE",
                content: ans.text,
                time: new Date().toTimeString().split(" ")[0],
              },
            ]);
            if (idx === matchedFaq!.answers.length - 1) {
              setIsTerminalBusy(false);
            }
          }, idx * 400);
        });
      } else {
        // Fallback intelligent routing
        const isDesign =
          lower.includes("diseñ") ||
          lower.includes("color") ||
          lower.includes("logo") ||
          lower.includes("marca") ||
          lower.includes("ux");
        const isTech =
          lower.includes("costo") ||
          lower.includes("tiempo") ||
          lower.includes("precio") ||
          lower.includes("app") ||
          lower.includes("web") ||
          lower.includes("bd");

        if (isDesign) {
          setTerminalHistory((prev) => [
            ...prev,
            {
              id: `sofia-reply-${Date.now()}`,
              type: "sofia",
              senderName: "SOFÍA (UX/ARTE)",
              content:
                "Comprendo tu inquietud de diseño. En Innocentia creamos prototipos interactivos en Figma con paletas cromáticas memorables y microinteracciones a 60fps. Puedes tocar en 'Crear Proyecto' para comenzar a explorar tu identidad.",
              time: new Date().toTimeString().split(" ")[0],
            },
          ]);
        } else if (isTech) {
          setTerminalHistory((prev) => [
            ...prev,
            {
              id: `ivan-reply-${Date.now()}`,
              type: "ivan",
              senderName: "IVÁN (TECH/CODE)",
              content:
                "Desde la perspectiva de ingeniería: estructuramos arquitecturas escalables con Next.js 15, PostgreSQL cifrado y despliegues en la nube. Te recomiendo generar un Blueprint con el creador de proyectos para cotizar con precisión.",
              time: new Date().toTimeString().split(" ")[0],
            },
          ]);
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            {
              id: `dual-reply-${Date.now()}`,
              type: "system",
              senderName: "SOFÍA & IVÁN DUAL_CORE",
              content: [
                "Recibido. En Innocentia transformamos ideas complejas en experiencias tecnológicas viables.",
                "Escribe palabras clave como: 'costos', 'mvp', 'diseño', 'viabilidad', 'ia', 'etapas' o selecciona una pregunta del índice.",
              ],
              time: new Date().toTimeString().split(" ")[0],
            },
          ]);
        }
        setIsTerminalBusy(false);
      }
    }, 600);
  };

  const handleAskPredefined = (question: string) => {
    setTerminalInput(question);
    document.getElementById("terminal-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Background Animated Canvas */}
      <AmbientLivingCanvas />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#040407]/90 backdrop-blur-2xl border-b border-white/10 py-3.5 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA"
              className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </Link>

            <Link
              href="/#hero"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,56,88,0.4)] transition-all cursor-pointer hover:scale-105"
            >
              <span>Comenzar Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 1. Hero Manifesto Header */}
      <section className="pt-16 pb-8 px-6 max-w-5xl mx-auto text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-300 uppercase">
            ANTES DE COMENZAR • CENTRO DE RESPUESTAS OFICIAL
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
          PREGUNTAS <br />
          <span className="bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#00D1FF] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,56,88,0.4)]">
            FRECUENTES
          </span>
        </h1>

        <div className="max-w-3xl mx-auto space-y-3 pt-2 text-xs sm:text-sm text-gray-300 font-light leading-relaxed text-left sm:text-center">
          <p>
            Sabemos que transformar una idea en tecnología puede generar muchas preguntas. Algunas
            son creativas, otras técnicas y muchas aparecen incluso antes de saber exactamente qué se
            quiere construir.
          </p>
          <p className="text-gray-400">
            La intención no es darte respuestas genéricas, sino ayudarte a entender cómo trabajamos y
            qué puedes esperar de Innocentia.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="pt-6 space-y-4 max-w-3xl mx-auto">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema (ej. MVP, costos, IA, diseño, APIs, propiedad)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D1FF] transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setFilter("todas")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                filter === "todas"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 border border-white/15 text-gray-400 hover:text-white"
              }`}
            >
              TODAS ({allFaqs.length})
            </button>
            <button
              onClick={() => setFilter("sofia")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                filter === "sofia"
                  ? "bg-[#FF3858] text-white shadow-[0_0_15px_rgba(255,56,88,0.5)]"
                  : "bg-white/5 border border-white/15 text-[#FF3858] hover:bg-[#FF3858]/10"
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden bg-black/50 border border-white/30 flex-shrink-0 flex items-center justify-center">
                <img src="/images/sofia_pink_beanbag.png" alt="Sofía" className="w-full h-full object-contain" />
              </div>
              <span>SOFÍA (UX &amp; ARTE)</span>
            </button>
            <button
              onClick={() => setFilter("ivan")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                filter === "ivan"
                  ? "bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.5)]"
                  : "bg-white/5 border border-white/15 text-[#00D1FF] hover:bg-[#00D1FF]/10"
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden bg-black/50 border border-white/30 flex-shrink-0 flex items-center justify-center">
                <img src="/images/ivan_standing_stylus.png" alt="Iván" className="w-full h-full object-contain" />
              </div>
              <span>IVÁN (INGENIERÍA &amp; CODE)</span>
            </button>
            <button
              onClick={() => setFilter("proceso")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                filter === "proceso"
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-white/5 border border-white/15 text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <span>5 ETAPAS</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Top Section: The 22 Questions Accordion (Full Width Clean Layout) */}
      <section className="max-w-5xl mx-auto px-6 pb-16 relative z-10 space-y-3.5">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                isOpen
                  ? "bg-[#0A0A12] border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: faq.color,
                      boxShadow: `0 0 10px ${faq.color}`,
                    }}
                  />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mb-0.5">
                      {faq.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 space-y-4">
                  {faq.answers.map((ans, idx) => (
                    <div key={idx} className="space-y-2 pt-2">
                      {ans.speaker && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border flex items-center justify-center bg-black/80 shadow-md"
                            style={{
                              borderColor: ans.speaker.includes("SOFÍA")
                                ? "#FF3858"
                                : ans.speaker.includes("IVÁN")
                                ? "#00D1FF"
                                : "#FFD166",
                            }}
                          >
                            <img
                              src={
                                ans.speaker.includes("SOFÍA")
                                  ? "/images/sofia_pink_beanbag.png"
                                  : ans.speaker.includes("IVÁN")
                                  ? "/images/ivan_standing_stylus.png"
                                  : "/images/og_square.png"
                              }
                              alt={ans.speaker}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span
                            className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase"
                            style={{
                              backgroundColor: `${ans.color || faq.color}20`,
                              color: ans.color || faq.color,
                              border: `1px solid ${ans.color || faq.color}40`,
                            }}
                          >
                            {ans.speaker}
                          </span>
                        </div>
                      )}
                      <div className="space-y-2">
                        {ans.text.map((paragraph, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quick Button to push to Terminal */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleAskPredefined(faq.q)}
                      className="text-[11px] font-mono text-[#00D1FF] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Consultar en la Terminal Interactiva Abajo ↓</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* 3. Bottom Section: Full-Width Cyber Terminal Studio with Sofia & Ivan */}
      <section id="terminal-section" className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
        <div className="rounded-[36px] bg-[#05060A] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-left flex flex-col justify-between relative overflow-hidden font-mono space-y-4">
          {/* Terminal Top HUD Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider ml-1 uppercase">
                TERMINAL INTERACTIVA DUAL-CORE • SOFÍA &amp; IVÁN
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                SISTEMA EN VIVO
              </span>
            </div>
          </div>

          {/* Terminal Screen Stream */}
          <div className="h-[420px] overflow-y-auto py-3 space-y-3 text-xs leading-relaxed pr-1 scrollbar-thin">
            {terminalHistory.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border ${
                  item.type === "user"
                    ? "bg-white/[0.05] border-white/20 text-white"
                    : item.type === "sofia"
                    ? "bg-[#FF3858]/10 border-[#FF3858]/30 text-gray-200"
                    : item.type === "ivan"
                    ? "bg-[#00D1FF]/10 border-[#00D1FF]/30 text-gray-200"
                    : "bg-black/60 border-white/10 text-gray-400 text-[11px]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-2 font-bold">
                  <div className="flex items-center gap-2">
                    {/* Small avatar thumbnail */}
                    <div
                      className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border flex items-center justify-center bg-black shadow-md"
                      style={{
                        borderColor:
                          item.type === "sofia"
                            ? "#FF3858"
                            : item.type === "ivan"
                            ? "#00D1FF"
                            : item.type === "user"
                            ? "#FFD166"
                            : "#94A3B8",
                      }}
                    >
                      <img
                        src={
                          item.type === "sofia"
                            ? "/images/sofia_pink_beanbag.png"
                            : item.type === "ivan"
                            ? "/images/ivan_standing_stylus.png"
                            : item.type === "user"
                            ? "/images/og_square.png"
                            : "/images/og_square.png"
                        }
                        alt={item.senderName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span
                      style={{
                        color:
                          item.type === "sofia"
                            ? "#FF3858"
                            : item.type === "ivan"
                            ? "#00D1FF"
                            : item.type === "user"
                            ? "#FFD166"
                            : "#94A3B8",
                      }}
                    >
                      [{item.senderName}]
                    </span>
                  </div>
                  <span className="text-gray-500 font-mono">{item.time}</span>
                </div>

                {Array.isArray(item.content) ? (
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    {item.content.map((c, i) => (
                      <p key={i}>{c}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm">{item.content}</p>
                )}
              </div>
            ))}

            {isTerminalBusy && (
              <div className="flex items-center gap-2 text-xs text-[#00D1FF] p-2">
                <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
                <span>Dual Core procesando consulta...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Terminal Command Prompts */}
          <div className="py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-white/5">
            <span className="text-[11px] text-gray-500 font-mono uppercase self-center flex-shrink-0">
              Comandos rápidos:
            </span>
            {[
              "¿Cuánto cuesta?",
              "¿Cuánto tiempo tarda?",
              "¿Qué hace diferente a Innocentia?",
              "¿Cómo sé si mi idea es viable?",
              "¿Puedo desarrollar por etapas?",
            ].map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleAskPredefined(cmd)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0 cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Command Input Prompt Form */}
          <form onSubmit={handleTerminalSubmit} className="pt-2 flex items-center gap-3">
            <div className="flex-1 flex items-center bg-black/80 border border-white/20 focus-within:border-[#00D1FF] rounded-2xl px-4 py-3 text-xs sm:text-sm">
              <span className="text-emerald-400 font-mono font-bold mr-2 select-none">
                innocentia@core:~$
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Escribe tu duda libremente a Sofía o Iván..."
                className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none font-mono text-xs sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white hover:scale-105 transition-transform cursor-pointer flex-shrink-0 font-bold text-xs uppercase flex items-center gap-2"
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="relative bg-[#020204] py-12 border-t border-white/10 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA"
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:inline text-gray-500 font-light border-l border-white/10 pl-4">
              Donde la imaginación se convierte en tecnología.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500 font-mono text-[11px]">
            <span>© 2024 Innocentia Tech. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
