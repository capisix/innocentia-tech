import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import qrcodeTerminal from "qrcode-terminal";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import http from "http";
import pino from "pino";
import { getIntelligentHumanReply } from "../src/lib/conversationalAI.ts";

const AUTH_DIR = path.resolve("./.whatsapp_auth");
const QR_HTML_PATH = path.resolve("./public/whatsapp-qr.html");
const ENV_PATH = path.resolve("./.env.local");

// Load .env.local
let groqApiKey = process.env.GROQ_API_KEY || "";
let geminiApiKey = process.env.GEMINI_API_KEY || "";
let openaiApiKey = process.env.OPENAI_API_KEY || "";

if (fs.existsSync(ENV_PATH)) {
  const envContent = fs.readFileSync(ENV_PATH, "utf8");
  const groqMatch = envContent.match(/GROQ_API_KEY=([^\r\n]+)/);
  if (groqMatch) groqApiKey = groqMatch[1].trim();

  const geminiMatch = envContent.match(/GEMINI_API_KEY=([^\r\n]+)/);
  if (geminiMatch) geminiApiKey = geminiMatch[1].trim();

  const openaiMatch = envContent.match(/OPENAI_API_KEY=([^\r\n]+)/);
  if (openaiMatch) openaiApiKey = openaiMatch[1].trim();
}

if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

// Auto-restore session from environment variable (persists session across Render cloud restarts)
const credsPath = path.join(AUTH_DIR, "creds.json");
if (process.env.WA_SESSION_DATA && !fs.existsSync(credsPath)) {
  try {
    const rawData = Buffer.from(process.env.WA_SESSION_DATA, "base64").toString("utf8");
    fs.writeFileSync(credsPath, rawData, "utf8");
    console.log("🔑 Sesión de WhatsApp restaurada automáticamente desde WA_SESSION_DATA.");
  } catch (err) {
    console.error("Error restaurando WA_SESSION_DATA:", err);
  }
}

// Conversation memory per phone number / JID
const sessionHistories = new Map();

const systemInstruction = `Eres el asistente conversacional humano de WhatsApp de Innocentia Tech (estudio boutique de tecnología, branding y desarrollo de software a medida).
Representas a dos líderes reales:
- SOFÍA: Directora Creativa & UX. Experta en branding, logotipos, identidad visual y diseño de experiencia. Cálida, estética y orientada a valor.
- IVÁN: Director de Tecnología & Dev. Desarrollador pragmático, enfocado en cómo el software, las webs y la automatización hacen ganar dinero a un negocio (CERO tecnicismos aburridos).

REGLAS CRÍTICAS DE CONVERSACIÓN HUMANA:
1. SALUDOS O MENCIÓN DE NOMBRE: Si el usuario solo saluda (ej. "hola", "buenas", "hi", "hello") o escribe el nombre del estudio ("Innocentia Tech", "innocentie", etc.), preséntate de inmediato como el equipo de Sofía (Diseño & UX) e Iván (Tecnología & Software), explica brevemente a qué se dedica el estudio y pregúntale directamente en qué se le puede servir o qué proyecto le gustaría cotizar/desarrollar.
2. ALCANCE GLOBAL: Atendemos clientes en todo México, EE. UU. y el mundo. NUNCA digas "aquí en Mérida" ni asumas la ubicación del cliente a menos que el cliente pregunte explícitamente "¿dónde están ubicados?".
3. CERO FRASES ROBÓTICAS: PROHIBIDO usar frases trilladas o repetitivas como "¡Me encanta esa energía!", "¡Excelente! Nos encanta el entusiasmo" o muletillas de bot. Habla de forma natural, ágil y directa como una persona real en WhatsApp.
4. IDIOMA: Si el cliente escribe en inglés (ej. "Yes", "Hello", "Innocentia tech"), responde en inglés. Si escribe en español, responde en español.
5. ASIGNACIÓN:
   - Si pregunta por logotipos, imagen, marca, rediseño, estilo: Responde SOFÍA ("type": "sofia", "speaker": "SOFÍA").
   - Si pregunta por sistemas, páginas web, inventarios, cobros, apps, automatización: Responde IVÁN ("type": "ivan", "speaker": "IVÁN").
   - Si es bienvenida, saludo o consulta general: Responde DUAL ("type": "both", "speaker": "DUAL").
6. ENLACE A BLUEPRINT: Cuando ya se haya entendido la necesidad del cliente o pregunten cómo cotizar/empezar, comparte el enlace: https://innocentia.tech/crear-proyecto.
7. Formato de respuesta JSON estricto:
{
  "type": "sofia" | "ivan" | "both",
  "speaker": "SOFÍA" | "IVÁN" | "DUAL",
  "text": ["Párrafo de presentación o respuesta concisa...", "¿En qué te podemos servir hoy o qué proyecto te gustaría desarrollar?"]
}`;

