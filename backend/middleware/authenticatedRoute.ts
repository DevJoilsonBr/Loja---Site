import { NextFunction, Request, Response } from "express";
import { User } from './../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV_VARS } from './../config/EnvVars';
import { IUser } from "../types/user.interface";

interface Payload extends JwtPayload {
    userId: string;
}

export const authenticatedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["jwt-store"]

        if(!token) {
            throw new Error("Not authenticated - No Token provided")
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as Payload

        if(!decoded) {
            throw new Error("Not authenticated - Invalid Token")
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user) {
            throw new Error("Not authenticated - User not found")
        }

        req.user = user

        next()
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        console.log("Error in protectRoute: ", errorMessage)
        res.status(401).json({ success: false, message: "Not authenticated" })
    }
}