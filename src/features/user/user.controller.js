import jwt from "jsonwebtoken";
import UserRepo from "./user.repo.js";
import bcrypt, { hash } from "bcrypt";
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
      return res
        .status(201)
        .send({ msg: "User added successfully", newUser: newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepo.findByEmail(email);

      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }

      // Fix: Await bcrypt.compare
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ msg: "Invalid credentials" }); // Fix: Added return
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "RyHNTbfn8j7InkOJartrslNgkGdCxPWu",
        { expiresIn: "1h" }
      );

      return res.status(200).send(token); // Fix: Wrapped token in an object for better response structure
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
  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      let user = await this.userRepo.getOneuser(id);
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
  async resetPassword(req, res) {
    try {
      const { newPassword } = req.body;
      const userId = req.userId;
      const hashPassword = await bcrypt.hash(newPassword, 12);
      await this.userRepo.resetPassword(userId, hashPassword);
      return res.status(200).send({ msg: "Password updated sucessfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
