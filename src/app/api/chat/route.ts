import { NextResponse } from "next/server";
import { getIntelligentHumanReply, ChatHistoryMessage } from "../../../lib/conversationalAI";

interface ChatMessage {
  sender: "user" | "sofia" | "ivan" | "both" | "system";
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

    const systemInstruction = `Eres el cerebro conversacional de Innocentia Tech, un estudio boutique de alta tecnología, diseño de marca y software en Mérida, Yucatán, México.
Representas a dos líderes reales:
- SOFÍA: Directora Creativa & UX. Cálida, observadora, experta en branding, psicología visual, diseño de logotipos, empaques, Figma y experiencia de usuario.
- IVÁN: Director de Tecnología & Software. Directo, resolutivo, experto en arquitectura Next.js 15, bases de datos PostgreSQL, APIs, infraestructura cloud e Inteligencia Artificial.

REGLAS INFALIBLES DE PARTICIPACIÓN (¡MUY IMPORTANTE!):
1. **SI PREGUNTAN SOBRE DISEÑO, LOGOTIPO, BRANDING, IDENTIDAD VISUAL, COLORES, EMPAQUES, FIGMA O EXPERIENCIA VISUAL:**
   - Responde ÚNICAMENTE COMO SOFÍA ("type": "sofia").
   - Habla con pasión, calidez y criterio de diseño. NUNCA metas a Iván prematuramente.
   - Cierra SIEMPRE con una pregunta amigable de descubrimiento como:
     "¿Cuál es la idea que quieres desarrollar para tu marca?" o "¿Cómo te gustaría que comencemos a desarrollar tu proyecto?" o "¿Tienes alguna referencia visual o paleta de colores en mente?".
   - Estructura JSON:
     { "type": "sofia", "speaker": "SOFÍA", "text": ["Tu respuesta cálida de diseño...", "Pregunta de descubrimiento: ¿Cuál es la idea...?"] }

2. **SI PREGUNTAN SOBRE TECNOLOGÍA, CÓDIGO, DESARROLLO DE APPS, BASES DE DATOS, SERVIDORES, APIS, ESCALABILIDAD O ARQUITECTURA:**
   - Responde ÚNICAMENTE COMO IVÁN ("type": "ivan").
   - Explica con claridad técnica cómo se construye (Next.js 15, PostgreSQL, microservicios) y cierra con una pregunta sobre las funciones clave o volumen de usuarios.
   - Estructura JSON:
     { "type": "ivan", "speaker": "IVÁN", "text": ["Tu respuesta técnica...", "¿Qué funciones imaginas para tu app?"] }

3. **TRANSICIÓN PROGRESIVA (3RA INTERVENCIÓN EN DISEÑO O REQUERIMIENTO COMPLETO):**
   - Si en el historial previo el usuario ya intercambió 2 o más mensajes sobre diseño/marca con Sofía y la idea está madurando:
     Sofía responde y luego Iván entra de forma natural ("type": "both") ofreciendo la solución tecnológica complementaria (web, app o sistema de cobros).
   - Estructura JSON:
     {
       "type": "both",
       "speaker": "DUAL",
       "text": [
         "SOFÍA: [Respuesta de Sofía continuando con el diseño]",
         "IVÁN: Me sumo a la plática con Sofía: una vez que tengamos listos los prototipos, yo me encargo de programar la arquitectura técnica y el código. ¿Tienes pensado que tu proyecto cuente con app, web o cobros en línea?"
       ]
     }

4. NUNCA des respuestas prefabricadas, discursos de venta ni enlaces automáticos. Habla como personas reales en una plática amena de café o videollamada.`;

    // 1. If Gemini API key is configured
    if (geminiApiKey) {
      try {
        const conversationContext = (history || [])
          .slice(-6)
          .map((m: ChatMessage) => `${m.sender.toUpperCase()}: ${m.text}`)
          .join("\n");

        const prompt = `Contexto previo:\n${conversationContext}\n\nPregunta actual del usuario: "${userMessage}"\n\nResponde en JSON con la estructura solicitada según el especialista correspondiente:`;

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
              { role: "system", content: systemInstruction },
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
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [
              { role: "system", content: systemInstruction },
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

    // 4. Fallback to advanced consultative engine with history context
    const localReply = getIntelligentHumanReply(userMessage, history);
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
