"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Edit3,
  Trash2,
  Share2,
  Sparkles,
  Link2,
  Check,
  Users,
} from "../../lib/icons";
import { UserAccount } from "./AuthLoginModal";

export interface CommercialAppointment {
  id: string;
  clientName: string;
  company: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  meetingType: string;
  topic: string;
  status: "Confirmada" | "Pendiente" | "Realizada" | "Reprogramada" | "Cancelada";
  notes: string;
  meetUrl?: string;
  pin?: string;
  dialNumber?: string;
}

interface CommercialCalendarViewProps {
  appointments: CommercialAppointment[];
  onAddAppointment: (apt: Omit<CommercialAppointment, "id">) => void;
  onUpdateAppointment: (id: string, updated: Partial<CommercialAppointment>) => void;
  onDeleteAppointment: (id: string) => void;
  activeUser: UserAccount;
  getGoogleCalendarUrl: (apt: CommercialAppointment) => string;
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function CommercialCalendarView({
  appointments,
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
  activeUser,
  getGoogleCalendarUrl,
}: CommercialCalendarViewProps) {
  // Calendar Navigation State
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // 1-indexed (9 = Septiembre)
  const [selectedDay, setSelectedDay] = useState<number>(14); // Default to today (14 Sep)
  const [viewMode, setViewMode] = useState<"calendario" | "lista">("calendario");

  // Selected appointment for detail inspection
  const [selectedAptId, setSelectedAptId] = useState<string | null>("APT-HOY-01");

  // Modal states for Create & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Form State
  const [formId, setFormId] = useState("");
  const [formClientName, setFormClientName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDate, setFormDate] = useState("2026-09-14");
  const [formTime, setFormTime] = useState("15:30");
  const [formType, setFormType] = useState("Videollamada Google Meet");
  const [formTopic, setFormTopic] = useState("");
  const [formStatus, setFormStatus] = useState<CommercialAppointment["status"]>("Confirmada");
  const [formNotes, setFormNotes] = useState("");
  const [formMeetUrl, setFormMeetUrl] = useState("https://meet.google.com/mnh-metd-fcn");
  const [formPin, setFormPin] = useState("");
  const [formDialNumber, setFormDialNumber] = useState("");

  // Selected Date string (YYYY-MM-DD)
  const selectedDateStr = useMemo(() => {
    const mm = selectedMonth.toString().padStart(2, "0");
    const dd = selectedDay.toString().padStart(2, "0");
    return `${selectedYear}-${mm}-${dd}`;
  }, [selectedYear, selectedMonth, selectedDay]);

  // Appointments for the selected day
  const dayAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.date === selectedDateStr);
  }, [appointments, selectedDateStr]);

  // Active inspected appointment
  const activeInspectedApt = useMemo(() => {
    if (selectedAptId) {
      const found = appointments.find((a) => a.id === selectedAptId);
      if (found) return found;
    }
    return dayAppointments[0] || appointments[0] || null;
  }, [appointments, selectedAptId, dayAppointments]);

  // Generate Calendar Matrix for Selected Month
  const calendarMatrix = useMemo(() => {
    const firstDayIndex = (new Date(selectedYear, selectedMonth - 1, 1).getDay() + 6) % 7; // Mon = 0
    const totalDaysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const prevMonthDays = new Date(selectedYear, selectedMonth - 1, 0).getDate();

    const cells: Array<{
      dayNumber: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      dateStr: string;
      apts: CommercialAppointment[];
    }> = [];

    // Prev month overflow
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const m = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const y = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
      const dStr = `${y}-${m.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      cells.push({
        dayNumber: day,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateStr: dStr,
        apts: appointments.filter((a) => a.date === dStr),
      });
    }

    // Current month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dStr = `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      cells.push({
        dayNumber: day,
        month: selectedMonth,
        year: selectedYear,
        isCurrentMonth: true,
        dateStr: dStr,
        apts: appointments.filter((a) => a.date === dStr),
      });
    }

    // Next month overflow to complete 35 or 42 grid
    const remaining = 35 - cells.length > 0 ? 35 - cells.length : 42 - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const m = selectedMonth === 12 ? 1 : selectedMonth + 1;
      const y = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
      const dStr = `${y}-${m.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      cells.push({
        dayNumber: day,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateStr: dStr,
        apts: appointments.filter((a) => a.date === dStr),
      });
    }

    return cells;
  }, [selectedYear, selectedMonth, appointments]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handleGoToToday = () => {
    setSelectedYear(2026);
    setSelectedMonth(9);
    setSelectedDay(14);
    setSelectedAptId("APT-HOY-01");
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode("create");
    setFormId("");
    setFormClientName("");
    setFormCompany("");
    setFormPhone("");
    setFormDate(selectedDateStr);
    setFormTime("12:00");
    setFormType("Videollamada Google Meet");
    setFormTopic("");
    setFormStatus("Confirmada");
    setFormNotes("");
    setFormMeetUrl("");
    setFormPin("");
    setFormDialNumber("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (apt: CommercialAppointment) => {
    setModalMode("edit");
    setFormId(apt.id);
    setFormClientName(apt.clientName);
    setFormCompany(apt.company);
    setFormPhone(apt.clientPhone);
    setFormDate(apt.date);
    setFormTime(apt.time);
    setFormType(apt.meetingType);
    setFormTopic(apt.topic);
    setFormStatus(apt.status);
    setFormNotes(apt.notes || "");
    setFormMeetUrl(apt.meetUrl || "");
    setFormPin(apt.pin || "");
    setFormDialNumber(apt.dialNumber || "");
    setIsModalOpen(true);
  };

  // Form Submit (Create or Update)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientName.trim()) return;

    if (modalMode === "create") {
      onAddAppointment({
        clientName: formClientName.trim(),
        company: formCompany.trim() || "Empresa Particular",
        clientPhone: formPhone.trim() || "55 1234 5678",
        date: formDate,
        time: formTime,
        meetingType: formType,
        topic: formTopic.trim() || "Demostración de Plataforma & Cotización",
        status: formStatus,
        notes: formNotes.trim(),
        meetUrl: formMeetUrl.trim() || undefined,
        pin: formPin.trim() || undefined,
        dialNumber: formDialNumber.trim() || undefined,
      });
    } else {
      onUpdateAppointment(formId, {
        clientName: formClientName.trim(),
        company: formCompany.trim(),
        clientPhone: formPhone.trim(),
        date: formDate,
        time: formTime,
        meetingType: formType,
        topic: formTopic.trim(),
        status: formStatus,
        notes: formNotes.trim(),
        meetUrl: formMeetUrl.trim() || undefined,
        pin: formPin.trim() || undefined,
        dialNumber: formDialNumber.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-gradient-to-r from-[#00D1FF]/20 via-purple-950/40 to-black border-2 border-[#00D1FF]/40 shadow-[0_0_35px_rgba(0,209,255,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            Agenda Comercial & Sincronización Google Calendar
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#00D1FF]" />
            <span>Calendario de Citas & Demostraciones</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Haz clic en cualquier fecha para consultar la información completa, editar citas o entrar a la videollamada.
          </p>
        </div>

        {/* View Toggle & New Appointment Button */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/60 border border-white/20">
            <button
              type="button"
              onClick={() => setViewMode("calendario")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "calendario"
                  ? "bg-[#00D1FF] text-black shadow-md shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendario</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("lista")}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "lista"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Lista ({appointments.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00D1FF] via-purple-500 to-[#FF3858] hover:scale-105 text-black font-black text-xs uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.5)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-black stroke-[3]" />
            <span>+ Agendar Nueva Cita</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: CALENDARIO INTERACTIVO CON PANEL DE DETALLE */}
      {/* ========================================================================= */}
      {viewMode === "calendario" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CALENDAR GRID (8 COLS) */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-[32px] bg-[#07070E] border border-white/15 space-y-5 shadow-2xl backdrop-blur-xl">
            {/* Month Navigation Controls */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-2xl p-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                  title="Mes Anterior"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="px-3 py-1 text-center min-w-[150px]">
                  <span className="text-sm font-black text-white uppercase tracking-wider block">
                    {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                  </span>
                  <span className="text-[10px] font-mono text-[#00D1FF] font-bold">
                    {appointments.filter((a) => a.date.startsWith(`${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`)).length} citas este mes
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                  title="Mes Siguiente"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleGoToToday}
                className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#00D1FF]" />
                <span>Hoy (14 Sep)</span>
              </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-mono font-bold text-gray-400 uppercase">
              {WEEK_DAYS.map((wd, i) => (
                <div key={wd} className={`py-1.5 ${i >= 5 ? "text-purple-400" : ""}`}>
                  {wd}
                </div>
              ))}
            </div>

            {/* Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarMatrix.map((cell, idx) => {
                const isSelected = cell.isCurrentMonth && selectedDay === cell.dayNumber;
                const isToday = cell.isCurrentMonth && cell.dayNumber === 14 && cell.month === 9 && cell.year === 2026;
                const hasApts = cell.apts.length > 0;

                return (
                  <button
                    key={`${cell.year}-${cell.month}-${cell.dayNumber}-${idx}`}
                    type="button"
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.dayNumber);
                      } else {
                        setSelectedMonth(cell.month);
                        setSelectedYear(cell.year);
                        setSelectedDay(cell.dayNumber);
                      }
                      if (cell.apts.length > 0) {
                        setSelectedAptId(cell.apts[0].id);
                      }
                    }}
                    className={`min-h-[86px] sm:min-h-[96px] p-2 rounded-2xl border text-left transition-all flex flex-col justify-between group relative cursor-pointer ${
                      !cell.isCurrentMonth
                        ? "bg-white/[0.01] border-white/5 opacity-30 hover:opacity-70"
                        : isSelected
                        ? "bg-purple-950/40 border-[#00D1FF] ring-2 ring-[#00D1FF]/50 shadow-[0_0_20px_rgba(0,209,255,0.2)]"
                        : isToday
                        ? "bg-cyan-950/30 border-[#00D1FF]/60 ring-1 ring-[#00D1FF]/30"
                        : hasApts
                        ? "bg-white/[0.04] border-white/20 hover:border-purple-500/50"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    {/* Day number & Today Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-mono font-black px-1.5 py-0.5 rounded-lg ${
                          isToday
                            ? "bg-[#00D1FF] text-black"
                            : isSelected
                            ? "bg-purple-600 text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {isToday && (
                        <span className="text-[9px] font-mono font-bold text-[#00D1FF] uppercase">
                          Hoy
                        </span>
                      )}
                    </div>

                    {/* Resumed Appointments inside Cell */}
                    <div className="space-y-1 my-1 w-full overflow-hidden">
                      {cell.apts.slice(0, 2).map((apt) => (
                        <div
                          key={apt.id}
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded truncate font-bold flex items-center justify-between gap-1 border ${
                            apt.status === "Confirmada"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          }`}
                          title={`${apt.time} - ${apt.clientName} (${apt.company})`}
                        >
                          <span className="truncate">{apt.time} {apt.company}</span>
                        </div>
                      ))}
                      {cell.apts.length > 2 && (
                        <span className="text-[8px] font-mono text-gray-400 block text-right">
                          +{cell.apts.length - 2} más
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DETAIL INSPECTOR & ACTIONS PANEL (4 COLS) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-[32px] bg-[#07070E] border border-white/20 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider block">
                    Detalle de la Fecha Seleccionada
                  </span>
                  <h3 className="text-base font-black text-white mt-0.5">
                    {selectedDay} de {MONTH_NAMES[selectedMonth - 1]} de {selectedYear}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-xs font-mono font-bold text-white border border-white/15">
                  {dayAppointments.length} {dayAppointments.length === 1 ? "cita" : "citas"}
                </span>
              </div>

              {dayAppointments.length === 0 ? (
                <div className="py-10 text-center text-gray-500 space-y-3">
                  <Calendar className="w-10 h-10 mx-auto text-gray-700" />
                  <p className="text-xs font-mono text-gray-400">
                    No hay citas comerciales programadas para este día.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenCreate}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#00D1FF] text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    + Agendar cita en esta fecha
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select appointment pills if multiple */}
                  {dayAppointments.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {dayAppointments.map((apt) => (
                        <button
                          key={apt.id}
                          type="button"
                          onClick={() => setSelectedAptId(apt.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold truncate transition-all cursor-pointer ${
                            activeInspectedApt?.id === apt.id
                              ? "bg-[#00D1FF] text-black"
                              : "bg-white/5 text-gray-300 hover:text-white"
                          }`}
                        >
                          {apt.time} - {apt.company}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeInspectedApt && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 text-xs font-mono">
                      {/* Header info */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-[#00D1FF] font-bold block">
                            {activeInspectedApt.id} • {activeInspectedApt.meetingType}
                          </span>
                          <h4 className="text-base font-black text-white mt-1">
                            {activeInspectedApt.clientName}
                          </h4>
                          <span className="text-xs text-purple-300 font-bold block">
                            🏢 {activeInspectedApt.company}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                          activeInspectedApt.status === "Confirmada"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}>
                          ● {activeInspectedApt.status}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#00D1FF]" />
                          <span>Horario: <strong className="text-white">{activeInspectedApt.time} hrs</strong> ({activeInspectedApt.date})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                          <span>Tema: <strong className="text-white">{activeInspectedApt.topic}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📱 Teléfono:</span>
                          <strong className="text-white">{activeInspectedApt.clientPhone}</strong>
                        </div>
                        {activeInspectedApt.notes && (
                          <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 italic">
                            "{activeInspectedApt.notes}"
                          </div>
                        )}
                      </div>

                      {/* Google Meet Direct Access Button */}
                      {activeInspectedApt.meetUrl && (
                        <a
                          href={activeInspectedApt.meetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00D1FF] hover:brightness-110 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
                        >
                          <span>🎥 Unirse a Google Meet</span>
                          <ArrowRight className="w-4 h-4 text-black" />
                        </a>
                      )}

                      {/* Action Buttons: Google Calendar + WhatsApp */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={getGoogleCalendarUrl(activeInspectedApt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                          <span>Google Calendar</span>
                        </a>

                        <a
                          href={`https://wa.me/${activeInspectedApt.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${activeInspectedApt.clientName}, te confirmo nuestra reunión de Innocentia Tech para el día ${activeInspectedApt.date} a las ${activeInspectedApt.time} hrs. Link Meet: ${activeInspectedApt.meetUrl || 'https://meet.google.com/mnh-metd-fcn'}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>💬 WhatsApp</span>
                        </a>
                      </div>

                      {/* Edit & Delete Controls */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(activeInspectedApt)}
                          className="px-4 py-2 rounded-xl bg-[#00D1FF]/15 hover:bg-[#00D1FF]/25 border border-[#00D1FF]/40 text-[#00D1FF] font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar Cita</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`¿Eliminar la cita con ${activeInspectedApt.clientName}?`)) {
                              onDeleteAppointment(activeInspectedApt.id);
                            }
                          }}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: LISTADO DE CITAS */}
      {/* ========================================================================= */}
      {viewMode === "lista" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-6 rounded-[28px] bg-[#07070E] border border-white/15 space-y-4 hover:border-[#00D1FF]/50 transition-all shadow-xl text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#00D1FF] font-bold block">{apt.id} • {apt.meetingType}</span>
                  <h4 className="text-base font-black text-white mt-0.5">{apt.clientName}</h4>
                  <span className="text-xs font-mono text-purple-300 font-bold">{apt.company}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  apt.status === "Confirmada"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                }`}>
                  ● {apt.status}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>Fecha: <strong>{apt.date}</strong> a las <strong>{apt.time} hrs</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Tema: {apt.topic}</span>
                </div>
                {apt.notes && (
                  <p className="text-[11px] text-gray-400 italic pt-1 border-t border-white/5">
                    "{apt.notes}"
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-1">
                {apt.meetUrl && (
                  <a
                    href={apt.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00D1FF] hover:brightness-110 text-black font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
                  >
                    <span>🎥 Unirse a Google Meet</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </a>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={getGoogleCalendarUrl(apt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>Calendar</span>
                  </a>

                  <a
                    href={`https://wa.me/${apt.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${apt.clientName}, te confirmo nuestra cita agendada para el día ${apt.date} a las ${apt.time} hrs.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>💬 WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(apt)}
                    className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREAR / EDITAR CITA COMERCIAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#07070E] border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,209,255,0.25)] text-left space-y-5 relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00D1FF]" />
                <h3 className="text-lg font-black text-white uppercase">
                  {modalMode === "create" ? "Agendar Nueva Cita Comercial" : "Editar Cita Comercial"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Nombre del Cliente:</label>
                  <input
                    type="text"
                    required
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    placeholder="Lic. Daniel Torre"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Empresa / Marca:</label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Pro Acabados"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">WhatsApp / Teléfono:</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="55 8421 0898"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Fecha:</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Hora:</label>
                  <input
                    type="time"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Modalidad de Reunión:</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  >
                    <option value="Videollamada Google Meet">Videollamada Google Meet</option>
                    <option value="Demostración de Plataforma & Cotización">Demostración de Plataforma & Cotización</option>
                    <option value="Llamada Telefónica">Llamada Telefónica</option>
                    <option value="Reunión Presencial">Reunión Presencial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Estatus:</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                  >
                    <option value="Confirmada">🟢 Confirmada</option>
                    <option value="Pendiente">🟡 Pendiente</option>
                    <option value="Realizada">🔵 Realizada</option>
                    <option value="Reprogramada">🟣 Reprogramada</option>
                    <option value="Cancelada">🔴 Cancelada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">Tema Principal:</label>
                <input
                  type="text"
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  placeholder="Ej: Presentación demo SaaS Avanzado & Automatización"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">Enlace Google Meet (Opcional):</label>
                <input
                  type="url"
                  value={formMeetUrl}
                  onChange={(e) => setFormMeetUrl(e.target.value)}
                  placeholder="https://meet.google.com/mnh-metd-fcn"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-[#00D1FF] focus:border-[#00D1FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">Notas / Acuerdos:</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Detalles sobre las necesidades del cliente..."
                  className="w-full px-4 py-2 rounded-xl bg-black/70 border border-white/20 text-white focus:border-[#00D1FF] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] via-purple-600 to-emerald-500 text-black font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  {modalMode === "create" ? "Agendar Cita" : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
