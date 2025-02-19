import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
export default class CartRepo {
  constructor() {
    this.collection = "cartitems";
  }
  async add(userId, productId, quantity) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      const newItem = {
        productId: new ObjectId(productId),
        quantity: quantity,
      };
      await collection.updateOne(
        { userId: new ObjectId(userId) },
        {
          $push: { cart: newItem },
        },
        {
          upsert: true,
        }
      );
      return newItem;
    } catch (err) {
      console.log("Error in database cart add function", err);
    }
  }
  async getAll(userId) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const cart = await collection.findOne({ userId: new ObjectId(userId) });
      return cart;
    } catch (err) {
      console.log("Error in database cart gett all function", err);
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
        (p) => p.productId.toString() === productId
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
  async deleteCart(userId) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      const result = await collection.deleteOne({
        userId: new ObjectId(userId),
      });

      if (result.deletedCount > 0) {
        // Use deletedCount instead of modifiedCount
        return "User cart deleted successfully";
      } else {
        return "Cart not found or already deleted";
      }
    } catch (err) {
      console.log("Something went wrong in delete cart function", err);
    }
  }
}
