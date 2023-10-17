import express from "express";
import { getAllProductsFromMongoose, getProductByIdFromMongoose, createProductFromMongoose, updateProductFromMongoose, deleteProductFromMongoose } from "../controllers/products.controllersMongoose.js";
const router = express.Router();

router.get("/", getAllProductsFromMongoose);
router.get("/:pid", getProductByIdFromMongoose);
router.post("/", createProductFromMongoose);
router.put("/:pid", updateProductFromMongoose);
router.delete("/:pid", deleteProductFromMongoose);

export default router;


