import express from "express";
import { userController  } from "../controllers/index.js";
import { createUserValidator, userEmailValidator } from "../validators/user.js";
import { validate }  from "../validators/validate.js";

const router = express.Router();

router.get("/check-verification", userEmailValidator, validate, userController.checkVerification)
router.post("/send-verification-code", createUserValidator, validate, userController.sendVerificationCode);
router.post("/verify-user", createUserValidator, validate,  userController.verifyUser);

export default router;