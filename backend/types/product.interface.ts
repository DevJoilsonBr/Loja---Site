import { ICategory } from "./category.interface";

export interface IProduct {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: ICategory;
    productQuantity: number;
    productImage?: string;
    productRating?: number;
    productDate: Date;
}