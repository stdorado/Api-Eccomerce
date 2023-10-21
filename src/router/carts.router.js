import { Router } from 'express';
import { addProductToCartController, deleteProductFromCartController, clearCartController } from '../controllers/cart.controller.js';

const router = Router();

// Ruta para agregar un producto al carrito
router.post('/:cid/products/:pid', addProductToCartController);

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', deleteProductFromCartController);

// Ruta para limpiar el carrito
router.delete('/:cid', clearCartController);

export default router;