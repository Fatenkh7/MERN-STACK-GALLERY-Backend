import { Schema, model } from "mongoose";

const adminSchema = Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: [3, "the first name is too short!"],
      maxLength: [25, "the first name is too long!"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
      minLength: [3, "the lastname is too short!"],
      maxLength: [25, "the lastname is too long!"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your user name"],
      minLength: [6, "the userame is too short!"],
      maxLength: [25, "the userame is too long!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your mail"],
      minLength: [15, "the mail is too short!"],
      maxLength: [35, "the mail is too long!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "the password is too short!"],
      maxLength: [80, "the password is too long!"],
    },
  },
  {
    collection: "Admin",
  }
);
const Model = model("admin", adminSchema);
export default Model;
