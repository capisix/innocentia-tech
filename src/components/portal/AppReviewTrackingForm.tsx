"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Bug,
  Sparkles,
  HelpCircle,
  Paintbrush,
  AlertTriangle,
  Building2,
  Search,
  Filter,
  Send,
  Share2,
  FileText,
  Clock,
  Check,
  Smartphone,
  Layers,
  Database,
  RefreshCw,
  GitPullRequest,
  Mail,
  User,
} from "../../lib/icons";

export type ReportTypeKey = "bug" | "improvement" | "feature" | "question" | "ux";
export type ImpactLevelKey = "critical" | "medium" | "low";
export type TicketStatusKey = "pending" | "in_review" | "development" | "testing" | "resolved";

export interface TicketItem {
  id: string;
  projectId?: string;
  projectName?: string;
  module: string;
  title: string;
  category: ReportTypeKey;
  impact: ImpactLevelKey;
  status: TicketStatusKey;
  reportedBy: string;
  reporterRole?: string;
  company: string;
  branch?: string;
  date: string;
  whatYouWant: string;
  expectedBehavior: string;
  currentBehavior: string;
  reproductionSteps: string;
  desiredResult: string;
  evidenceUrl?: string;
  innocentiaResponse?: string;
  resolvedVersion?: string;
  lastUpdated: string;
}

// Available registered projects in Innocentia ecosystem
export const AVAILABLE_PROJECTS = [
  {
    id: "proj_tacos_larry",
    name: "Tacos Larry — MultiCommerce ERP / POS",
    company: "Tacos Larry",
    defaultBranch: "Sucursal Centro",
    defaultReporter: "Larry",
    industry: "Restaurantes & Taquerías",
  },
  {
    id: "proj_experience_safely",
    name: "Experience Safely — Plataforma Turística VIP",
    company: "Experience Safely",
    defaultBranch: "Riviera Maya / Yucatán",
    defaultReporter: "Operaciones",
    industry: "Turismo & Experiencias",
  },
  {
    id: "proj_help_2_win",
    name: "Help 2 Win — E-commerce & Networking",
    company: "Help 2 Win Global",
    defaultBranch: "Corporativo",
    defaultReporter: "Equipo Comercial",
    industry: "Salud, Bienestar & Ventas",
  },
  {
    id: "proj_ikal_chukum",
    name: "Ikal Chukum — Acabados Arquitectónicos",
    company: "Ikal Chukum",
    defaultBranch: "Mérida Matriz",
    defaultReporter: "Ventas & Almacén",
    industry: "Construcción & Acabados",
  },
  {
    id: "proj_ggc_producciones",
    name: "GGC Producciones — Productora Audiovisual",
    company: "GGC Producciones",
    defaultBranch: "Estudio Principal",
    defaultReporter: "Producción",
    industry: "Medios & Espectáculos",
  },
  {
    id: "proj_deja_vu",
    name: "Deja Vu Festival — Sistema de Boletaje",
    company: "Deja Vu Festival",
    defaultBranch: "Taquilla General",
    defaultReporter: "Coordinación de Acceso",
    industry: "Eventos Masivos & Festivales",
  },
  {
    id: "proj_openhouse_360",
    name: "OpenHouse PropTech 360 — Real Estate",
    company: "OpenHouse",
    defaultBranch: "Desarrollo Inmobiliario",
    defaultReporter: "Asesor Líder",
    industry: "Bienes Raíces",
  },
  {
    id: "proj_custom",
    name: "➕ Otro Proyecto / Requerimiento Personalizado",
    company: "Empresa Personalizada",
    defaultBranch: "Matriz",
    defaultReporter: "Usuario",
    industry: "Software a la Medida",
  },
];

