import UserModel from "./user.model.js";

export default class UserController {
  signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = UserModel.register(name, email, password);
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
        return res.status(200).send({ msg: "login successfully" });
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
