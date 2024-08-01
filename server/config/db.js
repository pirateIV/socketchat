import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Mongodb connected successfully");
  } catch (e) {
    console.log("Error connecting to Mongodb", e.message);
    process.exit(1); // exit the process with failure
  }
};

export default connectDB;
