import express from "express";
import ProductController from "./product.controller.js";
import fileUpload from "../../middlewares/fileupload.middleware.js";
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getProducts);
productRouter.post(
  "/add",
  fileUpload.single("image"),
  productController.addProduct
);
export default productRouter;
