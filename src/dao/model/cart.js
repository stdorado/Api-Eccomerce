import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Hacer referencia al modelo Product
        required: true
    },
    quantity: {
        type: Number,
        required: true
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