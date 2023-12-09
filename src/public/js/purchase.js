
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
        console.log("Data de la compra", data);

        if (data.success) {
          // Crea el ticket en el cliente
          const ticketDetails = document.createElement('div');
       ticketDetails.innerHTML = `
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Detalles del Ticket</h2>
    <div class="mb-2">
      <span class="font-bold">Código de Ticket:</span>
      <span class="ml-2">${data.ticket.code}</span>
    </div>
    <div class="mb-2">
      <span class="font-bold">Fecha de Compra:</span>
      <span class="ml-2">${data.ticket.purchase_datetime}</span>
    </div>
    <div class="mb-2">
      <span class="font-bold">Monto Total:</span>
      <span class="ml-2">$${data.ticket.amount}</span>
    </div>
    <div class="mb-4">
      <span class="font-bold">Comprador:</span>
      <span class="ml-2">${data.ticket.purchaser}</span>
    </div>
  </div>
`;
          

          if (ticketElement) {
            ticketElement.innerHTML = '';
            ticketElement.appendChild(ticketDetails);
          } else {
            console.error('El elemento ticketElement es nulo.');
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