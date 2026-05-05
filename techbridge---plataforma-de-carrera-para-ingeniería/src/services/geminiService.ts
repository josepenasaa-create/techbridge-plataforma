import { GoogleGenerativeAI } from "@google/generative-ai";

// Usamos la variable segura de Vercel
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY);

export async function getInterviewFeedback(messages: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convertimos los mensajes al formato que pide la IA
    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    return result.response.text();
    
  } catch (error) {
    console.error("Error detallado:", error);
    return "Lo siento, hubo un error de conexión. Por favor, intenta de nuevo.";
  }
}
