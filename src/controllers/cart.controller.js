import CartManager from "../dao/CartManager.js";
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
  export const updateCartMongoose = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const cartActualizado = await cartManager.updateOne(id, data);
      if (!cartActualizado) {
        res.status(404).json({ error: 'Carrito no encontrado.' });
      } else {
        res.json(cartActualizado);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el carrito.' });
    }
  };
  
  // Controlador para eliminar un carrito
  export const deleteCartMongoose = async (req, res) => {
    try {
      const { id } = req.params;
      const cartEliminado = await cartManager.deleteOne(id);
      if (!cartEliminado) {
        res.status(404).json({ error: 'Carrito no encontrado.' });
      } else {
        res.json(cartEliminado);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el carrito.' });
    }
  };