import { Schema, model } from "mongoose";

const Informations = Schema(
  {
    location: {
      type: String,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
  },
  {
    collection: "Informations",
  }
);
const Model = model("informations", Informations);
export default Model;
