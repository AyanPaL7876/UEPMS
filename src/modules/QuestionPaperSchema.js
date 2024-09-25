const mongoose = require("mongoose");

const QuestionTypeEnum = {
  MCQ_1: 'MCQ_1',
  SHORT_ANSWER_2: 'SHORT_ANSWER_2',
  LONG_ANSWER_4: 'LONG_ANSWER_4',
  LONG_ANSWER_5: 'LONG_ANSWER_5',
  LONG_ANSWER_10: 'LONG_ANSWER_10'
};

const QuestionGroupEnum = {
  NO_EXTRA: 'NO_EXTRA',
  ONE_EXTRA: 'ONE_EXTRA',
  TWO_EXTRA: 'TWO_EXTRA',
  EACH_EXTRA: 'EACH_EXTRA',
  LAST_EXTRA: 'LAST_EXTRA'
};

const questionGroupSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: Object.values(QuestionTypeEnum),
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1,
  },
  extraQuestions: {
    type: String,
    required: true,
    enum: Object.values(QuestionGroupEnum),
  },
});

const questionPaperSchema = new mongoose.Schema({
  uniName: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  programName: [{
    type: String,
    required: true,
  }],
  paperCode: {
    type: String,
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
    min: 1,
  },
  timeAllowed: {
    type: Number,
    required: true,
    min: 1,
  },
  questionTypes: {
    groupA: questionGroupSchema,
    groupB: questionGroupSchema,
    groupC: questionGroupSchema,
  },
  questionGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionGroup",
  }],
  finalQuestionGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionGroup",
  },
  department: {
    type: String,
    required: true,
  },
  allocatedHods: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  allocatedTeachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  allocatedModerators: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["draft", "submitted", "under_review", "approved", "processing", "completed"],
    default: "draft",
  },
}, {
  timestamps: true
});

// Add compound index for year and paperCode
questionPaperSchema.index({ year: 1, uniName:1, paperCode: 1 }, { unique: true });

const QuestionPaper = mongoose.models.QuestionPaper || mongoose.model("QuestionPaper", questionPaperSchema);

export default QuestionPaper;

// function getPointsFromType(type) {
//   const pointsMap = {
//     [QuestionTypeEnum.MCQ_1]: 1,
//     [QuestionTypeEnum.SHORT_ANSWER_2]: 2,
//     [QuestionTypeEnum.LONG_ANSWER_4]: 4,
//     [QuestionTypeEnum.LONG_ANSWER_5]: 5,
//     [QuestionTypeEnum.LONG_ANSWER_10]: 10
//   };
//   return pointsMap[type] || 0;
// }