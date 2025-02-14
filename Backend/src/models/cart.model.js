import mongoose, { Schema } from "mongoose";

// Lens customization schema
const lensCustomizationSchema = new Schema({
  lensType: {
    id: {
      type: Number,
      required: [true, "Lens type ID is required"],
    },
    title: {
      type: String,
      required: [true, "Lens type title is required"],
    },
    description: String,
  },
  selectedPackage: {
    id: {
      type: Number,
      required: [true, "Lens package ID is required"],
    },
    name: {
      type: String,
      required: [true, "Lens package name is required"],
    },
    price: {
      type: Number,
      required: [true, "Lens package price is required"],
    },
    features: {
      warrantyPeriod: String,
      index: String,
      powerRange: String,
      blueLightBlocker: Boolean,
      antiScratchCoating: Boolean,
      antiGlareCoating: Boolean,
      antiReflectiveCoating: Boolean,
    },
  },
});

// Cart schema
const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    purchaseType: {
      type: String,
      enum: ["FRAME_ONLY", "FRAME_WITH_LENS"],
      required: [true, "Purchase type is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    lensCustomization: {
      type: lensCustomizationSchema,
      required: function () {
        return this.purchaseType === "FRAME_WITH_LENS";
      },
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total price before saving
cartSchema.pre("save", function (next) {
  if (this.purchaseType === "FRAME_ONLY") {
    // For frame only, just multiply product price by quantity
    this.totalPrice = this.product.price * this.quantity;
  } else {
    // For frame with lens, add lens package price
    if (this.lensCustomization && this.lensCustomization.selectedPackage) {
      this.totalPrice =
        (this.product.price + this.lensCustomization.selectedPackage.price) *
        this.quantity;
    }
  }
  next();
});

// Validation middleware
cartSchema.pre("validate", function (next) {
  if (this.purchaseType === "FRAME_WITH_LENS" && !this.lensCustomization) {
    next(
      new Error(
        "Lens customization is required when purchasing frame with lens"
      )
    );
  }
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);
