import SessionManager from "../dao/DaoDataBase/Session.manager.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { generateToken } from "../utils.js";
import { logger } from "../utils/logger.js";

class SesionService {
  async login(email, password, req, res) {
    try {
      let result;

      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        result = {
          email: "adminCoder@coder.com",
          age: 20,
          role: "admin"
        };
  
        
        delete result.password;
  
       
        req.session.user = {
          email: result.email,
          role: result.role,
          first_Name : result.first_Name,
          last_Name : result.last_Name,
          last_connection : result.last_connection
        };
  console.log(req.session.user)

        const token = generateToken({ email: result.email });
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
  
       
        logger.info('User autenticated:', { success: true, message: `Welcome ${result.email}` });
        logger.info('User in session:', req.session.user);
  
        return { success: true, message: `welcome ${result.email}` };
      }
  

      const userExists = await UserManager.findOne({ email });
  
      if (!userExists) {
        return { success: false, message: 'Invalid credentials : user not found in DataBase' };
      }
  
      result = await SessionManager.login(email, password);
  
      if (!result) {
        return { success: false, message: 'Invalid Credentials : error to login' };
      }
   
    
      req.session.user = result;
      return {
        success: true,
        message: `Welcome ${result.first_Name} ${result.last_Name}`,
      };
     
    } catch (error) {
  
      if (error.message === "secretOrPrivateKey must have a value") {
        return { success: false, error: "Error to Login: secretOrPrivateKey must have a value" };
      }
  
      return { success: false, error: "Error to Login " };
    }
  }

  async register(email, first_Name, last_Name, password) {
    try {
      const result = await UserManager.createOne({
        email,
        password,
        first_Name,
        last_Name,
      });
      return { success: true, message: "Regiser successfully" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProfile(req, res) {
    try {
      if (req.session.email) {
        const userData = {
          email: req.session.email,

        };
        return { success: true, data: userData };
      } else {
        
        try {
          const emailFromSession = req.session.email;
          logger.info('Email from session:', emailFromSession);
  
          const user = await UserManager.findOne({ email: emailFromSession });
  
          if (user) {
            const userData = {
              email: user.email,
              first_Name: user.first_Name,
              last_Name: user.last_Name,
              role: user.role,
            };
            return { success: true, data: userData };
          } else {
            return { success: false, error: "User not found in data base" };
          }
        } catch (error) {
          logger.error('Error to search in data base', error);
          return { success: false, error: error.message };
        }
      }
    } catch (error) {
      logger.error('Error en getProfile:', error);
      return { success: false, error: error.message };
    }
  }

  async logout(req, res) {
    try {
      if (req) {
        req.session.destroy((err) => {
          if (err) {
            return { success: false, error: "Error in out Session" };
          }
          return { success: true, message: "User out session successfully" };
        });
      } else {
        return { success: false, error: "Request not defined" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

}

export default new SesionService()