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
  validityDays?: number;

  // Breakdown
  quoteItems?: ProposalQuoteItem[];
  subtotal?: number;
  total?: number;
  currency?: string;
  ivaNote?: string;

  // Scope & Conditions
  description?: string;
  scopeItems?: ProposalScopeItem[];
  scopeValidationText?: string;
  agreedConditions?: string[];
  paymentTerms?: string[];
  observations?: string[];

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

  const printWindow = window.open("", "_blank", "width=950,height=1100");
  if (!printWindow) {
    alert("Por favor habilita las ventanas emergentes (popups) para abrir y descargar la propuesta oficial en PDF.");
    return;
  }

  const currentDate = data.date || new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const folio = data.folio || "PROJ-" + Math.floor(100000 + Math.random() * 900000);
  const company = data.clientCompany || data.projectName || "Pro Acabados";
  const projectName = data.projectName || company;
  const modality = data.modalityTag || "Desarrollo por Proyecto / MVP a Medida";
  const clientName = data.clientName || "Daniel Torre de Haro";
  const clientEmail = data.clientEmail || "pro.acabados.mx@gmail.com";
  const clientPhone = data.clientPhone || "9902302124";
  const currency = data.currency || "MXN";
  const validity = data.validityDays || 15;

  // Items
  const defaultItems: ProposalQuoteItem[] = [
    { concept: "Arquitectura Core & Frontend Responsivo Web/Mobile", amount: 95000 },
    { concept: "Diseño UI/UX Personalizado & Microanimaciones Interactivas", amount: 25000 },
    { concept: "Base de Datos Relacional PostgreSQL & Backend APIs", amount: 22500 },
    { concept: "Módulo de IA Conversacional & Notificaciones WhatsApp", amount: 18000 },
    { concept: "Pasarela de Pagos Digitales & Panel Administrativo", amount: 12000 },
  ];
  const items = (data.quoteItems && data.quoteItems.length > 0) ? data.quoteItems : defaultItems;
  const subtotal = data.subtotal || items.reduce((sum, item) => sum + item.amount, 0);
  const total = data.total || subtotal;

  // Scope Items
  const defaultScope: ProposalScopeItem[] = [
    { number: "01", title: "Diseño de interfaz UI/UX de alta fidelidad, flujos de navegación y prototipo interactivo." },
    { number: "02", title: "Desarrollo de plataforma web progresiva (PWA) optimizada para dispositivos móviles y escritorio." },
    { number: "03", title: "Arquitectura de backend con microservicios y base de datos relacional en la nube." },
    { number: "04", title: "Integración de notificaciones push, automatización de mensajería y canal de atención." },
    { number: "05", title: "Panel de control administrativo con métricas en tiempo real y exportación de reportes." },
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

  // Payment Terms
  const defaultPaymentTerms = [
    "50% Anticipo para inicio de desarrollo, arquitectura y levantamiento de requerimientos.",
    "30% Contra entregables intermedios y validación de sprints de desarrollo.",
    "20% Liquidación final contra entrega de software en producción y entrega de accesos.",
    `Plazo de entrega estimado: ${data.timeline || "1 a 3 meses"} bajo metodología ágil con avances quincenales.`,
  ];
  const paymentTermsList = (data.paymentTerms && data.paymentTerms.length > 0) ? data.paymentTerms : defaultPaymentTerms;

  // Conditions & Observations
  const defaultObservations = [
    "Garantía de 30 días naturales posteriores al lanzamiento oficial para resolución de bugs o ajustes técnicos sin costo.",
    "Propiedad intelectual y código fuente 100% transferidos al cliente al liquidar la totalidad del proyecto.",
    "Costos de infraestructura en la nube (AWS, OpenAI, WhatsApp Cloud) se facturan directamente por los proveedores.",
    "Cualquier funcionalidad o módulo adicional fuera del alcance cotizado se cotizará como fase complementaria.",
  ];
  const observationsList = (data.observations && data.observations.length > 0) ? data.observations : defaultObservations;

  // SVG QR Code pointing to online verification
  const qrCodeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="qr-svg">
      <rect width="100" height="100" fill="#FFFFFF" rx="6" />
      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#000000" />
      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#000000" />
      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#000000" />
      <rect x="45" y="10" width="6" height="10" fill="#000000" />
      <rect x="45" y="25" width="6" height="15" fill="#000000" />
      <rect x="10" y="45" width="10" height="6" fill="#000000" />
      <rect x="25" y="45" width="15" height="6" fill="#000000" />
      <rect x="45" y="45" width="10" height="10" fill="#000000" />
      <rect x="60" y="45" width="15" height="6" fill="#000000" />
      <rect x="80" y="45" width="10" height="6" fill="#000000" />
      <rect x="45" y="60" width="6" height="15" fill="#000000" />
      <rect x="45" y="80" width="6" height="10" fill="#000000" />
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
  <title>Propuesta Comercial • ${folio} • Innocentia Tech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

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

    /* Print Controls Bar (Screen only) */
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
    .controls-bar button {
      background: linear-gradient(135deg, #00D1FF, #0284C7);
      color: #040814;
      border: none;
      padding: 10px 22px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 0 20px rgba(0,209,255,0.4);
      transition: all 0.2s ease;
    }
    .controls-bar button:hover {
      transform: scale(1.03);
      filter: brightness(1.1);
    }

    .doc-container {
      max-width: 860px;
      margin: 70px auto 40px auto;
      padding: 0 20px;
    }

    /* Page Sheet Layout (A4 exact proportion) */
    .sheet-page {
      background-color: #07070E;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 34px 34px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 44px 48px 36px 48px;
      margin-bottom: 30px;
      min-height: 1160px;
      position: relative;
      display: flex;
      flex-col;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      overflow: hidden;
    }

    /* Constellation background graph */
    .constellation-overlay {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 220px;
      pointer-events: none;
      opacity: 0.7;
    }

    /* Header */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 20px;
      margin-bottom: 24px;
      position: relative;
      z-index: 10;
    }

    .logo-box {
      display: flex;
      align-items: center;
    }

    .logo-img {
      height: 48px;
      width: auto;
      object-fit: contain;
    }

    .header-right {
      text-align: right;
    }

    .header-prop-title {
      color: #00D1FF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .header-folio {
      color: #94A3B8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
    }
    .header-folio strong {
      color: #F8FAFC;
    }

    /* Titles & Headings */
    .section-main-title {
      color: #00D1FF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 20px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .project-meta-line {
      font-size: 12px;
      color: #94A3B8;
      margin-bottom: 4px;
    }
    .project-meta-line strong {
      color: #E2E8F0;
      font-weight: 600;
    }

    /* Dark Cards */
    .dark-card {
      background: #090B12;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      padding: 22px 24px;
      margin-bottom: 20px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
    }

    .card-title {
      color: #FFFFFF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .card-title-cyan {
      color: #00D1FF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    /* Client Data 2-column grid */
    .client-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 32px;
      row-gap: 12px;
    }

    .data-row {
      display: flex;
      align-items: baseline;
      font-size: 12.5px;
    }
    .data-label {
      color: #64748B;
      width: 80px;
      flex-shrink: 0;
      font-weight: 500;
    }
    .data-val {
      color: #F1F5F9;
      font-weight: 600;
      word-break: break-all;
    }

    /* Investment Breakdown Table */
    .table-container {
      margin-bottom: 16px;
    }

    .inv-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    .inv-table th {
      color: #94A3B8;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 10px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
    .inv-table th.th-left { text-align: left; }
    .inv-table th.th-right { text-align: right; }

    .inv-table td {
      padding: 12px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 12.5px;
    }
    .inv-table td.td-concept {
      color: #F8FAFC;
      font-weight: 500;
    }
    .inv-table td.td-amount {
      text-align: right;
      color: #00D1FF;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 13px;
    }

    .subtotal-line {
      display: flex;
      justify-content: space-between;
      padding: 10px 8px;
      font-size: 12px;
      color: #94A3B8;
    }
    .subtotal-line strong {
      color: #E2E8F0;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Total Box */
    .total-card {
      background: #090B12;
      border: 1px solid rgba(0, 209, 255, 0.4);
      border-radius: 18px;
      padding: 20px 24px;
      margin-top: 14px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 0 25px rgba(0,209,255,0.08);
    }

    .total-card-label {
      color: #00D1FF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 15px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .total-card-amount {
      color: #FFFFFF;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      font-size: 26px;
      letter-spacing: -0.5px;
    }

    .moneda-tag {
      font-size: 11px;
      color: #64748B;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 16px;
    }

    /* Scope & Deliverables List */
    .scope-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .scope-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 12.5px;
      color: #E2E8F0;
      line-height: 1.45;
    }

    .scope-number {
      background: rgba(0, 209, 255, 0.12);
      border: 1px solid rgba(0, 209, 255, 0.3);
      color: #00D1FF;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 8px;
      flex-shrink: 0;
    }

    /* Bullet List for Terms & Observations */
    .bullet-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12.5px;
      color: #CBD5E1;
      line-height: 1.45;
    }

    .bullet-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00D1FF;
      margin-top: 6px;
      flex-shrink: 0;
    }

    /* Footer */
    .doc-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .footer-left {
      font-size: 11.5px;
      color: #94A3B8;
      line-height: 1.6;
    }

    .footer-center {
      text-align: center;
    }
    .footer-center a {
      color: #00D1FF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      letter-spacing: 0.5px;
    }

    .footer-right {
      width: 62px;
      height: 62px;
      flex-shrink: 0;
    }
    .qr-svg {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 6px;
    }

    /* Print Styles */
    @media print {
      body {
        background-color: #07070E !important;
      }
      .controls-bar {
        display: none !important;
      }
      .doc-container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .sheet-page {
        border: none !important;
        box-shadow: none !important;
        margin-bottom: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
        min-height: 100vh !important;
        padding: 36px 40px !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Action Bar -->
  <div class="controls-bar">
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="font-family:'Space Grotesk', sans-serif; font-weight:800; color:#00D1FF; font-size:14px; letter-spacing:1px;">INNOCENTIA TECH</span>
      <span style="color:#64748B; font-size:12px;">• Propuesta Comercial Oficial (${folio})</span>
    </div>
    <div style="display:flex; align-items:center; gap:12px;">
      <button onclick="window.print()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Descargar / Imprimir PDF
      </button>
    </div>
  </div>

  <div class="doc-container">

    <!-- ========================================================================= -->
    <!-- PÁGINA 1: COTIZACIÓN ESTIMADA & DESGLOSE ECONÓMICO -->
    <!-- ========================================================================= -->
    <div class="sheet-page">
      <!-- Constellation Top Graph Overlay -->
      <svg class="constellation-overlay" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="90" r="3" fill="#FF3858" />
        <circle cx="140" cy="180" r="2.5" fill="#00D1FF" />
        <circle cx="350" cy="80" r="3.5" fill="#00D1FF" />
        <circle cx="500" cy="100" r="2.5" fill="#FF3858" />
        <circle cx="640" cy="50" r="3.5" fill="#00D1FF" />
        <circle cx="780" cy="140" r="3" fill="#FF3858" />
        <line x1="20" y1="90" x2="140" y2="180" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="140" y1="180" x2="350" y2="80" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="350" y1="80" x2="500" y2="100" stroke="rgba(255,56,88,0.2)" stroke-width="1.2" />
        <line x1="500" y1="100" x2="640" y2="50" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="640" y1="50" x2="780" y2="140" stroke="rgba(255,56,88,0.2)" stroke-width="1.2" />
      </svg>

      <div>
        <!-- Header -->
        <div class="doc-header">
          <div class="logo-box">
            <img src="https://innocentia.tech/images/logo_official_header.png" onerror="this.onerror=null; this.src='/images/logo_official_header.png';" alt="INNOCENTIA" class="logo-img" />
          </div>
          <div class="header-right">
            <div class="header-prop-title">Propuesta Comercial</div>
            <div class="header-folio">FOLIO: <strong>${folio}</strong></div>
          </div>
        </div>

        <!-- Section Title -->
        <div class="section-main-title">Cotización Estimada</div>
        <div class="project-meta-line">PROYECTO: <strong>${projectName}</strong></div>
        <div class="project-meta-line" style="margin-bottom: 22px;">MODALIDAD: <strong>${modality}</strong></div>

        <!-- Card 1: Datos del Cliente -->
        <div class="dark-card">
          <div class="card-title">Datos del Cliente</div>
          <div class="client-grid">
            <div class="data-row"><span class="data-label">Nombre:</span><span class="data-val">${clientName}</span></div>
            <div class="data-row"><span class="data-label">Fecha:</span><span class="data-val">${currentDate}</span></div>
            <div class="data-row"><span class="data-label">Empresa:</span><span class="data-val">${company}</span></div>
            <div class="data-row"><span class="data-label">Vigencia:</span><span class="data-val">${validity} días naturales</span></div>
            <div class="data-row"><span class="data-label">Correo:</span><span class="data-val">${clientEmail}</span></div>
            <div class="data-row"><span class="data-label">Teléfono:</span><span class="data-val">${clientPhone}</span></div>
          </div>
        </div>

        <!-- Section 2: Desglose de Inversión -->
        <div style="margin-top: 10px;">
          <div class="section-main-title" style="font-size: 15px; margin-bottom: 4px;">Desglose de Inversión</div>
          <table class="inv-table">
            <thead>
              <tr>
                <th class="th-left">Concepto</th>
                <th class="th-right">Importe</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td class="td-concept">${item.concept}</td>
                  <td class="td-amount">$${item.amount.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="subtotal-line" style="margin-top: 8px;">
            <span>Subtotal</span>
            <strong>$${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}</strong>
          </div>
          <div class="subtotal-line" style="padding-top: 0; color: #64748B; font-size: 11px;">
            <span>Impuestos</span>
            <span>Precios netos / Sujeto a IVA en caso de requerir comprobante fiscal</span>
          </div>
        </div>

        <!-- Card: Inversión Total -->
        <div class="total-card">
          <div class="total-card-label">Inversión Total</div>
          <div class="total-card-amount">$${total.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:14px; color:#00D1FF; font-weight:700;">${currency}</span></div>
        </div>

        <div class="moneda-tag">MONEDA: ${currency} (Pesos Mexicanos)</div>
      </div>

      <!-- Footer -->
      <div class="doc-footer">
        <div class="footer-left">
          <div>ventas@innocentia.tech</div>
          <div>WhatsApp Business 960 177 1556</div>
        </div>
        <div class="footer-center">
          <a href="https://innocentia.tech" target="_blank">www.innocentia.tech</a>
        </div>
        <div class="footer-right">
          ${qrCodeSvg}
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- PÁGINA 2: ALCANCE Y CONDICIONES -->
    <!-- ========================================================================= -->
    <div class="sheet-page">
      <!-- Constellation Top Graph Overlay -->
      <svg class="constellation-overlay" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="90" r="3" fill="#FF3858" />
        <circle cx="140" cy="180" r="2.5" fill="#00D1FF" />
        <circle cx="350" cy="80" r="3.5" fill="#00D1FF" />
        <circle cx="500" cy="100" r="2.5" fill="#FF3858" />
        <circle cx="640" cy="50" r="3.5" fill="#00D1FF" />
        <circle cx="780" cy="140" r="3" fill="#FF3858" />
        <line x1="20" y1="90" x2="140" y2="180" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="140" y1="180" x2="350" y2="80" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="350" y1="80" x2="500" y2="100" stroke="rgba(255,56,88,0.2)" stroke-width="1.2" />
        <line x1="500" y1="100" x2="640" y2="50" stroke="rgba(0,209,255,0.2)" stroke-width="1.2" />
        <line x1="640" y1="50" x2="780" y2="140" stroke="rgba(255,56,88,0.2)" stroke-width="1.2" />
      </svg>

      <div>
        <!-- Header -->
        <div class="doc-header">
          <div class="logo-box">
            <img src="https://innocentia.tech/images/logo_official_header.png" onerror="this.onerror=null; this.src='/images/logo_official_header.png';" alt="INNOCENTIA" class="logo-img" />
          </div>
          <div class="header-right">
            <div class="header-prop-title">Propuesta Comercial</div>
            <div class="header-folio">FOLIO: <strong>${folio}</strong></div>
          </div>
        </div>

        <!-- Section Title -->
        <div class="section-main-title">Alcance y Condiciones</div>
        <div class="project-meta-line" style="margin-bottom: 22px;">PROYECTO: <strong>${projectName}</strong></div>

        <!-- Card 1: Alcance y Entregables -->
        <div class="dark-card">
          <div class="card-title-cyan">Alcance y Entregables</div>
          <ul class="scope-list">
            ${scopeList.map(item => `
              <li class="scope-item">
                <span class="scope-number">${item.number}</span>
                <span>${item.title}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Card 2: Pagos y Plazos -->
        <div class="dark-card">
          <div class="card-title-cyan">Pagos y Plazos</div>
          <ul class="bullet-list">
            ${paymentTermsList.map(term => `
              <li class="bullet-item">
                <span class="bullet-dot"></span>
                <span>${term}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Card 3: Condiciones y Observaciones -->
        <div class="dark-card">
          <div class="card-title-cyan">Condiciones y Observaciones</div>
          <ul class="bullet-list">
            ${observationsList.map(obs => `
              <li class="bullet-item">
                <span class="bullet-dot"></span>
                <span>${obs}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="doc-footer">
        <div class="footer-left">
          <div>ventas@innocentia.tech</div>
          <div>WhatsApp Business 960 177 1556</div>
        </div>
        <div class="footer-center">
          <a href="https://innocentia.tech" target="_blank">www.innocentia.tech</a>
        </div>
        <div class="footer-right">
          ${qrCodeSvg}
        </div>
      </div>
    </div>

  </div>

</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
