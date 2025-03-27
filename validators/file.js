export const validateExtention = (ext) => {
    if(ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".pdf"){
        return true
    }else{
        return false
    }
}