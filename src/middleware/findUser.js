import jwt from 'jsonwebtoken';
import { User } from '@/modules';

export const findUser = async (req) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ','');

  if (!token) {
    return { success: false, message: 'No token provided', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    
    if (!decoded.id) {
      return { success: false, message: 'Invalid token', status: 401 };
    }
    
    const user = await User.findById(decoded.id);

    if (!user) {
      return { success: false, message: 'User not found', status: 404 };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error in Find User:', error);
    return { success: false, message: 'Invalid token', status: 401 };
  }
};