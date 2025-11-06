import { ApiError } from "../../../customs/error.custom.js";
import { CreateProduct } from "../../../schemas/product/create.schema.js"


export const validateCreateProduct = (req,res,next) => {
    if(!req.body) throw new ApiError(400,"Please include request body");
    const validation = CreateProduct.safeParse(req.body);
    if(!validation.success) throw new ApiError(400,validation.error.issues[0].message);
    return next();
}