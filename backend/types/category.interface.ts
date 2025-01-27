import { IProduct } from "./product.interface";

export interface ICategory {
    categoryId: string;
    categoryName: string;
    categoryDescription?: string;
    categoryProducts: IProduct[]
}