import jwt from 'jsonwebtoken'
import { Response } from 'express';
import { ENV_VARS } from '../config/EnvVars';

export const generateAndSetCookie = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt-store', token, { 
        maxAge: 15 * 24 * 60 * 1000, //15d
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "development",
    })

    return token;
}
