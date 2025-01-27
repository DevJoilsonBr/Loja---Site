import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { CategoryClass } from "./category.model";

export class ProductClass {
    @prop({required: true, maxlength: 50})
    public productName!: string;

    @prop({required: true, maxlength: 150})
    public productDescription!: string;

    @prop({required: true, min: 0})
    public productPrice!: number;

    @prop({ref: () => CategoryClass, required: true})
    public productCategory!: Ref<CategoryClass>

    @prop({required: true, default: 0})
    public productQuantity!: number;

    @prop({required: false})
    public productImage?: string;

    @prop({default: 0, min: 0, max: 5})
    public productRating?: number;

    @prop({default: () => new Date()})
    public productDate!: Date
}

export const Product = getModelForClass(ProductClass);