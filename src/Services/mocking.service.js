export const generatedMockProducts = ()=>{
    const products = []
    for (let i = 1; i<1000; i++){
        products.push({
            _id : i,
            name : `Producto ${i}`,
            price : Math.floor(Math.random()*1000)+1,
            category : "Electronics"
        })
    }
    return productos
}

