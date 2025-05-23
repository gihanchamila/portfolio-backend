import express from "express";
import authenticateAPIKey from "../middlewares/authMiddleware.js";
import idValidator from "../validators/idValidator.js"
import upload from "../middlewares/upload.js";

import {resumeController} from "../controllers/index.js";
import { validate } from "../validators/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = express.Router();

router.post("/upload", isAuth, isAdmin, upload.single("resume"), resumeController.uploadResume);
router.get("/download/:id", idValidator, validate, resumeController.downloadResume);

export default router;