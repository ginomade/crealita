const promptForm = document.getElementById('promptForm');
const userInput = document.getElementById('userInput');
const loading = document.getElementById('loading');
const imageSection = document.getElementById('imageSection');
const generatedImage = document.getElementById('generatedImage');

const arquitecturaPromptBase = `Prompt para IA generativa de imágenes arquitectónicas:
Visualiza la siguiente escena arquitectónica de manera realista, con atención al detalle, luz natural, composición profesional, y en alta resolución. El estilo debe ser moderno, colores suaves, integrando elementos naturales y un enfoque estético contemporáneo.
Escena: `;

promptForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loading.style.display = 'block';
  imageSection.style.display = 'none';
  generatedImage.src = "";

  const prompt = arquitecturaPromptBase + userInput.value.trim();

  try {
    const response = await fetch('/.netlify/functions/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    loading.style.display = 'none';

    if (data.data && data.data[0] && data.data[0].url) {
      generatedImage.src = data.data[0].url;
      imageSection.style.display = 'block';
    } else {
      generatedImage.alt = 'No se pudo generar la imagen. Reintenta.';
      imageSection.style.display = 'block';
    }
  } catch (err) {
    loading.style.display = 'none';
    generatedImage.alt = 'Error al generar la imagen.';
    imageSection.style.display = 'block';
    console.error(err);
  }
});
