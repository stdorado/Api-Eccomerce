import { ProductsManager } from "../dao/DaoDataBase/Products.manager.js";
import { Cart } from "../dao/model/cart.js";
import { logger } from "../utils/logger.js";
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

      const sortOptions = {};
      if (sort) {
        sortOptions["price"] = sort === "asc" ? 1 : -1;
      }

      const filter = query ? { category: query } : {};

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
        status: "success",
        payload: docs,
        prevPage: prevPage,
        nextPage: nextPage,
        prevLink: prevLink,
        nextLink: nextLink,
        page: currentPage,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        totalPages: totalPages,
        totalDocs: totalDocs,
      };

      return response;
    } catch (error) {
      logger.error(error);
      throw new Error("Error to Server");
    }
  }

  async getProductById(productId) {
    try {
      return await productManager.findById(productId);
    } catch (error) {
      logger.error(error);
      throw new Error("Error to get Product.");
    }
  }

  async createProduct(productData) {
    try {
      return await productManager.createOne(productData);
    } catch (error) {
      logger.error(error);
      throw new Error("Error to create Product.");
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await productManager.updateOne(productId, productData);
    } catch (error) {
      logger.error(error);
      throw new Error("Error to Update Product.");
    }
  }

  async deleteProduct(productId) {
    try {
      return await productManager.deleteOne(productId);
    } catch (error) {
      logger.error(error);
      throw new Error("Error to delete Product.");
    }
  }

  async getProductsInCart(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate("products.productId");
      if (!cart) {
        throw new Error("Cart not found.");
      }
      return cart.products;
    } catch (error) {
      logger.error(error);
      throw new Error("Error getting products from cart");
    }
  }
}

export default new ProductService();
