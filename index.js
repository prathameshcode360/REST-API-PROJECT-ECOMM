import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

app.listen(4100, () => {
  console.log("server is listening on port 4100");
});
