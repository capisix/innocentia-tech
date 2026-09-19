import { NextResponse } from "next/server";
import { supabaseRestQuery, isSupabaseConfigured } from "../../../lib/supabase/client";

export async function GET() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseRestQuery<any[]>("leads", {
      params: { select: "*", order: "created_at.desc" },
    });
    if (!error && data) {
      return NextResponse.json({ success: true, source: "supabase", leads: data });
    }
  }

  // Fallback mock/local response
  return NextResponse.json({
    success: true,
    source: "local",
    leads: [
      {
        id: "LEAD-AXANA",
        folio: "PROJ-AXANA-2026",
        clientName: "Axana",
        company: "Axana",
        phone: "+52 55 8421 0898",
        email: "contacto@axana.mx",
        city: "México",
        status: "En Revisión",
        estimatedBudget: "$80,000 - $150,000 MXN",
        totalQuote: 120000,
        vendorCode: "VEN-JESS-101",
        vendorName: "Jessica Torre",
        createdAt: "2026-09-14T15:30:00Z",
      },
    ],
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      clientName,
      company,
      phone,
      email,
      city,
      projectType,
      designNeeds,
      techFeatures,
      estimatedBudget,
      totalQuote,
      quoteDetails,
      vendorCode,
      vendorName,
    } = body;

    if (!clientName || !phone) {
      return NextResponse.json(
        { success: false, error: "Nombre y teléfono son obligatorios." },
        { status: 400 }
      );
    }

    const folio = "PROJ-" + Math.floor(100000 + Math.random() * 900000);
    const leadRecord = {
      id: "LEAD-" + Date.now().toString().slice(-6),
      folio,
      client_name: clientName,
      company: company || clientName,
      phone,
      email: email || "",
      city: city || "México",
      status: "Formulario Enviado",
      project_type: projectType || [],
      design_needs: designNeeds || [],
      tech_features: techFeatures || [],
      estimated_budget: estimatedBudget || "",
      total_quote: totalQuote || 0,
      quote_details: quoteDetails || {},
      vendor_code: vendorCode || "SIN-ASESOR",
      vendor_name: vendorName || "Sin Asesor Asignado",
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      await supabaseRestQuery("leads", {
        method: "POST",
        body: leadRecord,
      });
    }

    return NextResponse.json({
      success: true,
      folio,
      lead: leadRecord,
      message: "Lead registrado exitosamente en Innocentia Tech.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error procesando el lead" },
      { status: 500 }
    );
  }
}
