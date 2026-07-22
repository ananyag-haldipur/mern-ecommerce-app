import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },

    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    }
  }
],

    shippingAddress: {
  fullName: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
},

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);