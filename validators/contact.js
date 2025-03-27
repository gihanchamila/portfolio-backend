import { check, param } from "express-validator";

export const createContactValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required"),
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail() // Sanitizes the email (e.g., removes unnecessary characters)
        .trim(), // Removes leading and trailing spaces
    check("message")
        .notEmpty()
        .withMessage("Message is required")
        .trim() // Removes leading and trailing spaces
];