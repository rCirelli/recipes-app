import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { getDrink, getDrinkCategories, getSpecificDrink } from '../service/api';

function DrinksCards() {
  const { searchResponse, setSearchResponse } = useContext(RecipeContext);
  const [drinksCategories, setDrinksCategories] = useState({});
  const [toggle, setToggle] = useState(false);

  const twelve = 12;
  const five = 5;
  const { drinks } = searchResponse;

  useEffect(() => {
    async function addRecipes() {
      const drink = await getDrink();
      setSearchResponse(drink);
      const drinkCategories = await getDrinkCategories();
      setDrinksCategories(drinkCategories);
    }
    addRecipes();
  }, []);

  async function filterRecipes({ target: { value } }) {
    if (toggle === false) {
      setToggle(true);
      const drinkRecipe = await getSpecificDrink(value);
      setSearchResponse(drinkRecipe);
    } else {
      setToggle(false);
      const drink = await getDrink();
      setSearchResponse(drink);
    }
  }

  async function handleClick() {
    const drinksRec = await getDrink();
    setSearchResponse(drinksRec);
  }

  return (
    <div className="w-screen">
      <div className="w-full flex items-center gap-3 py-4 overflow-x-auto px-4">
        {drinksCategories?.drinks?.slice(0, five).map((categories, index) => (
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
      {drinks?.slice(0, twelve) && (
        <div className="px-4 w-full flex flex-col items-center gap-5 mb-16">
          {drinks?.slice(0, twelve).map((drink, index) => (
            <div
              className="w-full bg-slate-100 rounded-lg
              drop-shadow-md text-ellipsis"
              key={ drink.idDrink }
              data-testid={ String(index).concat('-recipe-card') }
            >
              <Link
                className="w-full flex items-center gap-3"
                to={ '/drinks/'.concat(drink.idDrink) }
              >
                <img
                  className="w-2/6 rounded-l-lg"
                  data-testid={ String(index).concat('-card-img') }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strdrink }
                />
                <p
                  className="text-ellipsis overflow-hidden"
                  data-testid={ String(index).concat('-card-name') }
                >
                  {drink.strDrink}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DrinksCards;
