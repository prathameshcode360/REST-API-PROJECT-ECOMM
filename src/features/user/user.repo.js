import UserModel from "./user.model.js";
import { getDb } from "../../config/mongodb.js";
export default class UserRepo {
  constructor() {
    this.collection = "users";
  }
  async register(name, email, password) {
    try {
      const db = getDb(); // Get database instance
      const userId = await this.getNextCounter(db); // Get next user ID
      const collection = db.collection(this.collection);

      const newUser = new UserModel(name, email, password, userId); // Assign custom ID
      await collection.insertOne(newUser);

      return newUser;
    } catch (err) {
      console.error("Database error in register function:", err);
    }
  }

  async getNextCounter(db) {
    const result = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "userId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    return result.value?.value; // Ensure it safely accesses the updated value
  }
}
