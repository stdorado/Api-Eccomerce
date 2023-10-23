const productsList = document.getElementById("productsList");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

let currentPage = 1; // Página actual

async function getAllProducts(page) {
  try {
    const response = await fetch(`/api/products?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();
    const products = responseJson.payload;
    compileProducts(products);
  } catch (err) {
    console.error("Error al obtener los productos:", err);
    document.getElementById("error-message").textContent = "Error al cargar los productos.";
  }
}

function compileProducts(products) {
  productsList.innerHTML = "";

  const productGrid = document.createElement("div");
  productGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-3", "xl:grid-cols-3", "gap-4");

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });

  productsList.appendChild(productGrid);
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("bg-white", "rounded-lg", "overflow-hidden", "shadow-lg");

  const cardBody = document.createElement("div");
  cardBody.classList.add("p-4");

  cardBody.innerHTML = `
    <div class="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 group">
      <img class="w-full h-64 object-cover" src="${product.thumbnail}" alt="${product.title}">
      <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-full">ID: ${product._id}</div>
      <div class="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full">Disponible</div>
      <div class="p-4">
        <h3 class="text-2xl font-semibold text-black">${product.title}</h3>
        <p class="text-gray-600 text-sm mt-2">${product.descripcion}</p>
        <div class="mt-4 flex justify-between items-center">
          <p>Stock disponible: ${product.stock}</p>
          <p class="text-2xl font-semibold text-gray-900">$${product.price}</p>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <button data-product-id="${product._id}" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none comprarButton">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `;

  const comprarButton = cardBody.querySelector(".comprarButton");
  comprarButton.addEventListener("click", () => {
    const productId = comprarButton.getAttribute("data-product-id");
    agregarAlCarrito(productId);
  });

  productCard.appendChild(cardBody);
  return productCard;
}

window.addEventListener("load", () => {
  getAllProducts(currentPage);
});

// Manejar el evento de "Página anterior"
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getAllProducts(currentPage);
  }
});

// Manejar el evento de "Página siguiente"
nextButton.addEventListener("click", () => {
  currentPage++;
  getAllProducts(currentPage);
});

const carritoId = "6526a937fb59b510c46939f8"

function agregarAlCarrito(productoId) {
  if (!productoId || typeof productoId !== 'string') {
    console.error('ID de producto no válido.');
    alert('ID de producto no válido.');
    return;
  }

  const url = `/api/carts/${carritoId}/products/${productoId}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: 1, // Puedes ajustar la cantidad si es necesario
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Producto agregado al carrito con éxito.');
        alert('Producto agregado al carrito con éxito');
      } else {
        response.text().then(errorMsg => {
          console.error('Error al agregar el producto al carrito:', errorMsg);
          console.log('Mensaje de error completo:', errorMsg);
          alert('Error al agregar el producto al carrito: ' + errorMsg);
        });
      }
    })
    .catch(error => {
      console.error('Error al agregar el producto al carrito:', error);
      alert('Error al agregar el producto al carrito: ' + error.message);
    });
}