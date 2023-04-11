import { Schema, model } from "mongoose";

const reviewSchema = Schema(
  {
    username: {
      type: String,
      minLength: [5, "The userame is too short!"],
      maxLength: [25, "The userame is too long!"],
      required: [true, "Please enter a name"],
    },
    comment: {
      type: String,
      required: [true, "Please enter a comment"],
    },
    poster_id: {
      type: Schema.Types.ObjectId,
      ref: "Poster",
    },
  },
  {
    collection: "Reviews",
  }
);

const Model = model("reviews", reviewSchema);
export default Model;
