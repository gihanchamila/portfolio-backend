import { deleteMultipleFilesFromS3 } from "./awsS3.js";
import File from "../models/File.js";

// Accept file ids as array
export const deleteFiles = async (fileIds) => {
    if (!fileIds || fileIds.length === 0) return;

    try {
        const filesToDelete = await File.find({ '_id': { $in: fileIds } })
        if (filesToDelete.length === 0) return;

        // Extract keys from file using file ids
        const keysToDelete = filesToDelete.map(file => file.key).filter(key => key);
        if (keysToDelete.length > 0) {
            await deleteMultipleFilesFromS3(keysToDelete);
        }
        await File.deleteMany({ '_id': { $in: fileIds } });
    } catch (error) {
        console.error("Error during background file deletion process:", error);
    }
};