import express from "express";
import { GetProducts,GetProductById,CreateProduct,UpdateProduct,DeleteProduct } from "../controllers/ControllersMemory/product.control.js";
import { authorizerUser } from "../middlewares/authMiddleware.js";
const router = express.Router();



/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Obtiene la lista de todos los productos.
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida con éxito
 */
router.get('/', GetProducts); //✅

/**
 * @swagger
 * /products/{pid}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Obtiene información detallada de un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Información detallada del producto obtenida con éxito
 */
router.get('/:pid', GetProductById);//✅

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto.
 *     responses:
 *       '200':
 *         description: Nuevo producto creado con éxito
 *       '500':
 *         description: Error en el middleware
 */
router.post('/', CreateProduct); //✅ Problemas con el middleware


/**
 * @swagger
 * /products/{pid}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza la información de un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto actualizado con éxito
 */
router.put('/:pid', UpdateProduct); //✅

/**
 * @swagger
 * /products/{pid}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado con éxito
 */
router.delete('/:pid', DeleteProduct); //✅


export default router;
