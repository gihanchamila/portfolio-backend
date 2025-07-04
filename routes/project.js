import express from "express";
import idValidator from "../validators/idValidator.js"
import authenticateAPIKey from "../middlewares/authMiddleware.js";

import {projectController} from "../controllers/index.js";
import {createProjectValidator} from "../validators/project.js"
import { validate } from "../validators/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create-project",isAuth, isAdmin, createProjectValidator, validate, projectController.createProject )
router.get("/get-project/:id",idValidator, validate, projectController.getProject )
router.get("/get-projects", projectController.getProjects )
router.put("/update-project/:id",isAuth, isAdmin, idValidator, validate, projectController.updateProject )
router.delete("/delete-project/:id",isAuth, isAdmin, idValidator, validate, projectController.deleteProject )

export default router;