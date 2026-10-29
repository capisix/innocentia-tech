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

// In-memory log buffer for remote debugging via /logs
const logBuffer = [];
function addLog(msg) {
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logBuffer.push(line);
  if (logBuffer.length > 150) logBuffer.shift();
  console.log(msg);
}

// Conversation memory per phone number / JID
const sessionHistories = new Map();
const processedMsgIds = new Set();
let isWhatsAppConnected = false;
let lastConnectedAt = null;
let currentSock = null;
let activeSocketId = 0;
let reconnectTimer = null;
let isShuttingDown = false;

const systemInstruction = `Eres el asesor comercial humano por WhatsApp de Innocentia Tech (agencia de páginas web, diseño de logos/marcas y sistemas para negocios).
Representas a dos especialistas reales, pero SIEMPRE hablas de forma súper corta, directa y sin tecnicismos:
- SOFÍA: Directora de Diseño & Marca (logos, imagen corporativa, redes y rediseño visual).
- IVÁN: Director de Tecnología & Web (páginas web, tiendas en línea, puntos de venta, apps y bots de WhatsApp).

REGLAS DE ORO PARA QUE EL CLIENTE ENTIENDA EN 3 SEGUNDOS:
1. PROHIBIDO USAR LENGUAJE ABSTRACTO O TEXTOS LARGOS:
   - NUNCA digas "estudio boutique", "experiencia de usuario (UX)", "identidad visual integral" ni mandes bloques de 3 párrafos donde hablen Sofía e Iván al mismo tiempo.
   - Máximo 4 a 5 líneas por respuesta. En WhatsApp la gente lee rápido.
2. BIENVENIDA CON MENÚ SIMPLE (1, 2, 3, 4):
   - Cuando el cliente saluda por primera vez (ej. "hola", "quiero más información", "estoy en el sitio web y me gustaría atención personalizada"), dale una bienvenida corta y preséntale estas 4 opciones claras para que elija con un número o cuente su idea:
     1️⃣ Página Web o Tienda en Línea (para mostrar tus productos/servicios y vender más)
     2️⃣ Diseño de Logo e Imagen de Marca (para que tu negocio se vea profesional y confiable)
     3️⃣ Sistema o App para tu Negocio (punto de venta, inventarios, citas o cotizador)
     4️⃣ Bot de WhatsApp con IA 24/7 (para atender clientes y vender en automático)
3. SI EL CLIENTE PREGUNTA "¿QUÉ SE PUEDE HACER?", "¿QUÉ HACEN?", "¿DE QUÉ TRATA?" O "¿QUÉ PROPONES?":
   - Responde UNO SOLO (SOFÍA o IVÁN, nunca los dos al mismo tiempo) con este mensaje claro e inspirador:
     "Somos una plataforma para el desarrollo de ideas: desde tu logo, páginas web y sistemas automáticos, hasta el diseño de campañas de marketing. Te ayudamos a convertir tus ideas en productos o marcas reales. 🚀"
   - Y hazle UNA sola pregunta sencilla: "¿Tienes alguna idea en mente o un negocio que quieras impulsar?"
4. SI EL CLIENTE ELIGE UNA OPCIÓN (1, 2, 3 o 4):
   - Si elige 1, 3 o 4: Responde IVÁN ("type": "ivan", "speaker": "IVÁN") de forma breve y entusiasta, preguntándole a qué se dedica su negocio para recomendarle el paquete ideal.
   - Si elige 2: Responde SOFÍA ("type": "sofia", "speaker": "SOFÍA") preguntándole cómo se llama su negocio o qué giro tiene.
5. SI PIDEN CÓDIGO SUELTO O TAREAS ESCOLARES (ej. "hazme el código HTML", "es para la escuela"):
   - Responde IVÁN aclarando amablemente que en Innocentia Tech desarrollamos plataformas y proyectos completos bajo cotización para empresas (no entregamos fragmentos de código HTML sueltos por chat ni hacemos tareas escolares).
6. ENLACE PARA COTIZAR: Cuando ya sepamos qué necesita o pregunte precios/cotización, comparte: https://innocentia.tech/crear-proyecto
7. Formato JSON estricto (responde ÚNICAMENTE con el objeto JSON válido):
{
  "type": "sofia" | "ivan" | "both",
  "speaker": "SOFÍA" | "IVÁN" | "DUAL",
  "text": ["Párrafo corto y claro...", "Pregunta sencilla de 1 línea"]
}`;

