import { getProductById, getProductsInCart,getProducts,createProduct,updateProduct,deleteProduct } from "../../Services/product.servicio.js";

export const GetProducts = async (req, res) => {
  try {
    const products = await getProducts(req.query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await getProductById(pid);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const CreateProduct = async (req, res) => {
  try {
    const nuevoProducto = await createProduct(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const productoActualizado = await updateProduct(pid, data);
    if (!productoActualizado) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(productoActualizado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productoEliminado = await deleteProduct(pid);
    if (!productoEliminado) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(productoEliminado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const GetProductsInCart = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const productsInCart = await getProductsInCart(cartId);
    res.json(productsInCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};