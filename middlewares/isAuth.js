import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/keys.js";

// This is checking the user is authenticated
// Only for admin the authentication required, not other website visitors
// Uses jwt authentication

export const isAuth = async(req, res, next) => {
    try{
        
        const authorization = req.headers.authorization? req.headers.authorization.split(" ") : []
        const token = authorization.length > 1 ? authorization[1] : null

        if(token){
            const payload = jwt.verify(token, jwtSecret)

            if(payload){
                req.user = {
                    _id : payload._id,
                    name : payload.name,
                    email : payload.email,
                    role : payload.role
                }
            }else{
                res.code = 401;
                throw new Error("Unauthorized")
            }
        }else{
            res.code = 400;
            throw new Error("Token is required")
        }
        next()
    }catch(error){
        next(error)
    }
}