import express from "express";
import { getAllProductsFromMongoose,getProductByIdFromMongoose,createProductFromMongoose,updateProductFromMongoose,deleteProductFromMongoose } from "../controllers/products.controllersMongoose.js";
const router = express.Router();

// listado de los productos (http://localhost:8080/products/)
router.get("/", getAllProductsFromMongoose);

// filtrar producto por id (http://localhost:8080/products/{id})
router.get("/:pid", getProductByIdFromMongoose);

//crear producto (http://localhost:8080/products/)
router.post("/", createProductFromMongoose);

//actualizar productos (http://localhost:8080/products/{id})
router.put("/:pid", updateProductFromMongoose);

//esta ruta es la encargada de eliminar un producto (http://localhost:8080/products/{id})
router.delete("/:pid", deleteProductFromMongoose);



export default router;