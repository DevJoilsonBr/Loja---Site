import { getModelForClass, prop } from "@typegoose/typegoose";

export enum UserRole {
    Admin = 'admin',
    Customer = 'customer'
}

class UserClass {
    @prop({required: true, unique: true})
    username: string;

    @prop({required: true, unique: true})
    email: string;

    @prop({required: true, maxlength: 100})
    password: string;

    @prop({default: UserRole.Customer, enum: UserRole})
    role: UserRole;

    @prop({default: true})
    isActive: boolean;

    constructor(username: string, email: string, password: string, 
        role: UserRole, isActive: boolean) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = UserRole.Customer;
        this.isActive = isActive;
    }
}

export const User = getModelForClass(UserClass);