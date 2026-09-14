import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, clientName, folio, total, proposalUrl } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { success: false, error: "Destinatario y asunto son requeridos." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Innocentia Tech <cotizaciones@innocentia.tech>",
          to: [to],
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #07070E; color: #FFFFFF; padding: 30px; border-radius: 16px;">
              <h2 style="color: #00D1FF; margin-bottom: 5px;">INNOCENTIA TECH</h2>
              <p style="color: #94A3B8; font-size: 14px;">Propuesta Comercial Oficial & Ficha de Proyecto</p>
              <hr style="border-color: #1E293B; margin: 20px 0;" />
              <p>Hola <strong>${clientName || "Cliente"}</strong>,</p>
              <p>Tu propuesta comercial con folio <strong>${folio || "PROJ-XXXXXX"}</strong> ha sido generada exitosamente por un monto estimado de <strong>$${Number(total || 0).toLocaleString()} MXN</strong>.</p>
              <div style="margin: 25px 0;">
                <a href="${proposalUrl || "https://innocentia.tech"}" style="background: linear-gradient(135deg, #00D1FF, #9333EA); color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">
                  Ver Propuesta & Desglose Oficial
                </a>
              </div>
              <p style="font-size: 12px; color: #64748B;">Innocentia Tech • Arquitectura de Software & Soluciones de Inteligencia Artificial.</p>
            </div>
          `,
        }),
      });

      if (res.ok) {
        return NextResponse.json({ success: true, message: "Correo despachado vía Resend API." });
      }
    }

    // Fallback if key not set
    return NextResponse.json({
      success: true,
      mock: true,
      message: "Envío simulado exitoso. Para envíos reales en producción configura RESEND_API_KEY en .env.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error despachando correo" },
      { status: 500 }
    );
  }
}
