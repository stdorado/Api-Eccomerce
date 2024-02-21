document.addEventListener("DOMContentLoaded", () => {
  let cartId = "6526aabcfb59b510c4693a02";

  const eliminarButtons = document.querySelectorAll(".eliminarButton");
  const finalizarCompraButton = document.getElementById(
    "finalizarCompraButton"
  );
  const vaciarCarritoButton = document.getElementById("vaciarCarritoButton");
  const addToCartButtons = document.querySelectorAll(".addToCartButton");

  eliminarButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-product-id");

      try {
        const response = await fetch(
          `/api/carts/${cartId}/products/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Producto eliminado del carrito",
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            window.location.reload();
          });
        } else {
          const data = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al eliminar el producto: ${data.error}`,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al eliminar el producto del carrito",
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  });

  vaciarCarritoButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/clear`, {
        method: "POST",
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Carrito vaciado con éxito",
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al vaciar el carrito: ${data.error}`,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al vaciar el carrito",
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });

  finalizarCompraButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
      });

      if (response.status === 200) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Compra realizada con éxito",
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al finalizar la compra: ${data.error}`,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al finalizar la compra",
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-product-id");

      try {
        const response = await fetch(
          `/api/carts/${cartId}/products/${productId}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Producto agregado al carrito",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            window.location.reload();
          });
        } else {
          const data = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al agregar el producto al carrito: ${data.error}`,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar el producto al carrito",
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  });
});