function detectLanguage(text, history = []) {
  const clean = text.toLowerCase().trim();

  const enWords = [
    "i", "im", "i'm", "my", "me", "we", "our", "you", "your", "he", "she", "they", "it",
    "is", "are", "am", "was", "were", "be", "been", "have", "has", "had", "do", "does", "did",
    "will", "would", "can", "could", "should", "want", "need", "like", "make", "create",
    "build", "develop", "promote", "product", "products", "brand", "branding", "logo", "website",
    "app", "software", "price", "cost", "quote", "how", "what", "when", "where", "why", "which",
    "who", "hello", "hi", "hey", "yes", "no", "thanks", "thank", "please", "good", "great", "nice"
  ];

  const esWords = [
    "hola", "buenos", "buenas", "dias", "tardes", "noches", "quiero", "quisiera", "necesito",
    "busco", "marca", "diseño", "pagina", "página", "sitio", "cuanto", "cuánto", "precio",
    "costo", "cotizacion", "cotización", "gracias", "por favor", "ayuda", "hacer", "crear",
    "desarrollar", "negocio", "empresa", "sistema", "restaurante", "tienda", "venta", "ventas",
    "si", "sí", "tacos", "comida", "bien"
  ];

  const words = clean.replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
  let enCount = 0;
  let esCount = 0;

  for (const w of words) {
    if (enWords.includes(w)) enCount++;
    if (esWords.includes(w)) esCount++;
  }

  if (enCount > esCount) return "en";
  if (esCount > enCount) return "es";

  if (/^(yes|yeah|yep|hi|hello|hey|sure|ok|okay|nice|cool)$/i.test(clean)) return "en";
  if (/^(si|sí|hola|buenas|ola|sip|va|vale|simon|simón)$/i.test(clean)) return "es";

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].sender === "user") {
      const prev = history[i].text.toLowerCase();
      if (/\b(product|promote|website|logo|brand|help|need|want|build|yes|hi|hello)\b/i.test(prev)) return "en";
      if (/\b(hola|marca|diseño|quiero|sistema|pagina|web|cuanto)\b/i.test(prev)) return "es";
    }
  }

  return "es";
}

