import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import UserProfile from './UserProfile';
import './VideoCard.css';

const VideoCard = (props) => {
  const {url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false); // Added state for mute control
  const [isDragging, setIsDragging] = useState(false); // Added for drag detection
  const [startY, setStartY] = useState(0); // Added to track drag start position
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }

    // Add keyboard event listener
    const keyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setShowUserProfile(true);
      } else if (e.key === 'ArrowLeft') {
        if (showUserProfile) {
          setShowUserProfile(false);
        } else {
          setShowUserProfile(true);
        }
      }
    };

    window.addEventListener('keydown', keyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [autoplay, showUserProfile]);

  // Added mouse event handlers for drag scrolling
  const mouseClick = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  }

  const mouseScroll = (e) => {
    if (isDragging) {
      const deltaY = e.clientY - startY;
      if (Math.abs(deltaY) > 100) { // Threshold for swipe detection
        if (deltaY > 0) {
          // Swipe down - go to previous video
          const currentVideo = e.currentTarget;
          const prevVideo = currentVideo.previousElementSibling;
          if (prevVideo) {
            prevVideo.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Swipe up - go to next video
          const currentVideo = e.currentTarget;
          const nextVideo = currentVideo.nextElementSibling;
          if (nextVideo) {
            nextVideo.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setIsDragging(false);
      }
    }
  }

  const mouseUnClick = () => {
    setIsDragging(false);
  }

  // Added video play/pause toggle handler
  const onVideoPress = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  // Added mute toggle handler with comments
  const handleMuteClick = () => {
    setIsMuted((prevMute) => {
      const muteStatus = !prevMute;
      if (videoRef.current) {
        videoRef.current.muted = muteStatus; // Toggle video mute state
      }
      return muteStatus;
    });
  }

  return (
    <div 
      className="video"
      onMouseDown={mouseClick}
      onMouseMove={mouseScroll}
      onMouseUp={mouseUnClick}
      onMouseLeave={mouseUnClick}
    >
      <video 
        className="player" 
        onClick={onVideoPress} 
        ref={(ref) => {
          videoRef.current = ref;
          if (setVideoRef) setVideoRef(ref);
        }}
        loop
        src={url}
        muted={isMuted} // Added muted prop to sync with state
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft 
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          <FooterRight 
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            isMuted={isMuted} // Pass mute state to FooterRight
            handleMuteClick={handleMuteClick} // Pass mute handler to FooterRight
          />
        </div>
      </div>
      {showUserProfile && (
        <UserProfile 
          username={username}
          avatar={profilePic}
        />
      )}
    </div>
  );
};

export default VideoCard;
