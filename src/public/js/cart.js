document.addEventListener('DOMContentLoaded', () => {
  const eliminarButtons = document.querySelectorAll('.eliminarButton');

  eliminarButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const productId = event.target.getAttribute('data-product-id');
      const cartId = '6526a937fb59b510c46939f8'; // 

      try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.status === 200) {
          // El producto se eliminó con éxito
          alert('Producto eliminado del carrito');
          window.location.reload(); // Recargar la página para reflejar los cambios
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
});