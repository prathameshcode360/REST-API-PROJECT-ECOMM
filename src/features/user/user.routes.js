import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/signin", userController.signIn);
userRouter.get("/:id", userController.getOneUser);

export default userRouter;
