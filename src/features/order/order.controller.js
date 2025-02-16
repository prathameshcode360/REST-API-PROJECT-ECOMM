import OrderRepo from "./order.repo.js";

export default class OrderController {
  constructor() {
    this.oredrRepo = new OrderRepo();
  }
  async placeOrder(req, res) {
    try {
      const userId = req.userId;
      const order = await this.oredrRepo.placeOrder(userId);
      return res.send({ msg: "order placed successfully", order });
    } catch (err) {
      console.log("Error:", err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
