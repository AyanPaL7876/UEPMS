const mongoose = require('mongoose');

const QuestionGroupSchema = new mongoose.Schema({
    paperCode: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
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
    mainQuestionPaper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPaper',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const QuestionGroup = mongoose.models.QuestionGroup || mongoose.model('QuestionGroup', QuestionGroupSchema);

export default QuestionGroup;