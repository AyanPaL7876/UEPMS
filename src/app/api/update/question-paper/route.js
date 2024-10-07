import { connect } from "@/db";
import { QuestionPaper } from '@/modules';
import { authMiddleware } from "@/middleware";
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
  } catch (error) {
      return NextResponse.json({ message: 'Error creating question paper', error: error.message }, { status: 500 });
  }
}