// Initial case-study dataset from Tacos Larry (MultiCommerce)
const INITIAL_TACOS_LARRY_TICKETS: TicketItem[] = [
  {
    id: "MC-001",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Ventas",
    title: "Identificar vendedor de cada producto y venta",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    reporterRole: "Cliente / Gerencia",
    company: "Tacos Larry",
    branch: "Sucursal Centro",
    date: "22/09/2026",
    whatYouWant: "Registrar qué vendedor realizó cada venta para comisiones y métricas",
    expectedBehavior: "Al crear la venta en el POS, desplegar selector de vendedor asignado",
    currentBehavior: "La venta se genera de forma general sin trazabilidad de vendedor",
    reproductionSteps: "Ventas → Nueva Venta → Cobrar",
    desiredResult: "Venta #145 → Vendedor: Juan Pérez → Bodega Centro",
    innocentiaResponse: "Se agregará selector de vendedor en encabezado de venta y reporte de comisiones.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "En desarrollo activo en rama feature/seller-attribution",
  },
  {
    id: "MC-002",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Inventario",
    title: "Manejar 3 o más bodegas independientes",
    category: "feature",
    impact: "medium",
    status: "testing",
    reportedBy: "Larry",
    reporterRole: "Cliente / Gerencia",
    company: "Tacos Larry",
    branch: "Sucursal Centro",
    date: "22/09/2026",
    whatYouWant: "Gestionar existencias en Bodega Centro, Norte y Sucursal 2",
    expectedBehavior: "Poder ver stock por almacén y seleccionar bodega de salida",
    currentBehavior: "El inventario es un solo bloque global",
    reproductionSteps: "Inventario → Catálogo de productos",
    desiredResult: "Stock desglosado: 40 en Centro, 25 en Norte, 15 en Sucursal 2",
    innocentiaResponse: "Arquitectura multi-bodega lista en entorno de pruebas.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Pruebas de conciliación de existencias",
  },
  {
    id: "MC-003",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Ventas",
    title: "Registrar bodega de salida + vendedor en cada ticket",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Que al cobrar se elija de qué almacén se descuenta y quién vende",
    expectedBehavior: "Selector dual: [Bodega Origen] + [Vendedor]",
    currentBehavior: "Descuenta del almacén por defecto únicamente",
    reproductionSteps: "POS → Carrito → Finalizar orden",
    desiredResult: "Orden #145 guardada con Bodega Norte y Carlos",
    innocentiaResponse: "Enlazado al motor de despacho multi-almacén.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Integrando con hook de cobro rápido",
  },
  {
    id: "MC-004",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Inventario",
    title: "Stock independiente por bodega con alertas mínimas",
    category: "feature",
    impact: "low",
    status: "testing",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Configurar umbral de reorden específico para cada sucursal",
    expectedBehavior: "Alerta amarilla cuando Bodega Norte baje de 10 piezas",
    currentBehavior: "Alerta única global que no distingue si una sucursal está vacía",
    reproductionSteps: "Inventario → Alertas de Stock",
    desiredResult: "Matriz visual de semáforo por bodega",
    innocentiaResponse: "Algoritmo de stock mínimo por sucursal implementado.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Fase de validación de notificaciones push",
  },
  {
    id: "MC-005",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Inventario",
    title: "Traslados entre bodegas con validación de recepción",
    category: "feature",
    impact: "medium",
    status: "in_review",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Mover mercancía de Bodega Centro a Sucursal Norte con acuse de recibo",
    expectedBehavior: "Generar orden de traslado en estado 'En tránsito' hasta confirmación",
    currentBehavior: "Se debe ajustar manualmente el inventario en dos pasos",
    reproductionSteps: "Inventario → Movimientos de Almacén",
    desiredResult: "Folio TR-0012: Centro (-50) ➔ Tránsito ➔ Norte (+50)",
    innocentiaResponse: "Diseño de flujo de doble confirmación en revisión técnica.",
    resolvedVersion: "v1.4.0",
    lastUpdated: "Aprobado para sprint v1.4",
  },
  {
    id: "MC-006",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "POS",
    title: "Reemplazar sistema de mesas por mostrador rápido / órdenes de comida",
    category: "ux",
    impact: "low",
    status: "resolved",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "20/09/2026",
    whatYouWant: "Modo de cobro exprés de taquería sin obligar a seleccionar número de mesa",
    expectedBehavior: "Botón 'Venta de Mostrador / Para llevar' de un toque",
    currentBehavior: "Exigía asignar mesa formal de restaurante",
    reproductionSteps: "POS → Nueva orden",
    desiredResult: "Ticket rápido con número de turno #18",
    innocentiaResponse: "Modo Taquería / Mostrador activable desde Ajustes de Sucursal.",
    resolvedVersion: "v1.3.0",
    lastUpdated: "Desplegado en producción",
  },
  {
    id: "MC-007",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Contabilidad",
    title: "Sincronizar contabilidad con operaciones en tiempo real",
    category: "feature",
    impact: "medium",
    status: "in_review",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Que cada venta, gasto y pago genere su póliza contable automática",
    expectedBehavior: "Libro mayor y balance actualizados al instante de cada venta",
    currentBehavior: "Módulo contable desconectado que requiere captura manual",
    reproductionSteps: "Contabilidad → Pólizas del día",
    desiredResult: "Asiento automático: Cargo a Bancos / Abono a Ventas e IVA",
    innocentiaResponse: "Generador automático de pólizas en desarrollo.",
    resolvedVersion: "v1.4.0",
    lastUpdated: "Definiendo catálogo de cuentas SAT",
  },
  {
    id: "MC-008",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "CxC",
    title: "Venta a crédito + fecha de vencimiento + límite de crédito",
    category: "feature",
    impact: "critical",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Poder fiar a clientes frecuentes registrando plazo de pago",
    expectedBehavior: "Seleccionar método 'Crédito' y fijar fecha límite (ej. 15 días)",
    currentBehavior: "Solo permite pago de contado (Efectivo/Tarjeta)",
    reproductionSteps: "Cobro → Métodos de Pago",
    desiredResult: "Venta #145 a Crédito → Vence 30/09/2026 → Saldo pendiente $850",
    innocentiaResponse: "Módulo CxC en desarrollo prioritario.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "UI de fecha de vencimiento completada",
  },
  {
    id: "MC-009",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "CxC",
    title: "Consultar cuentas por cobrar con antigüedad de saldos",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Ver reporte rápido de quién me debe, cuánto y si ya venció",
    expectedBehavior: "Tabla con filtros: Por vencer (0-7 días), Vencidas (+15 días)",
    currentBehavior: "No hay pantalla de consulta de cartera de clientes",
    reproductionSteps: "Clientes → Cuentas por Cobrar",
    desiredResult: "Lista con botón 'Enviar recordatorio por WhatsApp'",
    innocentiaResponse: "Vista de cobranza y botones de WhatsApp en armado.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Integrando API de mensajes de cobranza",
  },
  {
    id: "MC-010",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "CxP",
    title: "Consultar créditos y deudas por pagar a proveedores",
    category: "feature",
    impact: "low",
    status: "pending",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Llevar control de las compras de carne/verdura a crédito a proveedores",
    expectedBehavior: "Calendario de pagos pendientes a proveedores",
    currentBehavior: "Se registran compras solo como gasto inmediato en efectivo",
    reproductionSteps: "Proveedores → Facturas por Pagar",
    desiredResult: "Aviso: 'Pago a Distribuidora de Carnes vence mañana ($4,200)'",
    innocentiaResponse: "En cola para inicio de desarrollo tras liberar CxC.",
    resolvedVersion: "v1.4.0",
    lastUpdated: "En cola de priorización",
  },
  {
    id: "MC-011",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Gastos",
    title: "Categorizar gastos operativos (Insumos, Servicios, Nómina, Mantenimiento)",
    category: "feature",
    impact: "low",
    status: "resolved",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "18/09/2026",
    whatYouWant: "Clasificar cada salida de dinero para saber en qué se gasta más",
    expectedBehavior: "Selector de categorías personalizables al registrar un egreso",
    currentBehavior: "Solo existía un campo de texto libre 'Concepto'",
    reproductionSteps: "Caja → Salida de Dinero",
    desiredResult: "Gráfica de pastel: 60% Insumos, 20% Gas, 20% Limpieza",
    innocentiaResponse: "Árbol de categorías de egresos implementado con éxito.",
    resolvedVersion: "v1.3.1",
    lastUpdated: "Cerrado y operativo",
  },
  {
    id: "MC-012",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Clientes",
    title: "Alta rápida de cliente con teléfono para pedidos recurrentes",
    category: "feature",
    impact: "low",
    status: "resolved",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "17/09/2026",
    whatYouWant: "Guardar nombre y WhatsApp de clientes desde la pantalla de cobro",
    expectedBehavior: "Modal popup rápido '+ Nuevo Cliente' sin salir de la venta",
    currentBehavior: "Había que ir al módulo de administración y salir del POS",
    reproductionSteps: "POS → Campo Cliente → '+ Nuevo'",
    desiredResult: "Cliente registrado en 3 segundos y seleccionado en el ticket",
    innocentiaResponse: "Modal de captura ultrarrápida integrado directamente en el POS.",
    resolvedVersion: "v1.2.9",
    lastUpdated: "Completado y en producción",
  },
  {
    id: "MC-013",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Nómina",
    title: "Registrar pago de nómina semanal y anticipos",
    category: "feature",
    impact: "low",
    status: "pending",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Llevar el registro de pagos al taquero, cocinero y repartidores",
    expectedBehavior: "Ficha de empleado con historial de sueldos y adelantos",
    currentBehavior: "Se registra como un gasto común sin trazabilidad por empleado",
    reproductionSteps: "Recursos Humanos → Pago de Nómina",
    desiredResult: "Recibo digital y descuento automático de caja/banco",
    innocentiaResponse: "Requerimiento documentado para fase de nómina básica.",
    resolvedVersion: "v1.4.1",
    lastUpdated: "Especificación técnica en curso",
  },
  {
    id: "MC-014",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Caja",
    title: "Corte de caja ciego por turno con desglose de billetes y monedas",
    category: "feature",
    impact: "critical",
    status: "testing",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Que el cajero cuente el dinero sin saber el total teórico del sistema",
    expectedBehavior: "Captura de arqueo ciego y reporte de faltante/sobrante para el gerente",
    currentBehavior: "El sistema mostraba el total antes del conteo, prestando a discrepancias",
    reproductionSteps: "Caja → Cerrar Turno / Corte X y Z",
    desiredResult: "Impresión de Ticket de Corte Z con firma y desglose por cuenta",
    innocentiaResponse: "Arqueo ciego terminado en fase de pruebas con impresora térmica.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Pruebas de impresión y balance",
  },
  {
    id: "MC-015",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Tesorería",
    title: "Asignar cobro a cuentas bancarias múltiples (BBVA / Albo / Spin / Efectivo)",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Saber exactamente a qué cuenta de banco o monedero entró cada transferencia",
    expectedBehavior: "Selector de cuenta destino: [Efectivo Caja], [BBVA Terminal], [Spin Oxxo]",
    currentBehavior: "Todo entraba a una sola bolsa llamada 'Banco'",
    reproductionSteps: "Cobro → Transferencia / Tarjeta → Cuenta Destino",
    desiredResult: "Saldos independientes por banco en el dashboard de tesorería",
    innocentiaResponse: "Soporte para múltiples cuentas y conciliación diaria en curso.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "En desarrollo de selectores bancarios",
  },
  {
    id: "BUG-001",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Navegación",
    title: "El botón 'Atrás' regresa a selección de Empresas en vez de la pantalla previa",
    category: "bug",
    impact: "critical",
    status: "resolved",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "21/09/2026",
    whatYouWant: "Regresar al paso o listado anterior sin cerrar la sesión de sucursal",
    expectedBehavior: "Navegación con historial nativo en stack (pantalla anterior)",
    currentBehavior: "Al pulsar botón atrás expulsaba al selector general de empresas",
    reproductionSteps: "Ventas → Detalle de Venta #120 → Clic en botón 'Atrás'",
    desiredResult: "Regresa a la lista de ventas manteniendo filtros activos",
    innocentiaResponse: "Corregido stack de navegación en Router con preservación de contexto.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Hotfix aplicado y verificado",
  },
  {
    id: "MC-016",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Entregas",
    title: "Asignar repartidor a pedidos a domicilio con estatus de entrega",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Identificar qué repartidor llevó cada pedido y cuándo fue entregado",
    expectedBehavior: "Estatus: [En Cocina] ➔ [En Camino (José)] ➔ [Entregado]",
    currentBehavior: "No existía seguimiento para pedidos fuera del local",
    reproductionSteps: "Pedidos → Domicilio → Asignar chofer",
    desiredResult: "Ticket con datos de entrega y repartidor asignado",
    innocentiaResponse: "Módulo de logística ligera y comisiones de reparto en desarrollo.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Pantalla de despacho para cocina y repartidores",
  },
  {
    id: "MC-017",
    projectId: "proj_tacos_larry",
    projectName: "Tacos Larry — MultiCommerce ERP / POS",
    module: "Entregas",
    title: "Agregar costo de envío dinámico y desglose en ticket",
    category: "feature",
    impact: "medium",
    status: "development",
    reportedBy: "Larry",
    company: "Tacos Larry",
    date: "22/09/2026",
    whatYouWant: "Cobrar tarifa de flete/envío ($35, $50, $120 según zona) separado del alimento",
    expectedBehavior: "Campo 'Costo de Envío' que sume al total y descuente comisiones",
    currentBehavior: "Se tenía que agregar como un producto ficticio o cobrar por fuera",
    reproductionSteps: "POS → Carrito → Checkbox 'Envío a domicilio' → Monto",
    desiredResult: "Subtotal: $240 + Envío: $40 = Total $280",
    innocentiaResponse: "Campo de flete y regla de cálculo fiscal integrado.",
    resolvedVersion: "v1.3.2",
    lastUpdated: "Integración en motor de totales y facturación",
  },
];

