import jwt from "jsonwebtoken";
import UserModel from "../models/UserSchema.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    // Find user in the database
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Authentication failed." });
    }

    req.user = { id: user._id, username: user.username };
    console.log("Authenticated User:", req.user); // Debugging

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid authentication token" });
    } else if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    } else {
      next(error);
    }
  }
};
