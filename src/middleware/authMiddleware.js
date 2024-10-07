import { findUser } from './findUser';

export const authMiddleware = async (allowedRoles, req) => {
  try {
    const { success, user, message, status } = await findUser(req); 
    if(!success) {
      return { success: false, message, status };
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
