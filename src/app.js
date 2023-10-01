import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";
import viewsRouter from "./router/views.router.js";
import { getAllProductsHandler } from "./handlers/products.handlers.js";
import { __dirname } from "./utils.js"; 

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));


app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

// Manejo de conexiones de Socket.io
socketServer.on("connection", (socket) => {
  console.log("Cliente conectado a través de Socket.io");

<<<<<<< HEAD
  getAllProductsHandler(socketServer, socket);

  // Manejo de eventos de Socket.io
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
=======
  
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  
>>>>>>> 94228d9a420215d0f3837510dc306f927defe4e7
});

