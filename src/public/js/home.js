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
    <div class=" rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 group">
      <img class="w-full h-64 object-cover" src="${product.thumbnail}" alt="${product.title}">
      <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-full">ID: ${product._id}</div>
      <div class="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full">Disponible</div>
      <div class="p-4">
        <h3 class="text-2xl font-semibold  text-black">${product.title}</h3>
        <p class="text-gray-600 text-lg mt-2">${product.descripcion}</p>
        <div class="mt-4 flex justify-between items-center">
          <p>Stock disponible: ${product.stock}</p>
          <p class="text-2xl font-semibold text-gray-900">$${product.price}</p>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <button data-product-id="${product._id}" class="px-4 py-2 bg-slate-900 hover:bg-green-600 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none comprarButton">
            <span class="flex items-center">
              Agregar al Carrito
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4 ml-1" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4 ml-1 transform rotate-180" viewBox="0 0 16 16">
                <path d="M6.354 11.354a.5.5 0 0 0 0-.708L2.707 7.5H12.5a.5.5 0 0 0 0-1H2.707l3.647-3.646a.5.5 0 0 0 0-.708a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708 0z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  `;

  if (product.stock === 0) {
    const productGroup = cardBody.querySelector('.group');
    productGroup.classList.add('opacity-80', 'relative', 'sin-stock');
  
    const notAvailableMessage = document.createElement('div');
    notAvailableMessage.innerHTML = '<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-800 bg-opacity-100 p-4 rounded text-white">Producto no disponible</div>';
    productGroup.appendChild(notAvailableMessage);
  
    const comprarButton = cardBody.querySelector(".comprarButton");
    comprarButton.disabled = true;
    comprarButton.classList.add('bg-red-800', 'cursor-not-allowed');
  }

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

const carritoId = "6526aab3fb59b510c46939fe";

function agregarAlCarrito(productoId) {
  if (!productoId || typeof productoId !== 'string') {
    console.error('ID de producto no válido.');
    return;
  }

  const url = `/api/carts/${carritoId}/products/${productoId}`;
 

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: 1, 
    }),
  })
    .then(response => {
      if (response.ok) {
        alert('Producto agregado al carrito con éxito');
      } else {
        response.text().then(errorMsg => {
          alert('Error al agregar el producto al carrito: ' + errorMsg);
        });
      }
    })
    .catch(error => {
      console.error('Error al agregar el producto al carrito:', error);
    });
}