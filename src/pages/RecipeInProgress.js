import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import ShareBtn from '../components/inputs/ShareBtn';
import FavoriteBtn from '../components/inputs/FavoriteBtn';
import useLocalStorage from '../hooks/useLocalStorage';

function RecipeInProgress({ recipeType }) {
  const { id } = useParams();

  const [recipe, setRecipeEndpoint] = useFetch();
  const [inProgressRecipes] = useLocalStorage('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });

  useEffect(() => {
    const endpoints = {
      food: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
      drink: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
    };

    setRecipeEndpoint(`${endpoints[recipeType]}${id}`);
  }, [recipeType, setRecipeEndpoint, id]);

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

  const info = (recipe.meals || recipe.drinks) && Object.values(recipe)[0][0];

  console.log(inProgressRecipes);

  // const ingredientQty = inProgressRecipes && (
  //   inProgressRecipes[recipeType === 'food' ? 'meals' : 'cocktails'][id]);

  // const ingredientsList = info && (
  //   ingredientQty.map((item) => info[`strIngredient${item}`]));

  const ingredientsList = info && Object.entries(info)
    .filter(
      ([key, value]) => key.includes('Ingredient') && value !== null && value !== '',
    )
    .map(([, ingredient]) => ingredient);

  const ingredientMeasures = info && (
    ingredientsList.map((_, i) => info[`strMeasure${i + 1}`]));

  return (
    <div className="w-screen">
      { info && (
        <>
          <img
            data-testid="recipe-photo"
            src={ info[type[recipeType].thumbnail] }
            alt={ info[type[recipeType].name] }
          />
          <div className="px-7 py-2">
            <div className="flex justify-between items-center">
              <div>
                <h1 data-testid="recipe-title" className="text-2xl font-medium">
                  {info[type[recipeType].name]}
                </h1>
                <h2
                  data-testid="recipe-category"
                  className="text-md italic lowercase antialiased text-slate-500 mb-5"
                >
                  {info[type[recipeType].category]}
                </h2>
              </div>
              <div className="flex gap-5">
                <ShareBtn slug={ window.location.href } />
                <FavoriteBtn recipeInfo={ info } recipeType={ recipeType } />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Ingredients</h3>
            <ul className="mb-5">
              { info && ingredientsList.map((ingredient, index) => {
                const testId = String(index).concat('-ingredient-step');
                return (
                  <li
                    key={ index }
                    data-testid={ testId }
                  >
                    <label
                      htmlFor={ testId }
                      className="flex gap-3 mb-3 items-start"
                    >
                      <input
                        type="checkbox"
                        id={ testId }
                        className="h-5 w-5 appearance-none border border-gray-300 rounded
                        checked:bg-emerald-500 checked:border-emerald-500 transition-all
                        duration-250 checked:after:content-['✓'] after:ml-0.5
                        after:text-slate-200 after:font-bold peer"
                      />
                      <span
                        className="flex gap-2 capitalize peer-checked:line-through
                        transition-all duration-300"
                      >
                        {`${ingredient} -`}
                        <p
                          className="text-slate-500 italic font-light
                          antialiased lowercase"
                        >
                          {ingredientMeasures[index]}
                        </p>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <h3 className="text-xl font-medium mb-2">Instructions</h3>
            <span data-testid="instructions">
              {info.strInstructions.split('.').map((paragraph, i) => (
                <p key={ i } className="text-justify leading-relaxed mb-1">
                  {`${paragraph}${paragraph !== '' ? '.' : ''}`}
                </p>
              ))}
            </span>
            <div className="w-full flex justify-center my-5">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                className="w-full bg-emerald-500 py-4 text-lg font-medium
                  tracking-loose rounded-full text-slate-200
                  disabled:bg-slate-700/0 disabled:text-slate-400/0"
              >
                Finish Recipe
              </button>
            </div>
          </div>
        </>)}
    </div>
  );
}

export default RecipeInProgress;

RecipeInProgress.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
