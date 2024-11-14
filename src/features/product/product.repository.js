import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationerror.js";
import mongoose from "mongoose";
import prodcutSchema from "./product.schema.js";
import reviewSchema from "./review.schema.js";
import categorySchema from "./category.schema.js";

const ProductModel = mongoose.model("product", prodcutSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);
class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  //add product
  async add(productData) {
    try {
      //add the product
      console.log(productData);
      productData.categories = productData.category
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();
      console.log(productData);
      //update the categories
      await CategoryModel.updateMany(
        //it will take the categories(which are ids and store it in the _id)
        { _id: { $in: productData.categories } },
        {
          //next using push we are going to push the id's in the category into the product array which is present in the
          $push: { products: new ObjectId(savedProduct._id) },
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  //get All products
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  //get One product
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  //filter product
  //product should have minprice and category specified if both matches then the matched document return
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterexpression = {};
      if (minPrice) {
        filterexpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //   filterexpression.price = {
      //     ...filterexpression.price,
      //     $lte: parseFloat(maxPrice),
      //   };
      // }
      categories = JSON.parse(categories.replace(/'/g, '"'));
      if (categories) {
        filterexpression = {
          $or: [{ category: { $in: categories } }, filterexpression],
        };
        // filterexpression.category = category;
      }
      return await collection
        .find(filterexpression)
        .project({ name: 1, price: 1, ratings: { $slice: 1 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rate(userID, productID, rating) {
    try {
      //1. check if product exists
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      // Get the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async averagePrice() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection
        .aggregate([
          {
            //1.stage1 : Get average price per category
            $group: { _id: "$category", averagePrice: { $avg: "$price" } },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
export default ProductRepository;
