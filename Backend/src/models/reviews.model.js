import mongoose, { Schema } from "mongoose";
import { Product } from "./product.model.js";

const reviewsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      ref: Product,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: [],
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Reviews = mongoose.model("reviews", reviewsSchema);
