//we are importing Mongoclinet which helps to build the connection to Mogodb server
import { MongoClient } from "mongodb";

//client needs to know the address of the databases and store it in a variable(mongodb://localhost:27017/)
//next step is to connenct to the database inside the 27017 here mongodb://localhost:27017/ecomdb
// const url = "mongodb://localhost:27017/ecomdb";

//env

const url = process.env.DB_URL;

//now the url is ready and databases is ready
let client;
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clinetInstance) => {
      client = clinetInstance;
      console.log("Mongodb is connected");
      createCounter(client.db());
      createIndex(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClient = () => {
  return client;
};

export const getDB = () => {
  return client.db();
};

export default connectToMongoDB;

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 1 });
  }
};
const createIndex = async (db) => {
  try {
    // normak=l default index
    await db.collection("products").createIndex({ price: 1 });
    // compound index
    await db.collection("products").createIndex({ name: 1, category: -1 });
    // text index
    await db.collection("products").createIndex({ desc: "text" });
    console.log("Indexes are created");
  } catch (err) {
    console.log(err);
  }
};
