import productServic from "../../Services/product.service.js";

export const GetProducts = async (req, res) => {
  try {
    const products = await productServic.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productServic.getProductById(pid);
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
    const newProduct = await productServic.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const ProductUpdate = await productServic.updateProduct(pid, data);
    if (!ProductUpdate) {
      res.status(404).json({ error: 'Product not found.' });
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
    const ProductDelete = await productServic.deleteProduct(pid);
    if (!ProductDelete) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.json(ProductDelete);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProductsInCart = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const productsInCart = await productServic.getProductsInCart(cartId);
    res.json(productsInCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};