async function getSmartAIResponse(cleanText, history = []) {
  const lang = detectLanguage(cleanText, history);

  if (groqApiKey) {
    try {
      const langDirective = lang === "en"
        ? `CRITICAL MANDATORY INSTRUCTION: The user is speaking in ENGLISH. You MUST answer 100% in natural, fluent, professional ENGLISH. Do NOT output any Spanish words.
If the user mentions promoting a product, branding, logo or design: respond as SOFÍA ("type": "sofia", "speaker": "SOFÍA") with warm, insightful advice on visual identity and packaging.
If the user mentions software, website, platform, POS or e-commerce: respond as IVÁN ("type": "ivan", "speaker": "IVÁN").`
        : `INSTRUCCIÓN DE IDIOMA: El usuario habla en ESPAÑOL. Responde de forma 100% natural y cercana en español.`;

      const groqMessages = [
        { role: "system", content: `${systemInstruction}\n\n${langDirective}` },
        ...history.slice(-8).map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: cleanText },
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: groqMessages,
          temperature: 0.6,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = (data.choices?.[0]?.message?.content || "").trim();
        const cleanJson = content.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        const parsed = JSON.parse(cleanJson);
        if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
          parsed.lang = lang;
          return parsed;
        }
      }
    } catch (err) {
      console.error("Groq AI API error, falling back to local engine:", err.message);
    }
  }

  // Fallback engine
  if (lang === "en") {
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|innocenti[ae]\s*tech|info)/i.test(cleanText.toLowerCase().trim())) {
      return {
        speaker: "DUAL",
        type: "both",
        lang: "en",
        text: [
          "Hello! Great to connect with you. 👋 We are Sofía (Branding & UX) and Iván (Software & Tech), founders of Innocentia Tech.",
          "We build custom web platforms, apps, and high-impact brand identities for businesses worldwide. How can we help you today, or what project are you looking to build?"
        ]
      };
    }
    if (cleanText.toLowerCase().includes("product") || cleanText.toLowerCase().includes("brand") || cleanText.toLowerCase().includes("logo")) {
      return {
        speaker: "SOFÍA",
        type: "sofia",
        lang: "en",
        text: [
          "Promoting a product is all about impactful visual identity, memorable branding, and sleek packaging that builds trust right away.",
          "Could you tell me a bit more about what kind of product you are offering so I can guide you on the best creative strategy?"
        ]
      };
    }
    return {
      speaker: "DUAL",
      type: "both",
      lang: "en",
      text: [
        "Hi! Welcome to Innocentia Tech. We design custom software, high-end branding, and digital platforms for modern businesses worldwide.",
        "How can we help you today or what type of project would you like to build with us?"
      ]
    };
  }

  // Spanish greetings / brand mentions
  if (/^(hola|buen[ao]s\s*(dias|días|tardes|noches)?|innocenti[ae]\s*tech|info|saludos|que tal|qué tal)/i.test(cleanText.toLowerCase().trim())) {
    return {
      speaker: "DUAL",
      type: "both",
      lang: "es",
      text: [
        "¡Hola! Qué gusto saludarte. 👋 Somos Sofía (Branding & Diseño) e Iván (Tecnología & Software), fundadores de Innocentia Tech.",
        "Diseñamos marcas de alto impacto y desarrollamos plataformas web, aplicaciones y software a medida para empresas y negocios.",
        "¿En qué te podemos servir hoy o qué proyecto te gustaría cotizar o desarrollar?"
      ]
    };
  }

  const fallback = getIntelligentHumanReply(cleanText, history);
  fallback.lang = "es";
  return fallback;
}

