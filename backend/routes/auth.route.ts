import express from 'express'
import { signup, login, logout, getUser } from '../controllers/auth.controller'
import { authenticatedRoute } from '../middleware/authenticatedRoute'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/authCheck", authenticatedRoute, getUser)

export default router;