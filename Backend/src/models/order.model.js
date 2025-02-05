import mongoose, { Mongoose, Schema } from "mongoose";

const orderSchema = new Schema(
  {
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
      // type: Schema.Types.ObjectId,
      // ref: "Payment",
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

export const Order = mongoose.model("Order", orderSchema);
