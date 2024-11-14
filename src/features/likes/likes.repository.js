import mongoose from "mongoose";
import likeSchema from "./likes.schema.js";

import { ObjectId } from "mongodb";
const likeModel = mongoose.model("Likes", likeSchema);

class LikesRepository {
  async getLikes(type, id) {
    return await likeModel
      .find({
        likeable: new ObjectId(id),
        types: type,
      })
      .populate("user")
      .populate({ path: "likeable", model: type });
  }
  async likeProduct(UserID, productID) {
    try {
      const newLike = new likeModel({
        user: new ObjectId(UserID),
        likeable: new ObjectId(productID),
        types: "products",
      });

      await newLike.save();
      return newLike;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async likeCategory(UserID, categoryID) {
    try {
      const newLike = new likeModel({
        user: new ObjectId(UserID),
        likeable: new ObjectId(categoryID),
        types: "categories",
      });
      await newLike.save();
      return newLike;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
export default LikesRepository;
