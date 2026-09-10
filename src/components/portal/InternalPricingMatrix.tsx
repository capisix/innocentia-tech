"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Check,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Globe,
  Crown,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Bot,
  CreditCard,
  Cloud,
  Shield,
  FileText,
} from "../../lib/icons";

interface CustomExtra {
  id: string;
  name: string;
  price: number;
}

export default function InternalPricingMatrix({
  userRole = "socio",
  userName = "Equipo Innocentia",
}: {
  userRole?: string;
  userName?: string;
} = {}) {
  const [activeTab, setActiveTab] = useState<"renta" | "proyecto" | "diseno" | "calculadora" | "reglas">("calculadora");
  const [calcModalidad, setCalcModalidad] = useState<"renta" | "proyecto">("proyecto");
  const [calcTier, setCalcTier] = useState<"esencial" | "conectada" | "avanzada" | "mvp" | "plataforma" | "movil">("mvp");
  const [calcDiseno, setCalcDiseno] = useState<"base" | "personalizado" | "avanzado">("personalizado");
  const [calcClientName, setCalcClientName] = useState("");
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [preloadedLeadNotice, setPreloadedLeadNotice] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Auto-load preloaded lead from localStorage if coming from Mesa de Trabajo
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("innocentia_calculator_lead");
        if (stored) {
          const lead = JSON.parse(stored);
          if (lead && lead.clientName) {
            setCalcClientName(`${lead.clientName} (${lead.clientCompany})`);
            setActiveTab("calculadora");
            if (lead.projectType === "mobile_app") {
              setCalcTier("movil");
            } else if (lead.projectType === "web_platform") {
              setCalcTier("plataforma");
            } else {
              setCalcTier("mvp");
            }
            setPreloadedLeadNotice(`✓ Cotización precargada para ${lead.clientName} (${lead.projectName}).`);
          }
        }
      }
    } catch (err) {
      console.error("Error reading calculator lead:", err);
    }
  }, []);

  // Price Override Mode
  const [isCustomPriceActive, setIsCustomPriceActive] = useState(false);
  const [customBasePriceInput, setCustomBasePriceInput] = useState<string>("");
  const [customMonthlyInput, setCustomMonthlyInput] = useState<string>("");

  // Preset Extras Selected
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({
    whatsapp_bot: false,
    stripe_payments: false,
    cloud_infra: false,
    pwa_mobile: false,
    audit_reports: false,
    support_247: false,
    multi_language: false,
    domain_ssl: false,
  });

  // Custom User-Defined Extras
  const [customExtrasList, setCustomExtrasList] = useState<CustomExtra[]>([]);
  const [newExtraName, setNewExtraName] = useState("");
  const [newExtraPrice, setNewExtraPrice] = useState("");

  // Commercial Discount
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Catalog of standard preset extras
  const presetCatalog = [
    {
      id: "whatsapp_bot",
      name: "Chatbot IA & Conexión WhatsApp Business Oficial",
      price: 18500,
      icon: Bot,
      desc: "Meta Cloud API, respuestas inteligentes 24/7 y captura de leads.",
      tag: "Popular",
    },
    {
      id: "stripe_payments",
      name: "Pasarela de Pagos Stripe / SPEI / Checkout Seguro",
      price: 12000,
      icon: CreditCard,
      desc: "Cobros en línea, suscripciones automáticas y webhooks bancarios.",
      tag: "Fintech",
    },
    {
      id: "cloud_infra",
      name: "Infraestructura Cloud Dedicada & BD Aurora/PostgreSQL",
      price: 15000,
      icon: Cloud,
      desc: "Servidores de alta disponibilidad, réplicas y SSL empresarial.",
      tag: "Cloud",
    },
    {
      id: "pwa_mobile",
      name: "Módulo App Móvil PWA con Notificaciones Push",
      price: 24000,
      icon: Smartphone,
      desc: "Acceso instalable en iOS y Android con notificaciones directas.",
      tag: "Mobile",
    },
    {
      id: "audit_reports",
      name: "Panel de Auditoría Inmutable & Reportes PDF Ejecutivos",
      price: 14000,
      icon: FileText,
      desc: "Trazabilidad de movimientos con filtros y generación de PDF formal.",
      tag: "Seguridad",
    },
    {
      id: "support_247",
      name: "Póliza de Soporte Prioritario 24/7 & Mantenimiento Anual",
      price: 28000,
      icon: Shield,
      desc: "SLA de respuesta < 2 horas, monitoreo de caídas y backups diarios.",
      tag: "Garantía",
    },
    {
      id: "multi_language",
      name: "Módulo Multi-Idioma Dinámico (Español / Inglés)",
      price: 9500,
      icon: Globe,
      desc: "Internacionalización de plataforma con switch de idioma en tiempo real.",
      tag: "Global",
    },
    {
      id: "domain_ssl",
      name: "Dominio Corporativo .tech/.com, DNS & Certificado SSL",
      price: 4500,
      icon: ShieldCheck,
      desc: "Configuración integral de DNS, registros SPF/DKIM y seguridad Web.",
      tag: "Dominio",
    },
  ];

  // Calculate standard formula base cost
  let autoImplCost = 0;
  let autoMonthlyCost = 0;
  let disenoExtra = 0;

  if (calcModalidad === "renta") {
    if (calcTier === "esencial") {
      autoImplCost = 15000;
      autoMonthlyCost = 2500;
    } else if (calcTier === "conectada") {
      autoImplCost = 28000;
      autoMonthlyCost = 4500;
    } else {
      autoImplCost = 65000;
      autoMonthlyCost = 9500;
    }
  } else {
    if (calcTier === "esencial" || calcTier === "mvp") {
      autoImplCost = 120000;
      autoMonthlyCost = 0;
    } else if (calcTier === "conectada" || calcTier === "plataforma") {
      autoImplCost = 250000;
      autoMonthlyCost = 0;
    } else {
      autoImplCost = 450000;
      autoMonthlyCost = 0;
    }
  }

  if (calcDiseno === "personalizado") {
    disenoExtra = 22000;
  } else if (calcDiseno === "avanzado") {
    disenoExtra = 45000;
  }

  // Base costs after manual override (if enabled)
  const basePrice =
    isCustomPriceActive && customBasePriceInput !== "" && !isNaN(Number(customBasePriceInput))
      ? Number(customBasePriceInput)
      : autoImplCost;

  const monthlyPrice =
    isCustomPriceActive && customMonthlyInput !== "" && !isNaN(Number(customMonthlyInput))
      ? Number(customMonthlyInput)
      : autoMonthlyCost;

  // Calculate preset extras cost
  const presetExtrasCost = presetCatalog.reduce((acc, extra) => {
    return selectedExtras[extra.id] ? acc + extra.price : acc;
  }, 0);

  // Calculate custom extras cost
  const customExtrasCost = customExtrasList.reduce((acc, item) => acc + item.price, 0);
  const totalExtrasCost = presetExtrasCost + customExtrasCost;

  // Subtotal before discount
  const subtotalInvestment = basePrice + disenoExtra + totalExtrasCost;

  // Discount calculation
  const discountAmount = Math.round(subtotalInvestment * (discountPercent / 100));
  const finalTotal = Math.max(0, subtotalInvestment - discountAmount);

  // Seller commission calculation (15% on final total)
  const comisionVendedor = Math.round(finalTotal * 0.15);

  // Toggle Preset Extra
  const togglePresetExtra = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Add Custom Extra
  const handleAddCustomExtra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExtraName.trim() || !newExtraPrice || isNaN(Number(newExtraPrice))) return;

    const newExtra: CustomExtra = {
      id: "CUST-" + Date.now(),
      name: newExtraName.trim(),
      price: Number(newExtraPrice),
    };

    setCustomExtrasList((prev) => [...prev, newExtra]);
    setNewExtraName("");
    setNewExtraPrice("");
  };

  // Remove Custom Extra
  const handleRemoveCustomExtra = (id: string) => {
    setCustomExtrasList((prev) => prev.filter((item) => item.id !== id));
  };

  // Copy Full Quote Proposal
  const handleCopyQuote = () => {
    const activePresetExtras = presetCatalog.filter((e) => selectedExtras[e.id]);
    const allActiveExtras = [
      ...activePresetExtras.map((e) => `• ${e.name}: +$${e.price.toLocaleString()} MXN`),
      ...customExtrasList.map((e) => `• ${e.name} (A la medida): +$${e.price.toLocaleString()} MXN`),
    ];

    const text =
      `*═══════════════════════════════════════════*\n` +
      `*PROPUESTA DE DESARROLLO TECNOLÓGICO — INNOCENTIA TECH*\n` +
      `*═══════════════════════════════════════════*\n\n` +
      `👤 *Cliente / Empresa:* ${calcClientName || "Cliente Prospecto"}\n` +
      `📅 *Fecha de Emisión:* ${new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}\n` +
      `💼 *Asesor / Socio:* ${userName} (${userRole.toUpperCase()})\n\n` +
      `*1. MODALIDAD Y ALCANCE:*\n` +
      `• *Modalidad:* ${calcModalidad === "renta" ? "SaaS / Renta con Implementación Base" : "Desarrollo por Proyecto a Medida (Código Propio)"}\n` +
      `• *Nivel Tecnológico:* ${calcTier.toUpperCase()}\n` +
      `• *Diseño UI/UX:* ${calcDiseno === "base" ? "Identidad Adaptada (Incluida)" : calcDiseno === "personalizado" ? "Diseño Personalizado en Figma (+$22,000 MXN)" : "Experiencia de Marca Avanzada 60FPS (+$45,000 MXN)"}\n\n` +
      (allActiveExtras.length > 0
        ? `*2. EXTRAS & MÓDULOS ADICIONALES INCLUIDOS:*\n${allActiveExtras.join("\n")}\n\n`
        : "") +
      `*3. RESUMEN DE INVERSIÓN (MXN antes de IVA):*\n` +
      `• *Precio Base:* $${basePrice.toLocaleString()} MXN ${isCustomPriceActive ? "(Ajuste personalizado)" : ""}\n` +
      (disenoExtra > 0 ? `• *Diseño UI/UX:* +$${disenoExtra.toLocaleString()} MXN\n` : "") +
      (totalExtrasCost > 0 ? `• *Total de Extras:* +$${totalExtrasCost.toLocaleString()} MXN\n` : "") +
      (discountPercent > 0 ? `• *Descuento Comercial (${discountPercent}%):* -$${discountAmount.toLocaleString()} MXN\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      (calcModalidad === "renta"
        ? `🔥 *INVERSIÓN TOTAL IMPLEMENTACIÓN:* $${finalTotal.toLocaleString()} MXN\n` +
          `🔄 *RENTA MENSUAL DE SERVICIO:* $${monthlyPrice.toLocaleString()} MXN/mes\n`
        : `🔥 *INVERSIÓN TOTAL DEL PROYECTO:* $${finalTotal.toLocaleString()} MXN\n` +
          `💳 *Esquema de Pago:* 50% anticipo al iniciar, 30% al sprint medio, 20% contra entrega final.\n`) +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*4. BENEFICIOS Y GARANTÍAS INCLUIDAS:*\n` +
      `✓ Arquitectura de software moderna y optimizada (Next.js / TypeScript / Tailwind CSS)\n` +
      `✓ Panel de administración web responsivo para métricas y control\n` +
      `✓ Seguridad de grado bancario SSL 256-bit y respaldos continuos\n` +
      `✓ Soporte técnico directo del equipo de ingeniería de Innocentia Tech\n\n` +
      `_Nota: Los consumos de APIs externas de IA (OpenAI) y WhatsApp Business se facturan según volumen._\n\n` +
      `🌐 *Web:* https://innocentia.tech\n` +
      `📱 *WhatsApp Oficial:* +52 960 177 1556\n` +
      `📧 *Contacto:* ventas@innocentia.tech`;

    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 3500);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-[#07070E] border border-white/15 space-y-6 text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>TABULADOR OFICIAL DE PRECIOS & COTIZACIONES — EQUIPO INTERNO</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>Guía de Cotizaciones para México (Pymes & Empresas)</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Estructura base de precios en MXN (antes de IVA) para asesores comerciales, socios y directores.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("renta")}
          className={"px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 " + (activeTab === "renta" ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10")}
        >
          <Layers className="w-4 h-4" />
          <span>1. Renta Mensual (SaaS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("proyecto")}
          className={"px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 " + (activeTab === "proyecto" ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10")}
        >
          <Briefcase className="w-4 h-4" />
          <span>2. Desarrollo a Medida</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("diseno")}
          className={"px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 " + (activeTab === "diseno" ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10")}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. Cobro de Diseño UI/UX</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calculadora")}
          className={"px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 " + (activeTab === "calculadora" ? "bg-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10")}
        >
          <TrendingUp className="w-4 h-4" />
          <span>4. Calculadora de Cotización</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reglas")}
          className={"px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 " + (activeTab === "reglas" ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]" : "bg-white/5 text-gray-400 hover:text-white border border-white/10")}
        >
          <AlertCircle className="w-4 h-4" />
          <span>5. Reglas & Delimitaciones</span>
        </button>
      </div>

      {activeTab === "renta" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-300 font-mono">
            💡 <strong>Modelo Renta:</strong> Plataforma base reutilizable adaptada a la marca del cliente. Requiere cobro inicial de implementación.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 text-gray-400 uppercase">
                  <th className="py-3 px-3">Variante</th>
                  <th className="py-3 px-3">Alcance & Funciones</th>
                  <th className="py-3 px-3 text-right">Implementación Inicial</th>
                  <th className="py-3 px-3 text-right">Renta Mensual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">Esencial</span>
                    <span className="text-[10px] text-gray-400">Microempresas / Locales</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    Identidad del negocio, catálogo o agenda, panel básico de administración.
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-300">
                    $8,000 – $18,000 MXN
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                    $1,500 – $3,000 MXN/mes
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">Conectada</span>
                    <span className="text-[10px] text-[#00D1FF]">Pymes / Consultorios</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    Reservas en línea, roles de usuario, notificaciones por WhatsApp/Email e integraciones estándar.
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-300">
                    $18,000 – $40,000 MXN
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                    $3,500 – $7,000 MXN/mes
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">Avanzada</span>
                    <span className="text-[10px] text-purple-400">Empresas Medianas</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    Procesos propios del negocio, automatizaciones complejas, reportes contables y analítica de datos.
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-300">
                    $40,000 – $90,000 MXN
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                    $8,000 – $15,000+ MXN/mes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "proyecto" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-300 font-mono">
            🏗️ <strong>Desarrollo por Proyecto:</strong> Software a la medida con entrega de propiedad intelectual o código fuente final al liquidar.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 text-gray-400 uppercase">
                  <th className="py-3 px-3">Variante</th>
                  <th className="py-3 px-3">Descripción Técnica</th>
                  <th className="py-3 px-3 text-right">Precio Orientativo (MXN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-bold text-white">Adaptación de Base Existente</td>
                  <td className="py-3.5 px-3 text-gray-300">Base probada con diseño de marca exclusivo y ajustes visuales.</td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">$30,000 – $65,000</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-bold text-white">MVP a Medida</td>
                  <td className="py-3.5 px-3 text-gray-300">Experiencia propia, arquitectura escalable y funciones delimitadas de lanzamiento.</td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">$80,000 – $180,000</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-bold text-white">Plataforma Completa</td>
                  <td className="py-3.5 px-3 text-gray-300">Múltiples roles, pasarelas de pago (Stripe), WebSockets e integraciones API.</td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">$180,000 – $400,000</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-bold text-white">Producto Complejo & Apps Móviles</td>
                  <td className="py-3.5 px-3 text-gray-300">Publicación nativa en iOS (App Store) y Android (Google Play), backend distribuido y operación avanzada.</td>
                  <td className="py-3.5 px-3 text-right font-bold text-purple-400">Desde $400,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "diseno" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-300 font-mono">
            🎨 <strong>Estructura de Diseño:</strong> Se separa en la cotización para que el cliente entienda el valor del diseño de experiencia táctil e ingeniería visual.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Nivel 1</span>
              <h3 className="text-sm font-black text-white">Identidad Adaptada</h3>
              <p className="text-xs text-gray-400">
                Logotipo, colores corporativos y tipografía adaptados sobre el sistema base de componentes.
              </p>
              <span className="text-xs font-mono font-bold text-emerald-300 block pt-2">
                ✅ Incluida en paquete base
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/30 space-y-2">
              <span className="text-[10px] font-mono text-[#00D1FF] font-bold uppercase block">Nivel 2</span>
              <h3 className="text-sm font-black text-white">Diseño Personalizado</h3>
              <p className="text-xs text-gray-400">
                Investigación breve, arquitectura de información, wireframes, flujos de usuario y prototipo interactivo Figma.
              </p>
              <span className="text-xs font-mono font-bold text-[#00D1FF] block pt-2">
                +$12,000 – $35,000 adicionales
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-purple-500/30 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Nivel 3</span>
              <h3 className="text-sm font-black text-white">Experiencia Avanzada 60FPS</h3>
              <p className="text-xs text-gray-400">
                Ilustraciones personalizadas, avatares sensoriales, motion graphics a 60FPS y microinteracciones táctiles.
              </p>
              <span className="text-xs font-mono font-bold text-purple-300 block pt-2">
                Desde +$35,000 adicionales
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CALCULADORA DE COTIZACIÓN INTERACTIVA (CON EDICIÓN DE PRECIO Y EXTRAS) */}
      {activeTab === "calculadora" && (
        <div className="space-y-4">
          {/* Recent Form Lead Quick-Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-black/80 to-[#00D1FF]/10 border border-[#00D1FF]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center flex-shrink-0 text-lg">
                📋
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 font-bold">
                    SOLICITUD RECIENTE • PROJ-592160
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    9 Sep 2026
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Daniel Torre de Haro • <span className="text-gray-300">Pro Acabados</span>
                </h4>
                <p className="text-[11px] font-mono text-gray-400">
                  App de Pedidos y Entregas • Asesor: Carlos Mendoza (VEN-CARLOS-202)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>👁️ Ver Ficha Oficial</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCalcClientName("Daniel Torre de Haro (Pro Acabados)");
                  setCalcModalidad("proyecto");
                  setCalcTier("mvp");
                  setCalcDiseno("personalizado");
                  setSelectedExtras({
                    whatsapp_bot: true,
                    stripe_payments: true,
                    cloud_infra: false,
                    pwa_mobile: false,
                    audit_reports: false,
                    support_247: false,
                    multi_language: false,
                    domain_ssl: false,
                  });
                  setPreloadedLeadNotice("✓ Requerimientos de Daniel Torre (Pro Acabados) cargados en la calculadora.");
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] hover:scale-105 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Cargar en Cotizador</span>
              </button>
            </div>
          </div>

          {preloadedLeadNotice && (
            <div className="p-3.5 rounded-2xl bg-[#00D1FF]/15 border border-[#00D1FF]/40 text-[#00D1FF] text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                <span>{preloadedLeadNotice} Puedes ajustar el nivel tecnológico, alcance de diseño y módulos adicionales abajo.</span>
              </div>
              <button
                type="button"
                onClick={() => setPreloadedLeadNotice(null)}
                className="text-xs text-gray-400 hover:text-white cursor-pointer ml-3"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            {/* LEFT COLUMN: CONTROLS, PRICE OVERRIDE & EXTRAS BUILDER */}
            <div className="lg:col-span-7 space-y-5">
              {/* 1. Prospect Info */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <label className="block text-xs font-mono text-gray-300 font-bold">
                Nombre del Cliente / Empresa Prospecto:
              </label>
              <input
                type="text"
                value={calcClientName}
                onChange={(e) => setCalcClientName(e.target.value)}
                placeholder="ej: Clínica Médica AI / Dr. Roberto / Grupo Horizon"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
              />
            </div>

            {/* 2. Base Configuration */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                Configuración Base de Software:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Modalidad:</label>
                  <select
                    value={calcModalidad}
                    onChange={(e) => setCalcModalidad(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                  >
                    <option value="proyecto">Desarrollo por Proyecto (Propio)</option>
                    <option value="renta">Renta Mensual (SaaS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Nivel Tecnológico:</label>
                  <select
                    value={calcTier}
                    onChange={(e) => setCalcTier(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                  >
                    {calcModalidad === "renta" ? (
                      <>
                        <option value="esencial">Esencial ($15k / $2.5k mes)</option>
                        <option value="conectada">Conectada Pyme ($28k / $4.5k mes)</option>
                        <option value="avanzada">Avanzada ($65k / $9.5k mes)</option>
                      </>
                    ) : (
                      <>
                        <option value="mvp">MVP a Medida ($80k - $180k)</option>
                        <option value="plataforma">Plataforma Multi-Rol ($180k - $400k)</option>
                        <option value="movil">App Móvil iOS/Android (+$400k)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Alcance de Diseño UI/UX:</label>
                <select
                  value={calcDiseno}
                  onChange={(e) => setCalcDiseno(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                >
                  <option value="base">Identidad Adaptada (Incluida en paquete base)</option>
                  <option value="personalizado">Diseño Personalizado Figma (+$22,000 MXN)</option>
                  <option value="avanzado">Experiencia de Marca Avanzada 60FPS (+$45,000 MXN)</option>
                </select>
              </div>
            </div>

            {/* 3. EDITAR PRECIO / AJUSTE MANUAL (FEATURE) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 to-black/40 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Ajustar / Editar Precio Base Manualmente
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCustomPriceActive}
                    onChange={(e) => {
                      setIsCustomPriceActive(e.target.checked);
                      if (e.target.checked && customBasePriceInput === "") {
                        setCustomBasePriceInput(String(autoImplCost));
                        if (calcModalidad === "renta") setCustomMonthlyInput(String(autoMonthlyCost));
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {isCustomPriceActive ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-purple-500/20 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-[11px] font-mono text-purple-300 mb-1">
                      {calcModalidad === "renta" ? "Costo Implementación Inicial (MXN):" : "Inversión Base Proyecto (MXN):"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs font-mono text-gray-400">$</span>
                      <input
                        type="number"
                        value={customBasePriceInput}
                        onChange={(e) => setCustomBasePriceInput(e.target.value)}
                        placeholder={String(autoImplCost)}
                        className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-black/80 border border-purple-500/50 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {calcModalidad === "renta" && (
                    <div>
                      <label className="block text-[11px] font-mono text-purple-300 mb-1">
                        Renta Mensual SaaS (MXN/mes):
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs font-mono text-gray-400">$</span>
                        <input
                          type="number"
                          value={customMonthlyInput}
                          onChange={(e) => setCustomMonthlyInput(e.target.value)}
                          placeholder={String(autoMonthlyCost)}
                          className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-black/80 border border-purple-500/50 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2 flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1">
                    <span>💡 Precio tabulador automático: ${autoImplCost.toLocaleString()} MXN</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomBasePriceInput(String(autoImplCost));
                        setCustomMonthlyInput(String(autoMonthlyCost));
                      }}
                      className="text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Revertir a Tabulador</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] font-mono text-gray-400">
                  Calculando automáticamente con tabulador oficial (${autoImplCost.toLocaleString()} MXN). Activa el interruptor para ingresar un monto específico negociado.
                </p>
              )}
            </div>

            {/* 4. AGREGAR EXTRAS & COMPLEMENTOS (FEATURE) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-[#00D1FF]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Extras & Módulos Adicionales ({presetCatalog.filter((e) => selectedExtras[e.id]).length + customExtrasList.length})
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00D1FF]">
                  +${totalExtrasCost.toLocaleString()} MXN
                </span>
              </div>

              {/* Preset Extras List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {presetCatalog.map((extra) => {
                  const IconComponent = extra.icon;
                  const isChecked = !!selectedExtras[extra.id];

                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => togglePresetExtra(extra.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isChecked
                          ? "bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.15)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isChecked ? "bg-[#00D1FF] text-black" : "bg-white/5 text-gray-400"
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold text-white leading-snug">{extra.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 accent-[#00D1FF] pointer-events-none"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono mt-1 pt-1.5 border-t border-white/5">
                        <span className="text-gray-400">{extra.desc}</span>
                        <span className={`font-bold ml-2 whitespace-nowrap ${isChecked ? "text-[#00D1FF]" : "text-emerald-400"}`}>
                          +${extra.price.toLocaleString()} MXN
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Extras Added List */}
              {customExtrasList.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-amber-300 uppercase font-bold block">
                    Extras Personalizados a la Medida:
                  </span>
                  <div className="space-y-1.5">
                    {customExtrasList.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-amber-200 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">+${item.price.toLocaleString()} MXN</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomExtra(item.id)}
                            className="text-rose-400 hover:text-rose-200 p-1 cursor-pointer transition-colors"
                            title="Eliminar extra"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Extra Form */}
              <form
                onSubmit={handleAddCustomExtra}
                className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2.5"
              >
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                  ➕ Agregar Extra a la Medida (Personalizado):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={newExtraName}
                    onChange={(e) => setNewExtraName(e.target.value)}
                    placeholder="Concepto (ej: Conexión ERP SAP / Facturación SAT 4.0)"
                    className="sm:col-span-7 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                  />
                  <div className="sm:col-span-3 relative">
                    <span className="absolute left-2.5 top-1.5 text-xs font-mono text-gray-400">$</span>
                    <input
                      type="number"
                      value={newExtraPrice}
                      onChange={(e) => setNewExtraPrice(e.target.value)}
                      placeholder="Precio MXN"
                      className="w-full pl-6 pr-2 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newExtraName.trim() || !newExtraPrice}
                    className="sm:col-span-2 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-mono font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 5. Descuento Comercial Opcional */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                Descuento Comercial Autorizado:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {[0, 5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDiscountPercent(pct)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      discountPercent === pct
                        ? pct === 0
                          ? "bg-white text-black shadow-md"
                          : "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                        : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {pct === 0 ? "0% (Regular)" : `-${pct}% Descuento`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE QUOTE SUMMARY & PROPOSAL GENERATOR */}
          <div className="lg:col-span-5 p-6 rounded-[28px] bg-gradient-to-b from-white/[0.04] to-black/80 border border-[#00D1FF]/40 space-y-5 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              {/* Header Box */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
                    Cotización Estimada en Tiempo Real
                  </span>
                  {isCustomPriceActive && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                      ✏️ Precio Editado
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {calcClientName || "Cliente Prospecto"}
                </h3>
                <span className="text-xs font-mono text-gray-400 block mt-0.5">
                  Modalidad: <strong>{calcModalidad === "renta" ? "SaaS / Renta" : "Desarrollo por Proyecto"}</strong> • {calcTier.toUpperCase()}
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-1">
                    <span>Base de Software:</span>
                    {isCustomPriceActive && <span className="text-[10px] text-purple-400">(manual)</span>}
                  </span>
                  <strong className="text-white">${basePrice.toLocaleString()} MXN</strong>
                </div>

                {disenoExtra > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Diseño UI/UX ({calcDiseno}):</span>
                    <strong className="text-[#00D1FF]">+${disenoExtra.toLocaleString()} MXN</strong>
                  </div>
                )}

                {/* Extras Items */}
                {totalExtrasCost > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 my-2">
                    <div className="flex justify-between text-[11px] font-bold text-gray-300">
                      <span>Módulos Extras ({presetCatalog.filter((e) => selectedExtras[e.id]).length + customExtrasList.length}):</span>
                      <span className="text-emerald-400">+${totalExtrasCost.toLocaleString()} MXN</span>
                    </div>
                    <div className="space-y-1 pt-1 max-h-36 overflow-y-auto scrollbar-none">
                      {presetCatalog
                        .filter((e) => selectedExtras[e.id])
                        .map((extra) => (
                          <div key={extra.id} className="flex justify-between text-[10px] text-gray-400">
                            <span className="truncate pr-2">• {extra.name}</span>
                            <span className="text-gray-300 font-mono flex-shrink-0">+${extra.price.toLocaleString()}</span>
                          </div>
                        ))}
                      {customExtrasList.map((item) => (
                        <div key={item.id} className="flex justify-between text-[10px] text-amber-300">
                          <span className="truncate pr-2">• {item.name}</span>
                          <span className="font-mono flex-shrink-0">+${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between pt-1 text-gray-400">
                  <span>Subtotal Inversión:</span>
                  <span className="text-gray-200">${subtotalInvestment.toLocaleString()} MXN</span>
                </div>

                {/* Discount */}
                {discountPercent > 0 && (
                  <div className="flex justify-between text-rose-400 font-bold">
                    <span>Descuento Comercial (-{discountPercent}%):</span>
                    <span>-${discountAmount.toLocaleString()} MXN</span>
                  </div>
                )}

                {/* Final Inversion Highlight */}
                <div className="pt-3 border-t border-white/15 space-y-1">
                  {calcModalidad === "renta" ? (
                    <>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gray-300 uppercase font-bold">Implementación Inicial:</span>
                        <strong className="text-xl font-black text-amber-300 font-mono">
                          ${finalTotal.toLocaleString()} MXN
                        </strong>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-xs text-gray-300 uppercase font-bold">Renta Mensual SaaS:</span>
                        <strong className="text-xl font-black text-emerald-400 font-mono">
                          ${monthlyPrice.toLocaleString()} MXN/mes
                        </strong>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-gray-300 uppercase font-bold">Inversión Final Proyecto:</span>
                      <strong className="text-2xl font-black text-emerald-400 font-mono">
                        ${finalTotal.toLocaleString()} MXN
                      </strong>
                    </div>
                  )}
                </div>

                {/* Seller Commission Highlight */}
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs font-mono mt-3">
                  <span className="text-rose-300 font-bold flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#FF3858]" />
                    Comisión Vendedor (15%):
                  </span>
                  <span className="text-[#FF3858] text-base font-black font-mono">
                    ${comisionVendedor.toLocaleString()} MXN
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button: Copy Formal Proposal */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,56,88,0.3)]"
              >
                {copiedQuote ? <Check className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span>{copiedQuote ? "¡Propuesta Copiada al Portapapeles!" : "Copiar Propuesta para Cliente"}</span>
              </button>
              <span className="text-[10px] font-mono text-gray-400 text-center block">
                Formato listo para pegar directamente en WhatsApp, Email o Propuesta Comercial.
              </span>
            </div>
          </div>
        </div>
        </div>
      )}

      {activeTab === "reglas" && (
        <div className="space-y-3 text-xs font-mono text-gray-300">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              1. Consumos de Terceros (IA, WhatsApp & SMS)
            </h4>
            <p className="text-gray-400">
              Las mensualidades no absorben consumo ilimitado. Los tokens de OpenAI y conversaciones de WhatsApp Business se cobran por consumo o con tarjeta directa del cliente.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              2. Código Fuente & Propiedad Intelectual
            </h4>
            <p className="text-gray-400">
              En modalidad Renta, el código es propiedad exclusiva de Innocentia Tech (el cliente puede exportar sus datos). En modalidad Proyecto, el cliente recibe el repositorio al liquidar el 100%.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D1FF]" />
              3. Alcance de Soporte Técnico
            </h4>
            <p className="text-gray-400">
              El soporte incluye mantenimiento preventivo, corrección de bugs y monitoreo de servidores. Nuevos módulos o rediseños completos se cotizan por sprint independiente.
            </p>
          </div>
        </div>
      )}

      {/* Lead Details Modal for PROJ-592160 */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#07070E] border border-white/20 rounded-[32px] p-6 sm:p-8 space-y-5 my-auto text-left shadow-[0_0_80px_rgba(0,209,255,0.2)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold mb-1">
                  <span>✓ FORMULARIO ENVIADO & VINCULADO</span>
                </div>
                <h3 className="text-lg font-black text-white uppercase">
                  Ficha Oficial de Proyecto • Folio: PROJ-592160
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  ID Cliente: CLI-72746 • Fecha: 9 de Septiembre de 2026
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs font-mono">
              {/* Cliente & Asesor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-bold">Cliente Registrado:</span>
                  <p className="text-sm font-bold text-white mt-0.5">Daniel Torre de Haro</p>
                  <p className="text-gray-300">Empresa: <strong>Pro Acabados</strong></p>
                  <p className="text-[#00D1FF]">📱 WhatsApp: 9902302124</p>
                  <p className="text-gray-400">✉️ pro.acabados.mx@gmail.com</p>
                  <p className="text-gray-400">📍 Mérida / Yucatán / México</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-bold">Asesor Comercial Vinculado:</span>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">Carlos Mendoza</p>
                  <p className="text-gray-300">Código: <strong>VEN-CARLOS-202</strong></p>
                  <p className="text-gray-400">Atribución: Bolsa 20% Máx (24 Meses)</p>
                  <p className="text-emerald-400 mt-2">Status: 🟢 Nueva Solicitud</p>
                </div>
              </div>

              {/* Proyecto & Requerimientos */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Detalles del Proyecto:</span>
                <p className="text-sm font-bold text-white">App de Pedidos y entregas de producto</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
                    Plataforma Web / SaaS
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                    Presupuesto: $50,000 - $150,000 MXN
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 text-[10px]">
                    Plazo: 1 a 3 meses (Completo)
                  </span>
                </div>
              </div>

              {/* Módulos Solicitados */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Módulos & Alcance Solicitado:</span>
                <ul className="space-y-1 text-gray-300">
                  <li>✓ 🎨 Diseño UI/UX interactivo de alta fidelidad en Figma (Sofía)</li>
                  <li>✓ 🎬 Microanimaciones e interfaz fluida a 60fps</li>
                  <li>✓ 🔐 Autenticación y base de datos PostgreSQL cifrada</li>
                  <li>✓ 💳 Pasarela de pagos en línea (Stripe / MercadoPago)</li>
                  <li>✓ 📍 Rastreo GPS en vivo y WebSockets en tiempo real</li>
                  <li>✓ 🤖 Integración de IA conversacional (OpenAI / Claude)</li>
                  <li>✓ 📲 Notificaciones automáticas por WhatsApp API</li>
                  <li>✓ 📊 Panel administrativo con métricas y exportación de datos</li>
                </ul>
              </div>

              {/* Descripción Textual */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Descripción del Cliente:</span>
                <p className="text-gray-200 italic">
                  "Atención al cliente, manejo de cotizaciones y formulario de pedidos, cobro de pedidos, reparto de comisiones."
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
              <a
                href="https://wa.me/529902302124?text=Hola%20Daniel,%20recibimos%20tu%20solicitud%20para%20el%20proyecto%20de%20App%20de%20Pedidos%20en%20Innocentia%20Tech."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
              >
                <span>💬 Abrir WhatsApp con Daniel</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setCalcClientName("Daniel Torre de Haro (Pro Acabados)");
                  setCalcModalidad("proyecto");
                  setCalcTier("mvp");
                  setCalcDiseno("personalizado");
                  setSelectedExtras({
                    whatsapp_bot: true,
                    stripe_payments: true,
                    cloud_infra: false,
                    pwa_mobile: false,
                    audit_reports: false,
                    support_247: false,
                    multi_language: false,
                    domain_ssl: false,
                  });
                  setPreloadedLeadNotice("✓ Requerimientos de Daniel Torre (Pro Acabados) cargados en la calculadora.");
                  setIsLeadModalOpen(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cargar en Cotizador & Calcular</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
