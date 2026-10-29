/**
 * dateUtils.ts • INNOCENTIA TECH & MULTICOMMERCE
 * Candado de Integridad de Fechas y Zona Horaria (CANDADO 1: Larry Standard)
 * 
 * Reglas fundamentales:
 * 1. PROHIBICIÓN TOTAL DE UTC para fechas contables y operativas.
 *    (Evita que operaciones pasadas las 6:00 PM en México UTC-6 brinquen al día siguiente).
 * 2. Parseo seguro a mediodía local (12:00:00) para evitar cruces involuntarios de medianoche.
 * 3. Normalización universal de formatos (DD-MM-YYYY, YYYY-MM-DD, ISO, etc.).
 */

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

/**
 * Devuelve la fecha local del dispositivo en formato YYYY-MM-DD sin desfase UTC.
 */
export function getLocalDateStr(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Devuelve la fecha formateada en español estándar para México (ej: "20 de Octubre de 2026")
 */
export function getFormattedDateMX(date: Date = new Date()): string {
  const day = String(date.getDate()).padStart(2, "0");
  const monthName = MESES_ES[date.getMonth()];
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const year = date.getFullYear();
  return `${day} de ${capitalizedMonth} de ${year}`;
}

/**
 * Normaliza cualquier formato de fecha a YYYY-MM-DD estándar.
 */
export function normalizeDateStr(rawStr?: string | null): string {
  if (!rawStr || typeof rawStr !== "string" || !rawStr.trim()) {
    return getLocalDateStr();
  }

  const clean = rawStr.includes("T") 
    ? rawStr.split("T")[0].trim() 
    : (rawStr.includes(" ") ? rawStr.split(" ")[0].trim() : rawStr.trim());

  const delimiter = clean.includes("/") ? "/" : "-";
  const parts = clean.split(delimiter);

  if (parts.length === 3) {
    const p0 = parts[0].trim();
    const p1 = parts[1].trim();
    const p2 = parts[2].trim();

    // Caso DD-MM-YYYY
    if (p2.length === 4) {
      const year = parseInt(p2, 10);
      const month = String(parseInt(p1, 10)).padStart(2, "0");
      const day = String(parseInt(p0, 10)).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Caso YYYY-MM-DD
    if (p0.length === 4) {
      const year = parseInt(p0, 10);
      const month = String(parseInt(p1, 10)).padStart(2, "0");
      const day = String(parseInt(p2, 10)).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }

  return clean;
}

/**
 * Parsea una fecha a objeto Date a las 12:00:00 (mediodía local) para blindarlo
 * contra cruces de medianoche en zonas horarias de América (UTC-5, UTC-6, UTC-7).
 */
export function parseLocalDateSafe(dateStr?: string | null): Date {
  const norm = normalizeDateStr(dateStr);
  const parts = norm.split("-");
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return new Date(y, m, d, 12, 0, 0);
    }
  }
  return new Date();
}
