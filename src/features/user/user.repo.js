import UserModel from "./user.model.js";
import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class UserRepo {
  constructor() {
    this.collection = "users";
  }
  async register(name, email, password) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const newUser = new UserModel(name, email, password);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.error("Database error in register function:", err);
    }
  }
  async login(email, password) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const user = await collection.findOne({ email, password });
      return user;
    } catch (err) {
      console.error("Database error in login function:", err);
    }
  }
  async getOne(_id) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const user = await collection.findOne({ _id: new ObjectId(_id) });
      return user;
    } catch (err) {
      console.error("Database error in getOne function:", err);
    }
  }
  async getAll() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      return collection.find().toArray();
    } catch (err) {
      console.error("Database error in getAll function:", err);
    }
  }
}
