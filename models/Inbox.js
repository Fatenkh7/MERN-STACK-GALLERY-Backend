import { Schema, model } from "mongoose";

const inboxSchema = Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: [3, "Your name is too short!"],
      maxLength: [25, "Your name is too long!"],
    },
    lastname: {
      type: String,
      minLength: [3, "Your last name is too short!"],
      maxLength: [25, "Your last name is too long!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your mail"],
      minLength: [20, "Email is too short!"],
      maxLength: [35, "Email is too long!"],
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
      maxLength: [300, "The message is too long!"],
    },
  },
  {
    collection: "Inbox",
  }
);
const Model = model("inbox", inboxSchema);
export default Model;
