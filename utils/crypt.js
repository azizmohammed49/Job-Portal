import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compareHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
