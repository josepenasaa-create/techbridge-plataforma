import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY);

export async function getInterviewFeedback(messages: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Filtramos para que el primer mensaje siempre sea del usuario
    const chatContent = messages
      .filter((m, i) => !(i === 0 && m.role === 'model'))
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const result = await model.generateContent({
      contents: chatContent
    });

    return result.response.text();
  } catch (error) {
    console.error("Error:", error);
    return "Hubo un error de conexión con la IA. Por favor, intenta de nuevo.";
  }
}
