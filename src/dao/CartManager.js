import { Cart } from "./model/cart.js";

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
  }
  
  export default CartManager;