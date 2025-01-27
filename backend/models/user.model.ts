import { getModelForClass, prop } from "@typegoose/typegoose";
import { ProductClass } from "./product.model";
import { IProduct } from "../types/product.interface";

class UserClass {
    @prop({required: true, unique: true})
    username!: string;

    @prop({required: true, unique: true})
    email!: string;

    @prop({required: true, maxlength: 100})
    password!: string;

    @prop({default: false})
    isAdmin!: boolean;

    @prop({default: true})
    isActive!: boolean;

    @prop({ref: () => ProductClass, default: []})
    cartItems!: IProduct[]
}

export const User = getModelForClass(UserClass);