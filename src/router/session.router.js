import { Router } from "express";
import { register,getProfile,login,logout } from "../controllers/ControllersMemory/sesionController.js";

const SessionRouter = Router()

SessionRouter.get("/profile" , getProfile)
SessionRouter.post("/register", register);
SessionRouter.post("/login",login)
SessionRouter.delete("/",logout)



export default SessionRouter; 