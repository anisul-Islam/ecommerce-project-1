import { Schema, model } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      uniqe: true,
      required: [true, "category name is required"],
      minlength: [3, "minimum length is 3"],
      maxlength: [31, "maximum length is 31"],
    },
    slug: {
      type: String,
      lowercase: true,
      uniqe: true,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);
export default Category;
