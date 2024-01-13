import SessionManager from "../dao/DaoDataBase/SessionManager.js";
import UserManager from "../dao/DaoDataBase/UserManager.js";
import { generateToken } from "../utils.js";

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

        delete result.password;

        const token = generateToken({ email: result.email });

        // Configuramos la sesión
        req.session.user = result;

        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        return { success: true, message: result };
      }

      const userExists = await UserManager.findOne({ email });

      if (!userExists) {
        return { success: false, message: 'Credenciales inválidas' };
      }

      result = await SessionManager.login(email, password);

      if (!result) {
        return { success: false, message: 'Credenciales inválidas' };
      }

      // Configuramos la sesión
      req.session.user = result;

      return {
        success: true,
        message: `Bienvenido ${result.first_Name} ${result.last_Name}`,
      };
    } catch (error) {
      console.error(`Error en el inicio de sesión: ${error.message}`);
      
      if (error.message === "secretOrPrivateKey must have a value") {
        return { success: false, error: "Error en el inicio de sesión: secretOrPrivateKey must have a value" };
      }

      return { success: false, error: error.message };
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

      // Configuramos la sesión
      req.session.user = result;

      return { success: true, message: "Registro exitoso" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProfile(req, res) {
    try {
      if (req.session.user) {
        const userData = {
          email: req.session.user.email,
          first_Name: req.session.user.first_Name,
          last_Name: req.session.user.last_Name,
          role: req.session.user.role,
        };
        return { success: true, data: userData };
      } else {
        try {
          const emailFromSession = req.session.user.email;
          console.log('Email from session:', emailFromSession);

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
            console.log('User not found in the database');
            return { success: false, error: "User not found in the database" };
          }
        } catch (error) {
          console.error('Error in database lookup:', error);
          return { success: false, error: error.message };
        }
      }
    } catch (error) {
      console.error('Error in getProfile:', error);
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