import express from "express";
import {fileController} from "../controllers/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", upload.single("image"), fileController.uploadFile);
router.get("/signed-url", fileController.getSignedUrl);
router.delete("/delete", fileController.deleteFile);

export default router;