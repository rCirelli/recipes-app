import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../RecipeContext';

function RecipeProvider({ children }) {
  return (
    <RecipeContext.Provider
      value={ 0 }
    >
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
