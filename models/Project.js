import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true }, // Example: ['React', 'Node.js']
    link: { type: String }, // Project URL
    github: { type: String }, // GitHub link (if public)
    file : {type : mongoose.Types.ObjectId, ref : "file"},
    date: { type: Date, default: Date.now }
})

const Project = mongoose.model("project", projectSchema);
export default Project;