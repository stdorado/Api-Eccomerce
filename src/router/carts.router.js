import express from "express";
import { getAllCartsMongoose,getCartByIdMongoose,createCartMongoose,addCartToMongoose,deleteCartMongoose, deleteAllPrductsFromCart } from "../controllers/cart.controller.js";

const router = express.Router();

//esta ruta la configure para poder ver si funcionaba
router.get("/", (req,res)=>{
    res.send("hola bienvenido a la ruta de cart")
} )
router.get("/cart", getAllCartsMongoose)
//ruta que permite obtener productos por id (http://localhost:8080/api/carts/{cid})
router.get("/:cid", getCartByIdMongoose);
// ruta para agregar un producto al carrito (http://localhost:8080/api/carts/{cid}/product/{pid})
router.post("/:cid/products/:pid", addCartToMongoose);
// ruta para crear el carrito (http://localhost:8080/api/carts/)
router.post("/", createCartMongoose);
//ruta para eliminar un carrito
router.delete("/:cid/products/:pid", deleteCartMongoose)
router.delete("/:cid", deleteAllPrductsFromCart);

export default router;