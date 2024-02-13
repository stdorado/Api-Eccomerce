import newImage from "../../Services/user.service.js"

export const renderUploadForm = (req,res)=>{
    res.render("upload")
}

export const upgradeToPremium = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.email) {
      return res.status(400).json({ success: false, error: 'Usuario no autenticado' });
    }

    const userEmail = req.session.user.email;

    const result = await newImage.upgradeToPremium(userEmail);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error en el servidor' });
  }
};

export const UploadImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const userId = req.session.user.email; 
    const image = await newImage.uploadImage(filename, userId);
    res.status(200).json({ success: true, message: "Imagen subida exitosamente", image });
  } catch (error) {
    console.error('Error al subir la imagen', error);
    res.status(500).json({ success: false, error: "Error al subir la imagen" });
  }
};

