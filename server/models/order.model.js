import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: String,
      required: true,
    },
    cartItems: {
      type: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      }],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
