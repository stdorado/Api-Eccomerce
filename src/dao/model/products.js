import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true,
    },
    code:{
        type:String,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    },
    category:{
        type:String,
        require:true
    }

})

export const product = mongoose.model("product",ProductsSchema)