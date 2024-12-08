import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js"; // Ensure your model path is correct
import cookieParser from "cookie-parser"; // Import cookie-parser
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use your secret from environment

export const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        req.user = user;

        // console.log("Authorized User:", req.user); 

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
