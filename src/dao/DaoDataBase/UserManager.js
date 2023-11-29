import User from "../model/User.js";

class userManager{
  async findAll() {
    try {
      return User.find();
    } catch (error) {
      throw error;
    }
  }
  async findOne(query) {
    try {
      return User.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      return User.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async createOne(data) {
    try {
      return User.create(data);
    } catch (error) {
      throw error;
    }
  }
  async updateOne(id, data) {
    try {
      return User.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }
  async deleteOne(id) {
    try {
      return User.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      return User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
}

const UserManager = new userManager()
export default UserManager