import { Cart } from "../model/cart.js";

class CartManager {
  async findAll() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      const cart = await Cart.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async createOne(data) {
    try {
      const nuevoCart = await Cart.create(data);
      return nuevoCart;
    } catch (error) {
      throw error;
    }
  }
  async updateOne(id, data) {
    try {
      const cartActualizado = await Cart.findByIdAndUpdate(id, data, { new: true });
      return cartActualizado;
    } catch (error) {
      throw error;
    }
  }
  async deleteOne(id) {
    try {
      const cartEliminado = await Cart.findByIdAndDelete(id);
      return cartEliminado;
    } catch (error) {
      throw error;
    }
  }
  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado.");
      }
      console.log('Valor de productId:', productId); // Agrega esta línea
      const existingProduct = cart.products.find(p => p.product === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();

      return "Producto agregado al carrito con éxito.";
    } catch (error) {
      throw error;
    }
  }
  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado.");
      }

      
      cart.products = cart.products.filter(p => p.productId !== productId);

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return "Producto eliminado del carrito con éxito.";
    } catch (error) {
      throw error;
    }
  }
  async getProductsInCart(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products');
      if (!cart) {
        return [];
      }
      return cart.products;
    } catch (error) {
      throw error;
    }
  }
  async clearCart(cartId) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
}
export default CartManager;