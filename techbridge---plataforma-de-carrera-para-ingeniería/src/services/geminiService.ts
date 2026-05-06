import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY);

export async function getInterviewFeedback(messages: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // La IA de Google exige que el historial SIEMPRE empiece con un mensaje del 'user'
    // Como el primer mensaje es el saludo de la IA, lo filtramos para el historial
    const history = messages
      .slice(0, -1)
      .filter((m, index) => !(index === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);

    return result.response.text();

  } catch (error) {
    console.error("Error detallado:", error);
    return "Tuve un pequeño problema técnico, pero ya estoy listo. ¿Podemos continuar?";
  }
}
