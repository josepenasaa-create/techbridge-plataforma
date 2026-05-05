/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getInterviewFeedback(messages: ChatMessage[]) {
  try {
    const formattedMessages = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: formattedMessages,
      config: {
        systemInstruction: `Eres un reclutador experto en tecnología de una empresa de software líder. 
        Tu objetivo es entrevistar a estudiantes de ingeniería de sistemas (18-28 años) en la plataforma TechBridge.
        1. Haz preguntas técnicas y de habilidades blandas.
        2. Mantén un tono profesional pero alentador (tipo LinkedIn).
        3. Después de cada respuesta, da un breve feedback constructivo antes de la siguiente pregunta.
        4. No respondas con bloques demasiado largos.`
      }
    });

    return result.text;
  } catch (error) {
    console.error("AI Interview Error:", error);
    return "Lo siento, tuve un problema analizando tu respuesta. ¿Podrías repetirla?";
  }
}
