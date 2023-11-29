import mongoose from "mongoose";
import { Cart } from "./cart.js";

const userSchema = new mongoose.Schema({
    first_Name: {
        type: String,
        required: false
    },
    last_Name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false,
        max: 99,
        min: 0
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart,
        default: null
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    }
});

const User = new mongoose.model("users",userSchema)

export default User;