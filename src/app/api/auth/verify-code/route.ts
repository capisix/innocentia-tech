import { NextResponse } from "next/server";

declare global {
  var _innocentiaOtpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

if (!global._innocentiaOtpStore) {
  global._innocentiaOtpStore = new Map();
}
const otpStore = global._innocentiaOtpStore;

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Correo y código son obligatorios." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const entry = otpStore.get(cleanEmail);

    // Master verification code for testing or valid active session code
    const isMasterCode = cleanCode === "777888" || cleanCode === "123456";
    const isValidStored = entry && entry.code === cleanCode && Date.now() <= entry.expiresAt;

    if (!isMasterCode && !isValidStored) {
      return NextResponse.json(
        { success: false, error: "El código ingresado es incorrecto o ha expirado." },
        { status: 401 }
      );
    }

    // Determine Role
    let role = "usuario";
    let roleTitle = "Cliente Verificado";
    let name = cleanEmail.split("@")[0];

    if (cleanEmail.includes("ivan") || cleanEmail.includes("ceo")) {
      role = "ceo";
      roleTitle = "Director General & CEO";
      name = "Iván Castillo";
    } else if (cleanEmail.includes("daniel") || cleanEmail.includes("pro.acabados")) {
      role = "socio";
      roleTitle = "Socio Co-Fundador & Operaciones";
      name = "Daniel Torre";
    } else if (cleanEmail.includes("jorge")) {
      role = "socio";
      roleTitle = "Socio Co-Fundador & Estrategia";
      name = "Jorge Pérez";
    } else if (cleanEmail.includes("carlos") || cleanEmail.includes("ventas")) {
      role = "asesor";
      roleTitle = "Asesor Comercial Certificado";
      name = "Carlos Mendoza";
    } else if (cleanEmail.includes("rodrigo") || cleanEmail.includes("dev")) {
      role = "dev";
      roleTitle = "Senior Fullstack & AI Engineer";
      name = "Ing. Rodrigo Pacheco";
    }

    // Clear used code
    otpStore.delete(cleanEmail);

    const token = "AUTH_VERIFIED_" + Buffer.from(cleanEmail + "_" + Date.now()).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      verifiedEmail: cleanEmail,
      user: {
        id: "usr_" + Buffer.from(cleanEmail).toString("hex").slice(0, 10),
        name,
        email: cleanEmail,
        role,
        roleTitle,
        isEmailVerified: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error verificando código." },
      { status: 500 }
    );
  }
}
