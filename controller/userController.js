import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createUserService, findUserService } from "../service/userService.js"
import { StatusCodes } from 'http-status-codes'
dotenv.config({ quiet: true })
export const register = async (req, res) => {
    let { email } = req.body
    try {
        const userIsExist = await findUserService({ email })
        if (userIsExist) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                statusCode: StatusCodes.CONFLICT,
                message: "User already exists"
            })
        }
        const newUser = await createUserService(req.body)
        if (newUser) {
            return res.status(StatusCodes.CREATED).json({
                success: true,
                statusCode: StatusCodes.CREATED,
                message: "User registered successfully"
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Registration failed, please try again later"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = /\S+@\S+\.\S+/.test(email);

        const existingUser = await findUserService(isEmail ? { email } : { name: email });
        if (!existingUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: "Account not found"
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRE_IN }
        )
        return res.status(StatusCodes.OK).json({
            success: true,
            statusCode: StatusCodes.OK,
            message: "Login successful",
            token: token
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Login failed, please try again later"
        })
    }
};