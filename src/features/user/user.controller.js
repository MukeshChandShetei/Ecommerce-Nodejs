import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationerror.js";
import bcrypt from "bcrypt";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }
  async signin(req, res) {
    try {
      //1.find the user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("No user with this email");
      } else {
        //2.compare the password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          //3.create the token and send the token
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          //4.send the token
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect credentials");
        }
      }
    } catch (err) {
      next(err);
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const userID = req.userID;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is reset");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
}
export default UserController;
