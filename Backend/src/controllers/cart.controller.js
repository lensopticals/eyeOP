import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// Route 1: Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cartItem = await Cart.findOne({ product: productId, user: userId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully!",
        cartItem,
      });
    } else {
      const newCartItem = await Cart.create({
        user: userId,
        product: productId,
        quantity: quantity,
      });

      if (!newCartItem) {
        return res.status(403).json({
          success: false,
          message: "Error in adding item to cart.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Item added to cart successfully!",
        newCartItem,
      });
    }
  } catch (error) {
    console.log("Error in adding cart items: \n\t", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Route 2: Removing form cart
const removeCart = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      res.status(404).json({
        success: false,
        message: "Product id is not provided.",
      });
    }
    const product = await Product.findById(productId);
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
    const userId = req?.user._id;
    const cart = await Cart.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $addFields: {
          total: { $multiply: ["$quantity", "$product.price"] },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          product: 1,
          quantity: 1,
          total: 1,
        },
      },
    ]);

    if (!cart || cart.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found in the cart" });
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
    const product = await Cart.findOne({ product: productId });

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
        $set: { quantity: quantity, total: parseInt(quantity) },
      }, // Update: Set the new quantity
      { new: true }
    );
    await cartItem.save();

    const updatedCartItem = await Cart.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $addFields: {
          total: {
            $round: [{ $multiply: ["$quantity", "$product.price"] }, 2],
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          product: 1,
          quantity: 1,
          total: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Cart Updated SuccesFully",
      updatedCartItem,
    });
  } catch (error) {
    console.log("Error In Updating THe Cart", error);
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
