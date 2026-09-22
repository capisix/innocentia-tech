import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      ticketId,
      projectName,
      projectId,
      company,
      branch,
      reportedBy,
      reporterRole,
      date,
      module,
      category,
      categoryLabel,
      impact,
      impactLabel,
      internalPriority,
      title,
      whatYouWant,
      expectedBehavior,
      currentBehavior,
      reproductionSteps,
      desiredResult,
      evidenceUrl,
    } = body;

    const recipients = ["ventas@innocentia.tech", "ceo.ivan@innocentia.tech"];
    const subject = `[TICKET #${ticketId || "MC-0001"}] ${categoryLabel || "Reporte"} - ${projectName || company || "Proyecto"}: ${title}`;

    const resendApiKey = process.env.RESEND_API_KEY;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #07070E; color: #F3F4F6; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background-color: #0B0B14; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #FF3858, #8A2BE2, #00D1FF); padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; color: #FFFFFF; letter-spacing: 1px; font-family: monospace; }
          .header p { margin: 4px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.85); }
          .content { padding: 24px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; font-family: monospace; }
          .badge-p0 { background-color: rgba(255,56,88,0.2); color: #FF3858; border: 1px solid #FF3858; }
          .badge-p1 { background-color: rgba(255,184,0,0.2); color: #FFB800; border: 1px solid #FFB800; }
          .badge-p3 { background-color: rgba(16,185,129,0.2); color: #10B981; border: 1px solid #10B981; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 11px; text-transform: uppercase; color: #00D1FF; letter-spacing: 1px; font-family: monospace; margin-bottom: 6px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
          .card { background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 10px; font-size: 13px; }
          .card span { display: block; font-size: 10px; color: #94A3B8; margin-bottom: 2px; text-transform: uppercase; font-family: monospace; }
          .card strong { color: #FFFFFF; }
          .box { background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px; border-radius: 10px; font-size: 13px; line-height: 1.5; color: #CBD5E1; margin-bottom: 14px; }
          .box-highlight { background-color: rgba(0,209,255,0.06); border: 1px solid rgba(0,209,255,0.25); color: #FFFFFF; font-weight: 500; }
          .footer { background-color: #040407; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748B; font-family: monospace; border-top: 1px solid #1E293B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 INNOCENTIA TECH — REPORTE DE SISTEMA</h1>
            <p>Folio: #${ticketId || "MC-0001"} • Proyecto: ${projectName || company}</p>
          </div>

          <div class="content">
            <!-- Badges & Meta -->
            <div style="margin-bottom: 18px; display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="badge ${impact === "critical" ? "badge-p0" : impact === "medium" ? "badge-p1" : "badge-p3"}">
                ${internalPriority || "PRIORIDAD ESTÁNDAR"}
              </span>
              <span class="badge" style="background-color: rgba(0,209,255,0.15); color: #00D1FF; border: 1px solid rgba(0,209,255,0.3);">
                ${categoryLabel || "REQUERIMIENTO"}
              </span>
              <span class="badge" style="background-color: rgba(255,255,255,0.08); color: #E2E8F0; border: 1px solid rgba(255,255,255,0.15);">
                MÓDULO: ${module}
              </span>
            </div>

            <!-- Meta Grid -->
            <div class="grid">
              <div class="card">
                <span>Proyecto Vinculado</span>
                <strong>${projectName || company}</strong>
              </div>
              <div class="card">
                <span>Empresa / Sucursal</span>
                <strong>${company} ${branch ? `(${branch})` : ""}</strong>
              </div>
              <div class="card">
                <span>Reportado Por</span>
                <strong>${reportedBy} ${reporterRole ? `• ${reporterRole}` : ""}</strong>
              </div>
              <div class="card">
                <span>Fecha del Reporte</span>
                <strong>${date || "22/09/2026"}</strong>
              </div>
            </div>

            <!-- Título -->
            <div class="section">
              <div class="section-title">Título del Reporte</div>
              <div class="box" style="font-size: 15px; font-weight: bold; color: #FFFFFF;">
                ${title}
              </div>
            </div>

            <!-- ¿Qué quieres hacer? -->
            <div class="section">
              <div class="section-title">1. ¿Qué se desea hacer?</div>
              <div class="box">
                ${whatYouWant || "No especificado"}
              </div>
            </div>

            <!-- ¿Cómo esperaba que funcionara? -->
            <div class="section">
              <div class="section-title">2. ¿Cómo esperaba que funcionara?</div>
              <div class="box">
                ${expectedBehavior || "No especificado"}
              </div>
            </div>

            <!-- ¿Qué sucede actualmente? -->
            <div class="section">
              <div class="section-title">3. ¿Qué sucede actualmente?</div>
              <div class="box">
                ${currentBehavior || "No especificado"}
              </div>
            </div>

            <!-- Pasos para reproducirlo -->
            <div class="section">
              <div class="section-title">4. Pasos para reproducirlo / Ruta</div>
              <div class="box">
                ${reproductionSteps || "No especificado"}
              </div>
            </div>

            <!-- Resultado deseado -->
            <div class="section">
              <div class="section-title">5. Resultado deseado (Ejemplo Concreto)</div>
              <div class="box box-highlight">
                ${desiredResult || "No especificado"}
              </div>
            </div>

            <!-- Impacto Operativo -->
            <div class="section">
              <div class="section-title">6. Impacto Operativo</div>
              <div class="box">
                <strong>${impactLabel || "No especificado"}</strong>
              </div>
            </div>

            ${evidenceUrl ? `
            <div class="section">
              <div class="section-title">7. Evidencia Adjunta</div>
              <div class="box">
                <a href="${evidenceUrl}" style="color: #00D1FF; text-decoration: underline;" target="_blank">
                  ${evidenceUrl}
                </a>
              </div>
            </div>
            ` : ""}
          </div>

          <div class="footer">
            Este ticket fue registrado desde el Portal de Seguimiento &amp; Revisión de Innocentia Tech.<br/>
            Notificación automática para: ventas@innocentia.tech &amp; ceo.ivan@innocentia.tech
          </div>
        </div>
      </body>
      </html>
    `;

    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Innocentia QA & Tickets <tickets@innocentia.tech>",
            to: recipients,
            subject,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          const resData = await res.json();
          return NextResponse.json({
            success: true,
            message: "Ticket enviado por correo a ventas@innocentia.tech y ceo.ivan@innocentia.tech",
            recipients,
            provider: "resend",
            resendId: resData.id,
          });
        }
      } catch (e: any) {
        console.error("Error sending via Resend:", e);
      }
    }

    // Return successful simulation response if API key is not configured locally
    return NextResponse.json({
      success: true,
      mock: true,
      recipients,
      message: "Ticket registrado y simulado exitosamente a ventas@innocentia.tech y ceo.ivan@innocentia.tech (Configura RESEND_API_KEY para envío SMTP real en producción).",
      ticketId,
      subject,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error procesando ticket" },
      { status: 500 }
    );
  }
}
