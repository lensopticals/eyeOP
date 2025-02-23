import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

// Create a new Order

export const createNewOrder = async (req, res) => {
  try {
    req.body.user = req.user?._id;

    const order = await Order.create(req.body);

    if (!order) {
      return res
        .status(422)
        .json({ success: false, message: "Failed to create order" });
    }

    return res
      .status(201)
      .json({ success: true, message: "Order Created SuccessFully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create order" });
  }
};

// Get orders of the user

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findById(req.user._id).populate({
      path: "orderItems.product",
      model: "Product",
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Orders Found" });
    }

    return res
      .status(200)
      .json({ success: true, orders, message: "Orders Fetched SuccessFully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// Get orders of the user

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "orderItems.product",
      model: "Product",
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Data Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, order, message: "Order Fetched SuccessFully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in fetching order",
    });
  }
};

// ADMIN ==========>

// Get All Orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderItems.product",
      model: "Product",
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Orders Found" });
    }

    return res
      .status(200)
      .json({ success: true, orders, message: "Orders Fetched SuccessFully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching order",
    });
  }
};

// Update order status

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

export const updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with this id",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "You have already delivered this address",
      });
    }

    order.orderItems.forEach(async (o) => {
      await updateStock(o.Product, o.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({
      validateBeforeSave: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to Update Order" });
  }
};

// Delete Order

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not Found!",
      });
    }
    await orderModel.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Order Deleted SuccessFully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Delete Order",
    });
  }
};

// TODO: Searching in Orders
