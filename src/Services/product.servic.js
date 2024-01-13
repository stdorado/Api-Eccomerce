import { ProductsManager } from "../dao/DaoDataBase/ProductsManager.js";
import { Cart } from "../dao/model/cart.js";

const productManager = new ProductsManager();

class ProductService {
    async getAllProducts({ limit = 9, page = 1, query, sort }) {
      try {
        const validPage = Math.min(Math.max(parseInt(page), 1), 3);
        const options = {
          page: validPage,
          limit: parseInt(limit),
        };
  
        if (sort) {
          options.sort = { precio: sort === 'asc' ? 1 : -1 };
        }
  
        const filter = query ? { tipo: query } : {};
  
        
        const docs = await productManager.findAll(filter, options);
  
        
  
        const response = {
          status: 'success',
          payload: docs,
          
        };
  
        return response;
      } catch (error) {
        console.error(error);
        throw new Error('Error en el servidor');
      }
    }
  
    async getProductById(productId) {
      try {
        // Utilizando el método findById de ProductsManager
        return await productManager.findById(productId);
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el producto.');
      }
    }
  
    async createProduct(productData) {
      try {
        // Utilizando el método createOne de ProductsManager
        return await productManager.createOne(productData);
      } catch (error) {
        console.error(error);
        throw new Error('Error al crear el producto.');
      }
    }
  
    async updateProduct(productId, productData) {
      try {
        // Utilizando el método updateOne de ProductsManager
        return await productManager.updateOne(productId, productData);
      } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el producto.');
      }
    }
  
    async deleteProduct(productId) {
      try {
        // Utilizando el método deleteOne de ProductsManager
        return await productManager.deleteOne(productId);
      } catch (error) {
        console.error(error);
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
        console.error(error);
        throw new Error('Error al obtener los productos en el carrito.');
      }
    }
  }
  
  export default new ProductService();