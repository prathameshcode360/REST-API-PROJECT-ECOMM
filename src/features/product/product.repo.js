import mongoose from "mongoose";
import { productSchema } from "./product.schemas.js";
import { ObjectId } from "mongodb";

const ProductModel = mongoose.model("products", productSchema);

export default class ProductRepo {
  async add(name, price, image, category) {
    try {
      const newProduct = new ProductModel({ name, price, image, category });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.log("Something went wrong in database add function");
    }
  }
  async getAll() {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.log("Something went wrong in database getAll function");
    }
  }
  async getOne(id) {
    try {
      const product = ProductModel.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (error) {
      console.log("Something went wrong in database getOne function");
    }
  }
}
