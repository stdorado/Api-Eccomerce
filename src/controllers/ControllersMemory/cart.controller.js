import cartService from "../../Services/cart.service.js";

export const CreateCart = async (req, res) => {
  try {
    const savedCart = await cartService.createCart();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart." });
  }
};

export const GetCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
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
    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized: User not logged in" });
    }
    const result = await cartService.addProductToCart(
      req.params.cid,
      req.params.pid,
      req.body.quantity || 1
    );
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart." });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartService.updateCart(cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart." });
  }
};

export const DeleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartService.deleteProductFromCart(cid, pid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error removing a product from the cart." });
  }
};

export const ViewCart = async (req, res) => {
  try {
    
    const cartId = '6526aabcfb59b510c4693a02';

    // Puedes seguir con el resto del código
    const cartData = await cartService.getViewCartData(cartId);

    if (!cartData) {
      return res.status(404).json({ error: "Cart not found." });
    }
    res.render('cart', cartData);

  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error obtaining cart products.' });
  }
};

export const ClearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartService.clearCart(cid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error emptying cart.' });
  }
};

export const GetProductsInCart = async (req, res) => {
  try {
    // Temporalmente, asigna un ID de carrito fijo
    const cartId = '6526aabcfb59b510c4693a02';

    const result = await cartService.getProductsInCart(cartId);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the products in the cart.' });
  }
};

export const PurchaseCart = async (req, res) => {
  try {
    const userEmail = req.session.user ? req.session.user.email : null;
    const result = await cartService.purchaseCart(req.params.cid, userEmail);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error to buy" });
  }
};