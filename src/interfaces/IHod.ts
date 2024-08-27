import { Document, Types } from "mongoose";

export interface IHod extends Document{
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
    coe: Types.ObjectId;
}