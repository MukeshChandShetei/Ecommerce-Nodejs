//Manage routes or paths to Product controller
//import express from express to use router
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

//Intialize Express router
const userRouter = express.Router();

const usercontroller = new UserController();

userRouter.post("/signup", (req, res, next) => {
  usercontroller.signUp(req, res, next);
});

userRouter.post("/signin", (req, res) => {
  usercontroller.signin(req, res);
});

userRouter.post("/resetPassword", jwtAuth, (req, res, next) => {
  usercontroller.resetPassword(req, res, next);
});

export default userRouter;
