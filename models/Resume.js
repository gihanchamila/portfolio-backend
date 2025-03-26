import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
    title: { type: String, required: true }, // Example: "Current CV - March 2025"
    fileURL: { type: String, required: true }, // AWS S3 URL
    uploadedAt: { type: Date, default: Date.now }
})

const Resume = mongoose.model("resume", resumeSchema);
export default Resume;