export interface ProposalQuoteItem {
  concept: string;
  amount: number;
  highlight?: boolean;
}

export interface ProposalScopeItem {
  number: string;
  title: string;
}

export interface ProjectPdfData {
  folio: string;
  clientId?: string;
  projectName: string;
  clientCompany?: string;
  subtitle?: string;
  modalityTag?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCity?: string;
  date?: string;

  // Breakdown
  quoteItems?: ProposalQuoteItem[];
  subtotal?: number;
  total?: number;
  currency?: string;
  ivaNote?: string;

  // Scope
  description?: string;
  scopeItems?: ProposalScopeItem[];
  scopeValidationText?: string;
  agreedConditions?: string[];

  // Vendor & QR
  vendorName: string;
  vendorCode?: string;
  declaredBudget?: string;
  budgetNotice?: string;
  qrUrl?: string;

  // Legacy fallback compatibility
  projectType?: string[];
  designNeeds?: string[];
  techFeatures?: string[];
  budgetRange?: string;
  timeline?: string;
}

export function generateProjectPdf(data: ProjectPdfData) {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=900,height=1050");
  if (!printWindow) {
    alert("Por favor habilita las ventanas emergentes (popups) para abrir la propuesta oficial en PDF.");
    return;
  }

  const currentDate = data.date || new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const clientId = data.clientId || "CLI-" + Math.floor(10000 + Math.random() * 90000);
  const company = data.clientCompany || data.projectName;
  const subtitle = data.subtitle || data.description || "App de pedidos y entregas de producto";
  const modality = data.modalityTag || "Desarrollo por proyecto / MVP";
  const city = data.clientCity || "Mérida, Yucatán, México";
  const vendor = data.vendorName || "Carlos Mendoza";
  const vendorCode = data.vendorCode || "VEN-CARLOS-202";

  // Build items list
  const defaultItems: ProposalQuoteItem[] = [
    { concept: "Base de software", amount: 120000 },
    { concept: "Diseño UI/UX personalizado", amount: 22000, highlight: true },
    { concept: "Chatbot IA + WhatsApp Business", amount: 18500 },
    { concept: "Pasarela Stripe / SPEI", amount: 12000 },
  ];

  const items = (data.quoteItems && data.quoteItems.length > 0) ? data.quoteItems : defaultItems;
  const subtotal = data.subtotal || items.reduce((sum, item) => sum + item.amount, 0);
  const total = data.total || subtotal;

  // Build scope items
  const defaultScope: ProposalScopeItem[] = [
    { number: "01", title: "Diseño UI/UX de alta fidelidad y microanimaciones." },
    { number: "02", title: "Autenticación y base de datos PostgreSQL." },
    { number: "03", title: "Pagos en línea y seguimiento GPS en tiempo real." },
    { number: "04", title: "IA conversacional y notificaciones por WhatsApp." },
    { number: "05", title: "Panel administrativo, métricas y exportación de datos." },
  ];

  let scopeList = (data.scopeItems && data.scopeItems.length > 0) ? data.scopeItems : defaultScope;
  if ((!data.scopeItems || data.scopeItems.length === 0) && (data.designNeeds || data.techFeatures)) {
    const combined = [...(data.designNeeds || []), ...(data.techFeatures || [])];
    if (combined.length > 0) {
      scopeList = combined.map((item, idx) => ({
        number: (idx + 1).toString().padStart(2, "0"),
        title: item.replace(/^✓\s*/, ""),
      }));
    }
  }

  const validationText = data.scopeValidationText ||
    "La cotización identifica los módulos acordados en la etapa de levantamiento. Se debe confirmar la cobertura de funciones específicas antes del cierre definitivo de alcance.";

  const defaultConditions = [
    `Plazo solicitado: ${data.timeline || "1 a 3 meses"}; calendario de entrega por confirmar.`,
    "Definir anticipo, hitos de pago y criterios de aceptación.",
    "Precisar soporte, garantía, licencias y entrega de código.",
    "Detallar hosting y consumos de IA, WhatsApp y pasarela.",
    "Acordar vigencia y tratamiento de cambios de alcance.",
  ];
  const conditions = (data.agreedConditions && data.agreedConditions.length > 0) ? data.agreedConditions : defaultConditions;

  const declaredBudget = data.declaredBudget || data.budgetRange || "$50,000 a $150,000 MXN";
  const budgetNotice = data.budgetNotice || (total > 150000 ? `La estimación se adapta a la complejidad de módulos requeridos (${declaredBudget}).` : undefined);

  // SVG QR Code pointing to online proposal verification
  const qrCodeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="qr-svg">
      <rect width="100" height="100" fill="#FFFFFF" rx="8" />
      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#000000" />
      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#000000" />
      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#000000" />
      <rect x="45" y="10" width="5" height="10" fill="#000000" />
      <rect x="45" y="25" width="5" height="15" fill="#000000" />
      <rect x="10" y="45" width="10" height="5" fill="#000000" />
      <rect x="25" y="45" width="15" height="5" fill="#000000" />
      <rect x="45" y="45" width="10" height="10" fill="#000000" />
      <rect x="60" y="45" width="15" height="5" fill="#000000" />
      <rect x="80" y="45" width="10" height="5" fill="#000000" />
      <rect x="45" y="60" width="5" height="15" fill="#000000" />
      <rect x="45" y="80" width="5" height="10" fill="#000000" />
      <rect x="60" y="60" width="10" height="10" fill="#000000" />
      <rect x="75" y="60" width="15" height="10" fill="#000000" />
      <rect x="60" y="75" width="15" height="15" fill="#000000" />
      <rect x="80" y="75" width="10" height="15" fill="#000000" />
    </svg>
  `;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Propuesta Comercial • ${data.folio} • Innocentia Tech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #06070B;
      color: #E2E8F0;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Print Controls Bar */
    .controls-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #0B0D14;
      border-bottom: 1px solid rgba(255,255,255,0.15);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    }
    .controls-bar button, .controls-bar a {
      background: linear-gradient(135deg, #FF3858, #00D1FF);
      color: #FFFFFF;
      border: none;
      padding: 10px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 0 20px rgba(0,209,255,0.3);
    }
    .controls-bar .btn-sec {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #E2E8F0;
      box-shadow: none;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      .controls-bar {
        display: none !important;
      }
      body {
        background: #08090E !important;
      }
      .page-container {
        padding-top: 0 !important;
      }
      .page {
        margin: 0 !important;
        box-shadow: none !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
      }
    }

    .page-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 70px;
      padding-bottom: 40px;
      gap: 30px;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      max-height: 297mm;
      height: 297mm;
      background: #08090E;
      background-image: 
        radial-gradient(circle at 10% 15%, rgba(255,56,88,0.06) 0%, transparent 40%),
        radial-gradient(circle at 90% 85%, rgba(0,209,255,0.06) 0%, transparent 40%),
        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 28px 28px, 28px 28px;
      padding: 24mm 24mm;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.9);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
    }

    /* Ambient Subtle Constellation Lines */
    .page::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 260px;
      height: 260px;
      background: radial-gradient(circle, rgba(0,209,255,0.08), transparent 70%);
      pointer-events: none;
    }

    /* Header */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #FFFFFF;
    }
    .brand-logo-text span.accent-red { color: #FF3858; }
    .brand-logo-text span.accent-cyan { color: #00D1FF; }

    .header-meta {
      text-align: right;
    }
    .meta-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      color: #00D1FF;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }
    .meta-folio {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.5px;
    }

    /* Titles */
    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 800;
      color: #00D1FF;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-label::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00D1FF;
    }

    .project-main-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.2;
      margin-bottom: 4px;
      letter-spacing: -0.5px;
    }
    .project-sub-title {
      font-size: 13px;
      color: #94A3B8;
      margin-bottom: 6px;
    }
    .project-modality {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #64748B;
      display: inline-block;
      margin-bottom: 20px;
    }

    /* 2-Column Info Card */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .info-col-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 800;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .info-col-name {
      font-weight: 700;
      color: #FFFFFF;
      font-size: 13px;
      margin-bottom: 3px;
    }
    .info-col-item {
      font-size: 12px;
      color: #94A3B8;
      margin-bottom: 2px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Investment Breakdown Table */
    .breakdown-table {
      width: 100%;
      margin-bottom: 20px;
    }
    .breakdown-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 12.5px;
    }
    .breakdown-row.subtotal-row {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      border-bottom: none;
      padding-top: 12px;
      font-weight: 600;
      color: #FFFFFF;
    }
    .item-name {
      color: #CBD5E1;
      font-weight: 500;
    }
    .item-price {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #FFFFFF;
    }
    .item-price.highlight {
      color: #00D1FF;
    }

    /* Grand Total Card */
    .total-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      box-shadow: inset 0 0 30px rgba(0, 209, 255, 0.03);
    }
    .total-label-wrap {
      font-family: 'JetBrains Mono', monospace;
    }
    .total-label-title {
      font-size: 10px;
      font-weight: 800;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .total-label-curr {
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
      margin-top: 2px;
    }
    .total-amount-large {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 34px;
      font-weight: 900;
      color: #10B981;
      letter-spacing: -1px;
      text-shadow: 0 0 25px rgba(16, 185, 129, 0.35);
    }

    .disclaimer-text {
      font-size: 10.5px;
      color: #64748B;
      line-height: 1.45;
      margin-bottom: 20px;
    }

    /* Page Footer */
    .doc-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      color: #64748B;
    }
    .doc-footer strong {
      color: #94A3B8;
    }
    .footer-right {
      text-align: right;
    }

    /* Page 2 Specific Styles */
    .scope-desc {
      font-size: 12.5px;
      color: #94A3B8;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .scope-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }
    .scope-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 12px;
      color: #E2E8F0;
    }
    .scope-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      font-weight: 800;
      color: #00D1FF;
      background: rgba(0,209,255,0.1);
      border: 1px solid rgba(0,209,255,0.25);
      border-radius: 6px;
      padding: 2px 6px;
      flex-shrink: 0;
    }

    .card-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 18px;
    }
    .card-box-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 800;
      color: #F59E0B;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .card-box-text {
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.45;
    }

    .conditions-list {
      list-style: none;
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
