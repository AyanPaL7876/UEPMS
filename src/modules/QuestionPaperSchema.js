const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
    subjectName:{
        type: String,
        required: true,
        unique: true
    },
    subjectCode:{
        type: String,
        required: true,
        unique: true
    },
    totalMarks:{
        type: Number,
        required: true
    },
    timeAllowed:{
        type: Number,
        required: true
    },
    totalQuestions:{
        type: Number,
        required: true
    },
    groupA: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    groupB: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    groupC: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = QuestionPaper;