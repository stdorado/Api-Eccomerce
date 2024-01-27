import { Router } from "express";
import { register,getProfile,login,logout} from "../controllers/ControllersMemory/sesion.controller.js";

const SessionRouter = Router()

SessionRouter.get("/profile" , getProfile)
SessionRouter.post("/register", register);
SessionRouter.post("/login",login)
SessionRouter.delete("/",logout)



export default SessionRouter; 