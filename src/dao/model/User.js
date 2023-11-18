import mongoose, { Schema } from "mongoose";
import { Cart } from "./cart.js";

const userSchema = new mongoose.Schema({
    first_Name: {
        type: String,
        required: true
    },
    last_Name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age : {
        type: Number,
        require: false,
        max : 99,
        min : 0
    },
    password:{
        type: String,
        require: true
    },
    role : {
        type:String,
        default:"User"
    },
    cart: {
        type : mongoose.Schema.Types.ObjectId,
        ref: Cart,
        default : null
    },
    fromGoogle:{
        type:Boolean,
        default:false,
    }
})

const User = new mongoose.model("users",userSchema)

export default User;