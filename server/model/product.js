import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [3, "minimum length of product is 3"],
      maxlength: [200, "maximum length of product is 200"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minlength: [5, "minimum length of product is 5"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // refer to the Category Model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
