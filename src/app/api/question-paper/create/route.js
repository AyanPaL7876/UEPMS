import { connect } from "@/db/dbConnnect";
import QuestionPaper from '@/modules/QuestionPaperSchema';
import { User } from '@/modules/UserSchema';
import { authMiddleware } from '@/utils/authMiddleware';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request=NextRequest) {
  await connect();

  const auth = await authMiddleware(['COE'], request);
  if (!auth.success) return NextResponse.json({ message: auth.message }, { status: auth.status });

  try {
    const body = await request.json();
    const { allocatedHods } = body;

    const hod = await User.findById(allocatedHods);
    if (!hod || hod.role !== 'HOD') {
      return NextResponse.json({ message: 'Invalid HOD ID' }, { status: 400 });
    }

    const questionPaper = new QuestionPaper(body);
    await questionPaper.save();

    return NextResponse.json({ message: 'Question paper created successfully', questionPaper }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating question paper', error: error.message }, { status: 500 });
  }
}
