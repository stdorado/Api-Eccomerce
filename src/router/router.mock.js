import { Router } from "express";
import getMocksProducts from "../controllers/ControllersMemory/mockProducts.js";

const router = Router()

router.get("/",getMocksProducts)

export default router