import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
import SharePage from './SharePage';

function FooterRight({ likes, comments, saves, shares, profilePic, handleMuteClick, isMuted, videoUrl }) {
  //like and save state
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [showSharePage, setShowSharePage] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    //settimeout(arrowFunction, delay)
    setTimeout(() => { 
      setUserAddIcon(null);
    }, 3000);
  };

  //convert '000' to 'K'
  const parseLikesCount = (count) => {
    if(typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  //lam tron so
  const formatLikesCount = (count) => {
    if (count >= 10000)
    {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked)
  }
   
  //save URL function
  const handleSave = () => {
    setSaved((prevSaved) => !prevSaved);
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        console.log('Copied');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  }

  const handleShareClick = () => {
    setShowSharePage(true);
  };

  const handleCloseShare = () => {
    setShowSharePage(false);
  };

  return (
    <div className = "footer-right">
      <div className = "sidebar-icon">
        {/* ternary operator */}
        {profilePic ? (
          <img 
            src = {profilePic} 
            className = "userprofile"
            alt = "Profile" 
            style={{ width: '45px', height: '45px', color: '#616161'}}/>
        ) : null}

        <FontAwesomeIcon
          icon = {userAddIcon} 
          className = "useradd" 
          onClick = {handleUserAddClick}
          style = {{width: '15px', height: '15px', color: '#FF0000'}}
        />
      </div>

      <div classname = 'sidebar-icon'>
        <FontAwesomeIcon 
          icon = {faHeart} 
          style = {{width: '35px', height: '35px', color: liked ? '#FF0000' : 'white'}}
          onClick = {handleLikeClick}
          
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      
      <div className = 'sidebar-icon'>
        <FontAwesomeIcon 
          icon = {faCommentDots}
          style = {{width: '35px', height: '35px', color: 'white'}}
        />
        <p>{comments}</p>
      </div>

      {/* save changed */}
      <div className = "sidebar-icon">
        { saved ? (
          <FontAwesomeIcon 
            icon = {faBookmark}
            style = {{width: '35px', height: '35px', color: '#ffc107'}}
            onClick = {handleSave}
          />
        ) : (
          <FontAwesomeIcon 
            icon = {faBookmark}
            style = {{width: '35px', height: '35px', color: 'white'}}
            onClick = {handleSave}
          />
        )}

        <p>{saves ? saves + 1 : saves}</p>
      </div>

      <div className = "sidebar-icon">
        <FontAwesomeIcon 
          icon = {faShare}
          style = {{width: '35px', height: '35px', color: 'white'}}
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>

      {/* mute changed */}
      <div className = "sidebar-icon">
        <FontAwesomeIcon 
          icon={isMuted ? faVolumeMute : faVolumeHigh}
          style={{width: '35px', height: '35px', color: 'white'}}
          onClick={handleMuteClick}
        />
      </div>

      <div className = "sidebar-icon record">
        <img src =  "https://static.thenounproject.com/png/934821-200.png" alt ='Record Icon'/>
      </div>

      <SharePage isVisible={showSharePage} onClose={handleCloseShare} />
    </div>
  );
}

export default FooterRight;
