import { Product } from "../model/products.js";

export class ProductsManager {
    async findAll() {
      try {
        return Product.find();
      } catch (error) {
        throw error;
      }
    }
    async findById(id) {
      try {
        return Product.findById(id);
      } catch (error) {
        throw error;
      }
    }
    async createOne(data) {
      try {
        return Product.create(data);
      } catch (error) {
        throw error;
      }
    }
    async updateOne(id, data) {
      try {
        return Product.findByIdAndUpdate(id, data, { new: true });
      } catch (error) {
        throw error;
      }
    }
    async deleteOne(id) {
      try {
        return Product.findByIdAndDelete(id);
      } catch (error) {
        throw error;
      }
    }
  }