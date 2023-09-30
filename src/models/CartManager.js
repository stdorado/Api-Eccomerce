import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart(newCart) {
    try {
      const carts = await this.getCarts();

      newCart.id = carts.length ? carts[carts.length - 1].id + 1 : 1;

      carts.push(newCart);

      await this.writeCarts(carts);

      return "Carrito añadido";
    } catch (error) {
      throw new Error("No se pudo agregar el carrito");
    }
  }

  async getCartsFromFile() {
    try {
      if (!fs.existsSync(this.path)) {
        const carts = [];

        fs.writeFileSync(this.path, JSON.stringify(carts));

        return carts;
      }

      const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCarts(limit) {
    try {
      const carts = await this.getCartsFromFile();

      return carts.slice(0, limit);
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();

      const foundCart = carts.find((cart) => cart.id === +id);

      if (foundCart) {
        return foundCart;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async addProductToCartById(idCart, idProduct) {
    try {
      const carts = await this.getCarts();

      let cart = { ...(await this.getCartById(idCart)) };

      const foundProductIndex = cart.products.findIndex(
        (product) => product.product === +idProduct
      );

      if (foundProductIndex === -1) {
        cart.products.push({
          product: +idProduct,
          quantity: 1,
        });
      } else {
        cart.products[foundProductIndex].quantity += 1;
      }

      const foundCartIndex = carts.findIndex((cart) => cart.id === +idCart);

      carts[foundCartIndex] = cart;

      await this.writeCarts(carts);

      return "Producto añadido al carrito";
    } catch (error) {
      throw error;
    }
  }

  readFile() {
    try {
      if (!fs.existsSync(this.path)) {
        return null;
      }

      return fs.readFileSync(this.path, "utf-8");
    } catch (error) {
      throw error;
    }
  }

  writeCarts(carts) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(carts));
    } catch (error) {
      throw new Error("Error al escribir los carritos en el archivo");
    }
  }
}

export default new CartManager("carts.json");