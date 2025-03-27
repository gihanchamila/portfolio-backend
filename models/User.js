import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    isVerified: { type: Boolean, default: false }, 
    code: { type: String }, 
});

const User = mongoose.model('user', userSchema);

export default User;