//Import the products
//third party imports
import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

//file imports
import productrouter from "./src/features/product/product.router.js";
import userRouter from "./src/features/user/user.router.js";
import cartItemRouter from "./src/features/cartitems/cartitems.router.js";
import orderRouter from "./src/features/order/order.router.js";
import likeRouter from "./src/features/likes/likes.router.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import bodyparser from "body-parser";
import connectToMongoDB from "./src/config/mongodb.js";

//since we are importing the json we need to specify the type of file using the keyword assert
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationerror.js";

import mongoose from "mongoose";
import connectUsingMongoose from "./src/config/mongooseConfig.js";

//create the server
const server = express();

//CORS configuration policy
var corsOptions = {
  origin: "http://localhost:5500",
  allowedHeaders: "*",
};

server.use(cors(corsOptions));

//CORS policy configurataion (Access-Control-Allow-Origin)' header
// server.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "http://localhost:5500");

// //   res.header("Access-Control-Allow-Headers", "*");

// //   res.header("Access-Control-Allow-Methods", "*");

// //   //return ok if it is a preflight request

// //   if (req.method == "OPTIONS") {
// //     return res.sendStatus(200);
// //   }

// //   next();
// // });
//setting body parser middleware
server.use(bodyparser.json());

//for all requests realted to the product,redirect to product routes
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
server.use("/api/products", productrouter);
server.use("/api/cart", jwtAuth, cartItemRouter);
server.use("/api/users", userRouter);
server.use("/api/orders", jwtAuth, orderRouter);
server.use("/api/likes", jwtAuth, likeRouter);

//default requesgt handler
server.get("/", (req, res) => {
  res.send("Welcome to E-commerce website");
});

//Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  res.status(500).send("Something went wrong, please try later");
});

//middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send("API not found");
});

server.listen(3300, () => {
  console.log("server is running at 3300");
  connectUsingMongoose();
});
