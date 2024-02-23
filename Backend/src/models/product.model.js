import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
  },

  modelNo:{
    type: String,
    required: [true, "Model number is required!"],
  },

  images: [
    {
        url:{
          type: String,
          required: [true, "Product images are required!"],
        }
    },
  ],
 
  thumbNail: {
    type: String,
    required: [true, "Thumbnail image of product is required!"],
  },

  description: {
    type: String,
  },

  rating: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, "Product price is required!"],
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    default: 1,
  },

  category: {
    type: String,
  },

  tag: {
    type: String,
  },

  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex'],
  },

  frame: {
    material: {
      type: String,
      enum: ['Acetate', 'Metal', 'TR90', 'Other'],
      required: [true, 'Frame material is required'],
    },
    color: {
      type: String,
      required: [true, 'Frame color is required'],
    },
    shape:{
      type: String,
      required: [true, 'Frame shape is required'],
    },
    style:{
      type: String,
      required: [true, 'Frame style is required'],
    },
    size:{
      type: String,
      enum: ['Extra Narrow','Narrow','Medium','Wide','Extra Wide'],
      required: [true, "Size of product is required!"],
    },
    rimType: {
      type: String,
      enum: ['Full-rim', 'Semi-rim', 'Rimless'],
      required: [true, 'Frame rim-type is required'],
    },
    width:{
      type: Number,
      required: [true, 'Frame width is required'],
    },
    ageGroup: {
      type: String,
      required: [true, 'Frame age group is required'],
    },
  },

  brand: {
    type: String,
    required: [true, "Brand of product is required!"],
  },

  seller: {
    type: String,
    required: [true, "Seller of product is required!"],
  },

},{timestamps:true});

export const Product = mongoose.model("product", productSchema);

