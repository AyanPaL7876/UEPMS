const mongoose = require('mongoose');

const QuestionGroupSchema = new Schema({
    paperCode : {
        type: String,
        required: true,
    },
    papername : {
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
});

const QuestionGroup = mongoose.models.QuestionGroup || mongoose.model('QuestionGroup', QuestionGroupSchema);

export default QuestionGroup;