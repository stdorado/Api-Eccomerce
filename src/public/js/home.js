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

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productColumn = document.createElement("div");
    productColumn.classList.add("col-md-4");

    const productCard = document.createElement("div");
    productCard.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    cardBody.innerHTML = `
      <h3 class="card-title">${product.title}</h3>
      <p class="card-text">ID De la casa: ${product.id}</p>
      <p class="card-text">Description de la casa: ${product.description}</p>
      <p class="card-text">Price: ${product.price}</p>
      <p class="card-text">Code: ${product.code}</p>
      <p class="card-text">Stock disponible: ${product.stock}</p>
    `;

    productCard.appendChild(cardBody);
    productColumn.appendChild(productCard);
    productsList.appendChild(productColumn);
  }
}

getAllProducts();

