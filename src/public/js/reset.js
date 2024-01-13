document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const newPassword = document.getElementById('newPassword').value;
      const token = document.getElementById('token').value;
  
      try {
        const response = await fetch(`/recovering/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
        });
  
        const data = await response.json();
  
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario.
        console.log(data);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  });