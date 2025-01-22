import { getModelForClass, prop } from "@typegoose/typegoose";

class ProductClass {
    @prop({required: true})
    name!: string;

    @prop({required: true})
    description!: string;

    @prop({required: true})
    price!: number;

    @prop({required: true})
    category!: string;

    @prop({required: true})
    quantity!: number;

    @prop()
    image?: string;
}

export const Product = getModelForClass(ProductClass);