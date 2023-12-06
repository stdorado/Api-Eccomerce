import sessionManager from "../../dao/DaoDataBase/SessionManager.js";
import UserManager from "../../dao/DaoDataBase/UserManager.js";
import { generateToken } from "../../utils.js";


async function login(req, res) {
  try {
    const { email, password } = req.body;
    let result;

    // Verificación del administrador (cambia según tus necesidades)
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
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
    req.session["first_Name"] = result.first_Name;
    req.session["last_Name"] = result.last_Name;

    return res.status(200).json({
      success: true,
      message: `Welcome ${result.first_Name} ${result.last_Name}`,
    });
  } catch (error) {
    console.error(`Error en el inicio de sesión: ${error.message}`);
    
    
    if (error.message === "secretOrPrivateKey must have a value") {
      return res.status(500).json({ success: false, error: "Error en el inicio de sesión: secretOrPrivateKey must have a value" });
    }

    return res.status(500).json({ success: false, error: error.message });
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
      // Usuario autenticado
      const userData = {
        email: req.session.email,
        first_Name: req.session.first_Name,
        last_Name: req.session.last_Name,
        role: req.session.role,
      };
      return res.status(200).json(userData);
    } else {
      // Usuario no autenticado
      const email = req.session.email;
      const user = await UserManager.findOne({ email });

      if (user) {
        // Usuario encontrado en la base de datos
        const userData = {
          email: user.email,
          first_Name: user.first_Name,
          last_Name: user.last_Name,
          role: user.role,
        };
        return res.status(200).json(userData);
      }
    }

    // Si no se cumple ninguna de las condiciones anteriores, el usuario no está autenticado y no se encontró en la base de datos
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