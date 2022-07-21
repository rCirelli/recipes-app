import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, withSearchButton }) {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const { setSearchInput } = useContext(RecipeContext);

  function toggleSearchBar() {
    setIsSearchBarVisible(!isSearchBarVisible);
  }

  function handleInput({ target }) {
    setSearchInput(target.value);
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
        && (
          <>
            <input onChange={ handleInput } data-testid="search-input" type="text" />
            <SearchBar />
          </>
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
