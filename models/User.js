import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String},
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    isVerified: { type: Boolean, default: false }, 
    code: { type: String }, 
    lastCodeSentAt: { type: Date, default: null },
});

const User = mongoose.model('user', userSchema);

export default User;