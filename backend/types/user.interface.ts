import { IProduct } from "./product.interface";

export interface IUser {
    userId?: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    cartItems: IProduct[]
}