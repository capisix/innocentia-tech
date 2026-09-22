"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Play,
  X,
  ArrowRight,
  Paintbrush,
  CheckCircle2,
  Layers,
  FileText,
  Smartphone,
  Share2,
  Check,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Compass,
  Cpu,
  Eye,
  Heart,
  Zap,
  Search,
  Copy,
  Calendar,
  User,
  Settings,
  ChevronRight,
  LineChart,
} from "../../lib/icons";

interface BrandingPackage {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  price: string;
  priceNum: number;
  deliveryTime: string;
  description: string;
  popular?: boolean;
  features: string[];
  deliverables: string[];
}

const BRANDING_PACKAGES: BrandingPackage[] = [
  {
    id: "pkg_essence",
    name: "ESSENCE",
    tagline: "Tu marca comienza a existir.",
    badge: "Para Nuevas Marcas & Emprendedores",
    price: "$4,500 MXN",
    priceNum: 4500,
    deliveryTime: "3 a 5 días hábiles",
    description: "Creación de logotipo e identidad esencial desde cero. Archivos vectoriales maestros y lineamientos de color listos para su lanzamiento.",
    features: [
      "3 direcciones conceptuales iniciales diseñadas por Sofía",
      "Rondas de refinamiento ilimitadas sobre la propuesta electa",
      "Archivos vectoriales originales maestros (AI, EPS, SVG, PDF)",
      "Variaciones cromáticas en fondo oscuro, claro y monocromático",
      "Exportaciones en ultra alta resolución (PNG transparente y JPG)",
      "Paleta oficial calibrada con códigos HEX, RGB y CMYK / Pantone",
      "Tipografías institucionales sugeridas con licencias y jerarquías",
    ],
    deliverables: ["Logotipo Vectorial", "PNGs Transparentes", "Paleta de Color", "Tipografía Sugerida"],
  },
  {
    id: "pkg_identity",
    name: "IDENTITY",
    tagline: "Tu marca encuentra su lenguaje.",
    badge: "⭐ MÁS ELEGIDO",
    price: "$8,500 MXN",
    priceNum: 8500,
    deliveryTime: "5 a 8 días hábiles",
    popular: true,
    description: "Sistema de identidad corporativa integral con manual de marca, aplicaciones reales, papelería corporativa y kit para redes sociales.",
    features: [
      "Todo lo incluido en el paquete Essence",
      "Isotipo, Imagotipo y sellos secundarios de agua",
      "Manual de Identidad Visual (Brand Guidelines en PDF de 25+ páginas)",
      "Retícula constructiva, áreas de protección y lineamientos de uso correcto",
      "Papelería Corporativa: Tarjetas de presentación, hojas membretadas y firmas digitales",
      "Kit para Redes Sociales: Avatares oficiales, portadas y 5 plantillas editables en Figma / Canva",
      "Mockups 3D hiperrealistas de aplicación en producto, empaque y entorno real",
    ],
    deliverables: ["Logo Suite Completa", "Manual de Marca 25+ págs", "Kit Papelería", "Social Media Templates", "Mockups 3D"],
  },
  {
    id: "pkg_universe",
    name: "UNIVERSE",
    tagline: "Tu marca se convierte en una experiencia.",
    badge: "Ecosistema Integral para Empresas & Startups",
    price: "$14,500 MXN",
    priceNum: 14500,
    deliveryTime: "10 a 14 días hábiles",
    description: "La experiencia de marca definitiva: arquitectura visual 360°, diseño de empaques o packaging 3D, merchandising y Design System para web y apps.",
    features: [
      "Todo lo incluido en el paquete Identity",
      "Diseño de Packaging, etiquetas o modelado de empaque comercial en 3D",
      "Diseño de merchandising, uniformes de personal o rotulación vehicular",
      "Design System UI/UX en Figma: Componentes, tipografía, iconografía, estados e interacciones listos para código",
      "Animación de Logotipo en video HD (Intro / Outro animado para contenido y web)",
      "Microinteracciones y animaciones optimizadas para experiencias fluidas de hasta 60 FPS",
      "Asesoría de registro de marca ante el IMPI (análisis fonético preliminar)",
      "Dirección creativa y acompañamiento estratégico 1 a 1 con Sofía",
    ],
    deliverables: ["Full Brand Universe", "UI Design System", "Packaging 3D & Merch", "Logo Animado HD", "Asesoría IMPI"],
  },
];

interface BrandShowcaseItem {
  id: string;
  title: string;
  brand: string;
  category: "logos" | "packaging" | "merch" | "identidad";
  categoryLabel: string;
  image: string;
  description: string;
  badge: string;
  deliverables: string[];
}

