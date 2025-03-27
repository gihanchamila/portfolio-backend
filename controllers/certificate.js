import mongoose from "mongoose";

import Certification from "../models/Certification.js";
import notFoundItem from "../utils/notFoundItem.js";

const certificateController = {

    createCertificate : async (req, res, next) => {
        try{
            
            const { title, organization, issueDate, credentialURL } = req.body;

            const newCertification = new Certification({
                title,
                organization,
                issueDate,
                credentialURL
            })
    
            const createdCertification = await newCertification.save();
            res.status(201).json({
                status : true, 
                message : "certificate created successfully", 
                data : createdCertification
            })
        }
        catch(error){
            next(error)
        }
    },

    getCertificate : async (req, res, next) => {
        try{

            const { id } = req.params;

            const certification = await Certification.findById(id)
            notFoundItem(certification)

            res.status(200).json({
                code: 200,
                status: true,
                message: "certification retrieved successfully",
                data: certification,
            })

        }catch(error){
            next(error)
        }
    },

    getCertificates : async (req, res, next) => {
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

            const total = await Certification.countDocuments(query)
            const pages = Math.ceil(total / sizeNumber)

            const certifications = await Certification.find(query)
            .skip((pageNumber - 1) * sizeNumber)
            .limit(sizeNumber)

            notFoundItem(certifications)

            res.status(200).json({
                code : 200, 
                status : true, 
                message : "Get certifications successfully", 
                data : {certifications, total, pages}
            })

        }catch(error){
            next(error)
        }
    },

    updateCertificate : async (req, res, next) => {
        try{

            const { title, organization, issueDate, credentialURL } = req.body;
            const { id } = req.params;

            const certification = await Certification.findById(id)

            notFoundItem(certification)

            certification.title = title || certification.title
            certification.organization = organization || certification.organization
            certification.issueDate = issueDate || certification.issueDate
            certification.credentialURL = credentialURL || certification.credentialURL


            const updatedCertification = await certification.save()

            res.status(200).json({
                code: 200,
                status: true,
                message: "certification updated successfully",
                data: updatedCertification,
            })

        }catch(error){
            next(error)
        }
    },

    deleteCertificate  : async (req, res, next) => {
            try{
    
                const { id } = req.params;
    
                const certification = await Certification.findByIdAndDelete(id)
                notFoundItem(certification)
    
                res.status(200).json({
                    code: 200,
                    status: true,
                    message: "certification deleted successfully",
                    data: certification,
                })
    
            }catch(error){
                next(error)
            }
    }
}

export default certificateController