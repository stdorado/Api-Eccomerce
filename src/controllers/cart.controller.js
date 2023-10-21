import CartManager from "../dao/CartManager.js";

const cartManager = new CartManager();

// Función para agregar un producto al carrito.
export const addProductToCartController = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    // Agregar el producto al carrito utilizando el CartManager.
    const result = await cartManager.addProductToCart(cartId, productId, req.body.quantity);

    // Responder con un mensaje de éxito.
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).send("Error al agregar el producto al carrito.");
  }
};

// Función para eliminar un producto del carrito.
export const deleteProductFromCartController = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    // Eliminar el producto del carrito utilizando el CartManager.
    const result = await cartManager.deleteProductFromCart(cartId, productId);

    // Responder con un mensaje de éxito.
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).send("Error al eliminar el producto del carrito.");
  }
};

// Función para limpiar el carrito.
export const clearCartController = async (req, res) => {
  const cartId = req.params.cid;

  try {
    // Limpiar el carrito utilizando el CartManager.
    const result = await cartManager.deleteProductsFromCart(cartId);

    // Responder con un mensaje de éxito.
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
    res.status(500).send("Error al limpiar el carrito.");
  }
};
export const getProductsInCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products');
    if (!cart) {
      return [];
    }
    return cart.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};