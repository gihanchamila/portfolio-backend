import { check, param } from "express-validator";

export const createContactValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    check("message").notEmpty().withMessage("Message is required"),
]