import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const Mensaje = mongoose.model("mensaje",messageSchema)

async function createMessage(user,message){
    const newMessage = new Mensaje({user,message})
    return newMessage.save()
}

async function getAllMessages(){
    return Mensaje.find().exec()
}