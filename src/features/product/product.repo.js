import ProductModel from "./product.model.js";
import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class ProductRepo {
  constructor() {
    this.collection = "products";
  }

  async add(name, price, image, category) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const newProduct = new ProductModel(name, price, image, category);
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
      }
      if (minPrice) {
        filterExpression.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filterExpression.price.$lte = parseFloat(maxPrice);
      }
      if (category) {
        filterExpression.category = category;
      }
      const result = await collection.find(filterExpression).toArray();
      return result;
    } catch (err) {
      console.log("Error occures in databse filter function", err);
    }
  }
  // async rate(userId, productId, rating) {
  //   try {
  //     const db = getDb();
  //     const collection = db.collection(this.collection);

  //     // 1.check user is valid or not
  //     const userCollection = db.collection("users");
  //     const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  //     if (!user) {
  //       return "user not found";
  //     }

  //     // 2.check product is valid or not
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productId),
  //     });
  //     if (!product) {
  //       return "product not found";
  //     }
  //     // 3.intializing the rating array if it is not present
  //     if (!product.ratings) {
  //       product.ratings = [];
  //     }

  //     const existingRatingIndex = product.ratings.findIndex(
  //       (r) => r.userId.toString() == userId
  //     );
  //     if (existingRatingIndex !== -1) {
  //       product.ratings[existingRatingIndex].rating = rating;
  //     } else {
  //       product.ratings.push({ userId: new ObjectId(userId), rating: rating });
  //     }
  //     await collection.updateOne(
  //       {
  //         _id: new ObjectId(productId),
  //       },
  //       {
  //         $set: { ratings: product.ratings },
  //       }
  //     );
  //     return "ratings updated successfully";
  //   } catch (err) {
  //     console.log("Error in database rate product function", err);
  //   }
  // }

  // 2.second approch to avoid race condition and according to lecure code
  async rate(userId, productId, rating) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);

      // 1. Check if product exists
      const product = await collection.findOne({
        _id: new ObjectId(productId),
      });
      if (!product) return "product not found";

      // 2. Remove existing rating (if any)
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $pull: { ratings: { userId: new ObjectId(userId) } } } // Remove old rating by the same user
      );

      // 3. Add new rating
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $push: { ratings: { userId: new ObjectId(userId), rating } } } // Push updated rating
      );

      return "rating updated successfully";
    } catch (err) {
      console.log("Error in database rate product function", err);
    }
  }
}
