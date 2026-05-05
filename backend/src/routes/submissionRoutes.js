import express from "express";
import { submitProject, saveDraft, updateProject, deleteProject, getSubmissionStatus } from "../controllers/submissionControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/status", protectedRoute, getSubmissionStatus);
router.post("/submit", protectedRoute, upload.single('file'), submitProject);
router.post("/draft", saveDraft);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
