import { Cart } from "../dao/model/cart.js";
import { Product } from "../dao/model/products.js";
import Ticket from "../dao/model/Ticket.js";
import { generateUniqueCode } from "../utils/utils.js";
import { SendToEmail } from "./nodemailer.js";

export const createCart = async () => {
    const newCart = new Cart({
      products: [],
    });
    return newCart.save();
  };
  export const getCartById = async (cartId) => {
    return Cart.findById(cartId).populate("products.productId");
  };
  export const addProductToCart = async (userId, cartId, productId, quantity) => {
    try {
      
      const product = await Product.findById(productId);
      const isOwnerOrAdmin = req.user.role === 'admin' || product.owner === req.user.email;
  
      if (!isOwnerOrAdmin) {
        return { success: false, error: 'You do not have permission to access here' };
      }
  
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return { success: false, error: 'Cart Not found' };
      }
  
      if (product.stock === 0) {
        return { success: false, error: 'Product out Stock' };
      }
  
      if (quantity > product.stock) {
        return { success: false, error: 'Not found : Stock invalid' };
      }
  
      cart.products.push({
        productId: product._id,
        quantity: quantity,
      });
  
      product.stock -= quantity;
  
      const savedCart = await cart.save();
      const savedProduct = await product.save();
  
      return { success: true, cart: savedCart, product: savedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  export const updateCart = async (cartId, cartData) => {
    const cart = await Cart.findByIdAndUpdate(cartId, cartData, { new: true });
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }
    return { success: true, cart };
  };
  export const deleteProductFromCart = async (cartId, productId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }
  
    const productIndex = cart.products.findIndex(
      (product) => product && product.productId && product.productId.toString() === productId
    );
  
    if (productIndex === -1) {
      return { success: false, error: "Product not found to cart" };
    }
  
    cart.products.splice(productIndex, 1);
    await cart.save();
    return { success: true, message: "Product delete to success" };
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
      throw new Error('error getting cart data.');
    }
  };
  export const clearCart = async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }
  
    cart.products = [];
    await cart.save();
    return { success: true, message: "cart emptied successfully" };
  };
  export const getProductsInCart = async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { success: false, error: "Carrito not found" };
    }
  
    return { success: true, products: cart.products };
  };
  export const purchaseCart = async (cartId, userEmail) => {
    try {
      const cart = await Cart.findById(cartId);
  
      if (!cart) {
        return { success: false, error: 'Carrito not found' };
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
  
        
        cart.products = [];
        await cart.save();
  
        
        const MessageEmail = `
        <div class="font-sans max-w-2xl mx-auto p-4">
        <h1 class="text-5xl font-bold text-blue-500 text-center mb-4">¡Thanks for you Buy!</h1>
        <p class="text-center mb-4">Details Order:</p>
        <ul class="list-none p-0 text-left mb-4">
          <li class="mb-2 text-black">Ticket Code:${ticket.code}</li>
          <li class="mb-2 text-black">Date to Shop: ${ticket.purchase_datetime}</li>
          <li class="mb-2 text-black">Purchase to: ${ticket.purchaser}</li>
          <li class="mb-2 text-black">Total buy: $${totalAmount.toFixed(2)}</li>
        </ul>
        <p class="text-center"><img src="https://cdn-icons-png.flaticon.com/128/9427/9427117.png" alt="Tick" class="inline-block w-8 h-auto"></p>
      </div>
    `;

       
        SendToEmail(userEmail, 'Shop Success', MessageEmail, (error, info) => {
          if (error) {
            console.error('Error to send Email:', error);
          } else {
            console.log('Email send to success:', info.response);
          }
        });
  
        return { success: true, ticket };
      } else {
        return {
          success: false,
          error: 'Some products are out of stock',
          failedProducts,
        };
      }
    } catch (error) {
      throw new Error('Error o buy');
    }
  };

