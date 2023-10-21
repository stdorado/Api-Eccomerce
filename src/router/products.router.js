import express from "express";
import { getProductByIdController, getProductsController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controllersMongoose.js";
const router = express.Router();

router.get('/', getProductsController);
router.get('/:pid', getProductByIdController);
router.post('/', createProductController);
router.put('/:pid', updateProductController);
router.delete('/:pid', deleteProductController);

export default router;


