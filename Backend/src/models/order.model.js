import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
