import SessionServices from "../../Services/Session.services.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await SessionServices.login(email, password, req, res);
    res.status(result.success ? 200 : 401).json(result);
    console.log('Usuario autenticado:', result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error en el inicio de sesión." });
  }
};

const register = async (req, res) => {
  try {
    const { email, first_Name, last_Name, password } = req.body;
    const result = await SessionServices.register(email, first_Name, last_Name, password);
    if (result.success) {
      res.status(200).json({ success: true, message: "Registro exitoso", redirect: "/home" });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    res.status(500).json({ success: false, error: "Error en el registro." });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('Usuario en la sesión:', req.session.user);
    if (req.session.user) {
      const userData = {
        email: req.session.user.email,
        first_Name: req.session.user.first_Name,
        last_Name: req.session.user.last_Name,
        role: req.session.user.role,
      };
      res.status(200).json({ success: true, data: userData });
    } else {
      res.status(404).json({ success: false, error: "Usuario no autenticado" });
    }
  } catch (error) {
    console.error('Error en getProfile:', error);
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