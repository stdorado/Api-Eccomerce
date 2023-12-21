document.addEventListener('DOMContentLoaded', () => {
  const confirmarCompraButton = document.getElementById('confirmarCompraButton');
  const ticketElement = document.getElementById('ticketDetails');
  const cartId = '6526aab3fb59b510c46939fe'; 

  confirmarCompraButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Verifica si ya existe un ticket antes de crear uno nuevo
          if (!document.getElementById('ticketDetails')) {
            console.log('Ya existe un ticket. Evitando la creación duplicada.');
          } else {
            // Muestra el ticket existente
            console.log('Mostrando el ticket existente.');
            ticketElement.style.display = 'block'; // Ajusta según tu estilo
          }

          // Muestra un mensaje al usuario
          alert('Compra realizada con éxito');
        } else {
          alert(`Error al finalizar la compra: ${data.error}`);
        }
      } else {
        const data = await response.json();
        alert(`Error al finalizar la compra: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
      alert('Hubo un error al finalizar la compra');
    }
  });
});