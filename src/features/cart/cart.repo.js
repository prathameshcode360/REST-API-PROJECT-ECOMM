import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb"; // ✅ ObjectId import karna zaroori hai

export default class CartRepository {
  constructor() {
    this.collection = "cartitems";
  }

  async add(userId, productId, quantity) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      // ✅ userId ko ObjectId mein convert karna zaroori hai
      const userObjectId = new ObjectId(userId);

      const newItem = { productId: new ObjectId(productId), quantity };

      // ✅ Update ya create cart document
      await collection.updateOne(
        { userId: userObjectId }, // ObjectId format ka userId
        { $push: { cart: newItem } }, // Cart array mein naye product ko push karna
        { upsert: true } // Agar user ka cart exist nahi karta to naya bana do
      );

      return newItem;
    } catch (err) {
      console.log("Something went wrong in database add cart function", err);
    }
  }
}
