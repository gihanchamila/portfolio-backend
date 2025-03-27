import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
    title: { type: String}, 
    file: { type: String, required: true }, 
}, { timestamps: true });

const Resume = mongoose.model("resume", resumeSchema);
export default Resume;