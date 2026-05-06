export async function getInterviewFeedback(messages: any[]) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  // URL construida de forma ultra segura
  const baseUrl = "https://googleapis.com";
  const finalUrl = `${baseUrl}?key=${API_KEY}`;

  try {
    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: messages[messages.length - 1].content }]
        }]
      })
    });

    const data = await response.json();
    
    // Acceso directo a la respuesta de Google
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "Conexión exitosa, pero la IA no devolvió texto. Intenta una respuesta más larga.";
  } catch (error) {
    console.error("Error:", error);
    return "Error de red. Por favor, revisa que la API Key en Vercel sea la correcta.";
  }
}
