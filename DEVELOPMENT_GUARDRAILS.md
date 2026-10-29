# 🛡️ Candados de Integridad y Blindaje de Datos (Protocolo Larry) • Innocentia Tech

Este documento establece las reglas obligatorias e inquebrantables para el desarrollo de esta aplicación y todos los sistemas de Innocentia Tech.
**Cualquier modificación futura debe respetar estos 5 candados.**

---

## 1. 🔒 Candado de Fechas y Zonas Horarias (Local Time vs UTC)
* **PROHIBICIÓN ESTRICTA:** Queda terminantemente prohibido el uso de:
  ```typescript
  // ❌ NUNCA USAR ESTO (Provoca desfase de día después de las 6:00 PM en México UTC-6):
  new Date().toISOString().split('T')[0]
  new Date("YYYY-MM-DD") // Parsea a UTC medianoche y retrocede un día en América
  ```
* **ESTÁNDAR OBLIGATORIO:**
  * Para obtener la fecha actual del dispositivo:
    ```typescript
    import { getLocalDateStr, getFormattedDateMX } from '@/lib/dateUtils';
    const today = getLocalDateStr(); // Siempre devuelve YYYY-MM-DD en hora local
    const mxDate = getFormattedDateMX(); // Devuelve "20 de Octubre de 2026"
    ```
  * Para normalizar cualquier fecha recibida:
    ```typescript
    import { normalizeDateStr } from '@/lib/dateUtils';
    const cleanDate = normalizeDateStr(rawInput);
    ```
  * Para parsear fechas a objetos `Date`:
    ```typescript
    import { parseLocalDateSafe } from '@/lib/dateUtils';
    const d = parseLocalDateSafe(dateStr); // Parsea a mediodía local (12:00:00) para evitar cruce de medianoche
    ```

---

## 2. 🔒 Candado de Auditoría en Compilación (Build Guardrail)
* El script `scripts/verify-guardrails.mjs` analiza el código fuente en cada `npm run build`.
* Si detecta `toISOString().split('T')[0]` o patrones prohibidos, la compilación falla inmediatamente con código 1.

---

## 3. 🔒 Candado de Sincronización Multi-Dispositivo (Smart Merge & Snapshots)
* **PROHIBICIÓN ESTRICTA:** No reemplazar mapas o arreglos de datos de golpe (`setRecords(incomingData)`).
* **ESTÁNDAR OBLIGATORIO:**
  * Toda sincronización o restauración debe pasar por `smartMergeEntityList()`.
  * Se fusionan los registros por su ID único: si Daniel o cualquier socio agrega un gasto desde su teléfono o computadora, se conservan ambos registros sin sobreescritura destructiva.
  * Antes de cualquier mutación o sincronización se debe generar automáticamente un snapshot de recuperación en `localStorage` mediante `createLocalSnapshot()`.

---

## 4. 🔒 Candado Contable y Aislamiento de Flujos
* Los egresos e ingresos deben mantener coherencia estricta en sus subtotales.
* Todo gasto recurrente debe contar con su periodicidad y estado protegido.

---

## 5. 🔒 Candado de Auto-Curación (Self-Healing)
* Al iniciar la aplicación o cargar datos desde `localStorage` / API, el sistema pasa los registros por `repairFinanceRecords()`.
* Si detecta campos vacíos o fechas inválidas, las repara silenciosamente al arrancar sin alterar la información original.
