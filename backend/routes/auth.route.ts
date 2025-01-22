import express from 'express'
import { signup, login, logout, getUser } from '../controllers/auth.controller'
import { protectRoute } from '../middleware/protectRoute'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/authCheck", protectRoute, getUser)

export default router;