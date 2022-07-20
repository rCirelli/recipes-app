import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import ShareBtn from '../components/inputs/ShareBtn';
import FavoriteBtn from '../components/inputs/FavoriteBtn';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from '../components/Loader';

function RecipeInProgress({ recipeType, match: { params: { id } } }) {
  // const { id } = useParams();
  const history = useHistory();

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [recipe, setRecipeEndpoint] = useFetch();
  const [inProgressRecipes, setInProgressRecipes] = useLocalStorage('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });

  const type = useMemo(() => ({
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
  }), []);

  const checkIsBtnDisabled = (ingredientList) => {
    const isEnabled = ingredientList.every((item) => item === '');
    setIsBtnDisabled(!isEnabled);
  };

  const info = (recipe.meals || recipe.drinks) && Object.values(recipe)[0][0];

  // const ingredientQty = inProgressRecipes && (
  //   inProgressRecipes[recipeType === 'food' ? 'meals' : 'cocktails'][id]);

  // const ingredientsList = info && (
  //   ingredientQty.map((item) => info[`strIngredient${item}`]));

  const ingredientsList = info && Object.entries(info)
    .filter(
      ([key, value]) => key.includes('Ingredient') && value !== null && value !== '',
    )
    .map(([, ingredient]) => ingredient);

  const itemKey = recipeType === 'food' ? 'meals' : 'drinks';

  const ingredientMeasures = info && (
    ingredientsList.map((_, i) => info[`strMeasure${i + 1}`]));

  const storageKeys = useMemo(() => ({ food: 'meals', drink: 'cocktails' }), []);

  useEffect(() => {
    const endpoints = {
      food: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
      drink: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
    };
    setRecipeEndpoint(`${endpoints[recipeType]}${id}`);

    const test = window.localStorage.getItem('inProgressRecipes');
    const test2 = JSON.parse(test)[storageKeys[recipeType]][id];
    checkIsBtnDisabled(test2 || []);
  }, [recipeType, setRecipeEndpoint, id, storageKeys]);

  useEffect(() => {
    // ? para adicionar a receita à lista de 'inProgress'

    if (recipe && inProgressRecipes && !inProgressRecipes[storageKeys[recipeType]][id]) {
      // const recipeData = recipe[storageKeys[recipeType]][0];
      const recipeData = recipe[itemKey][0];

      const ingredientsNumber = ingredientsList.map((_, index) => index + 1);

      const newInProgressRecipe = {
        // [recipeData[type[recipeType].id]]: ingredientsList,
        [recipeData[type[recipeType].id]]: ingredientsNumber,
      };

      const newInprogressList = {
        ...inProgressRecipes,
        [storageKeys[recipeType]]: newInProgressRecipe,
      };

      setInProgressRecipes(newInprogressList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  const handleSelectIngredient = ({ target: { value } }) => {
    const newList = inProgressRecipes[storageKeys[recipeType]][id]
      .map((item, index) => {
        if (item === '' && index === Number(value)) {
          return index + 1;
        // return ingredientsList[index];
        }
        return index === Number(value) ? '' : item;
      });

    checkIsBtnDisabled(newList);

    setInProgressRecipes({
      ...inProgressRecipes,
      [storageKeys[recipeType]]: { [info[type[recipeType].id]]: newList },
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center">
      { !info || !inProgressRecipes ? <Loader /> : (
        <>
          {/* {console.log(inProgressRecipes[itemKey][id])} */}
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
              { ingredientsList.map((ingredient, index) => {
                const testId = String(index).concat('-ingredient-step');
                const isComplete = inProgressRecipes[storageKeys[recipeType]][id]
                  ? inProgressRecipes[storageKeys[recipeType]][id]
                    .some((savedIngredient) => index + 1 === savedIngredient)
                  : true;

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
                        onClick={ handleSelectIngredient }
                        value={ index }
                        defaultChecked={ !isComplete }
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
                  disabled:bg-slate-700 disabled:text-slate-400"
                disabled={ isBtnDisabled }
                onClick={ () => history.push('/done-recipes') }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }) }).isRequired,
};
