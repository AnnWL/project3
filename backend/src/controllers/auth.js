import UserModel from "../models/UserSchema.js";
import {
  hashPassword,
  comparePassword,
  generateJwt,
  verifyToken,
} from "../utils/auth.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    // Input validation
    if (!username || !password || !email) {
      throw new BadRequestError("Username, password and email are required");
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new ConflictError("Username already exists");
    }

    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      throw new ConflictError("Email already exists");
    }
    // Hash password using hashPassword from authUtils
    const hashedPassword = await hashPassword(password);

    // Create new user
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ status: "ok", msg: "User created successfully" });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      throw new BadRequestError("Username and password are required");
    }

    // Find user in database
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new NotFoundError(`User not found: ${username}`);
    }

    // Compare provided password with stored password using comparePassword from authUtils
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid username or password");
    }

    // Generate JWT tokens using generateJwt from authUtils
    const claims = { id: user._id, username: user.username };
    const accessToken = generateJwt(claims, process.env.ACCESS_SECRET, "20m");
    const refreshToken = generateJwt(claims, process.env.REFRESH_SECRET, "30d");

    res.json({
      access: accessToken,
      refresh: refreshToken,
      username: user.username,
      _id: user._id,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required");
    }

    // Verify refresh token using verifyToken from authUtils
    const decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET);

    // Generate new access token using generateJwt from authUtils
    const accessToken = generateJwt(
      { username: decoded.username },
      process.env.ACCESS_SECRET,
      "20m"
    );

    res.json({ access: accessToken });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};
