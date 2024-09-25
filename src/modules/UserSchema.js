const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const UserSchema = new mongoose.Schema({
  name: {type: String,required: true,},
  universityName: {
    type: String,
    required: function () {
      return this.role !== "admin";
    },
  },
  email: {type: String,required: true,unique: true,},
  password: { type: String, required: true,},
  role: {
    type: String,
    enum: ["admin", "COE", "HOD", "Teacher"],
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
      return this.role === "HOD" || this.role === "Teacher";
    },
  },
  teacherType: {
    type: String,
    enum: ["External", "internal"],
    required: function () {
      return this.role === "Teacher";
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
  createdAt: {type: Date, default: Date.now},
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Mongoose Model
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Joi Validation Schema
export const UserValidationSchema = Joi.object({
  name: Joi.string()
    .min(2).max(50).required()
    .messages({
      'string.base': 'Name should be a text',
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name should not exceed 50 characters',
      'any.required': 'Name is required'
    }),

  universityName: Joi.string()
    .min(2).max(100)
    .when('role', {
      is: Joi.valid('COE', 'HOD', 'Teacher'),
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'string.base': 'University name should be a text',
      'string.empty': 'University name is required for non-admin roles',
      'string.min': 'University name should have at least 2 characters',
      'string.max': 'University name should not exceed 100 characters',
      'any.required': 'University name is required for non-admin roles'
    }),

  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required()
    .messages({
      'string.base': 'Email should be a text',
      'string.empty': 'Email is required',
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(8).max(30)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
    .messages({
      'string.base': 'Password should be a text',
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should not exceed 30 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  role: Joi.string()
    .valid('admin', 'COE', 'HOD', 'Teacher').required()
    .messages({
      'string.base': 'Role should be a text',
      'string.empty': 'Role is required',
      'any.only': 'Role must be either admin, COE, HOD, or Teacher',
      'any.required': 'Role is required'
    }),

  status: Joi.string()
    .valid('active', 'inactive').default('active')
    .messages({
      'string.base': 'Status should be a text',
      'any.only': 'Status must be either active or inactive'
    }),

  lastLogin: Joi.date()
    .messages({
      'date.base': 'Last login should be a valid date'
    }),

  profilePicture: Joi.string()
    .uri()
    .messages({
      'string.base': 'Profile picture should be a text',
      'string.uri': 'Profile picture should be a valid URL'
    }),

  department: Joi.string()
    .when('role', {
      is: Joi.valid('HOD', 'Teacher'),
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'string.base': 'Department should be a text',
      'string.empty': 'Department is required for HOD and Teacher roles',
      'any.required': 'Department is required for HOD and Teacher roles'
    }),

  teacherType: Joi.string()
    .valid('External', 'internal')
    .when('role', {
      is: 'Teacher',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'string.base': 'Teacher type should be a text',
      'any.only': 'Teacher type must be either External or internal',
      'any.required': 'Teacher type is required for Teacher role'
    }),

  // coes: Joi.array()
  //   .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  //   .messages({
  //     'array.base': 'COEs should be an array',
  //     'string.pattern.base': 'Each COE should be a valid ObjectId'
  //   }),

  // hods: Joi.array()
  //   .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  //   .messages({
  //     'array.base': 'HODs should be an array',
  //     'string.pattern.base': 'Each HOD should be a valid ObjectId'
  //   }),

  // teachers: Joi.array()
  //   .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  //   .messages({
  //     'array.base': 'Teachers should be an array',
  //     'string.pattern.base': 'Each teacher should be a valid ObjectId'
  //   }),

  // createdBy: Joi.string()
  //   .regex(/^[0-9a-fA-F]{24}$/)
  //   .messages({
  //     'string.base': 'Created by should be a text',
  //     'string.pattern.base': 'Created by should be a valid ObjectId'
  //   }),

  createdAt: Joi.date()
    .default(Date.now)
    .messages({
      'date.base': 'Created at should be a valid date'
    }),

  forgotPasswordToken: Joi.string()
    .messages({
      'string.base': 'Forgot password token should be a text'
    }),

  forgotPasswordTokenExpiry: Joi.date()
    .messages({
      'date.base': 'Forgot password token expiry should be a valid date'
    }),

  verifyToken: Joi.string()
    .messages({
      'string.base': 'Verify token should be a text'
    }),

  verifyTokenExpiry: Joi.date()
  .messages({
    'date.base': 'Verify token expiry should be a valid date'
  })
});
