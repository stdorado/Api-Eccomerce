import { Router } from "express";
import { getProductsInCart, viewCart } from "../controllers/cart.controller.js";

const router = Router();

function requireAuthentication(req, res, next) {
    if (!req.session.email) {
        // Redirige al usuario a la página de inicio de sesión si no está autenticado
        return res.redirect("/login");
    }
    next();
}

function requireNoAuthentication(req, res, next) {
    if (req.session.email) {
        // Redirige al usuario a la página de productos si ya está autenticado
        return res.redirect("/home");
    }
    next();
}

// Rutas de acceso
router.get("/login", requireNoAuthentication, (req, res) => {
    res.render("login");
});

router.get("/", requireNoAuthentication, (req, res) => {
    res.render("login");
});

router.get("/home", requireAuthentication, (req, res) => {
    res.render("init");
});

// Rutas de productos, carrito, etc.
router.get("/cart", requireAuthentication, viewCart);

router.get("/products", requireAuthentication, (req, res) => {
    res.render("products");
});

router.get('/carts/:cid', getProductsInCart);

// Rutas de registro y perfil
router.get("/register", requireNoAuthentication, (req, res) => {
    res.render("register");
});

router.get("/profile", requireAuthentication, (req, res) => {
    res.render("profile");
});

export default router;