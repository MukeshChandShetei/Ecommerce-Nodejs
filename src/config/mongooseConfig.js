import mongoose from "mongoose";
import dotenv from "dotenv";
import categorySchema from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;

const connectUsingMongoose = async () => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB using Mongoose is connected");
        addCategories();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
//when db is connected it will show the default categories like books,shoes
async function addCategories(params) {
  const categoryModel = mongoose.model("Category", categorySchema);
  const categories = await categoryModel.find();
  if (!categories || categories.length == 0) {
    await categoryModel.insertMany([
      { name: "Books" },
      { name: "Clothing" },
      { name: "Electronics" },
    ]);
  }
  console.log("Categories are addded");
}

export default connectUsingMongoose;
