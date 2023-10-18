import { ProductsManager } from "../dao/ProductsManager.js";
import { Product } from "../dao/model/products.js";

const productsManager = new ProductsManager();

export const getAllProductsFromMongoose = async (req, res) => {
  try {
    const { limit = 9, page = 1, query, sort } = req.query;

    const options = {
      limit: parseInt(limit),
      skip: 0  
    };

    if (options.limit > 0) {
      options.skip = (page - 1) * options.limit;
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.precio = sort === "asc" ? 1 : -1;
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
      status: "success",
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

export const getProductByIdFromMongoose = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productsManager.findById(id);
    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(producto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
};

export const createProductFromMongoose = async (req, res) => {
  try {
    const nuevoProducto = await productsManager.createOne(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
};

export const updateProductFromMongoose = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const productoActualizado = await productsManager.updateOne(id, data);
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

export const deleteProductFromMongoose = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await productsManager.deleteOne(id);
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
