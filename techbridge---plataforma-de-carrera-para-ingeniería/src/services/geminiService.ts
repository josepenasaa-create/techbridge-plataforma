import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY);

export async function getInterviewFeedback(messages: any[]) {
  try {
    // Forzamos el modelo estable
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Preparamos los mensajes: Google exige que el primero sea del 'user'
    // Filtramos el saludo inicial del bot para que no cause error
    const chatHistory = messages
      .slice(0, -1)
      .filter((m, i) => !(i === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const lastMessage = messages[messages.length - 1].content;
    
    // Usamos la función más directa para evitar errores de historial
    const result = await model.generateContent({
      contents: [...chatHistory, { role: 'user', parts: [{ text: lastMessage }] }]
    });

    return result.response.text();
  } catch (error) {
    console.error("Error en la IA:", error);
    return "Tuve un problema de conexión. ¿Podrías intentar enviarlo de nuevo?";
  }
}
