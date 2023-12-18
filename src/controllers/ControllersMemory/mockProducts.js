function generatedMockProducts (){
    const productos = [];
    for (let i = 1; i<1000; i++){
        productos.push({
            _id: i,
            nombre: `Producto ${i}`,
            precio: Math.floor(Math.random() * 1000) + 1, // Precio aleatorio entre 1 y 100
            categoria: 'Electrónicos', // Categoría ficticia
        })
    }
    return productos
}

export function getMockProducts(req,res){
    const productosSimulados = generatedMockProducts()
    res.json(productosSimulados)
}