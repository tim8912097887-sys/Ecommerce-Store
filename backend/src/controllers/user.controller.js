import { asyncHandler } from "../../utilities/asynchandle.js";
import { loginUserService, logoutUserService, signupUserService, tokenRefreshService } from "../services/user.service.js";

const cookieConfig = (maxAge) => {
  return {
      httpOnly: true,
     secure: process.env.NODE_ENV==="production",
     sameSite: "Lax",
     maxAge 
  }
}

export const loginUser = asyncHandler(async (req,res) => {
   const { user,accessToken,refreshToken } = await loginUserService(req.body);
   res.cookie('refreshToken',refreshToken,cookieConfig(15*60*1000));
   res.status(200).json({ success: true,data: user,accessToken });
})

export const logoutUser = asyncHandler(async (req,res) => {
   await logoutUserService(req.user);
   res.clearCookie('refreshToken',cookieConfig(15*60*1000));
   res.status(200).json({ success: true });
})

export const signupUser = asyncHandler(async (req,res) => {
   const { createdUser,accessToken,refreshToken } = await signupUserService(req.body);
   res.cookie('refreshToken',refreshToken,cookieConfig(15*60*1000));
   res.status(201).json({ success: true,data: createdUser,accessToken });
})

export const tokenRefresh = asyncHandler(async (req,res) => {
    const { refreshToken,accessToken } = await tokenRefreshService(req.user);
    res.cookie('refreshToken',refreshToken,cookieConfig(15*60*1000));
    res.status(200).json({ success: true,accessToken });
})