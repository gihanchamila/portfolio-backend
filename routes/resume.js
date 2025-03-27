import express from "express";
import authenticateAPIKey from "../middlewares/authMiddleware.js";
import {resumeController} from "../controllers/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", authenticateAPIKey, upload.single("resume"), resumeController.uploadResume);
router.get("/download/:id", resumeController.downloadResume);

export default router;