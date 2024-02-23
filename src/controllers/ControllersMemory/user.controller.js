import newImage from "../../Services/user.service.js";
import { logger } from "../../utils/logger.js";

export const renderUploadForm = (req, res) => {
  res.render("upload");
};

export const upgradeToPremium = async (req, res) => {
  try {
    const userId = req.params.userId; // Acceder al ID del usuario desde los parámetros de la ruta
    const result = await newImage.upgradeToPremium(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: "Error en el servidor" });
  }
};

export const UploadImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const userId = req.session.user.email;
    const image = await newImage.uploadImage(filename, userId);
    res
      .status(200)
      .json({ success: true, message: "Imagen subida exitosamente", image });
  } catch (error) {
    logger.error("Error al subir la imagen", error);
    res.status(500).json({ success: false, error: "Error al subir la imagen" });
  }
};

export const AllUserToDB = async (req, res) => {
  try {
    const users = await newImage.AllUserToDB();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
    const result = await newImage.deleteInactiveUsers(thirtyMinutesAgo);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    logger.error("Error al eliminar usuarios inactivos:", error);
    res
      .status(500)
      .json({ success: false, error: "Error al eliminar usuarios inactivos" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await newImage.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
