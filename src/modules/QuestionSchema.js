const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    knowledgeLevel: {
        type: String,
        enum: ['L-1', 'L-2', 'L-3', 'L-4', 'L-5', 'L-6'],
        required: true
    },
    courseOutcome: {
        type: String,
        enum: ['CO-1', 'CO-2', 'CO-3', 'CO-4', 'CO-5'],
        required: true
    },
    imageUrl: {
        type: String,
    },
    textQuestion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

module.exports = Question;