function detectLanguage(text, history = []) {
  const clean = text.toLowerCase().trim();

  // If the user explicitly asks for Spanish, always return "es"
  if (/espa[ñn]ol/i.test(clean)) return "es";

  // Note: Never include ambiguous words shared with Spanish like "no", "me", "a", "he", "in"
  const enWords = [
    "i", "im", "i'm", "my", "we", "our", "you", "your", "she", "they", "it",
    "is", "are", "am", "was", "were", "been", "have", "has", "had", "does", "did",
    "will", "would", "can", "could", "should", "want", "need", "like", "make", "create",
    "build", "develop", "promote", "product", "products", "brand", "branding", "website",
    "software", "price", "cost", "quote", "how", "what", "when", "where", "why", "which",
    "who", "hello", "hi", "hey", "yes", "thanks", "thank", "please", "good", "great", "nice"
  ];

  const esWords = [
    "hola", "buenos", "buenas", "dias", "días", "tardes", "noches", "quiero", "quisiera", "necesito",
    "busco", "marca", "diseño", "pagina", "página", "sitio", "cuanto", "cuánto", "precio", "precios",
    "costo", "cotizacion", "cotización", "gracias", "por", "favor", "ayuda", "ayudame", "ayúdame",
    "hacer", "crear", "creeme", "créeme", "hazme", "desarrollar", "negocio", "empresa", "sistema",
    "restaurante", "tienda", "venta", "ventas", "si", "sí", "no", "me", "te", "tu", "tú", "mi", "mis",
    "el", "la", "los", "las", "un", "una", "para", "con", "sin", "que", "qué", "como", "cómo", "todo",
    "tengo", "tiene", "imagen", "imagenes", "imágenes", "codigo", "código", "formulario", "escuela",
    "estoy", "esta", "está", "son", "del", "al", "lo", "ya", "pero", "mas", "más"
  ];

  const words = clean.replace(/[^\w\sáéíóúñü]/g, " ").split(/\s+/).filter(Boolean);
  let enCount = 0;
  let esCount = 0;

  for (const w of words) {
    if (enWords.includes(w)) enCount++;
    if (esWords.includes(w)) esCount++;
  }

  if (esCount > 0 && esCount >= enCount) return "es";
  if (enCount >= esCount + 2) return "en";

  if (/^(yes|yeah|yep|hi|hello|hey|sure)$/i.test(clean)) return "en";
  if (/^(si|sí|hola|buenas|ola|sip|va|vale|simon|simón|gracias|ok|okay)$/i.test(clean)) return "es";

  return "es";
}

