export async function getInterviewFeedback(messages: any[]) {
  const API_KEY = import.meta.env.VITE_API_KEY;
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
    
    // Esta es la forma correcta de extraer el texto en la versión fetch
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "Recibí una respuesta vacía de la IA. ¿Podrías intentar de nuevo?";
  } catch (error) {
    console.error("Error de conexión:", error);
    return "No pude conectarme con el servidor de Google. Revisa tu conexión a internet.";
  }
}
