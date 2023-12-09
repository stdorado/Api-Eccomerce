import { Router } from 'express';
import { addProductToCart, deleteCart, updateCart, createCart, getCartById,purchaseCart,clearCart } from '../controllers/ControllersMemory/cart.controller.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
const router = Router();


router.post("/:cid/purchase", requireAuth, purchaseCart);

router.post('/:cid/clear', clearCart);

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