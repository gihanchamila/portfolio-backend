import express from "express";
import { userController  } from "../controllers/index.js";
import { createUserValidator} from "../validators/user.js";
import { validate }  from "../validators/validate.js";

const router = express.Router();

router.get("/check-verification", createUserValidator, validate, userController.checkVerification)
router.post("/send-verification-code", createUserValidator, validate, userController.sendVerificationCode);
router.post("/verify-user", createUserValidator, validate,  userController.verifyUser);

export default router;