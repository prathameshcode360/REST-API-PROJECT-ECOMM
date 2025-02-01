import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", (req, res) => {
  userController.getUsers(req, res);
});
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
userRouter.get("/:_id", (req, res) => {
  userController.getOneUser(req, res);
});

export default userRouter;
