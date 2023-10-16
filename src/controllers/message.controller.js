import messageManager from "../dao/messageManager.js";

async function sendMessageFromMongo(req, res) {
  const { user, messageText } = req.body; // Puedes recibir estos datos de una solicitud POST
  try {
    const savedMessage = await MessageManager.sendMessage(user, messageText);
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo enviar el mensaje.' });
  }
}

// Controlador para obtener mensajes
async function getMessagesFromMongo(req, res) {
  try {
    const messages = await MessageManager.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los mensajes.' });
  }
}

export { sendMessageFromMongo, getMessagesFromMongo };