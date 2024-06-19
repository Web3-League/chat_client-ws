// src/components/ProfileComponent.js
import React from 'react';
import useAuth from '../hooks/useAuth';

const ProfileComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfileComponent;
