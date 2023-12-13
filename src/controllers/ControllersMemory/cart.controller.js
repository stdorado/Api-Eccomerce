import {createCart,
  getCartById,
  addProductToCart,
  updateCart,
  deleteProductFromCart,
  clearCart,getProductsInCart,
  purchaseCart,
  getViewCartData} from "../../Services/cart.servicio.js";

export const CreateCart = async (req, res) => {
  try {
    const savedCart = await createCart();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito." });
  }
};

export const GetCartById = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
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

export const AddProductToCart = async (req, res) => {
  try {
    const result = await addProductToCart(req.params.cid, req.params.pid, req.body.quantity || 1);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar el producto al carrito." });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await updateCart(cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el carrito." });
  }
};

export const DeleteCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await deleteProductFromCart(cid, pid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
  }
};

export const ViewCart = async (req, res) => {
  try {
    const cartId = "6526aab3fb59b510c46939fe";
    const cartData = await getViewCartData(cartId);

    if (!cartData) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    // Renderiza la vista 'cart' con los datos
    res.render('cart', cartData);

  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error al obtener los productos en el carrito.' });
  }
};

export const ClearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await clearCart(cid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al vaciar el carrito.' });
  }
};

export const GetProductsInCart = async (req, res) => {
  try {
    const result = await getProductsInCart(req.params.cid);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos en el carrito.' });
  }
};

export const PurchaseCart = async (req, res) => {
  try {
    const result = await purchaseCart(req.params.cid, req.user.email);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Error en la compra:", error.message);
    res.status(500).json({ success: false, error: "Error en la compra" });
  }
};