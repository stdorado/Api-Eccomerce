document.addEventListener('DOMContentLoaded', () => {
  let cartId = '6526aab3fb59b510c46939fe';  
  
  const eliminarButtons = document.querySelectorAll('.eliminarButton');
  const finalizarCompraButton = document.getElementById('finalizarCompraButton');
  const vaciarCarritoButton = document.getElementById('vaciarCarritoButton');

  eliminarButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const productId = event.target.getAttribute('data-product-id');

      try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.status === 200) {
          alert('Producto eliminado del carrito');
          window.location.reload();
        } else {
          const data = await response.json();
          alert(`Error al eliminar el producto: ${data.error}`);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Hubo un error al eliminar el producto del carrito');
      }
    });
  });

  vaciarCarritoButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/clear`, {
        method: 'POST',
      });

      if (response.status === 200) {
        alert('Carrito vaciado con éxito');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`Error al vaciar el carrito: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      alert('Hubo un error al vaciar el carrito');
    }
  });

  finalizarCompraButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
      });

      if (response.status === 200) {
        const data = await response.json();
        alert(`Compra realizada con éxito`);
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