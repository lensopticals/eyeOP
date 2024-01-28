import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Name of the address holder is required"],
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
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
