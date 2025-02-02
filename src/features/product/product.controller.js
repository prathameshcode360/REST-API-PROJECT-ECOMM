import ProductRepo from "./product.repo.js";
export default class ProductController {
  constructor() {
    this.productRepo = new ProductRepo();
  }
  async getProducts(req, res) {
    try {
      let products = await this.productRepo.getAll();

      return res.status(200).send({ msg: "products", products });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Internal server error",
      });
    }
  }
  async addProduct(req, res) {
    try {
      const { name, price, category } = req.body;
      const image = req.file.filename;
      const newProduct = await this.productRepo.add(
        name,
        Number(price),
        image,
        category
      );
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
  async getOneProducts(req, res) {
    try {
      const _id = req.params._id;
      let product = await this.productRepo.getOne(_id);
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      } else {
        return res.status(200).send({ msg: "product", product });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  filterProducts(req, res) {
    try {
      const minPrice = Number(req.query.minPrice);
      const maxPrice = Number(req.query.maxPrice); // ✅ Corrected this line
      const category = req.query.category;

      console.log(minPrice);
      console.log(maxPrice);
      console.log(category);

      let filteredProducts = ProductModel.filter(minPrice, maxPrice, category);

      console.log(filteredProducts);

      if (!filteredProducts.length) {
        // ✅ Checking array length
        return res.status(404).send({ msg: "Product not found" });
      } else {
        return res
          .status(200)
          .send({ msg: "Filtered products", filteredProducts });
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({
        msg: "Internal server error",
      });
    }
  }
  rateProduct(req, res) {
    try {
      const { userId, productId, rating } = req.body;
      const result = ProductModel.rate(userId, productId, rating);

      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