// Category metadata
const CATEGORY_MAP: Record<
  ReportTypeKey,
  {
    emoji: string;
    title: string;
    subtitle: string;
    color: string;
    badgeBg: string;
    borderColor: string;
  }
> = {
  bug: {
    emoji: "🐛",
    title: "Error (Bug)",
    subtitle: "Algo debería funcionar y no funciona.",
    color: "#FF3858",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
    borderColor: "border-[#FF3858]",
  },
  improvement: {
    emoji: "✨",
    title: "Mejora",
    subtitle: "Funciona, pero debería hacerse mejor o más rápido.",
    color: "#00D1FF",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    borderColor: "border-[#00D1FF]",
  },
  feature: {
    emoji: "➕",
    title: "Nueva función",
    subtitle: "Necesito algo que actualmente no existe en el sistema.",
    color: "#8A2BE2",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    borderColor: "border-[#8A2BE2]",
  },
  question: {
    emoji: "❓",
    title: "Duda de uso",
    subtitle: "No sé dónde o cómo hacer algo (capacitación / soporte).",
    color: "#FFB800",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    borderColor: "border-[#FFB800]",
  },
  ux: {
    emoji: "🎨",
    title: "Diseño / UX",
    subtitle: "Algo de la interfaz no es claro o no me acomoda.",
    color: "#10B981",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    borderColor: "border-[#10B981]",
  },
};

// Impact metadata
const IMPACT_MAP: Record<
  ImpactLevelKey,
  {
    label: string;
    icon: string;
    desc: string;
    color: string;
    internalPriority: string;
    badgeBg: string;
  }
> = {
  critical: {
    label: "Sí, detiene mi operación",
    icon: "🔴",
    desc: "Bloquea ventas, inventario crítico o cobros urgentes. Atención inmediata.",
    color: "#FF3858",
    internalPriority: "P0 — Crítico",
    badgeBg: "bg-red-500/15 text-red-400 border-red-500/40",
  },
  medium: {
    label: "Puedo operar, pero con dificultad",
    icon: "🟠",
    desc: "Afecta fluidez o requiere pasos extras manuales. Trabajo con solución temporal.",
    color: "#FF8800",
    internalPriority: "P1 / P2 — Alto / Medio",
    badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  },
  low: {
    label: "Es una mejora deseada",
    icon: "🟢",
    desc: "No afecta la operación diaria. Deseo de optimización o nueva capacidad futura.",
    color: "#10B981",
    internalPriority: "P3 — Baja / Roadmap",
    badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  },
};

