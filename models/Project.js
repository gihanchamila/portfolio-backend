import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String] },
    projectUrl: { type: String },
    githubUrl: { type: String },
    
    // --- MODIFICATION START ---
    file: { type: mongoose.Types.ObjectId, ref: "file", required: true },
    images: [{ type: mongoose.Types.ObjectId, ref: "file" }]
    // --- MODIFICATION END ---

}, { timestamps: true });

const Project = mongoose.model("project", projectSchema);
export default Project;