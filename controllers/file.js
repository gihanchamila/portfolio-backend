import path from "path";
import mongoose from "mongoose";
import sharp from "sharp";

import File from "../models/File.js";

import { validateExtention } from "../validators/file.js";
import { uploadFileToS3, signedUrl, deleteFilesFromS3 } from "../utils/awsS3.js";


const fileController = {

    uploadFile: async (req, res, next) => {
        try {
            const { base64Image} = req.body;
            const { file } = req;

            let buffer, ext, isValidExt;
            
            if (base64Image) {

                const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
                buffer = Buffer.from(base64Data, 'base64');
                ext = base64Image.split(';')[0].split('/')[1];
                isValidExt = validateExtention(`.${ext}`);

                if (!isValidExt) {
                    return res.status(400).json({ code: 400, status: false, message: "Only 'jpg', 'jpeg' or 'png' is allowed" });
                }

            } else if (file) {
                buffer = file.buffer; 
                ext = path.extname(file.originalname).replace('.', '');
                isValidExt =validateExtention(`.${ext}`);
                if (!isValidExt) {
                    return res.status(400).json({ code: 400, status: false, message: "Only 'jpg', 'jpeg' or 'png' is allowed" });
                }
            } else {
                return res.status(400).json({ code: 400, status: false, message: "No file data provided" });
            }

            const outputFormat = "avif";
            const compressedBuffer = await sharp(buffer)
                .resize({ width: 800 })
                .toFormat(outputFormat, { quality: 50 })
                .toBuffer();

            const key = await uploadFileToS3({ file: { buffer: compressedBuffer }, ext: `.${outputFormat}` });
            if (key) {
                const newFile = new File({
                    key,
                    size: compressedBuffer.length,
                    mimetype: `image/${outputFormat}`,
                });
                await newFile.save();
                return res.status(201).json({
                    code: 201,
                    status: true,
                    message: "File uploaded successfully",
                    data: { key, id: newFile._id },
                });
            }
    
            return res.status(500).json({ 
                code: 500, 
                status: false, 
                message: "File upload failed" 
            });
        } catch (error) {
            next(error);
        }
    },

    getSignedUrl : async (req, res, next) => {
        try{
            const {key} = req.query;
            const url = await signedUrl(key)

            res.status(200).json({ 
                code : 200, 
                status : true, 
                message : "Get signed url successfully", 
                data : {url}
            })

        }catch(error){
            next(error)
        }
    },

    deleteFile : async (req, res, next) => {
        try{

            const {key} = req.query;
            if(!key){
                res.code = 404;
                throw new Error("Key not found")
            }

            await deleteFilesFromS3(key)
            const file = await File.findOneAndDelete(key);

            if(!file){
                res.code = 404;
                throw new Error("File not found")
            }
            
            res.status(200).json({ 
                code : 200, 
                status : true, 
                message : "File deleted successfully"
            })

        }catch(error){
            next(error)
        }
    },

    deleteFileById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "File ID is required." });
            }

            const file = await File.findById(id);

            if (!file) {
                return res.status(200).json({ status: true, message: "File already deleted or not found." });
            }

            await deleteFilesFromS3([file.key]);
            await File.findByIdAndDelete(id);
            
            res.status(200).json({ status: true, message: "File deleted successfully" });
        } catch (error) {
            console.error("--- DELETE FILE BY ID CRASHED ---");
            console.error(error);
            next(error);
        }
    },

}

export default fileController;