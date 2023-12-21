import { getProductById, getProductsInCart,getProducts,createProduct,updateProduct,deleteProduct } from "../../Services/product.servicio.js";

export const GetProducts = async (req, res) => {
  try {
    const products = await getProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await getProductById(pid);
    if (!product) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CreateProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const UpdateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const ProductUpdate = await updateProduct(pid, data);
    if (!ProductUpdate) {
      res.status(404).json({ error: 'Producto not found.' });
    } else {
      res.json(ProductUpdate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const ProductoDelete = await deleteProduct(pid);
    if (!ProductoDelete) {
      res.status(404).json({ error: 'Producto not found.' });
    } else {
      res.json(ProductoDelete);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProductsInCart = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const productsInCart = await getProductsInCart(cartId);
    res.json(productsInCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};