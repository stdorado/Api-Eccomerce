import { Router } from "express";
import { getProductsInCart, viewCart } from "../controllers/cart.controller.js";

const router = Router();

//ruta que renderiza la entrada a la pagina
router.get("/", (req, res) => {
  res.render("init");
});
//ruta para ver los productos del carrito
router.get("/cart", viewCart);
//ruta que renderiza los productos en la pantalla 
router.get("/products", (req, res) => {
  res.render("products");
});

//ruta para ver los productos del carrito
router.get('/carts/:cid', getProductsInCart);

export default router;