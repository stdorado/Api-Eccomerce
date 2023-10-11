import express from "express";
import { getAllCartsMongoose,getCartByIdMongoose,createCartMongoose,updateCartMongoose,deleteCartMongoose } from "../controllers/cart.controller.js";

const router = express.Router();

//esta ruta la configure para poder ver si funcionaba
router.get("/", (req,res)=>{
    res.send("hola bienvenido a la ruta de cart")
} )
// ruta para crear el carrito (http://localhost:8080/api/carts/)
router.post("/", createCartMongoose);

//ruta que permite obtener productos por id (http://localhost:8080/api/carts/{cid})
router.get("/:cid", getCartByIdMongoose);

// ruta para agregar un producto al carrito (http://localhost:8080/api/carts/{cid}/product/{pid})
router.post("/:cid/product/:pid", updateCartMongoose);

router.get("/cart", getAllCartsMongoose)

export default router;