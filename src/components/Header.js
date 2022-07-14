import PropTypes from 'prop-types';
import React from 'react';

function Header({ title, withSearchButton }) {
  return (
    <header>
      <img
        src="../images/profileIcon.svg"
        data-testid="profile-top-btn"
        alt="Profile icon"
      />
      <h1 data-testid="page-title">{title}</h1>
      {
        withSearchButton
        && <img
          src="../images/searchIcon.svg"
          data-testid="search-top-btn"
          alt="Search Icon"
        />
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
