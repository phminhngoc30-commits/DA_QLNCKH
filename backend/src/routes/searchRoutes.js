import express from "express";
import { search, viewdetail, read } from "../controllers/searchControllers.js";

const router = express.Router();

router.get("/search", search);
router.get("/viewdetail/:id", viewdetail);
router.get("/read/:id", read);

export default router;
