import { Schema, model } from "mongoose";
const posterSchema = Schema(
  {
    description: {
      type: String,
      default: "",
      maxLength: [255, "The description is too long!"],
    },
    image: {
      type: String,
      required: "image is required",
    },
    title: {
      type: String,
      maxLength: [35, "title is too long!"],
      required: "Why no title?",
    },
    position: {
      type: Number,
      require: [true, "The position is require"],
      max: [2, "This number not available, Please choose 1:Home or 2:Gallery"],
      enum: {
        values: [1, 2],
        message: "Please choose 1:Home or 2:Gallery.",
      },
    },
    date: {
      created: { type: Date, default: Date.now },
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    categories_id: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Poster",
  }
);
const Model = model("poster", posterSchema);
export default Model;
