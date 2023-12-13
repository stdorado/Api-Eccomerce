import { ProductsManager } from "../dao/DaoDataBase/ProductsManager.js";
import { Product } from "../dao/model/products.js";
import { Cart } from "../dao/model/cart.js";

const productManager = new ProductsManager();

export const getProducts = async ({ limit = 9, page = 1, query, sort }) => {
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
    console.error(error);
    throw new Error('Error en el servidor');
  }
};

export const getProductById = async (productId) => {
  try {
    return await productManager.findById(productId);
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el producto.');
  }
};

export const createProduct = async (productData) => {
  try {
    return await productManager.createOne(productData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el producto.');
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    return await productManager.updateOne(productId, productData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el producto.');
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await productManager.deleteOne(productId);
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el producto.');
  }
};

export const getProductsInCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products.productId');
    if (!cart) {
      throw new Error('Carrito no encontrado.');
    }
    return cart.products;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los productos en el carrito.');
  }
};