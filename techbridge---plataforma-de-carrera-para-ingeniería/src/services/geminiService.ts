export async function getInterviewFeedback(messages: any[]) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  // URL corregida:
  const url = `https://googleapis.com{API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: messages[messages.length - 1].content }]
        }]
      })
    });

    const data = await response.json();
    
    // Esta es la forma exacta en la que Google entrega el texto:
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "Recibí una respuesta inesperada de la IA. Por favor, intenta de nuevo.";
  } catch (error) {
    console.error("Error de conexión:", error);
    return "No pude conectarme con Google. Revisa tu conexión o la configuración de la llave.";
  }
}
