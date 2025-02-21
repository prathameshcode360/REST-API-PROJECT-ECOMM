import mongoose from "mongoose";

const url = "mongodb://localhost:27017/ecomdb";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
