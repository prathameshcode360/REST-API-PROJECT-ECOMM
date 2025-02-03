import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, price, image, category, _id) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this._id = _id;
  }

  static rate(userId, productId, rating) {
    // 1. Check if user is valid
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      return "User not found";
    }

    // 2. Check if product is valid
    const product = products.find((p) => p.id == productId);
    if (!product) {
      return "Product not found";
    }

    // 3. Initialize ratings array if not exists
    if (!product.ratings) {
      product.ratings = [];
    }

    // 4. Find if user has already rated
    const findExistingRateIndex = product.ratings.findIndex(
      (r) => r.userId == userId
    );

    if (findExistingRateIndex >= 0) {
      // Update existing rating
      product.ratings[findExistingRateIndex].rating = rating;
      return "rating updated sucessfully";
    } else {
      // Add new rating
      product.ratings.push({ userId, productId, rating });
      return "rating added sucessfully";
    }
  }
}
var products = [
  new ProductModel(
    1,
    "Product 1",
    200,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "electronics"
  ),
  new ProductModel(
    2,
    "Product 2",
    100,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "mobiles"
  ),
  new ProductModel(
    3,
    "Product 3",
    250,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "mobiles"
  ),
];
