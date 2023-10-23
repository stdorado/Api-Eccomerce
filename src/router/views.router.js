import { Router } from "express";
import { getProductsInCart, viewCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("init");
});

router.get("/cart", viewCart);

router.get("/products", (req, res) => {
  res.render("home");
});

router.get("/realtimeProducts", (req, res) => {
  res.render("realtimeProducts");
});

router.get('/carts/:cid', getProductsInCart);

export default router;