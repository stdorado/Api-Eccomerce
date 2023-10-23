window.addEventListener("load", () => {
  const productsList = document.getElementById("productsList");

  async function getAllProducts() {
    try {
      const response = await fetch("/api/carts/cart");
      
      if (response.headers.get("content-type") === "application/json") {
        const responseJson = await response.json();
  
        if (responseJson.error) {
          console.error(`Error: ${responseJson.error}`);
        } else {
          const products = responseJson.products;
          renderProducts(products);
        }
      } else {
        console.error("La respuesta no es de tipo JSON.");
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  function renderProducts(products) {
    const productsHTML = products.map((product) => {
      return `
        <div class="product">
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p>${product.descripcion}</p>
          <p>Price: $${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Category: ${product.category}</p>
          <button class="eliminarButton" data-product-id="${product._id}">Eliminar producto</button>
        </div>
      `;
    }).join("");

    productsList.innerHTML = productsHTML;

    // Agregar event listeners a los botones "Eliminar"
    const eliminarButtons = document.querySelectorAll(".eliminarButton");
    eliminarButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        eliminarProductoDelCarrito(productId);
      });
    });
  }

  getAllProducts();
});

async function eliminarProductoDelCarrito(productId) {
  try {
    const response = await fetch(`/api/carts/cart/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      getAllProducts();
    } else {
      const responseData = await response.json();
      console.error(`Error al eliminar el producto: ${responseData.error}`);
    }
  } catch (error) {
    console.error("Error en la solicitud de eliminación del producto:", error);
  }
}