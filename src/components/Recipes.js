import React from 'react';
import PropTypes from 'prop-types';
import DrinksCards from './DrinksCards';
import FoodsCards from './FoodsCards';

function Recipes({ isMeal }) {
  return (
    isMeal ? (
      <FoodsCards />
    ) : (
      <DrinksCards />
    )
  );
}

Recipes.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default Recipes;
