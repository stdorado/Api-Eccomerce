import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    filename : String,
    uploadedAt : {type : Date,default:Date.now}
});

const Image = mongoose.model("Image", imageSchema)
export default Image;