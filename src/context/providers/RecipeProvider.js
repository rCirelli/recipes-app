import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../RecipeContext';

function RecipeProvider({ children }) {
  const contextValue = {
    test: 'test',
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
