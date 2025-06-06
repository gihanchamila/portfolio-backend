import express from "express";

import { contactController } from "../controllers/index.js";
import { createContactValidator } from "../validators/contact.js";
import { validate } from "../validators/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/make-connection", createContactValidator, validate, contactController.createContact);
router.get("/get-connections", isAuth, isAdmin, contactController.getAllContacts);

export default router;