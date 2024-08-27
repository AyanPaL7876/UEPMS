import { Document, Types } from "mongoose";

export interface ICoe extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  lastLogin?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  admin: Types.ObjectId;
  hods?: Types.ObjectId[];
}
