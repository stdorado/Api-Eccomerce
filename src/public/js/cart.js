function renderCart(cart) {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; 
  
    cart.products.forEach((product) => {
      const productView = generateProductView(product); 
      cartList.appendChild(productView); 
    });
  }
  
  function generateProductView(product) {

    const productHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <button>Eliminar del carrito</button>
      </div>
    `;
  
    const productView = document.createElement('div');
    productView.classList.add('product-view');
    productView.innerHTML = productHTML;
  
    return productView;
  }