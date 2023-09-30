import { productManager } from "../models/ProductManager.js";

async function getProducts(req, res, next) {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const newProduct = req.body;
    const result = await productManager.addProduct(newProduct);
    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const updatedProductInfo = req.body;
    const result = await productManager.updateProductById(pid, updatedProductInfo);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const result = await productManager.deleteProductById(pid);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };