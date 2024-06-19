import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub; // Assuming the user ID is stored in the 'sub' field
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};
