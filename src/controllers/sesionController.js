import sessionManager from "../dao/SessionManager.js";
import UserManager from "../dao/UserManager.js";

async function login(req, res) {
  try {
    const { email, password } = req.body;
    let result;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      result = {
        email: "adminCoder@coder.com",
        password: "adminCod3r123",
        age: 20,
        first_name: "Coder",
        last_name: "House",
        role: "admin"
      };

      req.session["email"] = result.email;
      req.session["role"] = result.role;

      delete result.password;
      return res.status(200).json({ message: result });
    }

    // Si no es un usuario "admin", realiza la autenticación normal
    result = await sessionManager.login(email, password);
    req.session["email"] = email;
    req.session["role"] = result.role;

    delete result._doc.password;
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function register(req, res) {
  try {
    const result = await UserManager.createOne(req.body);

    // Elimina la contraseña de la respuesta para mayor seguridad
    delete result._doc.password;

    req.session.email = result.email;
    req.session.role = result.role;

    // Redirige al usuario a la página de inicio
    res.redirect("/home");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProfile(req, res) {
  try {
    // Obtén los datos del usuario desde la sesión o la base de datos, dependiendo de tu lógica de autenticación
    if (req.session.email) {
      // Si la sesión está activa, obtén los datos del usuario desde la sesión
      const userData = {
        email: req.session.email,
        role: req.session.role, // Puedes agregar otros campos según tus necesidades
      };
      return res.status(200).json(userData);
    } else {
      // Si la sesión no está activa, puedes buscar los datos del usuario en la base de datos
      // Por ejemplo, puedes usar el email almacenado en req.session para buscar el usuario en la base de datos
      const email = req.session.email; // Asume que el email se almacenó en la sesión durante el inicio de sesión
      const user = await UserManager.findOne({ email }); // Asume que tienes un método para buscar usuarios en tu UserManager

      if (user) {
        // Si se encontró el usuario, puedes enviar sus datos al cliente
        const userData = {
          email: user.email,
          role: user.role, // Puedes agregar otros campos según tus necesidades
        };
        return res.status(200).json(userData);
      }
    }

    // Si no se encontraron datos del usuario, puedes enviar un error o un mensaje apropiado
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
      res.status(200).json({ message: "Cuenta desLogeada Exitosamente" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { logout, login, register,getProfile };