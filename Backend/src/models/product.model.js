import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required!"],
    },

    modelNo: {
      type: String,
      required: [true, "Model number is required!"],
    },

    images: [
      {
        type: String,
        required: [true, "Product images are required!"],
      },
    ],

    thumbnail: {
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

    category: {
      type: String,
    },

    stock: {
      type: Number,
      default: 1,
    },

    skuId: {
      type: String,
      required: [true, "Stock Unit ID is required!"],
    },

    productType: {
      type: String,
      required: [true, "Product type is required!"],
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex", "kids"],
    },
    collection: {
      type: String,
      required: [true, "Collection is required!"],
    },

    frame: {
      material: {
        type: String,
        enum: ["Acetate", "Metal", "TR90", "Other"],
        required: [true, "Frame material is required"],
      },
      color: [
        {
          name: {
            type: String,
            required: [true, "Frame color name is required"],
          },
          colorCode: {
            type: String,
            required: [true, "Frame color code is required"],
          },
        },
      ],
      shape: {
        type: String,
        required: [true, "Frame shape is required"],
      },
      style: {
        type: String,
        required: [true, "Frame style is required"],
      },
      size: {
        type: String,
        enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"],
        required: [true, "Size of product is required!"],
      },
      measurement: {
        type: String,
        required: [true, "Frame width is required"],
      },
      dimensions: {
        bridgeWidth: {
          type: String,
          required: [true, "Bridge width is required"],
        },
        templeLength: {
          type: String,
          required: [true, "Temple width is required"],
        },
        lensWidth: {
          type: String,
        },
        lensHeight: {
          type: String,
        },
      },
    },

    ageGroup: {
      type: String,
      enum: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      required: [true, "Frame age group is required"],
    },

    weight: {
      type: Number,
      required: [true, "Frame weight is required"],
    },

    brand: {
      type: String,
      required: [true, "Brand of product is required!"],
    },

    seller: {
      type: String,
      required: [true, "Seller of product is required!"],
    },

    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("product", productSchema);
