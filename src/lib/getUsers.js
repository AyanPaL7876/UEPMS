import { getTokenFromCookies } from '@/utils/auth';

export async function getUsers() {
    try {
      const res = await fetch('/api/users',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getTokenFromCookies()}`
        },
      });
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch users');
      }
  
      return Array.isArray(data.users) ? data.users : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }