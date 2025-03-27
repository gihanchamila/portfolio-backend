import {check, param} from "express-validator";
import mongoose from "mongoose";

const idValidator = [
    check("id").exists().withMessage("id is required"),
    
    param("id").custom( 
        async(id) => {
            if(id && !mongoose.Types.ObjectId.isValid(id)){
                throw "Invalid id"
            }
    })
]

export default idValidator