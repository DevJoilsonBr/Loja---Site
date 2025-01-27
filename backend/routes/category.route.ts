import express from 'express'
import { createCategory } from '../controllers/category.controller'

const router = express.Router()

//Admin create category
router.post('/', createCategory)

export default router