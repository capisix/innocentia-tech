"use client";

import React, { useState } from "react";
import {
  X,
  Send,
  Mail,
  FileText,
  Link as LinkIcon,
  Check,
  Copy,
  Sparkles,
  Download,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Printer,
  Crown,
  CheckCircle2,
  Share2
} from "../../lib/icons";
import { generateProjectPdf, ProjectPdfData } from "../../lib/generateProjectPdf";

export interface ProposalDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalData: ProjectPdfData;
}

export const ProposalDispatchModal: React.FC<ProposalDispatchModalProps> = ({
  isOpen,
  onClose,
  proposalData,
}) => {
  const [activeChannel, setActiveChannel] = useState<"whatsapp" | "email" | "pdf" | "link">("whatsapp");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const total = proposalData.total || proposalData.subtotal || 172500;
  const folio = proposalData.folio || "PROJ-592160";
  const clientName = proposalData.clientName || "Daniel Torre de Haro";
  const company = proposalData.clientCompany || proposalData.projectName || "Pro Acabados";
  const phoneClean = (proposalData.clientPhone || "").replace(/[^0-9]/g, "") || "9902302124";
  const email = proposalData.clientEmail || "pro.acabados.mx@gmail.com";
  const vendor = proposalData.vendorName || "Carlos Mendoza";
  const vendorCode = proposalData.vendorCode || "VEN-CARLOS-202";
  const proposalUrl = `https://innocentia.tech/crear-proyecto?ref=${folio}&cli=${proposalData.clientId || "CLI-72746"}`;

  // WhatsApp formatted copy
  const whatsappMessage = `🚀 *PROPUESTA COMERCIAL OFICIAL • INNOCENTIA TECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 *Folio de Proyecto:* ${folio}
🆔 *ID de Cliente:* ${proposalData.clientId || "CLI-72746"}
📅 *Fecha:* ${proposalData.date || "9 de septiembre de 2026"}

👤 *CLIENTE REGISTRADO:*
• *Nombre:* ${clientName}
• *Empresa / Marca:* ${company}
• *Teléfono / WhatsApp:* ${proposalData.clientPhone || "9902302124"}
• *Correo:* ${email}

📌 *PROYECTO & MODALIDAD:*
• *Proyecto:* ${proposalData.projectName || "App de Pedidos y Entregas"}
• *Modalidad:* ${proposalData.modalityTag || "Desarrollo por Proyecto / MVP a Medida"}

💰 *INVERSIÓN ESTIMADA:*
• *Total Cotizado:* $${total.toLocaleString()} MXN
• *Tratamiento IVA:* Por confirmar / sujeto a validación fiscal

💼 *ASESOR ASIGNADO:*
• *Asesor:* ${vendor} (${vendorCode})

📄 *PDF OFICIAL & VERIFICACIÓN EN LÍNEA:*
👉 ${proposalUrl}

_Quedamos a tu entera disposición para resolver cualquier duda o coordinar la sesión de kick-off._`;

  // Email Subject and Body
  const emailSubject = `Propuesta Comercial Oficial • ${folio} • ${company} • Innocentia Tech`;
  const emailBody = `Estimado(a) ${clientName},

Es un gusto saludarte. Adjunto encontrarás el resumen y detalles de la propuesta comercial formal emitida para el proyecto "${proposalData.projectName || company}".

DATOS GENERALES DE LA PROPUESTA:
- Folio Oficial: ${folio}
- Empresa: ${company}
- Modalidad: ${proposalData.modalityTag || "Desarrollo por Proyecto / MVP a Medida"}
- Inversión Estimada: $${total.toLocaleString()} MXN

ASESOR COMERCIAL VINCULADO:
- Asesor: ${vendor} (${vendorCode})
- WhatsApp Soporte: +52 960 177 1556
- Correo: ventas@innocentia.tech

Puedes consultar y validar el desglose de módulos y alcance en línea a través del siguiente enlace seguro:
${proposalUrl}

Asimismo, hemos generado el documento oficial en formato PDF de 2 páginas con los términos técnicos y comerciales acordados.

Atentamente,
Equipo de Consultoría y Desarrollo • Innocentia Tech
https://innocentia.tech`;

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/${phoneClean}?text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  const handleOpenEmail = () => {
    const encodedSub = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:${email}?subject=${encodedSub}&body=${encodedBody}`;
    window.open(mailtoUrl, "_blank");
  };

  const handleDownloadPdf = () => {
    generateProjectPdf(proposalData);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#08090E] border border-white/20 rounded-[32px] p-5 sm:p-8 space-y-6 my-auto text-left shadow-[0_0_90px_rgba(0,209,255,0.25)]">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D1FF]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF3858]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[10px] font-mono text-[#00D1FF] font-bold mb-1">
              <Share2 className="w-3 h-3" />
              <span>CENTRO DE DESPACHO & ENVÍO DE COTIZACIÓN</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Propuesta Comercial • <span className="text-[#00D1FF]">{folio}</span>
            </h3>
            <p className="text-xs font-mono text-gray-400">
              {clientName} • <span className="text-gray-200 font-semibold">{company}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div>
            <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Inversión Estimada:</span>
            <span className="text-lg font-mono font-black text-emerald-400">
              ${total.toLocaleString()} MXN
            </span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Destinatario / Teléfono:</span>
            <span className="text-xs font-mono font-bold text-white block truncate">
              {phoneClean ? `+52 ${phoneClean}` : "Sin teléfono"}
            </span>
            <span className="text-[10px] font-mono text-gray-400 block truncate">{email}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Asesor Asignado:</span>
            <span className="text-xs font-mono font-bold text-[#00D1FF] block">
              {vendor} ({vendorCode})
            </span>
          </div>
        </div>

        {/* Channels Selector Tabs */}
        <div>
          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block mb-2">
            Selecciona el Canal de Envío:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Tab 1: WhatsApp */}
            <button
              type="button"
              onClick={() => setActiveChannel("whatsapp")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                activeChannel === "whatsapp"
                  ? "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <Smartphone className={`w-4 h-4 ${activeChannel === "whatsapp" ? "text-emerald-400" : "text-gray-400"}`} />
                {activeChannel === "whatsapp" && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
              </div>
              <div>
                <span className="text-xs font-bold font-mono block">1. WhatsApp</span>
                <span className="text-[10px] text-gray-400 block">Mensaje directo con copia</span>
              </div>
            </button>

            {/* Tab 2: Email */}
            <button
              type="button"
              onClick={() => setActiveChannel("email")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                activeChannel === "email"
                  ? "bg-[#00D1FF]/20 border-[#00D1FF] text-white shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <Mail className={`w-4 h-4 ${activeChannel === "email" ? "text-[#00D1FF]" : "text-gray-400"}`} />
                {activeChannel === "email" && <span className="w-2 h-2 rounded-full bg-[#00D1FF]" />}
              </div>
              <div>
                <span className="text-xs font-bold font-mono block">2. Correo Email</span>
                <span className="text-[10px] text-gray-400 block">Mailto estructurado</span>
              </div>
            </button>

            {/* Tab 3: PDF */}
            <button
              type="button"
              onClick={() => setActiveChannel("pdf")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                activeChannel === "pdf"
                  ? "bg-[#FF3858]/20 border-[#FF3858] text-white shadow-[0_0_20px_rgba(255,56,88,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <FileText className={`w-4 h-4 ${activeChannel === "pdf" ? "text-[#FF3858]" : "text-gray-400"}`} />
                {activeChannel === "pdf" && <span className="w-2 h-2 rounded-full bg-[#FF3858]" />}
              </div>
              <div>
                <span className="text-xs font-bold font-mono block">3. PDF Oficial</span>
                <span className="text-[10px] text-gray-400 block">Dark Luxury 2 Páginas</span>
              </div>
            </button>

            {/* Tab 4: Link */}
            <button
              type="button"
              onClick={() => setActiveChannel("link")}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                activeChannel === "link"
                  ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <LinkIcon className={`w-4 h-4 ${activeChannel === "link" ? "text-purple-400" : "text-gray-400"}`} />
                {activeChannel === "link" && <span className="w-2 h-2 rounded-full bg-purple-400" />}
              </div>
              <div>
                <span className="text-xs font-bold font-mono block">4. Enlace Web</span>
                <span className="text-[10px] text-gray-400 block">Link de propuesta</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Box per Selected Channel */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          {/* ======================= CHANNEL 1: WHATSAPP ======================= */}
          {activeChannel === "whatsapp" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  Mensaje Formateado para WhatsApp ({phoneClean ? `+52 ${phoneClean}` : "Destinatario"}):
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(whatsappMessage, "wa")}
                  className="text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                >
                  {copiedKey === "wa" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                value={whatsappMessage}
                rows={8}
                className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-gray-200 text-xs font-mono leading-relaxed focus:outline-none resize-none selection:bg-emerald-500/30 selection:text-white"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono text-gray-400">
                  📱 Se abrirá WhatsApp con el número del cliente y el mensaje prellenado listo para enviar.
                </span>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-105 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================= CHANNEL 2: EMAIL ======================= */}
          {activeChannel === "email" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00D1FF] font-bold flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  Correo Electrónico para: {email}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(`${emailSubject}\n\n${emailBody}`, "email")}
                  className="text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                >
                  {copiedKey === "email" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Asunto y Cuerpo</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Asunto del Correo:
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={emailSubject}
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-1">
                    Cuerpo del Mensaje:
                  </span>
                  <textarea
                    readOnly
                    value={emailBody}
                    rows={7}
                    className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-gray-200 text-xs font-mono leading-relaxed focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono text-gray-400">
                  ✉️ Abre tu cliente de correo predeterminado (Outlook, Apple Mail o Gmail) con todo listo.
                </span>

                <button
                  type="button"
                  onClick={handleOpenEmail}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D1FF] to-blue-500 hover:scale-105 text-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,209,255,0.4)] transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Abrir Cliente de Correo</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================= CHANNEL 3: PDF OFICIAL ======================= */}
          {activeChannel === "pdf" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FF3858] font-bold flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Documento PDF Oficial de 2 Páginas (Estilo Dark Luxury)
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  ✓ Listo para Imprimir / Guardar
                </span>
              </div>

              {/* PDF Highlights Preview */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-gray-300">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#00D1FF] font-bold uppercase block">Página 1: Inversión</span>
                    <p className="text-gray-400 text-[11px]">
                      • Membrete Innocentia con Red Q & Cyan 3.<br />
                      • Desglose de inversión y gran total de <strong>${total.toLocaleString()} MXN</strong>.<br />
                      • Datos de cliente y folio <strong>{folio}</strong>.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#FF3858] font-bold uppercase block">Página 2: Alcance & QR</span>
                    <p className="text-gray-400 text-[11px]">
                      • Alcance con insignias numeradas 01–05.<br />
                      • Validación de alcance y condiciones por acordar.<br />
                      • Asesor <strong>{vendor}</strong> + Código QR interactivo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono text-gray-400">
                  📄 Abre la vista de impresión de alta resolución en una ventana nueva.
                </span>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF3858] to-[#00D1FF] hover:scale-105 text-white font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,56,88,0.4)] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Generar & Descargar PDF Oficial</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================= CHANNEL 4: LINK ======================= */}
          {activeChannel === "link" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4" />
                  Enlace Directo de Propuesta / Registro:
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Verificación de propuesta web
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={proposalUrl}
                  className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/15 text-white text-xs font-mono focus:outline-none select-all"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(proposalUrl, "link")}
                  className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  {copiedKey === "link" ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">
                  🌐 Permite al cliente abrir la propuesta directamente en el portal oficial y confirmar sus datos.
                </span>
                <a
                  href={proposalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 ml-3 flex-shrink-0"
                >
                  <span>Abrir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Documento Oficial Certificado por Innocentia Tech</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white font-mono font-bold text-xs cursor-pointer transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
