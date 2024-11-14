import express from "express";

import CartItemController from "./cartitems.controller.js";

const cartItemRouter = express.Router();

const cartItemcontroller = new CartItemController();

cartItemRouter.delete("/:id", (req, res) => {
  cartItemcontroller.delete(req, res);
});
cartItemRouter.post("/", (req, res) => {
  cartItemcontroller.add(req, res);
});
cartItemRouter.get("/", (req, res) => {
  cartItemcontroller.get(req, res);
});

export default cartItemRouter;
