import { asyncHandler } from "../../utilities/asynchandle.js";
import { categoryProductsService, createProductService, deleteProductService, getAllProductsService, getFeaturedProductsService, getProductService, recommendedProductsService, toggleFeaturedProductsService, updateProductService } from "../services/product.service.js";

export const getAllProducts = asyncHandler(async(req,res) => {
    const products = await getAllProductsService();
    res.status(200).json({ success: true,data: products });
})

export const getProduct = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const product = await getProductService(id);
    res.status(200).json({ success: true,data: product });
})

export const createProduct = asyncHandler(async(req,res) => {
    const product = await createProductService(req.body);
    res.status(200).json({ success: true,data: product });
})

export const deleteProduct = asyncHandler(async(req,res) => {
    const { id } = req.params;
    await deleteProductService(id);
    res.status(200).json({ success: true });
})

export const updateProduct = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const updatedProduct = await updateProductService(id,req.body);
    res.status(200).json({ success: true,data: updatedProduct });
})

export const recommendedProducts = asyncHandler(async(req,res) => {
    const products = await recommendedProductsService();
    res.status(200).json({ success: true,data: products });
})

export const categoryProducts = asyncHandler(async(req,res) => {
    const { category } = req.params;
    const products = await categoryProductsService(category);
    res.status(200).json({ success: true,data: products });
})

export const getFeaturedProducts = asyncHandler(async(req,res) => {
    const products = await getFeaturedProductsService();
    res.status(200).json({ success: true,data: products });
})

export const toggleFeaturedProducts = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const product = await toggleFeaturedProductsService(id);
    res.status(200).json({ success: true,data: product });
})