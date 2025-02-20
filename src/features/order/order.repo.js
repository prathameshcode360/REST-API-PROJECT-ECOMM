import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class OrderRepo {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId, productId) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      // 1. Getting cart items and calculating total amount
      const result = await this.getTotalAmount(userId, productId);
      if (!result.length) {
        throw new Error("Cart item not found for this user and product");
      }

      // 2. Check if enough stock is available
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(productId) });

      if (!product || product.stocks < result[0].cart.quantity) {
        throw new Error("Not enough stock available");
      }

      // 3. Creating new record for order
      const newOrder = {
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        productInfo: {
          name: result[0].productInfo.name,
          price: result[0].productInfo.price,
          category: result[0].productInfo.category,
        },
        quantity: result[0].cart.quantity,
        totalAmount: result[0].totalAmount,
        orderDate: new Date(),
        status: "pending",
      };

      await collection.insertOne(newOrder);

      // 4. Reduce the stock of the product
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(productId) },
          { $inc: { stocks: -result[0].cart.quantity } }
        );

      // 5. Remove product from cart
      await db
        .collection("cartitems")
        .updateOne(
          { userId: new ObjectId(userId) },
          { $pull: { cart: { productId: new ObjectId(productId) } } }
        );
      return newOrder;
    } catch (err) {
      throw new Error("Database error in placeOrder: " + err.message);
    }
  }

  async getTotalAmount(userId, productId) {
    try {
      const db = getDb();
      const result = await db
        .collection("cartitems")
        .aggregate([
          {
            $match: {
              userId: new ObjectId(userId),
              cart: {
                $elemMatch: { productId: new ObjectId(productId) },
              },
            },
          },
          { $unwind: "$cart" },
          {
            $lookup: {
              from: "products",
              localField: "cart.productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          { $unwind: "$productInfo" },
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$cart.quantity"],
              },
            },
          },
        ])
        .toArray();

      return result;
    } catch (err) {
      throw new Error("Error in getTotalAmount: " + err.message);
    }
  }
}
