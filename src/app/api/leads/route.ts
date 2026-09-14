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
        id: "LEAD-01",
        folio: "PROJ-592160",
        clientName: "Daniel Torre de Haro",
        company: "Pro Acabados",
        phone: "9902302124",
        email: "pro.acabados.mx@gmail.com",
        city: "Mérida / Yucatán",
        status: "En Cotización",
        estimatedBudget: "$50,000 - $150,000 MXN",
        totalQuote: 172500,
        vendorCode: "VEN-CARLOS-202",
        vendorName: "Carlos Mendoza",
        createdAt: "2026-09-09T18:00:00Z",
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
      city: city || "Mérida, Yucatán",
      status: "Formulario Enviado",
      project_type: projectType || [],
      design_needs: designNeeds || [],
      tech_features: techFeatures || [],
      estimated_budget: estimatedBudget || "",
      total_quote: totalQuote || 0,
      quote_details: quoteDetails || {},
      vendor_code: vendorCode || "VEN-CARLOS-202",
      vendor_name: vendorName || "Carlos Mendoza",
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
