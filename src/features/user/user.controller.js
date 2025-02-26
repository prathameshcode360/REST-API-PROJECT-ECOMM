// import UserModel from "./user.model.js";
import UserRepo from "./user.repo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export default class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userRepo.register(
        name,
        email,
        hashPassword,
        type
      );
      return res.status(201).send({ msg: "User added successfully", newUser });
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ msg: err.message, errors: err.errors });
      }
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return res.status(404).send({
          msg: "User not found",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          "RyHNTbfn8j7InkOJartrslNgkGdCxPWu",
          { expiresIn: "1h" }
        );
        return res.status(200).send(token);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }

  async resetPassword(req, res) {
    try {
      const { newPassword } = req.body;
      const userId = req.userId;
      const hashPassword = await bcrypt.hash(newPassword, 12);
      await this.userRepo.resetPassword(userId, hashPassword);
      return res.status(200).send({ msg: "password reset successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }

  async getUsers(req, res) {
    try {
      let users = await this.userRepo.getAll();
      return res.status(200).send({ msg: "users", users: users });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
  }

  getOneUser(req, res) {
    try {
      const id = req.params.id;
      let user = UserModel.getOne(id);
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      } else {
        return res.status(200).send({ msg: "user", user: user });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
