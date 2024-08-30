import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    coes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'COE',
    }],
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
module.exports = Admin;
