import SessionService from "../../Services/Session.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await SessionService.login(email, password, req, res);

    if (result.success) {
      res
        .status(200)
        .json({
          success: true,
          _id: result._id,
          message: "Inicio de sesión exitoso",
        });
    } else {
      res.status(401).json({ success: false, error: "Credenciales inválidas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error en el inicio de sesión." });
  }
};

const register = async (req, res) => {
  try {
    const { email, first_Name, last_Name, password } = req.body;
    if (!email || !first_Name || !last_Name || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Todos los campos son requeridos" });
    }
    const result = await SessionService.register(
      email,
      first_Name,
      last_Name,
      password
    );

    if (result.success) {
      res
        .status(200)
        .json({
          success: true,
          message: "Registro exitoso",
          redirect: "/home",
        });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Error en el registro." });
  }
};

const getProfile = async (req, res) => {
  try {
    let userData;

    // Verificar si el usuario está autenticado de manera tradicional
    if (req.session.user) {
      userData = {
        _id: req.session.user._id,
        email: req.session.user.email,
        first_Name: req.session.user.first_Name,
        last_Name: req.session.user.last_Name,
        role: req.session.user.role,
        last_connection: req.session.user.last_connection,
      };
    } 
    // Verificar si el usuario está autenticado con Google
    else if (req.user && req.user.authMethod === "Google") {
      userData = {
        _id: req.user._id,
        email: req.user.email,
        first_Name: req.user.first_Name,
        last_Name: req.user.last_Name,
        role: req.user.role,
        last_connection: req.user.last_connection,
        authMethod: "Google", // Asegúrate de incluir el método de autenticación
      };
    }
    // Si no está autenticado en absoluto
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
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error en el deslogeo" });
      }
      return res.status(200).json({ alert: "Cuenta desLogeada Exitosamente" });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { logout, login, register, getProfile };
