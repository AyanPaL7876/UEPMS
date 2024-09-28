const mongoose = require('mongoose');

const QuestionGroupSchema = new mongoose.Schema({
    uniName: {
        type: String,
        required: true,
    },
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

QuestionGroupSchema.index({ year: 1, uniName: 1, paperCode: 1, createdBy: 1 }, { unique: true });


const QuestionGroup = mongoose.models.QuestionGroup || mongoose.model('QuestionGroup', QuestionGroupSchema);

export default QuestionGroup;