import UserRepo from "./user.repo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userRepo.register(name, email, hashPassword);
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

      // Fetch user from DB
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ msg: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).send(token);
    } catch (err) {
      console.error("Sign-in error:", err);
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
      const _id = req.params._id;
      let user = await this.userRepo.getOne(_id);
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
