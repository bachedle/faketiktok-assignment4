import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SharePage.css';

function SharePage({ isVisible, onClose }) {
  const handleFacebookShare = () => {
    // Add Facebook share logic here
    window.open('https://www.facebook.com/sharer/sharer.php', '_blank');
  };

  const handleInstagramShare = () => {
    // Add Instagram share logic here
    window.open('https://www.instagram.com', '_blank');
  };

  const handleThreadsShare = () => {
    // Add Threads share logic here
    window.open('https://www.threads.net', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="share-page-overlay">
      <div className="share-page-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <h2>Share to</h2>
        
        <div className="share-options">
          <div className="share-option facebook-option" onClick={handleFacebookShare}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" 
              alt="Facebook" 
              className="share-option-icon"
            />
            <p className="share-option-text">Share to Facebook</p>
          </div>

          <div className="share-option instagram-option" onClick={handleInstagramShare}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" 
              alt="Instagram" 
              className="share-option-icon"
            />
            <p className="share-option-text">Share to Instagram</p>
          </div>

          <div className="share-option threads-option" onClick={handleThreadsShare}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Threads_%28app%29.svg/2048px-Threads_%28app%29.svg.png" 
              alt="Threads" 
              className="share-option-icon"
            />
            <p className="share-option-text">Share to Threads</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePage;
