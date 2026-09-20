"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Share2,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  CreditCard,
  Building2,
  Layers,
  Phone,
  Mail,
  Check,
  Copy,
  MessageSquare,
  TrendingDown,
  Plus,
  Trash2,
} from "../../lib/icons";

export interface LotItem {
  id: string;
  name: string;
  development: string;
  location: string;
  areaM2: number;
  pricePerM2: number;
  totalPrice: number;
  downPaymentPercent: number; // e.g. 10%, 15%, 20%
  monthlyInstallmentsMonths: number; // e.g. 12, 24, 36, 48
  status: "disponible" | "apartado" | "vendido";
  highlight: string;
  propertyType: "Terreno" | "Casa" | "Departamento" | "Lote de Playa";
  image: string;
  badge: string;
  features: string[];
}

export const OPEN_HOUSE_LOTS: LotItem[] = [
  {
    id: "LOT-TELCHAC-01",
    name: "Lote Costa Esmeralda • Telchac Beach",
    development: "Costa Esmeralda Residencial",
    location: "Telchac Puerto, Yucatán (a 4 min de la playa)",
    areaM2: 350,
    pricePerM2: 842.85,
    totalPrice: 295000,
    downPaymentPercent: 10,
    monthlyInstallmentsMonths: 36,
    status: "disponible",
    highlight: "Alta Plusvalía • Acceso a Club de Playa • Energía Eléctrica Subterránea",
    propertyType: "Lote de Playa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    badge: "Playa & Inversión",
    features: ["Club de playa exclusivo", "Calles pavimentadas", "Certeza jurídica 100%", "Sin revisión de buró"],
  },
  {
    id: "LOT-DZIDZ-04",
    name: "Lote Residencial Dzidzantún Oasis",
    development: "Dzidzantún Oasis Country Club",
    location: "Dzidzantún, Yucatán (a 12 min de Santa Clara)",
    areaM2: 450,
    pricePerM2: 440,
    totalPrice: 198000,
    downPaymentPercent: 10,
    monthlyInstallmentsMonths: 48,
    status: "disponible",
    highlight: "Lote de Inversión • Título de Propiedad Privada • Sin Intereses",
    propertyType: "Terreno",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    badge: "Inversión Patrimonial",
    features: ["Propiedad privada con escritura", "Áreas verdes & ciclovía", "Planes hasta 48 meses", "Mantenimiento incluido 1 año"],
  },
  {
    id: "LOT-HUNUCMA-12",
    name: "Lote Campestre Hunucmá Verde",
    development: "Corredor Industrial & Turístico Hunucmá",
    location: "Hunucmá / Corredor Sisal, Yucatán",
    areaM2: 600,
    pricePerM2: 575,
    totalPrice: 345000,
    downPaymentPercent: 15,
    monthlyInstallmentsMonths: 24,
    status: "apartado",
    highlight: "Cerca de Puerto Sisal • Zona de Expansión Industrial Cervecería",
    propertyType: "Terreno",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    badge: "Corredor Sisal",
    features: ["Acceso a pie de carretera", "Pozo de agua sustentable", "Crecimiento proyectado 22% anual", "Factibilidad de servicios"],
  },
  {
    id: "LOT-MERIDA-08",
    name: "Macro-Lote Residencial Mérida Norte",
    development: "Chicxulub Pueblo - Conkal Premium",
    location: "Conkal - Chicxulub Pueblo, Mérida Norte",
    areaM2: 1200,
    pricePerM2: 741.66,
    totalPrice: 890000,
    downPaymentPercent: 20,
    monthlyInstallmentsMonths: 24,
    status: "disponible",
    highlight: "Zona Premium Residencial • A 15 min de Altabrisa y Cabo Norte",
    propertyType: "Terreno",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    badge: "Residencial Norte",
    features: ["Seguridad 24/7 en privada", "Casa club con alberca", "Barda perimetral", "Listo para construir"],
  },
];

export const SALES_ADVISORS = [
  {
    id: "adv_jess",
    name: "Jessica Torre",
    code: "VEN-JESS-101",
    phone: "+52 999 456 7890",
    email: "jessica.torre@openhouseyucatan.com",
    role: "Asesora Senior & Coordinadora Comercial",
    activeDeals: 8,
    commissionRate: "5.0%",
    avatar: "JT",
  },
  {
    id: "adv_carlos",
    name: "Carlos Mendoza",
    code: "VEN-CARLOS-202",
    phone: "+52 999 876 5432",
    email: "carlos.mendoza@openhouseyucatan.com",
    role: "Especialista en Lotes de Playa y Telchac",
    activeDeals: 5,
    commissionRate: "4.5%",
    avatar: "CM",
  },
  {
    id: "adv_farid",
    name: "Farid Abdul",
    code: "VEN-FARID-303",
    phone: "+52 999 321 0987",
    email: "farid.abdul@openhouseyucatan.com",
    role: "Asesor de Inversión Patrimonial Mérida",
    activeDeals: 6,
    commissionRate: "4.5%",
    avatar: "FA",
  },
];

