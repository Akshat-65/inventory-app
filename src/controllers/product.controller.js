import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
    // console.log(products);
    // res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }

  getAddForm(req, res) {
    return res.render("new-product");
  }

  addNewProduct(req, res) {
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
   return res.render("products",{ products: products });
  }
}
