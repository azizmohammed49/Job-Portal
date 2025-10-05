import { token } from "morgan";
import UserModel from "../models/userModel.js";
import { generateToken, compareHash } from "../utils/crypt.js";
import { appLogger, dbLogger } from "../utils/logger.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    appLogger.error("Get All Users Error:", error);
    dbLogger.error("Get All Users Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      appLogger.info("User Not Found");
      dbLogger.info("User Not Found");
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    appLogger.error("Get User By ID Error:", error);
    dbLogger.error("Get User By ID Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createUser = async (req, res) => {
  try {
    req.body.profilePicture = req.file ? req.file.filename : null;
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    appLogger.info("User Created Successfully");
    dbLogger.info("User Created Successfully");
    res.status(201).json({
      message: "User Created Successfully!",
      success: true,
      data: savedUser,
    });
  } catch (error) {
    appLogger.error("Create User Error:", error);
    dbLogger.error("Create User Error:", error);
    if (error.code === 11000) {
      res.status(500).json({
        message: `Internal Server Error  ${error.message}`,
        success: false,
        error,
      });
    }
  }
};

export const loginUser = async (req, res) => {
  // Implementation for user login
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    appLogger.info("User Logged In Successfully");
    dbLogger.info("User Logged In Successfully");
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    appLogger.error("Login User Error:", error);
    dbLogger.error("Login User Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
