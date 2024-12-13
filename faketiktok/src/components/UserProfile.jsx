import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ username, avatar }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className={`user-profile-container ${isVisible ? 'visible' : ''}`}>
      <div className="user-profile-content">
        <div className="user-header">
          <img src={avatar} alt="Profile" className="user-profile-pic" />
          <h3>@{username}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;