import { Schema, model } from "mongoose";

const categoriesSchema = Schema(
  {
    category: {
      type: String,
      maxLength: [35, "category is too long!"],
      required: "Why no categories?",
    },
  },
  {
    collection: "Categories",
  }
);
const Model = model("categories", categoriesSchema);
export default Model;
