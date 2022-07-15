import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../RecipeContext';
import { getDrink, getFood } from '../../service/api';

function RecipeProvider({ children }) {
  const [mealsData, setMealsData] = useState({});
  const [drinksData, setDrinksData] = useState({});

  useEffect(() => {
    async function addRecipes() {
      const meals = await getFood();
      const drinks = await getDrink();
      setMealsData(meals);
      setDrinksData(drinks);
    }
    addRecipes();
  }, []);

  useEffect(() => {
    async function addRecipes() {
      const drinks = await getDrink();
      setDrinksData(drinks);
    }
    addRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={ {
        mealsData, drinksData,
      } }
    >
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
