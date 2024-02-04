import { ProductsManager } from "../dao/DaoDataBase/Products.manager.js";
import { Cart } from "../dao/model/cart.js";
import {logger} from "../utils/logger.js"
import { Product } from "../dao/model/products.js";

const productManager = new ProductsManager();

class ProductService {
  async getAllProducts({ limit = 9, page = 1, query, sort }) {
    try {
      const validPage = Math.min(Math.max(parseInt(page), 1), 3);
      const options = {
        page: validPage,
        limit: parseInt(limit),
      };

      // Construir la opción de ordenamiento si se proporciona
      const sortOptions = {};
      if (sort) {
        sortOptions['price'] = sort === 'asc' ? 1 : -1;
      }

      const filter = query ? { category: query } : {};

      // Obtener los productos paginados utilizando el modelo Product
      const result = await Product.paginate(filter, options);

      const { docs, totalDocs, totalPages, page: currentPage } = result;

      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevPage = result.prevPage;
      const nextPage = result.nextPage;

      let prevLink = null;
      let nextLink = null;

      if (hasPrevPage) {
        prevLink = `/products?page=${prevPage}`;
      }

      if (hasNextPage) {
        nextLink = `/products?page=${nextPage}`;
      }

      const response = {
        status: 'success',
        payload: docs,
        prevPage: prevPage,
        nextPage: nextPage,
        prevLink: prevLink,
        nextLink: nextLink,
        page: currentPage,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        totalPages: totalPages,
      };

      return response;
    } catch (error) {
      logger.error(error)
      throw new Error('Error en el servidor');
    }
  }
  
    async getProductById(productId) {
      try {
        // Utilizando el método findById de ProductsManager
        return await productManager.findById(productId);
      } catch (error) {
        logger.error(error)
        throw new Error('Error al obtener el producto.');
      }
    }
  
    async createProduct(productData) {
      try {
        // Utilizando el método createOne de ProductsManager
        return await productManager.createOne(productData);
      } catch (error) {
        logger.error(error)
        throw new Error('Error al crear el producto.');
      }
    }
  
    async updateProduct(productId, productData) {
      try {
        // Utilizando el método updateOne de ProductsManager
        return await productManager.updateOne(productId, productData);
      } catch (error) {
        logger.error(error)
        throw new Error('Error al actualizar el producto.');
      }
    }
  
    async deleteProduct(productId) {
      try {
        // Utilizando el método deleteOne de ProductsManager
        return await productManager.deleteOne(productId);
      } catch (error) {
        logger.error(error)
        throw new Error('Error al eliminar el producto.');
      }
    }
  
    async getProductsInCart(cartId) {
      try {
        console.log("cart ID :", cartId)
        const cart = await Cart.findById(cartId).populate('products.productId');
        if (!cart) {
          throw new Error('Carrito no encontrado.');
        }
        return cart.products;
      } catch (error) {
        logger.error(error)
        throw new Error('Error al obtener los productos en el carrito.');
      }
    }
  }
  
  export default new ProductService();