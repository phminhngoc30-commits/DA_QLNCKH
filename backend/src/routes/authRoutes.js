import express from "express";
import authMiddleware, { signIn, signOut, forgotPassword, changePassword, sendOtp } from "../controllers/authControllers.js";
import { pool } from "../config/db.js";

const router = express.Router();
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", authMiddleware, changePassword);
router.post("/send-otp", authMiddleware, sendOtp);

export default router;
