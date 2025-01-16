import { Request, Response } from "express"
import { User } from "../models/user.model"
import bcryptjs from 'bcryptjs'
import { generateAndSetCookie } from "../utils/generateToken"


export async function signup(req: Request, res: Response): Promise<any> {
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }

        if(username.length >= 15) {
            return res.status(400).json({success: false, message: "Username must be less than 15 characters"})
        }

        const existingUserByUsername = await User.findOne({username: username})

        if(existingUserByUsername) {
            return res.status(400).json({success: false, message: "Username already exists"})
        }

        const existingUserByEmail = await User.findOne({email: email})

        if(existingUserByEmail) {
            return res.status(400).json({success: false, message: "Email already exists"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format"})
        }

        if(password.length < 6 || password.length >= 15) {
            return res.status(400).json({success: false, message: "Password must be between 6 and 15 characters"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        await newUser.save();
        generateAndSetCookie(newUser.id, res);
        res.status(201).json({success: true, message: "User created successfully", user: username, email});

    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
        console.log("Error in signup controller", error)
    }
}

export async function login(req: Request, res: Response): Promise<any> {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }

        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"})
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password)
        if(!isPasswordMatch) {
            return res.status(400).json({success:false, message: "Wrong password"})
        }

        generateAndSetCookie(user.id, res)

        return res.status(201).json({success:true, message: "Login successfully", user: email})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
        console.log("Error in login controller", error)
    }
}

export async function logout(req: Request, res: Response): Promise<any> {
    try {
        res.clearCookie('jwt-cafeBr')
        res.status(200).json({success: true, message: "Logout successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
        console.log("Error in logout controller", error)
    }
}

export async function getUser(req: Request, res: Response): Promise<any> {
    try {
        res.status(201).json({success: true, user: req.user})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
        console.log("Error in getUser controller", error)
    }
}