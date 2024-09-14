import dbConnect from '@/db/dbConnnect';
import Admin from '@/modules/AdminSchema';
import COE from '@/modules/COESchema';
import HOD from '@/modules/HODSchema';
import Teacher from '@/modules/TeacherSchema';
import Moderator from '@/modules/ModeratorSchema';
import bcrypt from 'bcryptjs';
import { authMiddleware } from '@/utils/authMiddleware';

export async function POST(request) {
  const { name, email, password, role, dept } = await request.json();

  await dbConnect();

  const reqUser = await authMiddleware(['admin', 'COE', 'HOD'], request);  // Applying middleware
  if (!reqUser) return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 403 });

  try {
    // Check if the current user has the right to create a user with the given role
    if (
      (reqUser.role !== 'admin' && role === 'COE') ||
      (reqUser.role !== 'COE' && role === 'HOD') ||
      (reqUser.role !== 'HOD' && (role === 'Teacher' || role === 'Moderator'))
    ) {
      return new Response(JSON.stringify({ success: false, message: 'You do not have permission to create this user role' }), { status: 403 });
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
        return new Response(JSON.stringify({ success: false, message: 'Invalid user role' }), { status: 400 });
    }

    return new Response(JSON.stringify({
      success: true,
      data: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}
