import express from "express";
import { validate } from "../validators/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createAdminValidator, adminSignInValidator } from "../validators/admin.js";
import { adminController } from "../controllers/index.js";

const router = express.Router();

router.post("/signup", createAdminValidator, validate, adminController.signUp);
router.post("/signin", adminSignInValidator, validate, adminController.signIn);

export default router;