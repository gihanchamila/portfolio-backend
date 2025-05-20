import Admin from "../models/Admin";
import hashPassword from "../utils/hashPassword";

const adminController = {
    signUp : async (req, res, next) => {
        try {
            const {firstName, lastName, email, role, password} = req.body

            const isEmailExist = await Admin.findOne({email})
            if(isEmailExist){
                res.code = 400;
                throw new Error("Email is already exit")
            }

            const hashedPassword = await hashPassword(password)

            const newAdmin = new Admin({
                firstName,
                lastName,
                email,
                role,
                password : hashedPassword
            })

            const createdAdmin = await newAdmin.save()
            res.status(201).json({
                status : true, 
                message : "Admin added successfully", 
                data : createdAdmin
            })

        }catch(error){
            next(error)
        }
    }
}