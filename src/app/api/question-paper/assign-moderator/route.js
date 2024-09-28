import { connect } from "@/db/dbConnnect";
import { User, QuestionPaper } from '@/modules';
import { authMiddleware } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request=NextRequest) {
  await connect();
  const auth = await authMiddleware(['HOD'], request);
  if (!auth.success) return NextResponse.json({ message: auth.message }, { status: auth.status });

  try {
    const { questionPaperId, moderatorId } = await request.json();
    const questionPaper = await QuestionPaper.findById(questionPaperId);

    if (!questionPaper) {
      return NextResponse.json({ message: 'Question paper not found' }, { status: 404 });
    }

    if (!questionPaper.allocatedHods.equals(auth.user._id)) {
      return NextResponse.json({ message: 'You are not authorized to modify this question paper' }, { status: 403 });
    }

    if(questionPaper.allocatedModerators){
      return NextResponse.json({ message: 'Already one Moderater is selected in this question paper' }, { status: 403 });
    }

    console.log(moderatorId)
    const moderator = await User.findOne({ _id: moderatorId, role: 'Teacher' });
    if (!moderator) {
      return NextResponse.json({ message: 'Invalid moderator ID' }, { status: 400 });
    }

    questionPaper.allocatedModerators = moderatorId;
    await questionPaper.save();

    return NextResponse.json({ message: 'Moderator assigned successfully', 
      questionPaper 
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error assigning moderator', error: error.message }, { status: 500 });
  }
}