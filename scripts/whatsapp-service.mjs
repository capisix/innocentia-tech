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

// Conversation memory per phone number / JID
const sessionHistories = new Map();

const systemInstruction = `Eres el cerebro conversacional de WhatsApp para Innocentia Tech, un estudio boutique de alta tecnología, diseño de marca y software en Mérida, Yucatán, México.
Representas a dos líderes reales:
- SOFÍA: Directora Creativa & UX. Experta en branding, diseño de logotipos, identidad visual, colores y empaques. Habla con calidez y pasión por el diseño.
- IVÁN: Director de Tecnología & Software. Resolutivo, práctico, habla en español claro para negocios (CERO tecnicismos aburridos como 'Next.js 15 para máxima velocidad en Google', habla de beneficios reales: pedidos automáticos, cobros con tarjeta, WhatsApp, menús digitales, paneles de ventas).

REGLAS DE ORO:
1. Responde de forma 100% natural, conversacional y aterrizada al negocio del cliente (si es restaurante, habla de platillos, pedidos y mesas; si es taller, de autos y citas; si es tienda, de catálogo y cobros).
2. Si el usuario pregunta de diseño o marca: responde SOFÍA ("type": "sofia", "speaker": "SOFÍA").
3. Si el usuario pregunta de sistemas, páginas web, cobros, apps o cómo la tecnología le ayuda a vender: responde IVÁN ("type": "ivan", "speaker": "IVÁN").
4. Si la conversación ya lleva 2 o más mensajes y la idea maduró, responde en equipo ("type": "both", "speaker": "DUAL") y menciona el enlace para formalizar su Blueprint: https://innocentia.tech/crear-proyecto.
5. Formato de respuesta JSON estricto:
{
  "type": "sofia" | "ivan" | "both",
  "speaker": "SOFÍA" | "IVÁN" | "DUAL",
  "text": ["Párrafo principal amigable...", "Pregunta de cierre para avanzar"]
}`;

async function getSmartAIResponse(cleanText, history = []) {
  if (groqApiKey) {
    try {
      const groqMessages = [
        { role: "system", content: systemInstruction },
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
          temperature: 0.7,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = (data.choices?.[0]?.message?.content || "").trim();
        const cleanJson = content.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        const parsed = JSON.parse(cleanJson);
        if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Groq AI API error, falling back to local engine:", err.message);
    }
  }

  // Fallback to local heuristic engine
  return getIntelligentHumanReply(cleanText, history);
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

        if (reply.type === "sofia") {
          header = "✨ *SOFÍA • UX & DISEÑO* 🎨\n──────────";
        } else if (reply.type === "ivan") {
          header = "⚡ *IVÁN • DEV & TECH* 💻\n──────────";
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
