import mongoose, { mongo } from "mongoose";
import userSchema from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationerror.js";

//creating the model from schema
const UserModel = mongoose.model("users", userSchema);

class UserRepository {
  async signUp(user) {
    try {
      //create the instance of model
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      //this error will be shown to the user while we the password is not given correctly
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError("Something went wrong", 500);
      }
    }
  }
  async signIn(email, password) {
    try {
      //create the instance of model
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong at credentials", 500);
    }
  }
  async resetPassword(userID, newPassword) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong at credentials", 500);
    }
  }
}

export default UserRepository;
