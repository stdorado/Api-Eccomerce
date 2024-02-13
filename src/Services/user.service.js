import Image from "../dao/model/image.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";

class ImageService {

  async upgradeToPremium(userEmail) {
    try {
      const user = await UserManager.findOne({ email: userEmail });
      if (!user) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      user.role = 'premium';
      await user.save();

      return { success: true, message: 'Usuario actualizado a premium correctamente' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  
    async uploadImage(filename, userEmail) {
      try {
        // Guardar la imagen en la base de datos
        const image = new Image({ filename });
        await image.save();
  
        // Buscar al usuario por su correo electrónico
        const user = await UserManager.findOne({ email: userEmail });
        if (!user) throw new Error('Usuario no encontrado');
  
        // Asociar la imagen con el usuario y guardar los cambios
        user.documents.push({ name: 'profile', reference: image._id });
        await UserManager.updateOne(user._id, user);
  
        return image;
      } catch (error) {
        throw error;
      }
    }
  }

const newImage = new ImageService()
export default newImage