import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import RecommendedRecipe from '../components/RecommendedRecipe';
import Loader from '../components/Loader';

function RecipeDetails({ recipeType, match: { params: { id } } }) {
  const [isFetching, setIsFetching] = useState(true);
  const [apiResponse, setEndpoint] = useFetch();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const endpoints = {
      food: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
    };

    setEndpoint(`${endpoints[recipeType]}${id}`);
  }, [id, recipeType, setEndpoint]);

  useEffect(() => {
    if (apiResponse.meals) {
      const details = Object.values(apiResponse)[0][0];
      const ingredients = Object.entries(details)
        .filter(([key]) => key.includes('Ingredient'))
        .map(([, ingredient]) => ingredient);

      setRecipeDetails({ ...details, ingredients });
      setIsFetching(false);
    }
  }, [apiResponse]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {
        isFetching ? <Loader /> : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeDetails.strMealThumb }
              alt={ recipeDetails.strMeal }
            />
            <h1
              data-testid="recipe-title"
            >
              {recipeDetails.strMeal}
            </h1>
            <h2
              data-testid="recipe-category"
            >
              {recipeDetails.strCategory}
            </h2>
            <ul>
              {
                recipeDetails?.ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ String(index).concat('-ingredient-name-and-measure') }
                  >
                    {ingredient}
                  </li>
                ))
              }
            </ul>
            <span>
              {recipeDetails.strInstructions}
            </span>
            {
              recipeType === 'food' && (
                <iframe
                  className="mt-10 w-screen h-52"
                  src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.split('=')[1]}` }
                  title={ recipeDetails.strMeal }
                  frameBorder="0"
                  allowFullScreen
                />
              )
            }
            <ul>
              <li
                data-testid={ String(0).concat('-recomendation-card') }
              >
                <RecommendedRecipe />
              </li>
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipeType: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
