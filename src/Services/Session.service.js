import SessionManager from "../dao/DaoDataBase/Session.manager.js";
import UserManager from "../dao/DaoDataBase/User.manager.js";
import { generateToken } from "../utils.js";
import { logger } from "../utils/logger.js";

class SesionService {
  async login(email, password, req, res) {
    try {
      let result;

      // Verificar si las credenciales son para el usuario admin
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        // Establecer la información del usuario admin en la sesión
        result = {
          email: "adminCoder@coder.com",
          role: "admin",
          last_connection: new Date(),
        };
        req.session.user = {
          email: result.email,
          role: result.role,
          last_connection: result.last_connection,
          first_Name: result.first_Name,
          last_Name: result.last_Name,
          _id: result._id,
        };

        // Generar token JWT y establecerlo en la cookie
        const token = generateToken({ email: result.email });
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        logger.info("User authenticated:", {
          success: true,
          message: `Welcome ${result.email}`,
        });
        logger.info("User in session:", req.session.user);

        return { success: true, message: `Welcome ${result.email}` };
      }

      // Buscar el usuario en la base de datos
      const user = await UserManager.findOne({ email });

      if (!user) {
        return { success: false, message: "Usuario no encontrado" };
      }

      // Verificar si la contraseña es correcta
      const passwordMatch = await SessionManager.login(email, password);
      if (!passwordMatch) {
        return { success: false, message: "Contraseña incorrecta" };
      }

      // Actualizar la última conexión del usuario
      user.last_connection = new Date();
      await user.save();

      // Establecer los datos del usuario en la sesión
      req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        last_connection: user.last_connection,
      };

      return {
        success: true,
        message: `¡Bienvenido, ${user.first_Name} ${user.last_Name}!`,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async register(email, first_Name, last_Name, password) {
    try {
      const existingUser = await UserManager.findOne({ email });
      if (existingUser) {
        return { success: false, error: "El usuario ya existe" };
      }

      // Crear un nuevo usuario
      const newUser = await UserManager.createOne({
        email,
        first_Name,
        last_Name,
        password,
      });

      return { success: true, message: "Registro exitoso" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProfile(req, res) {
    try {
      let userData;

      // Verificar si el usuario está autenticado de manera tradicional
      if (req.session.user) {
        userData = {
          userId: req.session.user._id,
          email: req.session.user.email,
          first_Name: req.session.user.first_Name,
          last_Name: req.session.user.last_Name,
          role: req.session.user.role,
          last_connection: req.session.user.last_connection,
        };
      }
      // Si el usuario está autenticado con Google
      else if (req.user && req.user.authMethod === "Google") {
        userData = {
          userId: req.user._id,
          email: req.user.email,
          first_Name: req.user.first_Name,
          last_Name: req.user.last_Name,
          role: req.user.role,
          last_connection: req.user.last_connection,
          authMethod: req.user.authMethod, // Asegúrate de incluir el authMethod
        };
      }
      // Si el usuario no está autenticado
      else {
        return res
          .status(404)
          .json({ success: false, error: "Usuario no autenticado" });
      }

      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      console.error("Error en getProfile:", error);
      res.status(500).json({ success: false, error: error.message });
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

export default new SesionService();
