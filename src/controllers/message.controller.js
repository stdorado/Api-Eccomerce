import Message from "../dao/model/message.js";

async function saveMessage(user, message) {
    try {
      const newMessage = new Message({ user, message });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error('Error al guardar el mensaje en MongoDB');
    }
  }
  
  
  async function getAllMessages() {
    try {
      const messages = await Message.find().exec();
      return messages;
    } catch (error) {
      throw new Error('Error al obtener los mensajes desde MongoDB');
    }
  }
  
  export { saveMessage, getAllMessages };