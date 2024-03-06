import { Router } from "express";
import {
  GetProductsInCart,
  ViewCart,
} from "../controllers/ControllersMemory/cart.controller.js";


const router = Router();

// Rutas de acceso
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/home", (req, res) => {
  res.render("init");
});

// Rutas de productos, carrito, etc.
router.get("/cart", ViewCart);

router.get("/products", (req, res) => {
  res.render("products");
});

router.get("/carts/:cid", GetProductsInCart);

router.get("/:cid/purchase", (req, res) => {
  res.render("purchase");
});

// Rutas de registro y perfil
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password-form");
});

router.get("/password-reset-sent", (req, res) => {
  res.render("password-resent-sent");
});

router.get("/uploadImage", (req, res) => {
  res.render("uploadImage");
});

router.get("/createProduct", (req, res) => {
  res.render("createProduct");
});

router.get("/AdminView", (req,res)=>{
  res.render("adminView")
})
export default router;
