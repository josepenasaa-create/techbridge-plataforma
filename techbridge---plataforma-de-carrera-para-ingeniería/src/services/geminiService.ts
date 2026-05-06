export async function getInterviewFeedback(messages: any[]) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  // Dirección corregida y estable de Google
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
    
    // Si Google responde con error, lo vemos en la consola
    if (data.error) {
      console.error("Error de Google:", data.error.message);
      return "Hubo un problema con la llave de acceso. Por favor, revisa la configuración.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error de conexión:", error);
    return "No pude conectarme. Por favor, intenta enviar tu respuesta otra vez.";
  }
}