async function getSmartAIResponse(cleanText, history = []) {
  const lang = detectLanguage(cleanText, history);
  const trimmed = cleanText.trim();
  const lower = trimmed.toLowerCase();

  // 1. Instant visual menu on initial greeting or website WhatsApp button click
  if (
    lang === "es" &&
    (/^(hola|buen[ao]s\s*(dias|días|tardes|noches)?|innocenti[ae]\s*tech|info|informaci[oó]n|saludos|que tal|qué tal)[.!?\s]*$/i.test(lower) ||
      /estoy en el sitio web|quiero m[aá]s informaci[oó]n|atenci[oó]n personalizada/i.test(lower))
  ) {
    return {
      speaker: "DUAL",
      type: "both",
      lang: "es",
      text: [
        "¡Hola! Qué gusto saludarte 👋 Ayudamos a negocios y emprendedores a *vender más y verse profesionales* en internet.\n\n¿Qué te gustaría hacer para tu negocio? *(Responde con el número o cuéntanos tu idea)*:\n\n1️⃣ *Página Web o Catálogo en Línea* _(para mostrar lo que vendes y captar clientes)_\n2️⃣ *Diseño de Logo e Imagen de Marca* _(para que tu negocio se vea formal y confiable)_\n3️⃣ *Sistema o App a Medida* _(punto de venta, inventarios, citas o pedidos)_\n4️⃣ *Bot de WhatsApp con IA 24/7* _(para atender y vender en automático)_"
      ]
    };
  }

  // 2. Instant response if client asks "Qué se puede hacer / qué es esto / qué hacen / qué propones"
  if (/qu[eé]\s*(se\s*puede\s*hacer|es\s*esto|hace[ns]?|propones|ofrecen|venden)|de\s*qu[eé]\s*(se\s*)?trata/i.test(lower)) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      lang: "es",
      text: [
        "¡Con gusto te cuento! ✨ Somos una plataforma para el desarrollo de ideas: desde tu logo, páginas web y sistemas automáticos, hasta el diseño de campañas de marketing. Ayudamos a convertir tus ideas en productos o marcas reales. 🚀",
        "Cuéntame, ¿tienes alguna idea en mente que quieras lanzar o un negocio que te gustaría impulsar?"
      ]
    };
  }

  // 3. Instant response when user picks option 1, 2, 3, or 4
  if (/^1(\D|$)|p[aá]gina web|cat[aá]logo en l[ií]nea/i.test(lower) && trimmed.length < 35) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      lang: "es",
      text: [
        "¡Excelente elección! 💻 Creamos páginas web rápidas y catálogos en línea listos para que tus clientes vean tus productos o servicios desde el celular y te compren o pidan directo por WhatsApp.",
        "Cuéntame, ¿de qué giro es tu negocio o qué productos/servicios ofreces?"
      ]
    };
  }

  if (/^2(\D|$)|dise[ñn]o de logo|imagen de marca/i.test(lower) && trimmed.length < 35) {
    return {
      speaker: "SOFÍA",
      type: "sofia",
      lang: "es",
      text: [
        "¡Me encanta! 🎨 Diseñamos tu logotipo, paleta de colores y toda la presentación visual para que tu negocio proyecte confianza y profesionalismo desde el primer vistazo.",
        "¿Cómo se llama tu negocio (o qué giro tiene) y qué te gustaría transmitir?"
      ]
    };
  }

  if (/^3(\D|$)|sistema o app|punto de venta/i.test(lower) && trimmed.length < 35) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      lang: "es",
      text: [
        "¡Perfecto! ⚡ Desarrollamos sistemas a la medida para que controles tu negocio sin complicaciones: ventas, inventarios, citas, sucursales o cotizaciones desde tu celular o computadora.",
        "¿Qué proceso de tu negocio te gustaría organizar o automatizar primero?"
      ]
    };
  }

  if (/^4(\D|$)|bot de whatsapp/i.test(lower) && trimmed.length < 35) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      lang: "es",
      text: [
        "¡Súper bien! 🤖 Configuramos un asistente inteligente en tu WhatsApp que responde dudas, muestra tu catálogo y atiende prospectos las 24 horas en automático.",
        "¿Qué tipo de negocio tienes para platicarte cómo funcionaría en tu WhatsApp?"
      ]
    };
  }

  // 4. Instant intercept if user is asking for raw HTML/code generation or homework help
  if (/\b(hazme todo el c[oó]digo|ay[uú]dame con el c[oó]digo|lo quiero para html|p[aá]same el c[oó]digo|^html$)\b/i.test(trimmed)) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      lang: "es",
      text: [
        "Te comento rápidamente: en Innocentia Tech somos un estudio profesional de desarrollo de software y diseño para empresas, por lo que no generamos ni enviamos fragmentos de código HTML sueltos por chat ni realizamos tareas escolares.",
        "Si lo que buscas es contratar el desarrollo completo de tu plataforma web o sistema de catálogo con registro y carrito llave en mano, con gusto te lo cotizamos formalmente aquí: https://innocentia.tech/crear-proyecto"
      ]
    };
  }

  if (groqApiKey) {
    const langDirective = lang === "en"
      ? `CRITICAL MANDATORY INSTRUCTION: The user is speaking in ENGLISH. You MUST answer 100% in natural, fluent, professional ENGLISH. Do NOT output any Spanish words.`
      : `INSTRUCCIÓN DE IDIOMA: El usuario habla en ESPAÑOL. Responde 100% en español natural, directo y profesional. NUNCA respondas en inglés.`;

    const groqMessages = [
      { role: "system", content: `${systemInstruction}\n\n${langDirective}` },
      ...history.slice(-8).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: cleanText },
    ];

    // Multi-model failover across Groq models so 429 OTPM limits never cause a fallback
    const groqModels = [
      { id: "qwen/qwen3.8-27b", maxTokens: 300 },
      { id: "openai/gpt-oss-120b", maxTokens: 400 },
      { id: "openai/gpt-oss-20b", maxTokens: 400 },
    ];

    for (const modelCfg of groqModels) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: modelCfg.id,
            messages: groqMessages,
            temperature: 0.5,
            max_tokens: modelCfg.maxTokens,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const content = (data.choices?.[0]?.message?.content || "").trim();
          const cleanJson = content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
          const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
              parsed.lang = lang;
              return parsed;
            }
          }
        } else {
          const errTxt = await res.text();
          addLog(`⚠️ Groq (${modelCfg.id}) status ${res.status}: intentando siguiente modelo...`);
        }
      } catch (err) {
        addLog(`⚠️ Error en modelo ${modelCfg.id}: ${err.message}`);
      }
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

  // Spanish greetings / brand mentions (only if conversation is starting or explicit greeting)
  if (/^(hola|buen[ao]s\s*(dias|días|tardes|noches)?|innocenti[ae]\s*tech|info|saludos|que tal|qué tal)$/i.test(cleanText.toLowerCase().trim())) {
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

  // Context-aware Spanish fallback that NEVER repeats the generic welcome mid-conversation
  if (history.length > 0) {
    return {
      speaker: "IVÁN",
      type: "ivan",
      lang: "es",
      text: [
        "Entiendo los requerimientos que comentas. En Innocentia Tech desarrollamos el sistema o plataforma web completa a medida (diseño visual, base de datos de registros, catálogo e interfaz lista para operar).",
        "Para darte una cotización formal con tiempos y costos exactos de desarrollo, registra los detalles de tu proyecto en nuestro Blueprint interactivo: https://innocentia.tech/crear-proyecto"
      ]
    };
  }

  const fallback = getIntelligentHumanReply(cleanText, history);
  fallback.lang = "es";
  return fallback;
}

