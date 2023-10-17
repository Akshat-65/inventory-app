import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import ejsLayouts from 'express-ejs-layouts';

const server = express();

// setup view engine

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

const productController = new ProductController();
server.use(express.static('src/views'));
server.get('/', productController.getProducts)
server.listen(3400);