import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../RecipeContext';

function RecipeProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const contextValue = {
    searchResponse,
    searchInput,
    setSearchInput,
    setSearchResponse,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
