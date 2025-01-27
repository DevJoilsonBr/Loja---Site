import { Request, Response } from "express";
import { Category } from "../models/category.model";

export async function createCategory(req: Request, res: Response): Promise<any> {
    try {
        const {categoryName, categoryDescription} = req.body

        //Validate required field
        if(!categoryName) {
            return res.status(400).json({success: false, message: "Category name is required"})
        }

        if(categoryName.length >= 50) {
            return res.status(400).json({ success: false, message: "Category name must be less than 50 characters"})
        }

        if(categoryDescription.length >= 150) {
            return res.status(400).json({ success: false, message: "Category description must be less than 150 characters"})
        }

        // Check if the category already exists
        const category = await Category.findOne({categoryName: categoryName})
        if(category) {
            return res.status(400).json({ success: false, message: "Category already exists"})
        }

        // Create a new category
        const newCategory = new Category({
            categoryName: categoryName,
            categoryDescription: categoryDescription
        })

        if(newCategory) {
            const savedCategory = await newCategory.save()
            return res.status(201).json({ success: true, Category: savedCategory})
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.log("Error in createCategory controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}