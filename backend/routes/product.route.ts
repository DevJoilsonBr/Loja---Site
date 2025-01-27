import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, rateProduct, updateProduct } from '../controllers/product.controller'

const router = express.Router()

// Admin create product
router.post('/', createProduct)

// Use rate product
 router.post('/:productId/rate', rateProduct)

// User get all products
 router.get('/', getAllProducts)

// User get product by ID
router.get('/:productId', getProduct)

// Admin update product
router.put('/:productId', updateProduct)

// Admin delete product
router.delete('/:productId', deleteProduct)

export default router