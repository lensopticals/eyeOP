const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
  },
  images: {
    type: Array,
    required: [true, "Product images are required!"],
  },
  thumbNail: {
    type: String,
    required: [true, "Thumbnail image of product is required!"],
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, "Product price is required!"],
  },
  discountPercentage: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: [true, "Brand of product is required!"],
  },
  category: {
    type: String,
  },
  atc: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
