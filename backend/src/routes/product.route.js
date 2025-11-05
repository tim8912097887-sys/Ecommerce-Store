import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
// local module

export const productRouter = express.Router();

productRouter.get('/',getAllProducts);

productRouter.get('/:id',getProduct);

productRouter.post('/',createProduct);

productRouter.delete('/:id',deleteProduct);

productRouter.put('/:id',updateProduct);