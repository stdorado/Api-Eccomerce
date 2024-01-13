import { Router } from "express";
import { passwordController } from "../controllers/ControllersMemory/recoveringPasswor.controlle.js";


const router = Router()
router.get("/recovering/:token")

router.post("/recovering", passwordController.forgetpassword);

router.post("/recovering/:token", passwordController.recoveringPassword);

router.get("/reset-password/:token")

export default router