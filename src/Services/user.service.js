import Image from "../dao/model/image.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";

class ImageService {
  async upgradeToPremium(userId) {
    try {
      const user = await UserManager.findById(userId);
      if (!user) {
        return { success: false, error: "Usuario no encontrado" };
      }

      user.role = "Premium";
      await user.save();

      return {
        success: true,
        message: "Usuario actualizado a premium correctamente",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async uploadImage(filename, userEmail) {
    try {
      const image = new Image({ filename });
      await image.save();
      const user = await UserManager.findOne({ email: userEmail });
      if (!user) throw new Error("Usuario no encontrado");

      user.documents.push({ name: "profile", reference: image._id });
      await UserManager.updateOne(user._id, user);
      return image;
    } catch (error) {
      throw error;
    }
  }
}

const newImage = new ImageService();
export default newImage;
