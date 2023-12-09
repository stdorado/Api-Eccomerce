document.addEventListener('DOMContentLoaded', () => {
  const finalizarCompraButton = document.getElementById('finalizarCompraButton');
  const cartId = '6526aab3fb59b510c46939fe'; // Utiliza el ID del carrito proporcionado

  finalizarCompraButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          alert(`Compra realizada con éxito. Código de ticket: ${data.ticket.code}, Total: $${data.ticket.amount}`);
           window.location.href = '/purchase';
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