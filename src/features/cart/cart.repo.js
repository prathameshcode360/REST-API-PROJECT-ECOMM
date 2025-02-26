import mongoose from "mongoose";
import cartSchemas from "./cart.schemas.js";

const CartModel = mongoose.model("cart", cartSchemas);

export default class CartRepo {
  async add(userId, productId, quantity) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const productObjectId = new mongoose.Types.ObjectId(productId);

      // ✅ Check if user already has a cart
      let userCart = await CartModel.findOne({ userId: userObjectId });

      if (userCart) {
        // ✅ Existing cart me naye product ko push karein
        userCart.cart.push({ productId: productObjectId, quantity });
      } else {
        // ✅ Agar cart nahi hai, to naya cart document create karein
        userCart = new CartModel({
          userId: userObjectId,
          cart: [{ productId: productObjectId, quantity }],
        });
      }

      await userCart.save(); // ✅ Changes ko save karein
      return userCart;
    } catch (error) {
      console.log("Something went wrong in database add function", error);
    }
  }
}
