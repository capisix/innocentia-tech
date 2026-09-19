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
} from "../../lib/icons";

interface LotItem {
  id: string;
  name: string;
  location: string;
  areaM2: number;
  totalPrice: number;
  downPaymentPercent: number; // e.g. 10%
  monthlyInstallmentsMonths: number; // e.g. 36
  status: "disponible" | "apartado" | "vendido";
  highlight: string;
  imageTag: string;
}

const SAMPLE_LOTS: LotItem[] = [
  {
    id: "LOT-TELCHAC-01",
    name: "Lote Costa Esmeralda • Telchac Beach",
    location: "Telchac Puerto, Yucatán (a 4 min de la playa)",
    areaM2: 350,
    totalPrice: 295000,
    downPaymentPercent: 10,
    monthlyInstallmentsMonths: 36,
    status: "disponible",
    highlight: "Alta Plusvalía • Acceso a Club de Playa • Energía Eléctrica",
    imageTag: "Costa / Playa",
  },
  {
    id: "LOT-DZIDZ-04",
    name: "Lote Residencial Dzidzantún Oasis",
    location: "Dzidzantún, Yucatán (Cerca de Santa Clara)",
    areaM2: 450,
    totalPrice: 198000,
    downPaymentPercent: 10,
    monthlyInstallmentsMonths: 48,
    status: "disponible",
    highlight: "Lote de Inversión • Título de Propiedad Privada • Sin Buró",
    imageTag: "Inversión Patrimonial",
  },
  {
    id: "LOT-HUNUCMA-12",
    name: "Lote Campestre Hunucmá Verde",
    location: "Hunucmá / Corredor Industrial - Sisal, Yucatán",
    areaM2: 600,
    totalPrice: 345000,
    downPaymentPercent: 15,
    monthlyInstallmentsMonths: 24,
    status: "apartado",
    highlight: "Cerca de Puerto Sisal • Zona de Expansión Industrial y Turística",
    imageTag: "Campestre / Ecoturístico",
  },
  {
    id: "LOT-MERIDA-08",
    name: "Macro-Lote Inversión Mérida Norte",
    location: "Conkal - Chicxulub Pueblo, Mérida Norte",
    areaM2: 1200,
    totalPrice: 890000,
    downPaymentPercent: 20,
    monthlyInstallmentsMonths: 24,
    status: "vendido",
    highlight: "Zona Premium Residencial • 100% Vendido en Fase 1",
    imageTag: "Residencial Norte",
  },
];

const SALES_ADVISORS = [
  {
    id: "adv_jess",
    name: "Jessica Torre",
    code: "VEN-JESS-101",
    phone: "+52 999 456 7890",
    role: "Asesora Senior & Coordinadora Comercial",
    activeDeals: 8,
    commissionRate: "5.0%",
  },
  {
    id: "adv_carlos",
    name: "Carlos Mendoza",
    code: "VEN-CARLOS-202",
    phone: "+52 999 876 5432",
    role: "Asesor Especialista en Lotes de Playa",
    activeDeals: 5,
    commissionRate: "4.5%",
  },
  {
    id: "adv_farid",
    name: "Farid Abdul",
    code: "VEN-FARID-303",
    phone: "+52 999 321 0987",
    role: "Asesor de Inversión Patrimonial",
    activeDeals: 6,
    commissionRate: "4.5%",
  },
];