const BRAND_SHOWCASE: BrandShowcaseItem[] = [
  {
    id: "ikal-3d",
    title: "Isotipo Escultórico Ancestral Maya 3D",
    brand: "Ikal Chukum",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/ikal chukum logo 3d.png",
    description: "Modelado 3D en relieve con textura de piedra caliza y resina vegetal de chukum para marca de acabados arquitectónicos de lujo.",
    badge: "3D Stone Relief",
    deliverables: ["Render Piedra 3D", "Vector Arqueológico", "Texturas"],
  },
  {
    id: "h2w-crystal",
    title: "Isotipo 3D Cristal & Transparencias",
    brand: "Help 2 Win",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/logo 3d cristal con manos sin fondo.png",
    description: "Renderización volumétrica en cristal óptico de alta refracción con manos en signo de victoria, diseñado para plataforma fintech y comunidad.",
    badge: "3D Hyper Glass",
    deliverables: ["Render 3D 8K", "Isotipo Alpha", "Master PNG"],
  },
  {
    id: "jyoti-chocohongo",
    title: "Packaging Botánico & Chocolate Adaptogénico",
    brand: "Jyöti • Chocohongo",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/frontal-empaque-chocohongo.jpg",
    description: "Diseño integral de empaque con ilustración mística botánica y renderizado de tableta de chocolate artesanal con hongos funcionales.",
    badge: "Luxury Food Packaging",
    deliverables: ["Troquel Empaque", "Ilustración Vectorial", "Render Producto"],
  },
  {
    id: "experience-safely",
    title: "Emblema Sendero de Viaje Seguro",
    brand: "Experience Safely",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/Eperiencie Safely sin fondo con tipografía.png",
    description: "Logotipo circular con sendero turquesa en 'S' y estrella guía naranja para plataforma de reservas turísticas y experiencias seguras.",
    badge: "Travel & Booking Icon",
    deliverables: ["Logotipo Vectorial", "Manual de Aplicación", "Favicons"],
  },
  {
    id: "bindu-cbd-bottle",
    title: "Render Botella Gotero CBD & Flores",
    brand: "Bindu CBD",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/botella cbd con flores.png",
    description: "Escena 3D fotorrealista de botella de cristal ámbar con gotero, etiqueta metalizada mate y ambientación con pétalos de rosa.",
    badge: "Cosmetic 3D Render",
    deliverables: ["Etiqueta Frontal", "Render Fotorrealista", "Filtro UV"],
  },
  {
    id: "dejavu-gold",
    title: "Logotipo 3D Golden Glow Metal",
    brand: "Deja Vu Festival",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/logo Deja Vu festival.png",
    description: "Tipografía 3D con textura de bronce pulido e iluminación volumétrica cálida para festival masivo de música y entretenimiento.",
    badge: "Entertainment 3D",
    deliverables: ["Render Metálico 3D", "Branding Escenarios", "Flyers HD"],
  },
  {
    id: "h2w-merch-polo",
    title: "Merchandising Textil Corporativo",
    brand: "Help 2 Win",
    category: "merch",
    categoryLabel: "Merchandising & Textil",
    image: "/images/branding/camisas fondo trans Help 2 win.png",
    description: "Aplicación de marca en prendas polo y uniformes corporativos con bordado de alta densidad y paleta cromática oficial.",
    badge: "Apparel & Merch",
    deliverables: ["Guía Textil", "Ficha Técnica", "Mockup en Modelos"],
  },
  {
    id: "h2w-totebag",
    title: "Tote Bag Ecológica & Empaque",
    brand: "Help 2 Win",
    category: "merch",
    categoryLabel: "Merchandising & Textil",
    image: "/images/branding/Bolsa fontran Help 2 Win.png",
    description: "Diseño de bolsa de algodón reciclado con emblema central serigrafiado a una tinta para kits de bienvenida y eventos.",
    badge: "Eco Merchandising",
    deliverables: ["Arte Serigrafía", "Separación de Color", "Prototipo"],
  },
  {
    id: "ggc-chrome",
    title: "Emblema 'G' 3D Acero & Cromo",
    brand: "GGC Productions",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/logo GGC productiones - metalico.png",
    description: "Monograma circular con biselado cromo de alta reflexión para casa productora de cine, comerciales y cinematografía.",
    badge: "Cinema Chrome 3D",
    deliverables: ["Render Acero Pulido", "Intro Animado", "Firma Digital"],
  },
  {
    id: "ggc-gold",
    title: "Monograma 'G' Oro & Carbón",
    brand: "GGC Productions",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/logo GGC productiones - amarillo negro.png",
    description: "Variante dorada sobre fondo negro carbón diseñada para claquetas de cine, créditos de largometrajes y material corporativo.",
    badge: "Gold Edition",
    deliverables: ["Logotipo Dorado", "Versión Papelería", "Claqueta de Cine"],
  },
  {
    id: "nidara-tree",
    title: "Árbol de la Vida 3D Orgánico",
    brand: "Nidara Wellness",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/logo arbol nidara 3d tipografia blanca.png",
    description: "Isotipo en relieve de follaje esmeralda con raíces entrelazadas en 3D para marca de bienestar holístico, medicina natural y spas.",
    badge: "Biophilic 3D",
    deliverables: ["Render Biófilo 3D", "Tipografía Serif", "Guía Botánica"],
  },
  {
    id: "bindu-hair-wax",
    title: "Envase Circular de Cera Capilar",
    brand: "Bindu Grooming",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/cera para cabellor transparente.png",
    description: "Diseño de tapa circular de aluminio mate con grabado láser e isotipo verde menta para línea de cuidado personal masculino.",
    badge: "Grooming Packaging",
    deliverables: ["Tapa Grabado Láser", "Etiqueta Circular", "Mockup 3D"],
  },
  {
    id: "bindu-moisturizer-tube",
    title: "Tubo Cosmético Crema Humectante",
    brand: "Bindu Skincare",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/crema humectante empaque sin fondo.png",
    description: "Prototipo de tubo colapsible negro mate con banda ámbar reflectiva y tipografía minimalista de alta legibilidad.",
    badge: "Skincare Packaging",
    deliverables: ["Diseño de Tubo", "Tipografía Dermocosmética", "Offset"],
  },
  {
    id: "bindu-cream-jar",
    title: "Pote Cosmético Negro & Ámbar",
    brand: "Bindu Skincare",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/crema humectante pote sin fondo.png",
    description: "Frasco cilíndrico para crema facial nocturna con acabado mate y franja cromática corporativa.",
    badge: "Cosmetic Jar",
    deliverables: ["Envase 3D", "Serigrafía de Frasco", "Caja Exterior"],
  },
  {
    id: "bindu-antiaging-pump",
    title: "Dosificador Airless Antiarrugas",
    brand: "Bindu Skincare",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/crema antiarrguas sin fondos.png",
    description: "Envase dosificador airless blanco satín con bomba dispensadora de lujo para suero anti-edad.",
    badge: "Airless Pump Dispenser",
    deliverables: ["Botella Satín", "Etiquetado Frontal", "Render Producto"],
  },
  {
    id: "estilo-wood",
    title: "Monograma Caligráfico sobre Madera",
    brand: "Es-tilo",
    category: "identidad",
    categoryLabel: "Identidad & Sellos",
    image: "/images/branding/logo sin borde madera v4clara.png",
    description: "Diseño de firma tipográfica manuscrita de lujo con acabados en bajorrelieve sobre madera clara para marca de moda y decoración.",
    badge: "Signature Monogram",
    deliverables: ["Trazo Manual Vectorial", "Boceto Caligráfico", "Rotulación"],
  },
  {
    id: "estilo-diamond",
    title: "Isotipo Geométrico Diamantado",
    brand: "Es-tilo",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/propuesta logo v4.3 sin fondo.png",
    description: "Propuesta de gema poligonal facetada con caligrafía interior dorada para joyería y alta costura.",
    badge: "Diamond Vector",
    deliverables: ["Retícula Geométrica", "Corte Láser", "Isotipo Master"],
  },
  {
    id: "ikal-color",
    title: "Identidad Tipográfica Mineral",
    brand: "Ikal Chukum",
    category: "identidad",
    categoryLabel: "Identidad & Sellos",
    image: "/images/branding/Logo Ikal chkum color.png",
    description: "Composición tipográfica geométrica en tonalidades turquesa y chukum natural para catálogos de arquitectura y construcción.",
    badge: "Corporate Identity",
    deliverables: ["Tipografía Exclusiva", "Paleta Mineral", "Vector Master"],
  },
  {
    id: "h2w-vector3d",
    title: "Emblema Vectorial 3D Orgánico",
    brand: "Help 2 Win",
    category: "logos",
    categoryLabel: "Logotipos & 3D",
    image: "/images/branding/herlp2win 3d vector.png",
    description: "Isotipo de marca con gradientes dinámicos en tonos cian y esmeralda, adaptado para iconos de apps móviles e interfaces UI.",
    badge: "App Icon Vector",
    deliverables: ["SVG Vectorial", "Icono iOS/Android", "Gradientes HEX"],
  },
  {
    id: "h2w-stamp",
    title: "Sello Monocromático & Emblema",
    brand: "Help 2 Win",
    category: "identidad",
    categoryLabel: "Identidad & Sellos",
    image: "/images/branding/Help2Win__sello_negro sin fondo.png",
    description: "Versión circular de alto contraste para sellos de agua, lacrado digital, contratos y timbres notariales de la plataforma.",
    badge: "Official Stamp",
    deliverables: ["Vector Negativo", "Sello de Agua", "Certificados"],
  },
];

// Color Harmonies Gallery inspired by Pinterest Moodboards
interface ColorHarmonyCard {
  id: string;
  name: string;
  tags: string;
  category: "misticas" | "terrosas" | "botanicas" | "mineral" | "gourmet";
  gradientBg: string;
  colors: string[];
  description: string;
}

