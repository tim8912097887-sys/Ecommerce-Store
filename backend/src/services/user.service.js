import { createClient } from "redis";
// local module import
import { ApiError } from "../../customs/error.custom.js";
import { UserModel } from "../../models/user.model.js";
import { generateToken } from "../../utilities/generatetoken.js";

const client = async() => await createClient().connect();

export const loginUserService = async (userData) => {
    const existUser = await UserModel.findOne({ email: userData.email });
    if(!existUser) throw new ApiError(409,"Email or Password is incorrect");
    const isMatch = await existUser.validatePassword(userData.password);
    if(!isMatch) throw new ApiError(409,"Email or Password is incorrect");
    const payload = { id: existUser._id,email: existUser.email };
    const { accessToken,refreshToken } = generateToken(payload);
    await (await client()).SET(`User-${existUser._id}`,refreshToken);
    const user = { id: existUser._id,first_name: existUser.first_name,last_name: existUser.last_name,email: existUser.email,role: existUser.role };
    return { accessToken,refreshToken,user };
}

export const logoutUserService = async (payload) => {
    await (await client()).DEL(`User-${payload.id}`);
}

export const signupUserService = async (userData) => {
    const existUser = await UserModel.findOne({ email: userData.email });
    if(existUser) throw new ApiError(409,"Email alread in use");
    const user = await UserModel.create(userData);
    const payload = { id: user._id,email: user.email };
    const { accessToken,refreshToken } = generateToken(payload);
    await (await client()).SET(`User-${user._id}`,refreshToken);
    const createdUser = { id: user._id,first_name: user.first_name,last_name: user.last_name,email: user.email,role: user.role };
    return { createdUser,accessToken,refreshToken };
}

export const tokenRefreshService = async (payload) => {
    const { id,email } = payload;
    const newPayload = { id,email }; 
    // get new accessToken and implement refreshToken rotation 
    const { accessToken,refreshToken } = generateToken(newPayload);
    await (await client()).SET(`User-${payload.id}`,refreshToken);
    return { accessToken,refreshToken };
}