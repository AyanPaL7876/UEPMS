import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true 
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    password : {
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
});

const Teacher = mongoose.model.Teachers || mongoose.model("Teachers",TeacherSchema);

export default Teacher;