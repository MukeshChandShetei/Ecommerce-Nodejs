import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "types",
  },
  types: {
    type: String,
    enum: ["products", "categories"],
  },
})
  .pre("save", (next) => {
    console.log("New Like coming in");
    next();
  })
  .post("save", () => {
    console.log("Like is saved");
  })
  .pre("find", (next) => {
    console.log("Retriving likes");
    next();
  })
  .post("find", (docs) => {
    console.log("find is completed");
    console.log(docs);
  });

export default likeSchema;
