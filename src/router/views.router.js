import { Router } from "express";
import { getProductsInCart, viewCart } from "../controllers/ControllersMemory/cart.controller.js";
const router = Router();


// Rutas de acceso

router.get("/",  (req, res) => {
    res.render("init");
});

router.get("/login",  (req, res) => {
    res.render("login");
});

// Rutas de productos, carrito, etc.
router.get("/cart",  viewCart);

router.get("/products",  (req, res) => {
    res.render("products");
});

router.get('/carts/:cid', getProductsInCart);

// Rutas de registro y perfil
router.get("/register",  (req, res) => {
    res.render("register");
});

router.get("/profile",  (req, res) => {
    res.render("profile");
});
export default router;