import UserManager from "../dao/DaoDataBase/User.manager.js"


class UserService {
    async updateUserRole(userId, newRole) {
      try {
        return await UserManager.updateOne(userId, { role: newRole });
      } catch (error) {
        throw error;
      }
    }
  
    async updateUserPremium(userId) {
      try {
        const user = await UserManager.findById(userId);
        const requiredDocuments = ['identificacion', 'domicilio', 'comprobante de esta de cuenta'];
        const missingDocuments = requiredDocuments.filter(doc => !user.documents.some(d => d.name === doc));
        if (missingDocuments.length > 0) {
          throw new Error("El usuario no ha cargado todos los documentos requeridos.");
        }
        await this.updateUserRole(userId, 'premium');
      } catch (error) {
        throw error;
      }
    }
  }
  
  const userService = new UserService();
  export default userService;