function cleanupCurrentSocket() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (currentSock) {
    try {
      currentSock.ev.removeAllListeners("connection.update");
      currentSock.ev.removeAllListeners("creds.update");
      currentSock.ev.removeAllListeners("messages.upsert");
      currentSock.end(undefined);
    } catch {}
    currentSock = null;
  }
}

function scheduleReconnect(delayMs = 2500) {
  if (isShuttingDown) return;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    startWhatsAppBot();
  }, delayMs);
}

async function startWhatsAppBot() {
  if (isShuttingDown) return;
  cleanupCurrentSocket();
  const mySocketId = ++activeSocketId;

  console.log("==========================================================");
  console.log(`🚀 INICIANDO BOT DE WHATSAPP INNOCENTIA TECH (SOCKET #${mySocketId})`);
  console.log("==========================================================");

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  if (mySocketId !== activeSocketId || isShuttingDown) return;

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: ["Innocentia Tech Studio", "Chrome", "1.0.0"],
    syncFullHistory: false,
  });

  currentSock = sock;

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    if (mySocketId !== activeSocketId || isShuttingDown) return;
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      addLog("📲 Nuevo código QR recibido de WhatsApp. Actualizando vista...");
      qrcodeTerminal.generate(qr, { small: true });

      try {
        const qrPngPath = path.resolve("./public/whatsapp-qr.png");
        await QRCode.toFile(qrPngPath, qr, { width: 450, margin: 2 });
        const qrDataUrl = await QRCode.toDataURL(qr, { width: 400, margin: 2 });
        latestQrDataUrl = qrDataUrl;
      } catch (err) {
        addLog(`❌ Error generando DataURL de QR: ${err.message}`);
      }
    }

    if (connection === "close") {
      isWhatsAppConnected = false;
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      addLog(`❌ Conexión cerrada (Código ${statusCode}). Reintentando: ${shouldReconnect}`);

      if (shouldReconnect) {
        // If 440 (connectionReplaced), wait 8s to avoid ping-pong during container deploys
        const delay = statusCode === 440 ? 8000 : 2500;
        scheduleReconnect(delay);
      } else {
        addLog("⚠️ Sesión cerrada/desvinculada. Limpiando credenciales para nuevo QR...");
        try {
          if (fs.existsSync(AUTH_DIR)) {
            const files = fs.readdirSync(AUTH_DIR);
            for (const file of files) {
              try { fs.rmSync(path.join(AUTH_DIR, file), { recursive: true, force: true }); } catch {}
            }
          }
        } catch {}
        scheduleReconnect(2000);
      }
    } else if (connection === "open") {
      isWhatsAppConnected = true;
      latestQrDataUrl = "";
      lastConnectedAt = new Date().toISOString();
      addLog("🎉 ¡WHATSAPP CONECTADO CON ÉXITO! Bot de Sofía e Iván activo 24/7.");
    }
  });

  // Handle incoming messages
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (mySocketId !== activeSocketId || isShuttingDown) return;
    try {
      for (const msg of messages) {
        const remoteJid = msg.key.remoteJid;
        if (!remoteJid) continue;

        // Ignore status broadcasts or group chats
        if (remoteJid === "status@broadcast") continue;
        if (remoteJid.endsWith("@g.us")) continue;

        // Deduplicate messages
        const msgId = msg.key.id;
        if (msgId && processedMsgIds.has(msgId)) continue;

        const hasImage = Boolean(
          msg.message?.imageMessage ||
          msg.message?.ephemeralMessage?.message?.imageMessage ||
          msg.message?.viewOnceMessage?.message?.imageMessage ||
          msg.message?.viewOnceMessageV2?.message?.imageMessage
        );
        const hasDocument = Boolean(
          msg.message?.documentMessage ||
          msg.message?.documentWithCaptionMessage ||
          msg.message?.ephemeralMessage?.message?.documentMessage
        );

        // Extract message text from all WhatsApp packet variants
        const textMessage =
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          msg.message?.imageMessage?.caption ||
          msg.message?.ephemeralMessage?.message?.conversation ||
          msg.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
          msg.message?.ephemeralMessage?.message?.imageMessage?.caption ||
          msg.message?.viewOnceMessage?.message?.conversation ||
          msg.message?.viewOnceMessage?.message?.extendedTextMessage?.text ||
          msg.message?.viewOnceMessageV2?.message?.conversation ||
          msg.message?.viewOnceMessageV2?.message?.extendedTextMessage?.text ||
          msg.message?.documentWithCaptionMessage?.message?.documentMessage?.caption ||
          "";

        let cleanText = (textMessage || "").trim();
        if (!cleanText && hasImage) {
          cleanText = "[El usuario envió una imagen de referencia para su proyecto]";
        } else if (cleanText && hasImage) {
          cleanText = `[Imagen adjunta] ${cleanText}`;
        } else if (!cleanText && hasDocument) {
          cleanText = "[El usuario envió un documento adjunto]";
        }
        if (!cleanText) continue;

        // Never reply to messages generated by the bot itself
        if (
          cleanText.startsWith("*SOFÍA") ||
          cleanText.startsWith("*IVÁN") ||
          cleanText.startsWith("✨ *SOFÍA") ||
          cleanText.startsWith("⚡ *IVÁN") ||
          cleanText.startsWith("🚀 *DUAL") ||
          cleanText.startsWith("🚀 *INNOCENTIA") ||
          cleanText.startsWith("SOFÍA:") ||
          cleanText.startsWith("IVÁN:")
        ) {
          continue;
        }

        const myJid = sock.user?.id ? sock.user.id.split(":")[0] + "@s.whatsapp.net" : "";
        const isSelfChat = remoteJid === myJid || (myJid && remoteJid.includes(myJid.replace("@s.whatsapp.net", "")));

        // Ignore messages sent by me to OTHER clients, but allow self-chat and all incoming messages from clients
        if (msg.key.fromMe && !isSelfChat) {
          addLog(`ℹ️ Mensaje enviado por el usuario a [${remoteJid}]: "${cleanText}"`);
          continue;
        }

        if (msgId) {
          processedMsgIds.add(msgId);
          if (processedMsgIds.size > 300) {
            const firstId = processedMsgIds.values().next().value;
            processedMsgIds.delete(firstId);
          }
        }

        addLog(`📩 Mensaje recibido de [${remoteJid}] (fromMe=${msg.key.fromMe}): "${cleanText}"`);

        // Get user session history
        if (!sessionHistories.has(remoteJid)) {
          sessionHistories.set(remoteJid, []);
        }
        const history = sessionHistories.get(remoteJid);

        // Send 'composing' presence indicator safely
        try {
          if (currentSock) await currentSock.sendPresenceUpdate("composing", remoteJid);
        } catch {}

        // Small realistic human typing delay (800ms)
        await new Promise((res) => setTimeout(res, 800));

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

        // Send reply to WhatsApp with retry in case of momentary socket reconnect
        let sentOk = false;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const activeSock = currentSock || sock;
            await activeSock.sendMessage(remoteJid, { text: responseText });
            sentOk = true;
            break;
          } catch (sendErr) {
            addLog(`⚠️ Intento ${attempt} de envío falló (${sendErr.message}). Reintentando...`);
            await new Promise((res) => setTimeout(res, 2000));
          }
        }

        if (sentOk) {
          addLog(`📤 Respuesta enviada a [${remoteJid}] (${reply.speaker}): ${reply.text[0].substring(0, 60)}...`);
          // Update history (keep last 8 turns)
          history.push({ sender: "user", text: cleanText });
          history.push({ sender: reply.type, text: responseText });
          if (history.length > 10) {
            sessionHistories.set(remoteJid, history.slice(-10));
          }
        }

        // Send 'available' presence indicator safely
        try {
          if (currentSock) await currentSock.sendPresenceUpdate("available", remoteJid);
        } catch {}
      }
    } catch (msgError) {
      addLog(`❌ Error procesando mensaje entrante: ${msgError.message}`);
    }
  });
}

