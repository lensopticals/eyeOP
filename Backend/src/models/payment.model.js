import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({}, { timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);
