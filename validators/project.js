import { check, param } from "express-validator";

export const createProjectValidator = [
    check("title").notEmpty().withMessage("Title is required"),
    check("subtitle").notEmpty().withMessage("Subtitle is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("projectUrl").notEmpty().withMessage("ProjectUrl is required") .isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage("Invalid project URL"),
    check("githubUrl").notEmpty().withMessage("GithubUrl is required").isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage("Invalid GitHub URL").matches(/^https:\/\/github\.com\//).withMessage("GitHub URL must start with 'https://github.com/'"),
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