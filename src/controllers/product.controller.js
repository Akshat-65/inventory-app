import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products, userEmail:req.session.userEmail });
    // console.log(products);
    // res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }

  getAddForm(req, res) {
    return res.render("new-product",{errorMessage: null,userEmail:req.session.userEmail});
  }

  addNewProduct(req, res) {
    console.log(req.body);
    const {name, price, desc} = req.body;
    const imageUrl = "images/"+req.file.filename;
    ProductModel.add({name, price, desc, imageUrl});
    let products = ProductModel.get();
  //  return res.render("products",{ products: products });
  return res.redirect('/');
  }

  postUpdateProduct(req, res) {
    console.log(req.body.name);
    const {name, price, desc,id} = req.body;
    console.log(req.file.filename);
    const imageUrl = "images/"+req.file.filename;
    ProductModel.updateProduct({name, price, desc,id,imageUrl});
    let products = ProductModel.get();
   return res.render("products",{ products: products , userEmail:req.session.userEmail});
  }


  getUpdateProductView(req,res,next){
   const id = req.params.id;
   const productFound = ProductModel.getById(id) ;
   if(productFound){
    res.render('update-product',{ product: productFound, errorMessage: null, userEmail:req.session.userEmail });
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
    return res.render("products",{ products: products ,userEmail:req.session.userEmail});
  }



}
