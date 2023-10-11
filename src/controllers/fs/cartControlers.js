import CartManager from "../dao/CartManager.js";

export async function createCart(req, res, next) {
  try {
    const result = await CartManager.addCart(req.body);
    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

export async function getCartById(req, res, next) {
  try {
    const cartId = Number(req.params.cid);
    const cart = await CartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no fue encontrado" });
    }

    res.json(cart.products);
  } catch (error) {
    next(error);
  }
}

export async function addProductToCart(req, res, next) {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const result = await CartManager.addProductToCartById(cartId, productId);
    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}