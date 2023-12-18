import { Cart } from "../dao/model/cart.js";
import { Product } from "../dao/model/products.js";
import Ticket from "../dao/model/Ticket.js";
import { generateUniqueCode } from "../utils.js";
import { enviarCorreo } from "./nodemailer.js";

export const createCart = async () => {
    const newCart = new Cart({
      products: [],
    });
    return newCart.save();
  };
  
  export const getCartById = async (cartId) => {
    return Cart.findById(cartId).populate("products.productId");
  };
  
  export const addProductToCart = async (cartId, productId, quantity) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Carrito no encontrado" };
    }
  
    const product = await Product.findById(productId);
    if (!product) {
      return { success: false, error: "Producto no encontrado" };
    }

    // Verificar el stock antes de agregar al carrito
    if (product.stock === 0) {
      return { success: false, error: "Producto sin stock disponible" };
    }

    // Verificar si la cantidad deseada supera el stock disponible
    if (quantity > product.stock) {
      return { success: false, error: "No hay suficiente stock disponible para la cantidad deseada" };
    }
  
    cart.products.push({
      productId: product._id,
      quantity: quantity,
    });

    // Actualizar el stock del producto después de agregar al carrito
    product.stock -= quantity;
  
    const savedCart = await cart.save();
    const savedProduct = await product.save();
  
    return { success: true, cart: savedCart, product: savedProduct };
};


  export const updateCart = async (cartId, cartData) => {
    const cart = await Cart.findByIdAndUpdate(cartId, cartData, { new: true });
    if (!cart) {
      return { success: false, error: "Carrito no encontrado" };
    }
    return { success: true, cart };
  };
  
  export const deleteProductFromCart = async (cartId, productId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Carrito no encontrado" };
    }
  
    const productIndex = cart.products.findIndex(
      (product) => product && product.productId && product.productId.toString() === productId
    );
  
    if (productIndex === -1) {
      return { success: false, error: "Producto no encontrado en el carrito" };
    }
  
    cart.products.splice(productIndex, 1);
    await cart.save();
    return { success: true, message: "Producto eliminado con éxito" };
  };
  
  export const getViewCartData = async (cartId) => {
    try {
      const cart = await Cart.findById(cartId).exec();
      if (!cart) {
        return null;
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
  
      return {
        products: products.map(product => ({
          title: product.title,
          descripcion: product.descripcion,
          price: product.price,
          thumbnail: product.thumbnail,
          stock: product.stock,
          category: product.category,
          _id: product._id,
        })),
        totalAmount: totalAmount.toFixed(2),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los datos del carrito para la vista.');
    }
  };
  
  export const clearCart = async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Carrito no encontrado" };
    }
  
    cart.products = [];
    await cart.save();
    return { success: true, message: "Carrito vaciado con éxito" };
  };
  
  export const getProductsInCart = async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Carrito no encontrado" };
    }
  
    return { success: true, products: cart.products };
  };

  export const purchaseCart = async (cartId, userEmail) => {
    try {
      const cart = await Cart.findById(cartId);
  
      if (!cart) {
        return { success: false, error: 'Carrito no encontrado' };
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
          purchaser: userEmail,
        });
  
        // Limpia los productos del carrito después de la compra
        cart.products = [];
        await cart.save();
  
        // Construye el mensaje del correo con los detalles del ticket
        const mensajeCorreo = `
        <div class="font-sans max-w-2xl mx-auto p-4">
        <h1 class="text-5xl font-bold text-blue-500 text-center mb-4">¡Gracias por tu compra!</h1>
        <p class="text-center mb-4">Detalles de la compra:</p>
        <ul class="list-none p-0 text-left mb-4">
          <li class="mb-2 text-black">Ticket Code:${ticket.code}</li>
          <li class="mb-2 text-black">Fecha y hora de compra: ${ticket.purchase_datetime}</li>
          <li class="mb-2 text-black">Compra realizada por: ${ticket.purchaser}</li>
          <li class="mb-2 text-black">Total: $${totalAmount.toFixed(2)}</li>
        </ul>
        <p class="text-center"><img src="https://cdn-icons-png.flaticon.com/128/9427/9427117.png" alt="Tick" class="inline-block w-8 h-auto"></p>
      </div>
    `;

        // Llama a la función enviarCorreo
        enviarCorreo(userEmail, 'Compra realizada con éxito', mensajeCorreo, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo:', error);
          } else {
            console.log('Correo enviado con éxito:', info.response);
          }
        });
  
        return { success: true, ticket };
      } else {
        return {
          success: false,
          error: 'Algunos productos no tienen suficiente stock',
          failedProducts,
        };
      }
    } catch (error) {
      console.error('Error en la compra:', error.message);
      throw new Error('Error en la compra');
    }
  };

