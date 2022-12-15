import mongoose from "mongoose";
import dev from "./index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
