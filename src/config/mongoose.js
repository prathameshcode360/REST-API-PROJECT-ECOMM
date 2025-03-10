// import mongoose from "mongoose";

// const url = "mongodb://localhost:27017/ecomdb";

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// export default connectToDatabase;

// import mongoose from "mongoose";

// const url = "mongodb://localhost:27017/ecomdb1";

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("Mongodb connected sucessfully");
//   } catch (error) {
//     console.log("Something went wrong while connecting to databse", error);
//   }
// };

// export default connectToDatabase;

import mongoose from "mongoose";

const url = "mongodb://localhost:27017/ecomdb1";

async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log("Mongodb is connectd sucessfully");
  } catch (error) {
    console.log("Something went wrong while connecting to database", error);
  }
}
export default connectToDatabase;
