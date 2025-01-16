import { getModelForClass, prop } from "@typegoose/typegoose";

class ProductClass {
    @prop({required: true})
    name: string;

    @prop({required: true})
    description: string;

    @prop({required: true})
    price: number;

    @prop({required: true})
    category: string;

    @prop({required: true})
    quantity: number;

    @prop()
    image: string;

    constructor(name: string, description: string, price: number, 
        category: string, quantity: number, image: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.image = image;
    }
}

export const Product = getModelForClass(ProductClass);