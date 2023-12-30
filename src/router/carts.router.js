import { Router } from 'express';
import { AddProductToCart, DeleteCart, UpdateCart, CreateCart, GetCartById,PurchaseCart,ClearCart } from '../controllers/ControllersMemory/cart.controller.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { checkProductOwner } from '../middlewares/ownerMiddleware.js';
const router = Router();


router.post("/:cid/purchase", requireAuth, PurchaseCart);

router.post('/:cid/clear', ClearCart);

// Ruta para agregar un producto al carrito
router.post('/:cid/products/:pid', checkProductOwner, AddProductToCart);

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', DeleteCart);

// Ruta para obtener los productos en un carrito
router.get('/:cid/products', GetCartById);

router.put('/:cid', UpdateCart);

// Ruta para crear un nuevo carrito
router.post('/create', CreateCart);

export default router;