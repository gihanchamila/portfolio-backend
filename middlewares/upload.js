import multer from "multer";

// This will limit the file size of the uploading image, using multer library

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {fileSize : 1024 * 1024 * 50}
});

export default upload