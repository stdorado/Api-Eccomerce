import { Router } from "express";
import { getMockProducts } from "../controllers/ControllersMemory/mockProducts.js";

const router = Router()

router.get("/",getMockProducts)

export default router