const COLOR_HARMONIES: ColorHarmonyCard[] = [
  {
    id: "nocturne-bloom",
    name: "Nocturne Bloom",
    tags: "Mystical · Deep · Botanical",
    category: "misticas",
    gradientBg: "from-[#1A1026] via-[#4B2A46] to-[#0A0610]",
    colors: ["#1A1026", "#4B2A46", "#7E496B", "#B79AB4", "#EDE6EE"],
    description: "Profundidad nocturna y feminidad mística para perfumes, spas de alta gama y proyectos creativos.",
  },
  {
    id: "ethereal-dune",
    name: "Ethereal Dune",
    tags: "Soft · Earthy · Architectural",
    category: "terrosas",
    gradientBg: "from-[#6B705C] via-[#C49A8A] to-[#1F1E1A]",
    colors: ["#6B705C", "#B69F7B", "#C49A8A", "#E7CDB8", "#F4EFE6"],
    description: "Tonos minerales cálidos y arenas del desierto para firmas de arquitectura, moda y hotelería boutique.",
  },
  {
    id: "astral-lagoon",
    name: "Astral Lagoon",
    tags: "Oceanic · Serene · Dreamy",
    category: "mineral",
    gradientBg: "from-[#0D2B36] via-[#1F5F63] to-[#051218]",
    colors: ["#0D2B36", "#1F5F63", "#4CA7A1", "#A6D6C9", "#E6D6EA"],
    description: "Aguas profundas y bioluminiscencia onírica para plataformas tecnológicas, wellness y aplicaciones móviles.",
  },
  {
    id: "crimson-haze",
    name: "Crimson Haze",
    tags: "Bold · Rare · Magnetic",
    category: "misticas",
    gradientBg: "from-[#2B0A12] via-[#6E1D2F] to-[#120307]",
    colors: ["#2B0A12", "#6E1D2F", "#9E3F57", "#C77D8B", "#E7D7D9"],
    description: "Rojos volcánicos y magnetismo intenso para moda vanguardista, clubes nocturnos y festivales.",
  },
  {
    id: "jade-whisper",
    name: "Jade Whisper",
    tags: "Fresh · Zen · Biophilic",
    category: "botanicas",
    gradientBg: "from-[#1B2E28] via-[#336B5C] to-[#0B1512]",
    colors: ["#1B2E28", "#336B5C", "#71A897", "#B6D8C7", "#ECF3E9"],
    description: "Bosques de niebla y jade ancestral para cosmética orgánica, botánica adaptógena y medicina integrativa.",
  },
  {
    id: "amber-mirage",
    name: "Amber Mirage",
    tags: "Warm · Exotic · Timeless",
    category: "mineral",
    gradientBg: "from-[#4A2C1A] via-[#A35C1E] to-[#1E110A]",
    colors: ["#4A2C1A", "#A35C1E", "#D99A4E", "#EBCB9C", "#FFF3E0"],
    description: "Puestas de sol doradas y palacios antiguos para destilados artesanales, joyería y café de especialidad.",
  },
  {
    id: "velvet-twilight",
    name: "Velvet Twilight",
    tags: "Royal · Moody · Luxury",
    category: "misticas",
    gradientBg: "from-[#1A1331] via-[#3A2257] to-[#0C0817]",
    colors: ["#1A1331", "#3A2257", "#6B3F7C", "#9A78A6", "#D8C8E6"],
    description: "Seda violeta y realeza crepuscular para eventos de gala, producción audiovisual y alta repostería.",
  },
  {
    id: "midnight-sakura",
    name: "Midnight Sakura",
    tags: "Mysterious · Soft · Enchanting",
    category: "botanicas",
    gradientBg: "from-[#0B0E1A] via-[#6B3B5C] to-[#060810]",
    colors: ["#0B0E1A", "#2C1A32", "#6B3B5C", "#B57896", "#F3E6EE"],
    description: "Cerezo japonés bajo la luna llena para líneas de skincare, diseño editorial y hospitalidad de lujo.",
  },
  {
    id: "roasted-cocoa",
    name: "Roasted Cocoa & Mocha",
    tags: "Rich · Gourmet · Warm",
    category: "gourmet",
    gradientBg: "from-[#1C1008] via-[#6E472D] to-[#0B0603]",
    colors: ["#1C1008", "#382315", "#6E472D", "#AD7B52", "#E8C5A5"],
    description: "Cacao tostado y crema tostada para marcas gastronómicas, chocolaterías finas y panaderías artesanales.",
  },
  {
    id: "silky-matcha",
    name: "Silky Matcha & Olive",
    tags: "Natural · Organic · Vitality",
    category: "gourmet",
    gradientBg: "from-[#20291B] via-[#688052] to-[#0E130B]",
    colors: ["#20291B", "#3E4F32", "#688052", "#A0B885", "#E0EBD2"],
    description: "Té verde ceremonial y oliva suave para restaurantes plant-based, aceites finos y wellness.",
  },
  {
    id: "winter-woods",
    name: "Winter Woods & Frost",
    tags: "Alpine · Crisp · Nordic",
    category: "terrosas",
    gradientBg: "from-[#0D1A24] via-[#2F526E] to-[#060D12]",
    colors: ["#0D1A24", "#1B3245", "#2F526E", "#6086A8", "#BDD4E7"],
    description: "Bosques boreales y nieve fresca para plataformas de software corporativo, finanzas y viajes de aventura.",
  },
  {
    id: "slate-obsidian",
    name: "Slate & Charcoal Obsidian",
    tags: "Monolith · Minimal · Tech",
    category: "mineral",
    gradientBg: "from-[#181A20] via-[#454A5A] to-[#090A0D]",
    colors: ["#181A20", "#2B2E38", "#454A5A", "#71788E", "#C5CAD8"],
    description: "Piedra volcánica y precisión suiza para hardware premium, estudios de diseño y firmas jurídicas.",
  },
];

// Personalities for the interactive style explorer
const BRAND_PERSONALITIES = [
  {
    id: "innovadora",
    name: "Innovadora",
    emoji: "⚡",
    tagline: "Disrupción tecnológica, vanguardia y futuro digital.",
    colors: ["#00D1FF", "#70D6FF", "#8A2BE2", "#05050A"],
    typography: "Sans Grotesque Geométrica con peso variable",
    shapes: "Ángulos limpios, gradientes luminosos y volumetría 3D",
    textures: "Vidrio esmerilado (Glassmorphism), cromo líquido y luz neón",
    mood: "Alta energía, precisión digital e impacto visual instantáneo",
  },
  {
    id: "elegante",
    name: "Elegante",
    emoji: "✨",
    tagline: "Prestigio atemporal, solidez y distinción premium.",
    colors: ["#D4AF37", "#E5C378", "#181820", "#08080C"],
    typography: "Serif de alto contraste con proporciones clásicas",
    shapes: "Retículas simétricas, bordes ultra finos y espaciado amplio",
    textures: "Bronce cepillado, madera noble, mármol y papel de algodón",
    mood: "Autoridad, confianza de alto nivel y discreción sofisticada",
  },
  {
    id: "organica",
    name: "Orgánica",
    emoji: "🌿",
    tagline: "Frescura botánica, bienestar, salud y sustentabilidad.",
    colors: ["#10B981", "#34D399", "#064E3B", "#022018"],
    typography: "Humanista con remates redondeados y calidez táctil",
    shapes: "Curvas fluidas, hojas, ondas y formas inspiradas en la naturaleza",
    textures: "Fibra reciclada, lino natural, agua y luz solar difusa",
    mood: "Pureza, equilibrio emocional, vitalidad y armonía ecológica",
  },
  {
    id: "rebelde",
    name: "Rebelde",
    emoji: "🔥",
    tagline: "Audacia sin disculpas, ruptura de esquemas y volumen.",
    colors: ["#FF3858", "#FF7A00", "#FFE600", "#0A0A0E"],
    typography: "Display Condensed Ultra-Black de impacto urbano",
    shapes: "Composiciones diagonales, asimetría dinámica y cortes limpios",
    textures: "Asfalto oscuro, pintura electrostática y destellos de neón",
    mood: "Desafío, adrenalina, identidad urbana y personalidad magnética",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    emoji: "◻️",
    tagline: "Esencialismo puro: menos ruido, máximo significado.",
    colors: ["#FFFFFF", "#9CA3AF", "#1F2937", "#020204"],
    typography: "Neo-Grotesk Suiza con tracking generoso",
    shapes: "Espacio negativo protagónico y geometrías esenciales",
    textures: "Monolitos mate, aluminio anodizado y fondos monocromáticos",
    mood: "Claridad mental, orden absoluto y atemporalidad estética",
  },
  {
    id: "premium",
    name: "Premium",
    emoji: "💎",
    tagline: "Lujo sensorial, deseo y exclusividad de alta costura.",
    colors: ["#F472B6", "#FB7185", "#1E1B2E", "#0A0714"],
    typography: "Editorial con ligaduras personalizadas de lujo",
    shapes: "Facetas de diamante, curvas envolventes y brillo selectivo",
    textures: "Seda negra, oro rosado, cuarzo y acabados aterciopelados",
    mood: "Seducción visual, sofisticación profunda y alta deseabilidad",
  },
];

