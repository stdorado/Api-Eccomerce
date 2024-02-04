import SessionManager from "../dao/DaoDataBase/Session.manager.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { generateToken } from "../utils.js";
import { SendToEmail } from "./nodemailer.service.js";
import { logger } from "../utils/logger.js";

class SesionService {
  async login(email, password, req, res) {
    try {
      let result;
  
      // Verificamos si es el usuario admin
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        result = {
          email: "adminCoder@coder.com",
          age: 20,
          role: "admin"
        };
  
        // Eliminamos la propiedad 'password' del resultado
        delete result.password;
  
        // Configuramos la sesión con información del usuario
        req.session.user = {
          email: result.email,
          role: result.role,
        };
  
        // Configuramos la cookie JWT
        const token = generateToken({ email: result.email });
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
  
        // Mensaje de bienvenida
        logger.info('Usuario autenticado:', { success: true, message: `Bienvenido ${result.email}` });
        logger.info('Usuario en la sesión:', req.session.user);
  
        return { success: true, message: `Bienvenido ${result.email}` };
      }
  
      // Resto del código para usuarios normales...
      const userExists = await UserManager.findOne({ email });
  
      if (!userExists) {
        console.error('Credenciales inválidas: Usuario no encontrado en la base de datos');
        return { success: false, message: 'Credenciales inválidas: Usuario no encontrado en la base de datos' };
      }
  
      result = await SessionManager.login(email, password);
  
      if (!result) {
        logger.error('Credenciales inválidas: Error en el inicio de sesión');
        return { success: false, message: 'Credenciales inválidas: Error en el inicio de sesión' };
      }
  
      // Configuramos la sesión
      req.session.user = result;
  
      logger.info('Usuario autenticado:', { success: true, message: `Bienvenido ${result.first_Name} ${result.last_Name}` });
      logger.info('Usuario en la sesión:', req.session.user);
  
      return {
        success: true,
        message: `Bienvenido ${result.first_Name} ${result.last_Name}`,
      };
    } catch (error) {
      logger.error('Error en el inicio de sesión:', error);
  
      if (error.message === "secretOrPrivateKey must have a value") {
        return { success: false, error: "Error en el inicio de sesión: secretOrPrivateKey must have a value" };
      }
  
      return { success: false, error: "Error en el inicio de sesión." };
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
      return { success: true, message: "Registro exitoso" };
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
              // Puedes agregar otros campos según sea necesario
            };
            return { success: true, data: userData };
          } else {
            logger.info('Usuario no encontrado en la base de datos');
            return { success: false, error: "Usuario no encontrado en la base de datos" };
          }
        } catch (error) {
          logger.error('Error en la búsqueda en la base de datos:', error);
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
            return { success: false, error: "Error en el deslogeo" };
          }
          return { success: true, message: "Cuenta desLogeada Exitosamente" };
        });
      } else {
        return { success: false, error: "Request no definido" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

}

export default new SesionService()