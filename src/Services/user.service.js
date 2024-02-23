import Image from "../dao/model/image.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { SendToEmail } from "./nodemailer.service.js";

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

  async AllUserToDB() {
    try {
      const users = await UserManager.findAll(); 
      return users;
    } catch (error) {
      throw error;
    }
  }

  async deleteInactiveUsers() {
    try {
      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
  
      // Busca todos los usuarios
      const allUsers = await UserManager.findAll();
  
      // Verifica si allUsers es un array antes de continuar
      if (!Array.isArray(allUsers)) {
        throw new Error('No se han encontrado usuarios');
      }
  
      // Filtra los usuarios inactivos
      const inactiveUsers = allUsers.filter(user => user.last_connection < thirtyMinutesAgo);
  
      // Verifica si no hay usuarios inactivos
      if (inactiveUsers.length === 0) {
        throw new Error('No se encontraron usuarios inactivos');
      }
  
      // Elimina cada usuario inactivo y envía el correo electrónico
      for (const user of inactiveUsers) {
        await UserManager.deleteOne(user._id);
  
        
        const emailMessage = `Hola ${user.first_Name}, tu cuenta ha sido eliminada debido a inactividad.`;
        SendToEmail(user.email, "Cuenta eliminada", emailMessage, (error, info) => {
          if (error) {
            console.error('Error al enviar correo electrónico:', error);
          } else {
            console.log('Correo electrónico enviado:', info);
          }
        });
      }
  
      return { success: true, message: "Usuarios inactivos eliminados correctamente" };
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(userId) {
    try {
      const deletedUser = await UserManager.deleteOne(userId);
      if (!deletedUser) {
        throw new Error("Usuario no encontrado");
      }
      return { success: true, message: "Usuario eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  }
}

const newImage = new ImageService();
export default newImage;
