import { productManager } from "../models/ProductManager.js";

async function getAllProductsHandler(io, socket) {
  socket.on("getAllProducts", async () => {
    try {
      const products = await productManager.getProducts();
      io.sockets.emit("updatedProducts", products);
    } catch (error) {
      // Envia un mensaje de error a través de Socket.io
      io.to(socket.id).emit("error", "No se pueden obtener los productos.");
      console.error("Error al obtener productos:", error);
    }
  });
}

export { getAllProductsHandler };
