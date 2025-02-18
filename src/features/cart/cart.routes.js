import express from "express";
import CartController from "./cart.controller.js";

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post("/add", (req, res) => {
  cartController.addToCart(req, res);
});
cartRouter.get("/get", (req, res) => {
  cartController.getCartItems(req, res);
});

cartRouter.post("/update", (req, res) => {
  cartController.updateCartItem(req, res);
});
cartRouter.delete("/delete/:productId", (req, res) => {
  cartController.deleteItem(req, res);
});

export default cartRouter;
