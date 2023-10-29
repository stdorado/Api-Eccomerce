import User from "./model/User.js";

class userManager{
    // Método para obtener todos los usuarios
  async findAll() {
    try {
      return User.find();
    } catch (error) {
      throw error;
    }
  }

  // Método para filtrar un usuario por ID
  async findById(id) {
    try {
      return User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Método para crear un nuevo usuario
  async createOne(data) {
    try {
      return User.create(data);
    } catch (error) {
      throw error;
    }
  }

  // Método para actualizar un usuario por ID
  async updateOne(id, data) {
    try {
      return User.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un usuario por ID
  async deleteOne(id) {
    try {
      return User.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

const UserManager = new userManager()
export default UserManager