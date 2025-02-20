import OrderRepo from "./order.repo.js";

export default class OrderController {
  constructor() {
    this.orderRepo = new OrderRepo();
  }

  async placeOrder(req, res) {
    try {
      const userId = req.userId;
      const { productId } = req.body;

      // ✅ Validate userId & productId
      if (!userId || !productId) {
        return res
          .status(400)
          .send({ msg: "User ID and Product ID are required" });
      }

      // ✅ Call repository function & handle response
      const orderResult = await this.orderRepo.placeOrder(userId, productId);

      return res
        .status(200)
        .send({ msg: "Order placed successfully", orderResult });
    } catch (err) {
      console.error("Error placing order:", err);
      return res.status(500).send({ msg: "Internal Server Error" });
    }
  }
}
