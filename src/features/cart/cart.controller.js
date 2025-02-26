import CartRepo from "./cart.repo.js";

export default class CartController {
  constructor() {
    this.cartRepo = new CartRepo();
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
  getCartItems(req, res) {
    try {
      const userId = req.userId;
      let carItems = CartModel.getItems(userId);
      return res.status(200).send({ msg: "Your Cart", carItems });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
  updateCartItem(req, res) {
    try {
      const userId = req.userId;
      const { cartId, quantity } = req.body;
      const result = CartModel.update(userId, cartId, quantity);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  deleteItem(req, res) {
    try {
      const userId = req.userId;
      const cartId = req.params.cartId;
      console.log(cartId);
      const result = CartModel.delete(userId, cartId);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
}
