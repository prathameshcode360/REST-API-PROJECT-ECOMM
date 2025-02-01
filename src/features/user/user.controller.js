import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserModel.register(name, email, password);
      return res
        .status(201)
        .send({ msg: "User added successfully", newUser: newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = UserModel.login(email, password);
      if (!user) {
        return res.status(400).send({
          msg: "invalid Credentials",
        });
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
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
  getUsers(req, res) {
    try {
      let users = UserModel.getAll();
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
