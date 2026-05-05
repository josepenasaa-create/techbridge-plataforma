import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types";

// Configura tu llave directamente aquí
const genAI = new GoogleGenerativeAI("AIzaSyDk4cvF2Nq0beFP_6nezmMF7rjva5GU1GI");

export async function getInterviewFeedback(messages: ChatMessage[]) {
  try {
    const formattedMessages = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    // Usamos el modelo gemini-1.5-flash que es el más estable
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Eres un reclutador experto en tecnología de una empresa de software líder. Tu objetivo es entrevistar a estudiantes de ingeniería de sistemas (18-28 años) en la plataforma TechBridge. 1. Haz preguntas técnicas y de habilidades blandas. 2. Mantén un tono profesional pero alentador (tipo LinkedIn). 3. Después de cada respuesta, da un breve feedback constructivo antes de la siguiente pregunta. 4. No respondas con bloques demasiado largos."
    });

    const result = await model.generateContent({
      contents: formattedMessages,
    });

    return result.response.text();
  } catch (error) {
    console.error("AI Interview Error:", error);
    return "Lo siento, tuve un problema analizando tu respuesta. ¿Podrías repetirla?";
  }
}
