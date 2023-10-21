let products = [];
let error = "";
let cartId;

const cart = document.getElementById("cart");

if (cart) {
  cartId = cart.innerText.replace("Cart: ", "");
  const productsList = document.getElementById("productsList");

  async function getAllProducts() {
    try {
      const response = await fetch(`/api/carts/${cartId}`);
      const responseJson = await response.json();

      if (responseJson.error) {
        console.error(`Error: ${responseJson.error}`);
      } else {
        products = [...responseJson.products];
        compileProducts();
      }
    } catch (err) {
      console.error('Error:', err);
      error = err;
    }
  }

  function compileProducts() {
    const productsTemplate = products
      .map(
        (product) => `<li>
          <p>ID: ${product.productId._id} Quantity: ${product.quantity}</p>
          <p>Title: ${product.productId.title}</p>
          <p>Description: ${product.productId.description}</p>
          <p>Price: ${product.productId.price}</p>
          <p>Code: ${product.productId.code}</p>
          <p>Stock: ${product.productId.stock}</p>
          <button data-product-id="${product.productId._id}" class="remove-from-cart">Eliminar</button>
        </li>`
      )
      .join(" ");
    productsList.innerHTML = productsTemplate;

    // Agregar event listeners a los botones "Eliminar"
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        eliminarProductoDelCarrito(productId);
      });
    });
  }

  getAllProducts();
} else {
  console.error("Element with ID 'cart' not found in the HTML.");
}

async function eliminarProductoDelCarrito(productId) {
  try {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Producto eliminado con éxito
      getAllProducts(); // Vuelve a cargar los productos del carrito
    } else {
      const responseData = await response.json();
      console.error(`Error al eliminar el producto: ${responseData.error}`);
    }
  } catch (error) {
    console.error("Error en la solicitud de eliminación del producto:", error);
  }
}

const clearCartButton = document.getElementById("clearCartButton");

clearCartButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`/api/carts/${cartId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Carrito vaciado con éxito
      products = []; // Vacía la lista de productos en el frontend
      compileProducts();
    } else {
      const responseData = await response.json();
      console.error(`Error al vaciar el carrito: ${responseData.error}`);
    }
  } catch (error) {
    console.error("Error en la solicitud de vaciado del carrito:", error);
  }
});