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
  res.render("home");
});
//ruta para actualizar los productos desde el cliente
router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});
//ruta para ver los productos del carrito
router.get('/carts/:cid', getProductsInCart);

export default router;