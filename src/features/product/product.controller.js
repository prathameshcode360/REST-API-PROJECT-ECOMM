import ProductModel from "./product.model.js";
export default class ProductController {
  getProducts(req, res) {
    try {
      let products = ProductModel.getAll();
      return res.status(200).send({ msg: "products", products });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal server error",
      });
    }
  }
  addProduct(req, res) {
    try {
      const { name, price, category } = req.body;
      const image = req.file.filename;
      const newProduct = ProductModel.add(name, price, image, category);
      return res.status(201).send({
        msg: "new product added",
        newProduct: newProduct,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  }
}
