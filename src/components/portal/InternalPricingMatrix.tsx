"use client";

import React, { useState } from "react";
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
} from "../../lib/icons";

export default function InternalPricingMatrix() {
  const [activeTab, setActiveTab] = useState<"renta" | "proyecto" | "diseno" | "calculadora" | "reglas">("renta");
  const [calcModalidad, setCalcModalidad] = useState<"renta" | "proyecto">("renta");
  const [calcTier, setCalcTier] = useState<"esencial" | "conectada" | "avanzada" | "mvp" | "plataforma" | "movil">("conectada");
  const [calcDiseno, setCalcDiseno] = useState<"base" | "personalizado" | "avanzado">("personalizado");
  const [calcClientName, setCalcClientName] = useState("");
  const [copiedQuote, setCopiedQuote] = useState(false);

  let implCost = 0;
  let monthlyCost = 0;
  let disenoExtra = 0;

  if (calcModalidad === "renta") {
    if (calcTier === "esencial") {
      implCost = 15000;
      monthlyCost = 2500;
    } else if (calcTier === "conectada") {
      implCost = 28000;
      monthlyCost = 4500;
    } else {
      implCost = 65000;
      monthlyCost = 9500;
    }
  } else {
    if (calcTier === "esencial" || calcTier === "mvp") {
      implCost = 120000;
      monthlyCost = 0;
    } else if (calcTier === "conectada" || calcTier === "plataforma") {
      implCost = 250000;
      monthlyCost = 0;
    } else {
      implCost = 450000;
      monthlyCost = 0;
    }
  }

  if (calcDiseno === "personalizado") {
    disenoExtra = 22000;
  } else if (calcDiseno === "avanzado") {
    disenoExtra = 45000;
  }

  const totalImplementacion = implCost + (calcModalidad === "renta" ? disenoExtra : 0);
  const totalProyecto = implCost + (calcModalidad === "proyecto" ? disenoExtra : 0);
  const comisionVendedor = Math.round((calcModalidad === "renta" ? totalImplementacion : totalProyecto) * 0.15);

  const handleCopyQuote = () => {
    const text = 
      "*PROPUESTA DE DESARROLLO — INNOCENTIA TECH*\n" +
      "Cliente: " + (calcClientName || "Estimado Cliente") + "\n" +
      "Fecha: " + new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }) + "\n\n" +
      "*1. MODALIDAD: " + (calcModalidad === "renta" ? "SaaS / Renta con Implementación" : "Desarrollo a la Medida (Código Propio)") + "*\n" +
      "* Nivel Tecnológico: " + calcTier.toUpperCase() + "\n" +
      "* Nivel de Diseño: " + (calcDiseno === "base" ? "Identidad Adaptada" : calcDiseno === "personalizado" ? "UI/UX Personalizado en Figma" : "Experiencia de Marca Avanzada 60FPS") + "\n\n" +
      "*2. ESQUEMA DE INVERSIÓN (MXN antes de IVA):*\n" +
      (calcModalidad === "renta"
        ? "* Implementación Inicial: $" + totalImplementacion.toLocaleString() + " MXN\n* Renta Mensual: $" + monthlyCost.toLocaleString() + " MXN/mes"
        : "* Inversión Total: $" + totalProyecto.toLocaleString() + " MXN (50% anticipo, 30% sprint medio, 20% entrega final)") + "\n\n" +
      "*3. INCLUYE:*\n" +
      "* Arquitectura de software moderna y optimizada\n" +
      "* Panel de administración web responsivo\n" +
      "* Seguridad SSL 256-bit y respaldos continuos\n" +
      "* Soporte técnico prioritario de Innocentia Tech\n\n" +
      "_Nota: Consumos de APIs de IA (OpenAI) y WhatsApp Business se facturan según volumen._\n" +
      "Para formalizar tu proyecto, contáctanos en ventas@innocentia.tech o visita https://innocentia.tech";

    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 3000);
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

      {activeTab === "calculadora" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Nombre del Cliente / Empresa:</label>
              <input
                type="text"
                value={calcClientName}
                onChange={(e) => setCalcClientName(e.target.value)}
                placeholder="ej: Clínica Médica AI / Dr. Roberto"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Modalidad:</label>
                <select
                  value={calcModalidad}
                  onChange={(e) => setCalcModalidad(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono"
                >
                  <option value="renta">Renta Mensual (SaaS)</option>
                  <option value="proyecto">Desarrollo por Proyecto</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Nivel Tecnológico:</label>
                <select
                  value={calcTier}
                  onChange={(e) => setCalcTier(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono"
                >
                  {calcModalidad === "renta" ? (
                    <>
                      <option value="esencial">Esencial (Básico)</option>
                      <option value="conectada">Conectada (Pyme)</option>
                      <option value="avanzada">Avanzada (Mediana)</option>
                    </>
                  ) : (
                    <>
                      <option value="mvp">MVP a Medida ($80k-$180k)</option>
                      <option value="plataforma">Plataforma Multi-Rol ($180k-$400k)</option>
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
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono"
              >
                <option value="base">Identidad Adaptada (Incluida)</option>
                <option value="personalizado">Diseño Personalizado Figma (+$22,000)</option>
                <option value="avanzado">Experiencia de Marca Avanzada 60FPS (+$45,000)</option>
              </select>
            </div>
          </div>
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.03] border border-[#00D1FF]/40 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold block">
                Cotización Estimada
              </span>
              <h3 className="text-lg font-black text-white mt-1">{calcClientName || "Cliente Prospecto"}</h3>
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
                {calcModalidad === "renta" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Implementación Inicial:</span>
                      <strong className="text-amber-300">{"$" + totalImplementacion.toLocaleString() + " MXN"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Renta Mensual:</span>
                      <strong className="text-emerald-400">{"$" + monthlyCost.toLocaleString() + " MXN/mes"}</strong>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Inversión Proyecto:</span>
                    <strong className="text-emerald-400">{"$" + totalProyecto.toLocaleString() + " MXN"}</strong>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10 text-[11px]">
                  <span className="text-gray-400">Comisión Vendedor (15%):</span>
                  <span className="text-[#FF3858] font-bold">{"$" + comisionVendedor.toLocaleString() + " MXN"}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyQuote}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer shadow-lg"
            >
              {copiedQuote ? <Check className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              <span>{copiedQuote ? "¡Propuesta Copiada!" : "Copiar Propuesta para Cliente"}</span>
            </button>
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
    </div>
  );
}
