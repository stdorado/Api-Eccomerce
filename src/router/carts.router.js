import { Router } from 'express';
import { addProductToCart, deleteCart, updateCart, createCart, getCartById } from '../controllers/cart.controller.js';

const router = Router();

// Ruta para agregar un producto al carrito
router.post('/:cid/products/:pid', addProductToCart);

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', deleteCart);

// Ruta para obtener los productos en un carrito
router.get('/:cid/products', getCartById);

router.put('/:cid', updateCart);

// Ruta para crear un nuevo carrito
router.post('/create', createCart);

export default router;