let latestQrDataUrl = "";

// Simple HTTP server for Render/Railway health checks, visual QR, and live logs
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/logs") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="4">
  <title>Live Logs - Innocentia WhatsApp Bot</title>
  <style>
    body { background: #07070D; color: #00D1FF; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", monospace; padding: 25px; margin: 0; }
    .card { background: #11111E; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; max-width: 900px; margin: 0 auto; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
    h2 { color: #fff; margin-top: 0; font-size: 18px; }
    .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; margin-bottom: 15px; }
    .connected { background: rgba(0, 255, 128, 0.15); color: #00FF80; border: 1px solid #00FF80; }
    .waiting { background: rgba(255, 180, 0, 0.15); color: #FFB400; border: 1px solid #FFB400; }
    .terminal { background: #05050A; border-radius: 10px; padding: 15px; font-family: monospace; font-size: 13px; line-height: 1.6; max-height: 500px; overflow-y: auto; color: #D1D5DB; }
    .log-line { margin: 3px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🚀 Innocentia Tech • WhatsApp Live Monitor</h2>
    <div class="status-badge ${isWhatsAppConnected ? "connected" : "waiting"}">
      ${isWhatsAppConnected ? "🟢 CONECTADO A WHATSAPP (24/7 ACTIVO)" : "🟡 ESPERANDO CONEXIÓN"}
    </div>
    <div class="terminal">
      ${logBuffer.map((l) => `<div class="log-line">${l}</div>`).join("") || "<div>Iniciando logs...</div>"}
    </div>
  </div>
</body>
</html>`);
    return;
  }

  if (req.url === "/reset" || req.url === "/logout") {
    try {
      cleanupCurrentSocket();
      if (fs.existsSync(AUTH_DIR)) {
        const files = fs.readdirSync(AUTH_DIR);
        for (const file of files) {
          try {
            fs.rmSync(path.join(AUTH_DIR, file), { recursive: true, force: true });
          } catch {}
        }
      }
      isWhatsAppConnected = false;
      latestQrDataUrl = "";
      addLog("🔄 Sesión reseteada a solicitud del usuario. Generando nuevo código QR...");
      scheduleReconnect(800);
      res.writeHead(302, { Location: "/qr" });
      res.end();
      return;
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reseteando sesión: " + e.message);
      return;
    }
  }

  if (req.url === "/api/status") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        connected: isWhatsAppConnected,
        qr: latestQrDataUrl || null,
        lastConnected: lastConnectedAt,
      })
    );
    return;
  }

  if (req.url === "/qr") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vincular WhatsApp - Innocentia Tech</title>
  <style>
    body { background: #07070D; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: #11111E; border: 1px solid rgba(0, 209, 255, 0.3); border-radius: 24px; padding: 32px 24px; max-width: 440px; width: 100%; box-shadow: 0 0 50px rgba(0, 209, 255, 0.2); transition: all 0.3s ease; }
    h1 { font-size: 21px; color: #00D1FF; margin: 0 0 8px; }
    p { color: #9CA3AF; font-size: 13px; line-height: 1.5; margin-bottom: 16px; }
    .qr-container { background: #fff; padding: 12px; border-radius: 16px; display: inline-block; box-shadow: 0 8px 25px rgba(0,0,0,0.5); min-width: 260px; min-height: 260px; }
    .qr-container img { display: block; width: 260px; height: 260px; object-fit: contain; }
    .steps { text-align: left; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 12px 18px; margin: 18px 0; font-size: 13px; color: #D1D5DB; }
    .steps ol { margin: 0; padding-left: 18px; }
    .steps li { margin-bottom: 5px; }
    .btn { display: inline-block; padding: 11px 20px; border-radius: 12px; font-weight: 600; font-size: 13px; text-decoration: none; transition: all 0.2s ease; }
    .btn-reset { color: #FFB400; background: rgba(255, 180, 0, 0.1); border: 1px solid rgba(255, 180, 0, 0.3); }
    .btn-reset:hover { background: rgba(255, 180, 0, 0.25); color: #fff; }
    .btn-danger { background: rgba(239, 68, 68, 0.15); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .btn-danger:hover { background: rgba(239, 68, 68, 0.3); color: #fff; }
    .btn-secondary { background: rgba(0, 209, 255, 0.1); color: #00D1FF; border: 1px solid rgba(0, 209, 255, 0.3); }
    .spinner { width: 44px; height: 44px; border: 4px solid rgba(0, 209, 255, 0.2); border-top-color: #00D1FF; border-radius: 50%; animation: spin 1s linear infinite; margin: 80px auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .status-text { font-size: 12px; color: #00D1FF; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card" id="mainCard">
    <div id="loadingView">
      <div class="spinner"></div>
      <h1>Generando código QR...</h1>
      <p>Iniciando servicio de WhatsApp en la nube.</p>
    </div>

    <div id="qrView" style="display: none;">
      <h1>🚀 Vincular WhatsApp Innocentia Tech</h1>
      <p>Escanea este código con tu cuenta oficial de WhatsApp Business:</p>
      <div class="qr-container">
        <img id="qrImage" src="" alt="Código QR WhatsApp" />
      </div>
      <div class="steps">
        <ol>
          <li>Abre <b>WhatsApp Business</b> en tu teléfono.</li>
          <li>Toca <b>Ajustes</b> ➔ <b>Dispositivos vinculados</b>.</li>
          <li>Toca <b>Vincular un dispositivo</b> y apunta la cámara a este QR.</li>
        </ol>
      </div>
      <div>
        <a href="/reset" class="btn btn-reset">🔄 Generar nuevo código QR</a>
      </div>
      <div class="status-text">🟢 Código activo listo para escanear</div>
    </div>

    <div id="connectedView" style="display: none;">
      <div style="font-size: 48px; margin-bottom: 12px;">✅</div>
      <h1 style="color: #00FF80;">WhatsApp Conectado</h1>
      <p>El bot de Sofía e Iván está atendiendo clientes 24/7 de forma automática y permanente.</p>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
        <a href="/logs" class="btn btn-secondary">📊 Ver monitor de mensajes en vivo</a>
        <a href="/reset" class="btn btn-danger" onclick="return confirm('¿Seguro que deseas desvincular?');">🔄 Desvincular / Vincular otro número</a>
      </div>
    </div>
  </div>

  <script>
    let currentQr = "";
    async function checkStatus() {
      try {
        const res = await fetch("/api/status");
        if (!res.ok) return;
        const data = await res.json();

        const loadingView = document.getElementById("loadingView");
        const qrView = document.getElementById("qrView");
        const connectedView = document.getElementById("connectedView");
        const qrImage = document.getElementById("qrImage");
        const card = document.getElementById("mainCard");

        if (data.connected) {
          loadingView.style.display = "none";
          qrView.style.display = "none";
          connectedView.style.display = "block";
          card.style.borderColor = "rgba(0, 255, 128, 0.4)";
          card.style.boxShadow = "0 0 50px rgba(0, 255, 128, 0.2)";
        } else if (data.qr) {
          if (currentQr !== data.qr) {
            currentQr = data.qr;
            qrImage.src = data.qr;
          }
          loadingView.style.display = "none";
          connectedView.style.display = "none";
          qrView.style.display = "block";
          card.style.borderColor = "rgba(0, 209, 255, 0.4)";
          card.style.boxShadow = "0 0 50px rgba(0, 209, 255, 0.2)";
        } else {
          loadingView.style.display = "block";
          qrView.style.display = "none";
          connectedView.style.display = "none";
        }
      } catch (err) {
        console.log("Polling status...", err);
      }
    }

    // Initial check and seamless non-blocking background polling
    checkStatus();
    setInterval(checkStatus, 2000);
  </script>
</body>
</html>`);
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      status: "online",
      bot: "Innocentia Tech Dual Core",
      whatsapp_connected: isWhatsAppConnected,
      last_connected_at: lastConnectedAt,
      timestamp: new Date().toISOString(),
    })
  );
});

process.on("uncaughtException", (err) => {
  addLog(`⚠️ Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason) => {
  addLog(`⚠️ Unhandled Rejection: ${reason}`);
});

function gracefulShutdown(signal) {
  console.log(`🛑 Recibido ${signal}. Cerrando socket anterior limpiamente sin reconectar...`);
  isShuttingDown = true;
  cleanupCurrentSocket();
  server.close(() => {
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 2000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Servidor HTTP activo en 0.0.0.0:${PORT} (listo para Render/Railway)`);
});

startWhatsAppBot();
