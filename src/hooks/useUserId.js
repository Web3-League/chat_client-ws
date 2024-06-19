// hooks/useUserId.js
import { useEffect, useState } from 'react';

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id || null);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setUserId(null);
      }
    }
  }, []);

  return userId;
};

export default useUserId;
