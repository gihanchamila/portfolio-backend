import express from "express";
import {fileController} from "../controllers/index.js";
import upload from "../middlewares/upload.js";
import authenticateAPIKey from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/upload", isAuth, isAdmin, upload.single("image"), fileController.uploadFile);
router.get("/signed-url", fileController.getSignedUrl);
router.delete("/delete",isAuth, isAdmin, fileController.deleteFile);

export default router;