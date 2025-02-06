import mongoose, { Mongoose, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    orderItems: [
      {
        product: {},
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingCharge: {
      type: Number,
      default: 0
    },
    deliveryCharge: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Pay on delivery", "online"],
      default: "Pay on delivery"
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentId: {
      type: String,
      required: [true, "Payment id is required!"],
    },
    shippingInfo: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Shipping Information is Required"],
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate a unique orderId if it doesn't exist
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = `ORD${Date.now()}`;
  }
  next();
});

export const Order = mongoose.model("Order", orderSchema);
