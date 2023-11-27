import UserManager from "./UserManager.js";

class sessionManager {
    async login(email, password) {
        try {
          // Obtener un usuario por correo electrónico
          const user = await UserManager.getUserByEmail(email);
    
          if (!user) {
            throw new Error("Usuario no existe");
          }
          // Verificar la contraseña
          if (user.password !== password) {
            throw new Error("Contraseña incorrecta");
          }
    
          return user;
        } catch (error) {
          throw error;
        }
      }
}
const SessionManager = new sessionManager()
export default SessionManager