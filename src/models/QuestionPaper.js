// models/QuestionPaper.js
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  text: String,
  marks: String,
  level: String,
  outcome: String,
  type: {
    type: String,
    enum: ['regular', 'alternative'],
    default: 'regular'
  },
  questions: [{
    number: String,
    text: String,
    marks: String,
    level: String,
    outcome: String
  }]
});

const GroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructions: String,
  questions: [QuestionSchema]
});

const QuestionPaperSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true
  },
  examDetails: {
    title: {
      type: String,
      required: true
    },
    session: {
      type: String,
      required: true
    },
    date: String
  },
  courseInfo: {
    program: [{
      type: String,
      required: true
    }],
    semester: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  examParameters: {
    maxMarks: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    totalQuestions: String,
    totalPages: String
  },
  instructions: [String],
  groups: [GroupSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'draft'
  },
  department: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add middleware to update the updatedAt field
QuestionPaperSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add indexes for better query performance
QuestionPaperSchema.index({ 'courseInfo.code': 1 });
QuestionPaperSchema.index({ createdBy: 1 });
QuestionPaperSchema.index({ status: 1 });
QuestionPaperSchema.index({ department: 1 });
QuestionPaperSchema.index({ academicYear: 1 });

const QuestionPaper =  mongoose.models.QuestionPaper || mongoose.model('QuestionPaper', QuestionPaperSchema);
export default QuestionPaper;
