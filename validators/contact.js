import { check, param } from "express-validator";

export const createContactValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .escape(),

    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail() 
        .trim(),
    check("message")
        .notEmpty()
        .withMessage("Message is required")
        .trim() 
        .escape()
];