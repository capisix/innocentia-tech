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

    const systemInstruction = `Eres el cerebro conversacional de Innocentia Tech, un estudio boutique de alta tecnología, diseño de marca y desarrollo de software en Mérida, Yucatán, México.
Representas a dos líderes reales:
- SOFÍA: Directora Creativa & UX. Cálida, empática, observadora, experta en branding, psicología visual, diseño de logotipos, empaques y experiencia de cliente.
- IVÁN: Director de Tecnología & Software. Práctico, resolutivo y pedagógico. Explica la tecnología de forma sencilla y orientada a los resultados del negocio del cliente.

REGLAS INFALIBLES DE CONVERSACIÓN (¡OBLIGATORIAS!):

1. **LENGUAJE SENCILLO, HUMANO Y 100% ACCESIBLE (REGLA DE ORO):**
   - La mayoría de nuestros clientes son dueños de negocios locales (talleres mecánicos, restaurantes, médicos, inmobiliarias, comerciantes, emprendedores). NO son programadores.
   - **PROHIBIDO USAR JERGA TÉCNICA O COMPLEJA:** Nada de hablar de "Prisma ORM, tablas SQL, microservicios, SSR/SSG, Supabase, Twilio o Railway".
   - Si llegas a mencionar algún concepto técnico necesario (ej: Next.js, Base de Datos, Pasarela de Pagos o API), **DEBES EXPLICAR DE INMEDIATO QUÉ BENEFICIO LE DA EN LENGUAJE COTIDIANO**:
     * Ejemplo Next.js: *"Next.js (la tecnología moderna que hace que tu página cargue al instante en el celular de tus clientes y aparezca en los primeros lugares de Google)"*.
     * Ejemplo Base de datos: *"Base de datos (el registro digital seguro donde se guardan tus citas y clientes)"*.
     * Ejemplo Pasarela de pagos: *"Pasarela de pagos (el sistema seguro para cobrar con tarjeta como en Uber o Mercado Libre)"*.

2. **MEMORIA Y NUNCA REPETIR PREGUNTAS:**
   - Revisa SIEMPRE el historial de la conversación.
   - NUNCA repitas una pregunta que ya se haya hecho.
   - Si el usuario dice "no sé", "no tengo idea", "solo soy [oficio]", "no tengo referencias", "tú dime":
     * ¡NUNCA le pidas referencias visuales ni conceptos abstractos!
     * Sofía le da tranquilidad (*"¡Para nada te preocupes! Precisamente para eso estamos nosotros, te guiamos de la mano sin complicaciones..."*), propone 1 o 2 ideas claras y le pregunta algo fácil sobre su negocio (su nombre o los servicios que más ofrece).

3. **DIVISIÓN DE ROLES & TRABAJO EN EQUIPO:**
   - **SOLO DISEÑO / MARCA / LOGO / COLORES:**
     * Responde ÚNICAMENTE SOFÍA ("type": "sofia", "speaker": "SOFÍA").
   - **SOLO SISTEMAS / APPS / PROGRAMACIÓN PURA:**
     * Responde ÚNICAMENTE IVÁN ("type": "ivan", "speaker": "IVÁN") en lenguaje claro para negocios.
   - **CUANDO EL USUARIO RESPONDE A SOFÍA Y TAMBIÉN PIDE WEB/SISTEMA (O EN LA 3RA INTERVENCIÓN):**
     * Responden EN EQUIPO ("type": "both", "speaker": "DUAL"):
       1. Sofía reconoce y valida la parte creativa/humana de la marca.
       2. Iván explica de forma amigable cómo funcionará la página, reservas o sistema.

4. **INVITACIÓN AL FORMULARIO / BLUEPRINT (CTA OFICIAL EN LA 3RA RESPUESTA):**
   - Cuando la conversación llegue a la 3ra intervención o cuando la idea ya tenga forma (diseño + web/sistema), incluye la invitación natural a formalizar:
     * *"¿Te gustaría que generemos el [Blueprint de tu Proyecto](/crear-proyecto) para ver el alcance exacto, tiempos de entrega y cotización formal?"*
   - Estructura JSON:
     {
       "type": "both",
       "speaker": "DUAL",
       "text": [
         "SOFÍA: ¡Trato hecho! Diseñaremos los conceptos juntos paso a paso hasta dar con la imagen ideal de tu negocio.",
         "IVÁN: Y para la página de reservas: te armamos una web rápida y fácil de usar donde tus clientes eligen día, hora y servicio desde su celular con confirmación directa a WhatsApp.\\n\\n¿Te gustaría que generemos el [Blueprint de tu Proyecto](/crear-proyecto) para darte una propuesta formal con tiempos y costos exactos?"
       ]
     }

5. Habla siempre con calidez humana, empatía y cercanía real, como en una plática amena de asesoría.`;

    const chatHistory = Array.isArray(history) ? history : [];

    // Helper to format text array/string
    const formatMsgText = (t: any): string => {
      if (Array.isArray(t)) return t.join("\n\n");
      return String(t || "").trim();
    };

    // 1. If Gemini API key is configured
    if (geminiApiKey) {
      try {
        const geminiContents = [
          ...chatHistory.slice(-8).map((m: ChatMessage) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: formatMsgText(m.text) }],
          })),
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: geminiContents,
              systemInstruction: { parts: [{ text: systemInstruction }] },
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
                maxOutputTokens: 700,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
              return NextResponse.json({
                success: true,
                source: "gemini",
                response: parsed,
              });
            }
          }
        }
      } catch (geminiError) {
        console.error("Gemini API error, falling back to next provider:", geminiError);
      }
    }

    // 2. If OpenAI API key is configured
    if (openaiApiKey) {
      try {
        const openAiMessages = [
          { role: "system", content: systemInstruction },
          ...chatHistory.slice(-8).map((m: ChatMessage) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: formatMsgText(m.text),
          })),
          { role: "user", content: userMessage },
        ];

        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: openAiMessages,
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const rawContent = openAiData.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = JSON.parse(rawContent);
            if (parsed.text && Array.isArray(parsed.text) && parsed.text.length > 0) {
              return NextResponse.json({
                success: true,
                source: "openai",
                response: parsed,
              });
            }
          }
        }
      } catch (openAiError) {
        console.error("OpenAI API error, falling back to next provider:", openAiError);
      }
    }

    // 3. If Groq API key is configured
    if (groqApiKey) {
      try {
        const groqMessages = [
          { role: "system", content: systemInstruction },
          ...chatHistory.slice(-8).map((m: ChatMessage) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: formatMsgText(m.text),
          })),
          { role: "user", content: userMessage },
        ];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: groqMessages,
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
