// Obtener referencia al formulario de carga de imágenes
const uploadForm = document.querySelector('#upload-form');

// Manejar el evento de envío del formulario
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  
  const formData = new FormData(uploadForm); // Crear un objeto FormData con los datos del formulario
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // La imagen se ha subido exitosamente
      alert('Imagen subida exitosamente');
    } else {
      // Hubo un error al subir la imagen
      alert('Error al subir la imagen');
    }
  } catch (error) {
    console.error('Error al subir la imagen', error);
    alert('Error al subir la imagen');
  }
});