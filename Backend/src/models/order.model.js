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

    paymentInfo: {
      paymentId: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["credit_card", "UPI", "cash_on_delivery"],
        required: true,
      },
    },
    shippingInfo: {
      name: {
        type: String,
        required: [true, "name of the address holder is required"],
      },
      email: {
        type: String,
        required: [true, "User Email is Required"],
      },
      address: {
        type: String,
        required: [true, "Address is Required"],
      },
      city: {
        type: String,
        required: [true, "City is Required"],
      },
      state: {
        type: String,
        required: [true, "State is Required"],
      },
      country: {
        type: String,
        default: "India",
        required: [true, "country is Required"],
      },
      pincode: {
        type: Number,
        required: [true, "PinCode is Required"],
      },
      phone: {
        type: Number,
        required: [true, "Phone Number is Required"],
      },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
