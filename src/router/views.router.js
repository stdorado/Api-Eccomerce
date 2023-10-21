import { Router } from "express";
import { getProductsInCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("init");
});

router.get("/cart", async (req, res) => {
  try {
    const cartId = '6526a937fb59b510c46939f8';
    const productsInCart = await getProductsInCart(cartId);
    res.render("cart", { productsInCart });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: 'Error al obtener los productos en el carrito.' });
  }
});

router.get("/products", (req, res) => {
  res.render("home");
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

router.get('/carts/:cid', getProductsInCart);

export default router;