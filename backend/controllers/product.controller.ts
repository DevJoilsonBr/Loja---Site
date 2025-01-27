import { Request, Response } from "express";
import { Product } from "../models/product.model";

export async function createProduct(req: Request, res: Response): Promise<any> {
    try {
        const isUserAdmin = req.user?.isAdmin

        if(!isUserAdmin) {
            return res.status(403).json({ success: false, message: "Unauthorized - Only admin can create products" });
        }

        const {productName, productDescription, productPrice, productCategory, productQuantity, productImage} = req.body
        
        // Check if the product exists in the database
        const product = await Product.findOne({productName: productName})
        
        if(product) {
            return res.status(400).json({ success: false, message: "Product already exists"})
        }

        // Validate the required fields
        if(!productName || !productDescription || !productPrice || !productCategory || !productQuantity) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        if(productName.length >= 50) {
            return res.status(400).json({ success: false, message: "Product name must be less than 50 characters"})
        }

        if(productDescription.length >= 150) {
            return res.status(400).json({ success: false, message: "Product description must be less than 150 characters"})
        }

        if(productPrice <= 0) {
            return res.status(400).json({ success: false, message: "Product price must be greater than 0"})
        }

        if(productQuantity <= 0) {
            alert("Product is missing")
            return res.status(400).json({ success: false, message: "Product quantity must be greater than 0"})
        }

        // Check if the product category exists in the database
        const category = await Product.findOne({productCategory: productCategory})
        
        if(!category) {
            return res.status(400).json({ success: false, message: "Invalid product category"})
        }

        // Create a new product instance
        const newProduct = new Product({
            productName: productName,
            productDescription: productDescription,
            productPrice: productDescription,
            productCategory: productCategory,
            productQuantity: productQuantity,
            productImage: productImage
        });

        if(newProduct) {
            // Save the new product to the database
            await newProduct.save();
            // Return the created product details with the category name
            return res.status(201).json({success: true, product: newProduct})
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.log("Error in createProduct controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getAllProducts(req: Request, res: Response): Promise<any> {
    try {
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error? error.message : "Unknown error occurred";
        console.log("Error in getAllProducts controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });   
    }
}

export async function getProduct(req: Request, res: Response): Promise<any> {
    try {
        const {productId} = req.params

        // Find the product by ID and populate the category field
        const product = await Product.findById(productId).populate("category");

        // If product not found, return error message
        if(!product){
            return res.status(404).json({success: false, message: "Not found product"})
        }

        // Return the product details with the category name
        return res.status(200).json({ success: true, product });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.log("Error in getProduct controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function updateProduct(req: Request, res: Response): Promise<any> {
    try {
        const isUserAdmin = req.user?.isAdmin

        if(!isUserAdmin) {
            return res.status(403).json({ success: false, message: "Unauthorized - Only admin can update products" });
        }

        // Check if the product exists
        const {productId} = req.params

        const product = await Product.findById(productId)
        
        if(!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        // Update the product fields
        Object.assign(product, req.body)

        const updatedProduct = await product.save()

        return res.status(200).json({success: true, updatedProduct})
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.log("Error in updateProduct controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<any> {
    try {
        const {productId} = req.params

        //Delete product by id
        const deletedProduct = await Product.findByIdAndDelete(productId)
        
        if(!deletedProduct) {
            return res.status(404).json({success: false, message: "Product not found"})
        }

        return res.status(200).json({ success: true, deletedProduct})
    } catch (error: unknown) {
        const errorMessage = error instanceof Error? error.message : "Unknown error occurred";
        console.log("Error in deleteProduct controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function rateProduct(req: Request, res: Response): Promise<any> {
    try {
        //TODO: RATE PRODUCT LOGIC
    } catch (error: unknown) {
        const errorMessage = error instanceof Error? error.message : "Unknown error occurred";
        console.log("Error in rateProduct controller:", errorMessage);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}