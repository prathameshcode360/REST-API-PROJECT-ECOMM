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

  async getAll(userId) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      // ✅ Use findOne() because only one cart exists per user
      const cart = await collection.findOne({ userId: new ObjectId(userId) });

      return cart ? cart.cart : []; // ✅ If cart exists, return items; else, return empty array
    } catch (err) {
      console.log(
        "Something went wrong in database get cart items function",
        err
      );
    }
  }

  async update(userId, productId, quantity) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      // 1.check users cart is available or not
      const userCart = await collection.findOne({
        userId: new ObjectId(userId),
      });
      if (!userCart) {
        return { msg: "cart not found" };
      }

      //2.check the product is available or not
      const productIndex = userCart.cart.findIndex(
        (p) => p.productId == productId
      );
      if (productIndex === -1) {
        return { msg: "Product not found" };
      }
      // 3.update the quantity if product is available
      userCart.cart[productIndex].quantity = quantity;
      await collection.updateOne(
        {
          userId: new ObjectId(userId),
          "cart.productId": new ObjectId(productId),
        },
        {
          $set: { "cart.$.quantity": quantity },
        }
      );
      return { msg: "cart update sucessfully" };
    } catch (err) {
      console.log("Something went wrong in update cart function", err);
    }
  }

  async delete(userId, productId) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      // Remove the specific product from the cart array
      const result = await collection.updateOne(
        { userId: new ObjectId(userId) }, // Find the user's cart
        { $pull: { cart: { productId: new ObjectId(productId) } } } // Remove matching product
      );

      if (result.modifiedCount === 0) {
        return { msg: "Product not found in cart" };
      }

      return { msg: "Product removed from cart" };
    } catch (err) {
      console.log("Something went wrong in delete cart function", err);
    }
  }
}
