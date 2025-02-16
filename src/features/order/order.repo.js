import ProductRepo from "../product/product.repo.js";
import CartRepository from "../cart/cart.repo.js";
import { getDb, getClient } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class CartRepo {
  constructor() {
    this.collection = "orders";
    this.cartRepo = new CartRepository();
    this.productRepo = new ProductRepo();
  }

  async placeOrder(userId) {
    const db = getDb();
    const ordersCollection = db.collection("orders");
    const cartsCollection = db.collection(this.cartRepo.collection);
    const productsCollection = db.collection(this.productRepo.collection);

    const client = getClient(); // ✅ Fix: Get client instance
    const session = client.startSession(); // ✅ Fix: Use client to start session

    try {
      session.startTransaction();

      // ✅ Step 1: Get cart items
      const cartData = await cartsCollection
        .aggregate([
          { $match: { userId: new ObjectId(userId) } },
          { $unwind: "$cart" },
          {
            $lookup: {
              from: "products",
              localField: "cart.productId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          { $unwind: "$productDetails" },
          {
            $project: {
              productId: "$productDetails._id",
              name: "$productDetails.name",
              price: "$productDetails.price",
              quantity: "$cart.quantity",
              totalPrice: {
                $multiply: ["$cart.quantity", "$productDetails.price"],
              },
            },
          },
        ])
        .toArray();

      if (cartData.length === 0) {
        throw new Error("Cart is empty. Cannot place order.");
      }

      // ✅ Step 2: Calculate total amount
      const totalAmount = cartData.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      // ✅ Step 3: Create order document
      const order = {
        userId: new ObjectId(userId),
        products: cartData.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        createdAt: new Date(),
      };

      await ordersCollection.insertOne(order, { session });

      // ✅ Step 4: Clear cart
      await cartsCollection.updateOne(
        { userId: new ObjectId(userId) },
        { $set: { cart: [] } },
        { session }
      );

      // ✅ Step 5: Reduce stocks
      for (let item of cartData) {
        const { productId, quantity } = item;
        const product = await productsCollection.findOne({ _id: productId });

        if (!product || product.stocks < quantity) {
          throw new Error(`Not enough stock for ${item.name}`);
        }

        await productsCollection.updateOne(
          { _id: productId },
          { $inc: { stocks: -quantity } },
          { session }
        );
      }

      // ✅ Commit transaction
      await session.commitTransaction();
      session.endSession();

      return { message: "Order placed successfully!", order };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Order placement failed: ${error.message}`);
    }
  }
}
