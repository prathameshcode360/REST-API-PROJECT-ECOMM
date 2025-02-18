import CartRepo from "./cart.repo.js";

export default class CartController {
  constructor() {
    this.cartRepo = new CartRepo();
  }
  async addToCart(req, res) {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      const cartitem = await this.cartRepo.add(userId, productId, quantity);
      return res
        .status(201)
        .send({ msg: "product added to cart", cartitem: cartitem });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  async getCartItems(req, res) {
    try {
      const userId = req.userId;
      const cart = await this.cartRepo.getAll(userId);
      return res.status(200).send({ cart: cart });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "Internal server error" });
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
