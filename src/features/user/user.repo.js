import userSchema from "./user.schemas.js";
import mongoose from "mongoose";

const UserModel = mongoose.model("users", userSchema);

export default class UserRepo {
  async register(name, email, password, type) {
    try {
      const newUser = new UserModel({ name, email, password, type });
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error; // Throw the validation error
      } else {
        console.log(
          "Something went wrong in database register function",
          error
        );
        throw new Error("Database error occurred"); // Generic error
      }
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      console.log("Something went wrong in databse findbyemail function");
    }
  }
  async resetPassword(userId, newPassword) {
    try {
      //   await UserModel.findByIdAndUpdate(userId, { password: newPassword });
      // 2.second approach
      const user = await UserModel.findById({ _id: userId });
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(
        "Something went wrong in database resetPassword function",
        error
      );
    }
  }
  async getAll() {
    try {
      return UserModel.find().toArray();
    } catch (error) {
      console.log("Something went wrong in databse getAll function", error);
    }
  }
}
