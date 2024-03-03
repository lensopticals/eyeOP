import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required!"],
    },
    date: {
        type: Date,
        required: [true, "Date is required!"],
    },
    paymentId: {
        type: String,
        required: [true, "Payment id is required!"],
    },
    orderId: {
        type: String,
        required: [true, "Order id is required!"],
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
    },
}, { timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);