// Emotions for "Antes de diseñar, escuchamos"
const BRAND_EMOTIONS = [
  {
    id: "confianza",
    name: "Confianza",
    icon: "🛡️",
    sofiaSaid: "Estructuramos tu marca con simetría sólida, contrastes limpios y tonalidades profundas que transmiten solidez financiera y autoridad desde el primer segundo.",
    accentColor: "from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300",
  },
  {
    id: "deseo",
    name: "Deseo",
    icon: "🔥",
    sofiaSaid: "Diseñamos con contrastes intensos, texturas aterciopeladas, iluminación volumétrica y curvas sensuales que despiertan una atracción irresistible hacia tu producto.",
    accentColor: "from-rose-500/20 to-orange-500/20 border-rose-500/40 text-rose-300",
  },
  {
    id: "curiosidad",
    name: "Curiosidad",
    icon: "✨",
    sofiaSaid: "Exploramos formas inesperadas, asimetría balanceada y detalles de vanguardia que hacen que el usuario se detenga y quiera descubrir qué hay detrás.",
    accentColor: "from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300",
  },
  {
    id: "exclusividad",
    name: "Exclusividad",
    icon: "👑",
    sofiaSaid: "Usamos el espacio negativo como lujo visual, tipografías editoriales de alta costura y detalles dorados que colocan tu oferta en la cúspide de su mercado.",
    accentColor: "from-yellow-500/20 to-amber-600/20 border-yellow-500/40 text-yellow-300",
  },
  {
    id: "calma",
    name: "Calma",
    icon: "🌿",
    sofiaSaid: "Canalizamos líneas orgánicas fluidas, tonos tierra y paletas botánicas que transmiten paz, salud, bienestar y una conexión humana genuina.",
    accentColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300",
  },
  {
    id: "innovacion",
    name: "Innovación",
    icon: "⚡",
    sofiaSaid: "Integramos gradientes luminosos, volumetría futurista y arquitectura digital que posicionan a tu empresa a la vanguardia de su industria.",
    accentColor: "from-purple-500/20 to-cyan-500/20 border-purple-500/40 text-purple-300",
  },
];

