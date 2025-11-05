import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET,ACCESS_TOKEN_EXPIRE,REFRESH_TOKEN_EXPIRE } = process.env;
    const accessToken = jwt.sign(payload,ACCESS_TOKEN_SECRET,{ expiresIn: ACCESS_TOKEN_EXPIRE });
    const refreshToken = jwt.sign(payload,REFRESH_TOKEN_SECRET,{ expiresIn: REFRESH_TOKEN_EXPIRE });
    return { accessToken,refreshToken };
}