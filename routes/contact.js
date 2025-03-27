import express from "express";

import { contactController } from "../controllers/index.js";
import { createContactValidator } from "../validators/contact.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.post("/make-connection", createContactValidator, validate, contactController.createContact);
router.get("/get-connections", contactController.getAllContacts);

export default router;