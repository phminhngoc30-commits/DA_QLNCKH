import express from "express";
import {
  addFavourite,
  removeFavourite,
  getFavouriteList,
  toggleFavourite
} from "../controllers/favouriteControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", protectedRoute, getFavouriteList);
router.post("/toggle", protectedRoute, toggleFavourite);
router.post("/:id", protectedRoute, addFavourite);
router.delete("/:id", protectedRoute, removeFavourite);

export default router;
