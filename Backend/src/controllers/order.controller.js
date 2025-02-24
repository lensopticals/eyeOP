import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

// Create a new Order
export const createNewOrder = async (req, res) => {
  try {
    // Add user ID from authenticated session
    req.body.user = req.user?._id;

    // Validate order items and calculate totals
    for (const item of req.body.orderItems) {
      // Validate product exists and has sufficient stock
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      // Validate lens customization for FRAME_WITH_LENS
      if (item.purchaseType === "FRAME_WITH_LENS" && !item.lensCustomization) {
        return res.status(400).json({
          success: false,
          message: "Lens customization required for frame with lens items",
        });
      }

      // Calculate total for each item
      item.price = product.price;
      item.lensPrice = item.lensCustomization?.selectedPackage?.price || 0;
      item.total = (item.price + item.lensPrice) * item.quantity;
    }

    const order = await Order.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

// Get orders of the user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product")
      .populate("shippingInfo");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Orders Found",
      });
    }

    return res.status(200).json({
      success: true,
      orders,
      message: "Orders Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get a single order
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate("orderItems.product")
      .populate("shippingInfo")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Data Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
      message: "Order Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching order",
    });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.product")
      .populate("user", "name email")
      .populate("shippingInfo");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Orders Found",
      });
    }

    return res.status(200).json({
      success: true,
      orders,
      message: "Orders Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
    });
  }
};

// Update order status (Admin)
async function updateStock(product, quantity) {
  if (product) {
    product.stock = Math.max(0, product.stock - quantity);
    await product.save({ validateBeforeSave: false });
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Prevent updates to delivered or cancelled orders
    if (
      order.orderStatus === "DELIVERED" ||
      order.orderStatus === "CANCELLED"
    ) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be updated after being ${order.orderStatus.toLowerCase()}`,
      });
    }

    // Update stock if order is being shipped
    if (req.body.orderStatus === "SHIPPED") {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        await updateStock(product, item.quantity);
      }
    }

    // Update order status
    order.orderStatus = req.body.orderStatus;
    await order.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.updatePaymentStatus(req.body.status, req.body.paymentDetails);

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update payment status",
    });
  }
};

// Submit prescription for an order item
export const submitPrescription = async (req, res) => {
  try {
    const { orderId, orderItemId } = req.params;
    const prescriptionData = req.body;
    console.log(orderId, orderItemId, prescriptionData);

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Use the model method to submit prescription
    await order.submitPrescription(orderItemId, prescriptionData);

    return res.status(200).json({
      success: true,
      message: "Prescription submitted successfully",
      prescription:
        order.orderItems.id(orderItemId).lensCustomization.prescription,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit prescription",
    });
  }
};

// Get prescription details for an order item
export const getPrescriptionDetails = async (req, res) => {
  try {
    const { orderId, orderItemId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const orderItem = order.orderItems.id(orderItemId);

    if (!orderItem) {
      return res.status(404).json({
        success: false,
        message: "Order item not found",
      });
    }

    if (!orderItem.lensCustomization?.prescription) {
      return res.status(404).json({
        success: false,
        message: "No prescription found for this order item",
      });
    }

    return res.status(200).json({
      success: true,
      prescription: orderItem.lensCustomization.prescription,
      message: "Prescription details fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch prescription details",
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.cancelOrder(req.body.reason);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to cancel order",
    });
  }
};

// Delete Order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};
