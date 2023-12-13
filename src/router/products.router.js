import express from "express";
import { GetProductById, GetProducts, UpdateProduct, DeleteProduct,CreateProduct } from "../controllers/ControllersMemory/products.controllersMongoose.js";
import { authorizerUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

//ruta para traer los productos
router.get('/', GetProducts);
//ruta para traer los productos por id
router.get('/:pid', GetProductById);
//ruta para crear el producto
router.post('/', authorizerUser, CreateProduct);
//ruta para actualizar el producto
router.put('/:pid', UpdateProduct);
//ruta para eliminar el producto
router.delete('/:pid', DeleteProduct);


export default router;


