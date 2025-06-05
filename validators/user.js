import { check } from "express-validator";

export const createUserValidator = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail() 
        .trim(),
]

export const userEmailValidator = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .trim()
]