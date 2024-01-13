import { Router } from "express";
import { GetProductsInCart, ViewCart } from "../controllers/ControllersMemory/cart.controller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();


// Rutas de acceso
router.get("/",  (req, res) => {
    res.render("login");
});

router.get("/home",   (req, res) => {
    res.render("init");
});

// Rutas de productos, carrito, etc.
router.get("/cart", requireAuth,  ViewCart);

router.get("/products",  (req, res) => {
    res.render("products");
});

router.get('/carts/:cid', requireAuth, GetProductsInCart);

router.get("/:cid/purchase", requireAuth, (req,res)=>{
    res.render("purchase")
})

// Rutas de registro y perfil
router.get("/register",  (req, res) => {
    res.render("register");
});


router.get("/profile",   (req, res) => {
    res.render("profile");
});


router.get("/recovering/:token", (req,res)=>{
    res.render("recoveringPassword")
})

router.get("/reset-password/:token",(req,res)=>{
    res.render("resetPasswor")
})
export default router;