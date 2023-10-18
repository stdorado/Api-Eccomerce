import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
});

const cartSchema = new mongoose.Schema({
    products: [cartProductSchema],
    id:{
        type:Number,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    }
});

export const Cart = mongoose.model("Cart",cartSchema)