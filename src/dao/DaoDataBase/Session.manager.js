import UserManager from "./User.manager.js";


class sessionManager {
    async login(email, password) {
        try {
          
    const user = await UserManager.getUserByEmail(email);

    if (!user) {
      return null; 
    }

   
    const passwordMatch = await(password, user.password);

    if (!passwordMatch) {
      return null; 
    }
    
          return {
            email: user.email,
            first_Name: user.first_Name,
            last_Name: user.last_Name,
            role: user.role,
          };
        } catch (error) {
          throw error;
        }
      }
}
const SessionManager = new sessionManager()
export default SessionManager