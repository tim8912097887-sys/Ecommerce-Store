import { asyncHandler } from "../../utilities/asynchandle.js";
import { createProductService, deleteProductService, getAllProductsService, getProductService, updateProductService } from "../services/product.service.js";

export const getAllProducts = asyncHandler(async(req,res) => {
     await getAllProductsService();
    res.status(200).json({ success: true });
})

export const getProduct = asyncHandler(async(req,res) => {
    await getProductService();
    res.status(200).json({ success: true });
})
export const createProduct = asyncHandler(async(req,res) => {
    await createProductService();
    res.status(200).json({ success: true });
})
export const deleteProduct = asyncHandler(async(req,res) => {
    await deleteProductService();
    res.status(200).json({ success: true });
})
export const updateProduct = asyncHandler(async(req,res) => {
    await updateProductService();
    res.status(200).json({ success: true });
})