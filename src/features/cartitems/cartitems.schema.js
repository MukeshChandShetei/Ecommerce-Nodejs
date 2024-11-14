import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  productID: { type: ObjectId, ref: "products" },
  userID: { type: ObjectId, ref: "users" },
  quantity: Number,
});

export default cartItemsSchema;
