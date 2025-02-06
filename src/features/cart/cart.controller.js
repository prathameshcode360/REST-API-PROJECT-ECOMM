import CartModel from "./cart.model.js";
import CartRepository from "./cart.repo.js";
export default class CartController {
  constructor() {
    this.cartRepo = new CartRepository();
  }
  async addToCart(req, res) {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      const newItem = await this.cartRepo.add(userId, productId, quantity);

      return res
        .status(201)
        .send({ msg: "product added to cart", cartItem: newItem });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
  async getCartItems(req, res) {
    try {
      const userId = req.userId;
      let carItems = await this.cartRepo.getAll(userId);
      return res.status(200).send({ msg: "Your Cart", carItems });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
  async updateCartItem(req, res) {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      const result = await this.cartRepo.update(userId, productId, quantity);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  async deleteItem(req, res) {
    try {
      const userId = req.userId;
      const productId = req.params.productId;
      const result = await this.cartRepo.delete(userId, productId);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
}
