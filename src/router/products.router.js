import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsControllers.js";

const router = express.Router();

// listado de los productos (http://localhost:8080/products/)
router.get("/", getProducts);

// filtrar producto por id (http://localhost:8080/products/{id})
router.get("/:pid", getProductById);

//crear producto (http://localhost:8080/products/)
router.post("/", createProduct);

//actualizar productos (http://localhost:8080/products/{id})
router.put("/:pid", updateProduct);

//esta ruta es la encargada de eliminar un producto (http://localhost:8080/products/{id})
router.delete("/:pid", deleteProduct);

export default router;