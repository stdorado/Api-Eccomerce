import express from "express";
import { engine } from "express-handlebars";
import { Server} from "socket.io";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";
import viewsRouter from "./router/views.router.js";
import SessionRouter from "./router/session.router.js";
import MessageRouter from "./router/messager.router.js"
import { __dirname } from "./utils.js";
import mongoose from "./config.js";
import session from "express-session";
import passport from "passport";
import AuthRouter from "./router/authentication.router.js"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandlerMiddlewares.js";
dotenv.config()

//express
const app = express();
const PORT = 8080;

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser())
app.use(errorHandler)

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//cookies
console.log("SESSION ", process.env.SESSION_SECRET)
const URI = process.env.MONGO_URI
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
}));

//passport
app.use(passport.initialize())
app.use(passport.session());


//ruts / endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions",SessionRouter)
app.use("/api/messages", MessageRouter)
app.use('/auth', AuthRouter);
app.use("/", viewsRouter);

//socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer); 
socketServer.on("connect", () => {
  console.log('Conectado a Socket.io');
});

// Manipulation de errors de Socket.io
socketServer.on('error', (error) => {
  console.error('Error de Socket.io:', error);
});

socketServer.on('disconnect', () => {
  console.log('Desconectado de Socket.io');
});