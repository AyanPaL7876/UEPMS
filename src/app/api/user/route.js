import { connect } from '@/db/dbConnnect';
import Admin from '@/modules/AdminSchema';
import COE from '@/modules/COESchema';
import HOD from '@/modules/HODSchema';
import Teacher from '@/modules/TeacherSchema';
import Moderator from '@/modules/ModeratorSchema';
import bcrypt from 'bcryptjs';
import { authMiddleware } from '@/utils/authMiddleware';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request = NextRequest) {
  const { name, email, password, role, dept } = await request.json();
  await connect();

  // Call middleware
  const { success, user, message, status } = await authMiddleware(['admin', 'COE', 'HOD'], request);
  
  if (!success) {
    return NextResponse.json({ success: false, message }, { status });
  }

  const reqUser = user;

  try {
    if (
      (reqUser.role !== 'admin' && role === 'COE') ||
      (reqUser.role !== 'COE' && role === 'HOD') ||
      (reqUser.role !== 'HOD' && (role === 'Teacher' || role === 'Moderator'))
    ) {
      return NextResponse.json({ success: false, message: 'You do not have permission to create this user role' }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    switch (role) {
      case 'COE':
        newUser = new COE({ name, email, password: hashedPassword, admin: reqUser._id });
        await newUser.save();
        await Admin.findByIdAndUpdate(reqUser._id, { $push: { coes: newUser._id } });
        break;
      case 'HOD':
        newUser = new HOD({ name, email, password: hashedPassword, dept, coe: reqUser._id });
        await newUser.save();
        await COE.findByIdAndUpdate(reqUser._id, { $push: { hods: newUser._id } });
        break;
      case 'Teacher':
        newUser = new Teacher({ name, email, password: hashedPassword, dept, hod: reqUser._id });
        await newUser.save();
        await HOD.findByIdAndUpdate(reqUser._id, { $push: { teachers: newUser._id } });
        break;
      case 'Moderator':
        newUser = new Moderator({ name, email, password: hashedPassword, dept, hod: reqUser._id });
        await newUser.save();
        await HOD.findByIdAndUpdate(reqUser._id, { $push: { moderators: newUser._id } });
        break;
      default:
        return NextResponse.json({ success: false, message: 'Invalid user role' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
