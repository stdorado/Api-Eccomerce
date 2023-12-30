import { Product } from "../dao/model/products.js"

export const checkProductOwner = async (req,res,next)=>{
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({success : false,message :"Product not found"})
        }
        if(req.user.role === "admin" || product.owner == req.user.email){
            next()
        }else{
            res.status(403).json({success : false, message : "You do not have permission to access here "})
        }
    } catch (error) {
        res.status(500).json({success : false, error : error.message})
    }
};