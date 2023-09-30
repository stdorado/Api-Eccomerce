import express from "express";
import * as CartController from "../controllers/cartControlers.js"

const router = express.Router();

//esta ruta la configure para poder ver si funcionaba
router.get("/", (req,res)=>{
    res.send("hola bienvenido a la ruta de cart")
} )
// ruta para crear el carrito (http://localhost:8080/api/carts/)
router.post("/", CartController.createCart);

//ruta que permite obtener productos por id (http://localhost:8080/api/carts/{cid})
router.get("/:cid", CartController.getCartById);

// ruta para agregar un producto al carrito (http://localhost:8080/api/carts/{cid}/product/{pid})
router.post("/:cid/product/:pid", CartController.addProductToCart);

export default router;