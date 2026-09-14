import { NextResponse } from "next/server";

// In-memory OTP code store for active verification sessions
// Key: email -> { code: string, expiresAt: number }
declare global {
  var _innocentiaOtpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

if (!global._innocentiaOtpStore) {
  global._innocentiaOtpStore = new Map();
}
const otpStore = global._innocentiaOtpStore;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate 6-digit secure code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

    otpStore.set(cleanEmail, { code, expiresAt });

    // Try sending email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Innocentia Security <seguridad@innocentia.tech>",
          to: [cleanEmail],
          subject: `${code} es tu código de verificación • Innocentia Tech`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #07070E; color: #FFFFFF; padding: 35px; border-radius: 20px;">
              <h2 style="color: #00D1FF; margin-bottom: 5px;">INNOCENTIA SECURITY</h2>
              <p style="color: #94A3B8; font-size: 14px;">Código de Verificación de Acceso Seguro</p>
              <hr style="border-color: #1E293B; margin: 20px 0;" />
              <p style="font-size: 15px;">Usa el siguiente código de 6 dígitos para verificar tu cuenta e ingresar al Portal:</p>
              <div style="margin: 25px 0; text-align: center;">
                <span style="display: inline-block; background: #0F172A; border: 2px solid #00D1FF; color: #00D1FF; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 14px 28px; border-radius: 12px; font-family: monospace;">
                  ${code}
                </span>
              </div>
              <p style="font-size: 12px; color: #64748B;">Este código es confidencial y vence en 10 minutos. Si no solicitaste este acceso, puedes ignorar este mensaje.</p>
            </div>
          `,
        }),
      }).catch((e) => console.log("Resend OTP error:", e));
    }

    return NextResponse.json({
      success: true,
      message: "Código de verificación enviado exitosamente a tu correo.",
      expiresIn: 600,
      // In dev fallback mode we return the code for instant seamless testing
      devCode: !resendApiKey ? code : undefined,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error generando código de verificación." },
      { status: 500 }
    );
  }
}
