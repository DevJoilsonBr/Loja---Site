import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ProductClass } from "./product.model";

export class CategoryClass {
    @prop({ required: true, unique: true, maxlength: 50 })
    public categoryName!: string;

    @prop({ maxlength: 150 })
    public categoryDescription?: string;

    @prop({ref: () => ProductClass, required: true, default: []})
    public categoryProducts?: Ref<ProductClass>[];
}

export const Category = getModelForClass(CategoryClass)