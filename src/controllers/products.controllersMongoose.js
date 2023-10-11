import { ProductsManager } from "../dao/ProductsManager.js";

const productsManager = new ProductsManager();

export const getAllProductsFromMongoose = async (req, res) => {
  try {
    const productos = await productsManager.findAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos.' });
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
