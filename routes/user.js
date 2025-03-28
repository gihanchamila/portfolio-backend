import express from "express";
import { userController  } from "../controllers/index.js";


const router = express.Router();

router.post("/send-verification-code", userController.sendVerificationCode);
router.post("/verify-user", userController.verifyUser);

export default router;