import "./env.js";
import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);
app.use("/api/orders", jwtAuth, orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

app.listen(4100, () => {
  console.log("server is listening on port 4100");
  connectToMongoDB();
});
