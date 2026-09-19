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
import { ProposalDispatchModal } from "./ProposalDispatchModal";
import { ProjectPdfData } from "../../lib/generateProjectPdf";

interface CustomExtra {
  id: string;
  name: string;
  price: number;
}

const DEFAULT_EXTRAS_PRICES: { [key: string]: number } = {
  whatsapp_bot: 18500,
  stripe_payments: 12000,
  cloud_infra: 15000,
  pwa_mobile: 24000,
  audit_reports: 14000,
  support_247: 28000,
  multi_language: 9500,
  domain_ssl: 4500,
};

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
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchProposalData, setDispatchProposalData] = useState<ProjectPdfData | null>(null);

  // Price Overrides (null means use established catalog price)
  const [customBasePrice, setCustomBasePrice] = useState<number | null>(null);
  const [customMonthlyPrice, setCustomMonthlyPrice] = useState<number | null>(null);
  const [customDesignPrice, setCustomDesignPrice] = useState<number | null>(null);

  // Individual Module Prices (Default to catalog established prices, editable individually)
  const [extraPrices, setExtraPrices] = useState<{ [key: string]: number }>(DEFAULT_EXTRAS_PRICES);

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

  // Catalog of standard preset extras
  const presetCatalog = [
    {
      id: "whatsapp_bot",
      name: "Chatbot IA & Conexión WhatsApp Business Oficial",
      defaultPrice: DEFAULT_EXTRAS_PRICES.whatsapp_bot,
      icon: Bot,
      desc: "Meta Cloud API, respuestas inteligentes 24/7 y captura de leads.",
      tag: "Popular",
    },
    {
      id: "stripe_payments",
      name: "Pasarela de Pagos Stripe / SPEI / Checkout Seguro",
      defaultPrice: DEFAULT_EXTRAS_PRICES.stripe_payments,
      icon: CreditCard,
      desc: "Cobros en línea, suscripciones automáticas y webhooks bancarios.",
      tag: "Fintech",
    },
    {
      id: "cloud_infra",
      name: "Infraestructura Cloud Dedicada & BD Aurora/PostgreSQL",
      defaultPrice: DEFAULT_EXTRAS_PRICES.cloud_infra,
      icon: Cloud,
      desc: "Servidores de alta disponibilidad, réplicas y SSL empresarial.",
      tag: "Cloud",
    },
    {
      id: "pwa_mobile",
      name: "Módulo App Móvil PWA con Notificaciones Push",
      defaultPrice: DEFAULT_EXTRAS_PRICES.pwa_mobile,
      icon: Smartphone,
      desc: "Acceso instalable en iOS y Android con notificaciones directas.",
      tag: "Mobile",
    },
    {
      id: "audit_reports",
      name: "Panel de Auditoría Inmutable & Reportes PDF Ejecutivos",
      defaultPrice: DEFAULT_EXTRAS_PRICES.audit_reports,
      icon: FileText,
      desc: "Trazabilidad de movimientos con filtros y generación de PDF formal.",
      tag: "Seguridad",
    },
    {
      id: "support_247",
      name: "Póliza de Soporte Prioritario 24/7 & Mantenimiento Anual",
      defaultPrice: DEFAULT_EXTRAS_PRICES.support_247,
      icon: Shield,
      desc: "SLA de respuesta < 2 horas, monitoreo de caídas y backups diarios.",
      tag: "Garantía",
    },
    {
      id: "multi_language",
      name: "Módulo Multi-Idioma Dinámico (Español / Inglés)",
      defaultPrice: DEFAULT_EXTRAS_PRICES.multi_language,
      icon: Globe,
      desc: "Internacionalización de plataforma con switch de idioma en tiempo real.",
      tag: "Global",
    },
    {
      id: "domain_ssl",
      name: "Dominio Corporativo .tech/.com, DNS & Certificado SSL",
      defaultPrice: DEFAULT_EXTRAS_PRICES.domain_ssl,
      icon: ShieldCheck,
      desc: "Configuración integral de DNS, registros SPF/DKIM y seguridad Web.",
      tag: "Dominio",
    },
  ];

  // Calculate standard formula base cost
  let autoImplCost = 0;
  let autoMonthlyCost = 0;
  let autoDesignCost = 0;

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
    autoDesignCost = 22000;
  } else if (calcDiseno === "avanzado") {
    autoDesignCost = 45000;
  } else {
    autoDesignCost = 0;
  }

  // Effective prices (custom override or default established)
  const basePrice = customBasePrice !== null ? customBasePrice : autoImplCost;
  const monthlyPrice = customMonthlyPrice !== null ? customMonthlyPrice : autoMonthlyCost;
  const designPrice = customDesignPrice !== null ? customDesignPrice : autoDesignCost;

  const isBasePriceEdited = customBasePrice !== null && customBasePrice !== autoImplCost;
  const isMonthlyPriceEdited = calcModalidad === "renta" && customMonthlyPrice !== null && customMonthlyPrice !== autoMonthlyCost;
  const isDesignPriceEdited = customDesignPrice !== null && customDesignPrice !== autoDesignCost;

  // Calculate preset extras cost with individual custom/default prices
  const presetExtrasCost = presetCatalog.reduce((acc, extra) => {
    const currentPrice = extraPrices[extra.id] !== undefined ? extraPrices[extra.id] : extra.defaultPrice;
    return selectedExtras[extra.id] ? acc + currentPrice : acc;
  }, 0);

  // Calculate custom extras cost
  const customExtrasCost = customExtrasList.reduce((acc, item) => acc + item.price, 0);
  const totalExtrasCost = presetExtrasCost + customExtrasCost;

  // Total any price edits check
  const hasAnyPriceEdits =
    isBasePriceEdited ||
    isMonthlyPriceEdited ||
    isDesignPriceEdited ||
    Object.keys(selectedExtras).some(
      (id) => selectedExtras[id] && extraPrices[id] !== DEFAULT_EXTRAS_PRICES[id]
    );

  // Subtotal before discount
  const subtotalInvestment = basePrice + designPrice + totalExtrasCost;

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

  // Update Individual Module Price
  const handleUpdateExtraPrice = (id: string, newPrice: number) => {
    setExtraPrices((prev) => ({
      ...prev,
      [id]: Math.max(0, isNaN(newPrice) ? 0 : newPrice),
    }));
  };

  // Reset Individual Module Price
  const handleResetExtraPrice = (id: string) => {
    setExtraPrices((prev) => ({
      ...prev,
      [id]: DEFAULT_EXTRAS_PRICES[id] || 0,
    }));
  };

  // Master Reset to Catalog Standard Prices
  const handleResetAllToCatalog = () => {
    setCustomBasePrice(null);
    setCustomMonthlyPrice(null);
    setCustomDesignPrice(null);
    setExtraPrices(DEFAULT_EXTRAS_PRICES);
    setDiscountPercent(0);
  };

  // Add Custom Extra
  const handleAddCustomExtra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExtraName.trim() || !newExtraPrice || isNaN(Number(newExtraPrice))) return;

    const newItem: CustomExtra = {
      id: `custom_${Date.now()}`,
      name: newExtraName.trim(),
      price: Math.max(0, Number(newExtraPrice)),
    };

    setCustomExtrasList((prev) => [...prev, newItem]);
    setNewExtraName("");
    setNewExtraPrice("");
  };

  // Remove Custom Extra
  const handleRemoveCustomExtra = (id: string) => {
    setCustomExtrasList((prev) => prev.filter((item) => item.id !== id));
  };

  // Open Global Dispatch Proposal Modal
  const handleOpenDispatchModal = (customData?: Partial<ProjectPdfData>) => {
    const includedModules = presetCatalog
      .filter((e) => selectedExtras[e.id])
      .map((e) => {
        const curPrice = extraPrices[e.id] !== undefined ? extraPrices[e.id] : e.defaultPrice;
        return `${e.name} (+$ ${curPrice.toLocaleString()} MXN)`;
      })
      .concat(customExtrasList.map((c) => `${c.name} (+$ ${c.price.toLocaleString()} MXN)`));

    const fullProposal: ProjectPdfData = {
      folio: customData?.folio || `COT-${Math.floor(100000 + Math.random() * 900000)}`,
      clientId: customData?.clientId || `CLI-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" }),
      clientName: customData?.clientName || calcClientName || "Cliente Prospecto",
      clientCompany: customData?.clientCompany || (calcClientName ? `Empresa de ${calcClientName}` : "Empresa Prospecto"),
      clientEmail: customData?.clientEmail || "contacto@cliente.com",
      clientPhone: customData?.clientPhone || "+52 (WhatsApp)",
      projectName: customData?.projectName || (calcClientName ? `Plataforma Digital para ${calcClientName}` : "Solución Digital Innocentia"),
      projectType: calcModalidad === "renta" ? `SaaS / Renta (${calcTier.toUpperCase()})` : `Desarrollo por Proyecto (${calcTier.toUpperCase()})`,
      tier: calcTier,
      designTier: calcDiseno,
      basePrice: basePrice,
      monthlyPrice: calcModalidad === "renta" ? monthlyPrice : undefined,
      designPrice: designPrice,
      extras: includedModules,
      extrasCost: totalExtrasCost,
      subtotal: subtotalInvestment,
      discountPercent: discountPercent > 0 ? discountPercent : undefined,
      discountAmount: discountPercent > 0 ? discountAmount : undefined,
      total: finalTotal,
      vendorName: customData?.vendorName || userName || "Asesor Comercial Innocentia",
      vendorCode: customData?.vendorCode || (userRole === "socio" ? "SOCIO-DIR-01" : "VEN-CORP-101"),
      vendorCommission: comisionVendedor,
    };

    setDispatchProposalData(fullProposal);
    setIsDispatchModalOpen(true);
  };

  // Copy Quick WhatsApp Quote Text
  const handleCopyQuote = () => {
    const includedExtras = presetCatalog
      .filter((e) => selectedExtras[e.id])
      .map((e) => {
        const curPrice = extraPrices[e.id] !== undefined ? extraPrices[e.id] : e.defaultPrice;
        return `  • ${e.name}: +$${curPrice.toLocaleString()} MXN`;
      })
      .concat(customExtrasList.map((c) => `  • ${c.name} (A la medida): +$${c.price.toLocaleString()} MXN`));

    const quoteText = `*PROPUESTA COMERCIAL FORMAL • INNOCENTIA TECH*
----------------------------------------
*Cliente:* ${calcClientName || "Cliente Prospecto"}
*Modalidad:* ${calcModalidad === "renta" ? "Renta Mensual SaaS (Infraestructura y soporte incluido)" : "Desarrollo a la Medida (Propiedad Intelectual Total)"}
*Nivel Tecnológico:* ${calcTier.toUpperCase()}
*Diseño UI/UX:* ${calcDiseno.toUpperCase()} (Figma & Microinteracciones)

*DESGLOSE DE INVERSIÓN:*
• Software Base: $${basePrice.toLocaleString()} MXN${isBasePriceEdited ? " (Precio Personalizado)" : ""}
${designPrice > 0 ? `• Diseño UI/UX (${calcDiseno}): +$${designPrice.toLocaleString()} MXN` : "• Diseño UI/UX: Incluido en Base"}
${includedExtras.length > 0 ? `• Módulos Adicionales Seleccionados:\n${includedExtras.join("\n")}` : "• Módulos Adicionales: Ninguno"}

*Subtotal:* $${subtotalInvestment.toLocaleString()} MXN
${discountPercent > 0 ? `*Descuento Comercial (-${discountPercent}%):* -$${discountAmount.toLocaleString()} MXN\n` : ""}*INVERSIÓN FINAL:* $${finalTotal.toLocaleString()} MXN${calcModalidad === "renta" ? `\n*Renta Mensual:* $${monthlyPrice.toLocaleString()} MXN/mes` : ""}

*Asesor:* ${userName} (Innocentia Tech)
*Garantía:* SLA de alta disponibilidad, código limpio y soporte continuo.`;

    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
            <span className="text-[10px] font-mono text-[#00D1FF] tracking-wider uppercase font-bold">
              Tabulador & Cotizador Oficial Innocentia v2.4
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
            Matriz de Precios & Cotizador Comercial
          </h2>
          <p className="text-xs font-mono text-gray-400">
            Precios de lista establecidos con edición de precios individuales en tiempo real.
          </p>
        </div>

        {/* Global Reset Button if any edits exist */}
        {hasAnyPriceEdits && (
          <button
            type="button"
            onClick={handleResetAllToCatalog}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Precios de Lista</span>
          </button>
        )}
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("calculadora")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === "calculadora"
              ? "bg-[#00D1FF] text-black shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>⚡ Cotizador Interactivo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("proyecto")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === "proyecto"
              ? "bg-white text-black shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>🏗️ Desarrollo por Proyecto</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("renta")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === "renta"
              ? "bg-white text-black shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>🔄 Renta Mensual (SaaS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("diseno")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === "diseno"
              ? "bg-white text-black shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>🎨 Estructura de Diseño UI/UX</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reglas")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
            activeTab === "reglas"
              ? "bg-white text-black shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>📜 Reglas Comerciales</span>
        </button>
      </div>

      {/* TAB 1: RENTA SAAS */}
      {activeTab === "renta" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-300 font-mono">
            🔄 <strong>Modalidad Renta (SaaS):</strong> Ideal para pymes y empresas que buscan menor desembolso inicial y soporte continuo garantizado.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 text-gray-400 uppercase">
                  <th className="py-3 px-3">Nivel</th>
                  <th className="py-3 px-3">Ideal Para</th>
                  <th className="py-3 px-3 text-right">Implementación Inicial</th>
                  <th className="py-3 px-3 text-right">Renta Mensual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">Esencial</span>
                    <span className="text-[10px] text-gray-400">Microempresas</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    Procesos básicos, captura de leads, cotizador simple o catálogo digital.
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-300">
                    $10,000 – $20,000 MXN
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                    $1,500 – $3,000 MXN/mes
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">Conectada</span>
                    <span className="text-[10px] text-[#00D1FF]">Pymes en Crecimiento</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    Módulos operativos, panel multi-usuario, roles de acceso e integración con WhatsApp API.
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-amber-300">
                    $20,000 – $40,000 MXN
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

      {/* TAB 2: PROYECTO */}
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

      {/* TAB 3: DISENO */}
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
                +$12,000 – $35,000 adicionales (Base: $22,000)
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-purple-500/30 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Nivel 3</span>
              <h3 className="text-sm font-black text-white">Experiencia Avanzada 60FPS</h3>
              <p className="text-xs text-gray-400">
                Ilustraciones personalizadas, avatares sensoriales, motion graphics a 60FPS y microinteracciones táctiles.
              </p>
              <span className="text-xs font-mono font-bold text-purple-300 block pt-2">
                Desde +$35,000 adicionales (Base: $45,000)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CALCULADORA DE COTIZACIÓN INTERACTIVA (CON EDICIÓN DIRECTA POR ELEMENTO) */}
      {activeTab === "calculadora" && (
        <div className="space-y-4">
          {/* Recent Form Lead Quick-Banner (Dynamic for Assigned Seller) */}
          {userName?.toLowerCase().includes("jess") ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-black/80 to-[#00D1FF]/10 border border-[#00D1FF]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center justify-center flex-shrink-0 text-lg">
                  📋
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/40 font-bold">
                      PROYECTO ACTIVO • PROJ-AXANA-2026
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      14 Sep 2026
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Axana & Gabriel • <span className="text-gray-300">Axana</span>
                  </h4>
                  <p className="text-[11px] font-mono text-gray-400">
                    Plataforma Digital & E-Commerce • Asesora: Jessica Torre (VEN-JESS-101)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>👁️ Ver Ficha Oficial</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCalcClientName("Axana & Gabriel (Axana)");
                    setCalcModalidad("proyecto");
                    setCalcTier("mvp");
                    setCalcDiseno("personalizado");
                    setSelectedExtras({
                      whatsapp_bot: true,
                      stripe_payments: true,
                      cloud_infra: true,
                      pwa_mobile: false,
                      audit_reports: false,
                      support_247: false,
                      multi_language: false,
                      domain_ssl: false,
                    });
                    setPreloadedLeadNotice("✓ Requerimientos de Axana cargados en la calculadora.");
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] hover:scale-105 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Cargar en Cotizador</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#07070E] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Cotizador Rápido para Clientes</h4>
                  <p className="text-gray-400 text-[11px]">Calcula presupuestos a medida y genera propuestas comerciales oficiales en tiempo real.</p>
                </div>
              </div>
            </div>
          )}

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

              {/* 2. Base Configuration & Direct Price Editing */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#00D1FF]" />
                    <span className="text-xs font-mono text-white uppercase font-bold">
                      1. Configuración Base & Precios Editables:
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    ✏️ Edición libre por elemento
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1 font-bold">Modalidad:</label>
                    <select
                      value={calcModalidad}
                      onChange={(e) => {
                        setCalcModalidad(e.target.value as any);
                        setCustomBasePrice(null);
                        setCustomMonthlyPrice(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                    >
                      <option value="proyecto">Desarrollo por Proyecto (Propio)</option>
                      <option value="renta">Renta Mensual (SaaS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1 font-bold">Nivel Tecnológico:</label>
                    <select
                      value={calcTier}
                      onChange={(e) => {
                        setCalcTier(e.target.value as any);
                        setCustomBasePrice(null);
                        setCustomMonthlyPrice(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                    >
                      {calcModalidad === "renta" ? (
                        <>
                          <option value="esencial">Esencial (Catálogo: $15k impl / $2.5k mes)</option>
                          <option value="conectada">Conectada Pyme (Catálogo: $28k impl / $4.5k mes)</option>
                          <option value="avanzada">Avanzada (Catálogo: $65k impl / $9.5k mes)</option>
                        </>
                      ) : (
                        <>
                          <option value="mvp">MVP a Medida (Catálogo: $120,000 MXN)</option>
                          <option value="plataforma">Plataforma Multi-Rol (Catálogo: $250,000 MXN)</option>
                          <option value="movil">App Móvil iOS/Android (Catálogo: $450,000 MXN)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Direct Price Edit for Base Implementation */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-mono text-gray-300 font-bold">
                          {calcModalidad === "renta" ? "Costo Implementación:" : "Inversión Base Software:"}
                        </label>
                        {isBasePriceEdited && (
                          <button
                            type="button"
                            onClick={() => setCustomBasePrice(null)}
                            className="text-[10px] font-mono text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Restaurar precio de catálogo"
                          >
                            <RotateCcw className="w-2.5 h-2.5" />
                            <span>Catálogo (${autoImplCost.toLocaleString()})</span>
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs font-mono text-gray-400">$</span>
                        <input
                          type="number"
                          value={customBasePrice !== null ? customBasePrice : autoImplCost}
                          onChange={(e) => {
                            const val = e.target.value === "" ? 0 : Number(e.target.value);
                            setCustomBasePrice(isNaN(val) ? 0 : val);
                          }}
                          className={`w-full pl-7 pr-12 py-1.5 rounded-xl bg-black/80 border text-white text-xs font-mono focus:outline-none ${
                            isBasePriceEdited
                              ? "border-amber-400/80 ring-1 ring-amber-400/40 text-amber-200"
                              : "border-white/20 focus:border-[#00D1FF]"
                          }`}
                        />
                        <span className="absolute right-3 top-2 text-[10px] font-mono text-gray-400">MXN</span>
                      </div>
                    </div>

                    {calcModalidad === "renta" && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-mono text-gray-300 font-bold">
                            Renta Mensual SaaS:
                          </label>
                          {isMonthlyPriceEdited && (
                            <button
                              type="button"
                              onClick={() => setCustomMonthlyPrice(null)}
                              className="text-[10px] font-mono text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                              title="Restaurar renta de catálogo"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>Catálogo (${autoMonthlyCost.toLocaleString()})</span>
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-mono text-gray-400">$</span>
                          <input
                            type="number"
                            value={customMonthlyPrice !== null ? customMonthlyPrice : autoMonthlyCost}
                            onChange={(e) => {
                              const val = e.target.value === "" ? 0 : Number(e.target.value);
                              setCustomMonthlyPrice(isNaN(val) ? 0 : val);
                            }}
                            className={`w-full pl-7 pr-16 py-1.5 rounded-xl bg-black/80 border text-white text-xs font-mono focus:outline-none ${
                              isMonthlyPriceEdited
                                ? "border-amber-400/80 ring-1 ring-amber-400/40 text-amber-200"
                                : "border-white/20 focus:border-[#00D1FF]"
                            }`}
                          />
                          <span className="absolute right-3 top-2 text-[10px] font-mono text-gray-400">MXN/mes</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. UI/UX Design Tier & Direct Price Editing */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono text-gray-300 font-bold">Alcance de Diseño UI/UX:</label>
                    {isDesignPriceEdited && (
                      <button
                        type="button"
                        onClick={() => setCustomDesignPrice(null)}
                        className="text-[10px] font-mono text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        title="Restaurar precio de diseño de catálogo"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Catálogo (${autoDesignCost.toLocaleString()})</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-7">
                      <select
                        value={calcDiseno}
                        onChange={(e) => {
                          setCalcDiseno(e.target.value as any);
                          setCustomDesignPrice(null);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                      >
                        <option value="base">Identidad Adaptada (Catálogo: $0 MXN)</option>
                        <option value="personalizado">Diseño Personalizado Figma (Catálogo: $22,000 MXN)</option>
                        <option value="avanzado">Experiencia de Marca Avanzada 60FPS (Catálogo: $45,000 MXN)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-5 relative">
                      <span className="absolute left-3 top-2 text-xs font-mono text-gray-400">$</span>
                      <input
                        type="number"
                        value={customDesignPrice !== null ? customDesignPrice : autoDesignCost}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : Number(e.target.value);
                          setCustomDesignPrice(isNaN(val) ? 0 : val);
                        }}
                        placeholder="Precio diseño MXN"
                        className={`w-full pl-7 pr-12 py-2 rounded-xl bg-black/80 border text-white text-xs font-mono focus:outline-none ${
                          isDesignPriceEdited
                            ? "border-amber-400/80 ring-1 ring-amber-400/40 text-amber-200"
                            : "border-white/20 focus:border-[#00D1FF]"
                        }`}
                      />
                      <span className="absolute right-3 top-2 text-[10px] font-mono text-gray-400">MXN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. AGREGAR EXTRAS & COMPLEMENTOS (CON EDICIÓN DE PRECIO INDIVIDUAL) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-[#00D1FF]/30 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      2. Módulos Adicionales ({presetCatalog.filter((e) => selectedExtras[e.id]).length + customExtrasList.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#00D1FF]">
                      +${totalExtrasCost.toLocaleString()} MXN
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-gray-400">
                  Selecciona los módulos a incluir y edita el precio individual de cada uno directamente según el acuerdo comercial con el cliente:
                </p>

                {/* Preset Extras List with Inline Editable Prices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {presetCatalog.map((extra) => {
                    const IconComponent = extra.icon || Sparkles;
                    const isChecked = !!selectedExtras[extra.id];
                    const currentPrice = extraPrices[extra.id] !== undefined ? extraPrices[extra.id] : extra.defaultPrice;
                    const isPriceModified = currentPrice !== extra.defaultPrice;

                    return (
                      <div
                        key={extra.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                          isChecked
                            ? "bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.12)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Header & Checkbox */}
                        <div
                          onClick={() => togglePresetExtra(extra.id)}
                          className="flex items-start justify-between gap-2 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`p-1.5 rounded-lg flex-shrink-0 ${
                                isChecked ? "bg-[#00D1FF] text-black" : "bg-white/5 text-gray-400"
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-white leading-snug block">
                                {extra.name}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400 leading-tight block mt-0.5 line-clamp-2">
                                {extra.desc}
                              </span>
                            </div>
                          </div>

                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePresetExtra(extra.id)}
                            className="mt-1 accent-[#00D1FF] cursor-pointer"
                          />
                        </div>

                        {/* Editable Price Bar */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400">Precio:</span>
                            {isPriceModified && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResetExtraPrice(extra.id);
                                }}
                                className="text-[9px] text-amber-300 hover:text-white flex items-center gap-0.5 cursor-pointer"
                                title={`Restaurar precio de lista (${extra.defaultPrice.toLocaleString()} MXN)`}
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                                <span>Lista</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-1 relative w-32">
                            <span className="text-gray-400 text-xs">$</span>
                            <input
                              type="number"
                              value={currentPrice}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const val = e.target.value === "" ? 0 : Number(e.target.value);
                                handleUpdateExtraPrice(extra.id, isNaN(val) ? 0 : val);
                              }}
                              className={`w-full px-2 py-1 rounded-lg bg-black/80 border text-right text-xs font-mono text-white focus:outline-none ${
                                isPriceModified
                                  ? "border-amber-400/80 text-amber-200 ring-1 ring-amber-400/30"
                                  : isChecked
                                  ? "border-[#00D1FF]/50 text-[#00D1FF]"
                                  : "border-white/15 focus:border-[#00D1FF]"
                              }`}
                            />
                            <span className="text-[10px] text-gray-400">MXN</span>
                          </div>
                        </div>
                      </div>
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
                  className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5"
                >
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                    ➕ Agregar Módulo Extra a la Medida:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={newExtraName}
                      onChange={(e) => setNewExtraName(e.target.value)}
                      placeholder="Concepto (ej: Conexión ERP SAP / Facturación SAT 4.0)"
                      className="sm:col-span-7 px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                    />
                    <div className="sm:col-span-3 relative">
                      <span className="absolute left-2.5 top-1.5 text-xs font-mono text-gray-400">$</span>
                      <input
                        type="number"
                        value={newExtraPrice}
                        onChange={(e) => setNewExtraPrice(e.target.value)}
                        placeholder="Precio MXN"
                        className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#00D1FF]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!newExtraName.trim() || !newExtraPrice}
                      className="sm:col-span-2 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-mono font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md"
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
                  3. Descuento Comercial Autorizado:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {[0, 5, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercent(pct)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
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
                    {hasAnyPriceEdits && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        ✏️ Precios Personalizados
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
                      {isBasePriceEdited && <span className="text-[10px] text-amber-300">(editado)</span>}
                    </span>
                    <strong className="text-white">${basePrice.toLocaleString()} MXN</strong>
                  </div>

                  {designPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <span>Diseño UI/UX ({calcDiseno}):</span>
                        {isDesignPriceEdited && <span className="text-[10px] text-amber-300">(editado)</span>}
                      </span>
                      <strong className="text-[#00D1FF]">+${designPrice.toLocaleString()} MXN</strong>
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
                          .map((extra) => {
                            const curPrice = extraPrices[extra.id] !== undefined ? extraPrices[extra.id] : extra.defaultPrice;
                            const isMod = curPrice !== extra.defaultPrice;
                            return (
                              <div key={extra.id} className="flex justify-between text-[10px] text-gray-400">
                                <span className="truncate pr-2">• {extra.name} {isMod ? "(editado)" : ""}</span>
                                <span className="text-gray-300 font-mono flex-shrink-0">+${curPrice.toLocaleString()}</span>
                              </div>
                            );
                          })}
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
                      Comisión Asesor (15%):
                    </span>
                    <span className="text-[#FF3858] text-base font-black font-mono">
                      ${comisionVendedor.toLocaleString()} MXN
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Dispatch Proposal & Copy */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenDispatchModal()}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF3858] via-purple-600 to-[#00D1FF] text-white font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,209,255,0.4)]"
                >
                  <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                  <span>🚀 Guardar & Despachar Propuesta (Whats / Email / PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedQuote ? <Check className="w-4 h-4 text-emerald-400" /> : <TrendingUp className="w-4 h-4" />}
                  <span>{copiedQuote ? "¡Texto Copiado al Portapapeles!" : "Copiar Texto Rápido"}</span>
                </button>

                <span className="text-[10px] font-mono text-gray-400 text-center block">
                  Envía por WhatsApp directo, Correo con membrete, PDF Dark Luxury de 2 páginas o Copia el Enlace.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REGLAS */}
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
                  <p className="text-sm font-bold text-white mt-0.5">Axana &amp; Gabriel</p>
                  <p className="text-gray-300">Empresa: <strong>Axana</strong></p>
                  <p className="text-[#00D1FF]">📱 WhatsApp: +52 55 8421 0898</p>
                  <p className="text-gray-400">✉️ contacto@axana.mx</p>
                  <p className="text-gray-400">📍 México</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-bold">Asesor Comercial Vinculado:</span>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">{userName || "Jessica Torre"}</p>
                  <p className="text-gray-300">Código: <strong>{userName?.toLowerCase().includes("farid") ? "VEN-FARID-303" : "VEN-JESS-101"}</strong></p>
                  <p className="text-gray-400">Atribución: Comisión 12% Cierre</p>
                  <p className="text-amber-300 mt-2">Status: 🟡 En Revisión de Demo</p>
                </div>
              </div>

              {/* Proyecto & Requerimientos */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Detalles del Proyecto:</span>
                <p className="text-sm font-bold text-white">Axana - Plataforma Digital &amp; E-Commerce</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
                    Plataforma Web / E-Commerce
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                    Presupuesto: $80,000 - $150,000 MXN
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 text-[10px]">
                    Plazo: 4 a 6 semanas
                  </span>
                </div>
              </div>

              {/* Módulos Solicitados */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Módulos &amp; Alcance Solicitado:</span>
                <ul className="space-y-1 text-gray-300">
                  <li>✓ 🎨 Diseño UI/UX interactivo de alta fidelidad en Figma (Sofía)</li>
                  <li>✓ 🎬 Catálogo interactivo de productos y microanimaciones 60fps</li>
                  <li>✓ 🔐 Autenticación y base de datos cifrada</li>
                  <li>✓ 💳 Pasarela de pagos con Stripe y Checkout automatizado</li>
                  <li>✓ 📲 Conexión automatizada por WhatsApp API</li>
                  <li>✓ 📊 Panel administrativo con métricas y exportación de pedidos</li>
                </ul>
              </div>

              {/* Descripción Textual */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase block font-bold">Descripción del Cliente:</span>
                <p className="text-gray-200 italic">
                  "Desarrollo de plataforma digital interactiva, catálogo dinámico con pasarela de pagos, gestión de pedidos y conexión automatizada por WhatsApp API."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/10">
              <a
                href={`https://wa.me/525584210898?text=${encodeURIComponent(`Hola Axana y Gabriel, soy ${userName || "Jessica Torre"} de Innocentia Tech. Te comparto la propuesta y avances de tu proyecto.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>💬 WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  handleOpenDispatchModal({
                    folio: "PROJ-AXANA-2026",
                    clientId: "CLI-AXANA-01",
                    projectName: "Axana - Plataforma Digital & E-Commerce",
                    clientCompany: "Axana",
                    clientName: "Axana & Gabriel",
                    clientEmail: "contacto@axana.mx",
                    clientPhone: "+52 55 8421 0898",
                    vendorName: userName || "Jessica Torre",
                    vendorCode: userName?.toLowerCase().includes("farid") ? "VEN-FARID-303" : "VEN-JESS-101",
                  });
                  setIsLeadModalOpen(false);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#00D1FF]/20 hover:bg-[#00D1FF]/30 border border-[#00D1FF]/40 text-[#00D1FF] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>🚀 Despachar PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCalcClientName("Axana & Gabriel (Axana)");
                  setCalcModalidad("proyecto");
                  setCalcTier("mvp");
                  setCalcDiseno("personalizado");
                  setSelectedExtras({
                    whatsapp_bot: true,
                    stripe_payments: true,
                    cloud_infra: true,
                    pwa_mobile: false,
                    audit_reports: false,
                    support_247: false,
                    multi_language: false,
                    domain_ssl: false,
                  });
                  setPreloadedLeadNotice("✓ Requerimientos de Axana cargados en la calculadora.");
                  setIsLeadModalOpen(false);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Calcular</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Proposal Dispatch Modal (WhatsApp / Email / PDF / Link) */}
      {dispatchProposalData && (
        <ProposalDispatchModal
          isOpen={isDispatchModalOpen}
          onClose={() => setIsDispatchModalOpen(false)}
          proposalData={dispatchProposalData}
        />
      )}
    </div>
  );
}
