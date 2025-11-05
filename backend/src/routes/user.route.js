import express from "express";
// local module
import { loginUser, logoutUser, signupUser, tokenRefresh } from "../controllers/user.controller.js";
import { validateCreateUser, validateLoginUser, validateRefreshToken } from "../middlewares/validation/user.middleware.js";

export const userRouter = express.Router();

userRouter.post('/signup',validateCreateUser,signupUser);
userRouter.post('/login',validateLoginUser,loginUser);
userRouter.delete('/logout',validateRefreshToken,logoutUser);
userRouter.post('/refreshtoken',validateRefreshToken,tokenRefresh);