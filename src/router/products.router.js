import express from "express";
import { getProductByIdController, getProductsController, createProductController, updateProductController, deleteProductController } from "../controllers/ControllersMemory/products.controllersMongoose.js";
const router = express.Router();

//ruta para traer los productos
router.get('/', getProductsController);
//ruta para traer los productos por id
router.get('/:pid', getProductByIdController);
//ruta para crear el producto
router.post('/', createProductController);
//ruta para actualizar el producto
router.put('/:pid', updateProductController);
//ruta para eliminar el producto
router.delete('/:pid', deleteProductController);

export default router;


