import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// Environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h"; // Token expiry duration
const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
const sendJsonToken = (user, statusCode, req, res) => {
  if (user.dataValues.id === undefined) {
    throw new Error("User ID is undefined");
  }
  const token = signToken(user.dataValues.id.toString());
  const expir = parseInt(process.env.JWT_COOKIE_EXPIRE_IN) || 1;

  const cookieOptions = {
    expires: new Date(Date.now() + expir * 24 * 60 * 60 * 1000),
    //httpOnly: true,
  };
  res.cookie("jwt", token, {
    ...cookieOptions,
  });
  res.status(statusCode).json({
    status: "success",
    token,
  });
};
// Register Controller
export const register = async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    // Send JWT token and user info
    sendJsonToken(newUser, 201, req, res);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send JWT token and user info
    sendJsonToken(user, 200, req, res);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const checkUserSession = async (req, res) => {
  try {
    // Retrieve the token from the Authorization header or cookies
    let token;
    if (req.headers.cookie?.split("=")[1]) {
      token = req.headers.cookie?.split("=")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data if the token is valid
    return res.status(200).json({
      message: "Session active",
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
