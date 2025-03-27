import mongoose from "mongoose";

import File from "../models/File.js";
import Project from "../models/Project.js"

import notFoundItem from "../utils/notFoundItem.js";

const projectController = {

    createProject : async (req, res, next) => {
        try{
            
            const { title, subtitle, description, projectUrl, githubUrl, file } = req.body;
            if(file){
                const isFileExist = await File.findById(file)
                if(!isFileExist){
                    res.code = 404;
                    throw new Error("File not found")
                }
            }
    
            const newProject = new Project({
                title,
                subtitle,
                description,
                projectUrl,
                githubUrl,
                file
            })
    
            const createdProject = await newProject.save();
            res.status(201).json({
                status : true, 
                message : "Project created successfully", 
                data : createdProject
            })
        }
        catch(error){
            next(error)
        }
    },

    getProject : async (req, res, next) => {
        try{

            const { id } = req.params;

            const project = await Project.findById(id)
            notFoundItem(project)

            res.status(200).json({
                code: 200,
                status: true,
                message: "project retrieved successfully",
                data: project,
            })

        }catch(error){
            next(error)
        }
    },

    getProjects : async (req, res, next) => {
        try{

            const {size, q, page} = req.query;
            const pageNumber = parseInt(page) || 1
            const sizeNumber = parseInt(size) || 4
            let query = {}

            if(q){
                const search = new RegExp(q, "i")
                query = {
                    $or: [{title : search}]
                }
            }

            const total = await Project.countDocuments(query)
            const pages = Math.ceil(total / sizeNumber)

            const projects = await Project.find(query)
            .skip((pageNumber - 1) * sizeNumber)
            .limit(sizeNumber)

            notFoundItem(projects)

            res.status(200).json({
                code : 200, 
                status : true, 
                message : "Get projects successfully", 
                data : {projects, total, pages}
            })

        }catch(error){
            next(error)
        }
    },

    updateProject : async (req, res, next) => {
        try{

            const { title, subtitle, description, projectUrl, githubUrl, file } = req.body;
            const { id } = req.params;

            if (file) {
                const isFileExist = await File.findById(file);
                notFoundItem(isFileExist)
            }

            const project = await Project.findById(id)

            notFoundItem(project)

            project.title = title || project.title;
            project.subtitle = subtitle || project.subtitle;
            project.description = description || project.description;
            project.projectUrl = projectUrl || project.projectUrl;
            project.githubUrl = githubUrl || project.githubUrl;
            project.file = file || project.file

            const updatedProject = await project.save()

            res.status(200).json({
                code: 200,
                status: true,
                message: "project updated successfully",
                data: updatedProject,
            })

        }catch(error){
            next(error)
        }
    },

    deleteProject : async (req, res, next) => {
        try{

            const { id } = req.params;

            const project = await Project.findByIdAndDelete(id)
            notFoundItem(project)

            res.status(200).json({
                code: 200,
                status: true,
                message: "project deleted successfully",
                data: project,
            })

        }catch(error){
            next(error)
        }
    }


}

export default projectController