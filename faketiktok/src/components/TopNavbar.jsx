import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = ({ onSearch }) => {
  const [searchView, setSearchView] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const searchPressed = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSearchView = () => {
    setSearchView((prev) => !prev);
    if (searchView) {
      setQuery('');
      onSearch(''); // Clear search when closing
    }
  };

  return (
    <div className='top-navbar'>
      {!searchView ? (
        <div className='nav-default-view'>
          <FontAwesomeIcon icon={faTv} className='icon' />
          <h2>Following | <span>For You</span></h2>
          <FontAwesomeIcon icon={faSearch} className='icon' onClick={toggleSearchView} />
        </div>
      ) : (
        <div className='nav-search-view'>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            onKeyPress={searchPressed}
            placeholder="Search by hashtag..."
            autoFocus
          />
          <FontAwesomeIcon icon={faSearch} className='icon' onClick={handleSearch} />
          <button onClick={toggleSearchView}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;