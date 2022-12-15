import { Schema, model } from "mongoose";
const orderSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
