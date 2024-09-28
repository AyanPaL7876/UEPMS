import { connect } from "@/db/dbConnnect";
import { User, QuestionPaper, QuestionGroup, questionGroupValidation } from '@/modules';
import { authMiddleware } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
  await connect();

  const auth = await authMiddleware(["Teacher", "HOD"], request);
  if (!auth.success)
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );

  try {
    const {
      paperCode,
      year,
      mainQuestionPaper,
      groupA,
      groupB,
      groupC
    } = await request.json();

    console.log({ paperCode, year, mainQuestionPaper, groupA, groupB, groupC });

    const data = await request.json();

    // Validate required fields
    if (!paperCode || !year || !mainQuestionPaper) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate
    await validationSchema(data);

    // Validate the QuestionPaper exists
    const questionPaper = await QuestionPaper.findById(mainQuestionPaper);
    if (!questionPaper) {
      return NextResponse.json(
        { message: "Invalid QuestionPaper ID" },
        { status: 400 }
      );
    }

    // const groupValidationErrors = [];

    // ['A', 'B', 'C'].forEach(group => {
    //   const expectedLength = `${questionPaper}.${questionTypes}.group${group}`.totalQuestions;
    //   const actualLength = `${data}.group${group}` ? `${data}.group${group}`.length : 
    //   groupValidationErrors.push(`data.group${group}.length = not found`);

    //   if (actualLength !== expectedLength) {
    //     groupValidationErrors.push(`Group ${group} should have exactly ${expectedLength} questions, but has ${actualLength}`);
    //   }
    // });

    // if (groupValidationErrors.length > 0) {
    //     return NextResponse.json(
    //       { message: "Group length validation failed", errors: groupValidationErrors },
    //       { status: 400 }
    //     );
    //   }

    // Create the new QuestionGroup
    const newQuestionGroup = new QuestionGroup({
      paperCode,
      year,
      mainQuestionPaper,
      createdBy: auth.user._id
    });

    await newQuestionGroup.save();

    // Add the QuestionGroup to the QuestionPaper
    questionPaper.questionGroups.push(newQuestionGroup._id);
    await questionPaper.save();

    return NextResponse.json({
      message: "QuestionGroup created successfully",
      questionGroup: newQuestionGroup
    });
  } catch (error) {
    console.error("Error creating QuestionGroup:", error);
    return NextResponse.json(
      { message: "Error creating QuestionGroup", error: error.message },
      { status: 500 }
    );
  }
}

function validationSchema(data) {
  
    const { error, value } = questionGroupValidation.validate(data, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return NextResponse.json(
        { success: false, message: "Validation error", errors: errorMessages },
        { status: 400 }
      );
    }
};