import messageManager from "../dao/messageManager.js";

async function messagesHandler(io, socket) {
    socket.on("messageSent", async (message) => {
      await messageManager.create(message);
      const messages = await messageManager.getAll();
      io.sockets.emit("newMessages", messages);
    });
  
    socket.on("getMessages", async () => {
      const messages = await messageManager.getAll();
      io.sockets.emit("newMessages", messages);
    });
  }
export {messagesHandler  }