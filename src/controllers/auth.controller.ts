import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from "bcrypt"
import { ApiError } from "../errors/ApiError";
import jwt from "jsonwebtoken"

const createAccessToken = (userId: string) => {
    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET!, //access token secret never be undifined
        {expiresIn: "15m"}
    )
}
const createRefreshToken = (userId: string) => {
    return jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET!, //refresh token secret never be undifined
        {expiresIn: "7d"}
    )
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, password} = req.body
        const SALT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT);
        const user = new UserModel(
            {email, name, password: hashedPassword}
        );
        if (!user) {
            throw new Error("Signup failed");
        }
        await user.save();
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        res.status(200).json({ message: "Signup successful",user: userWithoutPassword });
    } catch (error: any) {
        next(error);
        return;
    }
    res.status(500).json({ message: "Internal server error" });
}

export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error: any) {
        next(error);
        return;
    }
    res.status(500).json({ message: "Internal server error" });
}

export const userLoging = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            throw new ApiError(404,"User not found")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials");
        }
        const accessToken = createAccessToken(user._id.toString());
        const refreshToken = createRefreshToken(user._id.toString());

        const isProd = process.env.NODE_ENV === "production";
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,//can't read in javascript
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            path: "/api/auth/refresh-token" //cookie path for refresh token 
        })
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken: accessToken
        }
        res.status(200).json({ message: "Login successful",user: userWithoutPassword });
    } catch (error: any) {
        next(error);
        return;

    }
}