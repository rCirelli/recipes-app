import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, withSearchButton }) {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  function toggleSearchBar() {
    setIsSearchBarVisible(!isSearchBarVisible);
  }

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {
        withSearchButton
        && (
          <button type="button" onClick={ toggleSearchBar }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search Icon"
            />
          </button>
        )
      }
      {
        isSearchBarVisible
        && <input data-testid="search-input" type="text" />
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
