import JWT from "jsonwebtoken"
import UserManager from "../dao/UserManager.js"


const SecretKey = process.env.JWT_SECRET_KEY

export const jwtValidation = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = JWT.verify(token, SecretKey);

    const user = await UserManager.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }
    req.user = user;
    next();
  } catch (error) {

    if (error.name === "TokenExpiredError") {

      return res.status(401).json({ message: "Token expirado." });

    } else if (error.name === "JsonWebTokenError" && error.message === "jwt malformed") {
      
      return res.status(401).json({ message: "Token con formato incorrecto." });
    }

    console.error('Error al verificar el token:', error);
    return res.status(401).json({ message: "Token no válido." });
  }
};