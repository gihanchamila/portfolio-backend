import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String],},
    projectUrl: { type: String },
    githubUrl: { type: String },
    file : {type : mongoose.Types.ObjectId, ref : "file"},
}, { timestamps: true });

const Project = mongoose.model("project", projectSchema);
export default Project;