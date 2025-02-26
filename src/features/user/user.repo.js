import mongoose from "mongoose";
import userSchemas from "./user.schemas.js";
import { ObjectId } from "mongodb";
const UserModel = mongoose.model("users", userSchemas);

export default class UserRepo {
  async register(name, email, password, type) {
    try {
      const newUser = new UserModel({ name, email, password, type });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log("Something went wrong in database register function", error);
    }
  }
  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(
        "Something went wrong in database findByEmail function",
        error
      );
    }
  }
  async getAll() {
    try {
      return await UserModel.find();
    } catch (error) {
      console.log("Something went wrong in database getAll function", error);
    }
  }
  async getOneuser(id) {
    try {
      const user = await UserModel.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      console.log(
        "Something went wrong in database getOneuser function",
        error
      );
    }
  }
  async resetPassword(userId, newPassword) {
    try {
      const user = await UserModel.findOne({ _id: new ObjectId(userId) });
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
}
