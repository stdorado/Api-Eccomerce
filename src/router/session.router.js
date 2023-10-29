import express from "express"
import { register,login,logout,getProfile } from "../controllers/sesionController.js"

const SessionRouter = express.Router()

SessionRouter.get("/profile", getProfile)
SessionRouter.post("/register", register);
SessionRouter.post("/login",login)
SessionRouter.delete("/",logout)

export default SessionRouter;