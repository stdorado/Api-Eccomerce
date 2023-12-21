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
    res.status(500).json({ error: "Error creating cart." });
  }
};

export const GetCartById = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting cart." });
  }
};

export const AddProductToCart = async (req, res) => {
  try {
    const result = await addProductToCart(req.params.cid, req.params.pid, req.body.quantity || 1);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart." });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await updateCart(cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart." });
  }
};

export const DeleteCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await deleteProductFromCart(cid, pid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error when removing a product from the cart.' });
  }
};

export const ViewCart = async (req, res) => {
  try {
    const cartId = "6526aab3fb59b510c46939fe";
    const cartData = await getViewCartData(cartId);

    if (!cartData) {
      return res.status(404).json({ error: "Cart not found." });
    }
    res.render('cart', cartData);
  } catch (error) {
    res.status(500).render('error', { error: 'Error getting the products in the cart.' });
  }
};

export const ClearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await clearCart(cid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error emptying cart.' });
  }
};

export const GetProductsInCart = async (req, res) => {
  try {
    const result = await getProductsInCart(req.params.cid);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the products in the cart.' });
  }
};

export const PurchaseCart = async (req, res) => {
  try {
    const result = await purchaseCart(req.params.cid, req.user.email);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error to buy" });
  }
};