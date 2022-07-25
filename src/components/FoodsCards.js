import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { getFood, getFoodCategories, getSpecificMeal } from '../service/api';

function FoodsCards() {
  const { searchResponse, setSearchResponse } = useContext(RecipeContext);
  const [foodCategories, setFoodCategories] = useState({});
  const [toggle, setToggle] = useState(false);

  const twelve = 12;
  const five = 5;

  useEffect(() => {
    async function addRecipes() {
      const foods = await getFood();
      setSearchResponse(foods);
      const mealCategories = await getFoodCategories();
      setFoodCategories(mealCategories);
    }
    addRecipes();
  }, []);

  async function filterRecipes({ target: { value } }) {
    if (toggle === false) {
      setToggle(true);
      const mealRecipe = await getSpecificMeal(value);
      setSearchResponse(mealRecipe);
    } else {
      setToggle(false);
      const foods = await getFood();
      setSearchResponse(foods);
    }
  }

  async function handleClick() {
    const foods = await getFood();
    setSearchResponse(foods);
  }

  return (
    <div className="w-screen">
      <div className="w-full flex items-center gap-3 py-4 overflow-x-auto px-4">
        {foodCategories?.meals?.slice(0, five).map((categories, index) => (
          <button
            className="border px-5 py-1 rounded-lg bg-emerald-500 text-white
            font-medium tracking-wide whitespace-nowrap"
            type="button"
            key={ index }
            value={ categories.strCategory }
            data-testid={ String(categories.strCategory).concat(
              '-category-filter',
            ) }
            onClick={ filterRecipes }
          >
            {categories.strCategory}
          </button>
        ))}
        <button
          className="border px-5 py-1 rounded-lg bg-emerald-500 text-white
          font-medium tracking-wide"
          type="button"
          onClick={ handleClick }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      {searchResponse?.meals?.slice(0, twelve) && (
        <div className="px-4 w-full flex flex-col items-center gap-5 mb-16">
          {searchResponse?.meals?.slice(0, twelve).map((meal, index) => (
            <div
              className="w-full bg-slate-100 rounded-lg
              drop-shadow-md text-ellipsis"
              key={ meal.idMeal }
              data-testid={ String(index).concat('-recipe-card') }
            >
              <Link
                className="w-full flex items-center gap-3"
                to={ '/foods/'.concat(meal.idMeal) }
              >
                <img
                  className="w-2/6 rounded-l-lg"
                  data-testid={ String(index).concat('-card-img') }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <p
                  className="text-ellipsis overflow-hidden"
                  data-testid={ String(index).concat('-card-name') }
                >
                  {meal.strMeal}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodsCards;
