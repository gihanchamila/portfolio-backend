import mongoose from "mongoose";
import File from "../models/File.js";
import Project from "../models/Project.js"

const projectController = {

    createProject : async (req, res, next) => {

        const { title, subtitle, description, projectUrl, githubUrl, file } = req.body;

        if(file){
            const isFileExist = await File.findById(file)
            if(!isFileExist){
                res.code = 404;
                throw new Error("File not found")
            }
        }

        const createProject = new Project({
            title,
            subtitle,
            description,
            projectUrl,
            githubUrl,
            file
        })

        const createdProject = await createProject.save();
        res.status(201).json({status : true, message : "Project created successfully", data : createdProject})
    }
}

export default projectController