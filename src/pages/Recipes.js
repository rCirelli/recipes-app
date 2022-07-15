import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function Recipes() {
  const value = useContext(RecipeContext);
  const { mealsData: { meals }, drinksData: { drinks } } = value;
  const twelve = 12;

  return (
    <div>
      {meals?.map((meal, index) => (
        <div
          key={ meal.idMeal }
          data-testid={ String(index).concat('-recipe-card') }
        >
          <img
            data-testid={ String(index).concat('-card-img') }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <p data-testid={ String(index).concat('-card-name') }>{meal.strMeal}</p>
        </div>
      ))}
      {drinks?.slice(0, twelve).map((drink) => (
        <div key={ drink.idDrink }>
          <img src={ drink.strDrinkThumb } alt={ drink.strdrink } />
          <p>{drink.strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
