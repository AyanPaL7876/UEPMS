const mongoose = require("mongoose");

const questionPaperSchema = new mongoose.Schema({
  acc: {
    type: [String],
    required: true,
  },
  programName: {
    type: [String],
    required: true,
  },
  semester: {
    type: String,
    enum: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  timeAllowed: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  questionGroups: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionGroup",
    },
  ],

  finalQuestionGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionGroup",
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  allocatedTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  allocatedModerators: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["draft", "submitted", "under_review", "approved", "rejected"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

module.exports = QuestionPaper;
