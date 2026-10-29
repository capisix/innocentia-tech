/**
 * guardrails.ts • INNOCENTIA TECH & MULTICOMMERCE
 * Candados de Integridad y Blindaje de Datos (Protocolo Larry)
 * 
 * Implementación de los 5 candados universales:
 * 1. Fechas Locales Puras
 * 2. Auditoría en Compilación (verify-guardrails)
 * 3. Fusión Inteligente Multi-Dispositivo (Smart Merge & Snapshots)
 * 4. Aislamiento Contable & Validación de Balances
 * 5. Auto-Curación de Datos (Self-Healing)
 */

import { normalizeDateStr, getLocalDateStr } from "./dateUtils";

export interface GuardrailSnapshot {
  timestamp: number;
  dateStr: string;
  source: string;
  recordCount: number;
  data: any;
}

/**
 * CANDADO 3: Fusión Inteligente Multi-Dispositivo (Smart Merge)
 * Combina dos listas de registros por su ID único sin sobrescribir ni perder registros
 * agregados en otros dispositivos (celular, tablet o computadora de socios).
 */
export function smartMergeEntityList<T extends { id: string; updatedAt?: string; updated_at?: string }>(
  currentList: T[],
  incomingList: T[]
): T[] {
  const map = new Map<string, T>();

  // 1. Cargar registros actuales
  (currentList || []).forEach((item) => {
    if (item && item.id) {
      map.set(item.id, item);
    }
  });

  // 2. Fusionar con registros entrantes
  (incomingList || []).forEach((incoming) => {
    if (!incoming || !incoming.id) return;
    const existing = map.get(incoming.id);
    if (!existing) {
      map.set(incoming.id, incoming);
    } else {
      // Si ambos existen, conservar el más reciente si tiene timestamp
      const existingTs = existing.updatedAt || existing.updated_at || "";
      const incomingTs = incoming.updatedAt || incoming.updated_at || "";
      if (incomingTs && incomingTs > existingTs) {
        map.set(incoming.id, { ...existing, ...incoming });
      } else {
        map.set(incoming.id, { ...incoming, ...existing });
      }
    }
  });

  return Array.from(map.values());
}

/**
 * CANDADO 3: Instantánea Automática de Seguridad (Snapshot)
 * Guarda copias de seguridad previas a cualquier mutación o sincronización en localStorage.
 */
export function createLocalSnapshot(storageKey: string, data: any, source: string = "auto"): void {
  if (typeof window === "undefined") return;
  try {
    const snapshotKey = `${storageKey}_snapshots`;
    const rawSnapshots = localStorage.getItem(snapshotKey);
    let snapshots: GuardrailSnapshot[] = [];
    if (rawSnapshots) {
      try {
        snapshots = JSON.parse(rawSnapshots);
        if (!Array.isArray(snapshots)) snapshots = [];
      } catch (e) {
        snapshots = [];
      }
    }

    const newSnapshot: GuardrailSnapshot = {
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString("es-MX"),
      source,
      recordCount: Array.isArray(data) ? data.length : 1,
      data,
    };

    // Conservar las últimas 5 instantáneas
    const updatedSnapshots = [newSnapshot, ...snapshots.slice(0, 4)];
    localStorage.setItem(snapshotKey, JSON.stringify(updatedSnapshots));
  } catch (err) {
    console.warn("[Candado Larry] No se pudo guardar la instantánea de seguridad:", err);
  }
}

/**
 * CANDADO 5: Auto-Curación de Datos (Self-Healing)
 * Analiza registros financieros, repara fechas anómalas y garantiza campos obligatorios.
 */
export function repairFinanceRecords<T extends { id: string; date?: string; amount?: number; status?: string; concept?: string }>(
  records: T[]
): T[] {
  if (!Array.isArray(records)) return [];

  return records.map((record) => {
    if (!record) return record;

    let repaired = { ...record };

    // 1. Garantizar fecha válida sin desfase
    if (!repaired.date || typeof repaired.date !== "string" || repaired.date.trim() === "") {
      repaired.date = getLocalDateStr();
    }

    // 2. Garantizar monto numérico positivo
    if (typeof repaired.amount !== "number" || isNaN(repaired.amount) || repaired.amount < 0) {
      repaired.amount = Math.max(0, Number(repaired.amount) || 0);
    }

    // 3. Garantizar estatus válido
    if (!repaired.status || !["pagado", "recurrente", "pendiente"].includes(repaired.status)) {
      repaired.status = "recurrente";
    }

    return repaired;
  });
}
