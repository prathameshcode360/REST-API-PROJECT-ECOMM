import express from "express";
import ProductController from "./product.controller.js";
import fileUpload from "../../middlewares/fileupload.middleware.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});

productRouter.get("/", (req, res) => {
  productController.getProducts(req, res);
});
productRouter.post("/add", fileUpload.single("image"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/:_id", (req, res) => {
  productController.getOneProducts(req, res);
});

productRouter.post("/rate", jwtAuth, (req, res) => {
  productController.rateProduct(req, res);
});

export default productRouter;
