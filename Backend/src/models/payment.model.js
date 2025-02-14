import mongoose, { Schema } from "mongoose";

// Create a sub-schema for items in the payment
const paymentItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: 1,
  },
  purchaseType: {
    type: String,
    enum: ["FRAME_ONLY", "FRAME_WITH_LENS"],
    required: [true, "Purchase type is required"],
  },
  lensCustomization: {
    lensType: {
      id: Number,
      title: String,
      description: String,
    },
    selectedPackage: {
      id: Number,
      name: String,
      price: Number,
      features: {
        warrantyPeriod: String,
        index: String,
        powerRange: String,
        blueLightBlocker: Boolean,
        antiScratchCoating: Boolean,
        antiGlareCoating: Boolean,
        antiReflectiveCoating: Boolean,
      },
    },
  },
  itemPrice: {
    type: Number,
    required: [true, "Item price is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
});

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    items: [paymentItemSchema],
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["CARD", "UPI", "NET_BANKING", "WALLET", "RAZORPAY"],
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
    },
    status: {
      type: String,
      required: [true, "Payment status is required"],
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "CANCELLED"],
      default: "PENDING",
    },
    gatewayResponse: {
      type: Schema.Types.Mixed,
      default: null,
    },
    failureReason: {
      type: String,
      default: null,
    },
    refundDetails: {
      refundId: String,
      refundDate: Date,
      refundAmount: Number,
      refundReason: String,
      refundStatus: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
      },
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    // Add indexes for frequently queried fields
    indexes: [
      { userId: 1 },
      { transactionId: 1 },
      { orderId: 1 },
      { status: 1 },
      { createdAt: -1 },
    ],
  }
);

// Pre-save middleware to calculate total amount
paymentSchema.pre("save", function (next) {
  if (this.isModified("items") || this.isNew) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);

    // Calculate final total amount
    this.totalAmount = this.subtotal + this.tax + this.shipping - this.discount;
  }
  next();
});

// Method to update payment status
paymentSchema.methods.updateStatus = async function (status, details = {}) {
  this.status = status;

  if (details.gatewayResponse) {
    this.gatewayResponse = details.gatewayResponse;
  }

  if (details.failureReason) {
    this.failureReason = details.failureReason;
  }

  if (status === "REFUNDED" && details.refund) {
    this.refundDetails = {
      refundId: details.refund.id,
      refundDate: new Date(),
      refundAmount: details.refund.amount,
      refundReason: details.refund.reason,
      refundStatus: details.refund.status,
    };
  }

  return this.save();
};

// Static method to get payment history for a user
paymentSchema.statics.getUserPaymentHistory = function (userId) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .populate("items.product")
    .select("-gatewayResponse -metadata");
};

export const Payment = mongoose.model("Payment", paymentSchema);
