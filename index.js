import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

app.listen(4100, () => {
  console.log("server is listening on port 4100");
});
