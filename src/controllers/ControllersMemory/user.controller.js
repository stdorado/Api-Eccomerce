import userService from "../../Services/user.service.js";

async function uploadDocuments(req, res) {
    try {
      const userId = req.params.uid;
      const documents = req.files.map(file => ({
        name: file.originalname,
        reference: file.path
      }));
      await UserManager.updateOne(userId, { $push: { documents } });
      res.status(200).send("Documentos subidos correctamente.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al subir documentos.");
    }
  }
  
  async function updateToPremium(req, res) {
    try {
      const userId = req.params.uid;
      await userService.updateUserPremium(userId);
      res.status(200).send("Usuario actualizado a premium correctamente.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar al usuario a premium.");
    }
  }
  
  export { uploadDocuments, updateToPremium };