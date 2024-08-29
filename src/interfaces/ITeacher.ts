import { Document, Types } from "mongoose";

export interface ITeacher extends Document{
    name : string,
    dept : string,
    email : string,
    password : string,
    role : string,
    isVerified: boolean;
    lastLogin?: Date;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    hod: Types.ObjectId;
}