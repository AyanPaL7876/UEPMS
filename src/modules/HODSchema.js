import mongoose, { Schema, model, models } from 'mongoose';

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
    required: true
  },
  role: {
    type: String,
    default: 'HOD'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  coe: {
    type: Schema.Types.ObjectId,
    ref: 'COE'
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'Teacher' 
  }],
  moderators: [{
    type: Schema.Types.ObjectId,
    ref: 'Moderator' 
  }]
});

const HOD = mongoose.models.HOD || mongoose.model('HOD', HODSchema);

export default HOD;
