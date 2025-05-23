import {check} from "express-validator"

export const createAdminValidator = [
    check("firstName")
        .notEmpty()
        .withMessage("First Name is required"),
    check("lastName")
        .notEmpty()
        .withMessage("Last Name is required"),
    check("email")
        .isEmail()
        .notEmpty()
        .withMessage("Email is required"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),

]

export const adminSignInValidator = [
    check("email")
        .isEmail()
        .notEmpty()
        .withMessage("Email is required"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
]