import express from "express";
import authenticateAPIKey from "../middlewares/authMiddleware.js";
import idValidator from "../validators/idValidator.js"
import upload from "../middlewares/upload.js";

import {resumeController} from "../controllers/index.js";
import { validate } from "../validators/validate.js";


const router = express.Router();

router.post("/upload", authenticateAPIKey, upload.single("resume"), resumeController.uploadResume);
router.get("/download/:id", idValidator, validate, resumeController.downloadResume);

export default router;