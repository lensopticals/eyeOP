import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// Route 1: Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    if (!productId || !quantity) {
      res.status(404).json({
        success: false,
        message: "Product id or quantity are not provided.",
      });
    }
    const product = await Product.findById(productId).populate();
    if (!product) {
      res.status(404).json({ success: false, message: "Product is not found" });
    }
    const isCartProduct = await Cart.find({ product: productId, user: userId });
    if (isCartProduct.length > 0) {
      const updated = await Cart.findOneAndUpdate(
        { product: productId, user: userId },
        {
          $set: {
            quantity: isCartProduct[0].quantity + quantity,
            // total: product.price * parseInt(quantity),
          },
        },
        { new: true }
      );
      await updated.save();
      return res.status(201).json({
        success: true,
        message: "A existing cart is successfully created!",
      });
    } else {
      let newCart = await Cart.create({
        user: userId,
        product: productId,
        quantity: quantity,
        // total: product.price * parseInt(quantity),
      });

      if (!newCart) {
        return res
          .status(403)
          .json({ success: false, message: "Error in Adding Item in cart." });
      }
      // TODO: ADD Aggrigation Pipeline

      res.status(201).json({
        success: true,
        message: "New Item Added To Cart successfully!",
        newCart,
      });
    }
  } catch (error) {
    console.log("Error in adding Cart Items : \n \t", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Route 2: Removing form cart
const removeCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.status(404).json({
        success: false,
        message: "Product id is not provided.",
      });
    }
    const product = await Product.findById(productId).populate();
    if (!product) {
      res.status(404).json({ success: false, message: "Product is not found" });
    }

    const removed = await Cart.findOneAndDelete(
      { product: productId, user: req.user._id },
      { new: true }
    );
    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the user's cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted from the user's cart",
      removed,
    });
  } catch (error) {
    console.log("Error In Removing Item From cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Route 3: Fetching all cart Items
const fetchCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.find({ user: userId }).populate();
    // cart = await Cart.populate("product");
    if (!cart) {
      res.status(404).json({ success: false, message: "No cart is found!" });
    }
    res.status(200).json({
      success: true,
      message: "Cart Items Fetched Successfully",
      cart,
    });
  } catch (error) {
    console.log("Error in Fetching Cart Items : \n \t", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Route 4: Update cart's quantity
const updateCart = async (req, res) => {
  try {
    const { quantity, productId } = req.body;

    const userId = req.user._id;

    const product = await Cart.findOne({ product: productId }).populate();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in Cart",
      });
    }

    const cartItem = await Cart.findOneAndUpdate(
      {
        user: userId,
        product: productId,
      },
      {
        $set: { quantity: quantity, total: parseInt(quantity) * price },
      }, // Update: Set the new quantity
      { new: true }
    );
    await cartItem.save();

    const updatedCartItem = await Cart.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: "Cart Updated SuccesFully",
      updatedCartItem,
    });
  } catch (error) {
    console.log("Error In Updating THe Cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

// Route 5: Clearing cart items
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.deleteMany({ user: userId });
    return res
      .status(200)
      .json({ success: true, message: "Cart Cleared", cart });
  } catch (error) {
    console.log("Error In Updating THe Cart");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};

export { addToCart, removeCart, fetchCart, updateCart, clearCart };
