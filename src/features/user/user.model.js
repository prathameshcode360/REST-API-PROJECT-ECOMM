import { getDb } from "../../config/mongodb.js";
export default class UserModel {
  constructor(name, email, password, _id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this._id = _id;
  }
  static async register(name, email, password) {
    try {
      const db = getDb();
      const collection = db.collection("users");
      const newUser = new UserModel(name, email, password);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log("Database error in register function:", err);
    }
  }
  static login(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getOne(id) {
    const user = users.find((u) => u.id == id);
    return user;
  }

  static getAll() {
    return users;
  }
}
let users = [
  new UserModel(1, "user1", "user1@gmail.com", "pass123"),
  new UserModel(2, "user2", "user2@gmail.com", "pass456"),
  new UserModel(3, "user3", "user3@gmail.com", "pass789"),
  new UserModel(4, "user4", "user4@gmail.com", "pass101"),
  new UserModel(5, "user5", "user5@gmail.com", "pass202"),
];
