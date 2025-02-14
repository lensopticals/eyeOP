import { Payment } from "../models/payment.model.js";
import { Cart } from "../models/cart.model.js";

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const {
      orderId,
      transactionId,
      paymentMethod,
      shippingAddress,
      totalAmount,
      status,
      items,
      tax = 0,
      shipping = 0,
      discount = 0,
    } = req.body;
    // Validate required fields
    if (!orderId || !transactionId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Order ID, transaction ID, and payment method are required!",
      });
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    // Create payment record
    const payment = await Payment.create({
      userId: req.user._id,
      items,
      subtotal,
      totalAmount,
      tax,
      shipping,
      discount,
      paymentMethod,
      transactionId,
      orderId,
      status: status || "PENDING",
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: "Payment initiated successfully!",
      payment,
    });
  } catch (error) {
    console.error("Error in createPayment:", error);
    res.status(500).json({
      success: false,
      message: "Error creating payment",
      error: error.message,
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status, gatewayResponse, failureReason, refund } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    await payment.updateStatus(status, {
      gatewayResponse,
      failureReason,
      refund,
    });

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully!",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payment status",
      error: error.message,
    });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("items.product")
      .populate("userId", "name email");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    // Check if user is authorized to view this payment
    if (
      payment.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this payment",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payment",
      error: error.message,
    });
  }
};

// Get payments for logged-in user
export const getUserPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    let query = { userId: req.user._id };
    if (status) {
      query.status = status;
    }

    const payments = await Payment.getUserPaymentHistory(req.user._id)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      success: true,
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user payments",
      error: error.message,
    });
  }
};

// Get all payments (Admin only)
export const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let query = {};

    // Add filters
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const payments = await Payment.find(query)
      .populate("userId", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Payment.countDocuments(query);

    const summary = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
          successfulPayments: {
            $sum: { $cond: [{ $eq: ["$status", "SUCCESS"] }, 1, 0] },
          },
          failedPayments: {
            $sum: { $cond: [{ $eq: ["$status", "FAILED"] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      payments,
      summary: summary[0] || null,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};

// Initiate refund
export const initiateRefund = async (req, res) => {
  try {
    const { refundReason } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    if (payment.status !== "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Can only refund successful payments",
      });
    }

    // Add your payment gateway refund logic here
    // const refundResponse = await paymentGateway.initiateRefund(payment.transactionId);

    await payment.updateStatus("REFUNDED", {
      refund: {
        id: "REF_" + Date.now(),
        amount: payment.totalAmount,
        reason: refundReason,
        status: "PENDING",
      },
    });

    res.status(200).json({
      success: true,
      message: "Refund initiated successfully!",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initiating refund",
      error: error.message,
    });
  }
};

// Delete a payment (Admin only)
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    if (payment.status === "SUCCESS" || payment.status === "REFUNDED") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete completed payments",
      });
    }

    await payment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting payment",
      error: error.message,
    });
  }
};
