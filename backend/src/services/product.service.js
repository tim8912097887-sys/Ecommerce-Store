import { redisClient } from "../../configs/redis.configs.js";
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
     await getProductService(id);
     await ProductModel.deleteOne({ _id: id });
}

export const updateProductService = async(id,product) => {
     await getProductService(id);
     const updatedProduct = await ProductModel.updateOne({ _id: id },product);
     return updatedProduct;
}

export const recommendedProductsService = async() => {
     const products = await ProductModel.aggregate([{
          $sample: { size: 4 }
     },{
          $project: {
               _id: 1,
               name: 1,
               description: 1,
               price: 1,
               image: 1
          }
     }]);
     console.log(products)
     return products;
}

export const categoryProductsService = async(category) => {
      const products = await ProductModel.find({ category });
      return products;
}

export const getFeaturedProductsService = async() => {
     // first search in redis
     const existProducts = await (await redisClient()).GET('featured_products');
     if(existProducts) return JSON.parse(existProducts);
     // if not exist search from mongodb
     const featuredProducts = await ProductModel.find({ isFeatured: true }).lean();
     await (await redisClient()).SET('featured_products',JSON.stringify(featuredProducts));
     return featuredProducts;
}

export const toggleFeaturedProductsService = async(id) => {
     const existProduct = await ProductModel.findById(id);
     existProduct.isFeatured = !existProduct.isFeatured;
     const product = await existProduct.save();
     await updateFeaturedProductsCache();
     return product;
}

async function updateFeaturedProductsCache() {
     const featuredProducts = await ProductModel.find({ isFeatured: true }).lean();
     await (await redisClient()).SET('featured_products',JSON.stringify(featuredProducts));
}
