export interface ProjectPdfData {
  folio: string;
  projectName: string;
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientEmail: string;
  vendorName: string;
  vendorCode?: string;
  projectType?: string[];
  designNeeds?: string[];
  techFeatures?: string[];
  budgetRange?: string;
  timeline?: string;
  description?: string;
  date?: string;
}

export function generateProjectPdf(data: ProjectPdfData) {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=850,height=1000");
  if (!printWindow) {
    alert("Por favor habilita las ventanas emergentes (popups) para generar el PDF.");
    return;
  }

  const currentDate = data.date || new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const projectTypesList = data.projectType && data.projectType.length > 0
    ? data.projectType.join(", ")
    : "Solución Integral";

  const designList = data.designNeeds && data.designNeeds.length > 0
    ? data.designNeeds.map(d => `<li>✓ ${d}</li>`).join("")
    : "<li>✓ Diseño UX/UI con arquitectura visual 60 FPS</li>";

  const techList = data.techFeatures && data.techFeatures.length > 0
    ? data.techFeatures.map(t => `<li>✓ ${t}</li>`).join("")
    : "<li>✓ Arquitectura de software moderna y backend escalable</li>";

  const budgetLabel = data.budgetRange || "Por definir en cotización técnica";
  const timelineLabel = data.timeline || "Estándar (1 a 3 meses)";

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ficha Oficial de Proyecto • ${data.folio} • Innocentia Tech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #111827;
      background: #FFFFFF;
      padding: 36px 40px;
      line-height: 1.5;
      font-size: 13px;
    }
    @page {
      size: A4;
      margin: 12mm 15mm;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #00D1FF;
      padding-bottom: 18px;
      margin-bottom: 22px;
    }
    .header-logo img {
      height: 46px;
      width: auto;
      object-fit: contain;
    }
    .header-info {
      text-align: right;
      font-size: 11px;
      color: #4B5563;
    }
    .header-info strong {
      color: #040407;
      font-size: 13px;
      display: block;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    /* Title Banner */
    .folio-banner {
      background: #090A10;
      color: #FFFFFF;
      border-radius: 12px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      border-left: 5px solid #00D1FF;
    }
    .folio-title h1 {
      font-size: 18px;
      font-weight: 900;
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .folio-title p {
      font-size: 11px;
      color: #9CA3AF;
      margin-top: 2px;
    }
    .folio-badge {
      background: rgba(0, 209, 255, 0.15);
      border: 1px solid #00D1FF;
      color: #00D1FF;
      font-weight: 700;
      font-size: 14px;
      padding: 6px 14px;
      border-radius: 8px;
      font-family: monospace;
    }
    
    /* Grid sections */
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      color: #1F2937;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 4px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .card {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 10px;
      padding: 12px 16px;
    }
    
    .data-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 12px;
      border-bottom: 1px dashed #E5E7EB;
    }
    .data-row:last-child {
      border-bottom: none;
    }
    .data-label {
      color: #6B7280;
      font-weight: 500;
    }
    .data-value {
      font-weight: 600;
      color: #111827;
      text-align: right;
    }
    
    .badge-tag {
      display: inline-block;
      background: #EEF2F6;
      color: #1E293B;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
    }
    
    /* Features list */
    .features-list {
      list-style: none;
      padding: 0;
    }
    .features-list li {
      font-size: 11.5px;
      padding: 3px 0;
      color: #374151;
    }
    
    .desc-box {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 12px;
      color: #374151;
      line-height: 1.6;
      margin-bottom: 20px;
      white-space: pre-wrap;
    }
    
    /* Footer */
    .footer {
      margin-top: 28px;
      border-top: 1px solid #E5E7EB;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10.5px;
      color: #6B7280;
    }
    .footer-stamp {
      background: #F0FDF4;
      border: 1px solid #86EFAC;
      color: #166534;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10px;
    }
    
    /* Floating Print Button for Screen */
    .print-bar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #090A10;
      border: 2px solid #00D1FF;
      border-radius: 100px;
      padding: 10px 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      display: flex;
      gap: 12px;
      align-items: center;
      z-index: 9999;
    }
    .print-btn {
      background: #00D1FF;
      color: #000;
      border: none;
      padding: 8px 18px;
      border-radius: 50px;
      font-weight: 800;
      font-size: 12px;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.2s;
    }
    .print-btn:hover {
      background: #38BDF8;
      transform: scale(1.04);
    }
  </style>
