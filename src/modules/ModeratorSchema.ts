import mongoose, { Schema } from "mongoose";
import { IModerator } from "../interfaces/IModerator";

const ModeratorSchema = new Schema<IModerator>({
    name : {
        type : String,
        required : true,
        unique : true 
    },
    dept :{
        type : String,
        required : true
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
    role : {
        type : String,
        default : "HOD",
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    lastLogin: {
        type: Date,
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOD',
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
});

const Moderator = mongoose.models.Moderator || mongoose.model("Moderator",ModeratorSchema);

export default Moderator;