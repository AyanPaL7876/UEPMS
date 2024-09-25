const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    knowledgeLevel: {
      type: String,
      enum: ["L-1", "L-2", "L-3", "L-4", "L-5", "L-6"],
      required: true,
    },
    courseOutcome: {
      type: String,
      enum: ["CO-1", "CO-2", "CO-3", "CO-4", "CO-5"],
      required: true,
    },
    imageUrl: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    option: [
      {
        type: String,
      },
    ],
    marks: {
      type: Number,
      required: true,
    },
    underGroup: {
      type: String,
      enum: ["A", "B", "C"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mainpaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionGroup",
      required: true,
    },
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
