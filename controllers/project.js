import File from "../models/File.js";
import Project from "../models/Project.js"
import { deleteFilesFromS3, deleteMultipleFilesFromS3 } from "../utils/awsS3.js";
import { deleteFiles } from "../utils/fileUtils.js";

import notFoundItem from "../utils/notFoundItem.js";

const projectController = {

    createProject: async (req, res, next) => {
        try {
            const { title, subtitle, description, projectUrl, githubUrl, techStack, file, images } = req.body;

            if (!file) {
                return res.status(400).json({ status: false, message: "file is required." });
            }

            const newProject = new Project({
                title,
                subtitle,
                description,
                projectUrl,
                githubUrl,
                techStack, 
                file, 
                images: images || [] 
            });

            const createdProject = await newProject.save();
            res.status(201).json({
                status: true,
                message: "Project created successfully",
                data: createdProject
            });
        } catch (error) {
            next(error);
        }
    },

    getProject : async (req, res, next) => {
        try{

            const { id } = req.params;
            
            const project = await Project.findById(id).populate("images");
            notFoundItem(project, res, "Project")

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
                .populate("file", "key")
                .lean()
                .skip((pageNumber - 1) * sizeNumber)
                .limit(sizeNumber);

            notFoundItem(projects, res, "Projects")

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

    updateProject: async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, subtitle, description, projectUrl, githubUrl, techStack, file: newFileId, images: newImageIds } = req.body;

        const projectToUpdate = await Project.findById(id);
        if (!projectToUpdate) {
            return res.status(404).json({ message: "Project not found." });
        }

        const oldFileId = projectToUpdate.file?.toString();
        const oldImageIds = (projectToUpdate.images || []).map(imgId => imgId.toString());

        projectToUpdate.title = title;
        projectToUpdate.subtitle = subtitle;
        projectToUpdate.description = description;
        projectToUpdate.projectUrl = projectUrl;
        projectToUpdate.githubUrl = githubUrl;
        if (techStack) projectToUpdate.techStack = techStack;
        if (newFileId) projectToUpdate.file = newFileId;
        if (newImageIds) projectToUpdate.images = newImageIds;

        const updatedProject = await projectToUpdate.save();

        const filesToDelete = [];
        
        if (newFileId && newFileId !== oldFileId && oldFileId) {
            filesToDelete.push(oldFileId);
        }
        
        const finalImageIds = (updatedProject.images || []).map(imgId => imgId.toString());
        oldImageIds.forEach(oldId => {
            if (oldId && !finalImageIds.includes(oldId)) {
                filesToDelete.push(oldId);
            }
        });
        
        if (filesToDelete.length > 0) {
            deleteFiles(filesToDelete); 
        }

        res.status(200).json({
            status: true,
            message: "Project updated successfully",
            data: updatedProject,
        });

    } catch (error) {
        console.error("--- UPDATE PROJECT CRASHED ---");
        console.error(error); 
        next(error); 
    }
    },

    deleteProject : async (req, res, next) => {
        try{

            // http://localhost:8000/api/v1/project/delete-project/67e43716cacaef921bd26158
            // /delete-project/:id

            const { id } = req.params;

            const project = await Project.findById(id);
            notFoundItem(project, res, "Project");
            console.log("project", project)

            if (project.file) {
                const file = await File.findById(project.file);
                if (file && file.key) {
                    await deleteFilesFromS3(file.key);
                    await File.findByIdAndDelete(file._id);
                }
            }

            if (project.images && project.images.length > 0) {
                const imageIds = project.images.map(id => id.toString());
                console.log("Deleting image files:", imageIds);
                await deleteFiles(imageIds);
            }

            await Project.findByIdAndDelete(id);

            res.status(200).json({
                code: 200,
                status: true,
                message: "project deleted successfully",
                data: project,
            })

        }catch(error){
            next(error)
        }
    },

}

export default projectController