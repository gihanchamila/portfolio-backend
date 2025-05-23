import Admin from "../models/Admin.js";
import comparePassword from "../utils/comparePassword.js";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js"

const adminController = {
    signUp : async (req, res, next) => {
        try {
            const {firstName, lastName, email, role, password} = req.body;

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
    },

    signIn : async (req, res, next) => {
        try{

            const {email, password} = req.body;

            const user = await Admin.findOne({email})
            if(!user){
                res.status(401).json({message : "Invalid credentials"})
            }

            const match = await comparePassword(password, user.password)
            if(!match){
                res.status(401).json({message : "Invalid credentials"})
            }

            const token = generateToken(user)

            res.status(200).json({
                code: 200,
                status: true,
                message: "User signin successful",
                data: { token, user},
            });

        }catch(error){
            next(error)
        }
    }
}

export default adminController