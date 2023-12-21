import { generatedMockProducts } from "../../Services/mocking.js";

function getMocksProducts(req,res){
    const ProductsSimulated = generatedMockProducts()
    res.json(ProductsSimulated)
}

export default getMocksProducts