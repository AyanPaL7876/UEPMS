import mongoose, { Schema, model, Model } from "mongoose";
import { ICoe } from "../interfaces/ICoe";

const coeSchema = new Schema<ICoe>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'COE',
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
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  hods : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HOD',
  }]
});

const COE: Model<ICoe> = mongoose.models.COE || model<ICoe>("COE", coeSchema);

export default COE;
