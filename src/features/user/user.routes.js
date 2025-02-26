import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

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
userRouter.get("/:id", (req, res) => {
  userController.getOneUser(req, res);
});
userRouter.put("/reset", jwtAuth, (req, res) => {
  userController.resetPassword(req, res);
});
export default userRouter;
