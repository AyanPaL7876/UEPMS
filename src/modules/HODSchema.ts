import mongoose, { Schema } from "mongoose";
import { IHod } from "../interfaces/IHod";

const HODSchema = new Schema<IHod>({
    name : {
        type : String,
        required : true,
        unique : true 
    },
    dept :{
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
    coe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'COE',
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
});

const HOD = mongoose.models.HOD || mongoose.model("HOD",HODSchema);

export default HOD;