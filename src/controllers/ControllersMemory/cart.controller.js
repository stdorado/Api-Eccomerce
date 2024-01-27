import cartServicio from "../../Services/cart.service.js";

export const CreateCart = async (req, res) => {
  try {
    const savedCart = await cartServicio.createCart();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart." });
  }
};

export const GetCartById = async (req, res) => {
  try {
    const cart = await cartServicio.getCartById(req.params.cid);
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
    const result = await cartServicio.addProductToCart(
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
    const updatedCart = await cartServicio.updateCart(cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart." });
  }
};

export const DeleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartServicio.deleteProductFromCart(cid, pid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error removing a product from the cart." });
  }
};

export const ViewCart = async (req, res) => {
  try {
    
    const cartId = '6526aab3fb59b510c46939fe';
    
    
    const cartData = await cartServicio.getViewCartData(cartId);

    if (!cartData) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }
    res.render('cart', cartData);

  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error al obtener los productos en el carrito.' });
  }
};

export const ClearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartServicio.clearCart(cid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error emptying cart.' });
  }
};

export const GetProductsInCart = async (req, res) => {
  try {
    const result = await cartServicio.getProductsInCart(req.params.cid);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the products in the cart.' });
  }
};

export const PurchaseCart = async (req, res) => {
  try {
    const userEmail = req.session.user ? req.session.user.email : null;
    const result = await cartServicio.purchaseCart(req.params.cid, userEmail);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error to buy" });
  }
};