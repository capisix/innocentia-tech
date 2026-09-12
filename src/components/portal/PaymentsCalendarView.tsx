"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building2,
  Server,
  Users,
  Bell,
  Edit3,
  Briefcase,
  Check,
  Flame,
} from "../../lib/icons";
import { RoleType, UserAccount } from "./AuthLoginModal";

export interface CalendarEventItem {
  id: string;
  sourceId?: string;
  title: string;
  category: string;
  type: "ingreso" | "gasto";
  timing: "hecho" | "proximo"; // 'hecho' = realizado/cobrado/pagado, 'proximo' = por cobrar / por pagar / vencimiento recurrente
  amount: number;
  dateStr: string;
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  paidBy?: string;
  beneficiary?: string;
  sourceAccount?: string;
  status: "pagado" | "pendiente" | "recurrente";
  projectRef?: string;
  daysRemaining?: number;
  isHighPriority?: boolean;
}

interface PaymentsCalendarViewProps {
  financeRecords: any[];
  projects: any[];
  servers: any[];
  auditLogs: any[];
  activeUser: UserAccount;
  activeRole: RoleType;
  onOpenAddFinanceModal: () => void;
  onOpenEditFinanceRecord?: (rec: any) => void;
  onTriggerReminder?: (serviceName: string, daysBefore: number, recipients: string[], amount: number) => void;
}

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function PaymentsCalendarView({
  financeRecords,
  projects,
  servers,
  auditLogs,
  activeUser,
  activeRole,
  onOpenAddFinanceModal,
  onOpenEditFinanceRecord,
  onTriggerReminder,
}: PaymentsCalendarViewProps) {
  // Calendar Navigation State
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // 1-indexed (9 = Septiembre)
  const [selectedDay, setSelectedDay] = useState<number | null>(9); // Default to current day

  // Filter States
  const [filterType, setFilterType] = useState<"todos" | "hechos" | "proximos" | "ingresos" | "gastos">("todos");
  const [filterPaidBy, setFilterPaidBy] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Helper: Parse date string into year, month, day
  const parseDateDetails = (str?: string): { day: number; month: number; year: number } | null => {
    if (!str) return null;
    const lower = str.toLowerCase();

    let m = 9;
    if (lower.includes("ene") || lower.includes("jan")) m = 1;
    else if (lower.includes("feb")) m = 2;
    else if (lower.includes("mar")) m = 3;
    else if (lower.includes("abr") || lower.includes("apr")) m = 4;
    else if (lower.includes("may")) m = 5;
    else if (lower.includes("jun")) m = 6;
    else if (lower.includes("jul")) m = 7;
    else if (lower.includes("ago") || lower.includes("aug")) m = 8;
    else if (lower.includes("sep")) m = 9;
    else if (lower.includes("oct")) m = 10;
    else if (lower.includes("nov")) m = 11;
    else if (lower.includes("dic") || lower.includes("dec")) m = 12;

    let y = 2026;
    if (lower.includes("2025")) y = 2025;
    else if (lower.includes("2027")) y = 2027;

    const dayMatch = str.match(/\b(\d{1,2})\b/);
    const d = dayMatch ? parseInt(dayMatch[1], 10) : 1;

    return { day: Math.min(Math.max(d, 1), 31), month: m, year: y };
  };

  // Compile All Payments (Realizados y Futuros)
  const allCalendarEvents = useMemo(() => {
    const events: CalendarEventItem[] = [];

    // 1. Process Finance Records
    financeRecords.forEach((rec) => {
      const parsed = parseDateDetails(rec.date);
      const parsedDue = rec.dueDate ? parseDateDetails(rec.dueDate) : null;
      const isPaid = rec.status === "pagado";

      if (isPaid && parsed) {
        // Completed Payment
        events.push({
          id: `fin-paid-${rec.id}`,
          sourceId: rec.id,
          title: rec.concept,
          category: rec.category || (rec.type === "ingreso" ? "Ingreso por Proyecto" : "Gasto Operativo"),
          type: rec.type === "ingreso" ? "ingreso" : "gasto",
          timing: "hecho",
          amount: rec.amount,
          dateStr: rec.date,
          year: parsed.year,
          month: parsed.month,
          day: parsed.day,
          paidBy: rec.paidBy || (rec.section === "gasto_operativo" ? rec.registeredBy : undefined),
          beneficiary: rec.beneficiary,
          sourceAccount: rec.sourceAccount,
          status: rec.status,
          projectRef: rec.projectRef,
        });
      }

      // If pending or recurring, add as Upcoming Payment on its dueDate or next cycle date
      if (!isPaid || rec.status === "recurrente" || rec.status === "pendiente") {
        const targetDateInfo = parsedDue || parsed || { day: 15, month: 9, year: 2026 };
        events.push({
          id: `fin-due-${rec.id}`,
          sourceId: rec.id,
          title: rec.concept,
          category: rec.category || (rec.type === "ingreso" ? "Cobro Programado" : "Compromiso / Vencimiento"),
          type: rec.type === "ingreso" ? "ingreso" : "gasto",
          timing: "proximo",
          amount: rec.amount,
          dateStr: rec.dueDate || rec.date,
          year: targetDateInfo.year,
          month: targetDateInfo.month,
          day: targetDateInfo.day,
          paidBy: rec.paidBy || (rec.section === "gasto_operativo" ? rec.registeredBy : undefined),
          beneficiary: rec.beneficiary,
          sourceAccount: rec.sourceAccount,
          status: rec.status,
          projectRef: rec.projectRef,
          isHighPriority: rec.amount >= 10000,
        });
      }
    });

    // 2. Process Server Services (Cloud & Subscriptions Renewals)
    servers.forEach((srv) => {
      const parsed = parseDateDetails(srv.renewalDate);
      if (parsed) {
        events.push({
          id: `srv-${srv.id}`,
          sourceId: srv.id,
          title: `Renovación: ${srv.name}`,
          category: `${srv.type} • ${srv.provider}`,
          type: "gasto",
          timing: "proximo",
          amount: srv.costMonthly,
          dateStr: srv.renewalDate,
          year: parsed.year,
          month: parsed.month,
          day: parsed.day,
          paidBy: srv.paidBy || "Daniel Torre (Socio)",
          sourceAccount: srv.paymentAccount,
          status: srv.autoDebit ? "recurrente" : "pendiente",
          daysRemaining: srv.daysRemaining,
          isHighPriority: srv.status === "proximo_a_vencer" || srv.daysRemaining <= 7,
        });
      }
    });

    // 3. Process Projects (Upcoming Milestones & Balances to Collect)
    projects.forEach((proj) => {
      const pendingAmount = Math.max(0, (proj.budget || 0) - (proj.paidAmount || 0));
      if (pendingAmount > 0 && proj.targetDate) {
        const parsed = parseDateDetails(proj.targetDate);
        if (parsed) {
          events.push({
            id: `proj-milestone-${proj.id}`,
            sourceId: proj.id,
            title: `Cobro Estimado Remanente: ${proj.name}`,
            category: `Hito de Entrega / Liquidación Cliente: ${proj.client}`,
            type: "ingreso",
            timing: "proximo",
            amount: pendingAmount,
            dateStr: proj.targetDate,
            year: parsed.year,
            month: parsed.month,
            day: parsed.day,
            paidBy: `Cliente: ${proj.client}`,
            sourceAccount: "Santander Corporativa (Innocentia Tech)",
            status: "pendiente",
            projectRef: proj.name,
            isHighPriority: true,
          });
        }
      }
    });

    // 4. Process Bi-weekly Payroll Schedules (Sueldos Técnicos día 15 y 30)
    [9, 10, 11, 12].forEach((m) => {
      events.push({
        id: `payroll-q1-${m}-2026`,
        title: "Dispersión Nómina y Honorarios Técnicos (Quincena 1)",
        category: "Nómina / Sueldos Técnicos",
        type: "gasto",
        timing: m < 9 ? "hecho" : m === 9 && selectedDay && selectedDay > 15 ? "hecho" : "proximo",
        amount: 23500,
        dateStr: `15 de ${MONTH_NAMES[m - 1]} de 2026`,
        year: 2026,
        month: m,
        day: 15,
        paidBy: "Santander Corporativa (Innocentia Tech)",
        sourceAccount: "BBVA Operativa & Nómina",
        status: m < 9 ? "pagado" : "recurrente",
        beneficiary: "Equipo Dev & UX (Rodrigo P. / Sofía V.)",
        isHighPriority: true,
      });

      events.push({
        id: `payroll-q2-${m}-2026`,
        title: "Dispersión Nómina y Honorarios Técnicos (Quincena 2 / Cierre)",
        category: "Nómina / Sueldos Técnicos",
        type: "gasto",
        timing: m < 9 ? "hecho" : "proximo",
        amount: 23500,
        dateStr: `30 de ${MONTH_NAMES[m - 1]} de 2026`,
        year: 2026,
        month: m,
        day: 30,
        paidBy: "Santander Corporativa (Innocentia Tech)",
        sourceAccount: "BBVA Operativa & Nómina",
        status: m < 9 ? "pagado" : "recurrente",
        beneficiary: "Equipo Dev & UX (Rodrigo P. / Sofía V.)",
        isHighPriority: true,
      });
    });

    return events;
  }, [financeRecords, projects, servers, auditLogs, selectedDay]);

  // Filter events for active view and month
  const filteredEventsForMonth = useMemo(() => {
    return allCalendarEvents.filter((ev) => {
      // Month & Year Filter
      if (ev.year !== selectedYear || ev.month !== selectedMonth) {
        return false;
      }

      // Timing / Type Filter
      if (filterType === "hechos" && ev.timing !== "hecho") return false;
      if (filterType === "proximos" && ev.timing !== "proximo") return false;
      if (filterType === "ingresos" && ev.type !== "ingreso") return false;
      if (filterType === "gastos" && ev.type !== "gasto") return false;

      // Payer / Responsible Filter
      if (filterPaidBy !== "all") {
        const pLower = (ev.paidBy || "").toLowerCase();
        const bLower = (ev.beneficiary || "").toLowerCase();
        const aLower = (ev.sourceAccount || "").toLowerCase();

        if (filterPaidBy === "daniel") {
          if (!pLower.includes("daniel") && !bLower.includes("daniel")) return false;
        } else if (filterPaidBy === "jorge") {
          if (!pLower.includes("jorge") && !bLower.includes("jorge")) return false;
        } else if (filterPaidBy === "ivan") {
          if (!pLower.includes("iván") && !pLower.includes("ivan") && !bLower.includes("ivan")) return false;
        } else if (filterPaidBy === "santander") {
          if (!aLower.includes("santander") && !pLower.includes("santander")) return false;
        } else if (filterPaidBy === "bbva") {
          if (!aLower.includes("bbva") && !pLower.includes("bbva")) return false;
        } else if (filterPaidBy === "caja_chica") {
          if (!aLower.includes("caja") && !pLower.includes("caja") && !aLower.includes("efectivo")) return false;
        } else if (filterPaidBy === "clientes") {
          if (!pLower.includes("cliente") && ev.type !== "ingreso") return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchCat = ev.category.toLowerCase().includes(q);
        const matchPaidBy = (ev.paidBy || "").toLowerCase().includes(q);
        const matchBeneficiary = (ev.beneficiary || "").toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchPaidBy && !matchBeneficiary) return false;
      }

      return true;
    });
  }, [allCalendarEvents, selectedYear, selectedMonth, filterType, filterPaidBy, searchQuery]);

  // Monthly KPI Computations
  const monthlyMetrics = useMemo(() => {
    let cobradoHecho = 0;
    let porCobrarFuturo = 0;
    let pagadoHecho = 0;
    let porPagarFuturo = 0;

    filteredEventsForMonth.forEach((ev) => {
      if (ev.type === "ingreso") {
        if (ev.timing === "hecho") cobradoHecho += ev.amount;
        else porCobrarFuturo += ev.amount;
      } else {
        if (ev.timing === "hecho") pagadoHecho += ev.amount;
        else porPagarFuturo += ev.amount;
      }
    });

    const flujoNetoRealizado = cobradoHecho - pagadoHecho;
    const flujoNetoProyectado = cobradoHecho + porCobrarFuturo - (pagadoHecho + porPagarFuturo);

    return {
      cobradoHecho,
      porCobrarFuturo,
      pagadoHecho,
      porPagarFuturo,
      flujoNetoRealizado,
      flujoNetoProyectado,
      totalEventos: filteredEventsForMonth.length,
    };
  }, [filteredEventsForMonth]);

  // Calendar Grid Day Generation
  const calendarDaysMatrix = useMemo(() => {
    const firstDayDate = new Date(selectedYear, selectedMonth - 1, 1);
    let startDayOfWeek = firstDayDate.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonth - 1, 0).getDate();

    const cells = [];

    // Previous month filler days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
      cells.push({
        dayNumber: prevDay,
        isCurrentMonth: false,
        year: prevYear,
        month: prevMonth,
        events: allCalendarEvents.filter((e) => e.year === prevYear && e.month === prevMonth && e.day === prevDay),
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayEvts = filteredEventsForMonth.filter((e) => e.day === d);
      cells.push({
        dayNumber: d,
        isCurrentMonth: true,
        year: selectedYear,
        month: selectedMonth,
        events: dayEvts,
      });
    }

    // Next month filler days
    const totalCellsNeeded = cells.length > 35 ? 42 : 35;
    let nextDay = 1;
    while (cells.length < totalCellsNeeded) {
      const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
      const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
      cells.push({
        dayNumber: nextDay,
        isCurrentMonth: false,
        year: nextYear,
        month: nextMonth,
        events: allCalendarEvents.filter((e) => e.year === nextYear && e.month === nextMonth && e.day === nextDay),
      });
      nextDay++;
    }

    return cells;
  }, [selectedYear, selectedMonth, filteredEventsForMonth, allCalendarEvents]);

  // Events of the currently selected day
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return filteredEventsForMonth.filter((e) => e.day === selectedDay);
  }, [filteredEventsForMonth, selectedDay]);

  // Upcoming high-priority items across the next 15 days
  const upcomingAgendaItems = useMemo(() => {
    return allCalendarEvents
      .filter((e) => e.timing === "proximo" && e.year === selectedYear && e.month >= selectedMonth)
      .sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
      })
      .slice(0, 6);
  }, [allCalendarEvents, selectedYear, selectedMonth]);

  // Navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const handleGoToCurrentMonth = () => {
    setSelectedYear(2026);
    setSelectedMonth(9);
    setSelectedDay(9);
  };

  const isCurrentToday = (dayNum, isCurrentM) => {
    return isCurrentM && selectedYear === 2026 && selectedMonth === 9 && dayNum === 9;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Month Navigator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Control de Pagos y Compromisos
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Sincronización CEO & Socios
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              Calendario Financiero Integral
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Visualiza en tiempo real los <strong className="text-slate-200">pagos realizados</strong> (cobrados y liquidados) y los{" "}
              <strong className="text-slate-200">pagos programados a futuro</strong> (vencimientos de infraestructura, cobros por hito, nóminas y comisiones).
            </p>
          </div>

          {/* Month / Year Switcher & Quick Action */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Month Navigator Controls */}
            <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-1 shadow-inner">
              <button
                onClick={handlePrevMonth}
                title="Mes Anterior"
                className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1 text-center min-w-[170px]">
                <span className="text-base font-bold text-white block leading-tight">
                  {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                </span>
                <span className="text-[11px] text-amber-400 font-medium">
                  {filteredEventsForMonth.length} movimientos
                </span>
              </div>

              <button
                onClick={handleNextMonth}
                title="Mes Siguiente"
                className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleGoToCurrentMonth}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Mes Actual
            </button>

            <button
              onClick={onOpenAddFinanceModal}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              + Programar Pago / Gasto
            </button>
          </div>
        </div>

        {/* Month Summary KPI Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-6 pt-6 border-t border-slate-800/80">
          {/* Total Cobrado (Hecho) */}
          <div className="bg-slate-950/60 border border-emerald-500/20 rounded-2xl p-3.5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Cobrado (Hecho)
              </span>
              <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300 font-bold">
                Entradas
              </span>
            </div>
            <div className="text-lg lg:text-xl font-black text-emerald-400 tracking-tight">
              +${monthlyMetrics.cobradoHecho.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Ingresos liquidados recibidos</p>
          </div>

          {/* Total Por Cobrar (Futuro) */}
          <div className="bg-slate-950/60 border border-cyan-500/20 rounded-2xl p-3.5 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-cyan-400 mb-1 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Por Cobrar (Próximo)
              </span>
              <span className="text-[10px] bg-cyan-500/10 px-1.5 py-0.5 rounded text-cyan-300 font-bold">
                Hitos
              </span>
            </div>
            <div className="text-lg lg:text-xl font-black text-cyan-400 tracking-tight">
              +${monthlyMetrics.porCobrarFuturo.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Saldos pendientes proyectos</p>
          </div>

          {/* Total Pagado (Hecho) */}
          <div className="bg-slate-950/60 border border-rose-500/20 rounded-2xl p-3.5 relative overflow-hidden group hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-rose-400 mb-1 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                Pagado (Hecho)
              </span>
              <span className="text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded text-rose-300 font-bold">
                Salidas
              </span>
            </div>
            <div className="text-lg lg:text-xl font-black text-rose-400 tracking-tight">
              -${monthlyMetrics.pagadoHecho.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Gastos & sueldos ejecutados</p>
          </div>

          {/* Total Por Pagar (Futuro) */}
          <div className="bg-slate-950/60 border border-amber-500/20 rounded-2xl p-3.5 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1 font-medium">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Por Pagar (Próximo)
              </span>
              <span className="text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-300 font-bold">
                Vencimientos
              </span>
            </div>
            <div className="text-lg lg:text-xl font-black text-amber-400 tracking-tight">
              -${monthlyMetrics.porPagarFuturo.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Cloud, nómina & comisiones</p>
          </div>

          {/* Flujo Neto Estimado */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-3.5 relative overflow-hidden col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-xs text-indigo-400 mb-1 font-medium">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Flujo Neto Mes
              </span>
              <span className="text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300 font-bold">
                Balance
              </span>
            </div>
            <div
              className={`text-lg lg:text-xl font-black tracking-tight ${
                monthlyMetrics.flujoNetoProyectado >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {monthlyMetrics.flujoNetoProyectado >= 0 ? "+" : ""}$
              {monthlyMetrics.flujoNetoProyectado.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Realizado:{" "}
              <strong className="text-slate-200">
                ${monthlyMetrics.flujoNetoRealizado.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Type / Timing Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType("todos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === "todos"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Todos ({filteredEventsForMonth.length})
          </button>
          <button
            onClick={() => setFilterType("hechos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === "hechos"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            ✅ Pagos Hechos
          </button>
          <button
            onClick={() => setFilterType("proximos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === "proximos"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Clock className="w-3 h-3 text-amber-400" />
            ⏳ Próximos a Pagar / Cobrar
          </button>
          <button
            onClick={() => setFilterType("ingresos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === "ingresos"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3 h-3 text-cyan-400" />
            Solo Ingresos
          </button>
          <button
            onClick={() => setFilterType("gastos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === "gastos"
                ? "bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20"
                : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <TrendingDown className="w-3 h-3 text-rose-400" />
            Solo Egresos / Gastos
          </button>
        </div>

        {/* Filter by Payer & Search */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Payer Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">De quién / Payer:</span>
            <select
              value={filterPaidBy}
              onChange={(e) => setFilterPaidBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="all">👥 Todos los Orígenes</option>
              <option value="daniel">👤 Daniel Torre (Socio)</option>
              <option value="jorge">👤 Jorge Pérez (Socio)</option>
              <option value="ivan">👤 Iván Castillo (CEO)</option>
              <option value="santander">🏛️ Santander Corporativa</option>
              <option value="bbva">🏛️ BBVA Operativa</option>
              <option value="caja_chica">💵 Caja Chica Efectivo</option>
              <option value="clientes">💼 Clientes (Proyectos)</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar concepto o beneficiario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {(filterType !== "todos" || filterPaidBy !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setFilterType("todos");
                setFilterPaidBy("all");
                setSearchQuery("");
              }}
              title="Restablecer Filtros"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid & Interactive Day Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEK_DAYS.map((wd, i) => (
                <div
                  key={wd}
                  className={`text-center py-2 text-xs font-bold uppercase tracking-wider ${
                    i >= 5 ? "text-amber-500/70" : "text-slate-400"
                  }`}
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Day Cells */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDaysMatrix.map((cell, idx) => {
                const isSelected = cell.isCurrentMonth && selectedDay === cell.dayNumber;
                const isToday = isCurrentToday(cell.dayNumber, cell.isCurrentMonth);
                const hasEvents = cell.events.length > 0;

                let dayIncome = 0;
                let dayExpense = 0;
                let hasDue = false;
                cell.events.forEach((e) => {
                  if (e.type === "ingreso") dayIncome += e.amount;
                  else dayExpense += e.amount;
                  if (e.timing === "proximo") hasDue = true;
                });

                return (
                  <button
                    key={`${cell.year}-${cell.month}-${cell.dayNumber}-${idx}`}
                    onClick={() => {
                      if (cell.isCurrentMonth) {
                        setSelectedDay(cell.dayNumber);
                      } else {
                        setSelectedMonth(cell.month);
                        setSelectedYear(cell.year);
                        setSelectedDay(cell.dayNumber);
                      }
                    }}
                    className={`min-h-[92px] p-2 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                      !cell.isCurrentMonth
                        ? "bg-slate-950/30 border-slate-900/50 opacity-40 hover:opacity-80"
                        : isSelected
                        ? "bg-slate-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10"
                        : isToday
                        ? "bg-slate-950/90 border-cyan-500/80 ring-1 ring-cyan-500/40"
                        : "bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
                    }`}
                  >
                    {/* Header of cell: Day Number & Today indicator */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-extrabold rounded-lg px-1.5 py-0.5 ${
                          isToday
                            ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                            : isSelected
                            ? "bg-amber-500 text-slate-950 font-black"
                            : cell.isCurrentMonth
                            ? "text-slate-200"
                            : "text-slate-500"
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {isToday && (
                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-tighter">
                          Hoy
                        </span>
                      )}

                      {!isToday && hasDue && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="Vencimiento programado" />
                      )}
                    </div>

                    {/* Event Badges List */}
                    <div className="space-y-1 my-1 w-full overflow-hidden">
                      {cell.events.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded truncate flex items-center justify-between gap-1 ${
                            ev.type === "ingreso"
                              ? ev.timing === "hecho"
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                              : ev.timing === "hecho"
                              ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          <span className="truncate">{ev.title}</span>
                          <span className="font-mono font-bold shrink-0">
                            {ev.type === "ingreso" ? "+" : "-"}${Math.round(ev.amount / 1000)}k
                          </span>
                        </div>
                      ))}

                      {cell.events.length > 2 && (
                        <div className="text-[9px] text-amber-400/90 font-medium px-1 text-center bg-slate-900/80 rounded">
                          +{cell.events.length - 2} más...
                        </div>
                      )}
                    </div>

                    {/* Net balance footer for the day */}
                    {hasEvents ? (
                      <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60 w-full">
                        <span className="text-[9px] text-slate-400">{cell.events.length} movs</span>
                        <span
                          className={`font-bold ${
                            dayIncome - dayExpense >= 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {dayIncome - dayExpense >= 0 ? "+" : ""}${Math.round((dayIncome - dayExpense) / 1000)}k
                        </span>
                      </div>
                    ) : (
                      <div className="h-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calendar Color Legend */}
          <div className="mt-4 pt-4 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <strong className="text-slate-300">Ingreso Cobrado (Hecho)</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50" />
                <strong className="text-slate-300">Ingreso Por Cobrar (Próximo)</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                <strong className="text-slate-300">Gasto Pagado (Hecho)</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                <strong className="text-slate-300">Por Pagar / Vencimiento</strong>
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Haz clic en cualquier día para inspeccionar el desglose detallado.
            </div>
          </div>
        </div>

        {/* Day Detail & Agenda Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Day Inspector Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Desglose del Día Seleccionado
                </span>
                <h3 className="text-lg font-black text-white">
                  {selectedDay
                    ? `${selectedDay} de ${MONTH_NAMES[selectedMonth - 1]} de ${selectedYear}`
                    : `Selecciona un día`}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
                {selectedDayEvents.length} movimientos
              </span>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="py-10 text-center text-slate-500 space-y-2">
                <Calendar className="w-10 h-10 mx-auto text-slate-700" />
                <p className="text-sm font-medium text-slate-400">
                  No hay pagos registrados ni programados para este día.
                </p>
                <button
                  onClick={onOpenAddFinanceModal}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
                >
                  + Programar un pago o ingreso en esta fecha
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      ev.type === "ingreso"
                        ? ev.timing === "hecho"
                          ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50"
                          : "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/50"
                        : ev.timing === "hecho"
                        ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50"
                        : "bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              ev.timing === "hecho"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {ev.timing === "hecho" ? "✅ Realizado" : "⏳ Por Ejecutar / Vence"}
                          </span>
                          <span className="text-[10px] text-slate-400">{ev.category}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">{ev.title}</h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-base font-black font-mono block ${
                            ev.type === "ingreso" ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {ev.type === "ingreso" ? "+" : "-"}${ev.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">MXN</span>
                      </div>
                    </div>

                    {/* Metadata breakdown */}
                    <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      {ev.paidBy && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Responsable / Payer:</span>
                          <span className="text-slate-200 font-semibold">{ev.paidBy}</span>
                        </div>
                      )}
                      {ev.sourceAccount && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Cuenta de origen:</span>
                          <span className="text-slate-300 truncate max-w-[180px]">{ev.sourceAccount}</span>
                        </div>
                      )}
                      {ev.beneficiary && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Beneficiario:</span>
                          <span className="text-slate-300 font-medium">{ev.beneficiary}</span>
                        </div>
                      )}
                      {ev.projectRef && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Proyecto:</span>
                          <span className="text-amber-400 font-medium">{ev.projectRef}</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Edit button if finance record exists */}
                    {onOpenEditFinanceRecord && ev.sourceId && ev.sourceId.startsWith("FIN-") && (
                      <div className="mt-2 text-right">
                        <button
                          onClick={() => {
                            const originalRec = financeRecords.find((r) => r.id === ev.sourceId);
                            if (originalRec) onOpenEditFinanceRecord(originalRec);
                          }}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 ml-auto"
                        >
                          <Edit3 className="w-3 h-3" />
                          Editar / Asignar Pagador
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Schedule & Urgencies Agenda */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Próximos Vencimientos Inminentes</h3>
              </div>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Agenda
              </span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {upcomingAgendaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedMonth(item.month);
                    setSelectedYear(item.year);
                    setSelectedDay(item.day);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors truncate max-w-[190px]">
                      {item.title}
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        item.type === "ingreso" ? "text-cyan-400" : "text-amber-400"
                      }`}
                    >
                      {item.type === "ingreso" ? "+" : "-"}${item.amount.toLocaleString("es-MX")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.day} de {MONTH_NAMES[item.month - 1]}
                    </span>
                    <span className="text-slate-300 font-medium truncate max-w-[140px]">
                      {item.paidBy || item.sourceAccount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
