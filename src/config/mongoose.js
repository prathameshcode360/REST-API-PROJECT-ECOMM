import mongoose from "mongoose";

const url = "mongodb://localhost:27017/ecomdb1";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("Something went wrong while connecting to database", error);
  }
};

export default connectToDatabase;
