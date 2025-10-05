import express from "express";
import upload from "../utils/upload.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.get("/allusers", getAllUsers);
router.get("/allusers:id", getUserById);
router.post("/adduser", upload.single("profilePicture"), createUser);
// router.post("/adduser", createUser);
router.post("/login", loginUser);
export default router;
