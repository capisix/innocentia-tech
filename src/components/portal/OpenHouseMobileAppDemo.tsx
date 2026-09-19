"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Search,
  SlidersHorizontal,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Building2,
  ShieldCheck,
  CreditCard,
  Layers,
  Flame,
  Check,
  Copy,
  Send,
  Camera,
  Plus,
  ArrowRight,
  Maximize2,
  Smartphone,
  Monitor,
} from "../../lib/icons";

export interface PropertyItem {
  id: string;
  name: string;
  category: "Terreno" | "Playa" | "Residencial" | "Casa";
  location: string;
  zone: string;
  areaM2: number;
  totalPrice: number;
  downPaymentPercent: number;
  monthlyMonths: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  highlight: string;
  features: { label: string; icon: string }[];
  description: string;
  status: "disponible" | "apartado" | "preventa";
  coordinates: { x: number; y: number }; // percentage on interactive map
}

export const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: "LOT-TELCHAC-01",
    name: "Costa Esmeralda Beach Club",
    category: "Playa",
    location: "Telchac Puerto, Yucatán",
    zone: "Costa Esmeralda (a 4 min del mar)",
    areaM2: 350,
    totalPrice: 295000,
    downPaymentPercent: 10,
    monthlyMonths: 36,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewsCount: 38,
    highlight: "Alta Plusvalía • Acceso a Club de Playa • Energía Subterránea",
    features: [
      { label: "350 m² Superficie", icon: "📐" },
      { label: "Club de Playa", icon: "🏖️" },
      { label: "Propiedad Privada", icon: "📜" },
      { label: "Sin Buró / 36 Meses", icon: "💳" },
    ],
    description:
      "Desarrollo residencial premium en Telchac Puerto con acceso exclusivo a club de playa privado. Cuenta con calles pavimentadas, alumbrado público subterráneo, mojoneras de concreto y certeza jurídica 100% ante el Registro Público de la Propiedad.",
    status: "disponible",
    coordinates: { x: 72, y: 28 },
  },
  {
    id: "LOT-DZIDZ-04",
    name: "Dzidzantún Oasis Country",
    category: "Terreno",
    location: "Dzidzantún, Yucatán",
    zone: "Corredor Turístico Santa Clara",
    areaM2: 450,
    totalPrice: 198000,
    downPaymentPercent: 10,
    monthlyMonths: 48,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewsCount: 24,
    highlight: "Lote de Inversión • Título Privado • Mensualidades desde $3,712 MXN",
    features: [
      { label: "450 m² Superficie", icon: "📐" },
      { label: "A 12 min de Playa", icon: "🌊" },
      { label: "Escrituración Directa", icon: "📑" },
      { label: "Plan a 48 Meses", icon: "🗓️" },
    ],
    description:
      "Lotes campestres y de inversión con alta proyección de crecimiento por la cercanía con el puerto de Santa Clara. Ideal para construir casa de descanso o generar plusvalía patrimonial a mediano plazo.",
    status: "disponible",
    coordinates: { x: 82, y: 35 },
  },
  {
    id: "LOT-MERIDA-08",
    name: "Residencial Chicxulub Conkal",
    category: "Residencial",
    location: "Conkal - Chicxulub, Mérida Norte",
    zone: "Zona Diamante Mérida Norte",
    areaM2: 600,
    totalPrice: 580000,
    downPaymentPercent: 15,
    monthlyMonths: 24,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5.0,
    reviewsCount: 52,
    highlight: "Privada Residencial • Seguridad 24/7 • Casa Club & Alberca",
    features: [
      { label: "600 m² Lote", icon: "📐" },
      { label: "Casa Club con Alberca", icon: "🏊" },
      { label: "Seguridad 24/7", icon: "🛡️" },
      { label: "A 15 min de Altabrisa", icon: "🚗" },
    ],
    description:
      "Exclusivo lote residencial dentro de privada con amenidades de primer nivel: canchas de pádel, alberca semiolímpica, salón de eventos climatizado y áreas verdes diseñadas por paisajistas.",
    status: "preventa",
    coordinates: { x: 46, y: 52 },
  },
  {
    id: "LOT-HUNUCMA-12",
    name: "Hunucmá Verde Ecoturístico",
    category: "Terreno",
    location: "Hunucmá / Sisal, Yucatán",
    zone: "Corredor Industrial & Puerto Sisal",
    areaM2: 500,
    totalPrice: 285000,
    downPaymentPercent: 10,
    monthlyMonths: 36,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewsCount: 19,
    highlight: "Cerca de Sisal Pueblo Mágico • Conexión Vial Mérida-Costa",
    features: [
      { label: "500 m² Lote", icon: "📐" },
      { label: "Zona de Expansión", icon: "📈" },
      { label: "Pozo Sustentable", icon: "💧" },
      { label: "Trato Directo", icon: "🤝" },
    ],
    description:
      "Oportunidad de inversión estratégica en la zona de mayor crecimiento industrial y turístico del poniente de Mérida, a sólo 20 minutos de las playas vírgenes de Sisal.",
    status: "apartado",
    coordinates: { x: 28, y: 64 },
  },
];

