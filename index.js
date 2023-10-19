import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import NewProductValidationMiddleware from './src/middlewares/newProductValidation.middleware.js';
import path from "path";
import ejsLayouts from 'express-ejs-layouts';

const server = express();

// setup view engine

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(), "src", "views"));
server.use(express.urlencoded({extended:true}));

server.use(ejsLayouts); 

const productController = new ProductController();
server.use(express.static('src/views'));
server.use(express.static('public'));
server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.get('/update-product/:id', productController.getUpdateProductView);
server.post('/delete-product/:id', productController.deleteProduct);
server.post('/add-product',NewProductValidationMiddleware,productController.addNewProduct);
server.post('/update-product', productController.postUpdateProduct);
server.listen(3400);