// Status metadata
const STATUS_MAP: Record<
  TicketStatusKey,
  { label: string; dotColor: string; badgeBg: string }
> = {
  pending: {
    label: "Pendiente",
    dotColor: "bg-gray-400",
    badgeBg: "bg-gray-500/10 text-gray-300 border-gray-500/30",
  },
  in_review: {
    label: "En revisión",
    dotColor: "bg-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  development: {
    label: "En desarrollo",
    dotColor: "bg-blue-400 animate-pulse",
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  testing: {
    label: "En pruebas",
    dotColor: "bg-purple-400 animate-pulse",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  resolved: {
    label: "Resuelto",
    dotColor: "bg-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
};

const MODULE_OPTIONS = [
  "Ventas / POS",
  "Inventario / Bodegas",
  "Clientes / Crédito (CxC)",
  "Cuentas por Pagar (CxP)",
  "Caja y Cortes",
  "Tesorería / Bancos",
  "Gastos / Egresos",
  "Contabilidad",
  "Nómina / RRHH",
  "Entregas / Repartidores",
  "Navegación / General",
  "Facturación CFDI",
];

const REPORTER_ROLE_OPTIONS = [
  "Cliente / Gerencia Directa",
  "Ingeniería / Desarrollo Innocentia",
  "Asesor Comercial / Ventas",
  "Soporte Técnico / Triaje",
  "QA / Tester de Aplicación",
  "Operador / Cajero en Sucursal",
];

export default function AppReviewTrackingForm() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"form" | "board" | "erp_architecture">("form");

  // Step Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string>("");

  // Step 1: Linked Project & Reporter Info
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj_tacos_larry");
  const [projectName, setProjectName] = useState<string>("Tacos Larry — MultiCommerce ERP / POS");
  const [company, setCompany] = useState<string>("Tacos Larry");
  const [branch, setBranch] = useState<string>("Sucursal Centro");
  const [reportedBy, setReportedBy] = useState<string>("Larry");
  const [reporterRole, setReporterRole] = useState<string>("Cliente / Gerencia Directa");
  const [reportDate, setReportDate] = useState<string>("22/09/2026");
  const [module, setModule] = useState<string>("Ventas / POS");

  // Step 2: Category
  const [category, setCategory] = useState<ReportTypeKey>("feature");

  // Step 3: Diagnostic Details
  const [title, setTitle] = useState<string>("Asignar vendedor a una venta");
  const [whatYouWant, setWhatYouWant] = useState<string>("Registrar qué vendedor realizó cada venta");
  const [expectedBehavior, setExpectedBehavior] = useState<string>("Al crear la venta en el POS, seleccionar vendedor asignado");
  const [currentBehavior, setCurrentBehavior] = useState<string>("La venta no permite asignarlo y se registra sin responsable");
  const [reproductionSteps, setReproductionSteps] = useState<string>("Ventas → Nueva venta → Seleccionar productos → Cobrar");
  const [desiredResult, setDesiredResult] = useState<string>("Venta #145 → Juan → Bodega Centro");
  const [evidenceUrl, setEvidenceUrl] = useState<string>("");

  // Step 4: Impact
  const [impact, setImpact] = useState<ImpactLevelKey>("medium");

  // Tickets List state (allows appending new tickets created on the fly)
  const [tickets, setTickets] = useState<TicketItem[]>(INITIAL_TACOS_LARRY_TICKETS);
  const [generatedTicketId, setGeneratedTicketId] = useState<string>("");

  // Filters for Board View
  const [filterModule, setFilterModule] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTicketDetail, setSelectedTicketDetail] = useState<TicketItem | null>(null);

  // When project changes in dropdown
  const handleProjectSelect = (projId: string) => {
    setSelectedProjectId(projId);
    const found = AVAILABLE_PROJECTS.find((p) => p.id === projId);
    if (found) {
      if (projId !== "proj_custom") {
        setProjectName(found.name);
        setCompany(found.company);
        setBranch(found.defaultBranch);
        setReportedBy(found.defaultReporter);
      } else {
        setProjectName("Proyecto Personalizado");
        setCompany("");
        setBranch("");
      }
    }
  };

  // Quick Loader for Larry Tacos preset
  const loadLarryTacosPreset = () => {
    handleProjectSelect("proj_tacos_larry");
    setCompany("Tacos Larry");
    setBranch("Sucursal Centro / Norte");
    setReportedBy("Larry");
    setReporterRole("Cliente / Gerencia Directa");
    setReportDate("22/09/2026");
    setModule("Ventas / POS");
    setCategory("feature");
    setTitle("Asignar vendedor a una venta y bodega de salida");
    setWhatYouWant("Registrar qué vendedor realizó cada venta y de qué bodega se descuenta el stock");
    setExpectedBehavior("Al crear la venta, desplegar selectores de vendedor y bodega origen");
    setCurrentBehavior("La venta no permite asignarlo y se envía todo a almacén general");
    setReproductionSteps("POS → Nueva venta → Carrito → Finalizar cobro");
    setDesiredResult("Venta #145 → Vendedor: Carlos → Bodega: Norte → Repartidor: José");
    setImpact("medium");
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // Handle Form Submission & Email Dispatch
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);

    const newId = `MC-00${tickets.length + 1}`;
    const newTicket: TicketItem = {
      id: newId,
      projectId: selectedProjectId,
      projectName,
      module: module.replace(" / POS", "").replace(" / Bodegas", ""),
      title: title || "Requerimiento sin título",
      category,
      impact,
      status: "pending",
      reportedBy: reportedBy || "Usuario",
      reporterRole,
      company: company || "Empresa",
      branch: branch || undefined,
      date: reportDate || "22/09/2026",
      whatYouWant,
      expectedBehavior,
      currentBehavior,
      reproductionSteps,
      desiredResult,
      evidenceUrl: evidenceUrl || undefined,
      innocentiaResponse: "Reporte recibido en cola de triaje. Notificado por correo a ventas@innocentia.tech y ceo.ivan@innocentia.tech.",
      lastUpdated: "Recibido formalmente & Notificado",
    };

    // Dispatch email notification via API
    try {
      const emailPayload = {
        ticketId: newId,
        projectId: selectedProjectId,
        projectName,
        company,
        branch,
        reportedBy,
        reporterRole,
        date: reportDate,
        module,
        category,
        categoryLabel: `${CATEGORY_MAP[category].emoji} ${CATEGORY_MAP[category].title}`,
        impact,
        impactLabel: `${IMPACT_MAP[impact].icon} ${IMPACT_MAP[impact].label}`,
        internalPriority: IMPACT_MAP[impact].internalPriority,
        title,
        whatYouWant,
        expectedBehavior,
        currentBehavior,
        reproductionSteps,
        desiredResult,
        evidenceUrl,
      };

      const res = await fetch("/api/notifications/ticket-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      const data = await res.json();
      if (data.success) {
        setEmailStatusMessage("Enviado con éxito a ventas@innocentia.tech y ceo.ivan@innocentia.tech");
      } else {
        setEmailStatusMessage("Registrado localmente (Aviso de envío generado)");
      }
    } catch (err) {
      console.warn("Email notification triggered locally:", err);
      setEmailStatusMessage("Notificación procesada y registrada en el sistema.");
    } finally {
      setIsSendingEmail(false);
    }

    setTickets([newTicket, ...tickets]);
    setGeneratedTicketId(newId);
    setIsSubmitted(true);
  };

  // Format clean WhatsApp message for the client
  const generateWhatsAppMessage = () => {
    const cat = CATEGORY_MAP[category];
    const imp = IMPACT_MAP[impact];
    const text = `*📋 NUEVO REPORTE DE SISTEMA — INNOCENTIA TECH*
---------------------------------------
*Folio:* #${generatedTicketId || "MC-0042"}
*Proyecto:* ${projectName}
*Fecha:* ${reportDate}
*Empresa / Sucursal:* ${company} ${branch ? `(${branch})` : ""}
*Reporta:* ${reportedBy} (${reporterRole})
*Módulo:* ${module}

*Tipo:* ${cat.emoji} ${cat.title}
*Impacto:* ${imp.icon} ${imp.label} (Prioridad: ${imp.internalPriority})

*Título:* ${title}
*¿Qué quieres hacer?:* ${whatYouWant}
*¿Cómo esperabas que funcionara?:* ${expectedBehavior}
*¿Qué sucede actualmente?:* ${currentBehavior}
*Pasos:* ${reproductionSteps}
*Resultado deseado:* ${desiredResult}
${evidenceUrl ? `*Evidencia:* ${evidenceUrl}\n` : ""}---------------------------------------
_Copia enviada a: ventas@innocentia.tech & ceo.ivan@innocentia.tech_
_Generado automáticamente desde el Portal de Seguimiento Innocentia._`;

    return encodeURIComponent(text);
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesModule = filterModule === "all" || t.module.toLowerCase().includes(filterModule.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    const matchesSearch =
      searchQuery === "" ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.projectName && t.projectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.desiredResult.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Top Navigation Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "form"
                ? "bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. Nuevo Reporte / Requerimiento</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("board")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "board"
                ? "bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] text-white shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Tablero de Seguimiento ({tickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("erp_architecture")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "erp_architecture"
                ? "bg-gradient-to-r from-[#8A2BE2] to-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>3. Flujo ERP Conectado (Caso Venta #00184)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={loadLarryTacosPreset}
          className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
          title="Cargar ejemplo real de Tacos Larry con los 18 puntos"
        >
          <span>🌮 Cargar Ejemplo Tacos Larry</span>
        </button>
      </div>

      {/* TAB 1: STEPPED REVIEW FORM */}
      {activeTab === "form" && (
        <div className="space-y-6">
          {/* Form Progress Bar */}
          {!isSubmitted && (
            <div className="p-6 rounded-2xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                <span className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] border border-[#00D1FF]/40">
                    {currentStep}
                  </span>
                  Paso {currentStep} de {totalSteps}:{" "}
                  {currentStep === 1 && "Proyecto, Contexto y Módulo"}
                  {currentStep === 2 && "Tipo de Reporte"}
                  {currentStep === 3 && "Diagnóstico y Requerimiento"}
                  {currentStep === 4 && "Impacto Operativo & Envío"}
                </span>
                <span className="text-[#00D1FF] font-bold">
                  {Math.round((currentStep / totalSteps) * 100)}% Completado
                </span>
              </div>

              {/* Steps Progress Track */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#FF3858] via-[#00D1FF] to-[#10B981] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,209,255,0.6)]"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              {/* Step indicator breadcrumbs */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`text-left truncate transition-colors ${
                    currentStep === 1 ? "text-[#00D1FF] font-bold" : "hover:text-gray-200"
                  }`}
                >
                  1. Proyecto &amp; Contexto
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`text-left truncate transition-colors ${
                    currentStep === 2 ? "text-[#00D1FF] font-bold" : "hover:text-gray-200"
                  }`}
                >
                  2. Clasificación
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className={`text-left truncate transition-colors ${
                    currentStep === 3 ? "text-[#00D1FF] font-bold" : "hover:text-gray-200"
                  }`}
                >
                  3. Diagnóstico
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className={`text-left truncate transition-colors ${
                    currentStep === 4 ? "text-[#00D1FF] font-bold" : "hover:text-gray-200"
                  }`}
                >
                  4. Impacto &amp; Envío
                </button>
              </div>
            </div>
          )}

          {/* Form Content Area */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmitTicket} className="space-y-6">
              {/* STEP 1: Proyecto, Contexto & Módulo */}
              {currentStep === 1 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-2xl space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Paso 1: Vinculación de Proyecto e Identificación</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                      ¿A qué proyecto se vincula este reporte?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">
                      Selecciona el proyecto activo de la empresa para asociar automáticamente el historial técnico y despachar el reporte a los directores correspondientes.
                    </p>
                  </div>

                  {/* Selector de Proyecto Vinculado */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-cyan-500/30 space-y-2">
                    <label className="text-xs font-mono text-[#00D1FF] font-bold flex items-center justify-between">
                      <span>📌 Seleccionar Proyecto sobre el cual se referirá el cuestionario:</span>
                      <span className="text-gray-400 text-[10px]">Vinculación Oficial</span>
                    </label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#07070E] border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all cursor-pointer"
                    >
                      {AVAILABLE_PROJECTS.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name} ({proj.company})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Empresa */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 font-semibold flex items-center justify-between">
                        <span>Nombre de Empresa / Cliente</span>
                        <span className="text-[#FF3858] text-[10px]">*Requerido</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Tacos Larry"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>

                    {/* Sucursal */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 font-semibold">
                        Sucursal / Ubicación Afectada
                      </label>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Ej. Sucursal Centro / Norte"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>

                    {/* Usuario que reporta */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 font-semibold flex items-center justify-between">
                        <span>Usuario que Reporta</span>
                        <span className="text-[#FF3858] text-[10px]">*Requerido</span>
                      </label>
                      <input
                        type="text"
                        value={reportedBy}
                        onChange={(e) => setReportedBy(e.target.value)}
                        placeholder="Ej. Larry / Juan / Ing. Carlos"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>

                    {/* Rol del usuario en el equipo */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 font-semibold">
                        Rol del Reportante
                      </label>
                      <select
                        value={reporterRole}
                        onChange={(e) => setReporterRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#121220] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                      >
                        {REPORTER_ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Selector de Módulo */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-xs font-mono text-gray-300 font-semibold flex items-center justify-between">
                      <span>Módulo o Sección Afectada</span>
                      <span className="text-[#00D1FF] text-[10px]">Selecciona el área principal</span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {MODULE_OPTIONS.map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => setModule(mod)}
                          className={`p-3 rounded-xl border text-left font-mono text-xs transition-all duration-200 flex items-center justify-between ${
                            module === mod
                              ? "bg-[#00D1FF]/15 border-[#00D1FF] text-white shadow-[0_0_12px_rgba(0,209,255,0.25)] font-bold"
                              : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span className="truncate">{mod}</span>
                          {module === mod && <Check className="w-3.5 h-3.5 text-[#00D1FF] flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-[1.02] transition-all"
                    >
                      <span>Siguiente: Tipo de Reporte</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Tipo de Reporte (Botones Grandes & Didácticos) */}
              {currentStep === 2 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-2xl space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF3858] uppercase font-bold tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Paso 2: El Campo Más Importante</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                      ¿Qué tipo de reporte es?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">
                      Clasificar correctamente ahorra horas de confusión y canaliza tu solicitud al equipo adecuado.
                    </p>
                  </div>

                  {/* Giant Interactive Category Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {(Object.keys(CATEGORY_MAP) as ReportTypeKey[]).map((catKey) => {
                      const item = CATEGORY_MAP[catKey];
                      const isSelected = category === catKey;

                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => setCategory(catKey)}
                          className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between ${
                            isSelected
                              ? `bg-white/[0.07] ${item.borderColor} shadow-[0_0_25px_rgba(0,0,0,0.5)] ring-1 ring-inset ${item.borderColor}`
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                {item.emoji}
                              </span>
                              <div>
                                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                                  <span>{item.title}</span>
                                </h3>
                                <p className="text-xs text-gray-400 font-mono mt-0.5 font-light">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                isSelected
                                  ? `${item.badgeBg} border-transparent`
                                  : "border-white/20 group-hover:border-white/40"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>

                          {/* Interactive Helpful Hints */}
                          {catKey === "question" && (
                            <div className="mt-3 text-[11px] font-mono text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                              💡 Ej: “¿Dónde veo los créditos que me deben?” $\rightarrow$ Puede que la función ya exista y solo falte orientarte.
                            </div>
                          )}

                          {catKey === "bug" && (
                            <div className="mt-3 text-[11px] font-mono text-red-300/80 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                              ⚠️ Ej: “El botón atrás me saca de la empresa” $\rightarrow$ Corrige un error en el código existente.
                            </div>
                          )}

                          {catKey === "feature" && (
                            <div className="mt-3 text-[11px] font-mono text-purple-300/80 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                              🚀 Ej: “Agregar costo de envío y repartidor” $\rightarrow$ Arquitectura de una nueva capacidad.
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-[1.02] transition-all"
                    >
                      <span>Siguiente: Diagnóstico</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Detalle del Requerimiento / Diagnóstico */}
              {currentStep === 3 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-2xl space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Paso 3: Diagnóstico Estructurado</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                      Detalle Preciso del Requerimiento
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">
                      Responde estas sencillas preguntas para evitar malentendidos y programar exactamente lo que necesitas.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Título */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300 font-semibold flex items-center justify-between">
                        <span>Título del Reporte (Corto y directo)</span>
                        <span className="text-[#FF3858] text-[10px]">*Requerido</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej. Asignar vendedor a una venta"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ¿Qué quieres hacer? */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold">
                          ¿Qué quieres hacer en el sistema?
                        </label>
                        <textarea
                          rows={3}
                          value={whatYouWant}
                          onChange={(e) => setWhatYouWant(e.target.value)}
                          placeholder="Ej. Registrar qué vendedor realizó cada venta para comisiones"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all resize-none"
                        />
                      </div>

                      {/* ¿Cómo esperabas que funcionara? */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold">
                          ¿Cómo esperabas que funcionara?
                        </label>
                        <textarea
                          rows={3}
                          value={expectedBehavior}
                          onChange={(e) => setExpectedBehavior(e.target.value)}
                          placeholder="Ej. Al crear la venta en el POS, seleccionar vendedor en un menú"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ¿Qué sucede actualmente? */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold">
                          ¿Qué sucede actualmente?
                        </label>
                        <textarea
                          rows={3}
                          value={currentBehavior}
                          onChange={(e) => setCurrentBehavior(e.target.value)}
                          placeholder="Ej. La venta no permite asignarlo y se registra genérica"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all resize-none"
                        />
                      </div>

                      {/* Pasos para reproducirlo */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold">
                          Pasos para reproducirlo / Ruta
                        </label>
                        <textarea
                          rows={3}
                          value={reproductionSteps}
                          onChange={(e) => setReproductionSteps(e.target.value)}
                          placeholder="Ej. Ventas → Nueva venta → Seleccionar productos..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Resultado deseado */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold flex items-center justify-between">
                          <span>Resultado deseado (Ejemplo de salida)</span>
                          <span className="text-[#00D1FF] text-[10px]">Muy útil</span>
                        </label>
                        <input
                          type="text"
                          value={desiredResult}
                          onChange={(e) => setDesiredResult(e.target.value)}
                          placeholder="Ej. Venta #145 → Juan → Bodega Centro"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                        />
                      </div>

                      {/* Evidencia (URL o descripción) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-gray-300 font-semibold">
                          Evidencia (Enlace de captura, drive o video)
                        </label>
                        <input
                          type="text"
                          value={evidenceUrl}
                          onChange={(e) => setEvidenceUrl(e.target.value)}
                          placeholder="https://... o 'Captura enviada al chat'"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00D1FF] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#8A2BE2] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-[1.02] transition-all"
                    >
                      <span>Siguiente: Impacto &amp; Envío</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Impacto Operativo & Despacho por Correo */}
              {currentStep === 4 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-2xl space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10B981] uppercase font-bold tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Paso 4: Prioridad Operativa &amp; Notificación</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                      ¿Esto impide que puedas operar actualmente?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">
                      Nos permite priorizar en caliente sin necesidad de códigos técnicos complejos.
                    </p>
                  </div>

                  {/* 3 Human-Friendly Impact Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {(Object.keys(IMPACT_MAP) as ImpactLevelKey[]).map((impKey) => {
                      const opt = IMPACT_MAP[impKey];
                      const isSelected = impact === impKey;

                      return (
                        <button
                          key={impKey}
                          type="button"
                          onClick={() => setImpact(impKey)}
                          className={`p-5 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                            isSelected
                              ? `bg-white/[0.07] border-white/40 shadow-[0_0_25px_rgba(0,0,0,0.5)] ring-1 ring-inset ${opt.badgeBg}`
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="text-2xl">{opt.icon}</div>
                            <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                              {opt.label}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono font-light leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-gray-400">Prioridad:</span>
                            <span className="font-bold text-white px-2 py-0.5 rounded bg-white/10">
                              {opt.internalPriority}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Summary Preview Box with Direct Email Notification details */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 font-mono text-xs">
                    <div className="text-gray-400 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Resumen de Envío y Vinculación</span>
                      <span className="text-[#00D1FF] flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        Notificación por Correo
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-[11px] flex items-center gap-2">
                      <span>📨</span>
                      <span>
                        Se despachará una copia ejecutiva a: <strong>ventas@innocentia.tech</strong> y{" "}
                        <strong>ceo.ivan@innocentia.tech</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      <div>
                        <span className="text-gray-500">Proyecto Vinculado:</span> {projectName}
                      </div>
                      <div>
                        <span className="text-gray-500">Módulo:</span> {module}
                      </div>
                      <div>
                        <span className="text-gray-500">Tipo:</span> {CATEGORY_MAP[category].emoji}{" "}
                        {CATEGORY_MAP[category].title}
                      </div>
                      <div>
                        <span className="text-gray-500">Reporta:</span> {reportedBy} ({reporterRole})
                      </div>
                    </div>

                    <div className="text-white font-semibold pt-1 border-t border-white/5">
                      <span className="text-gray-500 font-normal">Título:</span> {title}
                    </div>
                  </div>

                  {/* Navigation & Submit Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF3858] via-[#8A2BE2] to-[#00D1FF] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.5)] hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSendingEmail ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Despachando Correo y Creando Ticket...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Reporte y Notificar por Correo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0B0B14]/90 border border-emerald-500/30 backdrop-blur-2xl text-center space-y-6 animate-fadeIn shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center text-3xl">
                ✓
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  REPORTE REGISTRADO Y DESPACHADO
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-mono">
                  Ticket #{generatedTicketId} Creado
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-mono max-w-xl mx-auto">
                  Vinculado al proyecto: <strong>{projectName}</strong>.
                </p>

                {/* Email dispatch badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Notificación enviada a: <strong>ventas@innocentia.tech</strong> y <strong>ceo.ivan@innocentia.tech</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <a
                  href={`https://wa.me/?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir Resumen por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("board");
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  <span>Ver en el Tablero de Seguimiento</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs transition-all"
                >
                  <span>+ Crear Otro Reporte</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SEGUIMIENTO & TABLERO DE TICKETS */}
      {activeTab === "board" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Metric summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-gray-400">Total Requerimientos</span>
              <div className="text-2xl font-black text-white font-mono">{tickets.length}</div>
              <span className="text-[10px] font-mono text-cyan-400">MultiCommerce &amp; Proyectos</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-gray-400">En Desarrollo / Pruebas</span>
              <div className="text-2xl font-black text-[#00D1FF] font-mono">
                {tickets.filter((t) => t.status === "development" || t.status === "testing").length}
              </div>
              <span className="text-[10px] font-mono text-blue-400">En marcha activa</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-gray-400">Resueltos / Listos</span>
              <div className="text-2xl font-black text-[#10B981] font-mono">
                {tickets.filter((t) => t.status === "resolved").length}
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Versiones liberadas</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-gray-400">Críticos (P0)</span>
              <div className="text-2xl font-black text-[#FF3858] font-mono">
                {tickets.filter((t) => t.impact === "critical").length}
              </div>
              <span className="text-[10px] font-mono text-red-400">Prioridad máxima</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              {/* Search input */}
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por Folio, Título, Proyecto o Módulo..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-xs focus:outline-none focus:border-[#00D1FF]"
                />
              </div>

              {/* Filter by Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#121220] border border-white/10 text-gray-300 font-mono text-xs focus:outline-none focus:border-[#00D1FF]"
              >
                <option value="all">Todos los Estados</option>
                <option value="pending">Pendiente</option>
                <option value="in_review">En revisión</option>
                <option value="development">En desarrollo</option>
                <option value="testing">En pruebas</option>
                <option value="resolved">Resuelto</option>
              </select>

              {/* Filter by Category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#121220] border border-white/10 text-gray-300 font-mono text-xs focus:outline-none focus:border-[#00D1FF]"
              >
                <option value="all">Todas las Categorías</option>
                <option value="bug">🐛 Error / Bug</option>
                <option value="feature">➕ Nueva función</option>
                <option value="improvement">✨ Mejora</option>
                <option value="ux">🎨 Diseño / UX</option>
                <option value="question">❓ Duda</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setFilterModule("all");
                setFilterStatus("all");
                setFilterCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>

          {/* Tickets Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTickets.map((t) => {
              const cat = CATEGORY_MAP[t.category];
              const st = STATUS_MAP[t.status];
              const imp = IMPACT_MAP[t.impact];

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketDetail(t)}
                  className="p-5 rounded-2xl bg-[#0B0B14]/70 border border-white/10 hover:border-[#00D1FF]/40 transition-all duration-300 space-y-3 cursor-pointer group hover:shadow-[0_0_20px_rgba(0,209,255,0.1)] relative"
                >
                  {/* Top Bar: Folio, Module, Category & Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono font-bold text-xs border border-white/15">
                        #{t.id}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-500/20 truncate max-w-[180px]">
                        {t.projectName || t.company}
                      </span>
                      <span className="text-xs font-mono text-gray-400 px-2 py-0.5 rounded bg-white/5">
                        {t.module}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cat.badgeBg}`}
                      >
                        {cat.emoji} {cat.title}
                      </span>

                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${st.badgeBg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dotColor}`} />
                        <span>{st.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Desired result snippet */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono group-hover:text-[#00D1FF] transition-colors line-clamp-1">
                      {t.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 line-clamp-2">
                      <strong className="text-gray-300">Resultado deseado:</strong> {t.desiredResult}
                    </p>
                  </div>

                  {/* Engineering Response or Version badge */}
                  {t.innocentiaResponse && (
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-gray-300 space-y-1">
                      <div className="text-[10px] text-cyan-400 flex items-center justify-between">
                        <span>Respuesta Innocentia:</span>
                        {t.resolvedVersion && (
                          <span className="px-1.5 py-0.2 rounded bg-[#00D1FF]/20 text-[#00D1FF] font-bold">
                            {t.resolvedVersion}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 line-clamp-1">{t.innocentiaResponse}</p>
                    </div>
                  )}

                  {/* Footer info: Reported by, Role & Impact */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <span>👤 {t.reportedBy} {t.reporterRole ? `(${t.reporterRole})` : `(${t.company})`}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{imp.icon} {imp.internalPriority}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTickets.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 font-mono text-gray-400 text-xs">
              No se encontraron requerimientos con los filtros seleccionados.
            </div>
          )}

          {/* Ticket Detail Modal */}
          {selectedTicketDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
              <div className="w-full max-w-2xl rounded-3xl bg-[#0B0B14] border border-white/20 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto font-mono text-xs">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white font-mono">
                        #{selectedTicketDetail.id}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold">
                        {selectedTicketDetail.projectName || selectedTicketDetail.company}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border ${CATEGORY_MAP[selectedTicketDetail.category].badgeBg}`}
                      >
                        {CATEGORY_MAP[selectedTicketDetail.category].emoji}{" "}
                        {CATEGORY_MAP[selectedTicketDetail.category].title}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border ${STATUS_MAP[selectedTicketDetail.status].badgeBg}`}
                      >
                        {STATUS_MAP[selectedTicketDetail.status].label}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {selectedTicketDetail.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTicketDetail(null)}
                    className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 text-gray-300">
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/5">
                    <div>
                      <span className="text-gray-500">Módulo:</span> {selectedTicketDetail.module}
                    </div>
                    <div>
                      <span className="text-gray-500">Empresa:</span> {selectedTicketDetail.company}
                    </div>
                    <div>
                      <span className="text-gray-500">Reporta:</span> {selectedTicketDetail.reportedBy}{" "}
                      {selectedTicketDetail.reporterRole && `(${selectedTicketDetail.reporterRole})`}
                    </div>
                    <div>
                      <span className="text-gray-500">Fecha:</span> {selectedTicketDetail.date}
                    </div>
                  </div>

                  <div>
                    <strong className="text-white block mb-1">¿Qué se desea hacer?</strong>
                    <p className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400">
                      {selectedTicketDetail.whatYouWant}
                    </p>
                  </div>

                  <div>
                    <strong className="text-white block mb-1">¿Cómo esperaba que funcionara?</strong>
                    <p className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400">
                      {selectedTicketDetail.expectedBehavior}
                    </p>
                  </div>

                  <div>
                    <strong className="text-white block mb-1">¿Qué sucede actualmente?</strong>
                    <p className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400">
                      {selectedTicketDetail.currentBehavior}
                    </p>
                  </div>

                  <div>
                    <strong className="text-white block mb-1">Pasos de reproducción:</strong>
                    <p className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400">
                      {selectedTicketDetail.reproductionSteps}
                    </p>
                  </div>

                  <div>
                    <strong className="text-cyan-400 block mb-1">Resultado deseado:</strong>
                    <p className="p-3 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-white font-bold">
                      {selectedTicketDetail.desiredResult}
                    </p>
                  </div>

                  {selectedTicketDetail.innocentiaResponse && (
                    <div>
                      <strong className="text-emerald-400 block mb-1">Respuesta Innocentia &amp; Versión:</strong>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                        {selectedTicketDetail.innocentiaResponse}
                        {selectedTicketDetail.resolvedVersion && (
                          <div className="mt-1 font-bold text-white">
                            Versión Corregida: {selectedTicketDetail.resolvedVersion}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTicketDetail(null)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs"
                  >
                    Cerrar Detalle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VISUALIZADOR DE ARQUITECTURA ERP CONECTADA */}
      {activeTab === "erp_architecture" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B14]/80 border border-white/10 backdrop-blur-2xl space-y-6 animate-fadeIn font-mono">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs text-[#00D1FF] uppercase font-bold tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Visión Sistémica MultiCommerce</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
              Los 6 Sistemas Conectados en una sola Operación
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-2xl">
              El cliente no pide 17 funciones aisladas: describe un ERP unificado. Observa cómo la <strong>Venta #00184</strong> dispara todas las afectaciones en tiempo real:
            </p>
          </div>

          {/* Case Study Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-red-950/40 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded bg-[#00D1FF]/20 text-[#00D1FF] font-bold">
                🧾 VENTA REGISTRADA: #00184
              </span>
              <span className="text-gray-400">Tacos Larry (Sucursal Centro)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-gray-200">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Cliente</span>
                <strong>Juan Pérez</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Vendedor</span>
                <strong>Carlos (Comisión 5%)</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Bodega Salida</span>
                <strong>Bodega Norte</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Repartidor</span>
                <strong>José (Flete: $120)</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Forma de Pago</span>
                <strong>Crédito (Vence 30/09)</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Cuenta Destino</span>
                <strong>BBVA / Saldo CxC</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Productos</span>
                <strong>5 Ítems surtidos</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-gray-500 block text-[10px]">Estatus</span>
                <strong className="text-emerald-400">En Despacho</strong>
              </div>
            </div>
          </div>

          {/* Cascading Subsystems Diagram */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase text-gray-400 font-bold tracking-wider">
              Afectaciones Automáticas en Cadena (6 Subsistemas):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-blue-500/20 space-y-1.5">
                <span className="text-blue-400 text-xs font-bold flex items-center gap-1.5">
                  <span>1. 📦 Inventario y Bodegas</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Descuenta automáticamente 5 productos de <strong>Bodega Norte</strong> y actualiza el kardex sin tocar Bodega Centro.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-purple-500/20 space-y-1.5">
                <span className="text-purple-400 text-xs font-bold flex items-center gap-1.5">
                  <span>2. 👤 Ventas &amp; Comisiones</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Registra la venta a nombre de <strong>Carlos</strong> y suma su comisión al acumulado semanal de nómina.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-amber-500/20 space-y-1.5">
                <span className="text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <span>3. 📑 Clientes &amp; Crédito (CxC)</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Genera la cuenta por cobrar a <strong>Juan Pérez</strong> con fecha límite 30/09/2026 y calendariza alerta de WhatsApp.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/20 space-y-1.5">
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <span>4. 🏦 Caja &amp; Tesorería</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Registra el movimiento programado en <strong>BBVA</strong> y concilia el desglose para el corte de caja diario.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-rose-500/20 space-y-1.5">
                <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5">
                  <span>5. 🛵 Logística &amp; Entregas</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Asigna el envío a <strong>José</strong>, desglosa los $120 de flete y activa la ruta en pantalla de cocina.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-cyan-500/20 space-y-1.5">
                <span className="text-cyan-400 text-xs font-bold flex items-center gap-1.5">
                  <span>6. 📊 Contabilidad General</span>
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Genera el asiento contable en automático: Cargo a CxC / Abono a Ventas e IVA devengado.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
