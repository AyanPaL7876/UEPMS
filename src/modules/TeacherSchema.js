import mongoose from "mongoose";
const Schema = mongoose;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dept: {
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
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOD',
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
