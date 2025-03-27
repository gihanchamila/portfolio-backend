import { check, param } from "express-validator";

export const createProjectValidator = [
    check("title").notEmpty().withMessage("Title is required"),
    check("subtitle").notEmpty().withMessage("subtitle is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("projectUrl").notEmpty().withMessage("projectUrl is required"),
    check("githubUrl").notEmpty().withMessage("githubUrl is required"),
    check("file").notEmpty().withMessage("file is required"),
]

export const updateProjectValidator = [
    check("title").optional(),
    check("subtitle").optional(),
    check("description").optional(),
    check("projectUrl").optional(),
    check("githubUrl").optional(),
    check("file").optional(),
]