import Contact from '../models/Contact.js'
import { generateCode } from '../utils/generateCode.js';
import notFoundItem from '../utils/notFoundItem.js'
import { sendMail } from '../utils/sendEmail.js'

const contactController = {

    createContact: async (req, res, next) => {
        try {
            const { name, email, message } = req.body;

            // Check if the user is verified
            const user = await Contact.findOne({ email });
            if (!user || !user.isVerified) {
                return res.status(400).json({
                    status: false,
                    message: "Email not verified. Please verify your email first."
                });
            }

            const newContact = new Contact({
                name,
                email,
                message
            });

            const createdContact = await newContact.save();

            await sendMail({
                emailTo: email,
                subject: "Message Received",
                content: "Your form has been submitted successfully",
                name: name
            });

            res.status(201).json({
                status: true,
                message: "Message sent successfully",
                data: createdContact
            });
        } catch (error) {
            next(error);
        }
    },

    getAllContacts : async (req, res, next) => {
        try{
            const {size, q, page} = req.query;
            const pageNumber = parseInt(page) || 1
            const sizeNumber = parseInt(size) || 4
            let query = {}

            if(q){
                const search = new RegExp(q, "i")
                query = {
                    $or: [{title : search}]
                }
            }

            const total = await Contact.countDocuments(query)

            const pages = Math.ceil(total / sizeNumber)
            
            const contacts = await Contact.find(query).lean().skip((pageNumber - 1) * sizeNumber).limit(sizeNumber);

            notFoundItem(contacts, res, "Contacts")

            res.status(200).json({
                code : 200, 
                status : true, 
                message : "Get projects successfully", 
                data : {contacts, total, pages}
            })
        }
        catch(error){
            next(error)
        }
    },

    sendVerificationCode: async (req, res, next) => {
        try {
            const { email } = req.body;

            // Generate a random verification code
            const code = generateCode(6); // Assuming generateCode generates a 6-digit code

            // Check if the user already exists
            let user = await Contact.findOne({ email });
            if (!user) {
                user = new Contact({ email, code, isVerified: false });
            } else {
                user.code = code;
                user.isVerified = false;
            }

            await user.save();

            // Send the verification code via email
            await sendMail({
                emailTo: email,
                subject: "Email Verification Code",
                content: `Your verification code is: ${code}`,
                name: "User"
            });

            res.status(200).json({
                status: true,
                message: "Verification code sent successfully"
            });
        } catch (error) {
            next(error);
        }
    },

    verifyUser: async (req, res, next) => {
        try {
            const { email, code } = req.body;

            const user = await Contact.findOne({ email });

            notFoundItem(user, res, "User");

            if (user.code !== code) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid code"
                });
            }

            user.isVerified = true;
            user.code = null;
            await user.save();

            res.status(200).json({
                status: true,
                message: "User verified successfully"
            });
        } catch (error) {
            next(error);
        }
    }

}

export default contactController;
