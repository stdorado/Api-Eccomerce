import express from "express";
import { engine } from "express-handlebars";
import { Server, Socket } from "socket.io";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";
import viewsRouter from "./router/views.router.js";
import { __dirname } from "./utils.js";
import mongoose from "./config.js";





const app = express();
const PORT =  8080;

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

const socketServer = new Server(httpServer); // Crea un servidor Socket.io
socketServer.on("connect", ()=>{
  console.log()
})
// Manejo de errores de Socket.io
socketServer.on('error', (error) => {
  console.error('Error de Socket.io:', error);
});

socketServer.on('disconnect', () => {
  console.log('Desconectado de Socket.io');
});
