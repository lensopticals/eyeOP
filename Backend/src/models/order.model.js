import mongoose, { Schema } from "mongoose";

// New Prescription Schema
const prescriptionSchema = new Schema(
  {
    rightEye: {
      sphere: {
        type: Number,
        required: false,
      },
      cylinder: {
        type: Number,
        required: false,
      },
      axis: {
        type: Number,
        required: false,
      },
    },
    leftEye: {
      sphere: {
        type: Number,
        required: false,
      },
      cylinder: {
        type: Number,
        required: false,
      },
      axis: {
        type: Number,
        required: false,
      },
    },
    pupillaryDistance: {
      type: Number,
      required: false,
    },
    prescriptionImage: {
      type: String,
      required: false,
    },
    doctorName: {
      type: String,
      required: false,
    },
    clinicName: {
      type: String,
      required: false,
    },
    prescriptionDate: {
      type: Date,
      required: false,
    },
    submittedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

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
  prescription: {
    type: prescriptionSchema,
    required: function () {
      return this.parent().purchaseType === "FRAME_WITH_LENS";
    },
  },
});

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        purchaseType: {
          type: String,
          enum: ["FRAME_ONLY", "FRAME_WITH_LENS"],
          required: true,
          default: "FRAME_ONLY",
        },
        lensCustomization: {
          type: lensCustomizationSchema,
          required: function () {
            return this.purchaseType === "FRAME_WITH_LENS";
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        lensPrice: {
          type: Number,
          default: 0,
        },
        total: {
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
    shippingCharge: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "RAZORPAY",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    paymentId: {
      type: String,
      required: false, // Changed to false since it won't be available when order is first created
    },
    shippingInfo: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Shipping Information is Required"],
    },
    paymentAttempts: [
      {
        attemptId: String,
        paymentId: String,
        amount: Number,
        status: {
          type: String,
          enum: ["PENDING", "SUCCESS", "FAILED"],
        },
        failureReason: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cancelReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate orderId and calculate totals
orderSchema.pre("save", function (next) {
  // Generate orderId if it doesn't exist
  if (!this.orderId) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.orderId = `ORD${timestamp}${random}`;
  }

  // Calculate total amount
  this.totalAmount =
    this.orderItems.reduce((total, item) => {
      return total + item.total;
    }, 0) +
    this.shippingCharge +
    this.deliveryCharge;

  next();
});

// Validation middleware
orderSchema.pre("validate", function (next) {
  // Validate lens customization for FRAME_WITH_LENS items
  const invalidItems = this.orderItems.filter(
    (item) => item.purchaseType === "FRAME_WITH_LENS" && !item.lensCustomization
  );

  if (invalidItems.length > 0) {
    next(new Error("Lens customization is required for frame with lens items"));
    return;
  }

  next();
});

// Method to submit prescription for an order item
orderSchema.methods.submitPrescription = async function (
  orderItemId,
  prescriptionData
) {
  const orderItem = this.orderItems.id(orderItemId);
  if (!orderItem) {
    throw new Error("Order item not found");
  }

  if (orderItem.purchaseType !== "FRAME_WITH_LENS") {
    throw new Error("Prescription not required for frame-only purchase");
  }

  orderItem.lensCustomization.prescription = {
    ...prescriptionData,
    status: "SUBMITTED",
    submittedAt: new Date(),
  };

  return this.save();
};

// Method to update payment status
orderSchema.methods.updatePaymentStatus = async function (
  status,
  paymentDetails
) {
  this.paymentStatus = status;

  if (paymentDetails) {
    this.paymentAttempts.push({
      attemptId: paymentDetails.attemptId,
      paymentId: paymentDetails.paymentId,
      amount: paymentDetails.amount,
      status: status,
      failureReason: paymentDetails.failureReason,
    });

    if (status === "SUCCESS") {
      this.paymentId = paymentDetails.paymentId;
      this.orderStatus = "CONFIRMED";
    }
  }

  return this.save();
};

// Method to cancel order
orderSchema.methods.cancelOrder = async function (reason) {
  if (this.orderStatus === "SHIPPED" || this.orderStatus === "DELIVERED") {
    throw new Error("Cannot cancel order after shipping");
  }

  this.orderStatus = "CANCELLED";
  this.cancelReason = reason;
  return this.save();
};

export const Order = mongoose.model("Order", orderSchema);
