import express from "express";
import { engine } from "express-handlebars";
import { Server} from "socket.io";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";
import viewsRouter from "./router/views.router.js";
import SessionRouter from "./router/session.router.js";
import { __dirname } from "./utils.js";
import mongoose from "./config.js";
import session from "express-session";
import dotenv from "dotenv"


//configuracion de .env
dotenv.config();

//express
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//cokkies
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
}));
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

//rutas / endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions",SessionRouter)
app.use("/", viewsRouter);


//socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer); 
socketServer.on("connect", () => {
  console.log('Conectado a Socket.io');
});

// Manejo de errores de Socket.io
socketServer.on('error', (error) => {
  console.error('Error de Socket.io:', error);
});

socketServer.on('disconnect', () => {
  console.log('Desconectado de Socket.io');
});