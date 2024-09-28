import { connect } from "@/db/dbConnnect";
import { User, QuestionPaper } from '@/modules';
import { authMiddleware } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request = NextRequest) {
  await connect();

  const auth = await authMiddleware(["HOD"], request);
  if (!auth.success)
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );

  try {
    const { questionPaperId, teacherIds } = await request.json();
    const questionPaper = await QuestionPaper.findById(questionPaperId);

    if (!questionPaper) {
      return NextResponse.json(
        { message: "Question paper not found" },
        { status: 404 }
      );
    }

    if (!questionPaper.allocatedHods.equals(auth.user._id)) {
      return NextResponse.json(
        { message: "You are not authorized to modify this question paper" },
        { status: 403 }
      );
    }

    const newlyAddedTeachers = [];

    // Loop through each teacherId one by one
    for (const teacherId of teacherIds) {
      // Find the teacher with the valid ID asynchronously
      const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });

      if (!teacher) {
        return NextResponse.json(
          { message: "Invalid teacher ID: " + teacherId },
          { status: 400 }
        );
      }

      // Push the teacherId if not already present
      if (!questionPaper.allocatedTeachers.includes(teacherId)) {
        questionPaper.allocatedTeachers.push(teacherId);
        newlyAddedTeachers.push(teacher.name);
      }
    }

    await questionPaper.save();

    return NextResponse.json({
      message: "Teachers assigned successfully",
      newlyAddedTeachers,
      questionPaper,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error assigning teachers", error: error.message },
      { status: 500 }
    );
  }
}

