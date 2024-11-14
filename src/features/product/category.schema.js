import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
  ],
});

export default categorySchema;
