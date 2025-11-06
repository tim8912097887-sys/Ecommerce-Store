import jwt from "jsonwebtoken";
// local module import
import { ApiError } from "../../../customs/error.custom.js";
import { CreateUser } from "../../../schemas/user/create.schema.js";
import { LoginUser } from "../../../schemas/user/login.schema.js";


export const validateCreateUser = (req,res,next) => {
    if(!req.body) throw new ApiError(400,"Please include request body");
    const validation = CreateUser.safeParse(req.body);
    if(!validation.success) throw new ApiError(400,validation.error.issues[0].message);
    return next();
}

export const validateLoginUser = (req,res,next) => {
    if(!req.body) throw new ApiError(400,"Please include request body");
    const validation = LoginUser.safeParse(req.body);
    if(!validation.success) throw new ApiError(400,validation.error.issues[0].message);
    return next();
}

export const validateRefreshToken = (req,res,next) => {
    const { refreshToken } = req.cookies;
    if(!refreshToken) return next(new ApiError(401,"Unathenticated"));
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,function (err,decode) {
        if(err) return next(err);
        req.user = decode;
        console.log(decode);
        return next();
    });

}

export const validateAccessToken = (req,res,next) => {
    const { authorization } = req.headers;
    if(!authorization || authorization.split(" ")[0] !== "Bearer" || !authorization.split(" ")[1]) return next(new ApiError(401,"Unathenticated"));
    const accesstoken = authorization.split(" ")[1];
    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET,function (err,decode) {
        if(err) return next(err);
        req.user = decode;
        console.log(decode);
        return next();
    });

}

export const adminCheck = (req,res,next) => {
      const { role } = req.user;
      if(role !== "admin") return next(new ApiError(403,"Unauthorize"));
      return next();
}