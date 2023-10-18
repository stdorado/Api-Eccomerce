import CartManager from "../dao/CartManager.js";
import { Cart } from "../dao/model/cart.js";
import { Product } from "../dao/model/products.js";


const cartManager = new CartManager()
// Controlador para obtener todos los carritos
export const getAllCartsMongoose = async (req, res) => {
  try {
    const carts = await cartManager.findAll();
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener carritos.' });
  }
};

// Controlador para obtener un carrito por ID
export const getCartByIdMongoose = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.findById(id);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito.' });
  }
};

// Controlador para crear un nuevo carrito
export const createCartMongoose = async (req, res) => {
  try {
    const nuevoCart = await cartManager.createOne(req.body);
    res.status(201).json(nuevoCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito.' });
  }
};

// Controlador para actualizar un carrito
export const addCartToMongoose = async (req, res) => {
  try {
    const { cid, pid } = req.params; // Obtenemos los IDs del carrito (cid) y del producto (pid).
    const cart = await Cart.findById(cid); // Buscamos el carrito en la base de datos.
    const product = await Product.findById(pid); // Cambia 'product' a 'Product'

    if (!cart || !product) {
      res.status(404).json({ error: 'No se pudo encontrar el carrito o el producto.' });
    } else {
      // Agregamos el producto al carrito.
      cart.products.push(product);
      await cart.save(); // Guardamos el carrito actualizado en la base de datos.
      res.json(cart); // Respondemos con el carrito actualizado.
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo falló: no se pudo agregar el producto al carrito.' });
  }
};

// Controlador para eliminar un carrito
export const deleteCartMongoose = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    //paso 1 buscar el carrito
    const cart = await Cart.findById(cid)
    if (!cart) {
      //paso 2 verificar si el carrito existe
      res.status(404).json({ error: "el carrito no fue encontrado" });
    } else {
      //paso 3 : filtrar el producto por id
      cart.products = cart.products.filter(product => product._id.toString() !== pid)
    }
    //paso 4 guardar la update del carrito
    await cart.save()
    //paso 5 = mostrar el carrito actualizado
    res.json(cart)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'fallo al eliminar el producto del carrito' });
  }
};


export const deleteAllPrductsFromCart = async (req,res) =>{
try {
  const {cid } = req.params //obtener id del cart
  const cart = await Cart.findById(cid)//busca el cart en mongo
  if(!cart){
    res.status(404).json({error : "Carrito no encontrado"})
  }else{
    //limpia el array de productos del cart
    cart.products = []
    await cart.save()
    res.json(cart)
  }
} catch (error) {
  console.error(error)
  res.status(404).json({error : "algo fallo : no pude vaciar el cart"})
}
}