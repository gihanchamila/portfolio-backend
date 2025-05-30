import mongoose from "mongoose";
import notFoundItem from "../utils/notFoundItem.js";
import Resume from "../models/Resume.js";
import { signedUrl, uploadFileToS3 } from "../utils/awsS3.js";

const resumeController = {

    uploadResume: async (req, res, next) => {
        try {
            const { file } = req; 

            if (!file) {
                return res.status(400).json({
                    status: false,
                    message: "No file provided",
                });
            }

            if (file.mimetype !== "application/pdf") {
                return res.status(400).json({
                    status: false,
                    message: "Invalid file type. Only PDF files are allowed.",
                });
            }

            // Upload the file to S3
            const key = await uploadFileToS3({ file, ext: ".pdf" });

            if (!key) {
                return res.status(500).json({
                    status: false,
                    message: "Failed to upload resume",
                });
            }

            // Save the resume details in the database
            const newResume = new Resume({
                title: file.originalname,
                file: key,
            });

            const createdResume = await newResume.save();

            res.status(201).json({
                status: true,
                message: "Resume uploaded successfully",
                data: createdResume,
            });
        } catch (error) {
            next(error);
        }
    },

    downloadResume: async (req, res, next) => {
        try {
            const { id } = req.params;

            // Find the resume by ID
            const resume = await Resume.findById(id);
            notFoundItem(resume);

            // Generate a signed URL for the file
            const url = await signedUrl(resume.file);

            res.status(200).json({
                status: true,
                message: "Resume download link generated successfully",
                data: { url },
            });
        } catch (error) {
            next(error);
        }
    },

}

export default resumeController;