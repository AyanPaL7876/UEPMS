import mongoose, { Schema, model, Model } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";

const AdminSchema = new Schema<IAdmin>({
  name: {
    type: String,
    required: true,
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
    default: 'admin',
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

const Admin: Model<IAdmin> = mongoose.models.Admin || model<IAdmin>("Admin", AdminSchema);

export default Admin;
