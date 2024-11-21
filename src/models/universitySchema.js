const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  departments: [departmentSchema],
});

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schools: [schoolSchema],
});

export const University = mongoose.models.University || mongoose.model('University', universitySchema);
