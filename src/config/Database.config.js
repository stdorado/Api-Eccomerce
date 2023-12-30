import mongoose from "mongoose";
import dotenv from "dotenv"
import { logger } from "../logger.js";
dotenv.config();

const MongoUri = process.env.MONGO_URI;

mongoose.connect(MongoUri)
.then(() => {
    logger.info("data base connection")
}).catch((err) => {
    logger.error("error to connection")
});

export default mongoose

