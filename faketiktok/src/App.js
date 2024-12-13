import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import okarun from './profilePic/okarun_revised.jpg';
// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: okarun,
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: okarun,
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: okarun,
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: okarun,
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [searchView, setSearchView] = useState('');
  const videoRefs = useRef([]);

  // Initial load of videos
  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchView(term);
    
    // If search term is empty (including when closing search), show all videos
    if (!term || term.trim() === '') {
      setVideos(videoUrls);
      return;
    }

    // Remove # if present at the start
    const search = term.startsWith('#') ? term.slice(1) : term;
    
    // Filter videos that have matching hashtags
    const filteredVideos = videoUrls.filter(video => {
      const hashtags = video.description.toLowerCase().match(/#\w+/g) || [];
      return hashtags.some(hashtag => 
        hashtag.slice(1).includes(search.toLowerCase())
      );
    });

    setVideos(filteredVideos);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play().catch(error => {
            console.log("Video play failed:", error);
          });
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Clean up old observers
    videoRefs.current.forEach(ref => {
      if (ref) observer.unobserve(ref);
    });

    // Set up new observers
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    videoRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar onSearch={handleSearch}/>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard
              key={video.url}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === 0}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No videos found with #{searchView}</h3>
          </div>
        )}
        <BottomNavbar />
      </div>
    </div>
  );
}

export default App;