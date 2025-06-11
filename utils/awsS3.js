import { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { awsAccessKey, awsSecretAccessKey, awsBucketName, awsRegion } from "../config/keys.js";
import { generateCode } from "./generateCode.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create a new S3 client
const client = new S3Client({
    region : awsRegion,
    credentials : {
        accessKeyId : awsAccessKey,
        secretAccessKey : awsSecretAccessKey
    }
});

// Function to upload file to S3
// This function will take an object as an argument
export const uploadFileToS3 = async({file, ext}) => {

    // Generate random number 
    const Key = `${generateCode(12)}_${Date.now()}${ext}`

    const params = {

        // All the keys that are start with param object is capitalized
        Bucket : awsBucketName,
        Body : file.buffer,
        Key,
        ContentType : file.mime,
        CacheControl: "max-age=31536000"
    }

    const command = new PutObjectCommand(params)

    try{
        await client.send(command)
        return Key
    }catch(error){
        console.log(error)
    }
}

// Function to get signed URL
// This function will take a key as an argument
export const signedUrl = async(Key) => {
    const params = {
        Bucket : awsBucketName,
        Key
    }

    const command = new GetObjectCommand(params)

    try{
        const url = await getSignedUrl(client, command, {expiresIn : 100})
        return url
    }catch(error){
        console.log(error)
    }
}

/**
 * Deletes a SINGLE file from AWS S3.
 * @param {string} key - The key of the single object to delete.
 */

export const deleteFilesFromS3 = async(Key) => {
    const params = {
        Bucket : awsBucketName,
        Key
    }

    const command = new DeleteObjectCommand(params)

    try{
        await client.send(command)
        return
    }catch(error){
        console.log(error)
    }
}

/**
 * Deletes MULTIPLE files from AWS S3 in a single batch request.
 * @param {string[]} keys - An array of object keys to delete.
 */
export const deleteMultipleFilesFromS3 = async (keys) => {
    if (!keys || keys.length === 0) return;

    const objectsToDelete = keys.map(key => ({ Key: key }));
    const params = {
        Bucket: awsBucketName,
        Delete: {
            Objects: objectsToDelete,
        },
    };
    const command = new DeleteObjectsCommand(params);
    try {
        await client.send(command);
    } catch (error) {
        console.error("Error during S3 batch deletion:", error);
        throw error;
    }
};
