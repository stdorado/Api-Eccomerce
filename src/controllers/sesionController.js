import sessionManager from "../dao/SessionManager.js";
import UserManager from "../dao/UserManager.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcrypt"

async function login(req, res) {
  try {
    const { email, password } = req.body;
    let result;

    // Verificación del administrador (cambia según tus necesidades)
    if (email === "adminCoder@coder.com" && bcrypt.compareSync(password, hashedAdminPassword)) {
      result = {
        email: "adminCoder@coder.com",
        age: 20,
        role: "admin"
      };

      req.session["email"] = result.email;
      req.session["role"] = result.role;

      delete result.password;

      const token = generateToken({ email: result.email });

      // Configura la cookie con el token
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
      });

      return res.status(200).json({ success: true, message: result });
    }

    // Verifica si el usuario existe antes de realizar la autenticación normal
    const userExists = await UserManager.findOne({ email });

    if (!userExists) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Autenticación normal
    result = await sessionManager.login(email, password);

    if (!result) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    req.session["email"] = email;
    req.session["role"] = result.role;

    delete result._doc.password;

    const token = generateToken({ email, first_Name: result.first_Name, last_Name: result.last_Name });

    // Configura la cookie con el token
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Configura secure solo en producción
    });

    return res.status(200).json({ success: true, message: `Welcome` });
  } catch (error) {
    console.error(`Error en el inicio de sesión: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
}
async function register(req, res) {
  try {
    const { email, first_Name, last_Name, password } = req.body;

    const result = await UserManager.createOne({
      email,
      password,
      first_Name,
      last_Name,
    });

    req.session.email = result.email;
    req.session.role = result.role;

    res.redirect("/home");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getProfile(req, res) {
  try {
    
    if (req.session.email) {
      
      const userData = {
        email: req.session.email,
        role: req.session.role, 
      };
      return res.status(200).json(userData);
    } else {
      
      const email = req.session.email; 
      const user = await UserManager.findOne({ email }); 

      if (user) {
        
        const userData = {
          email: user.email,
          role: user.role, 
        };
        return res.status(200).json(userData);
      }
    }
    res.status(404).json({ error: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error en el deslogeo" });
      }
      res.status(200).json({ alert: "Cuenta desLogeada Exitosamente" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export { logout, login, register,getProfile };