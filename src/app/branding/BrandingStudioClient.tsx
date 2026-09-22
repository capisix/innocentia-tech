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
} from "../../lib/icons";

interface BrandingPackage {
  id: string;
  name: string;
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
    id: "pkg_express",
    name: "Identidad Esencial",
    badge: "Ideal para Emprendedores",
    price: "$4,500 MXN",
    priceNum: 4500,
    deliveryTime: "3 a 5 días hábiles",
    description: "Diseño de logotipo profesional desde cero con archivos vectoriales listos para usar en redes, web y papelería básica.",
    features: [
      "3 propuestas conceptuales iniciales",
      "Rondas de ajuste y refinamiento ilimitadas sobre la propuesta electa",
      "Archivos vectoriales originales (AI, EPS, SVG, PDF)",
      "Versiones en alta resolución PNG transparente y JPG",
      "Variaciones en fondo oscuro, claro y monocromático",
      "Paleta de colores oficial con códigos HEX, RGB y CMYK",
    ],
    deliverables: ["Logotipo Vectorial", "PNGs Transparentes", "Paleta de Color", "Tipografía Sugerida"],
  },
  {
    id: "pkg_studio",
    name: "Brand Studio Pro",
    badge: "⭐ MÁS POPULAR",
    price: "$8,500 MXN",
    priceNum: 8500,
    deliveryTime: "5 a 8 días hábiles",
    popular: true,
    description: "Sistema de identidad corporativa completo con manual de marca, aplicaciones reales, papelería y kit para redes sociales.",
    features: [
      "Todo lo incluido en Identidad Esencial",
      "Isotipo, Imagotipo y Logotipo secundario / sello",
      "Manual de Identidad Visual (Brand Guidelines en PDF de 25+ págs)",
      "Reglas de uso, áreas de protección y usos incorrectos",
      "Diseño de Papelería Corporativa: Tarjetas de presentación, hojas membretadas y firmas de correo",
      "Kit para Redes Sociales: Avatares oficiales, portadas y 5 plantillas editables en Figma / Canva",
      "Mockups 3D hiperrealistas de aplicación en productos y empaques",
    ],
    deliverables: ["Logo Suite Completa", "Manual de Marca 25+ págs", "Kit Papelería", "Social Media Templates", "Mockups 3D"],
  },
  {
    id: "pkg_360",
    name: "Ecosistema 360° & UI Design",
    badge: "Para Empresas & Startups",
    price: "$14,500 MXN",
    priceNum: 14500,
    deliveryTime: "10 a 14 días hábiles",
    description: "La experiencia de marca definitiva: arquitectura visual integral, packaging, merchandising y sistema de diseño UI/UX para apps o plataformas web.",
    features: [
      "Todo lo incluido en Brand Studio Pro",
      "Diseño de Packaging, etiquetas o bolsas comerciales",
      "Diseño de uniformes, rotulación vehicular o fachada comercial",
      "Design System UI/UX en Figma (componentes, botones, tipografías a 60 FPS)",
      "Animación de Logotipo en video HD (Intro / Outro animado)",
      "Asesoría de registro de marca ante el IMPI (análisis fonético preliminar)",
      "Acompañamiento creativo directo 1 a 1 con Sofía",
    ],
    deliverables: ["Full Brand Ecosystem", "UI Design System", "Packaging & Merch", "Logo Animado HD", "Asesoría IMPI"],
  },
];

