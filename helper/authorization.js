import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userModel.js'
dotenv.config({ quiet: true })
export const authorization = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decode.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}