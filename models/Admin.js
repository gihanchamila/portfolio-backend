import mongoose, { mongo } from "mongoose";

const adminSchema = mongoose.Schema({
    firstName : {type : String, required : true },
    lastName : { type : String, required : true },
    email : { type : String, required : true },
    role : { type : Number, required : true },
    password : { type : String, required : true, minlength : 6}
}, {
    Timestamp : true
})

const Admin = mongoose.model('admin', adminSchema)
export default Admin