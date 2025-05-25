import Contact from '../models/Contact.js'
import { generateCode } from '../utils/generateCode.js';
import notFoundItem from '../utils/notFoundItem.js'
import { sendMail } from '../utils/sendEmail.js'
import User from '../models/User.js';

const contactController = {

    createContact: async (req, res, next) => {
        try {
            const { name, email, message } = req.body;

            const user = await User.findOne({ email });
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

            await sendMail({
                emailTo: email,
                subject: "Message Received",
                content: "Your form has been submitted successfully",
                name
            });

            if(sendMail){
                newContact.emailSent = true
            }

            const createdContact = await newContact.save();

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
                message : "Get messages successfully", 
                data : {contacts, total, pages}
            })
        }
        catch(error){
            next(error)
        }
    },
}

export default contactController;