interface AppointmentRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  time: string;
  visitType: "meet" | "terreno";
  advisorName: string;
  lotName: string;
  status: "confirmada" | "pendiente" | "en_recorrido";
}

export default function OpenHousePropTechDemo({ isStandalone = false }: { isStandalone?: boolean }) {
  const [activeModule, setActiveModule] = useState<"catalogo" | "agendar" | "calendario" | "vendedores" | "finanzas" | "tasacion">("catalogo");
  
  // Selected Lot Simulator State
  const [selectedLot, setSelectedLot] = useState<LotItem>(OPEN_HOUSE_LOTS[0]);
  const [downPaymentCustom, setDownPaymentCustom] = useState<number>(10);
  const [customMonths, setCustomMonths] = useState<number>(36);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Financial Control State for Open House Yucatán
  const [financialFilter, setFinancialFilter] = useState<"todos" | "ingreso" | "gasto" | "comision">("todos");
  const [financialRecords, setFinancialRecords] = useState([
    {
      id: "FIN-OH-101",
      type: "ingreso",
      concept: "Apartado 10% Lote Costa Esmeralda (Telchac Beach)",
      category: "Venta de Lote",
      amount: 29500,
      date: "2026-09-18",
      advisor: "Jessica Torre (VEN-JESS-101)",
      client: "Eduardo Cáceres",
      status: "cobrado",
    },
    {
      id: "FIN-OH-102",
      type: "ingreso",
      concept: "Enganche 20% Macro-Lote Residencial Conkal Mérida",
      category: "Venta de Lote",
      amount: 178000,
      date: "2026-09-15",
      advisor: "Jessica Torre (VEN-JESS-101)",
      client: "Arq. Fernando Garza",
      status: "cobrado",
    },
    {
      id: "FIN-OH-103",
      type: "ingreso",
      concept: "Apartado 10% Lote Dzidzantún Oasis",
      category: "Venta de Lote",
      amount: 19800,
      date: "2026-09-12",
      advisor: "Carlos Mendoza (VEN-CARLOS-202)",
      client: "Lic. Roberto Medina",
      status: "cobrado",
    },
    {
      id: "FIN-OH-104",
      type: "comision",
      concept: "Comisión Asesor (5.5% sobre Enganche Conkal)",
      category: "Comisión de Venta",
      amount: 9790,
      date: "2026-09-16",
      advisor: "Jessica Torre (VEN-JESS-101)",
      client: "Jessica Torre",
      status: "pagado",
    },
    {
      id: "FIN-OH-105",
      type: "comision",
      concept: "Comisión Asesor (4.5% sobre Apartado Dzidzantún)",
      category: "Comisión de Venta",
      amount: 891,
      date: "2026-09-13",
      advisor: "Carlos Mendoza (VEN-CARLOS-202)",
      client: "Carlos Mendoza",
      status: "pagado",
    },
    {
      id: "FIN-OH-106",
      type: "gasto",
      concept: "Campaña Publicitaria Meta / Facebook Ads (Terrenos Yucatán)",
      category: "Marketing Digital",
      amount: 14500,
      date: "2026-09-10",
      advisor: "Open House Mkt",
      client: "Meta Business",
      status: "pagado",
    },
    {
      id: "FIN-OH-107",
      type: "gasto",
      concept: "Renta de Oficina & Servicios Col. García Ginerés Mérida",
      category: "Gasto Operativo",
      amount: 18000,
      date: "2026-09-01",
      advisor: "Administración",
      client: "Inmobiliaria Peninsular",
      status: "pagado",
    },
  ]);

  // Appointment Form State
  const [clientName, setClientName] = useState("Eduardo Cáceres");
  const [clientPhone, setClientPhone] = useState("+52 999 292 0999");
  const [clientEmail, setClientEmail] = useState("eduardo@openhouseyucatan.com");
  const [selectedDate, setSelectedDate] = useState("2026-09-24");
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [visitType, setVisitType] = useState<"meet" | "terreno">("meet");
  const [selectedAdvisor, setSelectedAdvisor] = useState(SALES_ADVISORS[0].name + " (" + SALES_ADVISORS[0].code + ")");
  const [appointmentNotes, setAppointmentNotes] = useState("Interesado en lote de inversión con financiamiento directo y plusvalía garantizada.");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState<AppointmentRecord | null>(null);

  // Valuation Form State
  const [valName, setValName] = useState("");
  const [valPhone, setValPhone] = useState("");
  const [valEmail, setValEmail] = useState("");
  const [valType, setValType] = useState("Terreno");
  const [valLocation, setValLocation] = useState("Mérida / Costa Yucatán");
  const [valSuccess, setValSuccess] = useState(false);

  // Financial Calculations for Lot Simulator
  const downPaymentAmount = (selectedLot.totalPrice * downPaymentCustom) / 100;
  const remainingBalance = selectedLot.totalPrice - downPaymentAmount;
  const monthlyPayment = customMonths > 0 ? remainingBalance / customMonths : 0;

  // Real-time appointment list
  const [scheduledAppointments, setScheduledAppointments] = useState<AppointmentRecord[]>([
    {
      id: "APT-OH-101",
      clientName: "Eduardo Cáceres",
      clientPhone: "+52 999 292 0999",
      clientEmail: "eduardo@openhouseyucatan.com",
      date: "2026-09-22",
      time: "11:00 AM",
      visitType: "meet",
      advisorName: "Jessica Torre (VEN-JESS-101)",
      lotName: "Lote Costa Esmeralda • Telchac Beach",
      status: "confirmada",
    },
    {
      id: "APT-OH-102",
      clientName: "Arq. Fernando Garza",
      clientPhone: "+52 999 812 3456",
      clientEmail: "fernando.garza@desarrollos.mx",
      date: "2026-09-24",
      time: "04:30 PM",
      visitType: "terreno",
      advisorName: "Jessica Torre (VEN-JESS-101)",
      lotName: "Lote Costa Esmeralda • Telchac Beach",
      status: "confirmada",
    },
    {
      id: "APT-OH-103",
      clientName: "Lic. Roberto Medina",
      clientPhone: "+52 999 555 1234",
      clientEmail: "rmedina@peninsular.com",
      date: "2026-09-28",
      time: "12:00 PM",
      visitType: "meet",
      advisorName: "Carlos Mendoza (VEN-CARLOS-202)",
      lotName: "Lote Residencial Dzidzantún Oasis",
      status: "pendiente",
    },
  ]);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: AppointmentRecord = {
      id: `APT-OH-${Date.now().toString().slice(-4)}`,
      clientName,
      clientPhone,
      clientEmail,
      date: selectedDate,
      time: selectedTime,
      visitType,
      advisorName: selectedAdvisor,
      lotName: selectedLot.name,
      status: "confirmada",
    };

    setScheduledAppointments([newApt, ...scheduledAppointments]);
    setLatestAppointment(newApt);
    setBookingSuccess(true);
  };

  const handleCopyQuote = () => {
    const text = `COTIZACIÓN INMOBILIARIA • OPEN HOUSE YUCATÁN\nDesarrollo: ${selectedLot.name}\nUbicación: ${selectedLot.location}\nSuperficie: ${selectedLot.areaM2} m²\nPrecio Total: $${selectedLot.totalPrice.toLocaleString()} MXN\nEnganche (${downPaymentCustom}%): $${downPaymentAmount.toLocaleString()} MXN\nPlazo: ${customMonths} meses sin intereses\nMensualidad Fija: $${monthlyPayment.toFixed(2)} MXN\nAsesora: Jessica Torre (VEN-JESS-101)\nWhatsApp: +52 999 292 0999\nWeb: www.openhouseyucatan.com`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValSuccess(true);
    setTimeout(() => setValSuccess(false), 5000);
  };

  // WhatsApp formatted string generator
  const getWhatsAppBookingLink = () => {
    const msg = encodeURIComponent(
      `¡Hola Open House Yucatán! Me gustaría confirmar mi cita:\n\n` +
      `👤 Cliente: ${clientName}\n` +
      `📅 Fecha: ${selectedDate} a las ${selectedTime}\n` +
      `📍 Modalidad: ${visitType === "meet" ? "Videollamada Google Meet" : "Visita Física al Desarrollo"}\n` +
      `🏡 Inmueble de Interés: ${selectedLot.name}\n` +
      `👩‍💼 Asesora: ${selectedAdvisor}\n\n` +
      `Quedo en espera del enlace/ubicación exacta.`
    );
    return `https://api.whatsapp.com/send?phone=5219992920999&text=${msg}`;
  };

  // Google Calendar URL generator
  const getGoogleCalendarLink = () => {
    const startIso = selectedDate.replace(/-/g, "") + "T" + selectedTime.replace(":", "") + "00";
    const title = encodeURIComponent(`Cita Open House Yucatán: ${selectedLot.name}`);
    const details = encodeURIComponent(
      `Cita agendada para ${clientName} con el asesor ${selectedAdvisor}.\nModalidad: ${
        visitType === "meet" ? "Videollamada Google Meet" : "Recorrido en Terreno"
      }\nInmueble: ${selectedLot.name} (${selectedLot.location})\nTeléfono: ${clientPhone}\nNotas: ${appointmentNotes}`
    );
    const loc = encodeURIComponent(visitType === "meet" ? "Google Meet" : selectedLot.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${startIso}&details=${details}&location=${loc}`;
  };

  return (
    <div className="space-y-6 text-left font-sans text-gray-100">
      {/* Top Header / Brand Hero with Official Colors (#E87512 and #FAE3D1) */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#1A110B] via-[#0E0E12] to-[#1F130B] border border-[#E87512]/40 shadow-[0_0_50px_rgba(232,117,18,0.2)] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87512]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FAE3D1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#E87512] text-black text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shadow-[0_0_15px_rgba(232,117,18,0.5)]">
                ⚡ PROPTECH APP • OPEN HOUSE YUCATÁN
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAE3D1]/15 border border-[#FAE3D1]/30 text-[#FAE3D1] text-[10px] sm:text-xs font-mono font-bold uppercase">
                Titular: Eduardo Cáceres
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Asesora: Jessica Torre (VEN-JESS-101)
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
                {/* Official Logo Display */}
                <img
                  src="https://static.tokkobroker.com/tfw_images/1631_Open%20House%20Yucat%C3%A1n/SIN%20FONDO%20OPEN%20HOUSE%20YUCATAN.png"
                  alt="Open House Yucatán Logo"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-mono tracking-tight uppercase">
                  OPEN HOUSE YUCATÁN <span className="text-[#E87512]">•</span> CITAS & TERRENOS
                </h1>
                <p className="text-xs sm:text-sm text-[#FAE3D1]/80 font-mono">
                  Tu Propiedad Está en Open House Yucatán • Asesoría Inmobiliaria de Vanguardia
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
              Plataforma de alta conversión con <strong>agendamiento automatizado de citas y recorridos</strong>, cotizador financiero directo sin buró para terrenos en Yucatán, calendario en tiempo real y portal para asesores de venta.
            </p>
          </div>

          {/* Quick Action Links & Official Contact info */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
            <a
              href="https://api.whatsapp.com/send?phone=5219992920999&text=Hola%20Open%20House%20Yucat%C3%A1n,%20me%20gustar%C3%ADa%20agendar%20una%20visita"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(232,117,18,0.6)] transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Directo (+52 999 292 0999)</span>
            </a>

            <a
              href="https://www.openhouseyucatan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-[#FAE3D1]/30 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Ver openhouseyucatan.com</span>
              <ExternalLink className="w-4 h-4 text-[#E87512]" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Modules Tabs styled with #E87512 */}
      <div className="flex items-center gap-2 border-b border-[#E87512]/20 pb-3 overflow-x-auto scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveModule("catalogo")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "catalogo"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>1. Catálogo & Cotizador de Lotes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("agendar")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "agendar"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>2. Agendar Cita / Recorrido</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("calendario")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "calendario"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>3. Calendario en Vivo ({scheduledAppointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("vendedores")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "vendedores"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>4. Red de Asesores & Comisiones</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("finanzas")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "finanzas"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>5. Control Financiero (Ingresos & Gastos)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("tasacion")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeModule === "tasacion"
              ? "bg-[#E87512] text-black font-black shadow-[0_0_20px_rgba(232,117,18,0.5)]"
              : "bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-[#E87512]/40"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>6. Valuaciones & Vende Tu Inmueble</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: CATALOG & REAL-TIME LAND SIMULATOR */}
      {/* ========================================================================= */}
      {activeModule === "catalogo" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Property Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E87512]" />
                <span>Terrenos y Desarrollos Seleccionados en Yucatán</span>
              </h3>
              <span className="text-[11px] font-mono text-[#FAE3D1]/70">
                {OPEN_HOUSE_LOTS.length} Opciones Disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {OPEN_HOUSE_LOTS.map((lot) => {
                const isSelected = selectedLot.id === lot.id;
                return (
                  <div
                    key={lot.id}
                    onClick={() => {
                      setSelectedLot(lot);
                      setDownPaymentCustom(lot.downPaymentPercent);
                      setCustomMonths(lot.monthlyInstallmentsMonths);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-[#1B120C] border-[#E87512] shadow-[0_0_30px_rgba(232,117,18,0.25)] ring-1 ring-[#E87512]"
                        : "bg-[#0E0E12] border-white/10 hover:border-[#E87512]/40 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image Thumbnail */}
                      <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden relative flex-shrink-0 bg-black/40">
                        <img
                          src={lot.image}
                          alt={lot.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-mono font-bold text-[#FAE3D1]">
                          {lot.badge}
                        </span>
                      </div>

                      {/* Info & Price */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <h4 className="text-sm font-mono font-black text-white">{lot.name}</h4>
                            <p className="text-[11px] font-mono text-[#FAE3D1]/80">{lot.location}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-base font-mono font-black text-[#E87512] block">
                              ${lot.totalPrice.toLocaleString()} MXN
                            </span>
                            <span className="text-[10px] font-mono text-gray-400">
                              {lot.areaM2} m² • ${(lot.totalPrice / lot.areaM2).toFixed(0)} MXN/m²
                            </span>
                          </div>
                        </div>

                        {/* Features chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {lot.features.map((feat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono">
                          <span className="text-gray-400">
                            Enganche desde <strong className="text-white">${((lot.totalPrice * lot.downPaymentPercent) / 100).toLocaleString()} MXN</strong>
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                              lot.status === "disponible"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : lot.status === "apartado"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {lot.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Financing Simulator */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#110D09] border border-[#E87512]/50 space-y-5 shadow-[0_0_40px_rgba(232,117,18,0.2)]">
            <div className="border-b border-[#E87512]/20 pb-3">
              <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider block">
                SIMULADOR DE FINANCIAMIENTO DIRECTO OPEN HOUSE
              </span>
              <h4 className="text-lg font-mono font-black text-white mt-1">
                {selectedLot.name}
              </h4>
              <p className="text-xs text-[#FAE3D1]/80 font-mono">{selectedLot.location}</p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Price breakdown */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Precio Total de Lista:</span>
                  <span className="text-white font-bold">${selectedLot.totalPrice.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between text-[#FAE3D1]">
                  <span>Superficie Total:</span>
                  <span className="font-bold">{selectedLot.areaM2} m²</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Precio por m²:</span>
                  <span className="font-bold">${(selectedLot.totalPrice / selectedLot.areaM2).toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between text-[#E87512] pt-2 border-t border-white/10">
                  <span>Enganche Requerido ({downPaymentCustom}%):</span>
                  <span className="font-black text-sm">${downPaymentAmount.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Saldo Restante a Financiar:</span>
                  <span className="font-bold">${remainingBalance.toLocaleString()} MXN</span>
                </div>
              </div>

              {/* Down payment selector buttons */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#FAE3D1] font-bold flex justify-between">
                  <span>Porcentaje de Enganche:</span>
                  <span className="text-[#E87512]">{downPaymentCustom}%</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20, 30].map((dp) => (
                    <button
                      key={dp}
                      type="button"
                      onClick={() => setDownPaymentCustom(dp)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        downPaymentCustom === dp
                          ? "bg-[#E87512] text-black font-black shadow-[0_0_15px_rgba(232,117,18,0.5)]"
                          : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {dp}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Term Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#FAE3D1] font-bold flex justify-between">
                  <span>Plazo de Financiamiento (Sin Intereses):</span>
                  <span className="text-[#E87512] font-black">{customMonths} Meses</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCustomMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        customMonths === m
                          ? "bg-[#E87512] text-black font-black shadow-[0_0_15px_rgba(232,117,18,0.5)]"
                          : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {m} Meses
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Monthly Payment Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E87512]/20 via-[#1A110B] to-[#FAE3D1]/15 border border-[#E87512]/60 text-center space-y-1">
                <span className="text-[10px] text-[#FAE3D1] uppercase tracking-wider block font-bold">
                  Mensualidad Fija Sin Intereses
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#E87512] block">
                  ${monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} MXN
                </span>
                <span className="text-[10px] text-gray-300 block">
                  Sin revisión de buró de crédito • Certeza jurídica y escrituración inmediata
                </span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveModule("agendar")}
                  className="w-full py-3.5 rounded-xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,117,18,0.5)] transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Agendar Cita / Apartar este Terreno</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedQuote ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">¡Cotización Copiada al Portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#E87512]" />
                      <span>Copiar Ficha de Cotización para WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: BOOKING / AGENDAR CITA & RECORRIDO */}
      {/* ========================================================================= */}
      {activeModule === "agendar" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E12] border border-[#E87512]/30 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider">
                MÓDULO DE AGENDAMIENTO AUTOMATIZADO • 3RA APP MULTIPLATAFORMA
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                Agendar Demostración, Meet o Visita en Terreno
              </h3>
              <p className="text-xs text-[#FAE3D1]/80 font-mono">
                Coordinación directa con la red comercial de <strong>Open House Yucatán</strong>
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#E87512]/20 border border-[#E87512]/40 text-[#E87512] text-xs font-mono font-bold">
              ⚡ Sincronización Automática
            </span>
          </div>

          {bookingSuccess && latestAppointment && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-[#141F14] border border-emerald-500/50 text-emerald-200 font-mono text-xs space-y-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white uppercase">
                    ¡Cita Agendada Exitosamente con Open House Yucatán!
                  </h4>
                  <p className="text-[11px] text-emerald-300/90">
                    Se registró la cita #{latestAppointment.id} para <strong>{latestAppointment.clientName}</strong> el día <strong>{latestAppointment.date} a las {latestAppointment.time}</strong> con <strong>{latestAppointment.advisorName}</strong>.
                  </p>
                </div>
              </div>

              {/* Quick Action buttons for the booked appointment */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase text-[11px] flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Confirmación por WhatsApp al Asesor</span>
                </a>

                <a
                  href={getGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold uppercase text-[11px] flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E87512]" />
                  <span>Guardar en Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModule("calendario")}
                  className="px-4 py-2 rounded-xl bg-[#E87512]/20 hover:bg-[#E87512]/30 text-[#E87512] border border-[#E87512]/40 font-bold uppercase text-[11px] flex items-center gap-2 cursor-pointer"
                >
                  <span>Ver en Calendario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleBookVisit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Nombre del Cliente / Inversionista:</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Teléfono / WhatsApp:</label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Correo Electrónico:</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Asesor Comercial Asignado:</label>
              <select
                value={selectedAdvisor}
                onChange={(e) => setSelectedAdvisor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
              >
                {SALES_ADVISORS.map((adv) => (
                  <option key={adv.id} value={`${adv.name} (${adv.code})`}>
                    {adv.name} ({adv.code}) - {adv.role}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Fecha de Cita:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Hora de Cita:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                required
              />
            </div>

            {/* Inmueble seleccionado */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-gray-300 font-bold">Desarrollo / Lote de Interés:</label>
              <select
                value={selectedLot.id}
                onChange={(e) => {
                  const found = OPEN_HOUSE_LOTS.find((l) => l.id === e.target.value);
                  if (found) setSelectedLot(found);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
              >
                {OPEN_HOUSE_LOTS.map((lot) => (
                  <option key={lot.id} value={lot.id}>
                    {lot.name} - ${lot.totalPrice.toLocaleString()} MXN ({lot.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Modalidad de la Cita */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-300 font-bold">Modalidad de la Cita:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setVisitType("meet")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    visitType === "meet"
                      ? "bg-[#1F130B] border-[#E87512] text-white shadow-[0_0_20px_rgba(232,117,18,0.3)]"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📹</span>
                    <span className="font-bold text-sm text-white">Videollamada Google Meet</span>
                  </div>
                  <p className="text-[11px] text-[#FAE3D1]/80 mt-1">
                    Presentación digital de master plan, corridas financieras y recorrido 3D en pantalla.
                  </p>
                </div>

                <div
                  onClick={() => setVisitType("terreno")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    visitType === "terreno"
                      ? "bg-[#1F130B] border-[#E87512] text-white shadow-[0_0_20px_rgba(232,117,18,0.3)]"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📍</span>
                    <span className="font-bold text-sm text-white">Visita Física a Terreno / Recorrido</span>
                  </div>
                  <p className="text-[11px] text-[#FAE3D1]/80 mt-1">
                    Recorrido guiado en campo en Telchac, Dzidzantún o Mérida Norte con el asesor.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-gray-300 font-bold">Notas Adicionales o Dudas:</label>
              <textarea
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none transition-colors"
                placeholder="Indica cualquier requerimiento especial para la cita..."
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(232,117,18,0.5)] transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar & Agendar Cita con Open House Yucatán</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: REAL-TIME CALENDAR VIEW */}
      {/* ========================================================================= */}
      {activeModule === "calendario" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E12] border border-[#E87512]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider">
                CALENDARIO COMERCIAL & RECORRIDOS OPEN HOUSE YUCATÁN
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                Agenda de Recorridos & Firmas
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sincronizado en Vivo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scheduledAppointments.map((apt) => (
              <div
                key={apt.id}
                className={`p-5 rounded-2xl border space-y-3 text-xs font-mono transition-all ${
                  apt.id.startsWith("APT-OH-101") || apt.status === "confirmada"
                    ? "bg-[#1B120C] border-[#E87512]/50 shadow-[0_0_20px_rgba(232,117,18,0.15)]"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#E87512] font-black uppercase">
                    {apt.date} • {apt.time}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      apt.visitType === "meet"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {apt.visitType === "meet" ? "📹 Meet" : "📍 Terreno"}
                  </span>
                </div>

                <div>
                  <h5 className="font-bold text-white text-sm">{apt.lotName}</h5>
                  <p className="text-[#FAE3D1]/80 text-[11px] mt-0.5">Cliente: {apt.clientName}</p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1 text-[10px] text-gray-300">
                  <div className="flex justify-between">
                    <span>Asesor:</span>
                    <span className="text-white font-bold">{apt.advisorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contacto:</span>
                    <span className="text-gray-400">{apt.clientPhone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 4: VENDORS & COMMISSIONS PORTAL */}
      {/* ========================================================================= */}
      {activeModule === "vendedores" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E12] border border-[#E87512]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider">
                PORTAL DE FUERZA DE VENTAS & ASESORES ASOCIADOS
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                Red Inmobiliaria Open House Yucatán
              </h3>
            </div>
            <span className="text-xs font-mono text-[#E87512] font-bold px-3 py-1 rounded-full bg-[#E87512]/15 border border-[#E87512]/30">
              Tabulador de Comisiones: 4.5% - 5.5%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SALES_ADVISORS.map((adv) => (
              <div
                key={adv.id}
                className="p-5 rounded-2xl bg-[#14100D] border border-white/10 hover:border-[#E87512]/50 transition-all space-y-3 text-xs font-mono"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#E87512] text-black font-black flex items-center justify-center text-xs">
                      {adv.avatar}
                    </div>
                    <div>
                      <span className="text-[10px] text-[#E87512] font-bold">{adv.code}</span>
                      <h4 className="text-sm font-bold text-white">{adv.name}</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    {adv.commissionRate}
                  </span>
                </div>

                <p className="text-[11px] text-gray-400">{adv.role}</p>

                <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prospectos Activos:</span>
                    <span className="text-white font-bold">{adv.activeDeals} Tratos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">WhatsApp:</span>
                    <span className="text-[#FAE3D1] font-bold">{adv.phone}</span>
                  </div>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?phone=${adv.phone.replace(/[^0-9]/g, "")}&text=Hola%20${encodeURIComponent(
                    adv.name
                  )},%20tengo%20un%20prospecto%20para%20Open%20House`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E87512]" />
                  <span>Contactar Asesor</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5: FINANCIAL CONTROL & COMMISSIONS LEDGER */}
      {/* ========================================================================= */}
      {activeModule === "finanzas" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E12] border border-[#E87512]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider">
                CONTROL FINANCIERO, VENTAS & UTILIDADES • OPEN HOUSE YUCATÁN
              </span>
              <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                Balance Financiero & Registro de Movimientos
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Auditoría en Tiempo Real
            </span>
          </div>

          {/* Financial KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#17110C] border border-[#E87512]/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Ingresos por Ventas / Enganches</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">$227,300 MXN</div>
              <span className="text-[10px] font-mono text-gray-400 block">3 Lotes apartados y enganchados</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#14100D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Comisiones de Vendedores</span>
                <Users className="w-4 h-4 text-[#E87512]" />
              </div>
              <div className="text-2xl font-black font-mono text-[#E87512]">$10,681 MXN</div>
              <span className="text-[10px] font-mono text-gray-400 block">Jessica Torre ($9,790) • Carlos ($891)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#14100D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Gastos Operativos & Mkt</span>
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-black font-mono text-red-400">$32,500 MXN</div>
              <span className="text-[10px] font-mono text-gray-400 block">Oficina García Ginerés & Meta Ads</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1C110A] to-[#0A0A0E] border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Utilidad Neta Open House</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white">$184,119 MXN</div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">81.0% Margen Operativo</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
              {(["todos", "ingreso", "comision", "gasto"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFinancialFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    financialFilter === filter
                      ? "bg-[#E87512] text-black font-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {filter === "todos" ? "Todos los Registros" : filter === "ingreso" ? "Ingresos (Ventas)" : filter === "comision" ? "Comisiones" : "Gastos"}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              Mostrando {financialRecords.filter((r) => financialFilter === "todos" || r.type === financialFilter).length} movimientos
            </span>
          </div>

          {/* Transactions Ledger Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/50">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3.5">Folio / Fecha</th>
                  <th className="p-3.5">Concepto del Movimiento</th>
                  <th className="p-3.5">Categoría</th>
                  <th className="p-3.5">Asesor / Responsable</th>
                  <th className="p-3.5 text-right">Monto (MXN)</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {financialRecords
                  .filter((r) => financialFilter === "todos" || r.type === financialFilter)
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="text-white font-bold block">{rec.id}</span>
                        <span className="text-[10px] text-gray-500">{rec.date}</span>
                      </td>
                      <td className="p-3.5 font-medium text-white">
                        {rec.concept}
                        <span className="text-[10px] text-gray-400 block">Cliente: {rec.client}</span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px]">
                          {rec.category}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-gray-300">
                        {rec.advisor}
                      </td>
                      <td className="p-3.5 text-right font-black whitespace-nowrap">
                        <span
                          className={
                            rec.type === "ingreso"
                              ? "text-emerald-400"
                              : rec.type === "comision"
                              ? "text-[#E87512]"
                              : "text-red-400"
                          }
                        >
                          {rec.type === "ingreso" ? "+" : "-"}${rec.amount.toLocaleString()} MXN
                        </span>
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            rec.status === "cobrado" || rec.status === "pagado"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          ✓ {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 6: VALUATIONS & SELL YOUR PROPERTY */}
      {/* ========================================================================= */}
      {activeModule === "tasacion" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E12] border border-[#E87512]/30 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono text-[#E87512] uppercase font-black tracking-wider">
              VALUACIONES Y PROMOCIÓN DE PROPIEDADES
            </span>
            <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
              ¿Quieres Vender o Valuar tu Inmueble en Yucatán?
            </h3>
            <p className="text-xs text-[#FAE3D1]/80 font-mono">
              En Open House Yucatán realizamos el avalúo comercial y promovemos tu propiedad en nuestra red de inversionistas.
            </p>
          </div>

          {valSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <div>
                <strong>¡Solicitud de Valuación Enviada!</strong>
                <p className="text-[11px] text-emerald-400/90 mt-0.5">
                  Un perito valuador de Open House Yucatán se pondrá en contacto contigo a la brevedad.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleValuationSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Nombre Completo del Propietario:</label>
              <input
                type="text"
                value={valName}
                onChange={(e) => setValName(e.target.value)}
                placeholder="Ej. Eduardo Cáceres"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Teléfono / Celular:</label>
              <input
                type="text"
                value={valPhone}
                onChange={(e) => setValPhone(e.target.value)}
                placeholder="Ej. +52 999 292 0999"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Correo Electrónico:</label>
              <input
                type="email"
                value={valEmail}
                onChange={(e) => setValEmail(e.target.value)}
                placeholder="contacto@openhouseyucatan.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300 font-bold">Tipo de Inmueble:</label>
              <select
                value={valType}
                onChange={(e) => setValType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none"
              >
                <option value="Terreno">Terreno / Lote de Inversión</option>
                <option value="Casa">Casa Residencial</option>
                <option value="Departamento">Departamento / Penthouse</option>
                <option value="Locales">Local Comercial / Bodega</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-gray-300 font-bold">Ubicación y Descripción del Inmueble:</label>
              <textarea
                value={valLocation}
                onChange={(e) => setValLocation(e.target.value)}
                rows={3}
                placeholder="Dirección aproximada, metros cuadrados, servicios disponibles..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#E87512] outline-none"
                required
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#E87512] hover:bg-[#E87512]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(232,117,18,0.5)] transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Solicitar Valuación Profesional Gratuita</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer Branding with Official Address & Tokko Broker style */}
      <div className="p-6 rounded-3xl bg-[#09090C] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-3">
          <img
            src="https://static.tokkobroker.com/tfw_images/1631_Open%20House%20Yucat%C3%A1n/SIN%20FONDO%20OPEN%20HOUSE%20YUCATAN.png"
            alt="Open House Yucatán"
            className="h-7 w-auto object-contain opacity-80"
          />
          <span>Calle 22 No. 201B por 23, Col. García Ginerés, Mérida, Yucatán, C.P. 97070</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#E87512] font-bold">Tel: (999) 292 0999</span>
          <span>•</span>
          <span className="text-gray-300">Oficina: (999) 312 6030</span>
        </div>
      </div>
    </div>
  );
}
