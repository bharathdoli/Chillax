import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        console.log('Error fetching user profile:', data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>{user.username}'s Profile</h2>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
