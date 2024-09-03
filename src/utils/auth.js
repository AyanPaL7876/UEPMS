import jwt from 'jsonwebtoken';

export const getTokenFromCookies = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  return token;
};

export const decodeToken = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode the token:", error);
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return verifiedToken;
  } catch (error) {
    console.error("Failed to verify the token:", error);
    return null;
  }
};

export const getAuthHeader = () => {
  const token = getTokenFromCookies();
  return token ? `Bearer ${token}` : null;
};
