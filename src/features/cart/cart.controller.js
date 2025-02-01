import CartModel from "./cart.model.js";
export default class CartController {
  addToCart(req, res) {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;
      const newItem = CartModel.add(userId, productId, quantity);

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
}
