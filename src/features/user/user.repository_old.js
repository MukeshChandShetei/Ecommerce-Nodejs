import { ApplicationError } from "../../error-handler/applicationerror.js";
import { getDB } from "../../config/mongodb.js";
class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signUp(newUser) {
    try {
      //get the database
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
      //3. Insert the doument
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async signIn(email, password) {
    try {
      //get the database
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
      //3. Find the document
      return await collection.findOne({ email, password });
    } catch (err) {
      throw new ApplicationError("Something went wrong at credentials", 500);
    }
  }

  async findByEmail(email) {
    try {
      //get the database
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
      //3. Find the document
      return await collection.findOne({ email });
    } catch (err) {
      throw new ApplicationError("Something went wrong at credentials", 500);
    }
  }
}

export default UserRepository;
