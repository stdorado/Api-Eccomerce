import io from "socket.io-client";
const socketClient = io("http://localhost:8080");
let products = [];
let error = "";
const productsList = document.getElementById("productsList");

socketClient.emit("getAllProducts");

const addProductForm = document.getElementById("addProductForm");
const updateProductForm = document.getElementById("updateProductForm");
const deleteForm = document.getElementById("deleteForm");

let updateProductId = document.getElementById("updateProductId");
let deleteProductId = document.getElementById("deleteProductId");

function validNewProduct(product) {
  return (
    product.title &&
    product.description &&
    product.code &&
    product.price >= 0 &&
    product.stock >= 0
  );
}

addProductForm.onsubmit = async (e) => {
  e.preventDefault();
  let newProduct = {
    title: document.getElementById("newProductTitle").value,
    description: document.getElementById("newProductDescription").value,
    price: document.getElementById("newProductPrice").value,
    code: document.getElementById("newProductCode").value,
    stock: document.getElementById("newProductStock").value,
    category: document.getElementById("newProductCategory").value,
    status: true,
  };

  if (validNewProduct(newProduct)) {
    await addNewProduct(newProduct);
  }
};

updateProductForm.onsubmit = async (e) => {
  e.preventDefault();
  let updateProductPrice = {
    price: document.getElementById("updateProductPrice").value,
  };
  if (updateProductPrice.price !== 0 && updateProductId.value !== 0) {
    await updateProduct(updateProductId.value, updateProductPrice);
  }
};

deleteForm.onsubmit = async (e) => {
  e.preventDefault();
  if (deleteProductId.value !== 0) {
    await deleteProduct(deleteProductId.value);
  }
};

async function addNewProduct(product) {
  try {
    const result = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    console.log(await result.json());

    if (result) {
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    console.log(err);
    error = err;
  }
}

async function updateProduct(idProduct, product) {
  try {
    const result = await fetch(
      `http://localhost:8080/api/products/${idProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (result) {
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    error = err;
  }
}

async function deleteProduct(idProduct) {
  try {
    const result = await fetch(
      `http://localhost:8080/api/products/${idProduct}`,
      {
        method: "DELETE",
      }
    );

    if (result) {
      socketClient.emit("getAllProducts");
    }
  } catch (err) {
    error = err;
  }
}

function compileProducts() {
  const productsTemplate = products
    .map(
      (product) => `<li>
      <p>ID: ${product.id}</p> 
      <p>Title: ${product.title}</p> 
      <p>Description: ${product.description}</p> 
      <p>Price: ${product.price}</p> 
      <p>Code: ${product.code}</p> 
      <p>Stock: ${product.stock}</p>
    </li>`
    )
    .join(" ");
  productsList.innerHTML = productsTemplate;
}

socketClient.on("updatedProducts", (_products) => {
  products = [..._products];
  compileProducts();
});
