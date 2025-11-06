import express from "express";
// local module
import { categoryProducts, createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProduct, recommendedProducts, toggleFeaturedProducts, updateProduct } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../middlewares/validation/product.middleware.js";
import { adminCheck, validateAccessToken } from "../middlewares/validation/user.middleware.js";

export const productRouter = express.Router();

productRouter.get('/',validateAccessToken,adminCheck,getAllProducts);

productRouter.get('/categories/:category',categoryProducts);

productRouter.get('/recommended',recommendedProducts);

productRouter.get('/features',getFeaturedProducts);

productRouter.put('/features/:id',validateAccessToken,adminCheck,toggleFeaturedProducts);

productRouter.get('/:id',getProduct);

productRouter.post('/',validateAccessToken,adminCheck,validateCreateProduct,createProduct);

productRouter.delete('/:id',validateAccessToken,adminCheck,deleteProduct);

productRouter.put('/:id',validateAccessToken,adminCheck,updateProduct);