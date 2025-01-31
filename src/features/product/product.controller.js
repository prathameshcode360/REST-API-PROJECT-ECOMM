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
  getOneProducts(req, res) {
    try {
      const id = req.params.id;
      let product = ProductModel.getOne(id);
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
  }
}
