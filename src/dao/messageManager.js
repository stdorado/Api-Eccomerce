import Message from "./model/message.js";
class MessageManager {
    constructor() {

    }

    async sendMessage(user, messageText) {
        try {
            const newMessage = new Message({
                user,
                message: messageText,
            });

            const savedMessage = await newMessage.save();
            return savedMessage;
        } catch (error) {
            // Manejar errores
            throw error;
        }
    }
    async getMessages() {
        try {
            const messages = await Message.find();
            return messages;
        } catch (error) {
            // Manejar errores
            throw error;
        }
    }
}

export default new MessageManager()