type AppScreen = "onboarding" | "home" | "map" | "detail" | "booking" | "chat" | "add_property" | "profile";

export default function OpenHouseMobileAppDemo() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(PROPERTIES_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["LOT-TELCHAC-01"]);
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");

  // Booking Flow State
  const [selectedDateDay, setSelectedDateDay] = useState<number>(24);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:00 AM");
  const [bookingMode, setBookingMode] = useState<"meet" | "terreno">("meet");
  const [clientName, setClientName] = useState("Eduardo Cáceres");
  const [clientPhone, setClientPhone] = useState("+52 999 292 0999");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ id: number; sender: "advisor" | "user"; text: string; time: string }[]>([
    {
      id: 1,
      sender: "advisor",
      text: "¡Hola Eduardo! Soy Jessica Torre de Open House Yucatán. ¿En qué desarrollo te gustaría recibir asesoría hoy?",
      time: "10:14 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hola Jessica, me interesa el lote en Telchac Beach. ¿Tienen planes a 36 meses sin intereses?",
      time: "10:16 AM",
    },
    {
      id: 3,
      sender: "advisor",
      text: "¡Sí, por supuesto! Con 10% de enganche ($29,500 MXN) te quedan mensualidades fijas de $7,375 MXN sin revisión de buró. ¿Te agendo una videollamada para mostrarte el master plan?",
      time: "10:18 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Financing calculation for current property
  const downPaymentAmt = (selectedProperty.totalPrice * selectedProperty.downPaymentPercent) / 100;
  const remainingBal = selectedProperty.totalPrice - downPaymentAmt;
  const monthlyPay = remainingBal / selectedProperty.monthlyMonths;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "user" as const,
      text: inputMessage,
      time: "11:05 AM",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage("");

    // Simulated quick advisor response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "advisor",
          text: "¡Excelente! Con gusto te apoyo. En breve te envío la ficha técnica en PDF y la corrida financiera a tu WhatsApp.",
          time: "11:06 AM",
        },
      ]);
    }, 1200);
  };

  // Filtered properties
  const filteredProperties = PROPERTIES_DATA.filter((p) => {
    const matchesCat =
      activeCategory === "Todos" ||
      (activeCategory === "Terrenos" && (p.category === "Terreno" || p.category === "Playa")) ||
      (activeCategory === "Playa" && p.category === "Playa") ||
      (activeCategory === "Residencial" && p.category === "Residencial");
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {/* Top Controls Toolbar: Device Frame Toggle & Info */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#111116] border border-[#E87512]/30 shadow-lg text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E87512]/20 border border-[#E87512]/40 flex items-center justify-center text-[#E87512]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">OPEN HOUSE YUCATÁN • PROPTECH APP DEMO</span>
            <span className="text-gray-400 text-[11px]">Diseño Mobile-First adaptado con paleta oficial de marca</span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewMode("phone")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "phone"
                ? "bg-[#E87512] text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulador Celular</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("fullscreen")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "fullscreen"
                ? "bg-[#E87512] text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Pantalla Completa</span>
          </button>
        </div>
      </div>

      {/* Main App Container: iPhone 16 Pro Frame or Fullscreen Canvas */}
      <div
        className={`transition-all duration-300 ${
          viewMode === "phone"
            ? "w-full max-w-[395px] h-[835px] rounded-[52px] p-3.5 bg-[#1C1C22] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(232,117,18,0.2)] border-[5px] border-[#2E2E38] relative flex flex-col overflow-hidden ring-1 ring-white/10"
            : "w-full max-w-4xl min-h-[750px] rounded-3xl bg-[#0C0C10] border border-[#E87512]/40 shadow-2xl p-4 sm:p-6 relative flex flex-col overflow-hidden"
        }`}
      >
        {/* Dynamic Island on Phone View */}
        {viewMode === "phone" && (
          <div className="w-full flex justify-center z-50 mb-1 pointer-events-none">
            <div className="w-28 h-5 bg-black rounded-full flex items-center justify-between px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E87512]/60 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-black border border-white/20" />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 1: ONBOARDING / SPLASH */}
        {/* ========================================================================= */}
        {currentScreen === "onboarding" && (
          <div className="w-full h-full rounded-[38px] bg-gradient-to-b from-[#140E0A] via-[#0D0D11] to-[#0A0A0E] relative overflow-hidden flex flex-col justify-between p-6 text-left">
            {/* Background Architecture Photo */}
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-[#0D0D11]/60 to-transparent" />
            </div>

            {/* Top Brand Logo */}
            <div className="relative z-10 pt-4 flex items-center justify-between">
              <img
                src="https://static.tokkobroker.com/tfw_images/1631_Open%20House%20Yucat%C3%A1n/SIN%20FONDO%20OPEN%20HOUSE%20YUCATAN.png"
                alt="Open House Yucatán"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              />
              <span className="px-2.5 py-1 rounded-full bg-[#E87512]/20 border border-[#E87512]/40 text-[#E87512] text-[10px] font-mono font-bold">
                PropTech v3.0
              </span>
            </div>

            {/* Hero Copy & CTA Button */}
            <div className="relative z-10 space-y-6 pb-6">
              <div className="space-y-2">
                <span className="text-[#E87512] font-mono text-xs font-black tracking-widest uppercase block">
                  INVERSIÓN PATRIMONIAL EN YUCATÁN
                </span>
                <h1 className="text-3xl font-black text-white leading-tight font-sans">
                  All-In-One Real Estate Platform
                </h1>
                <p className="text-xs text-[#FAE3D1]/80 leading-relaxed font-sans">
                  Descubre terrenos residenciales y de playa con financiamiento directo, agenda citas con asesores y cotiza en tiempo real.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-2 rounded-full bg-[#E87512]" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentScreen("home")}
                  className="w-14 h-14 rounded-full bg-[#E87512] hover:bg-[#E87512]/90 text-black font-black flex items-center justify-center shadow-[0_0_25px_rgba(232,117,18,0.6)] transition-transform hover:scale-105 cursor-pointer"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 2: HOME / EXPLORAR */}
        {/* ========================================================================= */}
        {currentScreen === "home" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            {/* Scrollable Main Area */}
            <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-4 text-left">
              {/* Top Header Profile & Notification */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E87512] to-[#B25309] flex items-center justify-center text-black font-black text-sm shadow-md">
                    EC
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono block">Bienvenido</span>
                    <h2 className="text-sm font-bold text-white font-sans">Eduardo Cáceres</h2>
                  </div>
                </div>

                <img
                  src="https://static.tokkobroker.com/tfw_images/1631_Open%20House%20Yucat%C3%A1n/SIN%20FONDO%20OPEN%20HOUSE%20YUCATAN.png"
                  alt="Open House"
                  className="h-7 w-auto object-contain"
                />
              </div>

              {/* Title Greeting */}
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Encuentra tu próximo <span className="text-[#E87512]">Terreno</span>
                </h3>
                <p className="text-xs text-gray-400">Mérida • Telchac • Sisal • Dzidzantún</p>
              </div>

              {/* Search Bar & Filter Button */}
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs">
                  <Search className="w-4 h-4 text-[#E87512]" />
                  <input
                    type="text"
                    placeholder="Buscar por zona o playa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentScreen("map")}
                  className="p-2.5 rounded-2xl bg-[#E87512] text-black font-bold flex items-center justify-center shadow-[0_0_15px_rgba(232,117,18,0.4)] cursor-pointer"
                  title="Ver en Mapa Interactivo"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {["Todos", "Terrenos", "Playa", "Residencial"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#E87512] text-black font-black shadow-md"
                        : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Promo Offer Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E87512]/30 via-[#26160C] to-[#120D09] border border-[#E87512]/40 relative overflow-hidden flex items-center justify-between">
                <div className="space-y-1 relative z-10">
                  <span className="px-2 py-0.5 rounded-full bg-[#E87512] text-black text-[9px] font-black uppercase">
                    Preventa 2026
                  </span>
                  <h4 className="text-sm font-black text-white">10% Enganche Directo</h4>
                  <p className="text-[10px] text-[#FAE3D1]/80">Sin revisión de buró • Hasta 48 MSI</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProperty(PROPERTIES_DATA[0]);
                    setCurrentScreen("booking");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#E87512] text-black text-xs font-black uppercase tracking-wider relative z-10 shadow-lg cursor-pointer"
                >
                  Agendar
                </button>
              </div>

              {/* Featured Properties Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E87512]" />
                    <span>Lotes Destacados</span>
                  </h4>
                  <span className="text-[11px] text-[#E87512] cursor-pointer" onClick={() => setActiveCategory("Todos")}>
                    Ver todos ({filteredProperties.length})
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => {
                        setSelectedProperty(prop);
                        setCurrentScreen("detail");
                      }}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#E87512]/50 transition-all cursor-pointer space-y-2.5 group"
                    >
                      {/* Thumbnail with tags & heart */}
                      <div className="w-full h-40 rounded-xl overflow-hidden relative bg-black/50">
                        <img
                          src={prop.image}
                          alt={prop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#FAE3D1]">
                          {prop.category} • {prop.areaM2} m²
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(prop.id, e)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-[#E87512] transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(prop.id) ? "fill-[#E87512] text-[#E87512]" : ""
                            }`}
                          />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#E87512] text-black font-mono font-black text-xs shadow-md">
                          ${prop.totalPrice.toLocaleString()} MXN
                        </div>
                      </div>

                      {/* Info & Price breakdown */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-white truncate">{prop.name}</h5>
                          <span className="text-emerald-400 font-mono text-xs font-bold">★ {prop.rating}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E87512]" />
                          <span className="truncate">{prop.location}</span>
                        </p>

                        <div className="pt-2 flex items-center justify-between text-[10px] font-mono border-t border-white/10 text-gray-300">
                          <span>
                            Enganche: <strong className="text-white">${((prop.totalPrice * prop.downPaymentPercent) / 100).toLocaleString()}</strong>
                          </span>
                          <span className="text-[#E87512] font-bold">
                            {prop.monthlyMonths} Meses s/intereses
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 3: INTERACTIVE MAP (ORELAX MAP PREVIEW) */}
        {/* ========================================================================= */}
        {currentScreen === "map" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#090D14] text-white relative">
            {/* Top Search bar over map */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentScreen("home")}
                className="w-10 h-10 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 px-4 py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#E87512]" />
                <span className="text-white font-bold">Yucatán (Telchac, Dzidzantún, Conkal)</span>
              </div>
            </div>

            {/* Interactive Vector / Satellite Map Background */}
            <div className="w-full h-full relative overflow-hidden bg-[#121927]">
              {/* Map Graphic Lines & Zones */}
              <svg className="w-full h-full absolute inset-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
                {/* Coastal Line Yucatán */}
                <path
                  d="M0 120 Q 150 90, 300 130 T 600 100"
                  fill="none"
                  stroke="#00D1FF"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <text x="20" y="80" fill="#00D1FF" fontSize="11" fontFamily="monospace">
                  GOLFO DE MÉXICO • COSTA ESMERALDA
                </text>
                {/* Highway lines */}
                <line x1="140" y1="350" x2="280" y2="120" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
                <line x1="200" y1="420" x2="330" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
                {/* Polygon High Value Zone */}
                <polygon
                  points="180,240 330,170 380,270 240,320"
                  fill="rgba(232,117,18,0.15)"
                  stroke="#E87512"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Price Bubble Pins */}
              {PROPERTIES_DATA.map((prop) => {
                const isSelected = selectedProperty.id === prop.id;
                return (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => setSelectedProperty(prop)}
                    style={{ left: `${prop.coordinates.x}%`, top: `${prop.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1.5 rounded-full font-mono text-xs font-black transition-all cursor-pointer shadow-xl ${
                      isSelected
                        ? "bg-[#E87512] text-black ring-4 ring-[#E87512]/40 scale-110"
                        : "bg-black/90 text-white border border-white/20 hover:border-[#E87512]"
                    }`}
                  >
                    ${(prop.totalPrice / 1000).toFixed(0)}k MXN
                  </button>
                );
              })}
            </div>

            {/* Bottom Floating Property Card */}
            <div className="absolute bottom-20 left-4 right-4 z-20">
              <div
                onClick={() => setCurrentScreen("detail")}
                className="p-3.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-[#E87512]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-0.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#E87512] font-bold uppercase">
                      {selectedProperty.category}
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-400">
                      ${selectedProperty.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white truncate">{selectedProperty.name}</h5>
                  <p className="text-[10px] text-gray-400 truncate">{selectedProperty.location}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#E87512] flex-shrink-0" />
              </div>
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 4: PROPERTY DETAIL & 3D TOUR */}
        {/* ========================================================================= */}
        {currentScreen === "detail" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-none text-left">
              {/* Top Hero Image with Back Button and 3D Tour Badge */}
              <div className="w-full h-64 relative bg-black">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-black/60" />

                {/* Top Nav Buttons */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("home")}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(selectedProperty.id, e)}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-[#E87512]"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(selectedProperty.id) ? "fill-[#E87512] text-[#E87512]" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3D Tour Badge Floating */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-[#FAE3D1] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E87512]" />
                    <span>Recorrido 3D & Satelital Disponible</span>
                  </span>
                </div>
              </div>

              {/* Body Details */}
              <div className="px-4 py-3 space-y-4">
                {/* Title & Price */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#E87512] font-black uppercase">
                      {selectedProperty.zone}
                    </span>
                    <span className="text-base font-mono font-black text-[#E87512]">
                      ${selectedProperty.totalPrice.toLocaleString()} MXN
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white font-sans">{selectedProperty.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E87512]" />
                    <span>{selectedProperty.location}</span>
                  </p>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedProperty.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2 text-xs"
                    >
                      <span className="text-base">{feat.icon}</span>
                      <span className="text-gray-200 text-[11px] font-medium">{feat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Financing Box */}
                <div className="p-3.5 rounded-2xl bg-[#17100A] border border-[#E87512]/40 space-y-2 text-xs font-mono">
                  <span className="text-[10px] text-[#E87512] font-bold uppercase block">
                    Cotización Directa Open House
                  </span>
                  <div className="flex justify-between text-gray-300">
                    <span>Enganche ({selectedProperty.downPaymentPercent}%):</span>
                    <span className="text-white font-bold">${downPaymentAmt.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between text-[#FAE3D1]">
                    <span>Mensualidad ({selectedProperty.monthlyMonths} MSI):</span>
                    <span className="font-black text-sm text-[#E87512]">
                      ${monthlyPay.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} MXN
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Descripción del Lote</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedProperty.description}</p>
                </div>

                {/* Assigned Advisor card */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#E87512] text-black font-black flex items-center justify-center text-xs">
                      JT
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Jessica Torre</h5>
                      <span className="text-[10px] text-[#FAE3D1]/80 font-mono">Asesora Senior (VEN-JESS-101)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("chat")}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-[#E87512] hover:text-black transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Button */}
            <div className="p-4 bg-[#0C0C10] border-t border-white/10">
              <button
                type="button"
                onClick={() => setCurrentScreen("booking")}
                className="w-full py-3.5 rounded-2xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,117,18,0.5)] transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Agendar Cita / Recorrido</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 5: SCHEDULE BOOKING (CALENDAR & HOURS MODAL) */}
        {/* ========================================================================= */}
        {currentScreen === "booking" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-4 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen("detail")}
                    className="p-1 rounded-lg text-gray-400 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-sm font-bold text-white font-sans">Agendar Cita</h3>
                </div>
                <span className="text-[10px] font-mono text-[#E87512] font-bold">Open House Yucatán</span>
              </div>

              {bookingConfirmed ? (
                <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/80 to-[#0F1C12] border border-emerald-500/50 space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-white">¡Cita Agendada con Éxito!</h4>
                    <p className="text-xs text-emerald-300">
                      Te esperamos el <strong>24 de Septiembre a las {selectedTimeSlot}</strong> con Jessica Torre.
                    </p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <a
                      href={`https://api.whatsapp.com/send?phone=5219992920999&text=${encodeURIComponent(
                        `Hola Jessica, confirmo mi cita para el lote ${selectedProperty.name} el día 24 de Septiembre a las ${selectedTimeSlot}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirmar por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingConfirmed(false);
                        setCurrentScreen("home");
                      }}
                      className="w-full py-2 text-xs text-gray-400 hover:text-white font-mono"
                    >
                      Volver al Inicio
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Property Summary */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                    <img
                      src={selectedProperty.image}
                      alt={selectedProperty.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="truncate">
                      <h5 className="text-xs font-bold text-white truncate">{selectedProperty.name}</h5>
                      <p className="text-[10px] text-[#E87512] font-mono">{selectedProperty.location}</p>
                    </div>
                  </div>

                  {/* Visit Mode Switcher */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-gray-300 font-bold">Modalidad:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBookingMode("meet")}
                        className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          bookingMode === "meet"
                            ? "bg-[#E87512]/20 border-[#E87512] text-white"
                            : "bg-white/5 border-white/10 text-gray-400"
                        }`}
                      >
                        <span className="text-base">📹</span>
                        <span>Google Meet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingMode("terreno")}
                        className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          bookingMode === "terreno"
                            ? "bg-[#E87512]/20 border-[#E87512] text-white"
                            : "bg-white/5 border-white/10 text-gray-400"
                        }`}
                      >
                        <span className="text-base">📍</span>
                        <span>Visita a Terreno</span>
                      </button>
                    </div>
                  </div>

                  {/* Month Calendar Picker */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">Septiembre 2026</span>
                      <span className="text-[#E87512]">Días disponibles</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
                      {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
                        <span key={idx} className="text-[10px] text-gray-500 py-1">
                          {d}
                        </span>
                      ))}
                      {[20, 21, 22, 23, 24, 25, 26].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDateDay(day)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedDateDay === day
                              ? "bg-[#E87512] text-black font-black shadow-md"
                              : "bg-white/[0.04] text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-gray-300 font-bold">Horario Disponible:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["10:00 AM", "11:30 AM", "04:00 PM", "05:30 PM"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedTimeSlot === slot
                              ? "bg-[#E87512] text-black font-black"
                              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(true)}
                      className="w-full py-3.5 rounded-2xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,117,18,0.5)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Cita</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Navigation */}
            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 6: DIRECT CHAT WITH ADVISOR */}
        {/* ========================================================================= */}
        {currentScreen === "chat" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            {/* Top Chat Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-[#111116]">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentScreen("home")}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#E87512] text-black font-black flex items-center justify-center text-xs">
                    JT
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#111116]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Jessica Torre</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">En línea • Asesora Open House</span>
                </div>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=5219992920999"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-left scrollbar-none">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#E87512] text-black font-medium rounded-tr-none"
                        : "bg-[#1C1C24] text-gray-200 border border-white/10 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-[#111116] flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje a Jessica..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white outline-none focus:border-[#E87512]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#E87512] text-black font-bold flex items-center justify-center cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 7: ADD PROPERTY / VALUATIONS */}
        {/* ========================================================================= */}
        {currentScreen === "add_property" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white font-sans">Valuación & Venta</h3>
                <span className="text-[10px] font-mono text-[#E87512] font-bold">Paso 1 de 2</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-gray-300">Título / Tipo de Inmueble:</label>
                  <input
                    type="text"
                    placeholder="Ej. Terreno en Mérida Norte"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-gray-300">Metros Cuadrados (m²):</label>
                    <input
                      type="number"
                      placeholder="Ej. 400"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-300">Precio Estimado:</label>
                    <input
                      type="text"
                      placeholder="$ MXN"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300">Dirección o Municipio en Yucatán:</label>
                  <input
                    type="text"
                    placeholder="Ej. Telchac Puerto / Mérida"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300">Fotos del Inmueble:</label>
                  <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#E87512] flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer transition-colors">
                    <Camera className="w-6 h-6 text-[#E87512]" />
                    <span className="text-[11px]">Subir fotos desde la galería</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert("¡Solicitud de valuación enviada al equipo pericial de Open House Yucatán!");
                    setCurrentScreen("home");
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#E87512] text-black font-bold uppercase tracking-wider text-xs shadow-lg mt-2 cursor-pointer"
                >
                  Enviar para Valuación
                </button>
              </div>
            </div>

            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* APP SCREEN 8: PROFILE / ASESORES */}
        {/* ========================================================================= */}
        {currentScreen === "profile" && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#0C0C10] text-white">
            <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-4 text-left">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C130C] to-[#120E15] border border-[#E87512]/40 text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#E87512] text-black font-black text-xl flex items-center justify-center mx-auto shadow-md">
                  EC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Eduardo Cáceres</h4>
                  <span className="text-[10px] text-[#FAE3D1]/80 font-mono">Titular • Open House Yucatán</span>
                </div>
              </div>

              {/* Menu Options */}
              <div className="space-y-2 text-xs font-mono">
                <div
                  onClick={() => setCurrentScreen("booking")}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#E87512]/40 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#E87512]" />
                    <span>Mis Citas Programadas</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E87512]/20 text-[#E87512] text-[10px] font-bold">1 Activa</span>
                </div>

                <div
                  onClick={() => setCurrentScreen("home")}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#E87512]/40 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E87512]" />
                    <span>Lotes Guardados</span>
                  </span>
                  <span className="text-gray-400">{favorites.length}</span>
                </div>

                <div
                  onClick={() => setCurrentScreen("chat")}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#E87512]/40 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#E87512]" />
                    <span>Asesora: Jessica Torre</span>
                  </span>
                  <span className="text-emerald-400 font-bold text-[10px]">Online</span>
                </div>
              </div>
            </div>

            <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Bottom Navigation Bar styled to match Orelax / Open House
function BottomNavBar({
  currentScreen,
  setCurrentScreen,
}: {
  currentScreen: AppScreen;
  setCurrentScreen: (s: AppScreen) => void;
}) {
  return (
    <div className="w-full px-6 py-3 bg-[#0B0B0F]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-between z-30">
      <button
        type="button"
        onClick={() => setCurrentScreen("home")}
        className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
          currentScreen === "home" ? "text-[#E87512]" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span className="text-[9px] font-mono">Inicio</span>
      </button>

      <button
        type="button"
        onClick={() => setCurrentScreen("map")}
        className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
          currentScreen === "map" ? "text-[#E87512]" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-[9px] font-mono">Mapa</span>
      </button>

      <button
        type="button"
        onClick={() => setCurrentScreen("add_property")}
        className="w-10 h-10 -mt-5 rounded-full bg-[#E87512] text-black font-black flex items-center justify-center shadow-[0_0_15px_rgba(232,117,18,0.5)] transition-transform hover:scale-105 cursor-pointer"
        title="Valuación / Publicar Lote"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => setCurrentScreen("chat")}
        className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
          currentScreen === "chat" ? "text-[#E87512]" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-[9px] font-mono">Chat</span>
      </button>

      <button
        type="button"
        onClick={() => setCurrentScreen("profile")}
        className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
          currentScreen === "profile" ? "text-[#E87512]" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <Users className="w-4 h-4" />
        <span className="text-[9px] font-mono">Perfil</span>
      </button>
    </div>
  );
}
