import express from "express";
import CartController from "./cart.controller.js";
const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.post("/add", cartController.addToCart);
cartRouter.get("/get", cartController.getCartItems);

export default cartRouter;
