import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import NewProductValidationMiddleware from "./src/middlewares/newProductValidation.middleware.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";

const server = express();
server.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

server.use(cookieParser());

// setup view engine

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
// parse form data
server.use(express.urlencoded({ extended: true }));

server.use(ejsLayouts);

const productController = new ProductController();
const userController = new UserController();
server.use(express.static("src/views"));
server.use(express.static("public"));
server.get("/", setLastVisit, auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/delete-product/:id", auth,productController.deleteProduct);
server.post(
  "/add-product",auth,
  uploadFile.single("imageUrl"),
  NewProductValidationMiddleware,
  productController.addNewProduct
);
server.post(
  "/update-product",auth,
  uploadFile.single("imageUrl"),
  productController.postUpdateProduct
);
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);
server.get("/logout",userController.logout);

server.listen(3400);
