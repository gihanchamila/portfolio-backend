import { check, param } from "express-validator";

export const createCertificationValidator = [
    check("title").notEmpty().withMessage("Title is required"),
    check("organization").notEmpty().withMessage("Organization is required"),
    check("issueDate").notEmpty().withMessage("Issue Date is required"),
    check("credentialURL").notEmpty().withMessage("Credential URL is required").isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage("Invalid Credential URL"),
]