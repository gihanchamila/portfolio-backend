import { deleteMultipleFilesFromS3 } from "./awsS3.js";
import File from "../models/File.js";

export const deleteFiles = async (fileIds) => {
    if (!fileIds || fileIds.length === 0) return;

    try {
        const filesToDelete = await File.find({ '_id': { $in: fileIds } })
        console.log(filesToDelete);
        if (filesToDelete.length === 0) return;

        const keysToDelete = filesToDelete.map(file => file.key).filter(key => key);
        console.log(keysToDelete)
        if (keysToDelete.length > 0) {
            console.log("Deleting from aws s3")
            await deleteMultipleFilesFromS3(keysToDelete);
            console.log(`Successfully deleted ${keysToDelete.length} file records from awss3.`);
        }
        await File.deleteMany({ '_id': { $in: fileIds } });
        console.log(`Successfully deleted ${fileIds.length} file records from DB.`);
    } catch (error) {
        console.error("Error during background file deletion process:", error);
    }
};