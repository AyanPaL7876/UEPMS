import mongoose from "mongoose";
const Schema = mongoose;

const HODSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dept: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "HOD",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    coe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'COE',
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOD',
    }],
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOD',
    }],
});

const HOD = mongoose.models.HOD || mongoose.model("HOD", HODSchema);

module.exports = HOD;
