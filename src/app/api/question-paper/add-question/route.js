import { connect } from "@/db";
import {Question, QuestionGroup,} from "@/modules";
import { authMiddleware, questionGroupCreateparmition } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
  await connect();

  const auth = await authMiddleware(["Teacher","HOD"], request);
  if (!auth.success)
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );

  try {
    const body = await request.json();
    const {mainQuestionPaper, groupA,groupB,groupC} = body;

    // Validate required fields
    const paper = await questionGroupCreateparmition(auth.user, mainQuestionPaper);
    if (!paper.success) {
      return NextResponse.json(
        {
          message: paper.message,
          existingQuestionPaper: paper.existingQuestionPaper || null,
        },
        { status: paper.status }
      );
    }

    // Create the new Questiongroup
    const newQuestionGroup = new QuestionGroup({
      uniName : paper.questionPaper.uniName,
      paperCode : paper.questionPaper.paperCode,
      year : paper.questionPaper.year,
      mainQuestionPaper : paper.questionPaper._id,
      createdBy : auth.user._id,
      groupA: [],
      groupB: [],
      groupC: []
    });

    // push the question ids to the newQuestionGroup
    await createQuestion(newQuestionGroup, "groupA", groupA, auth.user._id);
    await createQuestion(newQuestionGroup, "groupB", groupB, auth.user._id);
    await createQuestion(newQuestionGroup, "groupC", groupC, auth.user._id);

    // save the newQuestionGroup
    await newQuestionGroup.save();

    // push the newQuestionGroup to the mainQuestionPaper
    await paper.questionPaper.updateOne({ $push: { questionGroups: newQuestionGroup._id } });

    // update the user createdQuestionPapers
    await auth.user.updateOne({ createdQuestionPapers : newQuestionGroup._id });

    return NextResponse.json({
      message: "Question created successfully",
      data: newQuestionGroup,
      body,
      mainQuestionPaper : paper.questionPaper._id
    });

  } catch (error) {
    console.error("Error creating Question:", error);
    return NextResponse.json(
      { message: "Error creating Question", error: error.message },
      { status: 500 }
    );
  }
}

// createQuestion function
const createQuestion = async(questionGroup, groupName, group, id) => {
  for (let i = 0; i < group.length; i++) {
    const newQuestion = new Question({
      ...group[i],
      createdBy: id
    });
    await newQuestion.save();
    questionGroup[groupName].push(newQuestion._id);
  }
}