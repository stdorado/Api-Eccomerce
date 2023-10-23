import { Cart } from "../dao/model/cart.js";
import { Product } from "../dao/model/products.js"; 

// Controlador para crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = new Cart({
      products: [],
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito." });
  }
};
// Controlador para obtener un carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.productId");
    if (!cart) {
      res.status(404).json({ error: "Carrito no encontrado." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito." });
  }
};
// Controlador para agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const product = await Product.findById(req.params.pid); // Asegúrate de que req.params.pid contenga el _id del producto
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    // Puedes establecer la cantidad en 1 como valor predeterminado
    const quantity = req.body.quantity || 1;

    // Añade el producto al carrito
    cart.products.push({
      productId: product._id,
      quantity: quantity,
    });

    const savedCart = await cart.save();

    res.status(200).json(savedCart);
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar el producto al carrito." });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findByIdAndUpdate(cid, req.body, { new: true });
    if (!cart) {
      res.status(404).json({ error: "Carrito no encontrado." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el carrito." });
  }
};

// Controlador para eliminar un carrito
export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cid; // Obtenemos el ID del carrito desde los parámetros de la URL
    const productId = req.params.pid; // Obtenemos el ID del producto desde los parámetros de la URL

    // Encuentra el carrito por su ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    // Encuentra el índice del producto a eliminar en el array de productos del carrito
    const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito." });
    }

    // Elimina el producto del array de productos del carrito
    cart.products.splice(productIndex, 1);

    // Guarda los cambios en el carrito
    await cart.save();

    // Respuesta JSON indicando éxito
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto del carrito." });
  }
};

export const viewCart = async (req, res) => {
  try {
    const cartId = "6526a937fb59b510c46939f8"; // Esto debería obtenerse dinámicamente si hay múltiples carritos
    const cart = await Cart.findById(cartId).exec();

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const productIds = cart.products.map(product => product.productId);
    const products = await Product.find({ _id: { $in: productIds } }).exec();

    // Crear un objeto con los datos de los productos
    const cartData = {
      products: products.map(product => ({
        title: product.title,
        descripcion: product.descripcion,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        category: product.category,
        _id: product._id, // Agrega el _id del producto
      })),
    };

    // Renderiza la vista 'cart' con los datos
    res.render('cart', cartData);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error al obtener los productos en el carrito.' });
  }
};

// Controlador para obtener los productos en un carrito
export const getProductsInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    // Lógica para obtener los productos en el carrito
    res.json(productsInCart); // O res.render según tus necesidades
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: 'Error al obtener los productos en el carrito.' });
  }
};