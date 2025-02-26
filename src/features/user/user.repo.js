import mongoose from "mongoose";
import userSchemas from "./user.schemas.js";

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
}
