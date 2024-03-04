import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
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
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    shippingInfo: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Shipping Information is Required"]
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
