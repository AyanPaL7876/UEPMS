import { connect } from '@/db/dbConnnect'; // Ensure this path is correct
import Admin from '@/modules/AdminSchema';
import COE from '@/modules/COESchema';
import HOD from '@/modules/HODSchema';
import Teacher from '@/modules/TeacherSchema';
import Moderator from '@/modules/ModeratorSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request = NextRequest) {
  const jsonBody = await request.json();
  console.log(jsonBody);
  const { email, password } = jsonBody;

  await connect();

  try {
    let user = await Admin.findOne({ email }) ||
               await COE.findOne({ email }) ||
               await HOD.findOne({ email }) ||
               await Teacher.findOne({ email }) ||
               await Moderator.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    console.log(token);

    user.lastLogin = new Date();
    await user.save();

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 200 });

    response.cookies.set("token", token, {
        path: "/",
        httpOnly: false,
    });

    return response;
    
  } catch (error) {
    console.error('Server Error:', error); // Added logging for the server error
    return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
  }
}
