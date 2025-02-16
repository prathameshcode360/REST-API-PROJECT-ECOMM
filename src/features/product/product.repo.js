import ProductModel from "./product.model.js";
import { getDb } from "../../config/mongodb.js";
import UserRepo from "../user/user.repo.js";
import { ObjectId } from "mongodb";
export default class ProductRepo {
  constructor() {
    this.collection = "products";
    this.userRepo = new UserRepo();
  }

  async add(name, price, image, category, stocks) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const newProduct = new ProductModel(name, price, image, category, stocks);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.error("Database error in add function:", err);
    }
  }
  async getAll() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.error("Database error in getAll function:", err);
    }
  }
  async getOne(_id) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const product = await collection.findOne({ _id: new ObjectId(_id) });
      return product;
    } catch (err) {
      console.error("Database error in getOne function:", err);
    }
  }
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      let filterExpression = {};

      if (minPrice || maxPrice) {
        filterExpression.price = {};
        if (minPrice) {
          filterExpression.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
          filterExpression.price.$lte = parseFloat(maxPrice);
        }
      }

      if (category) {
        filterExpression.category = category;
      }

      const result = await collection.find(filterExpression).toArray();
      return result;
    } catch (err) {
      console.error("Something went wrong in database filter function:", err);
    }
  }

  async rate(userId, productId, rating) {
    try {
      const db = getDb();
      const collection = db.collection("products");

      // 1. Validate user
      const userCollection = db.collection("users");
      const user = await userCollection.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return { error: "User not found" };
      }

      // 2. Validate product
      const product = await collection.findOne({
        _id: new ObjectId(productId),
      });
      if (!product) {
        return { error: "Product not found" };
      }

      // 3. Initialize ratings array if not exists
      if (!product.ratings) {
        product.ratings = [];
      }

      // 4. Check if user has already rated the product
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId.toString() === userId
      );

      if (existingRatingIndex !== -1) {
        // If rating exists, update it
        product.ratings[existingRatingIndex].rating = rating;
      } else {
        // Otherwise, add a new rating
        product.ratings.push({ userId: new ObjectId(userId), rating });
      }

      // 5. Update the product in the database
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $set: { ratings: product.ratings } }
      );

      return { message: "Rating updated successfully" };
    } catch (err) {
      console.error("Something went wrong in database rate function:", err);
    }
  }
}
