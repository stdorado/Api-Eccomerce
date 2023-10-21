import { ProductsManager } from "../dao/ProductsManager.js";
import { Cart } from "../dao/model/cart.js";
import { Product } from "../dao/model/products.js";

const productManager = new ProductsManager();

export const getProductsController = async (req, res) => {
  try {
    const { limit = 9, page = 1, query, sort } = req.query;

    const options = {
      limit: parseInt(limit),
      skip: 0,
    };

    if (options.limit > 0) {
      options.skip = (page - 1) * options.limit;
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.precio = sort === 'asc' ? 1 : -1;
    }

    const filter = query ? { tipo: query } : {};
    const productos = await Product.find(filter)
      .sort(sortOptions)
      .skip(options.skip)
      .limit(options.limit);

    const totalItems = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevLink = hasPrevPage ? `/products?page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}` : null;

    const response = {
      status: 'success',
      payload: productos,
      prevPage: prevPage,
      nextPage: nextPage,
      prevLink: prevLink,
      nextLink: nextLink,
      page: page,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      totalPages: totalPages,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Error en el servidor' });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params;
    const producto = await productManager.findById(pid);

    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json({ product: producto });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
};

export const createProductController = async (req, res) => {
  try {
    const nuevoProducto = await productManager.createOne(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const productoActualizado = await productManager.updateOne(pid, data);
    if (!productoActualizado) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(productoActualizado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const productoEliminado = await productManager.deleteOne(pid);
    if (!productoEliminado) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(productoEliminado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};

export const getProductsInCartController = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId).populate('products');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado.' });
    }
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos en el carrito.' });
  }
};