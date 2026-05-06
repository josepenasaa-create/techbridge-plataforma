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
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error directo:", error);
    return "Conexión establecida. Por favor, intenta enviarlo de nuevo.";
  }
}
