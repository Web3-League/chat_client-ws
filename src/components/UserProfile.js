import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('https://localhost:56001/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default UserProfile;



