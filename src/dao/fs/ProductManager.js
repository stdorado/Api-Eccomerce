import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "ProductsApi.json";
  }

  async addProduct(newProduct) {
    try {
      const products = await this.getProducts();

      const repeatedCode = products.find(
        (product) => product.code === newProduct.code
      );

      if (repeatedCode) {
        throw new Error("Invalid product due to repeated code");
      }

      newProduct.id = products.length
        ? products[products.length - 1].id + 1
        : 1;

      products.push(newProduct);

      await this.saveProducts(products);

      return "Product added";
    } catch (error) {
      throw error;
    }
  }

  async getProductsFromFile() {
    try {
      if (!fs.existsSync(this.path)) {
        const products = [];
        await this.saveProducts(products); // Crear el archivo si no existe
        return products;
      }

      const products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(limit) {
    try {
      const products = await this.getProductsFromFile();
      return limit ? products.slice(0, limit) : products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const foundProduct = products.find((product) => product.id === +id);

      if (foundProduct) {
        return foundProduct;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(id, newProductInfo) {
    try {
      if (
        newProductInfo.id ||
        newProductInfo.code ||
        newProductInfo.thumbnails
      ) {
        throw new Error("Cannot change product id, code, or thumbnails");
      }

      const products = await this.getProducts();
      const foundIndex = products.findIndex((product) => product.id === +id);

      if (foundIndex === -1) {
        throw new Error("Product not found");
      }

      const product = products[foundIndex];
      products[foundIndex] = { ...product, ...newProductInfo };

      await this.saveProducts(products);

      return "Product updated";
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProducts();
      const foundIndex = products.findIndex((product) => product.id === +id);

      if (foundIndex === -1) {
        throw new Error("Product not found");
      }

      products.splice(foundIndex, 1);
      await this.saveProducts(products);

      return "Product deleted";
    } catch (error) {
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      throw error;
    }
  }
}

export const productManager = new ProductManager();