async function startWhatsAppBot() {
  console.log("==========================================================");
  console.log("🚀 INICIANDO BOT DE WHATSAPP INNOCENTIA TECH (DUAL CORE)");
  console.log("==========================================================");

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: ["Innocentia Tech Studio", "Chrome", "1.0.0"],
    syncFullHistory: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n==========================================================");
      console.log("📲 ESCANEA ESTE CÓDIGO QR EN TU CELULAR:");
      console.log("   (WhatsApp Business ➔ Dispositivos vinculados ➔ Vincular)");
      console.log("==========================================================\n");

      qrcodeTerminal.generate(qr, { small: true });

      // Also generate a visual HTML file and PNG image for easy scanning
      try {
        const qrPngPath = path.resolve("./public/whatsapp-qr.png");
        const artifactPngPath = "C:/Users/capys/.gemini/antigravity/brain/86dfde67-36da-4e17-ae2d-4943fb6042d2/whatsapp_qr.png";
        await QRCode.toFile(qrPngPath, qr, { width: 450, margin: 2 });
        try {
          fs.copyFileSync(qrPngPath, artifactPngPath);
        } catch {}

        const qrDataUrl = await QRCode.toDataURL(qr, { width: 400, margin: 2 });
        latestQrDataUrl = qrDataUrl;
        const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Vincular WhatsApp - Innocentia Tech</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #07070D; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: #11111E; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 30px; max-width: 450px; box-shadow: 0 0 50px rgba(0, 209, 255, 0.2); }
    h1 { font-size: 20px; margin-bottom: 8px; color: #00D1FF; }
    p { color: #9CA3AF; font-size: 14px; line-height: 1.5; }
    .qr-box { background: #fff; border-radius: 16px; padding: 15px; display: inline-block; margin: 20px 0; }
    .qr-box img { display: block; width: 100%; max-width: 300px; height: auto; }
    .steps { text-align: left; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 15px 20px; font-size: 13px; color: #D1D5DB; }
    .steps ol { margin: 0; padding-left: 20px; }
    .steps li { margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Vincular WhatsApp Innocentia Tech</h1>
    <p>Escanea este código QR con la app de WhatsApp en tu teléfono:</p>
    <div class="qr-box">
      <img src="${qrDataUrl}" alt="Código QR WhatsApp" />
    </div>
    <div class="steps">
      <ol>
        <li>Abre <b>WhatsApp Business</b> en tu celular.</li>
        <li>Toca <b>Ajustes</b> (o los 3 puntos) ➔ <b>Dispositivos vinculados</b>.</li>
        <li>Toca <b>Vincular un dispositivo</b> y apunta la cámara a este código QR.</li>
      </ol>
    </div>
  </div>
</body>
</html>`;
        fs.writeFileSync(QR_HTML_PATH, htmlContent, "utf8");
        console.log(`🌐 Vista visual disponible en: ${QR_HTML_PATH}`);
      } catch (err) {
        console.error("Error generando QR HTML/PNG:", err);
      }
    }

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(`❌ Conexión cerrada (Código ${statusCode}). Reintentando conexión: ${shouldReconnect}`);

      if (shouldReconnect) {
        setTimeout(startWhatsAppBot, 3000);
      } else {
        console.log("Sesión cerrada por el usuario. Elimina la carpeta .whatsapp_auth para volver a escanear.");
      }
    } else if (connection === "open") {
      console.log("\n==========================================================");
      console.log("✅ ¡WHATSAPP CONECTADO CON ÉXITO A INNOCENTIA TECH!");
      console.log("   El bot de Sofía e Iván está listo y atendiendo mensajes.");
      console.log("==========================================================\n");

      // Clean QR html file once connected
      if (fs.existsSync(QR_HTML_PATH)) {
        try {
          fs.unlinkSync(QR_HTML_PATH);
        } catch {}
      }
    }
  });

  // Handle incoming messages
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      for (const msg of messages) {
        const remoteJid = msg.key.remoteJid;
        if (!remoteJid) continue;

        // Ignore status broadcasts or group chats
        if (remoteJid === "status@broadcast") continue;
        if (remoteJid.endsWith("@g.us")) continue;

        // Extract message text
        const textMessage =
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          msg.message?.imageMessage?.caption ||
          "";

        const cleanText = (textMessage || "").trim();
        if (!cleanText) continue;

        // Never reply to messages generated by the bot itself
        if (
          cleanText.startsWith("*SOFÍA") ||
          cleanText.startsWith("*IVÁN") ||
          cleanText.startsWith("✨ *SOFÍA") ||
          cleanText.startsWith("⚡ *IVÁN") ||
          cleanText.startsWith("🚀 *DUAL") ||
          cleanText.startsWith("SOFÍA:") ||
          cleanText.startsWith("IVÁN:")
        ) {
          continue;
        }

        const myJid = sock.user?.id ? sock.user.id.split(":")[0] + "@s.whatsapp.net" : "";
        const isSelfChat = remoteJid === myJid || remoteJid.includes(myJid.replace("@s.whatsapp.net", ""));

        // Ignore messages sent by me to OTHER clients, but allow self-chat and all incoming messages from clients
        if (msg.key.fromMe && !isSelfChat) continue;

        console.log(`\n📩 Mensaje recibido de [${remoteJid}] (fromMe=${msg.key.fromMe}): "${cleanText}"`);

        // Get user session history
        if (!sessionHistories.has(remoteJid)) {
          sessionHistories.set(remoteJid, []);
        }
        const history = sessionHistories.get(remoteJid);

        // Send 'composing' presence indicator
        await sock.sendPresenceUpdate("composing", remoteJid);

        // Small realistic human typing delay (1.5s - 2.5s)
        await new Promise((res) => setTimeout(res, 1800));

        // Get AI consultative reply (Groq AI with local engine fallback)
        const reply = await getSmartAIResponse(cleanText, history);

        // Format message with rich icons, headers and clean links for WhatsApp
        let responseText = "";
        let header = "";

        const isEn = reply.lang === "en";

        if (reply.type === "sofia") {
          header = isEn ? "✨ *SOFÍA • UX & DESIGN* 🎨\n──────────" : "✨ *SOFÍA • UX & DISEÑO* 🎨\n──────────";
        } else if (reply.type === "ivan") {
          header = isEn ? "⚡ *IVÁN • DEV & TECH* 💻\n──────────" : "⚡ *IVÁN • DEV & TECH* 💻\n──────────";
        } else {
          header = "🚀 *INNOCENTIA TECH* 💎\n──────────";
        }

        let body = reply.text
          .map((p) => {
            let clean = p;
            // 1. Convert markdown links [Text](url) -> *Text* 👉 url
            clean = clean.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/gi, "*$1* 👉 $2");
            clean = clean.replace(/\[([^\]]+)\]\(\/([^\)]*)\)/gi, (match, text, path) => `*${text}* 👉 https://innocentia.tech/${path}`);

            // 2. Fix standalone /crear-proyecto if not already full URL
            clean = clean.replace(/(?<!https?:\/\/[^\s]*)\/crear-proyecto/gi, "https://innocentia.tech/crear-proyecto");

            // 3. Safety cleanup for duplicate prefixes
            clean = clean.replace(/https?:\/\/innocentia\.techhttps?:\/\/innocentia\.tech/gi, "https://innocentia.tech");
            clean = clean.replace(/https:\/\/innocentia\.tech\/+/gi, "https://innocentia.tech/");

            return clean;
          })
          .join("\n\n");

        body = body
          .replace(/^SOFÍA:\s*/gim, "🎨 *Sofía:* ")
          .replace(/^IVÁN:\s*/gim, "💻 *Iván:* ");

        responseText = `${header}\n\n${body}`;

        // Send reply to WhatsApp
        await sock.sendMessage(remoteJid, { text: responseText });
        console.log(`📤 Respuesta enviada a [${remoteJid}] (${reply.speaker}): ${reply.text[0].substring(0, 60)}...`);

        // Update history (keep last 8 turns)
        history.push({ sender: "user", text: cleanText });
        history.push({ sender: reply.type, text: responseText });
        if (history.length > 10) {
          sessionHistories.set(remoteJid, history.slice(-10));
        }

        // Send 'available' presence indicator
        await sock.sendPresenceUpdate("available", remoteJid);
      }
    } catch (msgError) {
      console.error("Error procesando mensaje entrante:", msgError);
    }
  });
}

let latestQrDataUrl = "";

// Simple HTTP server for Render/Railway health checks and visual QR access
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/qr") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    if (latestQrDataUrl) {
      res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vincular WhatsApp - Innocentia Tech</title>
  <style>
    body { background: #07070D; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: #11111E; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; max-width: 420px; box-shadow: 0 0 40px rgba(0, 209, 255, 0.2); }
    h1 { font-size: 20px; color: #00D1FF; margin-bottom: 12px; }
    p { color: #9CA3AF; font-size: 14px; margin-bottom: 20px; }
    img { background: #fff; padding: 12px; border-radius: 14px; width: 280px; height: 280px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Vincular WhatsApp Innocentia Tech</h1>
    <p>Abre WhatsApp Business ➔ Dispositivos vinculados ➔ Vincular dispositivo:</p>
    <img src="${latestQrDataUrl}" alt="QR WhatsApp" />
  </div>
</body>
</html>`);
    } else {
      res.end(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>WhatsApp Conectado</title></head>
<body style="background:#07070D;color:#00D1FF;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
  <h2>✅ WhatsApp Bot ya está conectado y activo 24/7</h2>
</body>
</html>`);
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "online", bot: "Innocentia Tech Dual Core", timestamp: new Date().toISOString() }));
});

server.listen(PORT, () => {
  console.log(`🌐 Servidor HTTP activo en el puerto ${PORT} (listo para Render/Railway)`);
});

startWhatsAppBot();
