import { NextResponse } from "next/server";
import { supabaseRestQuery, isSupabaseConfigured } from "../../../lib/supabase/client";
import fs from "fs";
import path from "path";

// File-based store path
const STORE_PATH = path.join(process.cwd(), "src", "lib", "finance_records.json");

declare global {
  var _innocentiaFinanceStore: any[] | undefined;
}

function loadLocalStore(): any[] {
  if (global._innocentiaFinanceStore && Array.isArray(global._innocentiaFinanceStore) && global._innocentiaFinanceStore.length > 0) {
    return global._innocentiaFinanceStore;
  }
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        global._innocentiaFinanceStore = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading finance_records.json:", e);
  }
  return [];
}

function saveLocalStore(records: any[]) {
  global._innocentiaFinanceStore = records;
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving finance_records.json:", e);
  }
}

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseRestQuery<any[]>("finance_records", {
        params: { select: "*", order: "created_at.desc" },
      });
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, source: "supabase", records: data });
      }
    } catch (e) {}
  }

  const records = loadLocalStore();
  return NextResponse.json({
    success: true,
    source: "local-persistent",
    records,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
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
      id: id || "FIN-" + Date.now().toString().slice(-4),
      type: type || "gasto",
      section: section || "gasto_operativo",
      concept,
      category: category || "General",
      amount: Number(amount),
      date: date || new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
      status: status || "recurrente",
      dueDate: dueDate || undefined,
      provider: provider || undefined,
      beneficiary: beneficiary || undefined,
      projectRef: projectRef || undefined,
      sourceAccount: sourceAccount || "Santander Corporativa (Innocentia Tech)",
      registeredBy: registeredBy || "Dirección General",
      paidBy: paidBy || undefined,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabaseRestQuery("finance_records", {
          method: "POST",
          body: {
            ...record,
            due_date: record.dueDate,
            project_ref: record.projectRef,
            source_account: record.sourceAccount,
            registered_by: record.registeredBy,
            paid_by: record.paidBy,
          },
        });
      } catch (e) {}
    }

    const currentRecords = loadLocalStore();
    const updated = [record, ...currentRecords.filter((r) => r.id !== record.id)];
    saveLocalStore(updated);

    return NextResponse.json({
      success: true,
      record,
      records: updated,
      message: "Movimiento financiero registrado exitosamente.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Error procesando movimiento financiero" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID requerido" }, { status: 400 });
    }

    const currentRecords = loadLocalStore();
    const updated = currentRecords.filter((r) => r.id !== id);
    saveLocalStore(updated);

    return NextResponse.json({ success: true, message: "Movimiento eliminado", records: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
