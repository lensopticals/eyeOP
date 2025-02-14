import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// Route 1: Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, purchaseType, lensCustomization } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!productId || !quantity || !purchaseType) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: productId, quantity, and purchaseType",
      });
    }

    // Validate purchase type
    if (!["FRAME_ONLY", "FRAME_WITH_LENS"].includes(purchaseType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid purchase type. Must be either FRAME_ONLY or FRAME_WITH_LENS",
      });
    }

    // Validate lens customization for FRAME_WITH_LENS
    if (purchaseType === "FRAME_WITH_LENS") {
      if (
        !lensCustomization ||
        !lensCustomization.lensType ||
        !lensCustomization.selectedPackage
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Lens customization details are required for FRAME_WITH_LENS purchase",
        });
      }
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found");

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      product: productId,
      user: userId,
      purchaseType: purchaseType,
    });

    if (existingCartItem) {
      // Update existing cart item
      existingCartItem.quantity += quantity;
      if (purchaseType === "FRAME_WITH_LENS") {
        existingCartItem.lensCustomization = lensCustomization;
      }
      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully!",
        cartItem: existingCartItem,
      });
    } else {
      // Create new cart item
      const cartData = {
        user: userId,
        product: productId,
        purchaseType: purchaseType,
        quantity: quantity,
        price: product.price,
      };

      if (purchaseType === "FRAME_WITH_LENS") {
        cartData.lensCustomization = lensCustomization;
      }

      const newCartItem = await Cart.create(cartData);

      if (!newCartItem) {
        return res.status(403).json({
          success: false,
          message: "Error in adding item to cart.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Item added to cart successfully!",
        cartItem: newCartItem,
      });
    }
  } catch (error) {
    console.log("Error in adding cart items:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Route 2: Remove from cart
const removeCart = async (req, res) => {
  try {
    const { productId, purchaseType } = req.params;

    if (!productId || !purchaseType) {
      return res.status(400).json({
        success: false,
        message: "Product ID and purchase type are required",
      });
    }

    const removed = await Cart.findOneAndDelete({
      product: productId,
      user: req.user._id,
      purchaseType: purchaseType,
    });

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the user's cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.log("Error in removing item from cart:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Route 3: Fetch all cart items
const fetchCart = async (req, res) => {
  try {
    const userId = req.user._id;
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
          total: {
            $cond: {
              if: { $eq: ["$purchaseType", "FRAME_ONLY"] },
              then: { $multiply: ["$quantity", "$product.price"] },
              else: {
                $multiply: [
                  "$quantity",
                  {
                    $add: [
                      "$product.price",
                      "$lensCustomization.selectedPackage.price",
                    ],
                  },
                ],
              },
            },
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
          price: 1,
          purchaseType: 1,
          lensCustomization: 1,
          total: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!cart || cart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      cart,
    });
  } catch (error) {
    console.log("Error in fetching cart items:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Route 4: Update cart quantity and lens customization
const updateCart = async (req, res) => {
  try {
    const { productId, quantity, lensCustomization, purchaseType } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity || !purchaseType) {
      return res.status(400).json({
        success: false,
        message: "Please provide productId, quantity, and purchaseType",
      });
    }

    const updateData = {
      quantity: quantity,
    };

    if (purchaseType === "FRAME_WITH_LENS" && lensCustomization) {
      updateData.lensCustomization = lensCustomization;
    }

    const cartItem = await Cart.findOneAndUpdate(
      {
        user: userId,
        product: productId,
        purchaseType: purchaseType,
      },
      { $set: updateData },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Fetch updated cart item with product details
    const updatedCartItem = await Cart.aggregate([
      {
        $match: {
          _id: cartItem._id,
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
            $cond: {
              if: { $eq: ["$purchaseType", "FRAME_ONLY"] },
              then: { $multiply: ["$quantity", "$product.price"] },
              else: {
                $multiply: [
                  "$quantity",
                  {
                    $add: [
                      "$product.price",
                      "$lensCustomization.selectedPackage.price",
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          product: 1,
          quantity: 1,
          purchaseType: 1,
          lensCustomization: 1,
          total: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem: updatedCartItem[0],
    });
  } catch (error) {
    console.log("Error in updating cart:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Route 5: Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.deleteMany({ user: userId });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.log("Error in clearing cart:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { addToCart, removeCart, fetchCart, updateCart, clearCart };
