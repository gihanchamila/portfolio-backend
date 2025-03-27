import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    emailSent: { type: Boolean, default: false },
    code: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const Contact = mongoose.model("contact", contactSchema);
export default Contact;