import { UserRole } from "../models/user.model";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
}