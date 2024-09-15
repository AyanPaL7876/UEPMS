import {NextRequest,NextResponse } from 'next/server';
import {connect} from '@/db/dbConnnect';
import { authMiddleware } from '@/utils/authMiddleware';
import QuestionPaper from '@/modules/QuestionPaperSchema';

// Create a new question paper (only for COE)
export async function POST(request=NextRequest) {
  const body = await request.json(); // Parse request body
  await connect();
  // Call middleware
  const { success, user, message, status } = await authMiddleware(['COE'], request);
  console.log(`req: ${request}\n body : ${body} \n user : ${user}`)

  if (!success) {
    return NextResponse.json({ success: false, message }, { status });
  }


  if (user.role !== 'COE') {
    return NextResponse.json({ success: false, message: 'Only COE can create question papers' }, { status: 403 });
  }

  try {
    const questionPaper = await QuestionPaper.create({ ...body, createdBy: user._id });
    return NextResponse.json({ success: true, data: questionPaper }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}


// Update a question paper (for COE and HOD)
export async function PUT(request = NextRequest) {
  const body = await request.json(); // Parse request body
  await connect();

  // Call middleware
  const { success, user, message, status } = await authMiddleware(['COE', 'HOD'], request);

  if (!success) {
    return NextResponse.json({ success: false, message }, { status });
  }

  try {
    const questionPaper = await QuestionPaper.findById(body._id);

    if (!questionPaper) {
      return NextResponse.json({ success: false, message: 'Question paper not found' }, { status: 404 });
    }

    if (user.role === 'COE') {
      // COE can update all fields except the restricted ones
      const restrictedFields = ['allocatedTeachers', 'allocatedModerators', 'status', 'questionGroups', 'finalQuestionGroup'];
      Object.keys(body).forEach(key => {
        if (!restrictedFields.includes(key)) {
          questionPaper[key] = body[key];
        }
      });
    } else if (user.role === 'HOD') {
      // Check if HOD is in the department
      if (questionPaper.department.toString() !== user.dept.toString()) {
        return NextResponse.json({ success: false, message: 'You are not authorized to update this question paper' }, { status: 403 });
      }

      // HOD can only update specific fields
      const allowedFields = ['allocatedTeachers', 'allocatedModerators', 'status'];
      allowedFields.forEach(field => {
        if (body[field] !== undefined) {
          questionPaper[field] = body[field];
        }
      });
    }

    questionPaper.updatedAt = Date.now();
    await questionPaper.save();

    return NextResponse.json({ success: true, data: questionPaper }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