</head>
<body>

  <!-- Screen Action Bar -->
  <div class="print-bar no-print">
    <span style="color: #fff; font-size: 12px; font-weight: 600;">Ficha de Proyecto Generada</span>
    <button class="print-btn" onclick="window.print()">🖨️ Guardar como PDF / Imprimir</button>
  </div>

  <!-- Header -->
  <div class="header">
    <div class="header-logo">
      <img src="https://innocentia.tech/images/logo_official_header.png" alt="Innocentia Tech" />
    </div>
    <div class="header-info">
      <strong>INNOCENTIA TECH CORE</strong>
      <span>Laboratorio de Software, IA & Arquitectura Táctil</span><br>
      <span>+52 960 177 1556 • contacto@innocentia.tech • Mérida, Yucatán</span>
    </div>
  </div>

  <!-- Folio Banner -->
  <div class="folio-banner">
    <div class="folio-title">
      <h1>FICHA OFICIAL DE REQUERIMIENTO & COTIZACIÓN</h1>
      <p>Emisión Oficial: ${currentDate} • Estado: Validada por Sistema</p>
    </div>
    <div class="folio-badge">
      ${data.folio}
    </div>
  </div>

  <!-- Client & Vendor Information -->
  <div class="grid-2">
    <div>
      <div class="section-title">👤 Datos del Cliente & Empresa</div>
      <div class="card">
        <div class="data-row">
          <span class="data-label">Cliente Titular:</span>
          <span class="data-value">${data.clientName}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Empresa / Negocio:</span>
          <span class="data-value">${data.clientCompany}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Teléfono:</span>
          <span class="data-value">${data.clientPhone}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Correo Electrónico:</span>
          <span class="data-value">${data.clientEmail || "Registrado en expediente"}</span>
        </div>
      </div>
    </div>

    <div>
      <div class="section-title">💼 Asignación Comercial & Dirección</div>
      <div class="card">
        <div class="data-row">
          <span class="data-label">Asesor Asignado:</span>
          <span class="data-value" style="color: #0284C7;">${data.vendorName}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Código de Canal:</span>
          <span class="data-value">${data.vendorCode || "INN-DIRECT-01"}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Canal de Atención:</span>
          <span class="data-value">+52 960 177 1556</span>
        </div>
        <div class="data-row">
          <span class="data-label">Atribución:</span>
          <span class="data-value">Dirección General Innocentia</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Project Scope & Investment -->
  <div class="section-title">🚀 Alcance, Presupuesto & Tiempos Estimados</div>
  <div class="card" style="margin-bottom: 20px;">
    <div class="data-row">
      <span class="data-label">Nombre del Proyecto:</span>
      <span class="data-value" style="font-size: 13px; color: #000;">${data.projectName}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Tipo de Solución:</span>
      <span class="data-value"><span class="badge-tag">${projectTypesList}</span></span>
    </div>
    <div class="data-row">
      <span class="data-label">Rango Presupuestal Estimado:</span>
      <span class="data-value" style="color: #059669;">${budgetLabel}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Plazo de Entrega Deseado:</span>
      <span class="data-value">${timelineLabel}</span>
    </div>
  </div>

  <!-- Technical Breakdown (Sofia & Ivan) -->
  <div class="grid-2">
    <div>
      <div class="section-title">🎨 Requerimientos de Diseño (Sofía)</div>
      <div class="card">
        <ul class="features-list">
          ${designList}
        </ul>
      </div>
    </div>

    <div>
      <div class="section-title">⚡ Arquitectura & Backend (Iván)</div>
      <div class="card">
        <ul class="features-list">
          ${techList}
        </ul>
      </div>
    </div>
  </div>

  <!-- Description -->
  <div class="section-title">📝 Descripción del Requerimiento</div>
  <div class="desc-box">${data.description || "El cliente requiere una solución tecnológica a la medida optimizada para alta conversión y experiencia fluida."}</div>

  <!-- Footer -->
  <div class="footer">
    <div>
      <strong>INNOCENTIA TECH</strong> • Donde la imaginación se convierte en tecnología.<br>
      Ficha oficial de proyecto archivada en servidor central con sello de tiempo.
    </div>
    <div class="footer-stamp">
      ✓ Expediente Formal Registrado
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `.trim();

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
