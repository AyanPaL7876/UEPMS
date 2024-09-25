import jwt from 'jsonwebtoken';
import { User } from '@/modules/UserSchema';

export const authMiddleware = async (allowedRoles, req) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ',''); // Bearer token

  if (!token) {
    return { success: false, message: 'No token provided', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user;

    if(!decoded.id) {
      return { success: false, message: 'Invalid token', status: 401};
    }else{
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return { success: false, message: 'User not found', status: 401 };
    }

    if (!allowedRoles.includes(user.role)) {
      return { success: false, message: `You do not have permission to access this resource, allowRoles: ${allowedRoles}, tokenRole: ${user.role}`, status: 403 };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return { success: false, message: 'Invalid token', status: 401 };
  }
};
