import jwt from 'jsonwebtoken';
import Admin from '@/modules/AdminSchema';
import COE from '@/modules/COESchema';
import HOD from '@/modules/HODSchema';
import Teacher from '@/modules/TeacherSchema';
import Moderator from '@/modules/ModeratorSchema';

export const authMiddleware = async (allowedRoles, req) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ',''); // Bearer token

  if (!token) {
    return { success: false, message: 'No token provided', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user;

    switch (decoded.role) {
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      case 'COE':
        user = await COE.findById(decoded.id);
        break;
      case 'HOD':
        user = await HOD.findById(decoded.id);
        break;
      case 'Teacher':
        user = await Teacher.findById(decoded.id);
        break;
      case 'Moderator':
        user = await Moderator.findById(decoded.id);
        break;
      default:
        return { success: false, message: 'Invalid user role', status: 401 };
    }

    if (!user) {
      return { success: false, message: 'User not found', status: 401 };
    }

    if (!allowedRoles.includes(user.role)) {
      return { success: false, message: 'You do not have permission to access this resource', status: 403 };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return { success: false, message: 'Invalid token', status: 401 };
  }
};
