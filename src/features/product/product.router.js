//Manage routes or paths to Product controller
//import express from express to use router
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";

//Intialize Express router
const productrouter = express.Router();

const productcontroller = new ProductController();
//all the paths to controller methods
//all the requests coming here it already has the /api/product next one will be coming here
productrouter.get("/", (req, res) => {
  productcontroller.getAllProducts(req, res);
});
//filter products
//localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productrouter.post("/rate", (req, res, next) => {
  productcontroller.rateProducts(req, res, next);
});
productrouter.get("/filter", (req, res) => {
  productcontroller.filterProducts(req, res);
});
productrouter.post("/", upload.single("imageUrl"), (req, res) => {
  productcontroller.addProducts(req, res);
});
productrouter.get("/averagePrice", (req, res, next) => {
  productcontroller.averagePrice(req, res);
});
productrouter.get("/:id", (req, res) => {
  productcontroller.getOneProduct(req, res);
});

export default productrouter;