export default function OpenHousePropTechDemo() {
  const [activeModule, setActiveModule] = useState<"catalogo" | "agendar" | "calendario" | "vendedores">("catalogo");
  
  // Selected Lot Simulator State
  const [selectedLot, setSelectedLot] = useState<LotItem>(SAMPLE_LOTS[0]);
  const [customMonths, setCustomMonths] = useState<number>(36);

  // Appointment Form State
  const [clientName, setClientName] = useState("Eduardo Cáceres");
  const [clientPhone, setClientPhone] = useState("+52 999 123 4567");
  const [clientEmail, setClientEmail] = useState("eduardo@openhouseyucatan.com");
  const [selectedDate, setSelectedDate] = useState("2026-09-22");
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [visitType, setVisitType] = useState<"meet" | "terreno">("meet");
  const [selectedAdvisor, setSelectedAdvisor] = useState("Jessica Torre (VEN-JESS-101)");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Financial Calculations for Lot Simulator
  const downPaymentAmount = (selectedLot.totalPrice * selectedLot.downPaymentPercent) / 100;
  const remainingBalance = selectedLot.totalPrice - downPaymentAmount;
  const monthlyPayment = remainingBalance / customMonths;

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 6000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner: Brand & Specialization */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#00D1FF]/15 via-[#0A0A16] to-[#0077B6]/15 border border-[#00D1FF]/30 shadow-[0_0_50px_rgba(0,209,255,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[#00D1FF] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                ⚡ DEMO INTERACTIVO PROPTECH
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold uppercase">
                Vendedora: Jessica Torre (VEN-JESS-101)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight uppercase">
              OPEN HOUSE YUCATÁN • APP DE TERRENOS & CITAS
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-mono max-w-3xl leading-relaxed">
              Plataforma desarrollada para <strong>Eduardo Cáceres</strong>. Automatización de agendamiento de visitas, cotizador y catálogo de terrenos en Yucatán, calendario en vivo y portal de asesores inmobiliarios.
            </p>
          </div>

          <a
            href="https://www.openhouseyucatan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-[#00D1FF] hover:bg-[#00D1FF]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.5)] transition-all cursor-pointer flex-shrink-0"
          >
            <span>Ir a openhouseyucatan.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Navigation Modules Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveModule("catalogo")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeModule === "catalogo"
              ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>1. Catálogo & Cotizador de Terrenos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("agendar")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeModule === "agendar"
              ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>2. Agendar Visita / Meet</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("calendario")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeModule === "calendario"
              ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>3. Calendario en Tiempo Real</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModule("vendedores")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeModule === "vendedores"
              ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>4. Portal & Comisiones Asesores</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: CATALOG & REAL-TIME LAND SIMULATOR */}
      {/* ========================================================================= */}
      {activeModule === "catalogo" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Lots List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00D1FF]" />
                <span>Terrenos y Lotes de Inversión en Yucatán</span>
              </h3>
              <span className="text-[11px] font-mono text-gray-400">4 desarrollos disponibles</span>
            </div>

            <div className="space-y-3">
              {SAMPLE_LOTS.map((lot) => {
                const isSelected = selectedLot.id === lot.id;
                return (
                  <div
                    key={lot.id}
                    onClick={() => {
                      setSelectedLot(lot);
                      setCustomMonths(lot.monthlyInstallmentsMonths);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_25px_rgba(0,209,255,0.2)]"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-white">{lot.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {lot.imageTag}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-gray-400 mt-0.5">{lot.location}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-base font-mono font-black text-emerald-400 block">
                          ${lot.totalPrice.toLocaleString()} MXN
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {lot.areaM2} m² • ${(lot.totalPrice / lot.areaM2).toFixed(0)} MXN/m²
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 text-[11px] font-mono">
                      <span className="text-gray-300 text-[10px] sm:text-xs">✨ {lot.highlight}</span>
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
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Financing Simulator */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#07070E] border border-[#00D1FF]/40 space-y-5 shadow-[0_0_40px_rgba(0,209,255,0.15)]">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider block">
                SIMULADOR DE FINANCIAMIENTO DIRECTO
              </span>
              <h4 className="text-lg font-mono font-black text-white mt-1">
                {selectedLot.name}
              </h4>
              <p className="text-xs text-gray-400 font-mono">{selectedLot.location}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Precio Total de Contado:</span>
                  <span className="text-white font-bold">${selectedLot.totalPrice.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Enganche Requerido ({selectedLot.downPaymentPercent}%):</span>
                  <span className="font-bold">${downPaymentAmount.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saldo a Financiar:</span>
                  <span className="text-white font-bold">${remainingBalance.toLocaleString()} MXN</span>
                </div>
              </div>

              {/* Monthly Term Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-gray-300 flex justify-between">
                  <span>Plazo de Financiamiento (Sin Intereses):</span>
                  <span className="text-[#00D1FF] font-bold">{customMonths} Meses</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCustomMonths(m)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        customMonths === m
                          ? "bg-[#00D1FF] text-black font-black"
                          : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                      }`}
                    >
                      {m} Meses
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Monthly Payment */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-[#00D1FF]/15 border border-emerald-500/40 text-center space-y-1">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block">
                  Mensualidad Estimada Fija
                </span>
                <span className="text-2xl font-mono font-black text-emerald-400 block">
                  ${monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} MXN
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Sin revisión de buró de crédito • Trato directo
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModule("agendar")}
                className="w-full py-3 rounded-xl bg-[#00D1FF] hover:bg-[#00D1FF]/90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
              >
                <span>Apartar este Terreno / Agendar Cita</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: BOOKING / AGENDAR CITA VISITA */}
      {/* ========================================================================= */}
      {activeModule === "agendar" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#07070E] border border-white/15 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
              MÓDULO DE AGENDAMIENTO AUTOMATIZADO
            </span>
            <h3 className="text-xl font-mono font-black text-white mt-1">
              Agendar Cita de Demostración & Visita a Desarrollos
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Coordinación con la asesora asignada: <strong>Jessica Torre (VEN-JESS-101)</strong>
            </p>
          </div>

          {bookingSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <div>
                <strong>¡Cita Agendada Exitosamente!</strong>
                <p className="text-[11px] text-emerald-400/90 mt-0.5">
                  Se ha enviado la confirmación a {clientEmail} y se sincronizó con el calendario de Jessica Torre. Enlace Meet generado.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleBookVisit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-gray-300">Nombre del Cliente / Inversionista:</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300">Teléfono / WhatsApp:</label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300">Correo Electrónico:</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300">Asesora Comercial Asignada:</label>
              <select
                value={selectedAdvisor}
                onChange={(e) => setSelectedAdvisor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
              >
                <option value="Jessica Torre (VEN-JESS-101)">Jessica Torre (VEN-JESS-101) - Principal</option>
                <option value="Carlos Mendoza (VEN-CARLOS-202)">Carlos Mendoza (VEN-CARLOS-202)</option>
                <option value="Farid Abdul (VEN-FARID-303)">Farid Abdul (VEN-FARID-303)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300">Fecha de Cita:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-300">Hora de Cita:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-[#00D1FF] outline-none"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-300">Modalidad de la Cita:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setVisitType("meet")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    visitType === "meet"
                      ? "bg-[#00D1FF]/15 border-[#00D1FF] text-white"
                      : "bg-white/[0.02] border-white/10 text-gray-400"
                  }`}
                >
                  <span className="font-bold block text-sm">📹 Videollamada Google Meet</span>
                  <span className="text-[11px] text-gray-400">
                    Presentación digital de planos, cotización y recorrido 3D en pantalla.
                  </span>
                </div>

                <div
                  onClick={() => setVisitType("terreno")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    visitType === "terreno"
                      ? "bg-[#00D1FF]/15 border-[#00D1FF] text-white"
                      : "bg-white/[0.02] border-white/10 text-gray-400"
                  }`}
                >
                  <span className="font-bold block text-sm">📍 Visita Física a Desarrollo</span>
                  <span className="text-[11px] text-gray-400">
                    Recorrido guiado en campo por el asesor en la ubicación del lote.
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#0077B6] hover:opacity-90 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar & Sincronizar Cita con Google Calendar</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: REAL-TIME CALENDAR VIEW */}
      {/* ========================================================================= */}
      {activeModule === "calendario" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#07070E] border border-white/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                CALENDARIO DE RECORRIDOS & CITAS OPEN HOUSE
              </span>
              <h3 className="text-xl font-mono font-black text-white mt-1">
                Septiembre - Octubre 2026
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              🟢 Sincronizado en Vivo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/40 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-[#00D1FF] font-bold uppercase block">PRÓXIMA CITA • 22 SEP</span>
              <h5 className="font-bold text-white text-sm">Demo App Open House: Terrenos & Citas</h5>
              <p className="text-gray-300 text-[11px]">Cliente: Eduardo Cáceres • 11:00 AM</p>
              <span className="text-emerald-400 text-[10px] block font-bold">Asesora: Jessica Torre (VEN-JESS-101)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">24 SEP • 4:00 PM</span>
              <h5 className="font-bold text-white text-sm">Recorrido Lotes Telchac Beach</h5>
              <p className="text-gray-400 text-[11px]">Inversionista: Arq. Fernando Garza</p>
              <span className="text-gray-300 text-[10px] block font-bold">Asesora: Jessica Torre</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">28 SEP • 12:00 PM</span>
              <h5 className="font-bold text-white text-sm">Firma de Apartado Dzidzantún</h5>
              <p className="text-gray-400 text-[11px]">Cliente: Grupo Inmobiliario Peninsular</p>
              <span className="text-gray-300 text-[10px] block font-bold">Asesor: Carlos Mendoza</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 4: VENDORS & COMMISSIONS PORTAL */}
      {/* ========================================================================= */}
      {activeModule === "vendedores" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#07070E] border border-white/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                PORTAL DE FUERZA DE VENTAS & ASESORES
              </span>
              <h3 className="text-xl font-mono font-black text-white mt-1">
                Red Inmobiliaria Open House Yucatán
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Tabulador de Comisiones: 4.0% - 6.0%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SALES_ADVISORS.map((adv) => (
              <div
                key={adv.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all space-y-3 text-xs font-mono"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-[#00D1FF] font-bold">{adv.code}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{adv.name}</h4>
                    <span className="text-[10px] text-gray-400 block">{adv.role}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    {adv.commissionRate}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prospectos Activos:</span>
                    <span className="text-white font-bold">{adv.activeDeals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Teléfono:</span>
                    <span className="text-gray-300">{adv.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
