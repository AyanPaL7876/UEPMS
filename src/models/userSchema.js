const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "coe", "hod", "teacher"],
    required: true,
  },
  universityName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  school: {
    type: String,
    required: function () {
        return this.role === "hod" || this.role === "teacher";
    },
  },
  department: {
    type: String,
    required: function () {
      return this.role === "hod" || this.role === "teacher";
    },
  },
  employeeId: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  teacherType: {
    type: String,
    enum: ["external", "internal"],
    required: function () {
      return this.role === "teacher";
    },
  },
  createdQuestionPapers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questiongroup",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
