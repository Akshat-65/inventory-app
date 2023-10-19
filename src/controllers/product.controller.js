import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
    // console.log(products);
    // res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }

  getAddForm(req, res) {
    return res.render("new-product",{errorMessage: null,});
  }

  addNewProduct(req, res) {
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
   return res.render("products",{ products: products });
  }

  postUpdateProduct(req, res) {
    console.log(req.body);
    ProductModel.updateProduct(req.body);
    let products = ProductModel.get();
   return res.render("products",{ products: products });
  }


  getUpdateProductView(req,res,next){
   const id = req.params.id;
   const productFound = ProductModel.getById(id) ;
   if(productFound){
    res.render('update-product',{ product: productFound, errorMessage: null });
   }
   else{
    res.status(401).send("Product not found");
   }
  }

  deleteProduct(req,res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id) ;
    if(!productFound){
     return res.status(401).send("Product not found");
     }
    ProductModel.delete(id);
    let products = ProductModel.get();
    return res.render("products",{ products: products });
  }



}
