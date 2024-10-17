const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const UserSchema = new mongoose.Schema({
  name: {type: String,
    required: true,
    required: function () {
      return this.role === "coe";
    },
  },
  universityName: {
    type: String,
    required: function () {
      return this.role !== "admin";
    },
  },
  email: {type: String,required: true,unique: true,},
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "coe", "hod", "teacher"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  lastLogin: {type: Date},
  profilePicture: {type: String},
  department: {
    type: String,
    required: function () {
      return this.role === "hod" || this.role === "teacher";
    },
  },
  teacherType: {
    type: String,
    enum: ["external", "internal"],
    required: function () {
      return this.role === "teacher";
    },
  },
  coes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  hods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdQuestionPapers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Questiongroup",
  }],
  createdAt: {type: Date, default: Date.now},
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Mongoose Model
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
