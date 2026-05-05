import express from "express";
import { authMe, updateUserProfile, getUserProfile } from "../controllers/userControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { pool } from "../config/db.js";

const router = express.Router();

router.get("/me", protectedRoute, authMe);
router.get("/profile", protectedRoute, getUserProfile);
router.put("/profile", protectedRoute, updateUserProfile);

export default router;
