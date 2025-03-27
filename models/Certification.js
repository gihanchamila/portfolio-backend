import mongoose from "mongoose";

const certificationSchema = mongoose.Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    issueDate: { type: Date, required: true },
    credentialURL: { type: String },
}, { timestamps: true });

const Certification = mongoose.model("certification", certificationSchema);
export default Certification;