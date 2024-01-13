document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgetPasswordForm');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
  
      try {
        const response = await fetch('/recovering', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario.
        console.log(data);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  });