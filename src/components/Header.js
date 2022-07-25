import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, withSearchButton }) {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <header
      className="flex w-screen fixed top-0 justify-between px-5
      items-center py-3 bg-slate-200 drop-shadow-lg z-50 border-b border-slate-300"
    >
      <Link to="/profile">
        <i
          data-testid="profile-top-btn"
          className="fa-solid fa-user fa-xl"
        />
        {/* <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        /> */}
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {
        withSearchButton
        && (
          <button type="button" onClick={ toggleSearchBar }>
            <i
              data-testid="search-top-btn"
              className="fa-solid fa-magnifying-glass fa-xl"
            />
            {/* <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search Icon"
            /> */}
          </button>
        )
      }
      {
        isSearchBarVisible && (
          <div
            className="w-screen fixed top-14 left-0 bg-slate-200 py-4 box-shadow-xl
            transition-all duration-1000"
          >
            <SearchBar toggleVisible={ toggleSearchBar } />
          </div>
        )
      }
    </header>
  );
}

Header.defaultProps = {
  withSearchButton: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  withSearchButton: PropTypes.bool,
};

export default Header;
