import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const product = await this.productRepository.getAll();
      res.status(200).send(product);
    } catch (err) {
      return res.status(500).send("Invalid signup");
    }
  }
  async addProducts(req, res) {
    try {
      const { name, price, category, description } = req.body;
      //for name we pass name,for desc we pass null,
      const newProduct = new ProductModel(
        name,
        description,
        parseFloat(price),
        category
      );

      const createdRecord = await this.productRepository.add(newProduct);
      return res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Invalid addition products");
    }
  }

  async rateProducts(req, res, next) {
    try {
      // we can use this or direct form request(req) const userID = req.query.userID;
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.productRepository.rate(userID, productID, rating);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log(err);
      console.log("Passing error to the appln level middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    //to get the id from the parameters

    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      console.log(product);
      if (!product) {
        res.status(404).send("product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      return res.status(500).send("Invalid signup");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice; //since in query min= x(number) then minprice will be x
      // const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,
        // maxPrice,
        categories
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Cannot fetch the filter data");
    }
  }

  async averagePrice(req, res, next) {
    //it takes the average price of each category
    try {
      const average = await this.productRepository.averagePrice();
      return res.status(200).send(average);
    } catch (err) {
      return res.status(400).send("Cannot get the average price");
    }
  }
}

export default ProductController;
