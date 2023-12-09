import { Cart } from "../../dao/model/cart.js";
import { Product } from "../../dao/model/products.js"; 
import Ticket from "../../dao/model/Ticket.js";
import { generateUniqueCode } from "../../utils.js";

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

    const product = await Product.findById(req.params.pid); 
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

   
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
//controlador para actualizar el carrito
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
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Encuentra el índice del producto a eliminar en el array de productos del carrito
    const productIndex = cart.products.findIndex(
      (product) => product && product.productId && product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
    }

    // Elimina el producto del array de productos del carrito
    cart.products.splice(productIndex, 1);

    // Guarda los cambios en el carrito
    await cart.save();

    // Respuesta JSON indicando éxito
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
  }
};
//controlador para renderizar los productos
export const viewCart = async (req, res) => {
  try {
    const cartId = "6526aab3fb59b510c46939fe"; 
    console.log('ID del carrito:', cartId);
    const cart = await Cart.findById(cartId).exec();
    console.log('Valor de cart:', cart);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const productIds = cart.products.map(product => product.productId);
    const products = await Product.find({ _id: { $in: productIds } }).exec();

    const calculateTotalAmount = (products, cart) => {
      let totalAmount = 0;
    
      products.forEach(product => {
        const cartItem = cart.products.find(item => item.productId && item.productId.equals(product._id));
        if (cartItem) {
          totalAmount += product.price * cartItem.quantity;
        }
      });
    
      return totalAmount;
    };

    const totalAmount = calculateTotalAmount(products, cart);

    const cartData = {
      products: products.map(product => ({
        title: product.title,
        descripcion: product.descripcion,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        category: product.category,
        _id: product._id, 
      })),
      totalAmount: totalAmount.toFixed(2), // Agregamos el totalAmount a cartData
    };

    // Renderiza la vista 'cart' con los datos
    res.render('cart', cartData);
    
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error al obtener los productos en el carrito.' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Limpia los productos del carrito
    cart.products = [];

    // Guarda los cambios en el carrito
    await cart.save();

    // Respuesta JSON indicando éxito
    res.json({ message: 'Carrito vaciado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al vaciar el carrito.' });
  }
};


// Controlador para obtener los productos en un carrito
export const getProductsInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    res.json(productsInCart); 
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: 'Error al obtener los productos en el carrito.' });
  }
};


export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const failedProducts = [];
    let totalAmount = 0;

    for (const cartItem of cart.products) {
      const product = await Product.findById(cartItem.productId);

      if (product && product.stock >= cartItem.quantity) {
        product.stock -= cartItem.quantity;
        await product.save();
        totalAmount += product.price * cartItem.quantity;
      } else {
        failedProducts.push(cartItem.productId);
      }
    }

    if (failedProducts.length === 0) {
      const ticketCode = generateUniqueCode();

      const ticket = await Ticket.create({
        code: ticketCode,
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.email,
      });

      // Devuelve el ticket al cliente
      res.status(200).json({ success: true, ticket });
    } else {
      res.status(400).json({ success: false, error: "Algunos productos no tienen suficiente stock", failedProducts });
    }
  } catch (error) {
    console.error("Error en la compra:", error.message);
    res.status(500).json({ success: false, error: "Error en la compra" });
  }
};