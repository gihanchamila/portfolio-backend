import express from "express";
import {projectController} from "../controllers/index.js";
import {createProjectValidator} from "../validators/project.js"
import { validate } from "../validators/validate.js";

const router = express.Router();

router.post("/create-project", createProjectValidator, validate, projectController.createProject )

export default router;