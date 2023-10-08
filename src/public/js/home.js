let products = [];
let error = "";

const productsList = document.getElementById("productsList");

async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:8080/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();
    products = [...responseJson.products];
    compileProducts();
  } catch (err) {
    error = err;
    console.error("Error al obtener los productos:", err);
  }
}

function compileProducts() {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  const productGrid = document.createElement("div");
  productGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-3", "xl:grid-cols-3", "gap-4");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productCard = document.createElement("div");
    productCard.classList.add("bg-white", "rounded-lg", "overflow-hidden", "shadow-lg");

    const cardBody = document.createElement("div");
    cardBody.classList.add("p-4");

    cardBody.innerHTML = `
  <div class="relative rounded-lg overflow-hidden group">
    <img class="w-full h-64 object-cover transform scale-100 group-hover:scale-105 transition duration-300" src="${product.thumbnail}" alt="${product.title}">
    <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-full">
      ID: ${product.id}
    </div>
    <div class="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full">
      Disponible
    </div>
  </div>
  <div class="mt-4">
    <h3 class="text-2xl font-semibold">${product.title}</h3>
    <p class="text-gray-600 text-sm mt-2">${product.descripcion}</p>
  </div>
  <div class="mt-4 flex justify-between items-center">
    <div>
      <p class="text-gray-700 text-sm">Stock disponible: ${product.stock}</p>
      <p class="text-gray-700 text-sm">Código: ${product.code}</p>
    </div>
    <p class="text-2xl font-semibold text-gray-900">$${product.price}</p>
  </div>
  <div class="mt-4 flex justify-end space-x-2">
    <button class="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Comprar</button>
    <button class="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Detalles</button>
  </div>
`;
    productCard.appendChild(cardBody);
    productGrid.appendChild(productCard);
  }

  productsList.appendChild(productGrid);
}
getAllProducts();
