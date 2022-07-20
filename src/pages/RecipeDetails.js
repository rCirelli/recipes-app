import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import RecommendedRecipes from '../components/RecommendedRecipes';
import Loader from '../components/Loader';
import ShareBtn from '../components/inputs/ShareBtn';
import FavoriteBtn from '../components/inputs/FavoriteBtn';

function RecipeDetails({ recipeType }) {
  const history = useHistory();
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [apiDetails, setDetailsEndpoint] = useFetch();
  const [apiRecommendations, setApiRecommendations] = useFetch();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [inProgress, setInProgress] = useLocalStorage('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });
  const [doneRecipes] = useLocalStorage('doneRecipes', []);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isBtnResumeRecipe, setIsBtnResumeRecipe] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const endpoints = {
      food: {
        details: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
        recommendations:
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      },
      drink: {
        details: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
        recommendations:
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      },
    };

    setDetailsEndpoint(`${endpoints[recipeType].details}${id}`);
    setApiRecommendations(`${endpoints[recipeType].recommendations}`);
  }, [id, recipeType, setDetailsEndpoint, setApiRecommendations]);

  useEffect(() => {
    const hasDetails = apiDetails.meals || apiDetails.drinks;
    const hasRecommendations = apiRecommendations.meals || apiRecommendations.drinks;
    if (hasDetails && hasRecommendations) {
      const details = Object.values(apiDetails)[0][0];
      const ingredients = Object.entries(details)
        .filter(
          ([key, value]) => key.includes('Ingredient') && value !== null && value !== '',
        )
        .map(([, ingredient]) => ingredient);
      const measures = Object.entries(details)
        .filter(([key]) => key.includes('Measure'))
        .map(([, measure]) => measure);

      setRecipeDetails({ ...details, ingredients, measures });
      setIsFetching(false);
    }
  }, [apiDetails, apiRecommendations]);

  const type = {
    food: {
      id: 'idMeal',
      thumbnail: 'strMealThumb',
      name: 'strMeal',
      category: 'strCategory',
    },
    drink: {
      id: 'idDrink',
      thumbnail: 'strDrinkThumb',
      name: 'strDrink',
      category: 'strAlcoholic',
    },
  };

  const handleStartRecipe = () => {
    // ? para adicionar a receita à lista de 'inProgress'
    const storageKeys = { food: 'meals', drink: 'cocktails' };

    const ingredientsNumber = recipeDetails.ingredients.map((_, index) => index + 1);
    const newInProgressRecipe = {
      [recipeDetails[type[recipeType].id]]: ingredientsNumber,
      // [recipeDetails[type[recipeType].id]]: recipeDetails.ingredients,
    };
    const newInprogressList = {
      ...inProgress,
      [storageKeys[recipeType]]: newInProgressRecipe,
    };

    setInProgress(newInprogressList);
    setRedirect(true);
  };

  const handleRedirect = useCallback(
    () => {
      if (recipeType === 'food') {
        history.push(`/foods/${id}/in-progress`);
      }
      if (recipeType === 'drink') {
        history.push(`/drinks/${id}/in-progress`);
      }
    }, [history, id, recipeType],
  );

  useEffect(() => {
    if (redirect) {
      handleRedirect();
    }
  }, [redirect, handleRedirect]);

  const checkBtnStatus = () => {
    if (doneRecipes.length > 0) {
      const isValid = doneRecipes
        .some((recipe) => recipe.id === recipeDetails[type[recipeType].id]);
      setIsBtnDisabled(isValid);
    }

    if (inProgress) {
      const storageKeys = { food: 'meals', drink: 'cocktails' };
      const progressType = storageKeys[recipeType];
      const isInProgress = Object.keys(inProgress[progressType])
        .some((recipe) => recipe === recipeDetails[type[recipeType].id]);

      setIsBtnResumeRecipe(isInProgress);
    }
  };

  useEffect(() => {
    checkBtnStatus();
  });

  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center">
      {isFetching ? (
        <Loader />
      ) : (
        <div className="w-screen">
          <img
            data-testid="recipe-photo"
            src={ recipeDetails[type[recipeType].thumbnail] }
            alt={ recipeDetails[type[recipeType].name] }
          />
          <div className="px-7 py-2">
            <div className="flex justify-between items-center">
              <div>
                <h1 data-testid="recipe-title" className="text-2xl font-medium">
                  {recipeDetails[type[recipeType].name]}
                </h1>
                <h2
                  data-testid="recipe-category"
                  className="text-md italic lowercase antialiased text-slate-500 mb-5"
                >
                  {recipeDetails[type[recipeType].category]}
                </h2>
              </div>
              <div className="flex gap-5">
                <ShareBtn slug={ window.location.href } />
                <FavoriteBtn recipeInfo={ recipeDetails } recipeType={ recipeType } />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Ingredients</h3>
            <ul className="list-disc ml-4 mb-5">
              {recipeDetails?.ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ String(index).concat(
                    '-ingredient-name-and-measure',
                  ) }
                >
                  <span className="flex gap-2">
                    <p className="capitalize">{ingredient}</p>
                    -
                    <p className="text-slate-500 italic font-light antialiased">
                      {recipeDetails.measures[index]}
                    </p>
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-medium mb-2">Instructions</h3>
            <span data-testid="instructions">
              {recipeDetails.strInstructions.split('.').map((paragraph, i) => (
                <p key={ i } className="text-justify leading-relaxed mb-1">
                  {`${paragraph}${paragraph !== '' ? '.' : ''}`}
                </p>
              ))}
              {/* {recipeDetails.strInstructions} */}
            </span>
          </div>
          {recipeType === 'food' && (
            <div className="mb-7">
              <h3 className="text-xl font-medium -mb-8 pl-7">Video</h3>
              <iframe
                data-testid="video"
                className="mt-10 w-full h-52"
                src={ `https://www.youtube.com/embed/${
                  recipeDetails.strYoutube.split('=')[1]
                }` }
                title={ recipeDetails[type[recipeType].name] }
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}
          <RecommendedRecipes
            recommendations={ apiRecommendations }
            recipeType={ recipeType }
          />
          <button
            type="button"
            disabled={ isBtnDisabled }
            data-testid="start-recipe-btn"
            className="w-11/12 mx-auto bg-emerald-500 py-4 text-lg font-medium
                tracking-loose rounded-t-full text-slate-200 fixed bottom-0 inset-x-0
                disabled:bg-slate-700/0 disabled:text-slate-400/0"
            onClick={ handleStartRecipe }
          >
            {isBtnResumeRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
