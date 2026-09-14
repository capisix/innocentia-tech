import { NextResponse } from "next/server";
import { supabaseRestQuery, isSupabaseConfigured } from "../../../lib/supabase/client";

export async function GET() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseRestQuery<any[]>("finance_records", {
      params: { select: "*", order: "created_at.desc" },
    });
    if (!error && data) {
      return NextResponse.json({ success: true, source: "supabase", records: data });
    }
  }

  return NextResponse.json({
    success: true,
    source: "local",
    message: "Operando con estado local sincronizado.",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type,
      section,
      concept,
      category,
      amount,
      date,
      status,
      dueDate,
      provider,
      beneficiary,
      projectRef,
      sourceAccount,
      registeredBy,
      paidBy,
    } = body;

    if (!concept || !amount) {
      return NextResponse.json(
        { success: false, error: "Concepto y monto son obligatorios." },
        { status: 400 }
      );
    }

    const record = {
      id: "FIN-" + Date.now().toString().slice(-4),
      type: type || "gasto",
      section: section || "gasto_operativo",
      concept,
      category: category || "General",
      amount: Number(amount),
      date: date || new Date().toLocaleDateString("es-MX"),
      status: status || "pagado",
      due_date: dueDate || undefined,
      provider: provider || undefined,
      beneficiary: beneficiary || undefined,
      project_ref: projectRef || undefined,
      source_account: sourceAccount || "Santander Corporativa",
      registered_by: registeredBy || "Dirección General",
      paid_by: paidBy || undefined,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      await supabaseRestQuery("finance_records", {
        method: "POST",
        body: record,
      });
    }

    return NextResponse.json({
      success: true,
      record,
      message: "Movimiento financiero registrado.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error procesando movimiento financiero" },
      { status: 500 }
    );
  }
}
