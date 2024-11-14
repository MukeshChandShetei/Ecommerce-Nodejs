import { ApplicationError } from "../../error-handler/applicationerror.js";
import UserModel from "../user/user.model.js";
class ProductModel {
  constructor(name, desc, price, category, id) {
    //id,name,desc,price,imageUrl,category,size
    (this._id = id),
      (this.name = name),
      (this.desc = desc),
      (this.price = price),
      (this.category = category);
  }
  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const getProduct = products.find((ids) => ids.id == id);
    return getProduct;
  }
  static getAll() {
    return products;
  }

  static filters(minPrice, maxPrice, category) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    const result = products.filter((product) => {
      return (
        (!min || product.price >= min) &&
        (!max || product.price <= max) &&
        (!category || product.category == category)
      );
    });

    return result;
  }

  static rateProduct(userID, productID, rating) {
    //validate user and product
    const user = UserModel.getAll().find((u) => u.id == userID);
    console.log(user);
    if (!user) {
      //user defined error
      throw new ApplicationError("Users not found", 404);
    }
    //validate product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError("Product not found", 400);
    }

    //check if there are any ratings and if not add ratings array
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, rating: rating });
    }

    //updating the given ratings
    else {
      //check if user rating is already available
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userID == userID
      );
      if (existingRating >= 0) {
        product.ratings[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      } //if there is no existing rating add new rating
      else {
        product.ratings.push({ userID: userID, rating: rating });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 10",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1"
  ),

  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    ["M", "XL", "S"]
  ),
];

export default ProductModel;
