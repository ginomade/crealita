const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Ejemplo de endpoint de DeepSeek para imágenes (ajustar según docs reales)
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/images/generations';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

exports.handler = async function(event, context) {
  const { prompt } = JSON.parse(event.body || '{}');

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Prompt faltante.' })
    };
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        // size: "1024x1024", // Descomentar o ajustar según la API de DeepSeek
        // ...otros parámetros según documentación
      })
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'DeepSeek error', detail: err.message })
    };
  }
};
