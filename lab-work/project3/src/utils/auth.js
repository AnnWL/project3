import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Helper function to hash passwords
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

// Helper function to compare passwords
export const comparePassword = async (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};

// Helper function to generate JWT tokens
export const generateJwt = (claims, secret, expiresIn) => {
  return jwt.sign(claims, secret, {
    expiresIn,
    jwtid: uuidv4(),
  });
};

// Helper function to verify JWT token
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
