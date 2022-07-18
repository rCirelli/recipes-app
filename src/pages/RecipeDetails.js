import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import RecommendedRecipe from '../components/RecommendedRecipe';
import Loader from '../components/Loader';

function RecipeDetails({ recipeType, match: { params: { id } } }) {
  const [isFetching, setIsFetching] = useState(true);
  const [apiDetails, setDetailsEndpoint] = useFetch();
  const [apiRecommendations, setApiRecommendations] = useFetch();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const endpoints = {
      food: {
        details: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
        recommendations: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      },
      drink: {
        details: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
        recommendations: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      },
    };

    setDetailsEndpoint(`${endpoints[recipeType].details}${id}`);
    setApiRecommendations(`${endpoints[recipeType].recommendations}`);
  }, [id, recipeType, setDetailsEndpoint, setApiRecommendations]);

  useEffect(() => {
    if (apiDetails.meals || apiDetails.drinks) {
      const details = Object.values(apiDetails)[0][0];
      const ingredients = Object.entries(details)
        .filter(([key]) => key.includes('Ingredient'))
        .map(([, ingredient]) => ingredient);
      const measures = Object.entries(details)
        .filter(([key]) => key.includes('Measure'))
        .map(([, measure]) => measure);

      setRecipeDetails({ ...details, ingredients, measures });
      setIsFetching(false);
    }
  }, [apiDetails]);

  const type = {
    food: {
      thumbnail: 'strMealThumb',
      name: 'strMeal',
      category: 'strCategory',
    },
    drink: {
      thumbnail: 'strDrinkThumb',
      name: 'strDrink',
      category: 'strAlcoholic',
    },
  };

  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center">
      {
        isFetching ? <Loader /> : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeDetails[type[recipeType].thumbnail] }
              alt={ recipeDetails[type[recipeType].name] }
            />
            <div className="px-7 py-2">
              <h1
                data-testid="recipe-title"
                className="text-2xl font-medium"
              >
                {recipeDetails[type[recipeType].name]}
              </h1>
              <h2
                data-testid="recipe-category"
                className="text-md italic lowercase antialiased text-slate-500 mb-5"
              >
                {recipeDetails[type[recipeType].category]}
              </h2>
              <h3 className="text-xl font-medium mb-2">
                Ingredients
              </h3>
              <ul
                className="list-disc ml-4 mb-5"
              >
                {
                  recipeDetails?.ingredients
                    .filter((ingredient) => ingredient !== null && ingredient !== '')
                    .map((ingredient, index) => (
                      <li
                        key={ index }
                        data-testid={
                          String(index).concat('-ingredient-name-and-measure')
                        }
                      >
                        <span className="flex gap-2">
                          <p className="capitalize">{ingredient}</p>
                          -
                          <p
                            className="text-slate-500 italic font-light antialiased"
                          >
                            {recipeDetails.measures[index]}
                          </p>
                        </span>
                      </li>
                    ))
                }
              </ul>
              <h3 className="text-xl font-medium mb-2">
                Instructions
              </h3>
              <span
                data-testid="instructions"
              >
                {recipeDetails.strInstructions.split('.').map((paragraph, i) => (
                  <p key={ i } className="text-justify leading-relaxed mb-1">
                    {`${paragraph}${paragraph !== '' ? '.' : ''}`}
                  </p>
                ))}
                {/* {recipeDetails.strInstructions} */}
              </span>
            </div>
            {
              recipeType === 'food' && (
                <>
                  <h3 className="text-xl font-medium -mb-8 pl-7">
                    Video
                  </h3>
                  <iframe
                    data-testid="video"
                    className="mt-10 w-screen h-52"
                    src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.split('=')[1]}` }
                    title={ recipeDetails[type[recipeType].name] }
                    frameBorder="0"
                    allowFullScreen
                  />
                </>
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
