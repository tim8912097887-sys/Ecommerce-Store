import { ApiError } from "../../customs/error.custom.js";
import { ProductModel } from "../../models/product.models.js"

export const getAllProductsService = async() => {
    const products = await ProductModel.find({}).lean();
    return products;
}

export const getProductService = async(id) => {
     const product = await ProductModel.findById(id).lean();
     if(!product) throw new ApiError(404,"Product not found");
     return product;
}

export const createProductService = async(product) => {
     const createdProduct = await ProductModel.create(product);
     return createdProduct;
}

export const deleteProductService = async(id) => {
     const existProduct = await getProductService(id);
     await ProductModel.deleteOne({ _id: id });
}

export const updateProductService = async(id,product) => {
     const existProduct = await getProductService(id);
     const updatedProduct = await ProductModel.updateOne({ _id: id },product);
     return updatedProduct;
}
