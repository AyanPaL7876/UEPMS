import { required } from "joi";

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    knowledgeLevel: {
      type: String,
      enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
      required: true,
    },
    courseOutcome: {
      type: String,
      enum: ["CO1", "CO2", "CO3", "CO4", "CO5"],
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
      required: String,
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
    mainQuestionGroup: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionGroup",
      required: true,
    }],
    mainpaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
