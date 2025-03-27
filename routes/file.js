import express from "express";
import {fileController} from "../controllers/index.js";
import upload from "../middlewares/upload.js";
import authenticateAPIKey from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", authenticateAPIKey, upload.single("image"), fileController.uploadFile);
router.get("/signed-url", fileController.getSignedUrl);
router.delete("/delete",authenticateAPIKey, fileController.deleteFile);

export default router;