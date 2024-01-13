import { Router } from 'express';
import { GetCartById,CreateCart,AddProductToCart,UpdateCart,DeleteProductFromCart,ViewCart,ClearCart,GetProductsInCart,PurchaseCart } from '../controllers/ControllersMemory/cart.controller.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { checkProductOwner } from '../middlewares/ownerMiddleware.js';
const router = Router();





/**
 * @swagger
 * /carts/{cid}/purchase:
 *   post:
 *     summary: Realiza una compra
 *     description: Realiza una compra utilizando el carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Compra realizada con éxito
 *     security:
 *       - bearerAuth: []
 */
router.post("/:cid/purchase", requireAuth, PurchaseCart); //✅ , tiene un error que envia 2 correos

// Ruta para limpiar el carrito
/**
 * @swagger
 * /carts/{cid}/clear:
 *   post:
 *     summary: Limpiar el carrito
 *     description: Elimina todos los productos del carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Carrito limpiado con éxito
 */

router.post('/:cid/clear', ClearCart); //✅


// Ruta para agregar un producto al carrito
/**
 * @swagger
 * /carts/{cid}/products/{pid}:
 *   post:
 *     summary: Agrega un producto al carrito
 *     description: Añade un producto específico al carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto añadido al carrito con éxito
 */
router.post('/:cid/products/:pid', AddProductToCart); //✅

// Ruta para eliminar un producto del carrito
/**
 * @swagger
 * /carts/{cid}/products/{pid}:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     description: Elimina un producto específico del carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado del carrito con éxito
 */
router.delete('/:cid/products/:pid',    DeleteProductFromCart); //✅

// Ruta para obtener los productos en un carrito
/**
 * @swagger
 * /carts/{cid}/products:
 *   get:
 *     summary: Obtener productos en el carrito
 *     description: Obtiene la lista de productos en el carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de productos en el carrito
 */
router.get('/:cid/products', GetCartById); // ✅

// Ruta para actualizar un carrito
/**
 * @swagger
 * /carts/{cid}:
 *   put:
 *     summary: Actualizar un carrito
 *     description: Actualiza la información del carrito identificado por {cid}.
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Carrito actualizado con éxito
 */
router.put('/:cid', UpdateCart);//✅


// Ruta para crear un nuevo carrito
/**
 * @swagger
 * /carts/create:
 *   post:
 *     summary: Crear un nuevo carrito
 *     description: Crea un nuevo carrito.
 *     responses:
 *       '200':
 *         description: Nuevo carrito creado con éxito
 */
router.post('/create', CreateCart); //✅

export default router;