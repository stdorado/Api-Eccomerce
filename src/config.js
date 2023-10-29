import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const MongoUri = process.env.MONGO_URI;
console.log(MongoUri)
mongoose.connect(MongoUri)
.then(() => {
    console.log("data base connection")
}).catch((err) => {
    console.log("error to connection")
});

export default mongoose

