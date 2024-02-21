
const uploadForm = document.querySelector("#upload-form");

// Manejar el evento de envío del formulario
uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const formData = new FormData(uploadForm);
  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      
      console.log("Imagen subida exitosamente");
    } else {
      console.log("Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error al subir la imagen", error);

  }
});
