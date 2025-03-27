import express from "express";
import idValidator from "../validators/idValidator.js"

import {certificateController} from "../controllers/index.js";
import {createCertificationValidator} from "../validators/certification.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.post("/create-certificate", createCertificationValidator, validate, certificateController.createCertificate);
router.get("/get-certificate/:id", idValidator, validate, certificateController.getCertificate);
router.get("/get-certificates", certificateController.getCertificates);
router.put("/update-certificate/:id", idValidator, validate, certificateController.updateCertificate);
router.delete("/delete-certificate/:id", idValidator, validate, certificateController.deleteCertificate);

export default router;