export default function BrandingStudioClient() {
  const [selectedPkg, setSelectedPkg] = useState<BrandingPackage>(BRANDING_PACKAGES[1]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "logos" | "packaging" | "merch" | "identidad">("todos");
  const [activeShowcaseItem, setActiveShowcaseItem] = useState<BrandShowcaseItem | null>(null);
  const [selectedPersonalityIdx, setSelectedPersonalityIdx] = useState(0);
  const [selectedEmotionIdx, setSelectedEmotionIdx] = useState(0);

  // Harmonies & UI Lab States
  const [selectedHarmonyCategory, setSelectedHarmonyCategory] = useState<string>("todas");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeUiTab, setActiveUiTab] = useState<"liquid" | "clay" | "biotech">("liquid");
  const [isGlassSwitchOn, setIsGlassSwitchOn] = useState(true);
  const [isClayPlaying, setIsClayPlaying] = useState(false);
  const [selectedMedicalService, setSelectedMedicalService] = useState(0);

  const activePersonality = BRAND_PERSONALITIES[selectedPersonalityIdx];
  const activeEmotion = BRAND_EMOTIONS[selectedEmotionIdx];

  const filteredShowcase = selectedFilter === "todos"
    ? BRAND_SHOWCASE
    : BRAND_SHOWCASE.filter((item) => item.category === selectedFilter);

  const filteredHarmonies = selectedHarmonyCategory === "todas"
    ? COLOR_HARMONIES
    : COLOR_HARMONIES.filter((item) => item.category === selectedHarmonyCategory);

  const handleCopyPalette = (hexList: string[]) => {
    const text = hexList.join(", ");
    navigator.clipboard?.writeText(text);
    setCopiedHex(hexList[0]);
    setTimeout(() => setCopiedHex(null), 2500);
  };

  const getWhatsAppLink = (pkgName: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! Vi el estudio de Branding en Innocentia Tech y quiero construir mi marca con el paquete "${pkgName}". ¿Me podrías orientar para comenzar?`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  const getWhatsAppShowcaseLink = (brandTitle: string, brandName: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! Vi el diseño de "${brandTitle}" (${brandName}) en el portafolio de Innocentia Tech y quiero construir una marca con esa misma calidad visual para mi proyecto.`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  const getWhatsAppPersonalityLink = (persName: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! En el explorador de Innocentia Tech me identifiqué con la personalidad de marca "${persName}". Me gustaría crear mi universo de marca con esa dirección.`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  const getWhatsAppPaletteLink = (palName: string, hexList: string[]) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! Me encantó la paleta de colores "${palName}" (${hexList.slice(0, 3).join(", ")}) en Innocentia Tech. Quiero cotizar una identidad visual basada en esta armonía cromática.`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  const getWhatsAppUiConceptLink = (conceptTitle: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía e Iván! Vi el prototipo de interfaz "${conceptTitle}" en Innocentia Tech y quiero cotizar el diseño y desarrollo de mi plataforma con ese mismo estilo.`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: SOFÍA • CREATIVE DIRECTOR (TRANSFORMACIÓN DE MARCA) */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FF3858]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#FF7A00]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Transformation Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30 text-[#FF5470] font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-[#FF3858] animate-spin" />
              <span>SOFÍA — CREATIVE DIRECTOR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
              Donde las ideas se convierten en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166]">
                Marcas Memorables
              </span>
            </h1>

            {/* Manifiesto Emocional de Sofía */}
            <div className="space-y-2 border-l-2 border-[#FF3858] pl-4">
              <p className="text-white text-base sm:text-lg font-medium leading-snug">
                No diseñamos solamente cómo se ve una marca.
              </p>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Diseñamos cómo se siente, cómo habla y cómo será recordada.
              </p>
            </div>

            {/* Disciplinas */}
            <div className="text-xs font-mono text-gray-400 tracking-wide">
              Identidad visual · Dirección creativa · Branding · Packaging · Experiencia digital
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppLink(selectedPkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sofia-gradient px-7 py-4 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <span>Construir mi marca con Sofía</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-4 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#FF3858] text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF3858] flex items-center justify-center shadow-[0_0_10px_#FF3858]">
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </div>
                <span>Ver Video de Sofía</span>
              </button>
            </div>

            {/* Micro badges: Human Creativity × AI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left font-mono">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#FF5470] block">SENSIBILIDAD HUMANA</span>
                <span className="text-[10px] text-gray-400">Dirección artística de autor</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#FFD166] block">TECNOLOGÍA 3D & AI</span>
                <span className="text-[10px] text-gray-400">Renders y prototipado veloz</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-400 block">DERECHOS TOTALES</span>
                <span className="text-[10px] text-gray-400">Propiedad Intelectual 100%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sofia Master Artwork */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-full max-w-[440px] aspect-[1024/1100] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_20px_50px_rgba(255,56,88,0.3)] border border-[#FF3858]/30 bg-black/60"
            >
              <Image
                src="/images/sofia_desktop_hd.png"
                alt="Sofía - Creative Director • Innocentia Tech"
                fill
                quality={100}
                unoptimized
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Floating Glass Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#FF3858]/40 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF3858] animate-ping" />
                  <div>
                    <span className="text-xs font-bold text-white block font-mono">SOFÍA • CREATIVE DIRECTOR</span>
                    <span className="text-[10px] text-gray-400 font-mono">“Una marca comienza con una idea que merece ser recordada.”</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF3858] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MANIFIESTO: HUMAN CREATIVITY × ARTIFICIAL INTELLIGENCE */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-[#FF3858]/10 via-black to-[#FF7A00]/10 border border-[#FF3858]/30 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left shadow-2xl">
          <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-xs font-mono text-[#FFD166] uppercase font-bold tracking-wider">
              NUESTRA FILOSOFÍA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Human Creativity × Artificial Intelligence
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Dirección Creativa + Inteligencia Artificial + Diseño Profesional de Vanguardia
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              Imaginación humana. Tecnología sin límites.
            </h3>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              La Inteligencia Artificial acelera las posibilidades creativas, explora miles de combinaciones visuales en segundos y renderiza empaques 3D fotorrealistas. Pero es la <strong>sensibilidad, intuición y visión estratégica de Sofía</strong> la que decide cuáles tienen sentido, alma y poder de conversión para tu negocio.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-gray-400">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ Curaduría Humana 100%
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ Prototipado 3D Acelerado
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ Vectores Puros & Manuales Exclusivos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. QUÉ PODEMOS CREAR: CAPACIDADES DEL ESTUDIO */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono text-[#FF5470] uppercase">
            <span>CAPACIDADES DEL ESTUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Todo lo que tu marca necesita para liderar
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            Construimos el ecosistema visual completo que acompaña a tu cliente desde el primer impacto publicitario hasta el desempaque del producto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🎨",
              title: "Logotipos Vectoriales & Isotipos",
              desc: "Arquitectura geométrica pura en curvas vectoriales limpias. Entregado en AI, SVG, EPS, PDF y PNG transparentes de ultra alta resolución listos para cualquier escala.",
            },
            {
              icon: "📖",
              title: "Manual de Identidad & Brand Guidelines",
              desc: "La biblia visual de tu marca: retícula constructiva, áreas de reserva, tipografías primarias/secundarias, códigos cromáticos y lineamientos de aplicación.",
            },
            {
              icon: "🌈",
              title: "Psicología Cromática & Paletas Sensoriales",
              desc: "Curaduría cromática estratégica basada en el público objetivo y la emoción de compra: códigos HEX para web, RGB para pantallas y CMYK / Pantone para impresión.",
            },
            {
              icon: "📦",
              title: "Packaging & Prototipos 3D Hiperrealistas",
              desc: "Diseño de cajas, etiquetas de producto, botellas cosméticas, empaques colapsibles y renders 3D de alta fidelidad para preventas e inversionistas.",
            },
            {
              icon: "📱",
              title: "Social Media Kit & Plantillas Editables",
              desc: "Avatares oficiales, portadas y plantillas personalizadas en Figma o Canva para que tus publicaciones de Instagram, LinkedIn y YouTube mantengan un nivel prémium.",
            },
            {
              icon: "⚡",
              title: "Design System UI/UX & Microinteracciones",
              desc: "Componentes, tipografía, color, iconografía, estados e interacciones listos para código con microinteracciones fluidas de hasta 60 FPS.",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-[#FF3858]/60 transition-all duration-300 backdrop-blur-xl space-y-3 group hover:shadow-[0_10px_30px_rgba(255,56,88,0.15)] text-left"
            >
              <div className="text-3xl p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{pillar.title}</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EL PROCESO: ASÍ NACE UNA MARCA EN INNOCENTIA */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD166]/10 border border-[#FFD166]/30 text-xs font-mono text-[#FFD166] uppercase shadow-md">
            <Compass className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>METODOLOGÍA CREATIVA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Así nace una marca en Innocentia
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light">
            Un proceso estructurado en 5 etapas donde el análisis estratégico y la dirección de arte convergen para crear identidades duraderas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: "01",
              name: "DESCUBRIR",
              desc: "Entendemos tu historia, mercado, competencia, personalidad de marca y visión a largo plazo.",
              color: "text-[#FF5470] border-[#FF3858]/40",
            },
            {
              step: "02",
              name: "CONCEPTUALIZAR",
              desc: "Exploramos territorios visuales, símbolos, psicología de formas, tipografía y lenguaje cromático.",
              color: "text-[#FF7A00] border-[#FF7A00]/40",
            },
            {
              step: "03",
              name: "CREAR",
              desc: "Construimos la arquitectura geométrica y el sistema visual completo de la marca.",
              color: "text-[#FFD166] border-[#FFD166]/40",
            },
            {
              step: "04",
              name: "DARLE VIDA",
              desc: "Aplicamos la identidad en productos físicos, empaques, redes, espacios y plataformas web.",
              color: "text-emerald-400 border-emerald-500/40",
            },
            {
              step: "05",
              name: "EVOLUCIONAR",
              desc: "La marca queda documentada y preparada para crecer, escalar y liderar su sector.",
              color: "text-[#00D1FF] border-[#00D1FF]/40",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-3xl bg-black/60 border ${item.color} backdrop-blur-xl flex flex-col justify-between space-y-4 text-left shadow-lg hover:-translate-y-1 transition-transform`}
            >
              <div className="space-y-2">
                <span className={`text-2xl sm:text-3xl font-black font-mono ${item.color.split(" ")[0]}`}>
                  {item.step}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PORTAFOLIO: MARCAS QUE YA COBRARON VIDA */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30 text-xs font-mono text-[#FF5470] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTAFOLIO & CASOS REALES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Marcas que ya cobraron vida
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Explora algunos de los proyectos de identidad, isotipos en 3D, renders de packaging y merchandising desarrollados por Sofía para clientes en tecnología, cosmética, eventos y arquitectura.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "todos", label: "Todos (20)" },
              { id: "logos", label: "Logos & 3D" },
              { id: "packaging", label: "Packaging & Cosmética" },
              { id: "merch", label: "Merchandising & Textil" },
              { id: "identidad", label: "Sellos & Manuales" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.6)] ring-1 ring-white/40"
                    : "bg-[#FF3858]/10 text-gray-300 border border-[#FF3858]/25 hover:text-white hover:border-[#FF3858]/60 hover:bg-[#FF3858]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredShowcase.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveShowcaseItem(item)}
              className="group rounded-3xl bg-black/60 border border-white/10 hover:border-[#FF3858]/70 overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-xl cursor-pointer hover:shadow-[0_15px_35px_rgba(255,56,88,0.2)] hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-square bg-[#050508] p-4 flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                  <span className="text-[11px] font-mono text-[#FFD166] font-bold flex items-center gap-1">
                    <span>Ver ficha & ampliar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-gray-200">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 space-y-2.5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#FF5470] font-bold uppercase tracking-wider">
                    {item.brand} • {item.categoryLabel}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FFD166] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.deliverables.map((del, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[9px] font-mono text-gray-300 border border-white/5"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NUEVA SECCIÓN: CURADURÍA DE PALETAS CROMÁTICAS DE SOFÍA (PINBOARDS) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-white/15 text-xs font-mono text-purple-300 uppercase shadow-md">
              <Paintbrush className="w-3.5 h-3.5 text-pink-400" />
              <span>CURADURÍA CROMÁTICA & MOODS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Armonías & Paletas Sensoriales
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Inspiración cromática curada por Sofía para diferentes universos de marca. Haz clic en los colores para copiarlos o solicitar una identidad con esa armonía.
            </p>
          </div>

          {/* Harmony Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "todas", label: "Todas (12)" },
              { id: "misticas", label: "Místicas & Noche" },
              { id: "terrosas", label: "Terrosas & Desierto" },
              { id: "mineral", label: "Mineral & Océano" },
              { id: "botanicas", label: "Botánicas & Zen" },
              { id: "gourmet", label: "Gourmet & Cacao" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedHarmonyCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedHarmonyCategory === cat.id
                    ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white shadow-[0_0_20px_rgba(255,56,88,0.6)] ring-1 ring-white/40"
                    : "bg-[#FF3858]/10 text-gray-300 border border-[#FF3858]/25 hover:text-white hover:border-[#FF3858]/60 hover:bg-[#FF3858]/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Palettes Cards Grid (Tarjetas estilo imágenes 1 y 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHarmonies.map((pal) => (
            <div
              key={pal.id}
              className="p-5 rounded-3xl bg-black/80 border border-white/10 hover:border-[#FF3858]/60 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(255,56,88,0.2)] hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#FF3858] transition-colors">
                      {pal.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400 block">{pal.subtitle}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300 uppercase">
                    {pal.vibe}
                  </span>
                </div>

                {/* Color Swatch Bars (Estilo de la imagen con franjas grandes y elegantes) */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 space-y-0.5 p-1 bg-black/40">
                  <div className="grid grid-cols-5 h-20 rounded-xl overflow-hidden">
                    {pal.colors.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        style={{ backgroundColor: color }}
                        className="h-full relative group/swatch transition-transform hover:scale-110 cursor-pointer flex items-end justify-center pb-1.5"
                        onClick={() => handleCopyPalette([color])}
                        title={`Copiar ${color}`}
                      >
                        <span className="text-[8px] font-mono font-black text-black bg-white/80 px-1 rounded opacity-0 group-hover/swatch:opacity-100 transition-opacity">
                          HEX
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hex codes pills underneath */}
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {pal.colors.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => handleCopyPalette([color])}
                        className="text-center py-1 rounded bg-white/5 hover:bg-white/15 border border-white/5 cursor-pointer transition-colors"
                        title="Click para copiar HEX"
                      >
                        <span className="text-[9px] font-mono text-gray-300 block font-bold truncate px-0.5">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional / Strategic Concept */}
                <p className="text-xs text-gray-300 font-light leading-relaxed">{pal.concept}</p>
                <div className="text-[11px] font-mono text-[#FF7A00] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  <span>Ideal para: {pal.industry}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPalette(pal.colors)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.04] hover:from-white/20 hover:to-white/10 border border-white/15 text-gray-200 hover:text-white font-mono text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3 text-[#FF5470]" />
                  <span>{copiedHex === pal.colors[0] ? "¡Copiada!" : "Copiar Paleta"}</span>
                </button>

                <a
                  href={getWhatsAppPaletteLink(pal.name, pal.colors)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF3858]/20 to-[#FF7A00]/20 hover:from-[#FF3858]/35 hover:to-[#FF7A00]/35 border border-[#FF3858]/40 hover:border-[#FF5470] text-[#FFA8B6] hover:text-white font-mono text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,56,88,0.2)]"
                >
                  <span>Cotizar con esta paleta</span>
                  <ArrowRight className="w-3 h-3 text-[#FF7A00]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. LABORATORIO DE CONCEPTOS & SISTEMAS UI ORIGINALES */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>SISTEMAS VISUALES DIGITALES A MEDIDA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Laboratorio de Interfaces & Conceptos de Diseño
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              En Innocentia Tech no usamos plantillas genéricas. Desarrollamos <strong>sistemas visuales interactivos originales</strong> para marcas que exigen una experiencia inolvidable.
            </p>
          </div>

          {/* UI Labs Tabs Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "liquid", label: "💎 Liquid Glass System", badge: "Glassmorphism" },
              { id: "clay", label: "🧸 Sensory Clay 3D", badge: "Claymorphism" },
              { id: "biotech", label: "🩺 Pure Biotech Flow", badge: "Clinical UI" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveUiTab(tab.id as any)}
                className={`px-4 py-2 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeUiTab === tab.id
                    ? "bg-[#00D1FF] bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] text-slate-950 font-black shadow-[0_0_25px_rgba(0,209,255,0.7)] ring-2 ring-white/50 scale-[1.02]"
                    : "bg-cyan-500/10 text-cyan-200 border border-cyan-500/30 hover:text-white hover:border-[#00D1FF] hover:bg-cyan-500/20"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* UI Prototype 1: Liquid Glass System (Inspirado en la tendencia vítrea) */}
        {activeUiTab === "liquid" && (
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#060814] via-[#0E1326] to-[#04060E] border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                  SISTEMA 01 • LIQUID GLASS UI KIT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Refracción Vítrea & Gradientes Iridiscentes a 60 FPS
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light">
                  Componentes translúcidos con desenfoque óptico, bordes reflectivos y microinteracciones para startups de IA y fintechs.
                </p>
              </div>

              <a
                href={getWhatsAppUiConceptLink("Liquid Glass System")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <span>Cotizar UI con este estilo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Liquid Glass Canvas */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,209,255,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Glass Control Board */}
              <div className="lg:col-span-7 space-y-6">
                {/* Search Bar Glass */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/20 backdrop-blur-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3 text-gray-300 text-xs font-mono">
                    <Search className="w-4 h-4 text-[#00D1FF]" />
                    <span>Search projects & workspaces...</span>
                  </div>
                  <button className="w-7 h-7 rounded-xl bg-[#00D1FF] flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_#00D1FF]">
                    <Search className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>

                {/* Pill Buttons Row with Iridescent Borders */}
                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 border border-purple-400/50 text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform">
                    Primary Action
                  </button>
                  <button className="px-5 py-2.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform">
                    Secondary Glass
                  </button>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-gray-300 font-mono text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>60 FPS Live</span>
                  </div>
                </div>

                {/* Interactive Switch & Sliders */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block font-mono">Quantum Lighting Engine</span>
                    <span className="text-[10px] text-gray-400">Refracción dinámica en tiempo real</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGlassSwitchOn(!isGlassSwitchOn)}
                    className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${
                      isGlassSwitchOn ? "bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] justify-end" : "bg-white/10 justify-start"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </div>

              {/* Right Column: Liquid Card */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/25 backdrop-blur-2xl space-y-4 shadow-[0_0_30px_rgba(138,43,226,0.25)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D1FF]/20 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    Glass Card Pro
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white font-bold">
                    ✓
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white tracking-tight">Upgrade Workspace</h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Experiencia sensorial táctil con soporte completo para temas oscuros y renderizado acelerado por GPU.
                </p>

                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] text-black font-black text-xs uppercase tracking-wider font-mono shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-105 transition-transform">
                  Deploy to Production
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UI Prototype 2: Sensory Clay 3D Dashboard (Inspirado en interfaces táctiles suaves) */}
        {activeUiTab === "clay" && (
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#1C1618] via-[#2A1E22] to-[#140F11] border border-pink-500/30 backdrop-blur-2xl shadow-2xl space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-pink-300 uppercase font-bold tracking-wider">
                  SISTEMA 02 • SENSORY CLAY 3D DASHBOARD
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Textura Táctil Suave, Amabilidad & Bienestar
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light">
                  Elementos tridimensionales con sombreado de arcilla suave en tonos melocotón, crema y menta para apps de lifestyle y comunidades.
                </p>
              </div>

              <a
                href={getWhatsAppUiConceptLink("Sensory Clay 3D Dashboard")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <span>Cotizar UI con este estilo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Clay Canvas */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#20171A]/80 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Sidebar Mockup */}
              <div className="lg:col-span-4 p-5 rounded-3xl bg-[#2A1D22] border border-white/10 space-y-4 shadow-xl text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-amber-300 p-0.5 shadow-md flex items-center justify-center text-xl">
                    🎧
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Sofía Creative</h4>
                    <span className="text-[10px] text-pink-300 font-mono">Good Morning, Creator! ✨</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-200 font-bold flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
                    <span>Focus Playlist (Lofi 3D)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Favorite Palettes (128)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Creative Streak (7 days)</span>
                  </div>
                </div>
              </div>

              {/* Center & Right: Clay Metric Cards */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-gradient-to-b from-[#352229] to-[#25171D] border border-pink-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] space-y-1 text-center">
                    <span className="text-[10px] font-mono text-pink-300 uppercase font-bold">Designs Created</span>
                    <div className="text-3xl font-black text-white font-mono">1,248</div>
                    <span className="text-[10px] text-emerald-400 font-mono">+18% this month</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-b from-[#352229] to-[#25171D] border border-amber-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] space-y-1 text-center">
                    <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">Focus Hours</span>
                    <div className="text-3xl font-black text-white font-mono">34.6 h</div>
                    <span className="text-[10px] text-emerald-400 font-mono">+6.2 hrs logged</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-b from-[#352229] to-[#25171D] border border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)] space-y-1 text-center">
                    <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">Client Rating</span>
                    <div className="text-3xl font-black text-white font-mono">4.98 ★</div>
                    <span className="text-[10px] text-gray-400 font-mono">100% Satisfaction</span>
                  </div>
                </div>

                {/* Clay Bar Chart Mockup */}
                <div className="p-5 rounded-3xl bg-[#2A1D22] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-gray-300 font-bold block">
                    Weekly Creative Output:
                  </span>
                  <div className="flex items-end justify-between gap-2 h-20 pt-2 px-2">
                    {[40, 65, 50, 85, 95, 70, 60].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className="w-full rounded-full bg-gradient-to-t from-rose-500 to-amber-300 transition-all duration-500 hover:scale-105"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[9px] font-mono text-gray-400">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UI Prototype 3: Pure Biotech & Clinical Flow (Inspirado en salud y estética médica) */}
        {activeUiTab === "biotech" && (
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#0A1816] via-[#0F2420] to-[#081210] border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-8 animate-in fade-in duration-300 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  SISTEMA 03 • PURE BIOTECH & CLINICAL FLOW
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Minimalismo Clínico, Blancos Satín & Esmeralda Menta
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light">
                  Interfaces de máxima claridad visual y confianza para clínicas odontológicas, salud integral, spas dermatológicos y biotech.
                </p>
              </div>

              <a
                href={getWhatsAppUiConceptLink("Pure Biotech & Clinical Flow")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <span>Cotizar UI con este estilo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Biotech Canvas */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0B1C18] border border-emerald-500/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Health Score Card */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-xl space-y-5 text-center shadow-xl">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/30 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <span className="text-3xl font-black text-emerald-300 font-mono">92%</span>
                  <span className="text-[8px] font-mono text-white/80 uppercase">Salud Óptima</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Score de Diagnóstico</h4>
                  <p className="text-xs text-gray-300 font-light">
                    Parámetros biométricos y estéticos validados con inteligencia clínica.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left font-mono text-[10px]">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-400 block">Tratamiento:</span>
                    <strong className="text-emerald-300">Alineación 3D</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-400 block">Próxima Cita:</span>
                    <strong className="text-white">28 May, 10:30 AM</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Treatment Flow Selector */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-bold block uppercase tracking-wider">
                  Tratamientos & Experiencias Disponibles:
                </span>

                <div className="space-y-2.5">
                  {[
                    { name: "Teeth Whitening & Laser Care", desc: "Blanqueamiento dental láser con protección de esmalte", price: "$1,850 MXN" },
                    { name: "Dental Implants & 3D Scan", desc: "Modelado maxilofacial por tomografía computarizada", price: "$8,500 MXN" },
                    { name: "Facial Harmonization & Peeling", desc: "Tratamiento dermatológico no invasivo de alta gama", price: "$4,200 MXN" },
                  ].map((service, sIdx) => (
                    <div
                      key={sIdx}
                      onClick={() => setSelectedMedicalService(sIdx)}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        selectedMedicalService === sIdx
                          ? "bg-emerald-950/40 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                          : "bg-black/30 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h5 className="text-sm font-bold text-white">{service.name}</h5>
                        <p className="text-xs text-gray-400 font-light">{service.desc}</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-sm font-bold text-emerald-400 font-mono">{service.price}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 8. EXPERIENCIA SENSORIAL: ANTES DE DISEÑAR, ESCUCHAMOS */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-black via-[#0E060A] to-[#170812] border border-[#FF3858]/30 backdrop-blur-2xl space-y-8 shadow-2xl text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FFD166] uppercase font-bold tracking-wider">
                CONEXIÓN CREATIVA CON SOFÍA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Antes de diseñar, escuchamos.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                ¿Cómo quieres que alguien se sienta la primera vez que vea tu marca?
              </p>
            </div>
          </div>

          {/* Emotion Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BRAND_EMOTIONS.map((emo, idx) => (
              <button
                key={emo.id}
                type="button"
                onClick={() => setSelectedEmotionIdx(idx)}
                className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  selectedEmotionIdx === idx
                    ? "bg-gradient-to-b from-[#FF3858]/30 to-black border-[#FF3858] shadow-[0_0_20px_rgba(255,56,88,0.4)] scale-105"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-2xl">{emo.icon}</span>
                <span className="text-xs font-bold font-mono text-white">{emo.name}</span>
              </button>
            ))}
          </div>

          {/* Sofía Dynamic Answer */}
          <div className="p-6 rounded-3xl bg-black/70 border border-[#FF3858]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#FF3858] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_#FF3858]">
                S
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-white block">SOFÍA RESPONDE:</span>
                <span className="text-[10px] font-mono text-[#FF5470]">Dirección de Arte para transmitir {activeEmotion.name}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed pl-3 border-l-2 border-[#FF3858]">
              “{activeEmotion.sofiaSaid}”
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. EXPLORADOR INTERACTIVO DE PERSONALIDAD DE MARCA */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-black via-[#0B0609] to-[#15070F] border border-[#FF3858]/30 backdrop-blur-2xl space-y-8 shadow-2xl text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FFD166] uppercase font-bold tracking-wider">
                EXPLORADOR DE PERSONALIDAD DE MARCA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ¿Qué personalidad tiene tu marca?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Selecciona la esencia de tu negocio y mira cómo Sofía proyecta su universo visual en tiempo real.
              </p>
            </div>

            {/* Personality Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {BRAND_PERSONALITIES.map((pers, idx) => (
                <button
                  key={pers.id}
                  type="button"
                  onClick={() => setSelectedPersonalityIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPersonalityIdx === idx
                      ? "bg-[#FF3858] text-white shadow-[0_0_15px_#FF3858]"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                  }`}
                >
                  <span>{pers.emoji}</span>
                  <span>{pers.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Personality Preview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#FF5470] uppercase font-bold">
                  Tu universo visual podría sentirse así →
                </span>
                <h4 className="text-3xl font-black text-white font-mono flex items-center gap-2">
                  <span>{activePersonality.emoji}</span>
                  <span>{activePersonality.name}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {activePersonality.tagline}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Tipografía Sugerida:</span>
                  <strong className="text-white">{activePersonality.typography}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Formas & Geometría:</span>
                  <span className="text-gray-200">{activePersonality.shapes}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Texturas & Acabados:</span>
                  <span className="text-gray-200">{activePersonality.textures}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppPersonalityLink(activePersonality.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Crear una marca con esta dirección</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Colors Preview */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activePersonality.colors.map((color, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-3 text-center shadow-lg"
                >
                  <div
                    className="w-full h-24 rounded-xl shadow-inner transition-transform hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                  <div className="font-mono text-xs font-bold text-white">{color}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. LA SINERGIA: SOFÍA + IVÁN (CUANDO DISEÑO Y TECNOLOGÍA SE ENCUENTRAN) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-purple-950/20 via-black to-cyan-950/20 border border-white/15 backdrop-blur-2xl text-center space-y-8 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
              EL NÚCLEO DE INNOCENTIA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Cuando diseño y tecnología se encuentran.
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              La identidad no se queda en un PDF. Se convierte en una experiencia interactiva en código vivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
            {/* Sofía */}
            <div className="rounded-3xl bg-black/80 border border-[#FF3858]/40 overflow-hidden flex flex-col justify-between shadow-2xl group hover:border-[#FF3858] transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,56,88,0.3)]">
              <div className="relative w-full h-56 bg-gradient-to-b from-[#FF3858]/20 via-black/40 to-black overflow-hidden flex items-end justify-center">
                <Image
                  src="/images/sofia_desktop_hd.png"
                  alt="Sofía • Directora Creativa"
                  fill
                  quality={95}
                  unoptimized
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FF3858]/40 text-[#FF5470] font-mono text-[10px] font-bold uppercase">
                  🎨 SOFÍA • CREATIVE
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#FF5470] block">DIRECCIÓN ARTÍSTICA</span>
                  <h3 className="text-lg font-bold text-white">Construye la Identidad</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Diseña el alma, la emoción, el lenguaje visual, la psicología cromática y la memoria sensorial de tu marca.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 border-t border-white/10 pt-3 block">
                  Arte · Emoción · Identidad
                </span>
              </div>
            </div>

            {/* Iván */}
            <div className="rounded-3xl bg-black/80 border border-[#00D1FF]/40 overflow-hidden flex flex-col justify-between shadow-2xl group hover:border-[#00D1FF] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,209,255,0.3)]">
              <div className="relative w-full h-56 bg-gradient-to-b from-[#00D1FF]/20 via-black/40 to-black overflow-hidden flex items-end justify-center">
                <Image
                  src="/images/ivan_desktop_hd.png"
                  alt="Iván • Lead Software Architect"
                  fill
                  quality={95}
                  unoptimized
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00D1FF]/40 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                  ⚡ IVÁN • TECH LEAD
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 block">INGENIERÍA & CÓDIGO</span>
                  <h3 className="text-lg font-bold text-white">La Convierte en Software</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Transforma el diseño en interfaces fluidas a 60 FPS, arquitectura serverless en la nube y plataformas de alta conversión.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 border-t border-white/10 pt-3 block">
                  Código · Rendimiento · Cloud
                </span>
              </div>
            </div>

            {/* Innocentia Ecosistema */}
            <div className="rounded-3xl bg-gradient-to-br from-purple-950/40 via-black to-black border border-purple-500/40 overflow-hidden flex flex-col justify-between shadow-2xl group hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]">
              <div className="relative w-full h-56 bg-gradient-to-b from-purple-500/20 via-black/40 to-black overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/sofia_ivan_chars.png"
                  alt="Sinergia Sofía e Iván • Innocentia Tech"
                  fill
                  quality={95}
                  unoptimized
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold uppercase">
                  🚀 INNOCENTIA • DUAL
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-300 block">EXPERIENCIA INTEGRAL</span>
                  <h3 className="text-lg font-bold text-white">Une Ambos Mundos</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Cero fricción entre el equipo creativo y los ingenieros de desarrollo. Tu marca nace con diseño de autor y funciona impecable.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 border-t border-white/10 pt-3 block">
                  Ecosistema 360° Completo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. PAQUETES: ESSENCE, IDENTITY, UNIVERSE (CON LEYENDA ADAPTABLE) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-[#FF3858]/10 border border-white/15 text-xs font-mono text-gray-300 uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>PROPUESTAS A LA MEDIDA & TRANSPARENCIA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Paquetes de Creación de Marca
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            <span className="text-[#FFD166] font-medium font-mono text-xs block mb-1">
              ✨ Precios recomendados de referencia • Nos adaptamos 100% a tus necesidades
            </span>
            Elige el nivel de profundidad visual para tu negocio o solicita una propuesta hecha a la medida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {BRANDING_PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer backdrop-blur-2xl ${
                  isSelected
                    ? "bg-black/90 border-2 border-[#FF3858] shadow-[0_0_35px_rgba(255,56,88,0.35)] scale-[1.02]"
                    : "bg-black/60 border border-white/10 hover:border-white/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">{pkg.badge}</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{pkg.name}</h3>
                    <p className="text-xs font-mono text-[#FFD166] italic">{pkg.tagline}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl sm:text-4xl font-black text-white font-mono">{pkg.price}</div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Sugerido</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">Entrega: {pkg.deliveryTime}</div>
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed">{pkg.description}</p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-left">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block font-bold">
                      ¿Qué incluye?
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-gray-200">
                        <Check className="w-3.5 h-3.5 text-[#FF5470] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href={getWhatsAppLink(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-5 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "btn-sofia-gradient ring-2 ring-white/60 scale-[1.02]"
                        : "btn-glass-sofia"
                    }`}
                  >
                    <span className={isSelected ? "text-white font-black" : "text-[#FFA8B6] font-bold"}>
                      Elegir {pkg.name}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-white stroke-[2.5]" : "text-[#FF7A00]"}`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda Elegante: Precios recomendados & Adaptabilidad */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FF3858]/10 via-[#0B0609] to-[#FF7A00]/10 border border-[#FF3858]/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl text-left">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF3858]/20 to-[#FFD166]/20 border border-[#FF3858]/40 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
              ✨
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Precios Recomendados • Nos adaptamos a tus necesidades
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Los paquetes mostrados son <em>referencias estratégicas</em>. Si requieres entregables específicos, pagos por etapas o un alcance a tu medida, diseñamos una propuesta personalizada para ti.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/529601771556?text=Hola%20Sofía,%20vi%20los%20paquetes%20de%20branding%20en%20Innocentia%20Tech%20y%20me%20gustaría%20una%20propuesta%20adaptada%20a%20mis%20necesidades."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-sofia px-5 py-3 rounded-full font-mono text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Propuesta a mi medida</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF5470]" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FAQ DE BRANDING */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Preguntas Frecuentes sobre el Estudio
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Todo lo que necesitas saber sobre el proceso de diseño, derechos y entrega.
          </p>
        </div>

        <div className="space-y-4 font-mono text-left">
          {[
            {
              q: "¿En qué formatos me entregan los archivos del logotipo?",
              a: "Te entregamos el paquete maestro en archivos vectoriales originales (Adobe Illustrator .AI, .SVG, .EPS y .PDF editable) para que puedas escalar tu logo al tamaño de un edificio sin perder nada de calidad, además de archivos .PNG transparentes y .JPG en ultra alta resolución para web y redes.",
            },
            {
              q: "¿Qué pasa si ninguna de las propuestas iniciales me convence?",
              a: "Sofía trabaja con rondas de retroalimentación estructuradas. Si la primera dirección no cumple tus expectativas, profundizamos en tus preferencias estéticas y presentamos nuevas alternativas hasta que quedes 100% enamorado de tu marca.",
            },
            {
              q: "¿El código de color y las tipografías son mías?",
              a: "Sí. En el Manual de Identidad Visual te entregamos las especificaciones exactas de color (HEX, RGB, CMYK, Pantone) y los nombres o enlaces de descarga de las fuentes tipográficas oficiales para que tu equipo las use siempre.",
            },
            {
              q: "¿Cómo se conecta el branding con mi página web o aplicación?",
              a: "Al trabajar en Innocentia Tech, Sofía coordina directamente con Iván para trasladar los colores, estilos y componentes de tu marca al código de tu web o app a 60 FPS, garantizando coherencia absoluta.",
            },
          ].map((faq, fIdx) => (
            <div key={fIdx} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white font-sans">{faq.q}</h4>
              <p className="text-xs text-gray-300 font-sans font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. CIERRE EMOCIONAL Y MEMORABLE (CTA FINAL) */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-14 rounded-[36px] bg-gradient-to-r from-[#FF3858]/30 via-black to-[#FF7A00]/20 border border-[#FF3858]/50 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Tu marca todavía no existe.
            </h2>
            <p className="text-xl sm:text-2xl text-[#FFD166] font-light">
              Existe la idea.
            </p>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Nosotros podemos ayudarla a encontrar su forma.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a
              href="https://wa.me/529601771556?text=Hola%20Sofía,%20quiero%20comenzar%20a%20construir%20mi%20marca%20en%20Innocentia%20Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sofia-gradient px-8 py-4 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <span>Comenzar con Sofía</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </a>

            <Link
              href="/crear-proyecto"
              className="btn-glass-sofia px-7 py-4 rounded-full font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <span className="text-[#FFA8B6]">Llenar Formulario de Marca</span>
              <ArrowRight className="w-4 h-4 text-[#FF5470]" />
            </Link>
          </div>

          <p className="text-[11px] font-mono text-gray-400">
            Cuéntanos qué imaginas. Nosotros comenzamos desde ahí.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BRAND SHOWCASE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activeShowcaseItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#090508] border border-[#FF3858]/50 overflow-hidden shadow-2xl space-y-4 p-5 sm:p-7 max-h-[92vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FF3858]/20 border border-[#FF3858]/40 text-[#FF5470] font-mono text-xs font-bold uppercase tracking-wider">
                  {activeShowcaseItem.badge}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {activeShowcaseItem.brand} • {activeShowcaseItem.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveShowcaseItem(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center overflow-y-auto pr-1">
              {/* High-res Image Preview */}
              <div className="md:col-span-7 relative w-full aspect-square max-h-[420px] rounded-2xl bg-[#030204] border border-white/10 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={activeShowcaseItem.image}
                  alt={activeShowcaseItem.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Meta & Specifications */}
              <div className="md:col-span-5 space-y-5 text-left">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-[#FFD166] uppercase font-bold tracking-wider">
                    Ficha Técnica de Diseño
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {activeShowcaseItem.title}
                  </h3>
                  <div className="text-xs font-mono text-gray-400">
                    Cliente / Proyecto: <strong className="text-white">{activeShowcaseItem.brand}</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {activeShowcaseItem.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 border-t border-white/10 pt-3">
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                    Entregables & Formatos:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeShowcaseItem.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>{del}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <a
                    href={getWhatsAppShowcaseLink(activeShowcaseItem.title, activeShowcaseItem.brand)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,56,88,0.5)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Quiero un diseño como este</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] font-mono text-gray-400 text-center">
                    Sofía te asesora directamente en WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SOFÍA VIDEO PRESENTATION MODAL */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0B0609] border border-[#FF3858]/50 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF3858] to-[#FF7A00] flex items-center justify-center text-lg shadow-md">
                  🖌️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">SOFÍA • PRESENTACIÓN OFICIAL</h3>
                  <span className="text-xs text-[#FF5470] font-mono">Creative Director en Innocentia Tech</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <video
                src="/videos/sofia_presentacion.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
