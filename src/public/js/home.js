let products = [];
let error = "";

const productsList = document.getElementById("productsList");

    async function getAllProducts() {
      try {
        const response = await fetch("/api/products"); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseJson = await response.json();
        const products = responseJson; 

        compileProducts(products);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
      }
    }

    function compileProducts(products) {
      const productGrid = document.createElement("div");
      productGrid.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-3", "xl:grid-cols-3", "gap-4");

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
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
      <div class="absolute bottom-2 left-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-full">
        <p>Código Del Producto: ${product.code}</p>
      </div>
      <p>Stock disponible: ${product.stock}</p>
      <p class="text-2xl font-semibold text-gray-900">$${product.price}</p>
    </div>
    <div class="mt-4 flex justify-end space-x-2">
      <button class="bg-black text-white py-2 px-4 rounded-md hover:bg-red-800 transition">
        <a href="/cart" class="block w-full text-center text-white py-2 px-4 rounded-md transition">Comprar</a>
      </button>
    </div>
  </div>
</div>
        `;

        productCard.appendChild(cardBody);
        productGrid.appendChild(productCard);
      }

      productsList.appendChild(productGrid);
    }

    
    window.addEventListener("load", () => {
      getAllProducts();
    });