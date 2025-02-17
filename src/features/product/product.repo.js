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
}