const PALETTES_SHOWCASE = [
  {
    name: "Cyber Neon & Tech",
    category: "Software & Startups",
    colors: ["#FF3858", "#00D1FF", "#8A2BE2", "#040407"],
    description: "Vibrante, innovadora y de alto impacto digital.",
  },
  {
    name: "Luxury & Mineral Glow",
    category: "Inmobiliaria & Alta Gama",
    colors: ["#D4AF37", "#1A1A24", "#2E382E", "#F4F4F6"],
    description: "Elegancia atemporal, solidez y distinción premium.",
  },
  {
    name: "Organic Eco Botanical",
    category: "Salud & Bienestar",
    colors: ["#10B981", "#064E3B", "#F59E0B", "#F3F4F6"],
    description: "Frescura natural, confianza médica y sustentabilidad.",
  },
  {
    name: "Gastronomy & High Energy",
    category: "Restaurantes & Delivery",
    colors: ["#FF5400", "#FFD166", "#D62828", "#111827"],
    description: "Dinamismo, calidez y apetito visual instantáneo.",
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
  aspect?: string;
}

const BRAND_SHOWCASE: BrandShowcaseItem[] = [
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
    id: "jyoti-chocohongo",
    title: "Packaging Botánico & Chocolate",
    brand: "Jyöti • Chocohongo",
    category: "packaging",
    categoryLabel: "Packaging & Cosmética",
    image: "/images/branding/frontal-empaque-chocohongo.jpg",
    description: "Diseño integral de empaque con ilustración mística botánica y renderizado de tableta de chocolate artesanal con hongos adaptógenos.",
    badge: "Luxury Food Packaging",
    deliverables: ["Troquel Empaque", "Ilustración Vectorial", "Render Producto"],
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
];

export default function BrandingStudioClient() {
  const [selectedPkg, setSelectedPkg] = useState<BrandingPackage>(BRANDING_PACKAGES[1]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activePaletteIdx, setActivePaletteIdx] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "logos" | "packaging" | "merch" | "identidad">("todos");
  const [activeShowcaseItem, setActiveShowcaseItem] = useState<BrandShowcaseItem | null>(null);

  const filteredShowcase = selectedFilter === "todos"
    ? BRAND_SHOWCASE
    : BRAND_SHOWCASE.filter((item) => item.category === selectedFilter);

  const getWhatsAppLink = (pkgName: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! Vi el estudio de Branding en Innocentia Tech y me interesa cotizar el paquete "${pkgName}". ¿Me podrías orientar con mi marca?`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  const getWhatsAppShowcaseLink = (brandTitle: string, brandName: string) => {
    const text = encodeURIComponent(
      `¡Hola Sofía! Vi el diseño de "${brandTitle}" (${brandName}) en tu portafolio de Innocentia Tech y me gustaría cotizar un desarrollo de marca con esa misma calidad para mi proyecto.`
    );
    return `https://wa.me/529601771556?text=${text}`;
  };

  return (
    <div className="pt-24 pb-20 space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: SOFÍA • DIRECCIÓN DE ARTE & BRANDING */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FF3858]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#FF7A00]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Presentation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30 text-[#FF5470] font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-[#FF3858] animate-spin" />
              <span>ESTUDIO DE BRANDING & IDENTIDAD VISUAL</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
              Donde las ideas se convierten en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3858] via-[#FF7A00] to-[#FFD166]">Marcas Memorables</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-light max-w-xl leading-relaxed">
              Hola, soy <strong>Sofía</strong>, Directora Creativa en Innocentia Tech. Diseño logotipos vectoriales, renders de packaging 3D, paletas cromáticas y manuales de identidad pensados para conectar con tu audiencia y elevar el valor de tu negocio.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppLink(selectedPkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,56,88,0.5)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Cotizar mi Marca con Sofía</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-3.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#FF3858] text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF3858] flex items-center justify-center shadow-[0_0_10px_#FF3858]">
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </div>
                <span>Ver Video de Sofía</span>
              </button>
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left font-mono">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#FF5470] block">VECTORES 100%</span>
                <span className="text-[10px] text-gray-400">AI, SVG, EPS, PDF</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#FFD166] block">MANUAL DE MARCA</span>
                <span className="text-[10px] text-gray-400">Guía de Estilo Oficial</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-400 block">DERECHOS TOTALES</span>
                <span className="text-[10px] text-gray-400">Propiedad Intelectual</span>
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
                alt="Sofía - Directora de Arte & Branding • Innocentia Tech"
                fill
                quality={100}
                unoptimized
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Floating Glass Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#FF3858]/40 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF3858] animate-ping" />
                  <div>
                    <span className="text-xs font-bold text-white block font-mono">SOFÍA • BRANDING STUDIO</span>
                    <span className="text-[10px] text-gray-400 font-mono">Haz clic para ver video de presentación</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF3858] flex items-center justify-center shadow-lg">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SHOWCASE & PORTFOLIO DE MARCAS CREADAS POR SOFÍA */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3858]/10 border border-[#FF3858]/30 text-xs font-mono text-[#FF5470] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTAFOLIO OFICIAL & MOCKUPS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Marcas Diseñadas en el Estudio
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
                    ? "bg-[#FF3858] text-white shadow-[0_0_15px_#FF3858]"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10"
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
      {/* 2. LOS 6 PILARES DE UN BRANDING DE ALTO IMPACTO */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono text-[#FF5470] uppercase">
            <span>SERVICIOS & ALCANCE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ¿Qué incluye el diseño de tu marca con Sofía?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light">
            No entregamos solo un dibujo; construimos la identidad visual estratégica que hará que tu negocio se posicione y cobre lo que realmente vale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🎨",
              title: "Logotipos Vectoriales & Isotipos",
              desc: "Diseño matemático en curvas vectoriales limpias. Entregado en AI, SVG, EPS, PDF y PNG transparentes de ultra alta resolución listos para cualquier escala.",
            },
            {
              icon: "📖",
              title: "Manual de Identidad & Brand Book",
              desc: "La biblia visual de tu marca: retícula constructiva, áreas de protección, tipografías primarias/secundarias y lineamientos de uso correcto.",
            },
            {
              icon: "🌈",
              title: "Psicología Cromática Estratégica",
              desc: "Selección de paletas de color con base en el público objetivo y la emoción de compra: códigos HEX para web, RGB para pantallas y CMYK / Pantone para impresión.",
            },
            {
              icon: "📦",
              title: "Packaging, Empaques & Merchandising",
              desc: "Diseño de cajas, etiquetas de producto, bolsas, tarjetas de presentación de lujo con barniz a registro y uniformes de personal.",
            },
            {
              icon: "📱",
              title: "Social Media Kit & Plantillas",
              desc: "Avatares oficiales, portadas y plantillas editables en Figma o Canva para que tus publicaciones de Instagram, Facebook y LinkedIn luzcan impecables.",
            },
            {
              icon: "⚡",
              title: "Integración con Apps & Web (UI/UX)",
              desc: "Conexión directa con Iván para que los colores, tipografías y botones de tu marca se implementen a la perfección en tu sitio web o aplicación móvil.",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-[#FF3858]/60 transition-all duration-300 backdrop-blur-xl space-y-3 group hover:shadow-[0_10px_30px_rgba(255,56,88,0.15)]"
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
      {/* 3. EXPLORADOR INTERACTIVO DE PALETAS CROMÁTICAS */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-black via-[#0B0609] to-[#15070F] border border-[#FF3858]/30 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FFD166] uppercase font-bold tracking-wider">
                EXPLORADOR DE ESTILOS DE SOFÍA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Paletas & Armonía Visual
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Cada industria requiere un lenguaje cromático específico para transmitir autoridad y afinidad.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PALETTES_SHOWCASE.map((pal, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePaletteIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    activePaletteIdx === idx
                      ? "bg-[#FF3858] text-white shadow-[0_0_15px_#FF3858]"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                  }`}
                >
                  {pal.category}
                </button>
              ))}
            </div>
          </div>

          {/* Palette Active View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-gray-400 uppercase">Paleta Seleccionada:</span>
              <h4 className="text-2xl font-bold text-white font-mono">
                {PALETTES_SHOWCASE[activePaletteIdx].name}
              </h4>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {PALETTES_SHOWCASE[activePaletteIdx].description}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PALETTES_SHOWCASE[activePaletteIdx].colors.map((color, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-3 text-center shadow-lg"
                >
                  <div
                    className="w-full h-20 rounded-xl shadow-inner transition-transform hover:scale-105"
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
      {/* 4. COTIZADOR DE PAQUETES DE BRANDING */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-[#FF3858]/10 border border-white/15 text-xs font-mono text-gray-300 uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>PROPUESTAS A LA MEDIDA & TRANSPARENCIA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Paquetes de Inversión en Branding
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            <span className="text-[#FFD166] font-medium font-mono text-xs block mb-1">
              ✨ Precios recomendados de referencia • Nos adaptamos 100% a tus necesidades
            </span>
            Selecciona el paquete base o solicita una cotización personalizada según la escala y requerimientos específicos de tu marca.
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
                  <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
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
                    className={`w-full py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white shadow-[0_0_20px_rgba(255,56,88,0.5)]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span>Elegir {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs font-bold whitespace-nowrap transition-all hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg flex-shrink-0"
          >
            <span>Propuesta a mi medida</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF5470]" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FAQ DE BRANDING */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Preguntas Frecuentes sobre Branding
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Todo lo que necesitas saber sobre el proceso de diseño y entrega.
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
      {/* 6. CTA FINAL: INICIAR PROYECTO */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-[#FF3858]/30 via-black to-[#FF7A00]/20 border border-[#FF3858]/50 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ¿Listo para darle vida a tu marca?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Cuéntanos tu idea, tu mercado y tus colores favoritos. Sofía te preparará una propuesta visual personalizada.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <Link
              href="/crear-proyecto"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,56,88,0.6)] hover:scale-105 transition-all cursor-pointer"
            >
              <span>Llenar Formulario de Proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/529601771556?text=Hola%20Sofía,%20quiero%20cotizar%20un%20proyecto%20de%20Branding%20en%20Innocentia%20Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-[#FF3858] text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-[#FF5470]" />
              <span>WhatsApp Directo (+52 960 177 1556)</span>
            </a>
          </div>
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
                  <span className="text-xs text-[#FF5470] font-mono">Dirección Creativa & Branding en Innocentia Tech</span>
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
