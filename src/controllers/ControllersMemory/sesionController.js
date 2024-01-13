import AuthService from "../../Services/Session.services.js"


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password, req, res);
    res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error en el inicio de sesión." });
  }
};

const register = async (req, res) => {
  try {
    const { email, first_Name, last_Name, password } = req.body;
    const result = await AuthService.register(email, first_Name, last_Name, password);
    if (result.success) {
      res.redirect("/home");
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Error en el registro." });
  }
};

const getProfile = async (req, res) => {
  try {
    const result = await AuthService.getProfile(req, res);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error obteniendo el perfil del usuario." });
  }
};

const logout = async (req, res) => {
  try {
    const result = await AuthService.logout(req, res);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al cerrar sesión." });
  }
};

export { logout, login, register, getProfile };