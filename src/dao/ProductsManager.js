import { Product } from "./model/products.js";

export class ProductsManager {
    //metodo para filtrar
    async findAll() {
      try {
        return Product.find();
      } catch (error) {
        throw error;
      }
    }
  //metodo para filtrar por id
    async findById(id) {
      try {
        return Product.findById(id);
      } catch (error) {
        throw error;
      }
    }
  //metodo para crear en mongoose
    async createOne(data) {
      try {
        return Product.create(data);
      } catch (error) {
        throw error;
      }
    }
  //metodo para actualizar
    async updateOne(id, data) {
      try {
        return Product.findByIdAndUpdate(id, data, { new: true });
      } catch (error) {
        throw error;
      }
    }
  //metodo para eliminar 
    async deleteOne(id) {
      try {
        return Product.findByIdAndDelete(id);
      } catch (error) {
        throw error;
      }
    }
  }