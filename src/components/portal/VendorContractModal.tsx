"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, CheckCircle2, FileText, X, ArrowRight, Lock } from "../../lib/icons";

interface VendorContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndRegister: (vendorData: {
    name: string;
    rfc: string;
    address: string;
    email: string;
    phone: string;
    acceptedDate: string;
  }) => void;
}

export default function VendorContractModal({
  isOpen,
  onClose,
  onAcceptAndRegister,
}: VendorContractModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rfc: "",
    address: "",
    email: "",
    phone: "",
  });

  const [hasAccepted, setHasAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeView, setActiveView] = useState<"resumen" | "contrato_completo">("resumen");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Por favor completa los campos obligatorios (Nombre, Correo y Teléfono).");
      return;
    }
    if (!hasAccepted) {
      setErrorMsg("Debes leer y aceptar los términos del Contrato de Colaboración Comercial.");
      return;
    }

    const acceptedDate = new Date().toLocaleString("es-MX", {
      dateStyle: "long",
      timeStyle: "short",
    });

    onAcceptAndRegister({
      ...formData,
      acceptedDate,
    });
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#08090E] border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.98)] p-6 sm:p-9 text-left space-y-6 my-auto overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00D1FF]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF3858]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start sm:items-center justify-between border-b border-white/10 pb-4 relative z-10 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <img
              src="/images/logo_official_header.png?v=2"
              alt="INNOCENTIA TECH"
              className="h-5 sm:h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[9px] font-mono font-bold text-[#00D1FF] uppercase mb-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>REGISTRO OFICIAL DE VENDEDORES</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider block">
                CONTRATO DE COLABORACIÓN COMERCIAL & COMISIONES
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* TABLA DE COMISIÓN SIEMPRE VISIBLE EN EL ENCABEZADO */}
        <div className="relative z-10 rounded-2xl bg-gradient-to-r from-[#00D1FF]/10 via-purple-950/20 to-[#FF3858]/10 border border-[#00D1FF]/30 p-4 sm:p-5 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <h4 className="text-xs sm:text-sm font-black text-white uppercase font-mono tracking-wider">
                TABULADOR OFICIAL DE COMISIONES (HASTA 20% MÁXIMO)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#00D1FF] bg-[#00D1FF]/20 px-2.5 py-1 rounded-full border border-[#00D1FF]/40 font-bold self-start sm:self-auto">
              CLÁUSULA TERCERA & ANEXO A
            </span>
          </div>

          {/* Grid de 5 Funciones Comisionables */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
              <span className="text-[10px] text-gray-400 block leading-tight">1. Titularidad del Cliente</span>
              <span className="text-base font-black text-[#00D1FF] block">4%</span>
              <span className="text-[8px] text-gray-400 block">Primer Registro</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
              <span className="text-[10px] text-gray-400 block leading-tight">2. Levantamiento & Cotización</span>
              <span className="text-base font-black text-purple-300 block">4%</span>
              <span className="text-[8px] text-gray-400 block">Requerimientos</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
              <span className="text-[10px] text-gray-400 block leading-tight">3. Diseño & Propuesta</span>
              <span className="text-base font-black text-[#FF3858] block">4%</span>
              <span className="text-[8px] text-gray-400 block">Conceptualización</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
              <span className="text-[10px] text-gray-400 block leading-tight">4. Negociación & Cierre</span>
              <span className="text-base font-black text-emerald-400 block">5%</span>
              <span className="text-[8px] text-gray-400 block">Aprobación y Anticipo</span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-gray-400 block leading-tight">5. Contrato & Formalización</span>
              <span className="text-base font-black text-amber-300 block">3%</span>
              <span className="text-[8px] text-gray-400 block">Documentación</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-300 pt-1 gap-2">
            <span className="text-emerald-400 font-bold">
              ● Pago a 15 días naturales tras liquidación bancaria efectiva del cliente.
            </span>
            <span className="text-gray-400">
              ● Titularidad comercial protegida por 24 meses (Cláusula Novena).
            </span>
          </div>
        </div>

        {/* Selector de Pestaña: Resumen Legal / Contrato Completo 49 Cláusulas */}
        <div className="flex gap-2 border-b border-white/10 pb-2 relative z-10">
          <button
            type="button"
            onClick={() => setActiveView("resumen")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeView === "resumen"
                ? "bg-white/20 border border-white/40 text-white shadow-sm"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            📋 1. Formulario de Registro
          </button>
          <button
            type="button"
            onClick={() => setActiveView("contrato_completo")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeView === "contrato_completo"
                ? "bg-[#00D1FF]/20 border border-[#00D1FF]/40 text-[#00D1FF] shadow-sm"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            📜 2. Leer Contrato Completo (49 Cláusulas)
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL: FORMULARIO O TEXTO DEL CONTRATO */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {activeView === "resumen" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold text-[#00D1FF] uppercase block">
                  DATOS FISCALES Y DE CONTACTO DEL COLABORADOR
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-gray-300 block">Nombre Completo (Obligatorio) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block">RFC (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. MENC850412XYZ"
                      value={formData.rfc}
                      onChange={(e) => setFormData({ ...formData, rfc: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block">Correo Electrónico (Obligatorio) *</label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 block">Teléfono / WhatsApp (Obligatorio) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+52 999 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-gray-300 block">Domicilio / Ciudad</label>
                    <input
                      type="text"
                      placeholder="Mérida, Yucatán, México"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00D1FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Declaraciones Clave Resumidas */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2 text-xs font-mono text-gray-300">
                <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
                  RESUMEN DE DERECHOS Y OBLIGACIONES:
                </span>
                <ul className="space-y-1.5 list-disc pl-4 text-gray-300 text-[11px]">
                  <li>
                    <strong className="text-white">Principio de Primer Registro (Cláusula 5):</strong> Se reconoce titularidad comercial a quien registre primero al cliente de forma válida y verificable en el CRM.
                  </li>
                  <li>
                    <strong className="text-white">Protección de Cartera (Cláusula 8 y 9):</strong> Conservas tu 4% sobre operaciones futuras del cliente registrado por hasta 24 meses continuos.
                  </li>
                  <li>
                    <strong className="text-white">Pago de Comisiones (Cláusula 19):</strong> Liquidación dentro de los 15 días naturales siguientes a la recepción y conciliación bancaria efectiva del pago del cliente.
                  </li>
                  <li>
                    <strong className="text-white">Confidencialidad y Buena Fe (Cláusula 31 y 44):</strong> Protección total de información de clientes, cotizaciones y código fuente.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* CONTRATO COMPLETO SCROLLABLE */
            <div className="h-80 overflow-y-auto p-4 sm:p-6 rounded-2xl bg-black/90 border border-white/15 space-y-5 text-xs text-gray-300 font-mono leading-relaxed select-text">
              <div className="text-center space-y-2 border-b border-white/15 pb-4">
                <h2 className="text-sm sm:text-base font-black text-white uppercase">
                  CONTRATO DE COLABORACIÓN COMERCIAL, ATRIBUCIÓN DE CLIENTES Y PAGO DE COMISIONES
                </h2>
                <p className="text-[10px] text-gray-400">
                  Celebrado entre INNOCENTIA TECH (“LA EMPRESA”) y EL COLABORADOR (“LAS PARTES”).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-[#00D1FF] uppercase text-xs">DECLARACIONES</h4>
                <p>
                  <strong>I. DECLARA LA EMPRESA:</strong> a) Que desarrolla y comercializa servicios de tecnología, desarrollo de software, aplicaciones, plataformas digitales, sitios web, automatizaciones, inteligencia artificial, consultoría tecnológica, diseño y experiencia de usuario. b) Que tiene interés en establecer mecanismos de colaboración para la generación de clientes y oportunidades comerciales. c) Que establece reglas claras para la identificación y atribución de clientes, distribución de comisiones y pago de las mismas.
                </p>
                <p>
                  <strong>II. DECLARA EL COLABORADOR:</strong> a) Que cuenta con capacidad legal suficiente. b) Que desea participar en actividades comerciales conforme a este instrumento. c) Que conoce y acepta el esquema de participación y comisiones contenido en este contrato. d) Que reconoce que el derecho al cobro de comisión se genera cuando LA EMPRESA ha recibido efectivamente el pago correspondiente. e) Que se obliga a conducirse con buena fe y transparencia.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-3">
                <h4 className="font-bold text-[#FF3858] uppercase text-xs">CLÁUSULAS</h4>
                <p><strong>PRIMERA. OBJETO:</strong> Regular las condiciones bajo las cuales EL COLABORADOR participa en generación de prospectos, cotizaciones, diseño, negociación, cierre y formalización de proyectos.</p>
                <p><strong>SEGUNDA. BOLSA MÁXIMA DE COMISIONES:</strong> Hasta un máximo equivalente al 20% de la Base Comisionable efectivamente cobrada por LA EMPRESA.</p>
                <p><strong>TERCERA. TABULADOR GENERAL:</strong> Titularidad del cliente (4%), Levantamiento y cotización (4%), Diseño y conceptualización (4%), Negociación y cierre comercial (5%), Contrato y formalización (3%). Total: 20%.</p>
                <p><strong>CUARTA Y QUINTA. REGISTRO Y PRINCIPIO DE PRIMER REGISTRO:</strong> Tendrá prioridad quien realice el primer registro válido y verificable en el CRM con evidencia comercial.</p>
                <p><strong>SÉPTIMA Y OCTAVA. TITULARIDAD Y OPERACIONES FUTURAS:</strong> El titular comercial conservará su 4% sobre operaciones futuras del mismo cliente aun cuando otro equipo ejecute el cierre.</p>
                <p><strong>NOVENA. VIGENCIA DE LA TITULARIDAD:</strong> Vigente mientras exista actividad comercial; se extingue si transcurren 24 meses continuos sin operaciones efectivamente pagadas.</p>
                <p><strong>DÉCIMA SEXTA. BASE COMISIONABLE:</strong> Ingreso neto cobrado atribuible a servicios propios de LA EMPRESA, excluyendo impuestos, dominios, hosting, APIs externas, licencias y costos de terceros.</p>
                <p><strong>DÉCIMA NOVENA. PLAZO DE PAGO:</strong> Toda comisión devengada será pagada dentro de los quince (15) días naturales siguientes a la fecha de liquidación efectiva del pago por parte del cliente.</p>
                <p><strong>VIGÉSIMA. PAGOS PARCIALES:</strong> Las comisiones se generan proporcionalmente sobre cada anticipo o parcialidad liquidada.</p>
                <p><strong>TRIGÉSIMA PRIMERA. CONFIDENCIALIDAD:</strong> Protección absoluta de información de clientes, precios, código fuente y arquitecturas.</p>
                <p><strong>CUADRAGÉSIMA NOVENA. JURISDICCIÓN:</strong> Leyes de los Estados Unidos Mexicanos y tribunales competentes de Mérida, Yucatán, México.</p>
                <p><strong>ANEXOS A, B Y C:</strong> Tabulador General de Comisiones, Ficha de Atribución y Ejemplo de Cálculo ($200k MXN + IVA, $40k externos = $160k Base -> $32,000 MXN en comisiones a 15 días).</p>
              </div>
            </div>
          )}

          {/* Checkbox Obligatorio de Aceptación Legal */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-[#00D1FF]/30 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAccepted}
                onChange={(e) => setHasAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#00D1FF] bg-black border-white/30 focus:ring-0 cursor-pointer flex-shrink-0"
              />
              <span className="text-xs text-gray-200 font-mono leading-relaxed">
                He leído, comprendo y <strong>acepto en su totalidad</strong> los términos y condiciones del{" "}
                <strong className="text-[#00D1FF]">Contrato de Colaboración Comercial, Atribución de Clientes y Tabulador de Comisiones (20%)</strong> de Innocentia Tech, reconociendo mi firma electrónica.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs font-mono text-red-300">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[10px] font-mono text-gray-400">
              🔒 Firma digital cifrada conforme al Código de Comercio y legislación mexicana.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#3A86FF] hover:from-[#00E5FF] hover:to-[#00B4D8] text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Firmar & Activar Perfil</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
