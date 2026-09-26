import { NextResponse } from "next/server";
import { getIntelligentHumanReply } from "../../../lib/conversationalAI";

interface ChatMessage {
  sender: "user" | "sofia" | "ivan";
  text: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    const userMessage = (message || "").trim();
    if (!userMessage) {
      return NextResponse.json(
        { error: "Mensaje vacío" },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;

    // 1. If Gemini API key is configured, use Gemini 1.5 Flash / 2.0 Flash
    if (geminiApiKey) {
      try {
        const systemInstruction = `Eres el cerebro conversacional de Innocentia Tech, un estudio boutique de alta tecnología y diseño en Mérida, Yucatán.
Representas a dos líderes reales:
- SOFÍA: Directora Creativa & UX. Cálida, observadora, experta en branding, psicología visual, diseño Figma y experiencia de usuario.
- IVÁN: Director de Tecnología & Software. Directo, resolutivo, experto en arquitectura Next.js, bases de datos PostgreSQL, APIs, nube e Inteligencia Artificial.

REGLAS INFALIBLES:
1. RESPONDE DIRECTAMENTE A LA PREGUNTA EXACTA QUE HACE EL USUARIO. Si preguntan si algo es difícil, explica por qué suele serlo y cómo lo facilitan ustedes. Si preguntan tiempos, da plazos reales. Si preguntan precios o recomendaciones, opina con criterio consultivo honesto.
2. NUNCA des respuestas prefabricadas, discursos de venta ni enlaces automáticos.
3. Habla como dos personas reales en una plática amena de café o videollamada.
4. Cada intervención debe incluir una pregunta abierta para conocer más sobre su negocio o proyecto.
5. Devuelve SIEMPRE tu respuesta en formato JSON con la siguiente estructura exacta:
{
  "type": "both",
  "text": [
    "SOFÍA: [Tu respuesta cálida, visual o de experiencia enfocada en lo que preguntó el usuario]",
    "IVÁN: [Tu respuesta técnica, de método o proceso respondiendo a la pregunta y haciendo una pregunta de descubrimiento]"
  ]
}`;

        const conversationContext = (history || [])
          .slice(-6)
          .map((m: ChatMessage) => `${m.sender.toUpperCase()}: ${m.text}`)
          .join("\n");

        const prompt = `Contexto previo:\n${conversationContext}\n\nPregunta actual del usuario: "${userMessage}"\n\nResponde en JSON con la estructura solicitada:`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              systemInstruction: { parts: [{ text: systemInstruction }] },
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (parsed.text && Array.isArray(parsed.text)) {
              return NextResponse.json({
                success: true,
                source: "gemini",
                response: parsed,
              });
            }
          }
        }
      } catch (geminiError) {
        console.error("Gemini API error, falling back to local engine:", geminiError);
      }
    }

    // 2. If OpenAI API key is configured
    if (openaiApiKey) {
      try {
        const systemPrompt = `Eres el cerebro conversacional de Innocentia Tech (Mérida, Yucatán).
Representas a Sofía (Diseño & UX) e Iván (Tecnología & Software).
RESPONDE DIRECTAMENTE a la pregunta exacta del usuario, con calidez, honestidad y preguntas de descubrimiento.
Devuelve un JSON con:
{
  "type": "both",
  "text": [
    "SOFÍA: [respuesta]",
    "IVÁN: [respuesta]"
  ]
}`;

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const rawContent = openAiData.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = JSON.parse(rawContent);
            if (parsed.text && Array.isArray(parsed.text)) {
              return NextResponse.json({
                success: true,
                source: "openai",
                response: parsed,
              });
            }
          }
        }
      } catch (openAiError) {
        console.error("OpenAI API error, falling back to local engine:", openAiError);
      }
    }

    // 3. If Groq API key is configured (Ultra fast & Free AI)
    if (groqApiKey) {
      try {
        const systemPrompt = `Eres el cerebro conversacional de Innocentia Tech, un estudio boutique de desarrollo de software, diseño de marca y marketing digital de alta gama con base en Mérida, Yucatán, México.
Representas a dos líderes reales de la agencia:
- SOFÍA: Directora Creativa & UX. Experta en branding, diseño de identidad visual, logotipos, empaques, menús digitales e impresos y presencia en redes sociales.
- IVÁN: Director de Tecnología & Software. Experto en ingeniería web con Next.js, campañas de marketing digital en Meta/Google, pedidos automatizados por WhatsApp, bases de datos e IA.

SERVICIOS DE INNOCENTIA TECH (¡SOLO OFRECEMOS ESTO!):
1. Diseño de Marca & Identidad (logos, manuales de marca, empaques, menús).
2. Marketing Digital & Pauta Publicitaria (Meta Ads, Instagram, Facebook y Google para atraer clientes locales o nacionales).
3. Sitios Web & Plataformas (páginas web ultrarrápidas, menús interactivos QR, ecommerce).
4. Software & Apps a Medida (sistemas de inventario, punto de venta y automatización de pedidos por WhatsApp).
*NUNCA des consejos de albañilería, carpintería ni remodelación física de casas o muebles; somos una agencia de tecnología, diseño y marketing.*

CONTEXTO MEXICANO:
- En México una "cocina económica" o "fonda" es un negocio de comida corrida/almuerzos, no una cocina doméstica.
- Responde siempre orientando a cómo hacer crecer ese negocio con imagen atractiva, captación de clientes de la zona y tecnología para tomar pedidos.

REGLAS INFALIBLES:
1. RESPONDE DIRECTAMENTE A LA PREGUNTA EXACTA DEL USUARIO con honestidad, cercanía y empatía.
2. Sofía aporta el enfoque visual y de marca; Iván aporta la estrategia digital, tecnológica y de ventas.
3. Cada intervención debe incluir una pregunta abierta pertinente para conocer más sobre su negocio.
4. Devuelve SIEMPRE tu respuesta en formato JSON con la siguiente estructura exacta:
{
  "type": "both",
  "text": [
    "SOFÍA: [Tu respuesta cálida y visual]",
    "IVÁN: [Tu respuesta técnica o de estrategia con una pregunta de descubrimiento]"
  ]
}`;

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Por favor responde en formato JSON a esta consulta del cliente: "${userMessage}"` },
            ],
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const rawContent = (groqData.choices?.[0]?.message?.content || "").trim();
          const cleanJson = rawContent.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
          if (cleanJson) {
            const parsed = JSON.parse(cleanJson);
            if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
              return NextResponse.json({
                success: true,
                source: "groq",
                response: parsed,
              });
            }
          }
        }
      } catch (groqError) {
        console.error("Groq API error, falling back to local engine:", groqError);
      }
    }

    // 4. Fallback to advanced consultative engine
    const localReply = getIntelligentHumanReply(userMessage);
    return NextResponse.json({
      success: true,
      source: "consultative-engine",
      response: localReply,
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Error procesando mensaje" },
      { status: 500 }
    );
  }
}
