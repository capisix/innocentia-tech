import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

// Patrones prohibidos que causan bugs de zona horaria o corrupción de datos (Estándar Larry)
const FORBIDDEN_PATTERNS = [
  {
    regex: /\.toISOString\(\)\.split\(['"`]T['"`]\)\[0\]/g,
    message: 'PROHIBIDO: toISOString().split("T")[0] convierte la hora a UTC (Londres) provocando desfase de días en horario nocturno en México. Usa getLocalDateStr() de src/lib/dateUtils.ts.'
  },
  {
    regex: /repairCorruptedDate\([^,]+,\s*[^)]*id[^)]*\)/g,
    message: 'PROHIBIDO: NUNCA uses el timestamp del ID para sobreescribir la fecha de un registro contable.'
  }
];

let hasErrors = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_PATTERNS.forEach(({ regex, message }) => {
        const matches = content.match(regex);
        if (matches) {
          console.error(`\x1b[31m[CANDADO VIOLADO]\x1b[0m ${fullPath}`);
          console.error(`  -> ${message}`);
          hasErrors = true;
        }
      });
    }
  }
}

console.log('🔒 [CANDADOS LARRY] Verificando integridad de fechas y datos en src/ ...');
scanDir(srcDir);

if (hasErrors) {
  console.error('\n\x1b[41m\x1b[37m ERROR DE CANDADO: La compilación se detuvo porque se detectaron patrones prohibidos. \x1b[0m\n');
  process.exit(1);
} else {
  console.log('\x1b[32m✔ Candados de integridad validados: 0 patrones inseguros detectados.\x1b[0m\n');
}
